#!/usr/bin/env node
/**
 * Reads pnpn_data.xlsx, computes drill stats, and patches the RAW const
 * in src/pnpn-lion-nisk-model.jsx in-place.
 *
 * Usage: node scripts/parse-and-update.js
 */

const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const XLSX_PATH = path.join(ROOT, 'pnpn_data.xlsx');
const JSX_PATH  = path.join(ROOT, 'src', 'pnpn-lion-nisk-model.jsx');

// ── CuEq formula weights (must match model constants) ───────────────────────
const OZ = 31.1035, LB = 2204.62;
const DEF_P = { cu:4.50, au:3200, pd:1000, ag:32, pt:950, ni:7.00, co:12.00 };
const REC_LION = { cu:0.985, au:0.850, pd:0.939, ag:0.889, pt:0.968, ni:0.50, co:0.50 };
const PAY      = { cu:0.90,  au:0.95,  pd:0.78,  ag:0.80,  pt:0.78,  ni:0.73, co:0.27 };
const SIG_CUTOFF = 1.0; // % CuEq threshold for "significant" intercept

function cuEq(row) {
  return (
    (row.cu || 0) * REC_LION.cu * PAY.cu * (DEF_P.cu * LB / 100) +
    (row.au || 0) * REC_LION.au * PAY.au * (DEF_P.au / OZ) +
    (row.pd || 0) * REC_LION.pd * PAY.pd * (DEF_P.pd / OZ) +
    (row.ag || 0) * REC_LION.ag * PAY.ag * (DEF_P.ag / OZ) +
    (row.pt || 0) * REC_LION.pt * PAY.pt * (DEF_P.pt / OZ)
  ) / (DEF_P.cu * LB / 100);
}

function niEq(row) {
  return (
    (row.ni || 0) * (DEF_P.ni * LB / 100) +
    (row.cu || 0) * (DEF_P.cu * LB / 100) +
    (row.co || 0) * (DEF_P.co * LB / 100) +
    (row.pd || 0) * (DEF_P.pd / OZ)
  ) / (DEF_P.ni * LB / 100);
}

// ── Load workbook ────────────────────────────────────────────────────────────
console.log('Reading', XLSX_PATH);
const wb = XLSX.readFile(XLSX_PATH);

// Normalize column names (trim whitespace from keys)
function normalizeRow(r) {
  const out = {};
  Object.entries(r).forEach(([k, v]) => { out[k.trim()] = v; });
  return out;
}

// Collars: hole → { project, year, totalLength }
const collars = {};
XLSX.utils.sheet_to_json(wb.Sheets['Collars']).map(normalizeRow).forEach(r => {
  collars[r['Hole ID']] = {
    project: (r['Project'] || '').toUpperCase().trim(),
    year:    r['YEAR'] ? +r['YEAR'] : null,
    length:  r['Length (m)'] || 0,
  };
});

// Project classification helpers
const isLion = p => p === 'LION ZONE' || p === 'LION' || p === 'ANT1' || p === 'ANT2' || p === 'ANT3' || p === 'ANT4';
const isNisk = p => p === 'NISK';

// Assays: parse rows
const assays = XLSX.utils.sheet_to_json(wb.Sheets['Assays_Final']).map(normalizeRow).map(r => ({
  hole:    r['Hole ID'],
  project: (r['Project'] || '').toUpperCase().trim(),
  from:    +r['From (m)']   || 0,
  to:      +r['To (m)']     || 0,
  len:     +r['Length (m)'] || 0,
  ni:  +r['Ni (%)']   || 0,
  cu:  +r['Cu (%)']   || 0,
  pt:  +r['Pt (g/t)'] || 0,
  pd:  +r['Pd (g/t)'] || 0,
  co:  +r['Co (%)']   || 0,
  au:  +r['Au (g/t)'] || 0,
  ag:  +r['Ag (g/t)'] || 0,
})).filter(r => r.len > 0);

// ── Lion stats ───────────────────────────────────────────────────────────────
const lionAssays = assays.filter(r => isLion(r.project) || isLion(collars[r.hole]?.project));
lionAssays.forEach(r => { r.cueq = cuEq(r); });

const lionSig = lionAssays.filter(r => r.cueq >= SIG_CUTOFF);
const lionHoles = Object.keys(collars).filter(h => isLion(collars[h].project));

// Best intercept per hole (weighted avg CuEq over contiguous sig intervals, simplified as max composite)
const lionByHole = {};
lionSig.forEach(r => {
  if (!lionByHole[r.hole]) lionByHole[r.hole] = [];
  lionByHole[r.hole].push(r);
});

const lionTopHoles = Object.entries(lionByHole).map(([hole, rows]) => {
  const totalLen = rows.reduce((s, r) => s + r.len, 0);
  const wtGrade  = rows.reduce((s, r) => s + r.cueq * r.len, 0) / totalLen;
  const maxGrade = Math.max(...rows.map(r => r.cueq));
  const year = collars[hole]?.year || null;
  return { hole, length: +totalLen.toFixed(1), grade: +wtGrade.toFixed(3), maxGrade: +maxGrade.toFixed(3), year };
}).sort((a, b) => b.grade - a.grade).slice(0, 50);

// byYear
const lionYearMap = {};
lionAssays.forEach(r => {
  const yr = collars[r.hole]?.year;
  if (!yr) return;
  if (!lionYearMap[yr]) lionYearMap[yr] = { holes: new Set(), totalM: 0, gradeSum: 0 };
  lionYearMap[yr].holes.add(r.hole);
  lionYearMap[yr].totalM += r.len;
  lionYearMap[yr].gradeSum += r.cueq * r.len;
});
const lionByYear = Object.entries(lionYearMap).map(([yr, d]) => ({
  YEAR: +yr,
  holes: d.holes.size,
  maxGrade: +Math.max(...lionAssays.filter(r => collars[r.hole]?.year === +yr).map(r => r.cueq)).toFixed(3),
  totalM: +d.totalM.toFixed(2),
  avgGrade: +(d.gradeSum / d.totalM).toFixed(3),
})).sort((a, b) => a.YEAR - b.YEAR);

// histogram
const bins = [
  [0, 0.5], [0.5, 1], [1, 2], [2, 3], [3, 5], [5, 8], [8, 12], [12, 20], [20, 40],
];
const lionHist = bins.map(([lo, hi]) => ({
  bin: `${lo}–${hi}%`,
  count: lionAssays.filter(r => r.cueq >= lo && r.cueq < hi).length,
}));

// metal contrib (avg grade of sig intercepts × weight)
const avgGrades = {
  cu: lionSig.reduce((s, r) => s + r.cu * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0),
  au: lionSig.reduce((s, r) => s + r.au * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0),
  ag: lionSig.reduce((s, r) => s + r.ag * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0),
  pd: lionSig.reduce((s, r) => s + r.pd * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0),
  pt: lionSig.reduce((s, r) => s + r.pt * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0),
};
const avgCuEq = lionSig.reduce((s, r) => s + r.cueq * r.len, 0) / lionSig.reduce((s, r) => s + r.len, 0);
const metalContrib = {
  Cu: +(avgGrades.cu * REC_LION.cu * PAY.cu * (DEF_P.cu * LB / 100) / (DEF_P.cu * LB / 100) / avgCuEq * 100).toFixed(2),
  Au: +(avgGrades.au * REC_LION.au * PAY.au * (DEF_P.au / OZ)       / (DEF_P.cu * LB / 100) / avgCuEq * 100).toFixed(2),
  Ag: +(avgGrades.ag * REC_LION.ag * PAY.ag * (DEF_P.ag / OZ)       / (DEF_P.cu * LB / 100) / avgCuEq * 100).toFixed(2),
  Pd: +(avgGrades.pd * REC_LION.pd * PAY.pd * (DEF_P.pd / OZ)       / (DEF_P.cu * LB / 100) / avgCuEq * 100).toFixed(2),
  Pt: +(avgGrades.pt * REC_LION.pt * PAY.pt * (DEF_P.pt / OZ)       / (DEF_P.cu * LB / 100) / avgCuEq * 100).toFixed(2),
};

const lionStats = {
  total_holes:   lionHoles.length,
  assay_rows:    lionAssays.length,
  sig_rows:      lionSig.length,
  avg_cueq_sig:  +avgCuEq.toFixed(3),
  max_cueq:      +Math.max(...lionSig.map(r => r.cueq)).toFixed(3),
  avg_cu:        +avgGrades.cu.toFixed(3),
  avg_au:        +avgGrades.au.toFixed(3),
  avg_pd:        +avgGrades.pd.toFixed(3),
  avg_ag:        +avgGrades.ag.toFixed(3),
};

// ── Nisk stats (keep original MRE-based figures, only refresh drill data) ───
const niskAssays = assays.filter(r => isNisk(r.project) || isNisk(collars[r.hole]?.project));
niskAssays.forEach(r => { r.nieq = niEq(r); });
const niskSig = niskAssays.filter(r => r.nieq >= 1.0);

const niskByHole = {};
niskSig.forEach(r => {
  if (!niskByHole[r.hole]) niskByHole[r.hole] = [];
  niskByHole[r.hole].push(r);
});
const niskTopHoles = Object.entries(niskByHole).map(([hole, rows]) => {
  const totalLen = rows.reduce((s, r) => s + r.len, 0);
  const wtGrade  = rows.reduce((s, r) => s + r.nieq * r.len, 0) / totalLen;
  const maxGrade = Math.max(...rows.map(r => r.nieq));
  const year = collars[hole]?.year || null;
  return { hole, length: +totalLen.toFixed(1), grade: +wtGrade.toFixed(3), maxGrade: +maxGrade.toFixed(3), year };
}).sort((a, b) => b.grade - a.grade).slice(0, 25);

const niskYearMap = {};
niskAssays.forEach(r => {
  const yr = collars[r.hole]?.year;
  if (!yr) return;
  if (!niskYearMap[yr]) niskYearMap[yr] = { holes: new Set(), totalM: 0, gradeSum: 0 };
  niskYearMap[yr].holes.add(r.hole);
  niskYearMap[yr].totalM += r.len;
  niskYearMap[yr].gradeSum += r.nieq * r.len;
});
const niskByYear = Object.entries(niskYearMap).map(([yr, d]) => ({
  YEAR: +yr,
  holes: d.holes.size,
  maxGrade: +Math.max(...niskAssays.filter(r => collars[r.hole]?.year === +yr).map(r => r.nieq)).toFixed(3),
  totalM: +d.totalM.toFixed(2),
  avgGrade: +(d.gradeSum / d.totalM).toFixed(3),
})).sort((a, b) => a.YEAR - b.YEAR);

const niskStats = {
  total_holes:  Object.keys(niskByHole).length,
  assay_rows:   niskAssays.length,
  sig_rows:     niskSig.length,
  avg_nieq_sig: +(niskSig.reduce((s, r) => s + r.nieq * r.len, 0) / niskSig.reduce((s, r) => s + r.len, 0)).toFixed(3),
  max_nieq:     +Math.max(...niskSig.map(r => r.nieq)).toFixed(3),
  avg_ni:       +(niskSig.reduce((s, r) => s + r.ni * r.len, 0)  / niskSig.reduce((s, r) => s + r.len, 0)).toFixed(3),
  avg_cu:       +(niskSig.reduce((s, r) => s + r.cu * r.len, 0)  / niskSig.reduce((s, r) => s + r.len, 0)).toFixed(3),
  avg_pd:       +(niskSig.reduce((s, r) => s + r.pd * r.len, 0)  / niskSig.reduce((s, r) => s + r.len, 0)).toFixed(3),
  avg_co:       +(niskSig.reduce((s, r) => s + r.co * r.len, 0)  / niskSig.reduce((s, r) => s + r.len, 0)).toFixed(3),
};

// ── Build RAW JSON ───────────────────────────────────────────────────────────
const RAW = {
  lion: { stats: lionStats, holes: lionTopHoles, byYear: lionByYear, hist: lionHist, metalContrib },
  nisk: { stats: niskStats, holes: niskTopHoles, byYear: niskByYear },
};

const rawJson = JSON.stringify(RAW);
console.log('Lion holes:', lionTopHoles.length, '| Nisk holes:', niskTopHoles.length);
console.log('Lion sig rows:', lionSig.length, '| avg CuEq sig:', avgCuEq.toFixed(3));

// ── Patch JSX file ───────────────────────────────────────────────────────────
const jsx = fs.readFileSync(JSX_PATH, 'utf8');
const today = new Date().toISOString().slice(0, 10);

// Replace RAW const (single-line JSON object assignment)
const newJsx = jsx
  .replace(
    /^const RAW = \{.*\};$/m,
    `const RAW = ${rawJson};`
  )
  .replace(
    /(updated )[^)]+(\))/,
    `$1${today}$2`
  );

if (newJsx === jsx) {
  console.log('No changes detected — JSX already up to date.');
  process.exit(0);
}

fs.writeFileSync(JSX_PATH, newJsx, 'utf8');
console.log('JSX updated. Date stamped:', today);

// Also write pnpn_computed.json for reference
fs.writeFileSync(path.join(ROOT, 'pnpn_computed.json'), JSON.stringify({ ...RAW.lion, niskHoles: RAW.nisk.holes, nByYear: RAW.nisk.byYear }, null, 2));
console.log('Done.');
