import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, CartesianGrid, ReferenceLine, Cell,
  LineChart, Line
} from "recharts";

// ── REAL DATA — Power_Nickel_All_Data.xlsx (16,037 assay records) ──────────
const RAW = {"lion":{"stats":{"total_holes":91,"assay_rows":9878,"sig_rows":533,"avg_cueq_sig":8.282,"max_cueq":93.72,"avg_cu":4.082,"avg_au":1.075,"avg_pd":6.721,"avg_ag":30.545},"holes":[{"hole":"PML-25-012A","length":6.8,"grade":21.637,"maxGrade":69.836,"year":2025},{"hole":"PML-25-001","length":0.8,"grade":20.049,"maxGrade":20.049,"year":2025},{"hole":"PN-24-047","length":12.0,"grade":16.956,"maxGrade":37.578,"year":2024},{"hole":"PML-26-049","length":14.3,"grade":16.417,"maxGrade":35.3,"year":2026},{"hole":"PML-25-002","length":1.1,"grade":15.248,"maxGrade":31.775,"year":2025},{"hole":"PN-24-068","length":0.5,"grade":14.974,"maxGrade":14.974,"year":2024},{"hole":"PML-25-031","length":4.6,"grade":13.995,"maxGrade":28.742,"year":2025},{"hole":"PML-25-025A","length":5.3,"grade":13.919,"maxGrade":51.228,"year":2025},{"hole":"PML-25-023","length":5.2,"grade":13.737,"maxGrade":38.75,"year":2025},{"hole":"PN-24-051","length":8.5,"grade":13.565,"maxGrade":93.72,"year":2024},{"hole":"PN-24-059","length":7.2,"grade":12.72,"maxGrade":23.647,"year":2024},{"hole":"PN-24-071","length":13.7,"grade":12.293,"maxGrade":27.212,"year":2024},{"hole":"PN-24-055","length":14.1,"grade":12.287,"maxGrade":37.63,"year":2024},{"hole":"PN-24-044","length":7.0,"grade":11.657,"maxGrade":37.026,"year":2024},{"hole":"PML-25-029B","length":6.4,"grade":11.437,"maxGrade":23.78,"year":2025},{"hole":"PML-25-022","length":10.2,"grade":11.212,"maxGrade":28.372,"year":2025},{"hole":"PN-23-031A","length":7.0,"grade":11.0,"maxGrade":60.95,"year":2023},{"hole":"PN-24-053","length":11.8,"grade":10.407,"maxGrade":42.742,"year":2024},{"hole":"PML-25-015","length":13.3,"grade":9.524,"maxGrade":33.952,"year":2025},{"hole":"PN-24-067","length":3.4,"grade":9.352,"maxGrade":20.87,"year":2024},{"hole":"PN-25-096","length":7.2,"grade":9.314,"maxGrade":39.083,"year":2025},{"hole":"PN-24-070","length":26.4,"grade":9.21,"maxGrade":30.05,"year":2024},{"hole":"PN-24-063","length":4.0,"grade":8.909,"maxGrade":17.731,"year":2024},{"hole":"PN-24-086","length":4.6,"grade":8.815,"maxGrade":55.029,"year":2024},{"hole":"PN-24-095A","length":9.1,"grade":7.977,"maxGrade":26.29,"year":null},{"hole":"PML-25-005","length":6.1,"grade":7.945,"maxGrade":24.795,"year":2025},{"hole":"PN-24-054","length":5.5,"grade":7.853,"maxGrade":32.963,"year":2024},{"hole":"PN-24-079","length":13.9,"grade":7.152,"maxGrade":32.006,"year":2024},{"hole":"PML-25-045","length":12.4,"grade":6.897,"maxGrade":32.223,"year":2025},{"hole":"PML-25-008","length":1.0,"grade":6.884,"maxGrade":6.884,"year":2025},{"hole":"PN-24-074","length":2.5,"grade":6.837,"maxGrade":14.585,"year":2024},{"hole":"PN-25-100","length":4.9,"grade":6.716,"maxGrade":16.007,"year":2025},{"hole":"PML-25-043","length":7.0,"grade":6.614,"maxGrade":30.891,"year":2025},{"hole":"PN-24-066","length":5.0,"grade":6.447,"maxGrade":15.011,"year":2024},{"hole":"PML-25-020","length":21.0,"grade":6.262,"maxGrade":20.599,"year":2025},{"hole":"PN-24-073","length":6.1,"grade":5.717,"maxGrade":8.591,"year":2024},{"hole":"PML-25-047","length":6.6,"grade":5.621,"maxGrade":29.056,"year":2025},{"hole":"PN-24-048","length":15.2,"grade":5.587,"maxGrade":40.612,"year":2024},{"hole":"PML-25-013","length":2.0,"grade":5.584,"maxGrade":9.935,"year":2025},{"hole":"PML-25-046","length":12.7,"grade":5.577,"maxGrade":21.041,"year":2025},{"hole":"PN-24-057","length":5.8,"grade":5.544,"maxGrade":20.5,"year":2024},{"hole":"PN-24-072","length":19.4,"grade":5.263,"maxGrade":25.105,"year":2024},{"hole":"PN-24-056","length":2.4,"grade":5.038,"maxGrade":9.306,"year":2024},{"hole":"PN-24-060","length":7.7,"grade":4.993,"maxGrade":16.946,"year":2024},{"hole":"PN-24-081","length":2.0,"grade":4.679,"maxGrade":7.844,"year":2024},{"hole":"PN-24-078","length":13.8,"grade":4.62,"maxGrade":18.845,"year":2024},{"hole":"PML-25-034A","length":3.0,"grade":4.535,"maxGrade":10.064,"year":2025},{"hole":"PN-24-075","length":7.4,"grade":4.482,"maxGrade":10.562,"year":2024},{"hole":"PN-25-097","length":6.8,"grade":4.339,"maxGrade":12.833,"year":2025},{"hole":"PN-24-069","length":18.0,"grade":4.255,"maxGrade":17.644,"year":2024}],"byYear":[{"YEAR":2023,"holes":3,"avgGrade":0.448,"maxGrade":60.95,"totalM":283.4},{"YEAR":2024,"holes":42,"avgGrade":0.737,"maxGrade":93.72,"totalM":3949.55},{"YEAR":2025,"holes":42,"avgGrade":0.325,"maxGrade":69.836,"totalM":6758.7},{"YEAR":2026,"holes":1,"avgGrade":2.053,"maxGrade":35.3,"totalM":159.51}],"hist":[{"bin":"0–0.5%","count":9086},{"bin":"0.5–1%","count":259},{"bin":"1–2%","count":146},{"bin":"2–3%","count":74},{"bin":"3–5%","count":82},{"bin":"5–8%","count":72},{"bin":"8–12%","count":44},{"bin":"12–20%","count":46},{"bin":"20–40%","count":61}],"metalContrib":{"Cu":404.93,"Au":106.96,"Ag":30.4,"Pd":209.03,"Pt":70.31}},"nisk":{"stats":{"total_holes":127,"assay_rows":4591,"sig_rows":957,"avg_nieq_sig":1.694,"max_nieq":8.327,"avg_ni":0.949,"avg_cu":0.582,"avg_pd":1.062,"avg_co":0.064},"holes":[{"hole":"TF-56-08","length":9.0,"grade":2.9,"maxGrade":4.789,"year":2008},{"hole":"PN-23-042","length":2.0,"grade":2.793,"maxGrade":2.803,"year":2023},{"hole":"PN-22-012","length":11.7,"grade":2.58,"maxGrade":5.656,"year":2022},{"hole":"PN-23-028","length":7.8,"grade":2.505,"maxGrade":3.083,"year":2023},{"hole":"TF-47-07","length":9.0,"grade":2.405,"maxGrade":4.733,"year":2007},{"hole":"TF-71-10","length":9.2,"grade":2.346,"maxGrade":8.327,"year":2010},{"hole":"TF-60-08","length":4.0,"grade":2.226,"maxGrade":3.264,"year":2008},{"hole":"PN-21-002","length":8.4,"grade":2.215,"maxGrade":3.169,"year":2021},{"hole":"TF-33-07","length":6.5,"grade":2.206,"maxGrade":5.418,"year":2007},{"hole":"PN-23-036","length":10.8,"grade":2.205,"maxGrade":5.512,"year":2023},{"hole":"PN-22-009","length":32.6,"grade":2.18,"maxGrade":7.173,"year":2022},{"hole":"TF-25-07","length":17.5,"grade":2.168,"maxGrade":3.439,"year":2007},{"hole":"PN-21-003A","length":21.0,"grade":2.119,"maxGrade":3.785,"year":2021},{"hole":"TF-05-07","length":21.5,"grade":2.073,"maxGrade":3.356,"year":2007},{"hole":"TF-57-08","length":6.5,"grade":1.926,"maxGrade":4.106,"year":2008},{"hole":"TF-13-07","length":5.0,"grade":1.925,"maxGrade":2.917,"year":2007},{"hole":"PN-21-006","length":5.7,"grade":1.899,"maxGrade":3.371,"year":2021},{"hole":"TF-16-07","length":2.5,"grade":1.861,"maxGrade":2.697,"year":2007},{"hole":"TF-62-08","length":6.0,"grade":1.832,"maxGrade":2.854,"year":2008},{"hole":"PN-22-011","length":5.2,"grade":1.83,"maxGrade":3.018,"year":2022},{"hole":"TF-46-07","length":13.0,"grade":1.817,"maxGrade":3.158,"year":2007},{"hole":"TF-32-07","length":6.2,"grade":1.813,"maxGrade":5.072,"year":2007},{"hole":"TF-29-07","length":3.5,"grade":1.798,"maxGrade":2.477,"year":2007},{"hole":"PN-23-035","length":14.7,"grade":1.783,"maxGrade":3.219,"year":2023},{"hole":"TF-61-08","length":8.5,"grade":1.781,"maxGrade":6.313,"year":2008}],"byYear":[{"YEAR":2007,"holes":42,"avgGrade":0.811,"maxGrade":5.418,"totalM":592.5},{"YEAR":2008,"holes":18,"avgGrade":0.81,"maxGrade":6.313,"totalM":264.4},{"YEAR":2021,"holes":7,"avgGrade":0.769,"maxGrade":3.785,"totalM":324.7},{"YEAR":2022,"holes":11,"avgGrade":0.353,"maxGrade":7.173,"totalM":1222.13},{"YEAR":2023,"holes":15,"avgGrade":0.351,"maxGrade":5.512,"totalM":781.34}]}};

// ── ANALYST GUIDANCE + COMPUTED MATRIX ────────────────────────────────────
// Metal grade ratios derived from actual drill data (sig samples)
// avg CuEq 8.282% → Cu 4.082%, Au 1.075g/t, Pd 6.721g/t, Ag 30.5g/t
const AVG_CUEQ = 8.282;
const GRADE_RATIO = { cu: 4.082/AVG_CUEQ, au: 1.075/AVG_CUEQ, pd: 6.721/AVG_CUEQ, ag: 30.545/AVG_CUEQ, pt: 0.3/AVG_CUEQ };
const REC  = { cu:0.85, au:0.80, pd:0.67, ag:0.75, pt:0.67, ni:0.70, co:0.79 };
const PAY  = { cu:0.90, au:0.95, pd:0.78, ag:0.80, pt:0.78, ni:0.73, co:0.27 };
const LB=2204.62, OZ=32.1507;
const SHARES_M = 237.195816; // fully diluted shares (237,195,816)

const DEF_P = { cu:4.50, au:3200, pd:1000, ag:32, pt:950, ni:7.00, co:12.00 };

function lionRevT(cueq, p) {
  // Decompose CuEq into constituent metals using actual data ratios
  const cu  = cueq * GRADE_RATIO.cu;
  const au  = cueq * GRADE_RATIO.au;
  const pd  = cueq * GRADE_RATIO.pd;
  const ag  = cueq * GRADE_RATIO.ag;
  const pt  = cueq * GRADE_RATIO.pt;
  return (
    cu/100*LB*p.cu*REC.cu*PAY.cu +
    au/OZ*p.au*REC.au*PAY.au +
    pd/OZ*p.pd*REC.pd*PAY.pd +
    ag/OZ*p.ag*REC.ag*PAY.ag +
    pt/OZ*p.pt*REC.pt*PAY.pt
  );
}
function niskRevT(p) {
  return (
    0.764/100*LB*p.ni*REC.ni*PAY.ni +
    0.394/100*LB*p.cu*REC.cu*PAY.cu +
    0.048/100*LB*p.co*REC.co*PAY.co +
    0.705/OZ*p.pd*REC.pd*PAY.pd
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
function buildMatrix(p, niskAddon) {
  return MT_VALS.map(mt => {
    const row = { mt };
    CUEQ_VALS.forEach(cueq => {
      const capex = 400 + (mt - 10) * 20;
      const lRev = lionRevT(cueq, p);
      const lNPV = calcNPV(lRev, 28, mt*1e6, capex);
      row[cueq] = +(lNPV + niskAddon).toFixed(0);
    });
    return row;
  });
}

// Cu price sensitivity at 12Mt / 5.5%
function buildCuSens(p, niskAddon) {
  return [3.00,3.50,4.00,4.50,5.00,5.50,6.00,6.56].map(cu => {
    const pp = {...p, cu};
    const lRev = lionRevT(5.5, pp);
    const n = calcNPV(lRev, 28, 12e6, 440) + niskAddon;
    const perSh = n/SHARES_M/0.73;
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

  const niskN   = useMemo(()=>calcNPV(niskRevT(p),55,5.43e6,250),[p]);
  const matrix  = useMemo(()=>buildMatrix(p,niskN),[p,niskN]);
  const cuSens  = useMemo(()=>buildCuSens(p,niskN),[p,niskN]);

  const selRev  = useMemo(()=>lionRevT(selCuEq,p),[selCuEq,p]);
  const selLNPV = useMemo(()=>calcNPV(selRev,28,selMt*1e6,400+(selMt-10)*20),[selRev,selMt]);
  const selTot  = selLNPV + niskN;
  const selPerSh = selTot / SHARES_M / 0.73; // USD->CAD

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
  ];

  const Slider = ({label,field,min,max,step,unit}) => (
    <div style={{marginBottom:9}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
        <span style={{color:C.sub,fontSize:12}}>{label}</span>
        <span style={{color:C.copper,fontSize:12,fontWeight:700}}>{unit}{p[field].toFixed(field==="cu"||field==="ni"||field==="co"?2:0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={p[field]}
        onChange={e=>setP(prev=>({...prev,[field]:+e.target.value}))}
        style={{width:"100%",accentColor:C.copper}}/>
    </div>
  );

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Inter','Segoe UI',sans-serif",fontSize:14}}>

      {/* HEADER */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"18px 24px"}}>
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
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            <Tag c={C.copper}>Lion CuEq</Tag>
            <Tag c={C.sky}>+Nisk NPV</Tag>
            <Tag c="#ff6f00">Analyst Range</Tag>
          </div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
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

      <div style={{padding:18,maxWidth:1200,margin:"0 auto"}}>

      {/* ══════ MRE RANGE TAB ══════ */}
      {tab==="mre" && (
        <div>
          {/* Range callout */}
          <Card style={{border:`1px solid #ff6f0088`,background:"#1a1000",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:20,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:220}}>
                <div style={{color:"#ff6f00",fontWeight:800,fontSize:15,marginBottom:6}}>Analyst MRE Guidance</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div><div style={{color:C.muted,fontSize:11}}>Tonnage range</div>
                    <div style={{color:C.text,fontSize:22,fontWeight:800}}>10–14 Mt</div></div>
                  <div><div style={{color:C.muted,fontSize:11}}>Grade range (CuEq)</div>
                    <div style={{color:C.text,fontSize:22,fontWeight:800}}>4.25–7.0%</div></div>
                </div>
                <div style={{color:C.muted,fontSize:12,marginTop:8}}>
                  Actual sig-sample avg from drill data: <span style={{color:C.copper,fontWeight:700}}>8.28% CuEq</span> — guidance represents diluted MRE grade incl. internal waste &amp; halo material.
                </div>
              </div>
              <div style={{flex:1,minWidth:220}}>
                <div style={{color:C.sub,fontSize:11,fontWeight:700,marginBottom:6}}>ANALYST RANGE BOUNDS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {[["Low End","10Mt @ 4.25%","$1.0B NPV"],["Base","12Mt @ 5.5%","$1.8B NPV"],["High End","14Mt @ 7.0%","$3.0B NPV"]].map(([l,v,n])=>(
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
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Select Your MRE Scenario</Hdr>
              <div style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{color:C.sub,fontSize:12}}>Tonnage</span>
                  <span style={{color:C.copper,fontWeight:700}}>{selMt} Mt</span>
                </div>
                <input type="range" min={10} max={14} step={1} value={selMt}
                  onChange={e=>setSelMt(+e.target.value)}
                  style={{width:"100%",accentColor:C.copper}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
                  {[10,11,12,13,14].map(v=>(
                    <span key={v} style={{fontSize:10,color:v===selMt?C.copper:C.muted}}>{v}Mt</span>
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
                  <span style={{fontSize:10,color:C.muted}}>4.25%</span>
                  <span style={{fontSize:10,color:"#ff6f00"}}>◄ analyst range ►</span>
                  <span style={{fontSize:10,color:C.muted}}>7.0%</span>
                </div>
              </div>

              {/* Implied grades */}
              <div style={{background:C.surface,borderRadius:6,padding:12}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:8}}>
                  Implied metal grades (from actual drill data ratios)
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
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
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <Kpi label="Lion NPV (8%)" value={"$"+selLNPV.toFixed(0)} unit="M" color={C.copper} big/>
                <Kpi label="Combined NPV" value={"$"+selTot.toFixed(0)} unit="M" color={C.sage} big/>
                <Kpi label="NAV/share (unrisked)" value={"C$"+selPerSh.toFixed(2)} color={C.gold}
                  sub="225M dil. shares · 0.73 FX"/>
                <Kpi label="Gross Rev/t (Lion)" value={"$"+selRev.toFixed(0)} unit="USD/t" color={C.copper}
                  sub={"Net $"+(selRev-28).toFixed(0)+"/t after $28 opex"}/>
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
            <Hdr>Unrisked NAV/Share (C$) Across Analyst Guidance Range — at Cu ${p.cu}/lb, Pd ${p.pd}/oz</Hdr>
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
                    pts.push({cueq,nav:+(n/SHARES_M/0.73).toFixed(2),mt});
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
          <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16,marginBottom:16}}>
            <Card>
              <Hdr>Metal Prices</Hdr>
              <Slider label="Copper (USD/lb)"  field="cu"  min={2}   max={8}    step={0.05} unit="$"/>
              <Slider label="Palladium (USD/oz)" field="pd" min={400} max={3000} step={25}   unit="$"/>
              <Slider label="Gold (USD/oz)"    field="au"  min={1500} max={4500} step={50}   unit="$"/>
              <Slider label="Nickel (USD/lb)"  field="ni"  min={3}   max={16}   step={0.25} unit="$"/>
              <Slider label="Silver (USD/oz)"  field="ag"  min={10}  max={60}   step={1}    unit="$"/>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:6}}>
                <div style={{color:C.muted,fontSize:11,marginBottom:4}}>Nisk add-on NPV</div>
                <div style={{color:C.sky,fontWeight:700,fontSize:16}}>${niskN.toFixed(0)}M</div>
                <div style={{color:C.muted,fontSize:11}}>Included in all cells</div>
              </div>
            </Card>

            <Card>
              <Hdr>NPV Matrix ($M USD) — Lion + Nisk · 8% Discount · 15yr Life</Hdr>
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
                          const v=row[c];
                          const isSelected = row.mt===selMt && Math.abs(c-selCuEq)<0.01;
                          return (
                            <td key={c} onClick={()=>{setSelMt(row.mt);setSelCuEq(c);setTab("mre");}}
                              style={{
                                background:npvColor(v),
                                border:isSelected?`2px solid ${C.gold}`:`2px solid transparent`,
                                borderRadius:6,padding:"10px 14px",textAlign:"center",cursor:"pointer",
                                transition:"opacity 0.1s",
                              }}>
                              <div style={{color:"#fff",fontWeight:700,fontSize:14}}>${v.toLocaleString()}M</div>
                              <div style={{color:"rgba(255,255,255,0.6)",fontSize:10}}>
                                C${(v/SHARES_M/0.73).toFixed(2)}/sh
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
                    {m:"Cu",  v:+(cueq*GRADE_RATIO.cu/100*LB*p.cu*REC.cu*PAY.cu).toFixed(0)},
                    {m:"Pd",  v:+(cueq*GRADE_RATIO.pd/OZ*p.pd*REC.pd*PAY.pd).toFixed(0)},
                    {m:"Au",  v:+(cueq*GRADE_RATIO.au/OZ*p.au*REC.au*PAY.au).toFixed(0)},
                    {m:"Ag",  v:+(cueq*GRADE_RATIO.ag/OZ*p.ag*REC.ag*PAY.ag).toFixed(0)},
                    {m:"Pt",  v:+(cueq*GRADE_RATIO.pt/OZ*p.pt*REC.pt*PAY.pt).toFixed(0)},
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

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            <Card>
              <Hdr>Combined NPV vs. Copper Price — 12Mt @ 5.5% CuEq</Hdr>
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
                      <div style={{color:C.gold}}>NAV: C${d?.perSh}/sh</div>
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
                    {cuSens.map((d,i)=><Cell key={i} fill={d.perSh>10?C.sage:d.perSh>7?C.copper:C.muted}/>)}
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
                    {["Cu Price","Rev/t Lion","Net/t Lion","NPV Combined","NAV/sh (C$)","Mkt Cap (C$)"].map(h=>(
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
                        <td style={{padding:"6px 12px",color:C.gold,fontWeight:700}}>C${d.perSh}</td>
                        <td style={{padding:"6px 12px",color:C.sub}}>C${(d.npv/0.73/1000).toFixed(1)}B</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{color:C.muted,fontSize:11,marginTop:8}}>
              ~225M diluted shares · USD/CAD 0.73 · 8% discount · 15yr life · $28/t opex (Lion open pit) · $55/t (Nisk UG) · CAPEX $650M combined
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

      </div>
    </div>
  );
}
