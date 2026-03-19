export default function Badge({ type, label }) {
  const colors = {
    live: { bg: "rgba(79,140,255,0.85)", color: "#fff" },
    hot:  { bg: "rgba(255,100,50,0.9)",  color: "#fff" },
    free: { bg: "rgba(0,200,100,0.85)",  color: "#fff" },
    soon: { bg: "rgba(155,114,255,0.85)",color: "#fff" },
  };
  const c = colors[type] || colors.soon;
  return (
    <span style={{
      padding: "3px 9px", borderRadius: 4, fontSize: 9,
      fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
      fontFamily: "'Geist Mono',monospace", background: c.bg, color: c.color,
    }}>{label}</span>
  );
}
