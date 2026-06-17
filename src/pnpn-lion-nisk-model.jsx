import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, CartesianGrid, ReferenceLine, Cell,
  LineChart, Line
} from "recharts";

// ── REAL DATA — Power_Nickel_All_Data.xlsx (updated June 16, 2026) ──────────
const RAW = {"lion":{"stats":{"total_holes":91,"assay_rows":9878,"sig_rows":541,"avg_cueq_sig":8.314,"max_cueq":96.2,"avg_cu":4.028,"avg_au":1.062,"avg_pd":6.631,"avg_ag":30.176},"holes":[{"hole":"PML-25-012A","length":6.8,"grade":22.115,"maxGrade":71.207,"year":2025},{"hole":"PML-25-001","length":0.8,"grade":20.219,"maxGrade":20.219,"year":2025},{"hole":"PN-24-047","length":12,"grade":17.19,"maxGrade":38.156,"year":2024},{"hole":"PML-26-049","length":14.3,"grade":16.579,"maxGrade":35.549,"year":2026},{"hole":"PML-25-002","length":1.1,"grade":15.308,"maxGrade":31.859,"year":2025},{"hole":"PN-24-068","length":0.5,"grade":15.19,"maxGrade":15.19,"year":2024},{"hole":"PML-25-031","length":4.7,"grade":14.406,"maxGrade":29.641,"year":2025},{"hole":"PML-25-025A","length":5.3,"grade":14.255,"maxGrade":52.694,"year":2025},{"hole":"PN-24-051","length":8.5,"grade":13.898,"maxGrade":96.202,"year":2024},{"hole":"PN-24-059","length":7.2,"grade":12.882,"maxGrade":24.019,"year":2024},{"hole":"PN-24-055","length":14.1,"grade":12.506,"maxGrade":38.123,"year":2024},{"hole":"PN-24-071","length":13.7,"grade":12.463,"maxGrade":27.499,"year":2024},{"hole":"PML-25-023","length":6.2,"grade":11.814,"maxGrade":39.294,"year":2025},{"hole":"PML-25-022","length":10.3,"grade":11.364,"maxGrade":28.775,"year":2025},{"hole":"PN-23-031A","length":7,"grade":11.312,"maxGrade":62.817,"year":2023},{"hole":"PN-24-053","length":11.8,"grade":10.567,"maxGrade":43.312,"year":2024},{"hole":"PN-24-044","length":8,"grade":10.519,"maxGrade":37.431,"year":2024},{"hole":"PML-25-029B","length":7.4,"grade":10.106,"maxGrade":23.934,"year":2025},{"hole":"PN-25-096","length":7.2,"grade":9.502,"maxGrade":40.314,"year":2025},{"hole":"PN-24-067","length":3.3,"grade":9.456,"maxGrade":21.044,"year":2024},{"hole":"PN-24-070","length":26.4,"grade":9.372,"maxGrade":30.574,"year":2024},{"hole":"PN-24-086","length":4.6,"grade":9.081,"maxGrade":56.871,"year":2024},{"hole":"PML-25-015","length":14.3,"grade":9.044,"maxGrade":34.321,"year":2025},{"hole":"PN-24-063","length":4,"grade":9.025,"maxGrade":17.974,"year":2024},{"hole":"PN-24-054","length":5.5,"grade":8.105,"maxGrade":34.052,"year":2024},{"hole":"PML-25-005","length":6.1,"grade":8.095,"maxGrade":25.304,"year":2025},{"hole":"PN-24-095A","length":9.1,"grade":8.062,"maxGrade":26.431,"year":null},{"hole":"PN-24-079","length":13.9,"grade":7.276,"maxGrade":32.444,"year":2024},{"hole":"PML-25-045","length":12.5,"grade":6.999,"maxGrade":32.557,"year":2025},{"hole":"PML-25-008","length":1,"grade":6.977,"maxGrade":6.977,"year":2025},{"hole":"PN-24-074","length":2.5,"grade":6.895,"maxGrade":14.723,"year":2024},{"hole":"PN-25-100","length":4.9,"grade":6.776,"maxGrade":16.152,"year":2025},{"hole":"PML-25-043","length":7,"grade":6.769,"maxGrade":31.701,"year":2025},{"hole":"PN-24-066","length":5,"grade":6.616,"maxGrade":15.502,"year":2024},{"hole":"PML-25-020","length":20.9,"grade":6.363,"maxGrade":20.852,"year":2025},{"hole":"PN-24-073","length":6.1,"grade":5.853,"maxGrade":8.85,"year":2024},{"hole":"PML-25-046","length":12.7,"grade":5.72,"maxGrade":21.532,"year":2025},{"hole":"PML-25-047","length":6.7,"grade":5.713,"maxGrade":29.337,"year":2025},{"hole":"PN-24-048","length":15.2,"grade":5.708,"maxGrade":41.046,"year":2024},{"hole":"PN-24-057","length":5.8,"grade":5.647,"maxGrade":20.865,"year":2024},{"hole":"PML-25-013","length":2,"grade":5.634,"maxGrade":10.029,"year":2025},{"hole":"PN-24-056","length":2.5,"grade":5.158,"maxGrade":9.527,"year":2024},{"hole":"PN-24-060","length":7.7,"grade":5.053,"maxGrade":17.105,"year":2024},{"hole":"PN-24-072","length":21.5,"grade":4.952,"maxGrade":25.707,"year":2024},{"hole":"PN-24-081","length":1.9,"grade":4.8,"maxGrade":8.073,"year":2024},{"hole":"PN-24-078","length":13.8,"grade":4.697,"maxGrade":19.136,"year":2024},{"hole":"PML-25-034A","length":3,"grade":4.647,"maxGrade":10.324,"year":2025},{"hole":"PN-24-075","length":7.3,"grade":4.549,"maxGrade":10.662,"year":2024},{"hole":"PN-25-097","length":6.7,"grade":4.408,"maxGrade":12.944,"year":2025},{"hole":"PN-24-093","length":5.9,"grade":4.246,"maxGrade":6.408,"year":2024}],"byYear":[{"YEAR":2023,"holes":3,"maxGrade":62.817,"totalM":481.04,"avgGrade":0.46},{"YEAR":2024,"holes":45,"maxGrade":96.202,"totalM":17076.62,"avgGrade":0.75},{"YEAR":2025,"holes":42,"maxGrade":71.207,"totalM":23117.93,"avgGrade":0.331},{"YEAR":2026,"holes":1,"maxGrade":35.549,"totalM":230.51,"avgGrade":2.073}],"hist":[{"bin":"0–0.5%","count":9077},{"bin":"0.5–1%","count":260},{"bin":"1–2%","count":149},{"bin":"2–3%","count":76},{"bin":"3–5%","count":84},{"bin":"5–8%","count":70},{"bin":"8–12%","count":45},{"bin":"12–20%","count":47},{"bin":"20–40%","count":61}],"metalContrib":{"Cu":399.58,"Au":109.25,"Ag":31.05,"Pd":213.2,"Pt":71.71}},"nisk":{"stats":{"total_holes":127,"assay_rows":4591,"sig_rows":957,"avg_nieq_sig":1.694,"max_nieq":8.327,"avg_ni":0.949,"avg_cu":0.582,"avg_pd":1.062,"avg_co":0.064},"holes":[{"hole":"PN-23-022","length":0.5,"grade":3.876,"maxGrade":3.876,"year":2023},{"hole":"TF-71-10","length":4,"grade":3.535,"maxGrade":6.365,"year":2010},{"hole":"PN-22-012","length":7.8,"grade":2.873,"maxGrade":4.452,"year":2022},{"hole":"TF-31-07","length":0.5,"grade":2.788,"maxGrade":2.788,"year":2007},{"hole":"PMN-25-004","length":1,"grade":2.781,"maxGrade":2.781,"year":2025},{"hole":"PN-22-017","length":1.3,"grade":2.683,"maxGrade":3.536,"year":2022},{"hole":"PN-22-008","length":1.3,"grade":2.659,"maxGrade":3.152,"year":2022},{"hole":"PN-23-042","length":2,"grade":2.569,"maxGrade":2.632,"year":2023},{"hole":"TF-56-08","length":8.5,"grade":2.535,"maxGrade":3.812,"year":2008},{"hole":"PN-23-027","length":1.6,"grade":2.509,"maxGrade":2.558,"year":2023},{"hole":"PN-21-006","length":3.1,"grade":2.463,"maxGrade":2.883,"year":2021},{"hole":"PN-23-028","length":6.8,"grade":2.432,"maxGrade":2.842,"year":2023},{"hole":"PN-21-004","length":3.4,"grade":2.389,"maxGrade":3.112,"year":2021},{"hole":"TF-26-07","length":1,"grade":2.34,"maxGrade":2.982,"year":2007},{"hole":"TF-47-07","length":6.5,"grade":2.339,"maxGrade":3.195,"year":2007},{"hole":"TF-60-08","length":3.5,"grade":2.214,"maxGrade":3.012,"year":2008},{"hole":"PN-21-003A","length":14.9,"grade":2.207,"maxGrade":3.21,"year":2021},{"hole":"TF-05-07","length":17,"grade":2.152,"maxGrade":3.015,"year":2007},{"hole":"PN-22-014","length":3.5,"grade":2.112,"maxGrade":2.729,"year":2022},{"hole":"TF-66-08","length":1.5,"grade":2.076,"maxGrade":3.807,"year":2008},{"hole":"PN-22-009","length":28,"grade":2.041,"maxGrade":5.213,"year":2022},{"hole":"PN-23-036","length":8.8,"grade":2.013,"maxGrade":4.267,"year":2023},{"hole":"PN-21-005","length":8.9,"grade":2.009,"maxGrade":2.583,"year":2021},{"hole":"TF-22-07","length":4,"grade":2.007,"maxGrade":2.798,"year":2007},{"hole":"PN-23-035","length":9.9,"grade":2.002,"maxGrade":2.978,"year":2023}],"byYear":[{"YEAR":2007,"holes":46,"maxGrade":4.029,"totalM":8950.3,"avgGrade":0.698},{"YEAR":2008,"holes":18,"maxGrade":4.675,"totalM":4244.2,"avgGrade":0.696},{"YEAR":2010,"holes":2,"maxGrade":6.365,"totalM":1097.4,"avgGrade":0.33},{"YEAR":2011,"holes":11,"maxGrade":1.182,"totalM":2824,"avgGrade":0.13},{"YEAR":2021,"holes":8,"maxGrade":3.21,"totalM":2496,"avgGrade":0.666},{"YEAR":2022,"holes":12,"maxGrade":5.213,"totalM":4973.36,"avgGrade":0.31},{"YEAR":2023,"holes":17,"maxGrade":4.267,"totalM":8497.81,"avgGrade":0.303},{"YEAR":2024,"holes":4,"maxGrade":1.381,"totalM":2822.77,"avgGrade":0.165},{"YEAR":2025,"holes":9,"maxGrade":2.781,"totalM":4259.57,"avgGrade":0.12}]}};

// ── ANALYST GUIDANCE + COMPUTED MATRIX ────────────────────────────────────
// Metal grade ratios derived from actual drill data (sig samples)
// avg CuEq 8.282% → Cu 4.082%, Au 1.075g/t, Pd 6.721g/t, Ag 30.5g/t
const AVG_CUEQ = 8.314;
// Pt ratio derived from SGS met study: 2.90 g/t Pt at 5.37 g/t Pd composite → Pt/Pd = 0.540
const GRADE_RATIO = { cu: 4.028/AVG_CUEQ, au: 1.062/AVG_CUEQ, pd: 6.631/AVG_CUEQ, ag: 30.176/AVG_CUEQ, pt: 2.348/AVG_CUEQ };
// Lion: SGS LCT Jan 2026 testwork results
const REC_LION = { cu:0.989, au:0.850, pd:0.939, ag:0.889, pt:0.968, ni:0.771, co:0.79 };
// Nisk: no met testwork yet — conservative generic estimates
const REC_NISK = { cu:0.85,  au:0.80,  pd:0.67,  ag:0.75,  pt:0.67,  ni:0.70,  co:0.79 };
const PAY  = { cu:0.90, au:0.95, pd:0.78, ag:0.80, pt:0.78, ni:0.73, co:0.27 };
const LB=2204.62, OZ=31.1035; // g per troy oz (correct for g/t → oz/t conversion)
const SHARES_M = 237.195816; // fully diluted shares (237,195,816)

const DEF_P = { cu:4.50, au:3200, pd:1000, ag:32, pt:950, ni:7.00, co:12.00 };
const TAX_RATE = 0.375; // ~37.5% effective: 26.5% fed+prov corporate + ~16% Quebec mining duties, partially offset by deductions

function lionRevT(cueq, p) {
  const cu  = cueq * GRADE_RATIO.cu;
  const au  = cueq * GRADE_RATIO.au;
  const pd  = cueq * GRADE_RATIO.pd;
  const ag  = cueq * GRADE_RATIO.ag;
  const pt  = cueq * GRADE_RATIO.pt;
  return (
    cu/100*LB*p.cu*REC_LION.cu*PAY.cu +
    au/OZ*p.au*REC_LION.au*PAY.au +
    pd/OZ*p.pd*REC_LION.pd*PAY.pd +
    ag/OZ*p.ag*REC_LION.ag*PAY.ag +
    pt/OZ*p.pt*REC_LION.pt*PAY.pt
  );
}
function niskRevT(p) {
  return (
    0.764/100*LB*p.ni*REC_NISK.ni*PAY.ni +
    0.394/100*LB*p.cu*REC_NISK.cu*PAY.cu +
    0.048/100*LB*p.co*REC_NISK.co*PAY.co +
    0.705/OZ*p.pd*REC_NISK.pd*PAY.pd
  );
}
function calcNPV(revT, opex, tonnes, capexM, rate=0.08, life=15) {
  const ann = tonnes/life*(revT-opex)/1e6;
  let v = -capexM;
  for(let y=1;y<=life;y++) v += ann/Math.pow(1+rate,y);
  return v;
}

// Pre-build the full matrix
const MT_VALS   = [10, 11, 12, 13, 14];
const CUEQ_VALS = [4.25, 4.75, 5.5, 6.0, 7.0];

// NPV matrix at default prices
function buildMatrix(p, niskAddon, rate=0.08, life=15) {
  return MT_VALS.map(mt => {
    const row = { mt };
    CUEQ_VALS.forEach(cueq => {
      const capex = 400 + (mt - 10) * 20;
      const lNPV = calcNPV(lionRevT(cueq, p), 28, mt*1e6, capex, rate, life);
      row[cueq]        = +(lNPV + niskAddon).toFixed(0);
      row[`${cueq}_l`] = +lNPV.toFixed(0);
      row[`${cueq}_n`] = +niskAddon.toFixed(0);
    });
    return row;
  });
}

// Cu price sensitivity at 12Mt / 5.5%
function buildCuSens(p, niskAddon, rate=0.08, life=15, shares=306) {
  return [3.00,3.50,4.00,4.50,5.00,5.50,6.00,6.56].map(cu => {
    const pp = {...p, cu};
    const lRev = lionRevT(5.5, pp);
    const n = calcNPV(lRev, 28, 12e6, 440, rate, life) + niskAddon;
    const perSh = n/shares/0.73;
    return { cu: `$${cu.toFixed(2)}`, npv: +n.toFixed(0), perSh: +perSh.toFixed(2) };
  });
}

// ── UI TOKENS ──────────────────────────────────────────────────────────────
const C = {
  bg:"#0d1117", surface:"#161b22", card:"#1c2330", border:"#2d3748",
  copper:"#e85d00", sky:"#4fc3f7", sage:"#81c784", gold:"#ffd54f",
  muted:"#8b949e", text:"#e6edf3", sub:"#adbac7",
  hi:"#ff6f00",   // highlight for analyst range
  lo:"#1b5e20",   // low end
};

// ── MICRO COMPONENTS ───────────────────────────────────────────────────────
const Card = ({children,style={}}) => (
  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:16,...style}}>
    {children}
  </div>
);
const Hdr = ({children,style={}}) => (
  <div style={{color:C.muted,fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",
    borderBottom:`1px solid ${C.border}`,paddingBottom:8,marginBottom:12,...style}}>
    {children}
  </div>
);
const Kpi = ({label,value,unit,color=C.text,sub,big}) => (
  <div>
    <div style={{color:C.muted,fontSize:11,marginBottom:2}}>{label}</div>
    <div style={{color,fontSize:big?28:20,fontWeight:800,lineHeight:1.1}}>
      {value}<span style={{fontSize:12,fontWeight:400,color:C.sub,marginLeft:3}}>{unit}</span>
    </div>
    {sub && <div style={{color:C.muted,fontSize:11,marginTop:3}}>{sub}</div>}
  </div>
);
const Tag = ({c,children}) => (
  <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:4,
    padding:"2px 8px",fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase"}}>
    {children}
  </span>
);
const TT = ({active,payload,label,fmt}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:10,fontSize:12}}>
      {label&&<div style={{color:C.muted,marginBottom:4}}>{label}</div>}
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||C.text}}>{p.name}: {fmt?fmt(p.value):typeof p.value==='number'?p.value.toFixed(1):p.value}</div>
      ))}
    </div>
  );
};

// NPV matrix cell
function npvColor(v) {
  if(v>2500) return "#1b5e20";
  if(v>2000) return "#2e7d32";
  if(v>1500) return "#388e3c";
  if(v>1200) return "#558b2f";
  return "#827717";
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]     = useState("mre");
  const [p, setP]         = useState(DEF_P);
  const [selMt, setSelMt] = useState(12);
  const [selCuEq, setSelCuEq] = useState(5.5);
  const [navDiscount, setNavDiscount] = useState(50);
  const [discountRate, setDiscountRate] = useState(8);
  const [mineLife, setMineLife] = useState(15);
  const [sharesInput, setSharesInput] = useState("306");
  const sharesM = Math.max(1, parseFloat(sharesInput.replace(/,/g,"")) || 306);

  const niskN   = useMemo(()=>calcNPV(niskRevT(p),55,5.43e6,250,discountRate/100,mineLife),[p,discountRate,mineLife]);
  const matrix  = useMemo(()=>buildMatrix(p,niskN,discountRate/100,mineLife),[p,niskN,discountRate,mineLife]);
  const cuSens  = useMemo(()=>buildCuSens(p,niskN,discountRate/100,mineLife,sharesM),[p,niskN,discountRate,mineLife,sharesM]);

  const selRev  = useMemo(()=>lionRevT(selCuEq,p),[selCuEq,p]);
  const selLNPV = useMemo(()=>calcNPV(selRev,28,selMt*1e6,400+(selMt-10)*20,discountRate/100,mineLife),[selRev,selMt,discountRate,mineLife]);
  const selTot  = selLNPV + niskN;
  const selPerSh = selTot / sharesM / 0.73 * (1 - navDiscount/100); // USD->CAD, risked

  // Implied grades at selected CuEq
  const impl = {
    cu:  (selCuEq*GRADE_RATIO.cu).toFixed(2),
    au:  (selCuEq*GRADE_RATIO.au).toFixed(3),
    pd:  (selCuEq*GRADE_RATIO.pd).toFixed(2),
    ag:  (selCuEq*GRADE_RATIO.ag).toFixed(1),
  };
  const cu_kt  = (selMt*1e6 * selCuEq*GRADE_RATIO.cu/100 / 1000).toFixed(0);
  const au_koz = (selMt*1e6 * selCuEq*GRADE_RATIO.au/OZ / 1000).toFixed(0);
  const pd_koz = (selMt*1e6 * selCuEq*GRADE_RATIO.pd/OZ / 1000).toFixed(0);

  const TABS = [
    {id:"mre",    label:"MRE Range"},
    {id:"matrix", label:"NPV Matrix"},
    {id:"pxsens", label:"Cu Price Sens."},
    {id:"data",   label:"Drill Data"},
    {id:"assumptions", label:"Assumptions"},
  ];

  const Slider = ({label,field,min,max,step,unit}) => {
    const isDecimal = field==="cu"||field==="ni"||field==="co";
    const ticks = [];
    for(let v=min; v<=max+0.001; v=+(v+step).toFixed(4)) ticks.push(+v.toFixed(4));
    const maxTicks = 16;
    const filtered = ticks.length <= maxTicks ? ticks :
      ticks.filter((_,i)=>i===0||i===ticks.length-1||i%Math.ceil(ticks.length/maxTicks)===0);
    return (
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
          <span style={{color:C.sub,fontSize:12}}>{label}</span>
          <span style={{color:C.copper,fontSize:12,fontWeight:700}}>{unit}{p[field].toFixed(isDecimal?2:0)}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={p[field]}
          onChange={e=>setP(prev=>({...prev,[field]:+e.target.value}))}
          style={{width:"100%",accentColor:C.copper}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
          {filtered.map(v=>(
            <span key={v} style={{fontSize:9,color:p[field]===v?C.copper:C.muted,fontWeight:p[field]===v?700:400}}>
              {unit}{isDecimal?v.toFixed(2):v}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Inter','Segoe UI',sans-serif",fontSize:14}}>
      <style>{`
        @media (max-width: 600px) {
          .pnpn-header { padding: 12px 12px !important; }
          .pnpn-header h1 { font-size: 15px !important; }
          .pnpn-header .sub { font-size: 11px !important; }
          .pnpn-content { padding: 10px !important; }
          .pnpn-tabs button { padding: 4px 10px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="pnpn-header" style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"18px 24px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14}}>
          <div>
            <div style={{color:C.muted,fontSize:11,fontWeight:700,letterSpacing:"0.1em",marginBottom:4}}>
              TSXV: PNPN · Power Metallic Mines · Lion Zone MRE Model
            </div>
            <h1 style={{margin:0,fontSize:20,fontWeight:800,letterSpacing:"-0.02em"}}>
              Analyst Guidance: 10–14 Mt @ 4.25–7.0% CuEq
            </h1>
            <div style={{color:C.sub,fontSize:12,marginTop:3}}>
              Calibrated from 9,878 Lion Zone assay records · Inaugural MRE expected Q3 2026
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:4}}>
              Data last updated: <span style={{color:C.copper,fontWeight:600}}>{new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</span>
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            <Tag c={C.copper}>Lion CuEq</Tag>
            <Tag c={C.sky}>+Nisk NPV</Tag>
            <Tag c="#ff6f00">Analyst Range</Tag>
          </div>
        </div>
        <div className="pnpn-tabs" style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              background:tab===t.id?C.copper:"transparent",
              color:tab===t.id?"#fff":C.sub,
              border:`1px solid ${tab===t.id?C.copper:C.border}`,
              borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:600,cursor:"pointer",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="pnpn-content" style={{padding:18,maxWidth:"100%",margin:"0 auto"}}>

      {/* ══════ MRE RANGE TAB ══════ */}
      {tab==="mre" && (
        <div>
          {/* Range callout */}
          <Card style={{border:`1px solid #ff6f0088`,background:"#1a1000",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>
              <div style={{flex:"1 1 220px",minWidth:0}}>
                <div style={{color:"#ff6f00",fontWeight:800,fontSize:15,marginBottom:6}}>Analyst MRE Guidance</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12}}>
                  <div><div style={{color:C.muted,fontSize:11}}>Tonnage range</div>
                    <div style={{color:C.text,fontSize:22,fontWeight:800}}>10–14 Mt</div></div>
                  <div><div style={{color:C.muted,fontSize:11}}>Grade range (CuEq)</div>
                    <div style={{color:C.text,fontSize:22,fontWeight:800}}>4.25–7.0%</div></div>
                </div>
                <div style={{color:C.muted,fontSize:12,marginTop:8}}>
                  Actual sig-sample avg from drill data: <span style={{color:C.copper,fontWeight:700}}>8.28% CuEq</span> — guidance represents diluted MRE grade incl. internal waste &amp; halo material.
                </div>
              </div>
              <div style={{flex:"1 1 220px",minWidth:0}}>
                <div style={{color:C.sub,fontSize:11,fontWeight:700,marginBottom:6}}>ANALYST RANGE BOUNDS</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:6}}>
                  {[["Low End","10Mt @ 4.25%","~$1.5B pre-tax NPV"],["Base","12Mt @ 5.5%","~$2.5B pre-tax NPV"],["High End","14Mt @ 7.0%","~$4.0B pre-tax NPV"]].map(([l,v,n])=>(
                    <div key={l} style={{background:C.card,borderRadius:6,padding:"8px 10px"}}>
                      <div style={{color:C.muted,fontSize:10}}>{l}</div>
                      <div style={{color:C.copper,fontWeight:700,fontSize:13}}>{v}</div>
                      <div style={{color:C.sage,fontSize:11}}>{n} (Lion only)</div>
                    </div>
                  ))}
                  <div style={{background:C.card,borderRadius:6,padding:"8px 10px"}}>
                    <div style={{color:C.muted,fontSize:10}}>Drill data peak</div>
                    <div style={{color:C.copper,fontWeight:700,fontSize:13}}>93.7% CuEq</div>
                    <div style={{color:C.sub,fontSize:11}}>single sample</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive scenario picker */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Select Your MRE Scenario</Hdr>
              <div style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sub,fontSize:12}}>Tonnage</span>
                  <span style={{color:C.copper,fontWeight:700}}>{selMt} Mt</span>
                </div>
                <input type="range" min={10} max={14} step={0.5} value={selMt}
                  onChange={e=>setSelMt(+e.target.value)}
                  style={{width:"100%",accentColor:C.copper}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[10,10.5,11,11.5,12,12.5,13,13.5,14].map(v=>(
                    <span key={v} style={{fontSize:9,color:v===selMt?C.copper:C.muted,fontWeight:v===selMt?700:400}}>{v}Mt</span>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sub,fontSize:12}}>CuEq Grade</span>
                  <span style={{color:C.copper,fontWeight:700}}>{selCuEq.toFixed(2)}%</span>
                </div>
                <input type="range" min={4.25} max={7.0} step={0.25} value={selCuEq}
                  onChange={e=>setSelCuEq(+e.target.value)}
                  style={{width:"100%",accentColor:C.copper}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[4.25,4.5,4.75,5.0,5.25,5.5,5.75,6.0,6.25,6.5,6.75,7.0].map(v=>(
                    <span key={v} style={{fontSize:9,color:v===selCuEq?C.copper:"#ff6f00",fontWeight:v===selCuEq?700:400}}>
                      {v.toFixed(2)}%
                    </span>
                  ))}
                </div>
              </div>

              {/* Implied grades */}
              <div style={{background:C.surface,borderRadius:6,padding:12}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:8}}>
                  Implied metal grades (from actual drill data ratios)
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:8}}>
                  {[["Cu",impl.cu,"%",C.copper],["Au",impl.au,"g/t",C.gold],
                    ["Pd",impl.pd,"g/t",C.sage],["Ag",impl.ag,"g/t",C.sub]].map(([m,v,u,c])=>(
                    <div key={m}>
                      <span style={{color:C.muted,fontSize:11}}>{m} </span>
                      <span style={{color:c,fontWeight:700}}>{v}{u}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <Hdr>Scenario Output</Hdr>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:14,marginBottom:14}}>
                <Kpi label={`Lion NPV — Pre-Tax (${discountRate}%)`} value={"$"+selLNPV.toFixed(0)} unit="M" color={C.copper} big/>
                <Kpi label={`Nisk NPV — Pre-Tax (${discountRate}%)`} value={(niskN>=0?"$":"−$")+Math.abs(niskN).toFixed(0)} unit="M" color={niskN>=0?C.sky:"#ef5350"} big
                  sub={`Ni $${p.ni}/lb · Rev $${niskRevT(p).toFixed(0)}/t vs $55 opex`}/>
                <Kpi label="Combined NPV (Pre-Tax)" value={"$"+selTot.toFixed(0)} unit="M" color={C.sage}/>
                <Kpi label={`NAV/share (${navDiscount}% risked)`} value={"C$"+selPerSh.toFixed(2)} color={C.gold}
                  sub={`${sharesM.toFixed(1)}M dil. shares · 0.73 FX`}/>
                <Kpi label="Gross Rev/t (Lion)" value={"$"+selRev.toFixed(0)} unit="USD/t" color={C.copper}
                  sub={"Net $"+(selRev-28).toFixed(0)+"/t after $28 opex"}/>
              </div>
              <div style={{background:"#001a1a",border:`1px solid ${C.sky}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>Nickel Price (USD/lb)</span>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>${p.ni.toFixed(2)}/lb</span>
                </div>
                <input type="range" min={3} max={16} step={0.25} value={p.ni}
                  onChange={e=>setP(prev=>({...prev,ni:+e.target.value}))}
                  style={{width:"100%",accentColor:C.sky}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(v=>(
                    <span key={v} style={{fontSize:9,color:p.ni===v?C.sky:C.muted,fontWeight:p.ni===v?700:400}}>${v}</span>
                  ))}
                </div>
              </div>
              <div style={{background:"#0d1a2a",border:`1px solid ${C.sky}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>Discount Rate</span>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>{discountRate}%</span>
                </div>
                <input type="range" min={6} max={15} step={1} value={discountRate}
                  onChange={e=>setDiscountRate(+e.target.value)}
                  style={{width:"100%",accentColor:C.sky}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[6,7,8,9,10,11,12,13,14,15].map(v=>(
                    <span key={v} style={{fontSize:9,color:discountRate===v?C.sky:C.muted,fontWeight:discountRate===v?700:400}}>{v}%</span>
                  ))}
                </div>
              </div>
              <div style={{background:"#0d1a2a",border:`1px solid ${C.sky}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>Mine Life</span>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>{mineLife} yrs</span>
                </div>
                <input type="range" min={5} max={15} step={1} value={mineLife}
                  onChange={e=>setMineLife(+e.target.value)}
                  style={{width:"100%",accentColor:C.sky}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[5,6,7,8,9,10,11,12,13,14,15].map(v=>(
                    <span key={v} style={{fontSize:9,color:mineLife===v?C.sky:C.muted,fontWeight:mineLife===v?700:400}}>{v}</span>
                  ))}
                </div>
              </div>
              <div style={{background:"#1a1000",border:`1px solid ${C.gold}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.gold,fontSize:12,fontWeight:700}}>NAV Discount (exploration risk)</span>
                  <span style={{color:C.gold,fontSize:12,fontWeight:700}}>{navDiscount}%</span>
                </div>
                <input type="range" min={10} max={90} step={5} value={navDiscount}
                  onChange={e=>setNavDiscount(+e.target.value)}
                  style={{width:"100%",accentColor:C.gold}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90].map(v=>(
                    <span key={v} style={{fontSize:9,color:navDiscount===v?C.gold:C.muted,fontWeight:navDiscount===v?700:400}}>{v}%</span>
                  ))}
                </div>
              </div>
              <div style={{background:"#1a1000",border:`1px solid ${C.gold}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{color:C.gold,fontSize:12,fontWeight:700}}>Fully Diluted Shares (M)</span>
                  <span style={{color:C.muted,fontSize:10}}>e.g. 306 = 306,000,000</span>
                </div>
                <input
                  type="number"
                  min={1}
                  value={sharesInput}
                  onChange={e=>setSharesInput(e.target.value)}
                  style={{width:"100%",background:"#0d1a2a",border:`1px solid ${C.gold}88`,borderRadius:4,color:C.gold,fontSize:16,fontWeight:700,padding:"6px 10px",boxSizing:"border-box",outline:"none"}}
                />
                <div style={{color:C.muted,fontSize:10,marginTop:4}}>{sharesM.toFixed(3)}M shares = {(sharesM*1e6).toLocaleString()} shares</div>
              </div>
              {/* After-tax matrix */}
              <div style={{background:"#0d1117",border:`1px solid #ef535044`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{color:"#ef5350",fontWeight:700,fontSize:11,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>
                  Estimated After-Tax — {selMt}Mt @ {selCuEq.toFixed(2)}% CuEq · {discountRate}% Disc · {navDiscount}% NAV Disc
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8,marginBottom:12}}>
                  {[
                    ["Lion (after-tax)", "$"+(selLNPV*(1-TAX_RATE)).toFixed(0)+"M", C.copper],
                    ["Nisk (after-tax)", (niskN*(1-TAX_RATE)>=0?"$":"−$")+Math.abs(niskN*(1-TAX_RATE)).toFixed(0)+"M", niskN>=0?C.sky:"#ef5350"],
                    ["Combined (after-tax)", "$"+(selTot*(1-TAX_RATE)).toFixed(0)+"M", C.sage],
                    ["NAV/share (after-tax)", "C$"+(selTot*(1-TAX_RATE)/sharesM/0.73*(1-navDiscount/100)).toFixed(2), C.gold],
                  ].map(([l,v,c])=>(
                    <div key={l} style={{background:"#1a0000",borderRadius:6,padding:"8px 10px"}}>
                      <div style={{color:C.muted,fontSize:10,marginBottom:3}}>{l}</div>
                      <div style={{color:c,fontWeight:700,fontSize:14}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{color:C.sub,fontWeight:700,fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>
                  After-Tax NPV Matrix ($M USD) — {discountRate}% Discount · Current Metal Prices · {navDiscount}% NAV Discount
                </div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"separate",borderSpacing:3}}>
                    <thead>
                      <tr>
                        <th style={{color:C.muted,fontSize:10,padding:"4px 8px",textAlign:"left",fontWeight:600}}>Mt ↓ / CuEq →</th>
                        {CUEQ_VALS.map(c=>(
                          <th key={c} style={{color:"#ff6f00",fontSize:11,padding:"4px 8px",textAlign:"center",fontWeight:700}}>{c}%</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.map((row)=>(
                        <tr key={row.mt}>
                          <td style={{color:C.copper,fontWeight:700,fontSize:12,padding:"4px 8px"}}>{row.mt}Mt</td>
                          {CUEQ_VALS.map(c=>{
                            const at = +(row[c]*(1-TAX_RATE)).toFixed(0);
                            const atNav = +(at/sharesM/0.73*(1-navDiscount/100)).toFixed(2);
                            const isSelected = row.mt===selMt && Math.abs(c-selCuEq)<0.01;
                            return (
                              <td key={c} onClick={()=>{setSelMt(row.mt);setSelCuEq(c);}}
                                style={{
                                  background:npvColor(row[c]),
                                  border:isSelected?`2px solid ${C.gold}`:`2px solid transparent`,
                                  borderRadius:6,padding:"6px 8px",textAlign:"center",cursor:"pointer",
                                }}>
                                <div style={{color:"#fff",fontWeight:700,fontSize:12}}>${at.toLocaleString()}M</div>
                                <div style={{color:"rgba(255,255,255,0.6)",fontSize:9}}>C${atNav}/sh</div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{color:C.muted,fontSize:10,marginTop:6}}>37.5% effective tax rate (fed + prov + mining duties). Pre-tax matrix in NPV Matrix tab.</div>
              </div>
              <div style={{background:C.surface,borderRadius:6,padding:12}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:8}}>Contained metal ({selMt}Mt)</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["Cu",cu_kt,"kt"],["Au",au_koz,"koz"],["Pd",pd_koz,"koz"]].map(([m,v,u])=>(
                    <div key={m} style={{textAlign:"center",background:C.card,borderRadius:5,padding:"8px 4px"}}>
                      <div style={{color:C.muted,fontSize:10}}>{m}</div>
                      <div style={{color:C.copper,fontWeight:700,fontSize:16}}>{v}</div>
                      <div style={{color:C.sub,fontSize:10}}>{u}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Visual: NAV/sh across full range */}
          <Card style={{marginBottom:14}}>
            <Hdr>Unrisked Pre-Tax NAV/Share (C$) Across Analyst Guidance Range — at Cu ${p.cu}/lb, Pd ${p.pd}/oz</Hdr>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart margin={{top:10,right:30,left:10,bottom:5}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="cueq" type="number" domain={[4.0,7.2]} tickCount={8}
                  tick={{fill:C.sub,fontSize:11}} label={{value:"CuEq %",fill:C.muted,fontSize:11,position:"insideBottom",offset:-5}}/>
                <YAxis tick={{fill:C.sub,fontSize:11}} unit="$"
                  label={{value:"C$/sh",fill:C.muted,fontSize:11,angle:-90,position:"insideLeft"}}/>
                <ReferenceLine x={4.25} stroke="#ff6f00" strokeDasharray="4 3" label={{value:"Low",fill:"#ff6f00",fontSize:9}}/>
                <ReferenceLine x={7.0}  stroke="#ff6f00" strokeDasharray="4 3" label={{value:"High",fill:"#ff6f00",fontSize:9}}/>
                <Tooltip content={({active,payload})=>{
                  if(!active||!payload?.length) return null;
                  const d=payload[0]?.payload;
                  return <div style={{background:C.card,border:`1px solid ${C.border}`,padding:10,borderRadius:6,fontSize:12}}>
                    <div style={{color:C.muted}}>{d?.mt}Mt @ {d?.cueq}% CuEq</div>
                    {payload.map((pp,i)=><div key={i} style={{color:pp.color,fontWeight:700}}>C${pp.value?.toFixed(2)}/sh</div>)}
                  </div>;
                }}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                {MT_VALS.map((mt,mi)=>{
                  const clrs=["#e85d00","#f57c00","#ffa726","#66bb6a","#26a69a"];
                  const pts=[];
                  for(let cueq=4.0;cueq<=7.2;cueq=+(cueq+0.25).toFixed(2)){
                    const capex=400+(mt-10)*20;
                    const lRev=lionRevT(cueq,p);
                    const n=calcNPV(lRev,28,mt*1e6,capex)+niskN;
                    pts.push({cueq,nav:+(n/sharesM/0.73).toFixed(2),mt});
                  }
                  return <Line key={mt} data={pts} dataKey="nav" name={`${mt}Mt`}
                    stroke={clrs[mi]} dot={false} strokeWidth={2}/>;
                })}
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Grade context */}
          <Card>
            <Hdr>Grade Context — Where Analyst Guidance Sits vs Actual Drill Data</Hdr>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={RAW.lion.hist} margin={{top:5,right:10,left:-10,bottom:40}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="bin" tick={{fill:C.sub,fontSize:10}} angle={-40} textAnchor="end" height={55}/>
                <YAxis tick={{fill:C.muted,fontSize:10}}/>
                <Tooltip content={<TT fmt={v=>v+" samples"}/>}/>
                <ReferenceLine x="3–5%" stroke="#ff6f00" strokeWidth={2} strokeDasharray="4 3"
                  label={{value:"Analyst low",fill:"#ff6f00",fontSize:9,position:"top"}}/>
                <ReferenceLine x="5–8%" stroke="#ff6f00" strokeWidth={2}
                  label={{value:"Analyst mid",fill:"#ff6f00",fontSize:9,position:"top"}}/>
                <Bar dataKey="count" name="Samples" radius={[3,3,0,0]}>
                  {RAW.lion.hist.map((e,i)=>{
                    const inRange = ["3–5%","5–8%","8–12%"].includes(e.bin);
                    return <Cell key={i} fill={inRange?"#ff6f00":C.border} opacity={inRange?0.9:0.5}/>;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{color:C.muted,fontSize:12,marginTop:8}}>
              Highlighted bins (3–12% CuEq) represent the analyst guidance grade range as a diluted average. The vast majority of samples are low-grade / waste; the MRE will model the high-grade core with appropriate dilution.
            </div>
          </Card>
        </div>
      )}

      {/* ══════ NPV MATRIX TAB ══════ */}
      {tab==="matrix" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginBottom:16}}>
            <Card>
              <Hdr>Metal Prices</Hdr>
              <Slider label="Copper (USD/lb)"  field="cu"  min={3}   max={12}   step={0.05} unit="$"/>
              <Slider label="Palladium (USD/oz)" field="pd" min={600} max={4000} step={25}   unit="$"/>
              <Slider label="Gold (USD/oz)"    field="au"  min={2000} max={6000} step={50}   unit="$"/>
              <Slider label="Nickel (USD/lb)"  field="ni"  min={5}   max={25}   step={0.25} unit="$"/>
              <Slider label="Silver (USD/oz)"  field="ag"  min={20}  max={100}  step={1}    unit="$"/>
              <Slider label="Platinum (USD/oz)" field="pt" min={600} max={3000} step={25}   unit="$"/>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:6}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Nisk add-on NPV</div>
                <div style={{color:C.sky,fontWeight:700,fontSize:16}}>${niskN.toFixed(0)}M</div>
                <div style={{color:C.muted,fontSize:11}}>Included in all cells</div>
              </div>
            </Card>

            <Card>
              <Hdr>NPV Matrix — Pre-Tax $M USD · Lion + Nisk · {discountRate}% Discount · {mineLife}yr Life</Hdr>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"separate",borderSpacing:3}}>
                  <thead>
                    <tr>
                      <th style={{color:C.muted,fontSize:11,padding:"6px 10px",textAlign:"left",fontWeight:600}}>Mt ↓ / CuEq →</th>
                      {CUEQ_VALS.map(c=>(
                        <th key={c} style={{color:"#ff6f00",fontSize:12,padding:"6px 10px",textAlign:"center",fontWeight:700}}>
                          {c}%
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row,ri)=>(
                      <tr key={row.mt}>
                        <td style={{color:C.copper,fontWeight:700,fontSize:13,padding:"6px 10px"}}>{row.mt}Mt</td>
                        {CUEQ_VALS.map(c=>{
                          const v=row[c], lv=row[`${c}_l`], nv=row[`${c}_n`];
                          const isSelected = row.mt===selMt && Math.abs(c-selCuEq)<0.01;
                          return (
                            <td key={c} onClick={()=>{setSelMt(row.mt);setSelCuEq(c);setTab("mre");}}
                              style={{
                                background:npvColor(v),
                                border:isSelected?`2px solid ${C.gold}`:`2px solid transparent`,
                                borderRadius:6,padding:"8px 10px",textAlign:"center",cursor:"pointer",
                                transition:"opacity 0.1s",
                              }}>
                              <div style={{color:"#fff",fontWeight:700,fontSize:13}}>${v.toLocaleString()}M</div>
                              <div style={{color:"rgba(255,255,255,0.5)",fontSize:9,margin:"3px 0 1px"}}>
                                Lion ${lv.toLocaleString()}M · Nisk ${nv.toLocaleString()}M
                              </div>
                              <div style={{color:"rgba(255,255,255,0.6)",fontSize:10}}>
                                C${(v/sharesM/0.73).toFixed(2)}/sh
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{display:"flex",gap:6,marginTop:10,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{color:C.muted,fontSize:11}}>Color scale:</span>
                {[["$1.0–1.2B","#827717"],["$1.2–1.5B","#558b2f"],["$1.5–2.0B","#388e3c"],["$2.0–2.5B","#2e7d32"],["$2.5B+","#1b5e20"]].map(([l,bg])=>(
                  <span key={l} style={{background:bg,borderRadius:4,padding:"2px 8px",fontSize:10,color:"#fff"}}>{l}</span>
                ))}
              </div>
              <div style={{color:C.muted,fontSize:11,marginTop:8}}>
                Click any cell to load that scenario in the MRE Range tab. All values include Nisk add-on NPV (${niskN.toFixed(0)}M at current prices). Capex: $400M base +$20M/Mt over 10Mt. OPEX: $28/t Lion, $55/t Nisk.
              </div>
            </Card>
          </div>

          {/* Waterfall: metal contribution at 12Mt/5.5% */}
          <Card>
            <Hdr>Revenue per Tonne by Metal — 12Mt @ 5.5% CuEq at Current Prices</Hdr>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart layout="vertical" margin={{top:5,right:60,left:50,bottom:5}}
                data={(() => {
                  const cueq=5.5;
                  return [
                    {m:"Cu",  v:+(cueq*GRADE_RATIO.cu/100*LB*p.cu*REC_LION.cu*PAY.cu).toFixed(0)},
                    {m:"Pd",  v:+(cueq*GRADE_RATIO.pd/OZ*p.pd*REC_LION.pd*PAY.pd).toFixed(0)},
                    {m:"Au",  v:+(cueq*GRADE_RATIO.au/OZ*p.au*REC_LION.au*PAY.au).toFixed(0)},
                    {m:"Ag",  v:+(cueq*GRADE_RATIO.ag/OZ*p.ag*REC_LION.ag*PAY.ag).toFixed(0)},
                    {m:"Pt",  v:+(cueq*GRADE_RATIO.pt/OZ*p.pt*REC_LION.pt*PAY.pt).toFixed(0)},
                  ];
                })()}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis type="number" tick={{fill:C.sub,fontSize:11}} unit=" $/t"/>
                <YAxis type="category" dataKey="m" tick={{fill:C.sub,fontSize:12}} width={30}/>
                <Tooltip formatter={v=>`$${v}/t`} contentStyle={{background:C.card,border:`1px solid ${C.border}`}}/>
                <Bar dataKey="v" name="USD/t" radius={[0,4,4,0]} label={{position:"right",fill:C.text,fontSize:11,formatter:v=>`$${v}`}}>
                  {["Cu","Pd","Au","Ag","Pt"].map((m,i)=>(
                    <Cell key={m} fill={[C.copper,C.sage,C.gold,"#90a4ae","#ce93d8"][i]}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* ══════ CU PRICE SENSITIVITY ══════ */}
      {tab==="pxsens" && (
        <div>
          <Card style={{marginBottom:14,background:"#001220",border:`1px solid ${C.sky}44`}}>
            <div style={{color:C.sky,fontWeight:700,fontSize:13,marginBottom:6}}>Why Copper Price Matters So Much</div>
            <div style={{color:C.sub,fontSize:13,lineHeight:1.65}}>
              At 12Mt / 5.5% CuEq, every <strong style={{color:C.copper}}>$0.50/lb increase in copper</strong> adds ~$275M to NPV and roughly <strong style={{color:C.gold}}>C$1.67/share</strong> to NAV.
              Current spot Cu (~$4.50/lb) is the model default. PNPN's Pd-heavy metallurgy (38% of CuEq revenue from Pd at $1,000/oz) provides material diversification vs pure Cu plays.
              Spot Cu as of mid-2026 has traded as high as <strong style={{color:C.copper}}>$6.56/lb</strong> — shown on the chart.
            </div>
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Combined NPV (Pre-Tax) vs. Copper Price — 12Mt @ 5.5% CuEq</Hdr>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={cuSens} margin={{top:10,right:20,left:10,bottom:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                  <XAxis dataKey="cu" tick={{fill:C.sub,fontSize:11}}
                    label={{value:"Cu Price (USD/lb)",fill:C.muted,fontSize:11,position:"insideBottom",offset:-12}}/>
                  <YAxis tick={{fill:C.sub,fontSize:11}} unit="M"
                    label={{value:"NPV $M",fill:C.muted,fontSize:11,angle:-90,position:"insideLeft"}}/>
                  <ReferenceLine x="$4.50" stroke={C.copper} strokeDasharray="3 3"
                    label={{value:"Default",fill:C.copper,fontSize:9}}/>
                  <ReferenceLine x="$6.56" stroke={C.sage} strokeDasharray="3 3"
                    label={{value:"2026 spot",fill:C.sage,fontSize:9}}/>
                  <Tooltip content={({active,payload})=>{
                    if(!active||!payload?.length) return null;
                    const d=payload[0]?.payload;
                    return <div style={{background:C.card,border:`1px solid ${C.border}`,padding:10,borderRadius:6,fontSize:12}}>
                      <div style={{color:C.copper,fontWeight:700}}>Cu {d?.cu}</div>
                      <div style={{color:C.text}}>NPV: ${d?.npv?.toLocaleString()}M</div>
                      <div style={{color:C.gold}}>NAV: C${(d?.perSh*(1-navDiscount/100)).toFixed(2)}/sh</div>
                    </div>;
                  }}/>
                  <Line dataKey="npv" name="NPV ($M)" stroke={C.copper} strokeWidth={2.5} dot={{r:4,fill:C.copper}}/>
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <Hdr>Implied NAV/Share (C$) vs. Copper Price</Hdr>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={cuSens} margin={{top:10,right:10,left:10,bottom:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                  <XAxis dataKey="cu" tick={{fill:C.sub,fontSize:11}}
                    label={{value:"Cu Price",fill:C.muted,fontSize:11,position:"insideBottom",offset:-12}}/>
                  <YAxis tick={{fill:C.sub,fontSize:11}} unit="$"/>
                  <ReferenceLine y={3} stroke={C.copper} strokeDasharray="4 3"
                    label={{value:"Entry C$1.38",fill:C.copper,fontSize:9,position:"insideRight"}}/>
                  <Tooltip formatter={v=>`C$${v}/sh`} contentStyle={{background:C.card,border:`1px solid ${C.border}`}}/>
                  <Bar dataKey="perSh" name="NAV/sh (C$)" radius={[3,3,0,0]}>
                    {cuSens.map((d,i)=><Cell key={i} fill={d.perSh*(1-navDiscount/100)>10?C.sage:d.perSh*(1-navDiscount/100)>7?C.copper:C.muted}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Sensitivity table */}
          <Card>
            <Hdr>Sensitivity Table — 12Mt @ 5.5% CuEq · Combined Lion + Nisk</Hdr>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Cu Price","Rev/t Lion","Net/t Lion","NPV Combined (Pre-Tax)","NAV/sh (C$)","Mkt Cap (C$)"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"6px 12px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cuSens.map((d,i)=>{
                    const lRev = lionRevT(5.5,{...p,cu:parseFloat(d.cu.replace("$",""))});
                    const isDefault = d.cu==="$4.50";
                    return (
                      <tr key={d.cu} style={{background:isDefault?"#1a0e0088":i%2===0?"transparent":C.surface+"55",
                        borderBottom:`1px solid ${C.border}22`}}>
                        <td style={{padding:"6px 12px",color:C.copper,fontWeight:700}}>{d.cu}/lb</td>
                        <td style={{padding:"6px 12px",color:C.text}}>${lRev.toFixed(0)}/t</td>
                        <td style={{padding:"6px 12px",color:C.sub}}>${(lRev-28).toFixed(0)}/t</td>
                        <td style={{padding:"6px 12px",color:C.sage,fontWeight:700}}>${d.npv.toLocaleString()}M</td>
                        <td style={{padding:"6px 12px",color:C.gold,fontWeight:700}}>C${(d.perSh*(1-navDiscount/100)).toFixed(2)}</td>
                        <td style={{padding:"6px 12px",color:C.sub}}>C${(d.npv/0.73/1000).toFixed(1)}B</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:8}}>
              ~{sharesM.toFixed(1)}M diluted shares · USD/CAD 0.73 · {discountRate}% discount · {mineLife}yr life · $28/t opex (Lion open pit) · $55/t (Nisk UG) · CAPEX $650M combined
            </div>
          </Card>
        </div>
      )}

      {/* ══════ DRILL DATA TAB ══════ */}
      {tab==="data" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10,marginBottom:14}}>
            <Card><Kpi label="Lion Holes" value={91} color={C.copper} sub="2023–2026"/></Card>
            <Card><Kpi label="Sig Samples ≥1%" value={533} color={C.copper} sub="of 9,878 total"/></Card>
            <Card><Kpi label="Avg CuEq (sig)" value="8.28" unit="%" color={C.copper}/></Card>
            <Card><Kpi label="Best Hole Avg" value="21.6" unit="% CuEq" color={C.copper} sub="PML-25-012A · 6.8m"/></Card>
            <Card><Kpi label="Analyst Low" value="4.25" unit="% CuEq" color="#ff6f00" sub="10Mt scenario"/></Card>
            <Card><Kpi label="Analyst High" value="7.0" unit="% CuEq" color="#ff6f00" sub="14Mt scenario"/></Card>
          </div>

          <Card style={{marginBottom:14}}>
            <Hdr>Top 20 Lion Holes — Avg CuEq vs Sig Length (colour = year)</Hdr>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{top:10,right:20,left:0,bottom:20}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="length" name="Length (m)" type="number"
                  tick={{fill:C.sub,fontSize:11}} label={{value:"Significant Length (m)",fill:C.muted,fontSize:11,position:"insideBottom",offset:-12}}/>
                <YAxis dataKey="grade" name="CuEq %" type="number"
                  tick={{fill:C.sub,fontSize:11}} label={{value:"Avg CuEq %",fill:C.muted,fontSize:11,angle:-90,position:"insideLeft"}}/>
                <ReferenceLine y={7.0}  stroke="#ff6f00" strokeDasharray="4 3" label={{value:"Analyst high 7%",fill:"#ff6f00",fontSize:9}}/>
                <ReferenceLine y={4.25} stroke="#ff6f00" strokeDasharray="4 3" strokeOpacity={0.6} label={{value:"Analyst low 4.25%",fill:"#ff6f00",fontSize:9}}/>
                <Tooltip content={({active,payload})=>{
                  if(!active||!payload?.length) return null;
                  const d=payload[0].payload;
                  return <div style={{background:C.card,border:`1px solid ${C.border}`,padding:10,borderRadius:6,fontSize:12}}>
                    <div style={{color:C.copper,fontWeight:700}}>{d.hole}</div>
                    <div style={{color:C.sub}}>{d.length}m @ {d.grade.toFixed(2)}% CuEq</div>
                    <div style={{color:C.muted}}>{d.year||"n/a"}</div>
                  </div>;
                }}/>
                <Scatter data={RAW.lion.holes.slice(0,40)} fill={C.copper} opacity={0.85}
                  shape={({cx,cy,payload})=>{
                    const cols={2023:"#9575cd",2024:C.copper,2025:C.sky,2026:C.sage};
                    return <circle cx={cx} cy={cy} r={5} fill={cols[payload.year]||C.muted} opacity={0.85}/>;
                  }}/>
              </ScatterChart>
            </ResponsiveContainer>
            <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:4}}>
              {[["2023","#9575cd"],["2024",C.copper],["2025",C.sky],["2026",C.sage]].map(([y,c])=>(
                <span key={y} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.sub}}>
                  <span style={{width:9,height:9,borderRadius:"50%",background:c,display:"inline-block"}}/>
                  {y}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <Hdr>Top 25 Lion Holes by Composite Grade</Hdr>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["#","Hole ID","Sig. Length","Avg CuEq","Peak CuEq","Year","vs Guidance"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"5px 10px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RAW.lion.holes.slice(0,25).map((h,i)=>{
                    const vs = h.grade>=7.0?"Above high":h.grade>=4.25?"In range":"Below low";
                    const vsC = h.grade>=7.0?C.sage:h.grade>=4.25?"#ff6f00":C.muted;
                    return (
                      <tr key={h.hole} style={{background:i%2===1?C.surface+"55":"transparent",borderBottom:`1px solid ${C.border}18`}}>
                        <td style={{padding:"5px 10px",color:C.muted,fontSize:11}}>{i+1}</td>
                        <td style={{padding:"5px 10px",color:C.copper,fontWeight:700,fontSize:12}}>{h.hole}</td>
                        <td style={{padding:"5px 10px",color:C.sub}}>{h.length}m</td>
                        <td style={{padding:"5px 10px",color:C.text,fontWeight:700}}>{h.grade.toFixed(2)}%</td>
                        <td style={{padding:"5px 10px",color:C.muted}}>{h.maxGrade.toFixed(1)}%</td>
                        <td style={{padding:"5px 10px",color:C.muted}}>{h.year||"—"}</td>
                        <td style={{padding:"5px 10px"}}><span style={{color:vsC,fontSize:11,fontWeight:600}}>{vs}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:8}}>
              "Sig. Length" = total metres ≥1% CuEq within each hole. Composite grade is length-weighted average over those intervals. All 25 holes exceed the analyst guidance low of 4.25% CuEq at the hole level.
            </div>
          </Card>
        </div>
      )}

      {/* ══════ ASSUMPTIONS TAB ══════ */}
      {tab==="assumptions" && (
        <div>

          {/* Recoveries */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Lion Zone Recoveries — SGS Locked Cycle Test (Jan 2026)</Hdr>
              <div style={{background:"#001a0a",border:`1px solid ${C.sage}44`,borderRadius:6,padding:10,marginBottom:12,fontSize:12,color:C.sub,lineHeight:1.6}}>
                Blended composite (50/50 HG/LG), 103+99 samples from 25 drill holes.
                Concentrate grade: 25.8% Cu · 41.4 g/t Pd · 23.4 g/t Pt · 4.83 g/t Au · 159 g/t Ag · 1.2% Ni
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Metal","Feed Grade","Recovery"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"5px 10px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cu","3.42%",  REC_LION.cu*100, C.copper],
                    ["Pd","5.37 g/t", REC_LION.pd*100, C.sage],
                    ["Pt","2.90 g/t", REC_LION.pt*100, C.sage],
                    ["Au","0.70 g/t", REC_LION.au*100, C.gold],
                    ["Ag","24.9 g/t", REC_LION.ag*100, C.sub],
                    ["Ni","0.20%",  REC_LION.ni*100, C.sky],
                    ["Co","—",      REC_LION.co*100, C.muted],
                  ].map(([m,feed,rec,c],i)=>(
                    <tr key={m} style={{background:i%2===1?C.surface+"55":"transparent",borderBottom:`1px solid ${C.border}18`}}>
                      <td style={{padding:"6px 10px",color:c,fontWeight:700}}>{m}</td>
                      <td style={{padding:"6px 10px",color:C.sub,fontSize:12}}>{feed}</td>
                      <td style={{padding:"6px 10px"}}>
                        <span style={{color:c,fontWeight:700,fontSize:13}}>{rec.toFixed(1)}%</span>
                        {m==="Co"&&<span style={{color:C.muted,fontSize:10}}> (est — no testwork)</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <Hdr>Nisk Recoveries — Generic Estimates (No Testwork Yet)</Hdr>
              <div style={{background:"#1a1000",border:`1px solid ${C.gold}44`,borderRadius:6,padding:10,marginBottom:12,fontSize:12,color:C.sub,lineHeight:1.6}}>
                No metallurgical testwork completed on Nisk to date. Conservative peer-comparable estimates used pending a future met study.
              </div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Metal","Recovery","vs Lion"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"5px 10px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cu",  REC_NISK.cu*100, REC_LION.cu*100, C.copper],
                    ["Pd",  REC_NISK.pd*100, REC_LION.pd*100, C.sage],
                    ["Pt",  REC_NISK.pt*100, REC_LION.pt*100, C.sage],
                    ["Au",  REC_NISK.au*100, REC_LION.au*100, C.gold],
                    ["Ag",  REC_NISK.ag*100, REC_LION.ag*100, C.sub],
                    ["Ni",  REC_NISK.ni*100, REC_LION.ni*100, C.sky],
                    ["Co",  REC_NISK.co*100, REC_LION.co*100, C.muted],
                  ].map(([m,rec,lionRec,c],i)=>{
                    const diff = rec - lionRec;
                    return (
                      <tr key={m} style={{background:i%2===1?C.surface+"55":"transparent",borderBottom:`1px solid ${C.border}18`}}>
                        <td style={{padding:"6px 10px",color:c,fontWeight:700}}>{m}</td>
                        <td style={{padding:"6px 10px",color:C.text,fontWeight:700,fontSize:13}}>{rec.toFixed(1)}%</td>
                        <td style={{padding:"6px 10px",fontSize:11,color:diff<0?"#ef5350":C.muted}}>
                          {diff<0?diff.toFixed(1)+"pp":"+0"} vs Lion
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Payabilities */}
          <Card style={{marginBottom:14}}>
            <Hdr>Smelter Payabilities — Applied to Both Deposits</Hdr>
            <div style={{color:C.muted,fontSize:12,marginBottom:12,lineHeight:1.6}}>
              Payabilities represent the fraction of recovered metal the smelter/refinery actually pays for, after deductions. These are industry-standard estimates — actual terms depend on future offtake negotiations. SGS noted potential for value-added processing (battery materials, advanced manufacturing) which could improve these significantly.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10}}>
              {[["Cu",PAY.cu,C.copper],["Au",PAY.au,C.gold],["Pd",PAY.pd,C.sage],
                ["Pt",PAY.pt,C.sage],["Ag",PAY.ag,C.sub],["Ni",PAY.ni,C.sky],["Co",PAY.co,C.muted]].map(([m,v,c])=>(
                <div key={m} style={{background:C.card,borderRadius:6,padding:"10px",textAlign:"center"}}>
                  <div style={{color:C.muted,fontSize:11,marginBottom:4}}>{m}</div>
                  <div style={{color:c,fontWeight:700,fontSize:18}}>{(v*100).toFixed(0)}%</div>
                  <div style={{color:C.muted,fontSize:10,marginTop:2}}>payability</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mining cost assumptions */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Lion Zone — Mining Cost Assumptions</Hdr>
              <div style={{color:C.muted,fontSize:12,marginBottom:12}}>Open pit. Analyst estimates — no PEA published.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  ["OPEX","$28/t","milled"],
                  ["CAPEX (base)","$400M","at 10 Mt"],
                  ["CAPEX scaling","+$20M/Mt","over 10 Mt"],
                  ["CAPEX (12 Mt)","$440M","illustrative"],
                  ["CAPEX (14 Mt)","$480M","illustrative"],
                  ["Mine life",`${mineLife} years`,"slider above"],
                ].map(([l,v,sub])=>(
                  <div key={l} style={{background:C.surface,borderRadius:6,padding:"10px 12px"}}>
                    <div style={{color:C.muted,fontSize:10,marginBottom:3}}>{l}</div>
                    <div style={{color:C.copper,fontWeight:700,fontSize:15}}>{v}</div>
                    <div style={{color:C.muted,fontSize:10}}>{sub}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <Hdr>Nisk — Mining Cost Assumptions</Hdr>
              <div style={{color:C.muted,fontSize:12,marginBottom:12}}>Underground. Analyst estimates — no PEA published.</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  ["OPEX","$55/t","milled (UG premium)"],
                  ["CAPEX","$250M","fixed"],
                  ["Tonnes","5.43 Mt","resource estimate"],
                  ["Mine life",`${mineLife} years`,"slider above"],
                  ["Ni grade","0.764%","avg significant"],
                  ["Cu grade","0.394%","avg significant"],
                ].map(([l,v,sub])=>(
                  <div key={l} style={{background:C.surface,borderRadius:6,padding:"10px 12px"}}>
                    <div style={{color:C.muted,fontSize:10,marginBottom:3}}>{l}</div>
                    <div style={{color:C.sky,fontWeight:700,fontSize:15}}>{v}</div>
                    <div style={{color:C.muted,fontSize:10}}>{sub}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Model-wide assumptions */}
          <Card>
            <Hdr>Model-Wide Assumptions</Hdr>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {[
                ["Diluted Shares",`${sharesM.toFixed(1)}M`,"fully diluted"],
                ["USD/CAD FX","0.73","for NAV/share"],
                ["Discount Rate","8% default","adjustable 6–15%"],
                ["NAV Discount","50% default","adjustable 10–90%"],
                ["Lion Opex basis","$/t milled","open pit"],
                ["Nisk Opex basis","$/t milled","underground"],
                ["Grade ratios","actual drill data","9,878 assay records"],
                ["Met study","SGS LCT Jan 2026","Lion only"],
              ].map(([l,v,sub])=>(
                <div key={l} style={{background:C.surface,borderRadius:6,padding:"10px 12px"}}>
                  <div style={{color:C.muted,fontSize:10,marginBottom:3}}>{l}</div>
                  <div style={{color:C.text,fontWeight:700,fontSize:13}}>{v}</div>
                  <div style={{color:C.muted,fontSize:10}}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,padding:12,background:"#0d1117",borderRadius:6,border:`1px solid ${C.border}`,fontSize:12,color:C.muted,lineHeight:1.7}}>
              <strong style={{color:C.text}}>Disclaimer:</strong> This model is for informational purposes only and does not constitute investment advice. All assumptions are analyst estimates unless otherwise noted. No PEA, PFS, or feasibility study has been published for the Lion or Nisk deposits. Actual results will differ materially from modelled scenarios.
            </div>
          </Card>


        </div>
      )}

      </div>
    </div>
  );
}
