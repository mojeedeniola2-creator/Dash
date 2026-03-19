import { G } from '../tokens.js';

export default function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  const color = pct > 90 ? "#ff6432" : pct > 70 ? G.purple : G.blue;
  return (
    <div style={{ width:"100%", background: G.border, borderRadius:4, height:4, overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, height:"100%", background: color, borderRadius:4, transition:"width 0.6s ease" }} />
    </div>
  );
}
