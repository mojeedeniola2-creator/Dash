export const G = {
  bg:       "#070b14",
  surface:  "#0c1220",
  surface2: "#111827",
  border:   "rgba(99,140,255,0.1)",
  border2:  "rgba(99,140,255,0.2)",
  blue:     "#4f8cff",
  blueDim:  "#2a5ce8",
  purple:   "#9b72ff",
  sky:      "#7dd3fc",
  text:     "#e8edf8",
  muted:    "#7a8aaa",
  dim:      "#3a4a6a",
};

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Geist+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: ${G.bg};
    color: ${G.text};
    font-family: 'Syne', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(79,140,255,0.25); border-radius: 2px; }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
  @keyframes scaleIn  { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }
  .fade-up  { animation: fadeUp  0.55s ease both; }
  .fade-in  { animation: fadeIn  0.4s  ease both; }
  .scale-in { animation: scaleIn 0.4s  ease both; }
`;
