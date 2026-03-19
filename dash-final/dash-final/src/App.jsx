import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const EVENTS = [
  {
    id: 1,
    title: "Burna Boy — Space Drift Tour",
    artist: "Burna Boy",
    genre: "Afrobeats",
    genreEmoji: "🔥",
    description: "An explosive Afrobeats headline show from Grammy Award winner Burna Boy. Expect anthems, special guests, and a night that will define 2026. No curfew. No limits.",
    longDesc: "Burna Boy brings his record-breaking Space Drift Tour to Ibadan for one night only. Fresh off multiple sold-out global dates, this show promises an immersive production — stunning visuals, a 20-piece live band, and a setlist spanning every era of his catalogue. Supporting acts TBA. This is the biggest concert Ibadan has seen in years.",
    date: "Thu, Mar 19, 2026",
    time: "9:00 PM – 2:00 AM",
    city: "Ibadan",
    venue: "Agodi Gardens Amphitheatre",
    price: 15000,
    vipPrice: 35000,
    currency: "₦",
    attending: 2400,
    capacity: 3000,
    badge: "live",
    badgeLabel: "Live Tonight",
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    tags: ["Afrobeats", "Live Band", "Outdoor"],
  },
  {
    id: 2,
    title: "Seun Kuti & Egypt 80 — Afrobeat Revivalist",
    artist: "Seun Kuti",
    genre: "Jazz & Soul",
    genreEmoji: "🎷",
    description: "Seun Kuti continues his father's revolutionary Afrobeat legacy. A hypnotic blend of jazz, funk, and fierce political energy in an intimate seated venue.",
    longDesc: "One of Africa's most electrifying live acts, Seun Kuti & Egypt 80 perform with a full 20-piece orchestra. The set weaves Fela's originals with Seun's own politically charged compositions — a rare, unmissable cultural event. Doors open at 7 PM. Dinner reservations available.",
    date: "Fri, Mar 20, 2026",
    time: "8:00 PM – 11:00 PM",
    city: "Ibadan",
    venue: "The Place, Jericho",
    price: 3500,
    vipPrice: 8000,
    currency: "₦",
    attending: 540,
    capacity: 800,
    badge: "soon",
    badgeLabel: "This Week",
    img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80",
    tags: ["Jazz", "Afrobeat", "Seated", "Live Band"],
  },
  {
    id: 3,
    title: "Tems × Omah Lay — Midnight Frequency",
    artist: "Tems & Omah Lay",
    genre: "R&B / Afropop",
    genreEmoji: "🌀",
    description: "Two of Africa's most magnetic voices share a stage. A dreamy, soul-drenched night of R&B-infused Afropop with a live band in tow.",
    longDesc: "For the first time on the same stage, Tems and Omah Lay deliver back-to-back headline sets before joining for a surprise collaborative finale. The Midnight Frequency show is a celebration of the new sound of Africa — emotional, cinematic, and unforgettable. Strictly limited tickets remain.",
    date: "Sat, Mar 21, 2026",
    time: "8:30 PM – 12:00 AM",
    city: "Ibadan",
    venue: "The Palms Event Centre",
    price: 12000,
    vipPrice: 25000,
    currency: "₦",
    attending: 2891,
    capacity: 3000,
    badge: "hot",
    badgeLabel: "Selling Fast",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    tags: ["R&B", "Afropop", "Collab Show"],
  },
  {
    id: 4,
    title: "Underground Voices — Open Mic Night",
    artist: "Various Artists",
    genre: "Open Mic",
    genreEmoji: "🎙",
    description: "Ibadan's most vibrant open mic platform for emerging poets, singers, rappers, and spoken word artists. Come perform or witness the next big thing.",
    longDesc: "Now in its 3rd season, Underground Voices is Ibadan's premier platform for raw talent. Any genre, any style — just bring your voice. Sign up at the door to perform a 5-minute slot, or come as an audience member and be the first to discover Nigeria's next breakout stars.",
    date: "Sun, Mar 22, 2026",
    time: "7:00 PM – 10:30 PM",
    city: "Ibadan",
    venue: "Cubana, Ring Road",
    price: 0,
    vipPrice: 0,
    currency: "₦",
    attending: 180,
    capacity: 350,
    badge: "free",
    badgeLabel: "Free Entry",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    tags: ["Open Mic", "Free", "Emerging Artists"],
  },
  {
    id: 5,
    title: "Adekunle Gold × Simi — Acoustic Sessions",
    artist: "Adekunle Gold & Simi",
    genre: "Highlife",
    genreEmoji: "🎵",
    description: "An intimate acoustic evening with Nigeria's most beloved musical couple. Raw, stripped-back versions of fan favourites plus new unreleased material.",
    longDesc: "An evening stripped of production excess — just two guitars, two voices, and pure emotion. Adekunle Gold and Simi perform their biggest hits in full acoustic arrangements, share stories from behind the songs, and preview tracks from their upcoming joint project. Strictly 350 seats. Book early.",
    date: "Fri, Mar 27, 2026",
    time: "7:30 PM – 10:00 PM",
    city: "Osogbo",
    venue: "Leisure Mall, Osogbo",
    price: 8500,
    vipPrice: 18000,
    currency: "₦",
    attending: 342,
    capacity: 800,
    badge: "soon",
    badgeLabel: "Upcoming",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    tags: ["Highlife", "Acoustic", "Intimate"],
  },
  {
    id: 6,
    title: "DJ Neptune — Amapiano Night Vol. 7",
    artist: "DJ Neptune",
    genre: "Amapiano",
    genreEmoji: "⚡",
    description: "Volume 7 of Ibadan's most consistent electronic dance night. DJ Neptune brings the log drums, the keys, and the full Amapiano experience.",
    longDesc: "The series that put Ibadan on the Amapiano map returns for its seventh edition. DJ Neptune headlines with a 3-hour back-to-back set, joined by resident DJs and surprise guest performers from the SA and Nigerian Amapiano scenes. Expect smoke machines, lasers, and a crowd that doesn't stop moving.",
    date: "Thu, Mar 19, 2026",
    time: "10:00 PM – 3:00 AM",
    city: "Ibadan",
    venue: "Amigos, UI Road",
    price: 2000,
    vipPrice: 5000,
    currency: "₦",
    attending: 410,
    capacity: 500,
    badge: "live",
    badgeLabel: "Tonight",
    img: "https://images.unsplash.com/photo-1571266752735-a9b5ed5b167c?w=800&q=80",
    artistImg: "https://images.unsplash.com/photo-1571266752735-a9b5ed5b167c?w=400&q=80",
    tags: ["Amapiano", "DJ Set", "Club Night"],
  },
];

const ARTISTS = [
  { id: 1, name: "Burna Boy", genre: "Afrobeats", events: 1, img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80", followers: "2.4M" },
  { id: 2, name: "Seun Kuti", genre: "Afrobeat / Jazz", events: 1, img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80", followers: "340K" },
  { id: 3, name: "Tems", genre: "R&B / Afropop", events: 1, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", followers: "1.8M" },
  { id: 4, name: "Adekunle Gold", genre: "Highlife / Afropop", events: 1, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80", followers: "890K" },
  { id: 5, name: "DJ Neptune", genre: "Amapiano / Electronic", events: 1, img: "https://images.unsplash.com/photo-1571266752735-a9b5ed5b167c?w=400&q=80", followers: "620K" },
  { id: 6, name: "Omah Lay", genre: "Afropop / R&B", events: 1, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80", followers: "1.1M" },
];

const VENUES = [
  { id: 1, name: "Agodi Gardens Amphitheatre", city: "Ibadan", cap: 3000, events: 1, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80", type: "Outdoor Amphitheatre" },
  { id: 2, name: "The Place, Jericho", city: "Ibadan", cap: 800, events: 1, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80", type: "Indoor Venue" },
  { id: 3, name: "The Palms Event Centre", city: "Ibadan", cap: 3000, events: 1, img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80", type: "Multi-purpose Hall" },
  { id: 4, name: "Cubana, Ring Road", city: "Ibadan", cap: 350, events: 1, img: "https://images.unsplash.com/photo-1571266752735-a9b5ed5b167c?w=400&q=80", type: "Lounge & Bar" },
  { id: 5, name: "Leisure Mall, Osogbo", city: "Osogbo", cap: 800, events: 1, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80", type: "Mall Venue" },
  { id: 6, name: "Amigos, UI Road", city: "Ibadan", cap: 500, events: 1, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", type: "Club" },
];

const GENRES = ["All Events","Tonight","This Week","Afrobeats","Amapiano","Jazz","Highlife","Electronic","R&B / Soul","Open Mic","Free Entry"];

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */
const G = {
  bg: "#070b14", surface: "#0c1220", surface2: "#111827",
  border: "rgba(99,140,255,0.1)", border2: "rgba(99,140,255,0.2)",
  blue: "#4f8cff", blueDim: "#2a5ce8", purple: "#9b72ff", sky: "#7dd3fc",
  text: "#e8edf8", muted: "#7a8aaa", dim: "#3a4a6a",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Geist+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:${G.bg};color:${G.text};font-family:'Syne',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(79,140,255,0.25);border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes drift{from{transform:translateX(0)}to{transform:translateX(-8%)}}
  .fade-up{animation:fadeUp 0.55s ease both;}
  .fade-in{animation:fadeIn 0.4s ease both;}
  .scale-in{animation:scaleIn 0.4s ease both;}
`;

/* ═══════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════ */
const Badge = ({ type, label }) => {
  const colors = {
    live:  { bg: "rgba(79,140,255,0.85)",   text: "#fff" },
    hot:   { bg: "rgba(255,100,50,0.9)",     text: "#fff" },
    free:  { bg: "rgba(0,200,100,0.85)",     text: "#fff" },
    soon:  { bg: "rgba(155,114,255,0.85)",   text: "#fff" },
  };
  const c = colors[type] || colors.soon;
  return (
    <span style={{
      padding: "3px 9px", borderRadius: 4, fontSize: 9,
      fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
      fontFamily: "'Geist Mono',monospace", background: c.bg, color: c.text,
    }}>{label}</span>
  );
};

const Tag = ({ label }) => (
  <span style={{
    padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600,
    border: `1px solid ${G.border2}`, color: G.muted, letterSpacing: "0.5px",
  }}>{label}</span>
);

const ProgressBar = ({ value, max }) => {
  const pct = Math.round((value / max) * 100);
  const color = pct > 90 ? "#ff6432" : pct > 70 ? G.purple : G.blue;
  return (
    <div style={{ width: "100%", background: G.border, borderRadius: 4, height: 4, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
    </div>
  );
};

const WaveCanvas = () => {
  const ref = useRef(null);
  const tRef = useRef(0);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const waves = [
      { amp: 22, freq: 0.013, speed: 0.022, alpha: 0.22, r:79,g:140,b:255, off: 0 },
      { amp: 14, freq: 0.02,  speed: 0.032, alpha: 0.15, r:155,g:114,b:255, off: 2 },
      { amp: 30, freq: 0.009, speed: 0.016, alpha: 0.1,  r:125,g:211,b:252, off: 4 },
    ];
    let raf;
    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.5;
      waves.forEach(wv => {
        ctx.beginPath(); ctx.moveTo(0, cy);
        for (let x = 0; x <= w; x += 2) {
          const y = cy + Math.sin(x * wv.freq + tRef.current * wv.speed + wv.off) * wv.amp
                      + Math.sin(x * wv.freq * 1.7 + tRef.current * wv.speed * 1.4 + wv.off) * wv.amp * 0.35;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
        ctx.fillStyle = `rgba(${wv.r},${wv.g},${wv.b},${wv.alpha})`;
        ctx.fill();
      });
      tRef.current += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", height: 180, opacity: 0.65, pointerEvents: "none" }} />;
};

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
const Navbar = ({ page, setPage, savedCount }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { id: "home", label: "Home" },
    { id: "events", label: "Events" },
    { id: "artists", label: "Artists" },
    { id: "venues", label: "Venues" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 64,
      background: scrolled ? "rgba(7,11,20,0.92)" : "rgba(7,11,20,0.6)",
      backdropFilter: "blur(24px) saturate(180%)",
      borderBottom: `1px solid ${scrolled ? G.border2 : G.border}`,
      transition: "all 0.3s",
    }}>
      <div onClick={() => setPage("home")} style={{
        fontSize: 22, fontWeight: 800, letterSpacing: -0.5, cursor: "pointer",
        background: `linear-gradient(135deg,${G.blue},${G.purple})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>Dash</div>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)} style={{
            padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
            fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 600,
            background: page === l.id ? "rgba(79,140,255,0.12)" : "transparent",
            color: page === l.id ? G.blue : G.muted,
            transition: "all 0.2s",
          }}>{l.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
          border: `1px solid ${G.border2}`, borderRadius: 20,
          fontSize: 12, fontWeight: 500, color: G.muted, cursor: "pointer",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: G.blue, boxShadow: `0 0 6px ${G.blue}`, animation: "pulse 2s infinite" }} />
          24 Live Now
        </div>
        {savedCount > 0 && (
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "rgba(155,114,255,0.15)",
            border: `1px solid rgba(155,114,255,0.3)`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 13, cursor: "pointer", color: G.purple,
            position: "relative",
          }}>
            ♥
            <span style={{
              position: "absolute", top: -4, right: -4, width: 16, height: 16,
              borderRadius: "50%", background: G.purple, color: "#fff",
              fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{savedCount}</span>
          </div>
        )}
        <button style={{
          padding: "7px 20px", borderRadius: 8, border: `1px solid ${G.border2}`,
          background: "transparent", color: G.text, fontFamily: "'Syne',sans-serif",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>Sign In</button>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════ */
const HomePage = ({ setPage, setSelectedEvent, saved, toggleSave }) => {
  const [activeFilter, setActiveFilter] = useState("All Events");

  const filtered = EVENTS.filter(e => {
    if (activeFilter === "All Events") return true;
    if (activeFilter === "Tonight") return e.badge === "live";
    if (activeFilter === "This Week") return true;
    if (activeFilter === "Free Entry") return e.price === 0;
    return e.genre.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 48px 100px", overflow: "hidden",
      }}>
        {/* BG */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,60,160,0.38) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 50% at 15% 80%, rgba(79,140,255,0.13) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 85% 70%, rgba(155,114,255,0.11) 0%, transparent 60%),
                        ${G.bg}`,
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(79,140,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,140,255,0.04) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }} />
        {/* Orbs */}
        {[
          { w:500,h:500,top:-100,left:"50%",tx:"-50%", color:"rgba(30,80,220,0.22)", delay:0 },
          { w:300,h:300,top:"auto",bottom:80,left:"8%",  color:"rgba(79,140,255,0.14)", delay:-3 },
          { w:260,h:260,top:"auto",bottom:60,right:"6%", color:"rgba(155,114,255,0.14)", delay:-6 },
        ].map((o,i) => (
          <div key={i} style={{
            position:"absolute", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none",
            width:o.w, height:o.h, top:o.top??undefined, bottom:o.bottom??undefined,
            left:o.left??undefined, right:o.right??undefined,
            transform: o.tx ? `translateX(${o.tx})` : undefined,
            background:`radial-gradient(circle,${o.color},transparent 70%)`,
            animation:`drift ${10+i*2}s ease-in-out infinite alternate`,
          }} />
        ))}
        <WaveCanvas />

        {/* Content */}
        <div style={{ position:"relative", zIndex:10, maxWidth:820 }}>
          <div className="fade-up" style={{
            display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px",
            border:`1px solid rgba(79,140,255,0.25)`, borderRadius:20,
            background:"rgba(79,140,255,0.07)", fontSize:11, fontWeight:500,
            letterSpacing:"1.5px", textTransform:"uppercase", color:G.sky,
            marginBottom:28, fontFamily:"'Geist Mono',monospace",
          }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:G.sky,boxShadow:`0 0 8px ${G.sky}`,animation:"pulse 1.5s infinite" }} />
            Live Events · Music Discovery
          </div>

          <h1 className="fade-up" style={{
            fontSize:"clamp(44px,7vw,82px)", fontWeight:800, lineHeight:1.04,
            letterSpacing:-2, marginBottom:22, animationDelay:"0.1s",
          }}>
            Discover<br />
            <span style={{ background:`linear-gradient(135deg,${G.blue} 0%,${G.purple} 55%,${G.sky} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Music Events
            </span>
          </h1>

          <p className="fade-up" style={{
            fontSize:17, fontWeight:400, color:G.muted, maxWidth:520, margin:"0 auto 40px",
            lineHeight:1.65, animationDelay:"0.2s",
          }}>
            Your portal to the most electric live experiences — Afrobeats nights, jazz sessions, underground raves, and everything in between.
          </p>

          <div className="fade-up" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, animationDelay:"0.3s" }}>
            <button onClick={() => setPage("events")} style={{
              display:"inline-flex", alignItems:"center", gap:8, padding:"13px 32px",
              borderRadius:10, border:"none", cursor:"pointer",
              background:`linear-gradient(135deg,${G.blueDim},${G.blue})`,
              color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
              boxShadow:`0 0 30px rgba(79,140,255,0.35),0 4px 20px rgba(0,0,0,0.4)`,
              transition:"all 0.25s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >
              Join the Movement →
            </button>
            <button onClick={() => document.getElementById("home-events")?.scrollIntoView({behavior:"smooth"})} style={{
              display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px",
              borderRadius:10, border:`1px solid ${G.border2}`, background:"rgba(255,255,255,0.03)",
              color:G.text, fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:600, cursor:"pointer",
              transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(79,140,255,0.4)"; e.currentTarget.style.background="rgba(79,140,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=G.border2; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
            >
              ▶ Browse Events
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up" style={{ display:"flex", justifyContent:"center", gap:40, marginTop:52, animationDelay:"0.4s" }}>
            {[["1,200+","Events monthly"],["340+","Artists"],["80+","Venues"],["14","Cities"]].map(([num,lbl],i) => (
              <div key={i} style={{ textAlign:"center", display:"flex", alignItems:"center", gap: i>0 ? 40 : 0 }}>
                {i > 0 && <div style={{ width:1, height:32, background:G.border, marginRight:40 }} />}
                <div>
                  <div style={{ fontSize:24,fontWeight:800,fontFamily:"'Geist Mono',monospace", background:`linear-gradient(135deg,${G.blue},${G.purple})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{num}</div>
                  <div style={{ fontSize:11,color:G.dim,letterSpacing:1,textTransform:"uppercase",marginTop:2 }}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section id="home-events" style={{ padding:"60px 48px 100px", maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32 }}>
          <div>
            <div style={{ fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.blue,fontFamily:"'Geist Mono',monospace",marginBottom:8,display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ width:20,height:1,background:G.blue,display:"block" }} /> Line-up
            </div>
            <div style={{ fontSize:32,fontWeight:800,letterSpacing:-0.8 }}>Upcoming Events</div>
          </div>
          <button onClick={() => setPage("events")} style={{
            padding:"8px 20px", borderRadius:8, border:`1px solid ${G.border2}`,
            background:"transparent", color:G.muted, fontFamily:"'Syne',sans-serif",
            fontSize:13, fontWeight:600, cursor:"pointer",
          }}>View all 148 →</button>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:6, marginBottom:32, overflowX:"auto", paddingBottom:4 }}>
          {GENRES.map(g => (
            <button key={g} onClick={() => setActiveFilter(g)} style={{
              padding:"7px 16px", borderRadius:20, border:`1px solid ${activeFilter===g ? G.blue : G.border}`,
              background: activeFilter===g ? "rgba(79,140,255,0.1)" : "transparent",
              color: activeFilter===g ? G.blue : G.muted,
              fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:600,
              cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s",
            }}>{g}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map((ev, i) => (
            <EventCard key={ev.id} event={ev} delay={i*0.06} saved={saved} toggleSave={toggleSave}
              onClick={() => { setSelectedEvent(ev); setPage("detail"); }} />
          ))}
        </div>

        {/* Category grid */}
        <div style={{ marginTop:60 }}>
          <div style={{ fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.blue,fontFamily:"'Geist Mono',monospace",marginBottom:20,display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ width:20,height:1,background:G.blue,display:"block" }} /> Browse by Genre
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
            {[["🔥","Afrobeats"],["🌀","Amapiano"],["🎷","Jazz"],["🎵","Highlife"],["⚡","Electronic"],["🎤","Hip-Hop"]].map(([icon,lbl]) => (
              <div key={lbl} onClick={() => { setActiveFilter(lbl); document.getElementById("home-events")?.scrollIntoView({behavior:"smooth"}); }} style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:8, padding:"20px 10px", border:`1px solid ${G.border}`, borderRadius:10,
                background:G.surface, cursor:"pointer", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(79,140,255,0.35)"; e.currentTarget.style.background="rgba(79,140,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=G.border; e.currentTarget.style.background=G.surface; }}
              >
                <span style={{ fontSize:22 }}>{icon}</span>
                <span style={{ fontSize:11,fontWeight:700,color:G.muted }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   EVENT CARD (shared)
═══════════════════════════════════════════════ */
const EventCard = ({ event: ev, delay=0, saved, toggleSave, onClick }) => {
  const isSaved = saved.includes(ev.id);
  const pct = Math.round((ev.attending / ev.capacity) * 100);
  return (
    <div className="fade-up" onClick={onClick} style={{
      display:"grid", gridTemplateColumns:"220px 1fr auto", border:`1px solid ${G.border}`,
      borderRadius:14, background:G.surface, overflow:"hidden", cursor:"pointer",
      transition:"all 0.25s", animationDelay:`${delay}s`, position:"relative",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(79,140,255,0.32)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,0.4),0 0 0 1px rgba(79,140,255,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=G.border; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
    >
      {/* Left accent bar */}
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${G.blue},${G.purple})`,opacity:0,transition:"opacity 0.25s" }}
        onMouseEnter={e => e.currentTarget.style.opacity=1} />

      {/* Image */}
      <div style={{ position:"relative", overflow:"hidden", background:G.surface2, flexShrink:0 }}>
        <img src={ev.img} alt={ev.title} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",transition:"transform 0.4s",position:"absolute",top:0,left:0 }}
          onError={e => { e.target.style.display="none"; }}
        />
        <div style={{ position:"absolute",top:10,left:10,zIndex:2 }}><Badge type={ev.badge} label={ev.badgeLabel} /></div>
      </div>

      {/* Body */}
      <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", justifyContent:"center", gap:9 }}>
        <div style={{ fontSize:10,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:G.purple,fontFamily:"'Geist Mono',monospace" }}>
          {ev.genreEmoji} {ev.genre}
        </div>
        <div style={{ fontSize:18,fontWeight:800,letterSpacing:-0.3,color:G.text,lineHeight:1.2 }}>{ev.title}</div>
        <div style={{ fontSize:13,color:G.muted,lineHeight:1.55,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{ev.description}</div>
        <div style={{ display:"flex",alignItems:"center",gap:18,flexWrap:"wrap" }}>
          {[["📅",ev.date],["🕘",ev.time],["📍",ev.city],["🏟",ev.venue]].map(([icon,val]) => (
            <div key={val} style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:G.muted,fontWeight:500 }}>
              <span style={{ opacity:0.7 }}>{icon}</span>{val}
            </div>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ display:"flex" }}>
            {["ma-1","ma-2","ma-3"].map((c,i) => (
              <div key={c} style={{ width:20,height:20,borderRadius:"50%",border:`1.5px solid ${G.surface}`,marginLeft:i?-6:0,background:i===0?`linear-gradient(135deg,${G.blue},${G.purple})`:i===1?`linear-gradient(135deg,${G.purple},#ff4d9b)`:`linear-gradient(135deg,#00c864,#00a8ff)` }} />
            ))}
          </div>
          <span style={{ fontSize:10,color:G.dim,fontWeight:500 }}>{ev.attending.toLocaleString()} attending</span>
          <div style={{ flex:1,maxWidth:100 }}><ProgressBar value={ev.attending} max={ev.capacity} /></div>
          <span style={{ fontSize:10,color:G.dim }}>{Math.round(ev.attending/ev.capacity*100)}% full</span>
        </div>
      </div>

      {/* Right */}
      <div onClick={e=>e.stopPropagation()} style={{ padding:"20px 24px",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"space-between",minWidth:160,borderLeft:`1px solid ${G.border}` }}>
        <div>
          <div style={{ fontSize:22,fontWeight:800,letterSpacing:-0.5,fontFamily:"'Geist Mono',monospace",background:ev.price===0?`linear-gradient(135deg,#00c864,#00a8ff)`:`linear-gradient(135deg,${G.blue},${G.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
            {ev.price===0 ? "Free" : `${ev.currency}${ev.price.toLocaleString()}`}
          </div>
          <div style={{ fontSize:10,color:G.dim,marginTop:2,textAlign:"right" }}>
            {ev.price===0 ? "Open to all" : "General Admission"}
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end" }}>
          <button onClick={(e)=>{e.stopPropagation(); onClick();}} style={{
            display:"inline-flex",alignItems:"center",gap:6,padding:"8px 18px",
            borderRadius:8,border:`1px solid ${G.border2}`,background:"rgba(79,140,255,0.07)",
            color:G.blue,fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,
            cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(79,140,255,0.16)";e.currentTarget.style.borderColor=G.blue;}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(79,140,255,0.07)";e.currentTarget.style.borderColor=G.border2;}}
          >View Details →</button>
          <button onClick={(e)=>{e.stopPropagation();toggleSave(ev.id);}} style={{
            display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",
            borderRadius:6,border:`1px solid ${isSaved?"rgba(155,114,255,0.4)":G.border}`,
            background:isSaved?"rgba(155,114,255,0.08)":"transparent",
            color:isSaved?G.purple:G.dim,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
          }}>
            {isSaved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   EVENTS PAGE
═══════════════════════════════════════════════ */
const EventsPage = ({ setPage, setSelectedEvent, saved, toggleSave }) => {
  const [filter, setFilter] = useState("All Events");
  const [search, setSearch] = useState("");
  const filtered = EVENTS.filter(e => {
    const matchFilter = filter==="All Events" || (filter==="Tonight"&&e.badge==="live") || (filter==="Free Entry"&&e.price===0) || e.genre.toLowerCase().includes(filter.toLowerCase());
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.artist.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });
  return (
    <div style={{ paddingTop:80, maxWidth:1280, margin:"0 auto", padding:"100px 48px 100px" }}>
      <div className="fade-up" style={{ marginBottom:40 }}>
        <div style={{ fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.blue,fontFamily:"'Geist Mono',monospace",marginBottom:10,display:"flex",alignItems:"center",gap:8 }}>
          <span style={{ width:20,height:1,background:G.blue,display:"block" }} /> All Events
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16 }}>
          <h1 style={{ fontSize:40,fontWeight:800,letterSpacing:-1 }}>Browse Events</h1>
          <div style={{ display:"flex",alignItems:"center",gap:10,border:`1px solid ${G.border2}`,borderRadius:10,padding:"10px 18px",background:G.surface,flex:"0 0 320px" }}>
            <span style={{ color:G.muted,fontSize:15 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search artist, event, venue…" style={{
              background:"none",border:"none",outline:"none",color:G.text,
              fontFamily:"'Syne',sans-serif",fontSize:13,flex:1,
            }} />
          </div>
        </div>
      </div>

      <div style={{ display:"flex",gap:6,marginBottom:28,overflowX:"auto",paddingBottom:4 }}>
        {GENRES.map(g => (
          <button key={g} onClick={()=>setFilter(g)} style={{
            padding:"7px 16px",borderRadius:20,border:`1px solid ${filter===g?G.blue:G.border}`,
            background:filter===g?"rgba(79,140,255,0.1)":"transparent",
            color:filter===g?G.blue:G.muted,fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",
          }}>{g}</button>
        ))}
      </div>

      <div style={{ fontSize:12,color:G.muted,marginBottom:20,fontFamily:"'Geist Mono',monospace" }}>
        Showing {filtered.length} of {EVENTS.length} events
      </div>

      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {filtered.length ? filtered.map((ev,i) => (
          <EventCard key={ev.id} event={ev} delay={i*0.05} saved={saved} toggleSave={toggleSave}
            onClick={()=>{setSelectedEvent(ev);setPage("detail");}} />
        )) : (
          <div style={{ textAlign:"center",padding:"80px 0",color:G.muted }}>
            <div style={{ fontSize:40,marginBottom:12 }}>🎵</div>
            <div style={{ fontSize:18,fontWeight:700,marginBottom:8 }}>No events found</div>
            <div style={{ fontSize:14 }}>Try a different filter or search term</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   EVENT DETAIL PAGE
═══════════════════════════════════════════════ */
const EventDetailPage = ({ event: ev, setPage, saved, toggleSave }) => {
  const [ticketType, setTicketType] = useState("general");
  const [qty, setQty] = useState(1);
  const isSaved = saved.includes(ev.id);
  const price = ticketType==="vip" ? ev.vipPrice : ev.price;
  const total = price * qty;
  const pct = Math.round(ev.attending/ev.capacity*100);

  return (
    <div style={{ paddingTop:64 }}>
      {/* Hero image banner */}
      <div style={{ position:"relative", height:420, overflow:"hidden" }}>
        <img src={ev.img} alt={ev.title} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(7,11,20,0.3) 0%, rgba(7,11,20,0.85) 100%)" }} />
        <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"40px 64px" }}>
          <button onClick={()=>setPage("events")} style={{ display:"flex",alignItems:"center",gap:6,color:G.muted,background:"none",border:"none",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:600,marginBottom:16 }}>
            ← Back to Events
          </button>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
            <Badge type={ev.badge} label={ev.badgeLabel} />
            <span style={{ fontSize:11,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",color:G.purple,fontFamily:"'Geist Mono',monospace" }}>{ev.genreEmoji} {ev.genre}</span>
          </div>
          <h1 style={{ fontSize:"clamp(28px,4vw,52px)",fontWeight:800,letterSpacing:-1,lineHeight:1.1,marginBottom:12 }}>{ev.title}</h1>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
            {[["📅",ev.date],["🕘",ev.time],["📍",ev.city],["🏟",ev.venue]].map(([icon,val])=>(
              <span key={val} style={{ fontSize:13,color:"rgba(232,237,248,0.75)",display:"flex",alignItems:"center",gap:5 }}><span>{icon}</span>{val}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"48px 64px 100px",display:"grid",gridTemplateColumns:"1fr 360px",gap:48,alignItems:"start" }}>
        {/* Left */}
        <div>
          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:20,fontWeight:800,marginBottom:16,letterSpacing:-0.3 }}>About this event</h2>
            <p style={{ fontSize:15,color:G.muted,lineHeight:1.75 }}>{ev.longDesc}</p>
          </section>

          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:20,fontWeight:800,marginBottom:16,letterSpacing:-0.3 }}>Event Details</h2>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              {[
                ["Date",ev.date],["Time",ev.time],["City",ev.city],["Venue",ev.venue],
                ["Capacity",ev.capacity.toLocaleString()+" guests"],["Attending",ev.attending.toLocaleString()+" confirmed"],
              ].map(([k,v])=>(
                <div key={k} style={{ padding:"16px 20px",border:`1px solid ${G.border}`,borderRadius:10,background:G.surface }}>
                  <div style={{ fontSize:10,color:G.dim,letterSpacing:1,textTransform:"uppercase",fontFamily:"'Geist Mono',monospace",marginBottom:6 }}>{k}</div>
                  <div style={{ fontSize:14,fontWeight:600,color:G.text }}>{v}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:20,fontWeight:800,marginBottom:16,letterSpacing:-0.3 }}>Tags</h2>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {ev.tags.map(t=><Tag key={t} label={t} />)}
            </div>
          </section>

          {/* Attendance bar */}
          <section>
            <h2 style={{ fontSize:20,fontWeight:800,marginBottom:16,letterSpacing:-0.3 }}>Attendance</h2>
            <div style={{ padding:"20px 24px",border:`1px solid ${G.border}`,borderRadius:12,background:G.surface }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
                <span style={{ fontSize:13,color:G.muted }}>{ev.attending.toLocaleString()} attending</span>
                <span style={{ fontSize:13,color:pct>90?"#ff6432":pct>70?G.purple:G.blue,fontWeight:700 }}>{pct}% capacity</span>
              </div>
              <ProgressBar value={ev.attending} max={ev.capacity} />
              <div style={{ fontSize:11,color:G.dim,marginTop:10 }}>{(ev.capacity-ev.attending).toLocaleString()} spots remaining</div>
            </div>
          </section>
        </div>

        {/* Right — Ticket Widget */}
        <div style={{ position:"sticky",top:84 }}>
          <div style={{ border:`1px solid ${G.border2}`,borderRadius:16,background:G.surface,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ padding:"24px 24px 0",borderBottom:`1px solid ${G.border}`,paddingBottom:20 }}>
              <div style={{ fontSize:12,color:G.dim,letterSpacing:1,textTransform:"uppercase",fontFamily:"'Geist Mono',monospace",marginBottom:8 }}>Get Tickets</div>
              <div style={{ fontSize:28,fontWeight:800,fontFamily:"'Geist Mono',monospace", background:ev.price===0?`linear-gradient(135deg,#00c864,#00a8ff)`:`linear-gradient(135deg,${G.blue},${G.purple})`, WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                {ev.price===0?"Free":`${ev.currency}${price.toLocaleString()}`}
              </div>
              {ev.price > 0 && <div style={{ fontSize:11,color:G.dim,marginTop:2 }}>per ticket</div>}
            </div>

            <div style={{ padding:24 }}>
              {ev.price > 0 && (
                <>
                  <div style={{ fontSize:11,color:G.dim,letterSpacing:1,textTransform:"uppercase",fontFamily:"'Geist Mono',monospace",marginBottom:10 }}>Ticket Type</div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20 }}>
                    {[["general","General",ev.price],["vip","VIP",ev.vipPrice]].map(([val,lbl,p])=>(
                      <button key={val} onClick={()=>setTicketType(val)} style={{
                        padding:"10px 0",borderRadius:8,border:`1px solid ${ticketType===val?G.blue:G.border}`,
                        background:ticketType===val?"rgba(79,140,255,0.1)":"transparent",
                        color:ticketType===val?G.blue:G.muted,fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s",
                      }}>
                        <div>{lbl}</div>
                        <div style={{ fontSize:11,marginTop:2 }}>{ev.currency}{p.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize:11,color:G.dim,letterSpacing:1,textTransform:"uppercase",fontFamily:"'Geist Mono',monospace",marginBottom:10 }}>Quantity</div>
                  <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
                    {[-1,1].map(d=>(
                      <button key={d} onClick={()=>setQty(q=>Math.max(1,Math.min(10,q+d)))} style={{
                        width:36,height:36,borderRadius:8,border:`1px solid ${G.border2}`,background:"transparent",
                        color:G.text,fontSize:18,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:600,
                      }}>{d>0?"+":"−"}</button>
                    ))}
                    <span style={{ fontFamily:"'Geist Mono',monospace",fontSize:18,fontWeight:700,flex:1,textAlign:"center" }}>{qty}</span>
                  </div>

                  <div style={{ display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:`1px solid ${G.border}`,marginBottom:20 }}>
                    <span style={{ fontSize:13,color:G.muted }}>Total</span>
                    <span style={{ fontSize:18,fontWeight:800,fontFamily:"'Geist Mono',monospace",color:G.blue }}>{ev.currency}{total.toLocaleString()}</span>
                  </div>
                </>
              )}

              <button style={{
                width:"100%",padding:"14px 0",borderRadius:10,border:"none",cursor:"pointer",
                background:ev.price===0?`linear-gradient(135deg,#00c864,#00a8ff)`:`linear-gradient(135deg,${G.blueDim},${G.blue})`,
                color:"#fff",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,
                boxShadow:`0 0 30px rgba(79,140,255,0.3)`,transition:"all 0.2s",marginBottom:12,
              }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >{ev.price===0?"Register for Free →":"Buy Tickets →"}</button>

              <button onClick={()=>toggleSave(ev.id)} style={{
                width:"100%",padding:"10px 0",borderRadius:10,cursor:"pointer",
                border:`1px solid ${isSaved?"rgba(155,114,255,0.4)":G.border}`,
                background:isSaved?"rgba(155,114,255,0.08)":"transparent",
                color:isSaved?G.purple:G.muted,fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:600,transition:"all 0.2s",
              }}>{isSaved?"♥ Saved to your list":"♡ Save Event"}</button>
            </div>
          </div>

          {/* Share */}
          <div style={{ marginTop:16,padding:"16px 20px",border:`1px solid ${G.border}`,borderRadius:12,background:G.surface,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:13,color:G.muted,fontWeight:600 }}>Share this event</span>
            <div style={{ display:"flex",gap:8 }}>
              {["𝕏","in","📋"].map(s=>(
                <button key={s} style={{ width:32,height:32,borderRadius:6,border:`1px solid ${G.border}`,background:"transparent",color:G.muted,fontSize:13,cursor:"pointer" }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ARTISTS PAGE
═══════════════════════════════════════════════ */
const ArtistsPage = () => (
  <div style={{ paddingTop:64,maxWidth:1280,margin:"0 auto",padding:"100px 48px" }}>
    <div className="fade-up" style={{ marginBottom:40 }}>
      <div style={{ fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.blue,fontFamily:"'Geist Mono',monospace",marginBottom:10,display:"flex",alignItems:"center",gap:8 }}>
        <span style={{ width:20,height:1,background:G.blue,display:"block" }} /> Performing Artists
      </div>
      <h1 style={{ fontSize:40,fontWeight:800,letterSpacing:-1 }}>Artists</h1>
    </div>
    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
      {ARTISTS.map((a,i)=>(
        <div key={a.id} className="fade-up" style={{ border:`1px solid ${G.border}`,borderRadius:14,overflow:"hidden",background:G.surface,cursor:"pointer",transition:"all 0.25s",animationDelay:`${i*0.07}s` }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(79,140,255,0.35)";e.currentTarget.style.transform="translateY(-3px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.transform="translateY(0)";}}
        >
          <div style={{ height:200,overflow:"hidden",position:"relative" }}>
            <img src={a.img} alt={a.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s" }}
              onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.target.style.transform="scale(1)"}
            />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,11,20,0.8) 0%,transparent 60%)" }} />
          </div>
          <div style={{ padding:"20px 24px" }}>
            <div style={{ fontSize:20,fontWeight:800,letterSpacing:-0.3,marginBottom:4 }}>{a.name}</div>
            <div style={{ fontSize:12,color:G.purple,fontWeight:600,marginBottom:12,letterSpacing:"0.5px" }}>{a.genre}</div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span style={{ fontSize:11,color:G.muted }}>{a.followers} followers</span>
              <span style={{ fontSize:11,color:G.blue,fontWeight:600 }}>{a.events} upcoming event{a.events>1?"s":""}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   VENUES PAGE
═══════════════════════════════════════════════ */
const VenuesPage = () => (
  <div style={{ paddingTop:64,maxWidth:1280,margin:"0 auto",padding:"100px 48px" }}>
    <div className="fade-up" style={{ marginBottom:40 }}>
      <div style={{ fontSize:10,fontWeight:500,letterSpacing:"2.5px",textTransform:"uppercase",color:G.blue,fontFamily:"'Geist Mono',monospace",marginBottom:10,display:"flex",alignItems:"center",gap:8 }}>
        <span style={{ width:20,height:1,background:G.blue,display:"block" }} /> Event Venues
      </div>
      <h1 style={{ fontSize:40,fontWeight:800,letterSpacing:-1 }}>Venues</h1>
    </div>
    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
      {VENUES.map((v,i)=>(
        <div key={v.id} className="fade-up" style={{ border:`1px solid ${G.border}`,borderRadius:14,overflow:"hidden",background:G.surface,cursor:"pointer",transition:"all 0.25s",animationDelay:`${i*0.07}s` }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(79,140,255,0.35)";e.currentTarget.style.transform="translateY(-3px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.transform="translateY(0)";}}
        >
          <div style={{ height:180,overflow:"hidden",position:"relative" }}>
            <img src={v.img} alt={v.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s" }}
              onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.target.style.transform="scale(1)"}
            />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,11,20,0.75) 0%,transparent 60%)" }} />
            <div style={{ position:"absolute",bottom:10,left:14 }}>
              <span style={{ fontSize:9,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"'Geist Mono',monospace",padding:"3px 8px",borderRadius:4,background:"rgba(79,140,255,0.8)",color:"#fff" }}>{v.type}</span>
            </div>
          </div>
          <div style={{ padding:"20px 24px" }}>
            <div style={{ fontSize:18,fontWeight:800,letterSpacing:-0.3,marginBottom:4 }}>{v.name}</div>
            <div style={{ fontSize:12,color:G.muted,marginBottom:14,display:"flex",alignItems:"center",gap:5 }}><span>📍</span>{v.city}</div>
            <div style={{ display:"flex",justifyContent:"space-between",paddingTop:14,borderTop:`1px solid ${G.border}` }}>
              <span style={{ fontSize:12,color:G.muted }}>Cap. <strong style={{ color:G.text }}>{v.cap.toLocaleString()}</strong></span>
              <span style={{ fontSize:12,color:G.blue,fontWeight:600 }}>{v.events} event{v.events>1?"s":""} listed</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saved, setSaved] = useState([]);

  const toggleSave = useCallback(id => {
    setSaved(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id]);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({top:0,behavior:"smooth"}); }, [page]);

  return (
    <>
      <style>{css}</style>
      <Navbar page={page} setPage={p=>{setPage(p);}} savedCount={saved.length} />
      <div className="scale-in" key={page}>
        {page==="home"    && <HomePage setPage={setPage} setSelectedEvent={setSelectedEvent} saved={saved} toggleSave={toggleSave} />}
        {page==="events"  && <EventsPage setPage={setPage} setSelectedEvent={setSelectedEvent} saved={saved} toggleSave={toggleSave} />}
        {page==="detail"  && selectedEvent && <EventDetailPage event={selectedEvent} setPage={setPage} saved={saved} toggleSave={toggleSave} />}
        {page==="artists" && <ArtistsPage />}
        {page==="venues"  && <VenuesPage />}
      </div>
    </>
  );
}
