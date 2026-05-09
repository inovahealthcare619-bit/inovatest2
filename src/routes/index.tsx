import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INOVA Health Care — Tibbi Konfrans Platforması" },
      {
        name: "description",
        content:
          "Bakıda 2014-dən bəri fəaliyyət göstərən tibbi konfrans platforması. Ginekologiya, endokrinologiya və onkologiya üzrə beynəlxalq konfranslar.",
      },
      { property: "og:title", content: "INOVA Health Care" },
      {
        property: "og:description",
        content: "Elm ilə praktikanın kəsişmə nöqtəsi — tibbi konfrans platforması.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cv = document.getElementById("bg-canvas") as HTMLCanvasElement | null;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, mx = -999, my = -999;
    const pts: P[] = [];

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    resize();

    class P {
      x = 0; y = 0; rad = 0; a = 0; vx = 0; vy = 0;
      constructor() { this.init(true); }
      init(r: boolean) {
        this.x = Math.random() * W;
        this.y = r ? Math.random() * H : H + 10;
        this.rad = Math.random() * 1.4 + 0.3;
        this.a = Math.random() * 0.35 + 0.05;
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = -(Math.random() * 0.38 + 0.08);
      }
      tick() {
        this.x += this.vx;
        this.y += this.vy;
        const dx = this.x - mx, dy = this.y - (my - window.scrollY), d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) { const f = ((90 - d) / 90) * 0.25; this.vx += (dx / d) * f; this.vy += (dy / d) * f; }
        this.vx *= 0.99;
        this.vy = Math.max(this.vy, -0.7);
        if (this.y < -10) this.init(false);
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,184,232,${this.a})`;
        ctx.fill();
      }
    }

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY + window.scrollY; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    for (let i = 0; i < 90; i++) pts.push(new P());

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(91,184,232,${(1 - d / 130) * 0.05})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      pts.forEach((p) => { p.tick(); p.draw(); });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Reveal
    const revs = document.querySelectorAll(".mcard,.scard,.fmt-row,.ev-card");
    const revObs = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 },
    );
    revs.forEach((el, i) => {
      const h = el as HTMLElement;
      h.style.opacity = "0";
      h.style.transform = "translateY(18px)";
      h.style.transition = `opacity .55s ${i * 0.06}s ease, transform .55s ${i * 0.06}s ease`;
      revObs.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      revObs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
.inova{--ink:#071828;--navy:#0c2340;--blue:#185fa5;--sky:#5bb8e8;--sky2:#b8dff5;--cream:#f4f1ec;font-family:'DM Sans',sans-serif;background:var(--ink);color:#fff;overflow-x:hidden;min-height:100vh;}
.inova *{box-sizing:border-box;}
.inova a{color:inherit;}
.inova h1,.inova h2,.inova p,.inova ul{margin:0;padding:0;}
.inova ul{list-style:none;}
html{scroll-behavior:smooth;}
#bg-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;}
.inova nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;justify-content:space-between;align-items:center;padding:0 5%;height:68px;background:rgba(7,24,40,0.75);backdrop-filter:blur(18px);border-bottom:1px solid rgba(91,184,232,0.1);}
.nlogo{display:flex;align-items:center;gap:10px;}
.nlogo img{height:36px;display:block;border-radius:6px;background:#fff;padding:3px 6px;}
.nlogo-text{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#fff;letter-spacing:0.5px;}
.nlinks{display:flex;gap:28px;}
.nlinks a{font-size:13px;color:rgba(255,255,255,0.45);text-decoration:none;transition:color .2s;}
.nlinks a:hover{color:var(--sky);}
.ncta{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:9px 22px;background:var(--sky);color:var(--ink);border-radius:4px;text-decoration:none;transition:all .2s;}
.ncta:hover{background:#7dd3f0;}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
.hamburger span{display:block;width:22px;height:2px;background:rgba(255,255,255,0.6);border-radius:2px;}
.mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(7,24,40,0.97);backdrop-filter:blur(20px);z-index:199;flex-direction:column;padding:24px 5%;border-bottom:1px solid rgba(91,184,232,0.1);}
.mobile-menu.open{display:flex;}
.mobile-menu a{font-size:15px;color:rgba(255,255,255,0.6);text-decoration:none;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.mobile-menu .m-cta{margin-top:16px;background:var(--sky);color:var(--ink);text-align:center;border-radius:6px;font-weight:700;padding:14px;}
.hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:120px 5% 80px;overflow:hidden;}
.hero-bg{position:absolute;inset:0;z-index:0;}
.hero-bg-img{width:100%;height:100%;object-fit:cover;filter:brightness(0.55) saturate(0.5);}
.hero-bg-grad{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(7,24,40,0.3) 0%,rgba(7,24,40,0.05) 40%,rgba(7,24,40,0.6) 85%,rgba(7,24,40,1) 100%);}
.hero-content{position:relative;z-index:2;}
.hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(91,184,232,0.12);border:1px solid rgba(91,184,232,0.28);border-radius:30px;padding:6px 18px;font-size:11px;color:var(--sky);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:32px;animation:fadeUp .8s ease both;}
.pulse{width:7px;height:7px;background:var(--sky);border-radius:50%;animation:pulseAnim 2s infinite;}
@keyframes pulseAnim{0%,100%{box-shadow:0 0 0 0 rgba(91,184,232,.5);}50%{box-shadow:0 0 0 7px rgba(91,184,232,0);}}
.hero h1{font-family:'Instrument Serif',serif;font-size:clamp(40px,6.5vw,84px);line-height:1.05;margin-bottom:24px;animation:fadeUp .9s .1s ease both;}
.hero h1 .l1{display:block;color:#fff;}
.hero h1 .l2{display:block;color:var(--sky);font-style:italic;}
.hero h1 .l3{display:block;color:rgba(255,255,255,0.28);font-size:.6em;}
.hero-sub{font-size:15px;color:rgba(255,255,255,.5);line-height:1.85;max-width:500px;margin:0 auto 44px;animation:fadeUp 1s .2s ease both;}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;animation:fadeUp 1s .3s ease both;}
.btn-glow{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;padding:14px 30px;background:var(--sky);color:var(--ink);border-radius:5px;text-decoration:none;transition:all .25s;position:relative;overflow:hidden;display:inline-block;}
.btn-glow:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(91,184,232,.35);}
.scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.18);}
.scroll-line{width:1px;height:36px;background:linear-gradient(to bottom,rgba(91,184,232,.5),transparent);animation:sline 2s infinite;}
@keyframes sline{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform:scaleY(1);transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
.ticker{position:relative;z-index:1;overflow:hidden;background:var(--sky);padding:12px 0;}
.ticker-track{display:flex;white-space:nowrap;animation:tkr 22s linear infinite;}
.ticker-item{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--ink);padding:0 32px;display:flex;align-items:center;gap:10px;}
.ticker-dot{width:4px;height:4px;background:rgba(7,24,40,.3);border-radius:50%;display:inline-block;}
@keyframes tkr{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.mission{position:relative;z-index:1;padding:110px 5%;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;max-width:1160px;margin:0 auto;}
.tag{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:18px;}
.mission h2{font-family:'Instrument Serif',serif;font-size:clamp(30px,3.5vw,46px);line-height:1.2;margin-bottom:22px;color:#fff;}
.mission h2 em{color:var(--sky);font-style:italic;}
.mission p{font-size:14px;line-height:1.9;color:rgba(255,255,255,.38);}
.mcards{display:flex;flex-direction:column;gap:1px;background:rgba(255,255,255,.06);border-radius:12px;overflow:hidden;}
.mcard{background:var(--navy);padding:26px 30px;transition:all .25s;border-left:2px solid transparent;}
.mcard:hover{background:#112840;border-left-color:var(--sky);padding-left:38px;}
.mcard-t{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:5px;}
.mcard-d{font-size:12px;color:rgba(255,255,255,.32);line-height:1.6;}
.events-section{position:relative;z-index:1;padding:0 5% 110px;}
.sec-hd{text-align:center;margin-bottom:52px;}
.sec-tag{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--sky);margin-bottom:14px;}
.sec-h{font-family:'Instrument Serif',serif;font-size:clamp(28px,3.5vw,46px);color:#fff;line-height:1.2;}
.sec-h em{color:var(--sky);font-style:italic;}
.events-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:860px;margin:0 auto;}
.ev-card{background:var(--navy);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.06);transition:all .3s;display:flex;flex-direction:column;}
.ev-card:hover{transform:translateY(-5px);border-color:rgba(91,184,232,.25);box-shadow:0 20px 40px rgba(0,0,0,.3);}
.ev-top{padding:28px 28px 20px;flex:1;}
.ev-badge{display:inline-block;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:16px;}
.ev-badge.upcoming{background:rgba(91,184,232,.15);color:var(--sky);}
.ev-badge.past{background:rgba(255,255,255,.07);color:rgba(255,255,255,.35);}
.ev-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.35;}
.ev-desc{font-size:12px;color:rgba(255,255,255,.32);line-height:1.65;}
.ev-bottom{padding:16px 28px 22px;border-top:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center;}
.ev-date{font-size:11px;color:rgba(255,255,255,.3);display:flex;align-items:center;gap:6px;}
.ev-date-dot{width:5px;height:5px;background:var(--sky);border-radius:50%;opacity:.5;}
.ev-link{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:var(--sky);text-decoration:none;letter-spacing:.5px;}
.spec-section{position:relative;z-index:1;padding:0 5% 110px;}
.spec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(255,255,255,.04);border-radius:16px;overflow:hidden;max-width:1100px;margin:0 auto;}
.scard{background:var(--navy);padding:44px 32px;position:relative;overflow:hidden;transition:all .3s;}
.scard:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.3);}
.scard-num{font-family:'Instrument Serif',serif;font-size:60px;font-style:italic;color:rgba(91,184,232,.08);line-height:1;margin-bottom:18px;}
.scard:hover .scard-num{color:rgba(91,184,232,.18);}
.scard-bar{width:28px;height:2px;background:var(--sky);margin-bottom:18px;transition:width .3s;}
.scard:hover .scard-bar{width:52px;}
.scard-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:10px;}
.scard-text{font-size:13px;color:rgba(255,255,255,.33);line-height:1.75;}
.fmt-section{position:relative;z-index:1;padding:0 5% 110px;max-width:1100px;margin:0 auto;}
.fmt-list{border-top:1px solid rgba(255,255,255,.07);}
.fmt-row{display:grid;grid-template-columns:56px 200px 1fr 50px;align-items:center;gap:28px;padding:26px 0;border-bottom:1px solid rgba(255,255,255,.07);transition:all .25s;}
.fmt-row:hover{padding-left:14px;background:rgba(91,184,232,.03);border-radius:6px;}
.fmt-n{font-family:'Instrument Serif',serif;font-size:30px;font-style:italic;color:rgba(91,184,232,.18);}
.fmt-row:hover .fmt-n{color:rgba(91,184,232,.45);}
.fmt-t{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#fff;}
.fmt-d{font-size:13px;color:rgba(255,255,255,.32);line-height:1.65;}
.fmt-arr{font-size:16px;color:rgba(91,184,232,.2);text-align:right;transition:all .25s;}
.fmt-row:hover .fmt-arr{color:var(--sky);transform:translateX(4px);}
.inova footer{position:relative;z-index:1;background:#040d16;padding:56px 5% 28px;border-top:1px solid rgba(255,255,255,.04);}
.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:56px;margin-bottom:40px;max-width:1100px;margin-left:auto;margin-right:auto;}
.ft-logo img{height:32px;display:block;margin-bottom:16px;border-radius:6px;background:#fff;padding:3px 6px;}
.ft-desc{font-size:13px;color:rgba(255,255,255,.25);line-height:1.8;max-width:260px;}
.ft-h{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.18);margin-bottom:16px;}
.ft-ul{display:flex;flex-direction:column;gap:10px;}
.ft-ul li,.ft-ul a{font-size:13px;color:rgba(255,255,255,.32);text-decoration:none;}
.ft-ul a:hover{color:var(--sky);}
.ft-bot{max-width:1100px;margin:0 auto;border-top:1px solid rgba(255,255,255,.04);padding-top:22px;display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.14);flex-wrap:wrap;gap:8px;}
.ft-bot a{color:var(--sky);text-decoration:none;font-family:'Syne',sans-serif;font-weight:700;}
@media(max-width:768px){
  .nlinks,.ncta{display:none;}
  .hamburger{display:flex;}
  .mission{grid-template-columns:1fr;gap:40px;padding:70px 5%;}
  .events-grid,.spec-grid{grid-template-columns:1fr;}
  .fmt-row{grid-template-columns:40px 1fr;gap:14px;}
  .fmt-d,.fmt-arr{display:none;}
  .ft-grid{grid-template-columns:1fr;gap:36px;}
  .ft-bot{flex-direction:column;align-items:center;text-align:center;}
}
@media(max-width:480px){
  .hero h1{font-size:38px;}
  .hero-btns{flex-direction:column;align-items:stretch;}
  .btn-glow{width:100%;text-align:center;}
}
      `}</style>

      <div className="inova">
        <canvas id="bg-canvas" />

        <nav>
          <div className="nlogo">
            <img src={logo} alt="INOVA Health Care" />
            <span className="nlogo-text">INOVA Health Care</span>
          </div>
          <ul className="nlinks">
            <li><a href="#miss">Missiya</a></li>
            <li><a href="#events">Konfranslar</a></li>
            <li><a href="#spec">İxtisaslar</a></li>
            <li><a href="#fmt">Format</a></li>
          </ul>
          <a href="tel:+994102395356" className="ncta">Əlaqə</a>
          <div className="hamburger" onClick={() => setMenuOpen((o) => !o)}>
            <span /><span /><span />
          </div>
        </nav>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#miss" onClick={() => setMenuOpen(false)}>Missiya</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>Konfranslar</a>
          <a href="#spec" onClick={() => setMenuOpen(false)}>İxtisaslar</a>
          <a href="#fmt" onClick={() => setMenuOpen(false)}>Format</a>
          <a href="tel:+994102395356" className="m-cta" onClick={() => setMenuOpen(false)}>
            Əlaqə: +994 10 239 53 56
          </a>
        </div>

        <section className="hero">
          <div className="hero-bg">
            <img
              className="hero-bg-img"
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80&fit=crop"
              alt="Tibbi konfrans"
            />
            <div className="hero-bg-grad" />
          </div>
          <div className="hero-content">
            <div className="hero-chip">
              <div className="pulse" />INOVA Health Care · Bakı · 2014
            </div>
            <h1>
              <span className="l1">Tibbi Bilikləri</span>
              <span className="l2">Birləşdiririk</span>
              <span className="l3">— Elm · Praktika · İnkişaf</span>
            </h1>
            <p className="hero-sub">
              Elmi araşdırmalar ilə klinik praktikanı inteqrasiya edən, mütəxəssislər üçün davamlı inkişaf mühiti yaradan tibbi konfrans platforması.
            </p>
            <div className="hero-btns">
              <a href="#events" className="btn-glow">Konfranslara Bax →</a>
            </div>
          </div>
          <div className="scroll-hint"><div className="scroll-line" />Scroll</div>
        </section>

        <div className="ticker">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, k) =>
              ["Ginekologiya", "Endokrinologiya", "Onkologiya", "Beynəlxalq Spikerlər", "Panel Müzakirələri", "Klinik Hallar", "Qlobal Yeniliklər"].map((t, i) => (
                <span key={`${k}-${i}`} className="ticker-item">
                  {t}<span className="ticker-dot" />
                </span>
              )),
            )}
          </div>
        </div>

        <section className="mission" id="miss">
          <div>
            <div className="tag">MİSSİYAMIZ</div>
            <h2>Elm ilə Praktikanın<br /><em>Kəsişmə Nöqtəsi</em></h2>
            <p>
              Fəaliyyətimizin əsas məqsədi səhiyyə sahəsində elmi biliklərin praktik tətbiqlə inteqrasiyasını təmin etmək və mütəxəssislər üçün davamlı inkişaf mühiti yaratmaqdır. Hər bir konfrans konsept mərhələsindən başlayaraq elmi proqramın qurulması, mövzuların aktuallığının müəyyənləşdirilməsi əsasında formalaşdırılır.
            </p>
          </div>
          <div className="mcards">
            {[
              ["Elmi Proqram", "Mövzuların aktuallığı, spiker seçimi və auditoriyanın ehtiyaclarına uyğunlaşdırma."],
              ["İnteraktiv Sessiyalar", "Panel müzakirələri, klinik hallar üzərindən aparılan analizlər."],
              ["Beynəlxalq İştirak", "Qlobal tibbi yeniliklərin yerli praktikaya tətbiqi üçün platforma."],
              ["Davamlı İnkişaf", "Mütəxəssislər arasında güclü əməkdaşlıq platforması formalaşdırma."],
            ].map(([t, d]) => (
              <div className="mcard" key={t}>
                <div className="mcard-t">{t}</div>
                <div className="mcard-d">{d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="events-section" id="events">
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div className="sec-hd">
              <div className="sec-tag">Tədbirlər</div>
              <h2 className="sec-h">Konfrans <em>Tarixi</em></h2>
            </div>
            <div className="events-grid">
              <div className="ev-card" style={{ borderColor: "rgba(91,184,232,.2)" }}>
                <div className="ev-top">
                  <span className="ev-badge upcoming">Gələcək</span>
                  <div className="ev-title">"Fokusda Qadın" — Ginekologiya, Endokrinologiya və Onkologiyanın Klinik İnteqrasiyası</div>
                  <div className="ev-desc">Multidisiplinar yanaşma — müasir diaqnostika, hormonal pozğunluqlar və reproduktiv sağlamlıq üzrə beynəlxalq spikerlər.</div>
                </div>
                <div className="ev-bottom">
                  <div className="ev-date"><div className="ev-date-dot" />06.06.2026 · Bakı</div>
                  <a href="https://inova-healthcare.com/layihələr/" className="ev-link">Qeydiyyat →</a>
                </div>
              </div>
              <div className="ev-card">
                <div className="ev-top">
                  <span className="ev-badge past">Keçmiş</span>
                  <div className="ev-title">Onkologiya Multidisiplinar Simpozium</div>
                  <div className="ev-desc">Beynəlxalq onkologiya protokolları, klinik hal müzakirələri və yeni müalicə metodları üzrə intensiv proqram.</div>
                </div>
                <div className="ev-bottom">
                  <div className="ev-date"><div className="ev-date-dot" style={{ opacity: 0.2 }} />2024 · Bakı</div>
                  <a href="https://inova-healthcare.com/layihələr/" className="ev-link" style={{ opacity: 0.4 }}>Baxış →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="spec-section" id="spec">
          <div className="sec-hd">
            <div className="sec-tag">İxtisas Sahələri</div>
            <h2 className="sec-h">Multidisiplinar <em>Yanaşma</em></h2>
          </div>
          <div className="spec-grid">
            {[
              ["01", "Ginekologiya", "Qadın sağlamlığı sahəsində müasir diaqnostika, müalicə protokolları, klinik araşdırmalar və beynəlxalq standartlar."],
              ["02", "Endokrinologiya", "Hormonal sistem xəstəliklərinin diaqnostika və müalicəsi üzrə beynəlxalq yeniliklər və klinik protokollar."],
              ["03", "Onkologiya", "Multidisiplinar onkoloji yanaşma, beynəlxalq müalicə protokolları və klinik hal müzakirələri."],
            ].map(([n, t, d]) => (
              <div className="scard" key={n}>
                <div className="scard-num">{n}</div>
                <div className="scard-bar" />
                <div className="scard-title">{t}</div>
                <div className="scard-text">{d}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="fmt-section" id="fmt">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="sec-tag">Konfrans Formatı</div>
            <h2 className="sec-h">Necə <em>Keçiririk?</em></h2>
          </div>
          <div className="fmt-list">
            {[
              ["01", "Beynəlxalq Spikerlər", "Dünyanın aparıcı tibb mütəxəssisləri ilə birbaşa bilik mübadiləsi imkanı."],
              ["02", "Panel Müzakirələri", "İnteraktiv panellər, ekspert dialoqları və açıq sual-cavab sessiyaları."],
              ["03", "Klinik Hallar", "Real klinik vəziyyətlərin təhlili — biliklərin gündəlik praktikaya tətbiqi."],
              ["04", "Qlobal Yeniliklər", "Son elmi araşdırmalar, beynəlxalq protokollar və müasir müalicə metodları."],
            ].map(([n, t, d]) => (
              <div className="fmt-row" key={n}>
                <div className="fmt-n">{n}</div>
                <div className="fmt-t">{t}</div>
                <div className="fmt-d">{d}</div>
                <div className="fmt-arr">→</div>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <div className="ft-grid">
            <div>
              <div className="ft-logo"><img src={logo} alt="INOVA Health Care" /></div>
              <p className="ft-desc">Səhiyyədə bilik və təcrübənin körpüsü. 2014-dən bəri Bakıda tibbi konfrans platforması.</p>
            </div>
            <div>
              <div className="ft-h">Naviqasiya</div>
              <ul className="ft-ul">
                <li><a href="#miss">Missiya</a></li>
                <li><a href="#events">Konfranslar</a></li>
                <li><a href="#spec">İxtisaslar</a></li>
                <li><a href="#fmt">Format</a></li>
              </ul>
            </div>
            <div>
              <div className="ft-h">Əlaqə</div>
              <ul className="ft-ul">
                <li><a href="tel:+994102395356">+994 10 239 53 56</a></li>
                <li><a href="mailto:info@inova-healthcare.com">info@inova-healthcare.com</a></li>
                <li><a href="https://inova-healthcare.com">inova-healthcare.com</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <span>© 2014–2026 INOVA Health Care. Bütün hüquqlar qorunur.</span>
            <a href="https://inova-healthcare.com">inova-healthcare.com ↗</a>
          </div>
        </footer>
      </div>
    </>
  );
}
