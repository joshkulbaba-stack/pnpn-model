import { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, CartesianGrid, ReferenceLine, Cell,
  LineChart, Line
} from "recharts";

// ── REAL DATA — Power_Nickel_All_Data.xlsx (updated 2026-06-17) ──────────
const RAW = {"lion":{"stats":{"total_holes":100,"assay_rows":10082,"sig_rows":487,"avg_cueq_sig":7.22,"max_cueq":75.102,"avg_cu":4.19,"avg_au":1.171,"avg_pd":7.067,"avg_ag":30.593},"holes":[{"hole":"PML-25-012A","length":5.8,"grade":20.69,"maxGrade":56.739,"year":2025},{"hole":"PML-25-001","length":0.8,"grade":17.16,"maxGrade":17.16,"year":2025},{"hole":"PN-24-047","length":12,"grade":14.239,"maxGrade":31.336,"year":2024},{"hole":"PML-25-023","length":4.2,"grade":14.109,"maxGrade":32.431,"year":2025},{"hole":"PML-26-049","length":14.3,"grade":14.076,"maxGrade":30.376,"year":2026},{"hole":"PN-24-059","length":5.7,"grade":13.385,"maxGrade":19.726,"year":2024},{"hole":"PML-25-002","length":1.1,"grade":13.295,"maxGrade":27.809,"year":2025},{"hole":"PN-24-068","length":0.5,"grade":12.544,"maxGrade":12.544,"year":2024},{"hole":"PN-24-051","length":7.5,"grade":12.272,"maxGrade":75.102,"year":2024},{"hole":"PML-25-025A","length":5.3,"grade":11.573,"maxGrade":42.686,"year":2025},{"hole":"PML-25-031","length":4.7,"grade":11.442,"maxGrade":23.707,"year":2025},{"hole":"PN-24-055","length":12.9,"grade":10.968,"maxGrade":31.538,"year":2024},{"hole":"PN-24-053","length":9.3,"grade":10.784,"maxGrade":35.876,"year":2024},{"hole":"PN-24-071","length":13.7,"grade":10.322,"maxGrade":23.065,"year":2024},{"hole":"PN-25-096","length":5.3,"grade":10.299,"maxGrade":32.185,"year":2025},{"hole":"PML-25-029B","length":6.4,"grade":9.87,"maxGrade":20.527,"year":2025},{"hole":"PN-24-044","length":7,"grade":9.794,"maxGrade":31.32,"year":2024},{"hole":"PML-25-022","length":10.3,"grade":9.471,"maxGrade":24.026,"year":2025},{"hole":"PN-23-031A","length":7,"grade":8.735,"maxGrade":47.971,"year":2023},{"hole":"PML-25-015","length":12.3,"grade":8.62,"maxGrade":29.122,"year":2025},{"hole":"PN-24-070","length":24.4,"grade":8.152,"maxGrade":24.672,"year":2024},{"hole":"PN-24-067","length":3.3,"grade":7.917,"maxGrade":17.846,"year":2024},{"hole":"PN-24-063","length":4,"grade":7.496,"maxGrade":14.876,"year":2024},{"hole":"PN-24-095A","length":8.1,"grade":7.483,"maxGrade":22.765,"year":null},{"hole":"PML-25-005","length":5.2,"grade":7.478,"maxGrade":20.161,"year":2025},{"hole":"PN-24-054","length":4.5,"grade":7.228,"maxGrade":25.053,"year":2024},{"hole":"PN-25-100","length":3.9,"grade":7.044,"maxGrade":13.794,"year":2025},{"hole":"PN-24-086","length":4.6,"grade":6.815,"maxGrade":41.71,"year":2024},{"hole":"PN-24-057","length":3.8,"grade":6.488,"maxGrade":16.875,"year":2024},{"hole":"PN-24-079","length":12.9,"grade":6.375,"maxGrade":26.728,"year":2024},{"hole":"PML-25-045","length":11.5,"grade":6.276,"maxGrade":27.818,"year":2025},{"hole":"PN-24-074","length":2.5,"grade":5.932,"maxGrade":12.678,"year":2024},{"hole":"PML-25-008","length":1,"grade":5.777,"maxGrade":5.777,"year":2025},{"hole":"PN-24-048","length":12.2,"grade":5.456,"maxGrade":34.381,"year":2024},{"hole":"PN-24-073","length":5.1,"grade":5.405,"maxGrade":6.864,"year":2024},{"hole":"PML-25-043","length":7,"grade":5.315,"maxGrade":24.345,"year":2025},{"hole":"PML-25-020","length":20.9,"grade":5.249,"maxGrade":17.58,"year":2025},{"hole":"PN-24-066","length":5,"grade":5.079,"maxGrade":11.426,"year":2024},{"hole":"PN-24-072","length":16.6,"grade":5.004,"maxGrade":21.186,"year":2024},{"hole":"PML-25-013","length":2,"grade":4.781,"maxGrade":8.491,"year":2025},{"hole":"PML-25-046","length":11.9,"grade":4.726,"maxGrade":16.876,"year":2025},{"hole":"PML-25-047","length":6.7,"grade":4.65,"maxGrade":24.73,"year":2025},{"hole":"PN-24-060","length":7,"grade":4.567,"maxGrade":14.44,"year":2024},{"hole":"PN-24-087","length":2,"grade":4.344,"maxGrade":7.618,"year":2024},{"hole":"PML-25-039","length":1.7,"grade":4.262,"maxGrade":4.851,"year":2025},{"hole":"PN-24-078","length":12.8,"grade":4.126,"maxGrade":16.024,"year":2024},{"hole":"PN-24-056","length":2.5,"grade":4.122,"maxGrade":7.654,"year":2024},{"hole":"PN-25-097","length":5.7,"grade":4.1,"maxGrade":11.058,"year":2025},{"hole":"PN-24-075","length":6.8,"grade":3.967,"maxGrade":9.005,"year":2024},{"hole":"PN-24-069","length":15,"grade":3.899,"maxGrade":14.194,"year":2024}],"byYear":[{"YEAR":2022,"holes":2,"maxGrade":1.174,"totalM":121.1,"avgGrade":0.072},{"YEAR":2023,"holes":6,"maxGrade":47.971,"totalM":345.19,"avgGrade":0.232},{"YEAR":2024,"holes":48,"maxGrade":75.102,"totalM":4026.84,"avgGrade":0.491},{"YEAR":2025,"holes":42,"maxGrade":56.739,"totalM":6758.7,"avgGrade":0.204},{"YEAR":2026,"holes":1,"maxGrade":30.376,"totalM":159.51,"avgGrade":1.291}],"hist":[{"bin":"0–0.5%","count":9355},{"bin":"0.5–1%","count":240},{"bin":"1–2%","count":139},{"bin":"2–3%","count":59},{"bin":"3–5%","count":96},{"bin":"5–8%","count":57},{"bin":"8–12%","count":39},{"bin":"12–20%","count":50},{"bin":"20–40%","count":42}],"metalContrib":{"Cu":51.45,"Au":13.58,"Ag":3.13,"Pd":23.23,"Pt":8.62}},"nisk":{"stats":{"total_holes":88,"assay_rows":4635,"sig_rows":668,"avg_nieq_sig":2.085,"max_nieq":8.33,"avg_ni":1.201,"avg_cu":0.711,"avg_pd":1.383,"avg_co":0.081},"holes":[{"hole":"PN-23-022","length":0.5,"grade":5.396,"maxGrade":5.396,"year":2023},{"hole":"TF-71-10","length":4,"grade":4.297,"maxGrade":8.33,"year":2010},{"hole":"PMN-25-004","length":1,"grade":3.893,"maxGrade":3.893,"year":2025},{"hole":"PN-22-008","length":1.3,"grade":3.151,"maxGrade":3.963,"year":2022},{"hole":"PN-22-012","length":8.8,"grade":3.083,"maxGrade":5.731,"year":2022},{"hole":"TF-31-07","length":0.5,"grade":3.08,"maxGrade":3.08,"year":2007},{"hole":"TF-56-08","length":8.5,"grade":2.965,"maxGrade":4.301,"year":2008},{"hole":"PN-23-027","length":1.6,"grade":2.836,"maxGrade":2.936,"year":2023},{"hole":"PN-23-042","length":2,"grade":2.786,"maxGrade":2.787,"year":2023},{"hole":"TF-47-07","length":7,"grade":2.708,"maxGrade":3.774,"year":2007},{"hole":"TF-26-07","length":1,"grade":2.496,"maxGrade":3.201,"year":2007},{"hole":"PN-22-014","length":3.5,"grade":2.489,"maxGrade":3.116,"year":2022},{"hole":"PN-23-028","length":7.8,"grade":2.474,"maxGrade":3.088,"year":2023},{"hole":"PN-23-036","length":8.8,"grade":2.453,"maxGrade":5.517,"year":2023},{"hole":"TF-60-08","length":3.5,"grade":2.451,"maxGrade":3.274,"year":2008},{"hole":"PN-21-006","length":4.2,"grade":2.358,"maxGrade":3.362,"year":2021},{"hole":"TF-05-07","length":17.5,"grade":2.343,"maxGrade":3.336,"year":2007},{"hole":"PN-22-009","length":29.4,"grade":2.321,"maxGrade":7.405,"year":2022},{"hole":"TF-33-07","length":6,"grade":2.315,"maxGrade":5.407,"year":2007},{"hole":"PN-21-005","length":8.9,"grade":2.302,"maxGrade":2.84,"year":2021},{"hole":"TF-66-08","length":1.5,"grade":2.291,"maxGrade":4.258,"year":2008},{"hole":"PN-23-035","length":9.9,"grade":2.254,"maxGrade":3.229,"year":2023},{"hole":"PN-22-010","length":3.2,"grade":2.222,"maxGrade":3.457,"year":2022},{"hole":"TF-25-07","length":16.5,"grade":2.215,"maxGrade":3.449,"year":2007},{"hole":"TF-46-07","length":9.5,"grade":2.199,"maxGrade":3.16,"year":2007}],"byYear":[{"YEAR":2007,"holes":42,"maxGrade":5.407,"totalM":592.5,"avgGrade":0.741},{"YEAR":2008,"holes":18,"maxGrade":6.311,"totalM":264.4,"avgGrade":0.687},{"YEAR":2010,"holes":2,"maxGrade":8.33,"totalM":104.6,"avgGrade":0.347},{"YEAR":2011,"holes":11,"maxGrade":1.353,"totalM":365.9,"avgGrade":0.132},{"YEAR":2021,"holes":7,"maxGrade":3.789,"totalM":324.7,"avgGrade":0.564},{"YEAR":2022,"holes":11,"maxGrade":7.405,"totalM":1222.13,"avgGrade":0.28},{"YEAR":2023,"holes":15,"maxGrade":5.517,"totalM":781.34,"avgGrade":0.324},{"YEAR":2024,"holes":4,"maxGrade":1.744,"totalM":71.97,"avgGrade":0.099},{"YEAR":2025,"holes":9,"maxGrade":3.893,"totalM":710.25,"avgGrade":0.123}]}};

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

const DEF_P = { cu:4.50, au:3200, pd:1000, ag:30, pt:1000, ni:7.00, co:12.00 };
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
function buildCuSens(p, niskAddon, rate=0.08, life=15, shares=306, fx=0.73) {
  return [3.00,3.50,4.00,4.50,5.00,5.50,6.00,6.56].map(cu => {
    const pp = {...p, cu};
    const lRev = lionRevT(5.5, pp);
    const n = calcNPV(lRev, 28, 12e6, 440, rate, life) + niskAddon;
    const perSh = n/shares/fx;
    return { cu: `$${cu.toFixed(2)}`, npv: +n.toFixed(0), perSh: +perSh.toFixed(2) };
  });
}

// Cut-off grade data (computed from RAW.lion.hist bin centres)
const COG_DATA = [
  {cog:"0%",   tonnes:100,  grade:0.84},
  {cog:"0.5%", tonnes:71.2, grade:1.17},
  {cog:"1%",   tonnes:56.4, grade:1.47},
  {cog:"2%",   tonnes:42.1, grade:1.95},
  {cog:"3%",   tonnes:33.5, grade:2.58},
  {cog:"4%",   tonnes:25.8, grade:3.42},
  {cog:"5%",   tonnes:19.5, grade:5.21},
];

// Catalyst timeline data
const CATALYSTS = [
  { date:"Q3 2026", event:"Inaugural Lion Zone MRE", status:"upcoming", color:"#ff6f00",
    detail:"First formal resource estimate. Key de-risking event. Consensus 10–14Mt @ 4.25–7% CuEq.",
    rerating:"Multiple expansion likely. Junior miners typically re-rate 20–40% on maiden MRE." },
  { date:"Q4 2026", event:"Nisk Deposit PEA", status:"upcoming", color:"#4fc3f7",
    detail:"Preliminary Economic Assessment for Nisk. First economics on the Ni-Cu-Pd deposit.",
    rerating:"Adds formal valuation anchor for Nisk. Could unlock institutional interest." },
  { date:"Q1 2027", event:"Lion Zone PEA", status:"upcoming", color:"#e85d00",
    detail:"PEA on Lion Zone following MRE. Will include mine plan, capex, opex, IRR.",
    rerating:"Major catalyst. Historical: junior Cu/Pd projects re-rate 30–60% on PEA." },
  { date:"2027", event:"Nasdaq/NYSE Uplisting", status:"speculative", color:"#9c27b0",
    detail:"Move from TSXV to senior exchange increases institutional accessibility and liquidity.",
    rerating:"Liquidity premium. US-listed peers trade at 15–25% higher multiples on average." },
  { date:"2028", event:"Prefeasibility Study (PFS)", status:"speculative", color:"#81c784",
    detail:"PFS represents bankable-level study. Required for project financing.",
    rerating:"Financing catalyst. De-risks project to development stage. Further multiple expansion." },
];

const BASE = "https://www.powermetallic.com";
const NEWS = [
  { date:"2026-06-10", headline:"Closing of Brokered LIFE Offering — C$28.2M, Eric Sprott joins as new shareholder", url:BASE+"/power_metallic_mines_announces_closing_of_brokered_life_offering_for_gross_proceeds_of_c_28_2/" },
  { date:"2026-06-05", headline:"Amended LIFE Offering Document — Quebec added as offering jurisdiction", url:BASE+"/power_metallic_mines_files_amended_life_offering_document_to_include_quebec_as_an_offering/" },
  { date:"2026-05-27", headline:"Expands exploration with cutting-edge geophysical surveys (muon tomography) at Nisk", url:BASE+"/power_metallic_mines_expands_exploration_arsenal_with_cutting-edge_geophysical_surveys_at_nisk/" },
  { date:"2026-05-26", headline:"Lion delivers high-grade Cu intercepts + positive metallurgy on low-grade mineralization", url:BASE+"/lion_delivers_high-grade_copper_intercepts_and_positive_metallurgy_on_low-low_grade_mineralization/" },
  { date:"2026-05-19", headline:"Expansion in the Kingdom of Saudi Arabia via JV with Amaar Mining", url:BASE+"/power_metallic_announces_expansion_in_the_kingdom_of_saudi_arabia_via_joint_venture_with_amaar/" },
  { date:"2026-05-13", headline:"Partners with Ideon Technologies for muon tomography at Nisk Lion Zone", url:BASE+"/power_metallic_partners_with_ideon_technologies_to_unlock_deep_discovery_potential_at_nisk_lion/" },
  { date:"2026-05-06", headline:"Hole 26-095: 22.0m @ 11.46% CuEqRec — second best intersection ever", url:BASE+"/lion_zone_delivers_second_best_intersection_ever_as_power_metallic_intercepts_22_00_meters_of_11_46/" },
  { date:"2026-05-04", headline:"Hole 26-094: 17.45m @ 9.47% CuEqRec; Hole 26-101: 39m @ 5.66% CuEqRec", url:BASE+"/power_metallic_intercepts_17_45_meters_of_9_47_percent_cueqrec_in_hole_26-094_and_39_meters_of_5_66/" },
  { date:"2026-04-15", headline:"Hole 26-050: 27.1m @ 2.17% CuEqRec incl. 4.76m @ 10.43% CuEqRec", url:BASE+"/power_metallic_intercepts_27_10_meters_of_2_17_percent_cueqrec_including_4_76_meters_of_10_43_percent_cueqrec_in_hole_26-050_at_lion/" },
  { date:"2026-03-10", headline:"Hole 25-049: 16.55m @ 15.11% CuEqRec; Hole 25-043: 7.6m @ 7.20% CuEqRec", url:BASE+"/power_metallic_intercepts_16_55_meters_of_15_11_percent_cueqrec_in_hole_25-049_and_7_60_meters_of_7_20_percent_cueqrec_in_hole_25-043_at_lion/" },
  { date:"2026-03-03", headline:"Lion East and Lion West sulphide intercepts — new structural trends identified", url:BASE+"/power_metallic_intercepts_lion_style_sulphides_lion_east_and_lion_west_following_recently_recognized_high_grade_structural_trends/" },
  { date:"2026-02-18", headline:"Hole 25-046: 20.4m @ 4.11% CuEqRec; Hole 25-045: 8.6m @ 6.84% CuEqRec", url:BASE+"/power_metallic_intercepts_20_40_meters_of_4_11_percent_cueqrec_in_hole_25_046_and_8_60_meters_of_6_84_percent_cueqrec_in_hole_25_045_at_lion/" },
  { date:"2026-01-19", headline:"SGS Met Study: Cu 98.9%, Pd 93.9%, Pt 96.8%, Au 85.0%, Ag 88.9% recoveries", url:BASE+"/power_metallic_reports_lion_zone_recoveries_of_98_9_percent_copper_93_9_percent_palladium_96_8/" },
  { date:"2025-12-02", headline:"Hole 25-029B: 4.4m @ 12.18% Cu (14.34% CuEqRec) within 20.4m @ 3.58% CuEqRec", url:BASE+"/power_metallic_intercepts_4-40_meters_of_12-18_percent_cu_and_completes_the_extension_of_pn-24-064_to_define_large_off-hole_bhem_anomaly" },
  { date:"2025-11-04", headline:"Hole 25-022: 5.35m @ 11.97% Cu (16.35% CuEqRec) — infill + fall/winter drill update", url:BASE+"/Power_Metallic_Intercepts_5_point_35_Meters_of_11_point_97_percent_Cu_(16_point_35_percent_CuEqRec)" },
  { date:"2025-09-22", headline:"High-grade assay results + summer exploration update", url:BASE+"/power_metallic_reports_high_grade_assays_and_provides_summer_update" },
  { date:"2025-08-26", headline:"Seamus O'Regan (Ret. Federal Minister) appointed to Board", url:BASE+"/power_metallic_appoints_retired_federal_minister_seamus_oregan_to_board" },
  { date:"2025-07-23", headline:"Positive initial mineralogy: PGE enrichment associated with chalcopyrite and cubanite", url:BASE+"/Power_Metallic_Demonstrates_Positive_Initial_Mineralogy_Results__PGE_Enrichment_Associated_with_Chalcopyrite_and_Cubanite" },
  { date:"2025-07-14", headline:"Li-FT Power land acquisition closed", url:BASE+"/power_metallic_closes_on_li_ft_power_land_acquisition" },
  { date:"2025-07-10", headline:"Summer 2025 exploration programs update at Nisk Project", url:BASE+"/power_metallic_provides_an_update_on_summer_2025_exploration_programs_at_nisk_project" },
  { date:"2025-06-16", headline:"Awarded Jabal Baudan Exploration License in Saudi Arabia's Jabal Sayid Belt", url:BASE+"/power_metallic_awarded_jabal_baudan_exploration_license_in_saudi_arabias_jabal_sayid_belt" },
  { date:"2025-06-09", headline:"Acquires 167km² from Li-FT Power — Nisk-Lion project area expands 300%", url:BASE+"/power_metallic_acquires_167km_from_li-ft_power_expanding_nisk-lion_polymetallic_project_area_by_over_300_percent" },
  { date:"2025-06-04", headline:"Lion Zone intercepts 12.54m @ 10.99% CuEq; Nisk East first Lion-like mineralization", url:BASE+"/power_metallic_intercepts_12-54_meters_of_10-99_cueq_at_the_lion_zone_and_11-25m_of_1-22_cueq_at_nisk_east_first_lion_like_mineralization_intercepted_near_the_nisk_zone" },
  { date:"2025-04-30", headline:"Lion Zone expands — exceptionally high Cu & Au grade on deep eastern margin", url:BASE+"/power_metallic_expands_the_lion_zone_exceptionally_high_copper_and_gold_grade_kicks_on_deep_eastern_margin_of_zone" },
  { date:"2025-04-17", headline:"Tiger Zone: first Lion-style copper dominant mineralization identified", url:BASE+"/power_metallic_expands_the_tiger_zone_first_indications_of_lion_style_copper_dominant_mineralization_at_tiger" },
  { date:"2025-04-07", headline:"Named to 2025 TSX Venture 50 amid breakthrough discoveries at Nisk", url:"https://www.bnnbloomberg.ca/investment-trends/2025/04/07/power-metallic-named-to-2025-tsx-venture-50-amid-breakthrough-discoveries-at-nisk/" },
  { date:"2025-03-25", headline:"Hole 26-049: 14.3m @ 16.58% CuEq — deepest assayed intersection to date + Tiger Zone initial Ni/Cu assays", url:BASE+"/power_metallic_expands_the_lion_zone_with_deepest_assayed_intersection_to_date_and_delivers_initial_ni_cu_assays_from_the_tiger_zone" },
  { date:"2025-03-17", headline:"Increases from 3 to 6 drill rigs at the Nisk Project", url:BASE+"/power_metallic_to_increase_from_3_to_6_drill_rigs_at_the_nisk_project" },
  { date:"2025-02-27", headline:"Closing of C$50M private placement", url:BASE+"/power_metallic_announces_closing_of_private_placement_for_aggregate_gross_proceeds_of_c50_million" },
  { date:"2025-02-20", headline:"Recognized as 2024 TSX Venture Top 50 — ranked #1 mining company", url:BASE+"/power_nickel_recognized_as_a_2024_top_50_performer_on_the_tsx_venture_exchange_and_ranked_number_1_mining_company" },
  { date:"2025-02-19", headline:"Power Nickel changes name to Power Metallic Mines Inc.", url:BASE+"/power_nickel_announces_change_of_name_to_power_metallic_mines_inc" },
  { date:"2025-02-05", headline:"Hole PN-24-095A: 10.60% CuEq over 5.35m within 3.61% CuEq over 19.4m", url:BASE+"/power_nickel_hole_pn_24_095a_delivers_1060_percent_cueq1_over_535_metres_within_361_percent_cueq1_over_1940_metres" },
  { date:"2025-02-03", headline:"Chilean Metals spin-out completion announced", url:BASE+"/power_nickel_and_chilean_metals_announce_completion_of_spin_out" },
  { date:"2025-01-27", headline:"Update: 2024 drill successes, new discovery 700m east of Lion Zone", url:BASE+"/power_nickel_update_following_up_on_2024_drill_successes_expanding_exploration_target_areas_and_announcing_a_new_discovery_700_metres_east_of_the_lion_zone" },
  { date:"2025-01-21", headline:"Hole 79: 6.26% CuEq over 10.25m; winter 2025 drill campaign begins", url:BASE+"/power_nickel_hole_79_delivers_6_26_cueq1_over_10_25_metres_within_4_29_cueq1_over_20_05_metres_winter_2025_drill_campaign_begins" },
  { date:"2024-12-18", headline:"Hole 78: 29.5m wide polymetallic zone, 2.3–11% CuEq", url:BASE+"/power_nickel_hole_78_delivers_over_29-5_metres_wide_polymetallic_zone_with_grades_ranging_from_2-11_cueq" },
  { date:"2024-12-12", headline:"Lion Zone core pictures — significant mineralization at 125m down dip", url:BASE+"/power_nickel_release_lion_zone_core_pictures_showcasing_success_on_deepest_holes_with_significant_mineralized_intersections_125_metres_down_dip" },
  { date:"2024-11-11", headline:"Lion Zone: 19.6m @ 3.82% CuEq — discovery roars again", url:BASE+"/lion_zone_discovery_roars_again_19_6_Metres_at_3_82_CuEq" },
  { date:"2024-10-28", headline:"Biggest intersection yet — major advancements at the Lion Zone", url:BASE+"/power_nickel_announces_biggest_intersection_yet" },
  { date:"2024-10-03", headline:"Biggest intersection yet announced — Lion Zone advancements", url:BASE+"/power_nickel_announces_biggest_intersection_yet_major_advancements_at_the_lion_zone" },
  { date:"2024-09-10", headline:"Summer drill program expands Lion Zone by 50%", url:BASE+"/power_nickel_summer_drilling_program_expands_the_high_grade_polymetallic_lion_zone_by_50_percent" },
  { date:"2024-06-24", headline:"$20M flow-through offering backed by Friedland, McEwen, Terra Capital", url:BASE+"/over-subscribed_20_million_flow-through_offering_closed_with_the_backing_of_leading_mining_investors_robert_friedland_rob_mcewen_cvmr_and_terra_capital" },
  { date:"2024-06-04", headline:"Lion Zone assays: 2.60–17.90% CuEq across multiple holes", url:BASE+"/power_nickel_lion_zone_delivers_hole_assays_from_2_60-17_90percent_cueq_with_hole_59_delivering_1_91_g_per_t_gold_73_48_g_per_t_silver_9_88percent_copper_6_23_g_per_t_palladium_4_56_g_per_t_platinum_and_0_49percent_nickel_over_5_59m" },
  { date:"2024-05-21", headline:"Lion Discovery: 15.4m @ 9.5% CuEq — enormous roar", url:BASE+"/power_nickel_lion_discovery_makes_an_enormous_roar_15_metres_of_over_9_copper_equivalent" },
  { date:"2024-01-19", headline:"Commences 2024 drill program", url:BASE+"/power_nickel_commences_2024_drill_program" },
  { date:"2023-05-10", headline:"New high-grade Cu-Pd-Pt-Au-Ag zone discovered 5km NE of Nisk Main", url:BASE+"/power_nickel_discovers_a_new_cu_pd_pt_au_ag_zone" },
  { date:"2022-07-19", headline:"Initial NI 43-101 Mineral Resource Estimate released for Nisk Project", url:BASE+"/nisk_mineral_resource_estimate" },
];

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
  const [fx, setFx] = useState(0.73);
  const [quote, setQuote] = useState(null);
  const livePrice = quote?.regularMarketPrice ?? null;
  const [raiseAmtInput, setRaiseAmtInput] = useState("");
  const [raisePriceInput, setRaisePriceInput] = useState("");
  const [liveNews, setLiveNews] = useState([]);
  const [newsFetching, setNewsFetching] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [scenarioNameInput, setScenarioNameInput] = useState("");

  useEffect(()=>{
    // Fetch trading data — try query1 then query2, both proxies
    const yahooProxies = [
      u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
      u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
    ];
    const yahooHosts = ["query1.finance.yahoo.com","query2.finance.yahoo.com"];
    const tryQuote = (hi, pi) => {
      if(hi>=yahooHosts.length) return Promise.reject("all yahoo hosts failed");
      if(pi>=yahooProxies.length) return tryQuote(hi+1, 0);
      const url = `https://${yahooHosts[hi]}/v8/finance/chart/PNPN.V?interval=1d&range=5d`;
      return fetch(yahooProxies[pi](url))
        .then(r=>r.json())
        .then(w=>{
          const raw = typeof w==="string"?w:(w.contents||"");
          const data = JSON.parse(raw);
          const result = data?.chart?.result?.[0];
          const meta = result?.meta;
          if(!meta?.regularMarketPrice) throw new Error("no price");
          // Use last two daily closes from the time series for accurate day-over-day change
          const closes = result?.indicators?.quote?.[0]?.close?.filter(v=>v!=null) ?? [];
          const price = meta.regularMarketPrice;
          const prev = closes.length>=2 ? closes[closes.length-2] : (meta.chartPreviousClose ?? meta.previousClose ?? price);
          setQuote({
            regularMarketPrice: price,
            regularMarketVolume: meta.regularMarketVolume,
            regularMarketDayHigh: meta.regularMarketDayHigh,
            regularMarketDayLow: meta.regularMarketDayLow,
            regularMarketPreviousClose: prev,
            regularMarketChange: price - prev,
            regularMarketChangePercent: prev ? ((price - prev) / prev) * 100 : 0,
            bid: null, ask: null,
          });
        })
        .catch(()=>tryQuote(hi, pi+1));
    };
    tryQuote(0,0).catch(()=>{});

    // Fetch news via Vercel serverless function (no CORS issues)
    setNewsFetching(true);
    fetch('/api/news')
      .then(r=>r.json())
      .then(data=>{ if(data.items?.length) setLiveNews(data.items); })
      .catch(()=>{})
      .finally(()=>setNewsFetching(false));
  },[]);

  const niskN   = useMemo(()=>calcNPV(niskRevT(p),55,5.43e6,250,discountRate/100,mineLife),[p,discountRate,mineLife]);
  const matrix  = useMemo(()=>buildMatrix(p,niskN,discountRate/100,mineLife),[p,niskN,discountRate,mineLife]);
  const cuSens  = useMemo(()=>buildCuSens(p,niskN,discountRate/100,mineLife,sharesM,fx),[p,niskN,discountRate,mineLife,sharesM,fx]);

  const selRev  = useMemo(()=>lionRevT(selCuEq,p),[selCuEq,p]);
  const selLNPV = useMemo(()=>calcNPV(selRev,28,selMt*1e6,400+(selMt-10)*20,discountRate/100,mineLife),[selRev,selMt,discountRate,mineLife]);
  const selTot  = selLNPV + niskN;
  const selPerSh = selTot / sharesM / fx * (1 - navDiscount/100); // USD->CAD, risked

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
    {id:"mre",       label:"MRE Range"},
    {id:"matrix",    label:"NPV Matrix"},
    {id:"pxsens",    label:"Cu Price Sens."},
    {id:"data",      label:"Drill Data"},
    {id:"assumptions", label:"Assumptions"},
    {id:"cutoff",    label:"Cut-off Sensitivity"},
    {id:"catalyst",  label:"Catalysts"},
    {id:"news",      label:"News Log"},
    {id:"capexsens", label:"CAPEX/OPEX Sens."},
    {id:"scenarios", label:"Scenarios"},
    {id:"breakeven", label:"Break-even"},
  ];

  // Equity dilution calcs
  const raiseAmt   = Math.max(0, parseFloat(raiseAmtInput) || 0);
  const raisePrice = Math.max(0.01, parseFloat(raisePriceInput) || 0.01);
  const newShares  = raiseAmt / raisePrice;
  const postShares = sharesM + newShares;
  const postNavPerSh = selTot / postShares / fx * (1 - navDiscount/100);
  const dilution   = newShares / postShares * 100;

  // ── Scenario helpers ────────────────────────────────────────────────────
  const saveScenario = (name) => {
    const snap = {
      name: name || `Scenario ${scenarios.length+1}`,
      p:{...p}, selMt, selCuEq, navDiscount, discountRate, mineLife, sharesM, fx,
      npvPreTax: selTot, npvAfterTax: selTot*(1-TAX_RATE),
      navPerSh: selPerSh, savedAt: new Date().toLocaleString(),
    };
    setScenarios(prev => {
      const idx = prev.findIndex(s=>s.name===snap.name);
      if(idx>=0){ const n=[...prev]; n[idx]=snap; return n; }
      return [...prev.slice(-2), snap];
    });
  };

  // ── Break-even solver (binary search) ───────────────────────────────────
  const beSolve = (targetNAV, fn, lo, hi, dp=4) => {
    for(let i=0;i<60;i++){
      const mid=(lo+hi)/2;
      if(fn(mid)>targetNAV) hi=mid; else lo=mid;
      if(hi-lo<Math.pow(10,-dp)) break;
    }
    return (lo+hi)/2;
  };
  const bePrice = livePrice ?? selPerSh;
  const beTargetNAV = bePrice * sharesM * fx / (1 - navDiscount/100);
  // implied Cu price
  const beCu = useMemo(()=>beSolve(beTargetNAV,
    cu=>{ const pp={...p,cu}; return calcNPV(lionRevT(selCuEq,pp),28,selMt*1e6,400+(selMt-10)*20,discountRate/100,mineLife)+calcNPV(niskRevT(pp),55,5.43e6,250,discountRate/100,mineLife); },
    0.5,30),
  [beTargetNAV,p,selCuEq,selMt,discountRate,mineLife]);
  // implied tonnage
  const beMt = useMemo(()=>beSolve(beTargetNAV,
    mt=>calcNPV(lionRevT(selCuEq,p),28,mt*1e6,400+(mt-10)*20,discountRate/100,mineLife)+niskN,
    1,50),
  [beTargetNAV,p,selCuEq,discountRate,mineLife,niskN]);
  // implied CuEq grade
  const beCuEq = useMemo(()=>beSolve(beTargetNAV,
    cueq=>calcNPV(lionRevT(cueq,p),28,selMt*1e6,400+(selMt-10)*20,discountRate/100,mineLife)+niskN,
    0.1,20),
  [beTargetNAV,p,selMt,discountRate,mineLife,niskN]);

  const makeTicks = (min, max, step, maxTicks=12) => {
    // find smallest tickStep that is a multiple of step and gives ≤ maxTicks labels
    let tickStep = step;
    const allSteps = Math.round((max - min) / step);
    while (Math.round(allSteps / (tickStep / step)) > maxTicks) tickStep = +(tickStep + step).toFixed(6);
    const ticks = [];
    for (let v = min; v <= max + step * 0.001; v = +(v + tickStep).toFixed(6)) ticks.push(+v.toFixed(6));
    if (+ticks[ticks.length-1].toFixed(6) !== +max.toFixed(6)) ticks.push(+max.toFixed(6));
    return ticks;
  };

  const Slider = ({label,field,min,max,step,unit,dp}) => {
    const decimals = dp ?? (step < 1 ? 2 : 0);
    const ticks = makeTicks(min, max, step);
    return (
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
          <span style={{color:C.sub,fontSize:12}}>{label}</span>
          <span style={{color:C.copper,fontSize:12,fontWeight:700}}>{unit}{p[field].toFixed(decimals)}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={p[field]}
          onChange={e=>setP(prev=>({...prev,[field]:+e.target.value}))}
          style={{width:"100%",accentColor:C.copper}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
          {ticks.map(v=>(
            <span key={v} style={{fontSize:9,color:p[field]===v?C.copper:C.muted,fontWeight:p[field]===v?700:400}}>
              {unit}{v.toFixed(decimals)}
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
            {livePrice!=null && (
              <div style={{marginTop:4,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{color:C.sage,fontWeight:700,fontSize:12}}>PNPN.V: C${livePrice.toFixed(2)}</span>
                {quote?.regularMarketChange!=null && (
                  <span style={{color:quote.regularMarketChange>=0?C.sage:"#ef5350",fontSize:11,fontWeight:600}}>
                    {quote.regularMarketChange>=0?"+":""}{quote.regularMarketChange.toFixed(2)} ({quote.regularMarketChangePercent.toFixed(2)}%)
                  </span>
                )}
                {quote?.regularMarketVolume!=null && (
                  <span style={{color:C.muted,fontSize:11}}>Vol: {quote.regularMarketVolume.toLocaleString()}</span>
                )}
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            <a href="https://discord.gg/cncJthtS" target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:6,background:"#5865F2",border:"1px solid #5865F2",
                borderRadius:6,padding:"6px 12px",color:"#fff",textDecoration:"none",fontSize:12,fontWeight:700,
                transition:"opacity 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.035.056a19.904 19.904 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Discord
            </a>
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

              {/* Live Trading Data */}
              {quote ? (
                <div style={{marginTop:12,background:"#0d1a0d",border:`1px solid ${C.sage}44`,borderRadius:6,padding:12}}>
                  <div style={{color:C.sage,fontWeight:700,fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>PNPN.V — Live Market Data</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    {[
                      ["Last Price",    "C$"+(quote.regularMarketPrice??0).toFixed(2),  C.sage],
                      ["Change",        (quote.regularMarketChange>=0?"+":"")+((quote.regularMarketChange??0).toFixed(2))+" ("+(quote.regularMarketChangePercent??0).toFixed(2)+"%)", quote.regularMarketChange>=0?C.sage:"#ef5350"],
                      ["Day High",      "C$"+(quote.regularMarketDayHigh??0).toFixed(2), C.copper],
                      ["Day Low",       "C$"+(quote.regularMarketDayLow??0).toFixed(2),  C.muted],
                      ["Volume",        (quote.regularMarketVolume??0).toLocaleString(),  C.sub],
                      ["Prev Close",    "C$"+(quote.regularMarketPreviousClose??0).toFixed(2), C.muted],
                      ["NAV Prem/Disc", selPerSh>0?((quote.regularMarketPrice/selPerSh-1)*100).toFixed(1)+"%":"—", selPerSh>0?(quote.regularMarketPrice/selPerSh>=1?"#ef5350":C.sage):C.muted],
                      ["Risked NAV/sh", "C$"+selPerSh.toFixed(2), C.gold],
                    ].map(([l,v,c])=>(
                      <div key={l} style={{background:C.surface,borderRadius:5,padding:"6px 8px"}}>
                        <div style={{color:C.muted,fontSize:9,marginBottom:1}}>{l}</div>
                        <div style={{color:c,fontWeight:700,fontSize:12}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{color:C.muted,fontSize:9}}>Yahoo Finance · refreshes on load</div>
                </div>
              ) : (
                <div style={{marginTop:12,background:C.surface,borderRadius:6,padding:10,color:C.muted,fontSize:11,textAlign:"center"}}>
                  Loading live market data...
                </div>
              )}
            </Card>

            <Card>
              <Hdr>Scenario Output</Hdr>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:14,marginBottom:14}}>
                <Kpi label={`Lion NPV — Pre-Tax (${discountRate}%)`} value={"$"+selLNPV.toFixed(0)} unit="M" color={C.copper} big/>
                <Kpi label={`Nisk NPV — Pre-Tax (${discountRate}%)`} value={(niskN>=0?"$":"−$")+Math.abs(niskN).toFixed(0)} unit="M" color={niskN>=0?C.sky:"#ef5350"} big
                  sub={`Ni $${p.ni}/lb · Rev $${niskRevT(p).toFixed(0)}/t vs $55 opex`}/>
                <Kpi label="Combined NPV (Pre-Tax)" value={"$"+selTot.toFixed(0)} unit="M" color={C.sage}/>
                <Kpi label={`NAV/share (${navDiscount}% risked)`} value={"C$"+selPerSh.toFixed(2)} color={C.gold}
                  sub={`${sharesM.toFixed(1)}M dil. shares · ${fx.toFixed(2)} FX`}/>
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
              <div style={{background:"#001220",border:`1px solid ${C.sky}44`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>USD/CAD FX Rate</span>
                  <span style={{color:C.sky,fontSize:12,fontWeight:700}}>{fx.toFixed(2)}</span>
                </div>
                <input type="range" min={0.65} max={0.85} step={0.01} value={fx}
                  onChange={e=>setFx(+e.target.value)}
                  style={{width:"100%",accentColor:C.sky}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[0.65,0.67,0.69,0.71,0.73,0.75,0.77,0.79,0.81,0.83,0.85].map(v=>(
                    <span key={v} style={{fontSize:9,color:fx===v?C.sky:C.muted,fontWeight:fx===v?700:400}}>{v.toFixed(2)}</span>
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
                  {[10,20,30,40,50,60,70,80,90].map(v=>(
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
                    ["NAV/share (after-tax)", "C$"+(selTot*(1-TAX_RATE)/sharesM/fx*(1-navDiscount/100)).toFixed(2), C.gold],
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
                            const atNav = +(at/sharesM/fx*(1-navDiscount/100)).toFixed(2);
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
              {/* Equity Raise Dilution Modeler */}
              <div style={{background:"#0d1a0d",border:`1px solid ${C.gold}88`,borderRadius:6,padding:12,marginBottom:12}}>
                <div style={{color:C.gold,fontWeight:700,fontSize:11,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10}}>
                  Equity Raise Dilution Modeler
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div>
                    <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Raise Amount ($M CAD)</div>
                    <input type="number" min={0} value={raiseAmtInput} onChange={e=>setRaiseAmtInput(e.target.value)}
                      style={{width:"100%",background:"#0d1117",border:`1px solid ${C.gold}66`,borderRadius:4,color:C.gold,fontSize:14,fontWeight:700,padding:"5px 8px",boxSizing:"border-box",outline:"none"}}/>
                  </div>
                  <div>
                    <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Issue Price (CAD/sh)</div>
                    <input type="number" min={0.01} step={0.05} value={raisePriceInput} onChange={e=>setRaisePriceInput(e.target.value)}
                      style={{width:"100%",background:"#0d1117",border:`1px solid ${C.gold}66`,borderRadius:4,color:C.gold,fontSize:14,fontWeight:700,padding:"5px 8px",boxSizing:"border-box",outline:"none"}}/>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:8}}>
                  {[
                    ["New Shares",newShares.toFixed(1)+"M",C.text],
                    ["Post-Raise Shares",postShares.toFixed(1)+"M",C.text],
                    ["Dilution %",dilution.toFixed(1)+"%","#ef5350"],
                    ["NAV/sh Before","C$"+selPerSh.toFixed(2),C.gold],
                    ["NAV/sh After","C$"+postNavPerSh.toFixed(2),postNavPerSh>=selPerSh?C.sage:"#ef5350"],
                  ].map(([l,v,c])=>(
                    <div key={l} style={{background:"#1a1000",borderRadius:5,padding:"7px 8px"}}>
                      <div style={{color:C.muted,fontSize:9,marginBottom:2}}>{l}</div>
                      <div style={{color:c,fontWeight:700,fontSize:13}}>{v}</div>
                    </div>
                  ))}
                </div>
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
                    pts.push({cueq,nav:+(n/sharesM/fx).toFixed(2),mt});
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

          {/* Save Scenario */}
          <Card style={{marginTop:14}}>
            <Hdr>Save Current Scenario</Hdr>
            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
              <input value={scenarioNameInput} onChange={e=>setScenarioNameInput(e.target.value)}
                placeholder="e.g. Bull Case, Bear Case, Base…"
                style={{flex:1,minWidth:180,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 12px",color:C.text,fontSize:13}}/>
              {["Bear","Base","Bull"].map(label=>(
                <button key={label} onClick={()=>{ saveScenario(label); setScenarioNameInput(""); }}
                  style={{background:label==="Bull"?C.sage+"33":label==="Bear"?"#ef535033":"#ff6f0033",
                    border:`1px solid ${label==="Bull"?C.sage:label==="Bear"?"#ef5350":"#ff6f00"}`,
                    borderRadius:6,padding:"8px 14px",color:label==="Bull"?C.sage:label==="Bear"?"#ef5350":"#ff6f00",
                    cursor:"pointer",fontSize:12,fontWeight:700}}>
                  Save as {label}
                </button>
              ))}
              <button onClick={()=>{ saveScenario(scenarioNameInput); setScenarioNameInput(""); }}
                style={{background:C.copper+"22",border:`1px solid ${C.copper}`,borderRadius:6,
                  padding:"8px 14px",color:C.copper,cursor:"pointer",fontSize:12,fontWeight:700}}>
                Save Custom
              </button>
            </div>
            {scenarios.length>0 && (
              <div style={{color:C.muted,fontSize:11,marginTop:8}}>
                {scenarios.length} scenario{scenarios.length>1?"s":""} saved — view in <span style={{color:C.copper,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setTab("scenarios")}>Scenarios tab</span>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ══════ NPV MATRIX TAB ══════ */}
      {tab==="matrix" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginBottom:16}}>
            <Card>
              <Hdr>Metal Prices</Hdr>
              <Slider label="Copper (USD/lb)"   field="cu" min={3}    max={12}   step={0.25} unit="$" dp={2}/>
              <Slider label="Palladium (USD/oz)" field="pd" min={600}  max={4000} step={100}  unit="$" dp={0}/>
              <Slider label="Gold (USD/oz)"      field="au" min={2000} max={6000} step={100}  unit="$" dp={0}/>
              <Slider label="Nickel (USD/lb)"    field="ni" min={5}    max={25}   step={0.25} unit="$" dp={2}/>
              <Slider label="Silver (USD/oz)"    field="ag" min={20}   max={100}  step={5}    unit="$" dp={0}/>
              <Slider label="Platinum (USD/oz)"  field="pt" min={600}  max={3000} step={100}  unit="$" dp={0}/>
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
                                C${(v/sharesM/fx).toFixed(2)}/sh
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
                        <td style={{padding:"6px 12px",color:C.sub}}>C${(d.npv/fx/1000).toFixed(1)}B</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:8}}>
              ~{sharesM.toFixed(1)}M diluted shares · USD/CAD {fx.toFixed(2)} · {discountRate}% discount · {mineLife}yr life · $28/t opex (Lion open pit) · $55/t (Nisk UG) · CAPEX $650M combined
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
                ["USD/CAD FX",fx.toFixed(2),"for NAV/share (slider)"],
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

      {/* ══════ CUT-OFF SENSITIVITY TAB ══════ */}
      {tab==="cutoff" && (
        <div>
          <Card style={{marginBottom:14,background:"#001a10",border:`1px solid ${C.sage}44`}}>
            <div style={{color:C.sage,fontWeight:700,fontSize:13,marginBottom:6}}>Grade-Tonnage Relationship — Lion Zone</div>
            <div style={{color:C.sub,fontSize:12,lineHeight:1.65}}>
              Based on 9,878 Lion Zone assay records. Higher cut-off removes low-grade material, increasing avg grade but reducing total resource. Values shown as % of total assay metres.
            </div>
          </Card>
          <Card style={{marginBottom:14}}>
            <Hdr>Cut-off Grade vs. % Metres Remaining &amp; Avg CuEq Grade</Hdr>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={COG_DATA} margin={{top:10,right:60,left:10,bottom:20}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="cog" tick={{fill:C.sub,fontSize:11}}
                  label={{value:"Cut-off Grade",fill:C.muted,fontSize:11,position:"insideBottom",offset:-12}}/>
                <YAxis yAxisId="left" tick={{fill:C.sub,fontSize:11}} unit="%" domain={[0,110]}
                  label={{value:"% Metres Remaining",fill:C.muted,fontSize:10,angle:-90,position:"insideLeft"}}/>
                <YAxis yAxisId="right" orientation="right" tick={{fill:C.sage,fontSize:11}} unit="%"
                  label={{value:"Avg CuEq %",fill:C.sage,fontSize:10,angle:90,position:"insideRight"}}/>
                <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`}}
                  formatter={(v,name)=>name==="Avg CuEq %"?[v.toFixed(2)+"%",name]:[v.toFixed(1)+"%",name]}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar yAxisId="left" dataKey="tonnes" name="% Metres Remaining" fill={C.copper} radius={[3,3,0,0]} opacity={0.85}/>
                <Bar yAxisId="right" dataKey="grade" name="Avg CuEq %" fill={C.sage} radius={[3,3,0,0]} opacity={0.75}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <Hdr>Cut-off Grade Table</Hdr>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Cut-off","% Metres Remaining","Avg CuEq Grade","Notes"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"6px 12px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COG_DATA.map((d,i)=>(
                    <tr key={d.cog} style={{background:i%2===1?C.surface+"55":"transparent",borderBottom:`1px solid ${C.border}22`}}>
                      <td style={{padding:"6px 12px",color:C.copper,fontWeight:700}}>{d.cog}</td>
                      <td style={{padding:"6px 12px",color:C.text,fontWeight:700}}>{d.tonnes.toFixed(1)}%</td>
                      <td style={{padding:"6px 12px",color:C.sage,fontWeight:700}}>{d.grade.toFixed(2)}%</td>
                      <td style={{padding:"6px 12px",color:C.muted,fontSize:11}}>
                        {d.cog==="0%" ? "All material, incl. sub-grade" :
                         d.cog==="1%" ? "Typical economic cut-off for open pit" :
                         d.cog==="3%" ? "High-grade core" : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:8}}>
              Based on 9,878 Lion Zone assay records. Grade-tonnage relationship — higher cut-off removes low-grade material, increasing avg grade but reducing total resource. Values are % of total assay metres, not absolute resource tonnes.
            </div>
          </Card>
        </div>
      )}

      {/* ══════ CATALYST TIMELINE TAB ══════ */}
      {tab==="catalyst" && (
        <div>
          <Card style={{marginBottom:16,background:"#0d1000",border:`1px solid #ff6f0066`}}>
            <div style={{color:"#ff6f00",fontWeight:700,fontSize:13,marginBottom:4}}>Catalyst Timeline — Expected Re-Rating Events</div>
            <div style={{color:C.sub,fontSize:12,lineHeight:1.6}}>
              Key upcoming milestones and their historical re-rating impact for comparable junior mining projects. Speculative events are subject to change based on exploration progress and financing.
            </div>
          </Card>
          <div style={{position:"relative",paddingLeft:24}}>
            {/* Vertical line */}
            <div style={{position:"absolute",left:10,top:0,bottom:0,width:2,background:C.border}}/>
            {CATALYSTS.map((cat,i)=>(
              <div key={i} style={{position:"relative",marginBottom:20,paddingLeft:16}}>
                {/* Dot */}
                <div style={{position:"absolute",left:-20,top:14,width:12,height:12,borderRadius:"50%",
                  background:cat.color,border:`2px solid ${cat.color}`,boxShadow:`0 0 8px ${cat.color}66`}}/>
                <Card style={{border:`1px solid ${cat.color}44`}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
                    <div style={{minWidth:80}}>
                      <div style={{color:cat.color,fontWeight:800,fontSize:13}}>{cat.date}</div>
                      <span style={{
                        background:cat.status==="upcoming"?"#ff6f0022":"#9c27b022",
                        color:cat.status==="upcoming"?"#ff6f00":"#9c27b0",
                        border:`1px solid ${cat.status==="upcoming"?"#ff6f0044":"#9c27b044"}`,
                        borderRadius:4,padding:"1px 7px",fontSize:10,fontWeight:700,
                        letterSpacing:"0.06em",textTransform:"uppercase",display:"inline-block",marginTop:4
                      }}>{cat.status}</span>
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      <div style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:4}}>{cat.event}</div>
                      <div style={{color:C.sub,fontSize:12,marginBottom:6,lineHeight:1.55}}>{cat.detail}</div>
                      <div style={{background:"#0d1a0a",border:`1px solid ${C.sage}33`,borderRadius:4,padding:"6px 10px",fontSize:12,color:C.sage}}>
                        <span style={{fontWeight:700}}>Re-rating: </span>{cat.rerating}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════ NEWS LOG TAB ══════ */}
      {tab==="news" && (
        <div>
          {/* Live scraped news from powermetallic.com */}
          <Card style={{marginBottom:14}}>
            <Hdr>Corporate Filings &amp; Announcements — powermetallic.com {newsFetching && <span style={{color:C.muted,fontWeight:400,fontSize:10,textTransform:"none",letterSpacing:0}}> loading...</span>}</Hdr>
            {liveNews.length>0 ? (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {liveNews.map((n,i)=>(
                  <a key={i} href={n.url} target="_blank" rel="noreferrer"
                    style={{display:"block",padding:"10px 12px",background:i%2===0?C.surface:C.card,borderRadius:6,
                      color:C.copper,fontSize:12,fontWeight:600,textDecoration:"none",
                      border:`1px solid ${C.border}`,lineHeight:1.4}}>
                    {n.headline}
                    <span style={{color:C.muted,fontSize:10,fontWeight:400,marginLeft:8,float:"right"}}>↗</span>
                  </a>
                ))}
              </div>
            ) : !newsFetching ? (
              <div style={{color:C.muted,fontSize:12}}>No releases loaded. Check connection or visit powermetallic.com/news directly.</div>
            ) : (
              <div style={{color:C.muted,fontSize:12}}>Fetching latest releases...</div>
            )}
            <div style={{color:C.muted,fontSize:10,marginTop:8}}>Scraped live from powermetallic.com · Refreshes on page load · Click any release to open</div>
          </Card>
          <Card>
            <Hdr>Power Metallic Mines — News Release Log</Hdr>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Date","Headline"].map(h=>(
                      <th key={h} style={{color:C.muted,fontSize:11,padding:"6px 12px",textAlign:"left",fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NEWS.map((n,i)=>(
                    <tr key={i} style={{background:i%2===1?C.surface+"88":"transparent",borderBottom:`1px solid ${C.border}22`}}>
                      <td style={{padding:"8px 12px",color:C.muted,fontSize:11,whiteSpace:"nowrap"}}>{n.date}</td>
                      <td style={{padding:"8px 12px",fontSize:12}}>
                        <a href={n.url} target="_blank" rel="noopener noreferrer" style={{color:C.copper,fontWeight:600,textDecoration:"none"}}
                          onMouseEnter={e=>e.target.style.textDecoration="underline"}
                          onMouseLeave={e=>e.target.style.textDecoration="none"}>
                          {n.headline}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ══════ CAPEX/OPEX SENSITIVITY TAB ══════ */}
      {tab==="capexsens" && (()=>{
        const capexVals = [300,400,500,600,700];
        const opexVals  = [20,25,28,32,38,45];
        return (
          <div>
            <Card style={{marginBottom:14,background:"#0d1117",border:`1px solid ${C.border}`}}>
              <div style={{color:C.sub,fontSize:12,lineHeight:1.6}}>
                <strong style={{color:C.text}}>12Mt @ 5.5% CuEq · Current Metal Prices · Fixed scenario</strong> — CAPEX axis (columns), OPEX axis (rows). Shows combined pre-tax NPV ($M) and NAV/share (C$). Gold border = base case (CAPEX $400M, OPEX $28/t).
              </div>
            </Card>
            <Card>
              <Hdr>CAPEX/OPEX Sensitivity Matrix — 12Mt @ 5.5% CuEq · {discountRate}% Discount · {mineLife}yr Life</Hdr>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"separate",borderSpacing:3}}>
                  <thead>
                    <tr>
                      <th style={{color:C.muted,fontSize:11,padding:"6px 10px",textAlign:"left",fontWeight:600}}>OPEX $/t ↓ / CAPEX $M →</th>
                      {capexVals.map(cx=>(
                        <th key={cx} style={{color:"#ff6f00",fontSize:12,padding:"6px 10px",textAlign:"center",fontWeight:700}}>${cx}M</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {opexVals.map(opex=>(
                      <tr key={opex}>
                        <td style={{color:C.copper,fontWeight:700,fontSize:13,padding:"6px 10px"}}>${opex}/t</td>
                        {capexVals.map(capex=>{
                          const npv = calcNPV(lionRevT(5.5,p),opex,12e6,capex,discountRate/100,mineLife)+niskN;
                          const navSh = +(npv/sharesM/fx*(1-navDiscount/100)).toFixed(2);
                          const isBase = capex===400 && opex===28;
                          return (
                            <td key={capex} style={{
                              background:npvColor(npv),
                              border:isBase?`2px solid ${C.gold}`:`2px solid transparent`,
                              borderRadius:6,padding:"8px 10px",textAlign:"center",
                            }}>
                              <div style={{color:"#fff",fontWeight:700,fontSize:12}}>${npv.toFixed(0)}M</div>
                              <div style={{color:"rgba(255,255,255,0.65)",fontSize:10}}>C${navSh}/sh</div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{color:C.muted,fontSize:11,marginTop:8}}>
                Includes Nisk add-on NPV (${niskN.toFixed(0)}M at current prices). Gold border = base case. FX: {fx.toFixed(2)}. NAV discount: {navDiscount}%.
              </div>
            </Card>
          </div>
        );
      })()}

      {/* ══════ SCENARIOS TAB ══════ */}
      {tab==="scenarios" && (
        <div>
          <Card style={{marginBottom:14,background:"#0d1117",border:`1px solid ${C.border}`}}>
            <div style={{color:C.sub,fontSize:12,lineHeight:1.6}}>
              Save up to 3 named scenarios from the <span style={{color:C.copper,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setTab("mre")}>MRE Range tab</span>. Each snapshot captures all metal prices, tonnage, grade, discount rate, mine life, FX, shares, and NAV discount at the time of saving.
            </div>
          </Card>
          {scenarios.length===0 ? (
            <Card><div style={{color:C.muted,textAlign:"center",padding:40}}>No scenarios saved yet. Go to the MRE Range tab, set your assumptions, and click Save.</div></Card>
          ) : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
                <thead>
                  <tr style={{borderBottom:`2px solid ${C.border}`}}>
                    <th style={{color:C.muted,fontSize:11,padding:"8px 14px",textAlign:"left",fontWeight:600}}>Metric</th>
                    {scenarios.map(s=>(
                      <th key={s.name} style={{color:C.copper,fontSize:12,padding:"8px 14px",textAlign:"right",fontWeight:700}}>
                        {s.name}
                        <div style={{color:C.muted,fontSize:9,fontWeight:400}}>{s.savedAt}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {label:"Copper (USD/lb)",    fmt:s=>`$${s.p.cu.toFixed(2)}`},
                    {label:"Gold (USD/oz)",       fmt:s=>`$${s.p.au.toFixed(0)}`},
                    {label:"Palladium (USD/oz)",  fmt:s=>`$${s.p.pd.toFixed(0)}`},
                    {label:"Silver (USD/oz)",     fmt:s=>`$${s.p.ag.toFixed(0)}`},
                    {label:"Platinum (USD/oz)",   fmt:s=>`$${s.p.pt.toFixed(0)}`},
                    {label:"Nickel (USD/lb)",     fmt:s=>`$${s.p.ni.toFixed(2)}`},
                    {label:"─────────────────",  fmt:()=>""},
                    {label:"Tonnage (Mt)",        fmt:s=>`${s.selMt} Mt`},
                    {label:"CuEq Grade",         fmt:s=>`${s.selCuEq.toFixed(2)}%`},
                    {label:"Mine Life",          fmt:s=>`${s.mineLife} yrs`},
                    {label:"Discount Rate",      fmt:s=>`${s.discountRate}%`},
                    {label:"USD/CAD FX",         fmt:s=>`${s.fx.toFixed(2)}`},
                    {label:"Shares (M)",         fmt:s=>`${s.sharesM.toFixed(1)}M`},
                    {label:"NAV Discount",       fmt:s=>`${s.navDiscount}%`},
                    {label:"─────────────────",  fmt:()=>""},
                    {label:"Pre-Tax NPV8 ($M)",  fmt:s=>`$${s.npvPreTax.toFixed(0)}M`,  color:C.text},
                    {label:"After-Tax NPV8 ($M)",fmt:s=>`$${s.npvAfterTax.toFixed(0)}M`, color:C.sage},
                    {label:"Risked NAV/Share",   fmt:s=>`C$${s.navPerSh.toFixed(2)}`,    color:C.copper, bold:true},
                  ].map((row,i)=>(
                    <tr key={i} style={{background:i%2===1?C.surface+"66":"transparent",borderBottom:`1px solid ${C.border}11`}}>
                      <td style={{padding:"7px 14px",color:row.label.startsWith("─")?C.border:C.muted,fontSize:11}}>{row.label.startsWith("─")?"":row.label}</td>
                      {scenarios.map(s=>(
                        <td key={s.name} style={{padding:"7px 14px",textAlign:"right",
                          color:row.color||(row.label.startsWith("─")?C.border:C.text),
                          fontWeight:row.bold?700:400,fontSize:row.bold?14:12}}>
                          {row.label.startsWith("─")?"":row.fmt(s)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {scenarios.length>0 && (
            <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
              {scenarios.map(s=>(
                <button key={s.name}
                  onClick={()=>{ setP(s.p); setSelMt(s.selMt); setSelCuEq(s.selCuEq); setNavDiscount(s.navDiscount); setDiscountRate(s.discountRate); setMineLife(s.mineLife); setFx(s.fx); setSharesInput(String(s.sharesM)); setTab("mre"); }}
                  style={{background:C.copper+"22",border:`1px solid ${C.copper}`,borderRadius:6,padding:"8px 14px",color:C.copper,cursor:"pointer",fontSize:12,fontWeight:700}}>
                  Load "{s.name}"
                </button>
              ))}
              <button onClick={()=>setScenarios([])}
                style={{background:"#ef535011",border:"1px solid #ef5350",borderRadius:6,padding:"8px 14px",color:"#ef5350",cursor:"pointer",fontSize:12}}>
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══════ BREAK-EVEN TAB ══════ */}
      {tab==="breakeven" && (
        <div>
          <Card style={{marginBottom:14,background:"#0d1117",border:`1px solid ${C.border}`}}>
            <div style={{color:C.sub,fontSize:12,lineHeight:1.7}}>
              Given the current share price, what assumptions is the market implying? The model works backwards from price → implied NAV → solves for each variable independently, holding all others at current settings.
              {livePrice ? <span style={{color:C.sage}}> Using live price: <strong>C${livePrice.toFixed(2)}</strong></span>
                         : <span style={{color:"#ef5350"}}> Live price unavailable — using current model NAV/share as reference.</span>}
            </div>
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
            {/* Reference box */}
            <Card>
              <Hdr>Reference Inputs (current settings)</Hdr>
              {[
                ["Share price (C$)",      `C$${bePrice.toFixed(2)}`],
                ["Shares (M dil.)",       `${sharesM.toFixed(1)}M`],
                ["NAV discount applied",  `${navDiscount}%`],
                ["FX (USD/CAD)",          `${fx.toFixed(2)}`],
                ["Discount rate",         `${discountRate}%`],
                ["Mine life",             `${mineLife} yrs`],
                ["Target NAV (implied)",  `$${beTargetNAV.toFixed(0)}M`],
              ].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}22`,fontSize:12}}>
                  <span style={{color:C.muted}}>{l}</span>
                  <span style={{color:C.text,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </Card>

            {/* Implied variables */}
            <Card>
              <Hdr>What the Market is Implying</Hdr>
              <div style={{marginBottom:16}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Implied Copper Price</div>
                <div style={{fontSize:28,fontWeight:800,color:C.copper}}>${beCu.toFixed(2)}<span style={{fontSize:14,color:C.muted,fontWeight:400}}>/lb</span></div>
                <div style={{color:C.muted,fontSize:11,marginTop:2}}>vs current assumption: ${p.cu.toFixed(2)}/lb &nbsp;
                  <span style={{color:beCu>p.cu?C.sage:"#ef5350",fontWeight:700}}>{beCu>p.cu?"▲ market pricing in upside":"▼ market pricing in discount"}</span>
                </div>
              </div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginBottom:16}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Implied Tonnage (at {selCuEq}% CuEq, Cu ${p.cu.toFixed(2)})</div>
                <div style={{fontSize:28,fontWeight:800,color:C.sky}}>{beMt.toFixed(1)}<span style={{fontSize:14,color:C.muted,fontWeight:400}}> Mt</span></div>
                <div style={{color:C.muted,fontSize:11,marginTop:2}}>vs current: {selMt} Mt &nbsp;
                  <span style={{color:beMt>selMt?C.sage:"#ef5350",fontWeight:700}}>{beMt>selMt?"▲ market expects more tonnes":"▼ market expects fewer tonnes"}</span>
                </div>
              </div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Implied CuEq Grade (at {selMt} Mt, Cu ${p.cu.toFixed(2)})</div>
                <div style={{fontSize:28,fontWeight:800,color:C.gold}}>{beCuEq.toFixed(2)}<span style={{fontSize:14,color:C.muted,fontWeight:400}}>% CuEq</span></div>
                <div style={{color:C.muted,fontSize:11,marginTop:2}}>vs current: {selCuEq}% &nbsp;
                  <span style={{color:beCuEq>selCuEq?C.sage:"#ef5350",fontWeight:700}}>{beCuEq>selCuEq?"▲ market expects higher grade":"▼ market expects lower grade"}</span>
                </div>
              </div>
            </Card>

            {/* Interpretation */}
            <Card>
              <Hdr>How to Read This</Hdr>
              <div style={{fontSize:12,color:C.sub,lineHeight:1.8}}>
                <p style={{marginTop:0}}><strong style={{color:C.copper}}>Implied Cu price</strong> answers: "if tonnage and grade are right, what Cu price makes the stock fairly valued?" If it's below spot, the stock looks cheap on Cu alone.</p>
                <p><strong style={{color:C.sky}}>Implied tonnage</strong> answers: "if Cu and grade are right, how many tonnes does the market need to justify this price?" Compare against the MRE range to see if it's achievable.</p>
                <p><strong style={{color:C.gold}}>Implied grade</strong> answers: "if Cu and tonnes are right, what average CuEq does the deposit need?" Useful for benchmarking against analyst guidance.</p>
                <p style={{marginBottom:0,color:C.muted,fontSize:11}}>All three run independent searches — change metal prices, NAV discount, or tonnage on the MRE tab and the implied values update instantly.</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
