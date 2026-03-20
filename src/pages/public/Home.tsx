import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  MapPin,
  FileCheck,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

// ── Google Fonts (injected once) ───────────────────────────────────────────
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap';

function useFonts() {
  useEffect(() => {
    if (document.getElementById('home-gfonts')) return;
    const link = document.createElement('link');
    link.id = 'home-gfonts';
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
}

// ── Data constants ─────────────────────────────────────────────────────────

const TRUST_CARDS = [
  {
    id: 'escrow',
    icon: ShieldCheck,
    title: 'Secure Escrow Engine',
    desc: 'Funds are held in trust until every step of your service is independently verified.',
  },
  {
    id: 'agents',
    icon: Users,
    title: 'Verified Agent Network',
    desc: 'District-level onboarding with background checks and continuous performance monitoring.',
  },
  {
    id: 'coverage',
    icon: MapPin,
    title: 'Nationwide Coverage',
    desc: 'Intelligent geo-assignment routes your application to the highest-rated nearby agent.',
  },
  {
    id: 'completion',
    icon: FileCheck,
    title: 'Structured Completion',
    desc: 'Digital, doorstep, and full-assistance modes — you choose how involved you want to be.',
  },
] as const;

const METRICS = [
  { id: 'services',   label: 'Services Supported', val: '400+' },
  { id: 'agents',     label: 'Verified Agents',     val: '10K+' },
  { id: 'completion', label: 'Completion Rate',      val: '99%+' },
  { id: 'coverage',   label: 'Districts Covered',   val: '700+' },
] as const;

// ── Keyframes & global styles ──────────────────────────────────────────────

const CSS = `
  :root {
    --gold:       #C9A84C;
    --gold-light: #F0D98A;
    --gold-dim:   rgba(201,168,76,0.18);
    --navy:       #060C1A;
    --navy-2:     #0C1428;
    --text-dim:   rgba(255,255,255,0.45);
    --text-faint: rgba(255,255,255,0.22);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans:  'DM Sans', system-ui, sans-serif;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulseBg1 {
    0%,100% { transform:scale(1) translate(0,0);       opacity:.35; }
    50%     { transform:scale(1.14) translate(-14px,10px); opacity:.5; }
  }
  @keyframes pulseBg2 {
    0%,100% { transform:scale(1) translate(0,0);      opacity:.25; }
    50%     { transform:scale(1.1) translate(12px,-8px); opacity:.4; }
  }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes shimmer {
    0%   { background-position: -220% center; }
    100% { background-position:  220% center; }
  }
  @keyframes bounce2 {
    0%,100% { transform:translateX(-50%) translateY(0);  opacity:.55; }
    50%     { transform:translateX(-50%) translateY(7px); opacity:1;  }
  }

  .fu  { animation: fadeUp .7s ease both; }
  .fu1 { animation: fadeUp .7s .15s ease both; }
  .fu2 { animation: fadeUp .7s .30s ease both; }
  .fu3 { animation: fadeUp .7s .45s ease both; }
  .fu4 { animation: fadeUp .7s .60s ease both; }

  /* ── Gold shimmer text ── */
  .gold-text {
    background: linear-gradient(110deg,#C9A84C 0%,#F0D98A 35%,#C9A84C 55%,#E8C97A 75%,#C9A84C 100%);
    background-size: 220% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }

  /* ── Glass cards ── */
  .glass {
    background: rgba(255,255,255,.032);
    backdrop-filter: blur(14px);
    border: 1px solid var(--gold-dim);
    transition: background .3s, border-color .3s, transform .3s, box-shadow .3s;
  }
  .glass:hover {
    background: rgba(255,255,255,.065);
    border-color: rgba(201,168,76,.45);
    transform: translateY(-5px);
    box-shadow: 0 28px 64px rgba(0,0,0,.45), 0 0 0 1px rgba(201,168,76,.22);
  }

  /* ── Metric cards ── */
  .metric {
    border: 1px solid rgba(201,168,76,.12);
    background: rgba(255,255,255,.025);
    position: relative; overflow: hidden;
    transition: border-color .3s;
  }
  .metric::after {
    content:''; position:absolute; inset:0; border-radius:inherit;
    background: radial-gradient(ellipse at 50% -10%, rgba(201,168,76,.14), transparent 65%);
    opacity:0; transition:opacity .3s;
  }
  .metric:hover { border-color:rgba(201,168,76,.4); }
  .metric:hover::after { opacity:1; }

  /* ── Primary button ── */
  .btn-gold {
    background: linear-gradient(135deg, #B8923E, #C9A84C 40%, #E8C97A 70%, #C9A84C);
    background-size: 200% 200%;
    box-shadow: 0 8px 32px rgba(201,168,76,.32);
    transition: background-position .4s, transform .2s, box-shadow .3s;
    border:none; cursor:pointer;
  }
  .btn-gold:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 16px 44px rgba(201,168,76,.5);
  }

  /* ── Outline button ── */
  .btn-outline {
    border: 1.5px solid rgba(201,168,76,.45);
    background: transparent; color:#E8C97A; cursor:pointer;
    transition: background .3s, border-color .3s, transform .2s;
  }
  .btn-outline:hover {
    background: rgba(201,168,76,.08);
    border-color: var(--gold);
    transform: translateY(-2px);
  }

  /* ── Scroll hint ── */
  .scroll-hint {
    position:absolute; bottom:2rem; left:50%;
    transform:translateX(-50%);
    color:rgba(201,168,76,.45);
    animation:bounce2 2.2s ease-in-out infinite;
  }

  /* ── Diagonal clip ── */
  .clip-down  { clip-path: polygon(0 0, 100% 5vw, 100% 100%, 0 100%); }
  .clip-up    { clip-path: polygon(0 5vw, 100% 0, 100% 100%, 0 100%); }
`;

// ── Shared inline style helpers ────────────────────────────────────────────

const label = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--sans)',
  fontSize: '10px', fontWeight: 700,
  letterSpacing: '0.3em', textTransform: 'uppercase',
  color: 'var(--gold)', ...extra,
});

// ── Component ──────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  useFonts();

  return (
    <>
      <style>{CSS}</style>

      <div style={{ background: 'var(--navy)', color: '#fff', overflowX: 'hidden', fontFamily: 'var(--sans)' }}>

        {/* ════════════════════════════════════ HERO */}
        <section style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '7rem 1.5rem 6rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>

          {/* Background mood orbs */}
          {[
            { style: { top:'-8%', left:'-8%', width:'54vw', height:'54vw', background:'radial-gradient(circle, rgba(22,52,110,.6) 0%, transparent 68%)', animation:'pulseBg1 11s ease-in-out infinite' } },
            { style: { bottom:'-6%', right:'-6%', width:'46vw', height:'46vw', background:'radial-gradient(circle, rgba(90,52,8,.42) 0%, transparent 68%)', animation:'pulseBg2 14s ease-in-out infinite' } },
          ].map((o, i) => (
            <div key={i} aria-hidden="true" style={{
              position:'absolute', borderRadius:'50%', pointerEvents:'none', ...o.style,
            }} />
          ))}

          {/* Dot grid */}
          <div aria-hidden="true" style={{
            position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage: 'radial-gradient(rgba(201,168,76,.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Spinning rings */}
          <div aria-hidden="true" style={{
            position:'absolute', top:'10%', right:'6%',
            width:'200px', height:'200px',
            border:'1px solid rgba(201,168,76,.1)', borderRadius:'50%',
            animation:'spin 36s linear infinite',
          }}>
            <div style={{
              position:'absolute', top:'16px', left:'16px', right:'16px', bottom:'16px',
              border:'1px solid rgba(201,168,76,.06)', borderRadius:'50%',
            }} />
          </div>
          <div aria-hidden="true" style={{
            position:'absolute', bottom:'8%', left:'5%',
            width:'120px', height:'120px',
            border:'1px solid rgba(201,168,76,.08)', borderRadius:'50%',
            animation:'spin 24s linear infinite reverse',
          }} />

          {/* Hero content */}
          <div style={{ position:'relative', zIndex:1, maxWidth:'860px', width:'100%' }}>

            {/* Eyebrow */}
            <div className="fu" style={{ display:'inline-flex', alignItems:'center', gap:'12px', marginBottom:'2.5rem' }}>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,transparent,var(--gold))' }} />
              <span style={label()}>National Digital Service Infrastructure</span>
              <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,var(--gold),transparent)' }} />
            </div>

            {/* H1 */}
            <h1 className="fu1" style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 700, lineHeight: 1.06,
              letterSpacing: '-0.01em',
              marginBottom: '1.75rem',
              textWrap: 'balance',
            }}>
              India's Trusted{' '}
              <span className="gold-text">Infrastructure</span>
              <br />for Citizen Services
            </h1>

            {/* Sub-headline */}
            <p className="fu2" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--text-dim)', lineHeight: 1.85,
              fontWeight: 300, maxWidth: '580px',
              margin: '0 auto 3rem',
            }}>
              Verified agents. Escrow-secured payments. Structured execution workflows.
              Apply for Aadhaar, PAN, and 400+ essential government services with confidence.
            </p>

            {/* CTAs */}
            <div className="fu3" style={{
              display:'flex', gap:'1rem',
              justifyContent:'center', flexWrap:'wrap',
            }}>
              <Link to="/login?role=citizen">
                <button className="btn-gold" style={{
                  height:'56px', padding:'0 2.5rem', borderRadius:'14px',
                  color:'#06100A', fontWeight:700, fontSize:'.95rem',
                  fontFamily:'var(--sans)', letterSpacing:'.025em',
                  display:'inline-flex', alignItems:'center', gap:'10px',
                }}>
                  Apply Now
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </Link>
              <Link to="/login?role=agent">
                <button className="btn-outline" style={{
                  height:'56px', padding:'0 2.5rem', borderRadius:'14px',
                  fontWeight:600, fontSize:'.95rem', fontFamily:'var(--sans)',
                }}>
                  Become an Agent
                </button>
              </Link>
            </div>

            {/* Trust micro-line */}
            <p className="fu4" style={{
              marginTop:'2rem',
              fontSize:'.75rem', color:'var(--text-faint)',
              letterSpacing:'.08em',
            }}>
              No hidden charges &nbsp;·&nbsp; Government-compliant &nbsp;·&nbsp; 100% secure
            </p>
          </div>

          {/* Scroll cue */}
          <div className="scroll-hint" aria-hidden="true"><ChevronDown size={22} /></div>
        </section>

        {/* ════════════════════════════════════ TRUST CARDS */}
        <section
          className="clip-down"
          style={{ background:'var(--navy-2)', padding:'8rem 1.5rem 7rem', position:'relative' }}
          aria-label="Platform trust features"
        >
          {/* Section header */}
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={label({ marginBottom:'.8rem', display:'block' })}>Why Citizens Trust Us</p>
            <h2 style={{
              fontFamily:'var(--serif)',
              fontSize:'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight:700, color:'#fff', lineHeight:1.15,
            }}>
              Built on Four Uncompromising Pillars
            </h2>
          </div>

          <div style={{
            maxWidth:'1200px', margin:'0 auto',
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',
            gap:'1.25rem',
          }}>
            {TRUST_CARDS.map(({ id, icon: Icon, title, desc }) => (
              <div key={id} className="glass" style={{ borderRadius:'20px', padding:'2.25rem 2rem' }}>
                <div aria-hidden="true" style={{
                  width:'50px', height:'50px', borderRadius:'13px',
                  background:'rgba(201,168,76,.09)',
                  border:'1px solid rgba(201,168,76,.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:'1.4rem',
                  boxShadow:'0 0 24px rgba(201,168,76,.08)',
                }}>
                  <Icon size={21} color="var(--gold)" />
                </div>
                <h3 style={{
                  fontFamily:'var(--serif)', fontSize:'1.3rem',
                  fontWeight:600, color:'#fff', marginBottom:'.6rem',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize:'.875rem', color:'var(--text-dim)', lineHeight:1.78, fontWeight:300 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════ METRICS */}
        <section
          style={{ background:'var(--navy)', padding:'7rem 1.5rem', position:'relative' }}
          aria-label="Platform scale"
        >
          {/* Horizontal gold lines top/bottom */}
          {['top','bottom'].map(pos => (
            <div key={pos} aria-hidden="true" style={{
              position:'absolute', [pos]:0, left:'8%', right:'8%', height:'1px',
              background:'linear-gradient(90deg,transparent,rgba(201,168,76,.28),transparent)',
            }} />
          ))}

          <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
            {/* Section label */}
            <p style={{ ...label(), display:'block', textAlign:'center', marginBottom:'3rem' }}>
              Platform at a Glance
            </p>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',
              gap:'1.25rem',
            }}>
              {METRICS.map(({ id, label: lbl, val }) => (
                <div key={id} className="metric" style={{ borderRadius:'18px', padding:'2.5rem 1.5rem', textAlign:'center' }}>
                  <p
                    aria-label={`${val} ${lbl}`}
                    style={{
                      fontFamily:'var(--serif)',
                      fontSize:'clamp(2.6rem,5vw,4rem)',
                      fontWeight:700, lineHeight:1, marginBottom:'.65rem',
                      background:'linear-gradient(135deg,#C9A84C,#F0D98A)',
                      WebkitBackgroundClip:'text', backgroundClip:'text',
                      WebkitTextFillColor:'transparent',
                    }}
                  >
                    {val}
                  </p>
                  <p aria-hidden="true" style={{
                    fontSize:'10px', fontWeight:700,
                    letterSpacing:'.22em', textTransform:'uppercase',
                    color:'rgba(255,255,255,.28)',
                  }}>
                    {lbl}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════ FINAL CTA */}
        <section
          className="clip-up"
          style={{
            background:'linear-gradient(135deg, #0C1428 0%, #101928 60%, #0A0F1E 100%)',
            padding:'9rem 1.5rem 8rem',
            textAlign:'center', position:'relative', overflow:'hidden',
          }}
        >
          {/* Centre glow */}
          <div aria-hidden="true" style={{
            position:'absolute', top:'40%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:'560px', height:'320px', borderRadius:'50%',
            background:'radial-gradient(ellipse,rgba(201,168,76,.07) 0%, transparent 70%)',
            pointerEvents:'none',
          }} />

          {/* Corner accent marks */}
          {([
            { top:'2rem',    left:'2rem',  borderTop:'1px solid rgba(201,168,76,.28)', borderLeft:'1px solid rgba(201,168,76,.28)' },
            { top:'2rem',    right:'2rem', borderTop:'1px solid rgba(201,168,76,.28)', borderRight:'1px solid rgba(201,168,76,.28)' },
            { bottom:'2rem', left:'2rem',  borderBottom:'1px solid rgba(201,168,76,.28)', borderLeft:'1px solid rgba(201,168,76,.28)' },
            { bottom:'2rem', right:'2rem', borderBottom:'1px solid rgba(201,168,76,.28)', borderRight:'1px solid rgba(201,168,76,.28)' },
          ] as React.CSSProperties[]).map((s, i) => (
            <div key={i} aria-hidden="true" style={{
              position:'absolute', width:'22px', height:'22px', ...s,
            }} />
          ))}

          <div style={{ position:'relative', zIndex:1, maxWidth:'700px', margin:'0 auto' }}>
            <p style={{ ...label(), display:'block', marginBottom:'1.2rem' }}>Ready to Get Started?</p>

            <h2 style={{
              fontFamily:'var(--serif)',
              fontSize:'clamp(2rem,5vw,3.6rem)',
              fontWeight:700, lineHeight:1.1, color:'#fff',
              marginBottom:'1.2rem', textWrap:'balance',
            }}>
              Simplifying Citizen Services{' '}
              <span className="gold-text">Across India</span>
            </h2>

            <p style={{
              fontSize:'1rem', color:'var(--text-dim)',
              lineHeight:1.82, fontWeight:300, marginBottom:'2.75rem',
            }}>
              Join millions of citizens who've completed government applications
              securely, faster, and without queues.
            </p>

            <Link to="/login?role=citizen">
              <button className="btn-gold" style={{
                height:'58px', padding:'0 3rem', borderRadius:'14px',
                color:'#06100A', fontWeight:700, fontSize:'.95rem',
                fontFamily:'var(--sans)', letterSpacing:'.03em',
                display:'inline-flex', alignItems:'center', gap:'10px',
              }}>
                Launch Application Portal
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </Link>

            <p style={{
              marginTop:'1.75rem', fontSize:'.76rem',
              color:'var(--text-faint)', letterSpacing:'.06em',
            }}>
              No hidden charges &nbsp;·&nbsp; Government-compliant &nbsp;·&nbsp; 100% secure
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
