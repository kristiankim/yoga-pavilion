/* global React, ReactDOM */

// ── Booking Drawer ────────────────────────────────────────────────────────────
// A right-side drawer that opens when a Reserve / Waitlist button is clicked.
// Steps: Detail → Sign in → Confirmed
// ─────────────────────────────────────────────────────────────────────────────

const drawerStyle = `
  .bk-overlay {
    position: fixed; inset: 0; z-index: 900;
    background: rgba(20,25,18,0); pointer-events: none;
    transition: background 0.38s ease;
  }
  .bk-overlay.open {
    background: rgba(20,25,18,0.42); pointer-events: all;
  }
  .bk-drawer {
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 901;
    width: min(480px, 100vw);
    background: var(--bg);
    box-shadow: -12px 0 48px rgba(20,25,18,0.18);
    transform: translateX(100%);
    transition: transform 0.42s cubic-bezier(0.32, 0, 0.08, 1);
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  .bk-drawer.open { transform: translateX(0); }

  .bk-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid var(--line);
    flex-shrink: 0;
  }
  .bk-head__steps {
    display: flex; gap: 6px; align-items: center;
  }
  .bk-step-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--line); transition: background 0.2s, width 0.2s;
  }
  .bk-step-dot.active { background: var(--ink); width: 20px; border-radius: 3px; }
  .bk-step-dot.done { background: var(--accent); }

  .bk-close {
    width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid var(--line); background: transparent;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--ink-muted);
    transition: all 0.18s;
  }
  .bk-close:hover { background: var(--ink); color: var(--bg); border-color: var(--ink); }

  .bk-back {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--ink-muted);
    background: none; border: none; cursor: pointer; padding: 0;
    transition: color 0.18s;
  }
  .bk-back:hover { color: var(--ink); }

  .bk-body {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: var(--line) transparent;
  }

  /* Detail step */
  .bk-photo {
    width: 100%; aspect-ratio: 16/9; object-fit: cover;
    background: var(--bg-soft); flex-shrink: 0;
    position: relative; overflow: hidden;
  }
  .bk-content { padding: 24px; display: flex; flex-direction: column; gap: 22px; }

  .bk-title {
    font-family: var(--serif); font-size: 30px;
    letter-spacing: -0.015em; line-height: 1;
    color: var(--ink);
  }
  .bk-waitlist-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(184,136,99,0.14); color: var(--warm);
    font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 5px 10px; border-radius: 999px;
    border: 1px solid rgba(184,136,99,0.25);
    margin-bottom: 4px; width: fit-content;
  }

  .bk-meta { display: flex; flex-direction: column; gap: 12px; }
  .bk-meta-row {
    display: grid; grid-template-columns: 20px 1fr;
    gap: 10px; align-items: start; font-size: 14px; color: var(--ink-soft);
  }
  .bk-meta-row svg { margin-top: 1px; flex-shrink: 0; color: var(--ink-muted); }
  .bk-meta-row strong { color: var(--ink); font-weight: 500; display: block; }

  .bk-instructor-chip {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--line); border-radius: 999px;
    padding: 6px 14px 6px 8px; font-size: 13px; color: var(--ink);
  }
  .bk-instructor-chip .avatar {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--bg-soft); border: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--serif); font-size: 11px; color: var(--ink-muted);
  }

  .bk-price-box {
    background: var(--bg-soft);
    border: 1px solid var(--line); border-radius: 6px;
    padding: 16px 18px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }
  .bk-price-box__label { font-size: 13px; color: var(--ink-soft); }
  .bk-price-box__label small { display: block; font-size: 12px; color: var(--ink-muted); margin-top: 2px; }
  .bk-price-box__amount {
    font-family: var(--serif); font-size: 32px;
    letter-spacing: -0.02em; color: var(--accent-deep);
  }

  .bk-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.6; }
  .bk-desc strong { color: var(--ink); font-weight: 500; }
  .bk-show-more {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 13px; color: var(--accent); border: none;
    background: none; cursor: pointer; padding: 0; margin-top: 6px;
    font-weight: 500;
  }

  .bk-special {
    background: rgba(110,122,90,0.08); border: 1px solid rgba(110,122,90,0.2);
    border-radius: 6px; padding: 16px 18px;
    font-size: 13px; color: var(--ink-soft); line-height: 1.55;
  }
  .bk-special strong { color: var(--ink); display: block; margin-bottom: 8px; font-weight: 500; }
  .bk-special ol { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }

  .bk-divider { height: 1px; background: var(--line); }

  .bk-cta-bar {
    padding: 18px 24px; border-top: 1px solid var(--line); flex-shrink: 0;
    background: var(--bg);
  }
  .bk-cta-bar .note { font-size: 12px; color: var(--ink-muted); text-align: center; margin-top: 10px; }

  .bk-btn-full {
    width: 100%; padding: 16px; border-radius: 999px;
    font-family: var(--sans); font-size: 15px; font-weight: 500;
    letter-spacing: 0.01em; cursor: pointer; border: none;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .bk-btn-full.primary { background: var(--ink); color: var(--bg); }
  .bk-btn-full.primary:hover { background: var(--accent-deep); }
  .bk-btn-full.google {
    background: var(--paper); color: var(--ink);
    border: 1px solid var(--line);
  }
  .bk-btn-full.google:hover { border-color: var(--ink); }

  /* Sign-in step */
  .bk-signin { padding: 28px 24px 24px; display: flex; flex-direction: column; gap: 20px; }
  .bk-signin__title { font-family: var(--serif); font-size: 26px; letter-spacing: -0.01em; }
  .bk-signin__sub { font-size: 14px; color: var(--ink-soft); margin-top: -12px; }

  .bk-field { display: flex; flex-direction: column; gap: 6px; }
  .bk-field label { font-size: 13px; font-weight: 500; color: var(--ink); }
  .bk-field input {
    width: 100%; padding: 13px 16px; border-radius: 8px;
    border: 1px solid var(--line); background: var(--paper);
    font-family: var(--sans); font-size: 15px; color: var(--ink);
    outline: none; transition: border-color 0.18s;
    box-sizing: border-box;
  }
  .bk-field input:focus { border-color: var(--ink); }
  .bk-field input::placeholder { color: var(--ink-muted); }

  .bk-row-links {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px;
  }
  .bk-check-row { display: flex; align-items: center; gap: 8px; color: var(--ink-soft); }
  .bk-check-row input[type=checkbox] { width: 16px; height: 16px; accent-color: var(--ink); }
  .bk-link { color: var(--accent-deep); background: none; border: none; cursor: pointer;
    font-family: var(--sans); font-size: 13px; font-weight: 500; padding: 0; }
  .bk-link:hover { text-decoration: underline; }

  .bk-or { display: flex; align-items: center; gap: 12px; color: var(--ink-muted); font-size: 13px; }
  .bk-or::before, .bk-or::after { content: ""; flex: 1; height: 1px; background: var(--line); }

  .bk-no-account { text-align: center; font-size: 13px; color: var(--ink-soft); }
  .bk-no-account button { font-family: var(--sans); font-size: 13px; font-weight: 600;
    color: var(--ink); background: none; border: none; cursor: pointer; padding: 0; text-decoration: underline; }

  /* Confirmed step */
  .bk-confirmed { padding: 48px 24px 32px; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
  .bk-check-circle {
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--ink); display: flex; align-items: center; justify-content: center;
    color: var(--bg); flex-shrink: 0;
  }
  .bk-confirmed__title { font-family: var(--serif); font-size: 32px; letter-spacing: -0.015em; }
  .bk-confirmed__sub { font-size: 15px; color: var(--ink-soft); max-width: 32ch; }
  .bk-confirmed__card {
    background: var(--bg-soft); border: 1px solid var(--line); border-radius: 8px;
    padding: 20px 24px; text-align: left; width: 100%;
    display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: var(--ink-soft);
  }
  .bk-confirmed__card strong { font-family: var(--serif); font-size: 20px; color: var(--ink); display: block; margin-bottom: 2px; }
  .bk-wl-note {
    font-size: 12px; color: var(--ink-muted); text-align: center;
    max-width: 34ch; line-height: 1.5;
  }
`;

function BookingDrawer() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0); // 0=detail, 1=signin, 2=confirmed
  const [cls, setCls] = React.useState(null);
  const [showFullDesc, setShowFullDesc] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Listen for open events dispatched by schedule buttons
  React.useEffect(() => {
    function handler(e) {
      setCls(e.detail);
      setStep(0);
      setShowFullDesc(false);
      setOpen(true);
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('open-booking-drawer', handler);
    return () => window.removeEventListener('open-booking-drawer', handler);
  }, []);

  function close() {
    setOpen(false);
    document.body.style.overflow = '';
  }

  function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1200);
  }

  if (!cls) return null;

  const isFull = cls.full;
  const photoClass = ['photo--a','photo--b','photo--c','photo--d','photo--e','photo--f','photo--g'][
    Math.abs(cls.name.charCodeAt(0) - 65) % 7
  ];

  const desc = cls.pillar === 'Pre/Postnatal'
    ? 'A gentle, guided class for expecting and new mothers. Focuses on breath, pelvic floor, core stability, and safe postural alignment throughout pregnancy and postnatal recovery.'
    : cls.pillar === 'Pilates'
    ? 'This session uses both Reformer apparatus and Mat to build core strength, improve posture, and develop body awareness. Suitable for all fitness levels with instructor adaptations.'
    : 'A flowing yoga sequence linking breath and movement. Builds strength, flexibility, and calm focus. Props available; modifications offered throughout for all levels.';

  return (
    <>
      {/* Overlay */}
      <div className={`bk-overlay${open ? ' open' : ''}`} onClick={close} />

      {/* Drawer */}
      <div className={`bk-drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Book a class">

        {/* Header */}
        <div className="bk-head">
          <div>
            {step > 0 ? (
              <button className="bk-back" onClick={() => setStep(s => s - 1)}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M15 6H1m0 0l5-5M1 6l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Back
              </button>
            ) : (
              <div className="bk-head__steps">
                {[0,1,2].map(i => (
                  <div key={i} className={`bk-step-dot${step===i?' active':step>i?' done':''}`} />
                ))}
              </div>
            )}
          </div>
          <span style={{fontSize:'13px', fontFamily:'var(--mono)', letterSpacing:'0.08em', color:'var(--ink-muted)'}}>
            {step === 0 ? 'Class detail' : step === 1 ? 'Sign in to book' : 'Confirmed'}
          </span>
          <button className="bk-close" onClick={close} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="bk-body">

          {/* ── STEP 0: Detail ── */}
          {step === 0 && (
            <>
              <div className={`bk-photo ${photoClass}`} style={{height: 210}} />
              <div className="bk-content">

                {isFull && (
                  <div className="bk-waitlist-badge">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    Waitlist only
                  </div>
                )}

                <h2 className="bk-title">{cls.name}</h2>

                <div className="bk-meta">
                  <div className="bk-meta-row">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none"><rect x="1" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6h12M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <div>
                      <strong>{cls.day} · {cls.time}</strong>
                      {cls.dur} · {cls.level}
                    </div>
                  </div>
                  <div className="bk-meta-row">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M7 1C4.239 1 2 3.239 2 6c0 4 5 9 5 9s5-5 5-9c0-2.761-2.239-5-5-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                    <div>
                      <strong>Yoga Pavilion with Pilates</strong>
                      2020 Central Rd, 2nd Floor, Fort Lee, NJ 07024
                    </div>
                  </div>
                  <div className="bk-meta-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 12C3.5 10 5 9 7 9s3.5 1 4.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <div>
                      <strong>Instructor</strong>
                      <div className="bk-instructor-chip" style={{marginTop:6}}>
                        <div className="avatar">{cls.teacher[0]}</div>
                        {cls.teacher}
                      </div>
                    </div>
                  </div>
                  <div className="bk-meta-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="2" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 11c0-2 1.5-4 6-4s6 2 6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <div>
                      <strong>{isFull ? 'No spots left' : 'Spots available'}</strong>
                      {isFull ? 'Join waitlist — you\'ll be notified if a spot opens.' : 'Reserve your mat now.'}
                    </div>
                  </div>
                </div>

                <div className="bk-price-box">
                  <div className="bk-price-box__label">
                    Starting from
                    <small>Sign in to use your pass or membership</small>
                  </div>
                  <div className="bk-price-box__amount">
                    {cls.pillar === 'Private' ? '$89' : '$55'}
                  </div>
                </div>

                <div>
                  <p className="bk-desc">
                    {showFullDesc ? desc : desc.slice(0, 120) + '…'}
                  </p>
                  <button className="bk-show-more" onClick={() => setShowFullDesc(v => !v)}>
                    {showFullDesc ? 'Show less ↑' : 'Show more ↓'}
                  </button>
                </div>

                <div className="bk-special">
                  <strong>Special instructions</strong>
                  <ol>
                    <li><b>Arrive early</b> — aim to arrive 5–10 min before class to set up your mat or Reformer.</li>
                    <li><b>Wear fitted clothing</b> — avoid loose or baggy clothes; grip socks required (provided if it's your first visit).</li>
                    <li><b>Hydrate &amp; eat lightly</b> — no heavy meals 1–2 hours before class.</li>
                  </ol>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 1: Sign in ── */}
          {step === 1 && (
            <form className="bk-signin" onSubmit={handleSignIn}>
              <h2 className="bk-signin__title">Sign in to {isFull ? 'join the waitlist' : 'book'}</h2>
              <p className="bk-signin__sub">Use your WellnessLiving account to reserve your spot.</p>

              <div className="bk-field">
                <label htmlFor="bk-email">Email</label>
                <input id="bk-email" type="email" placeholder="Enter email" value={email}
                  onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="bk-field">
                <label htmlFor="bk-pw">Password</label>
                <input id="bk-pw" type="password" placeholder="Enter password" value={pw}
                  onChange={e => setPw(e.target.value)} required />
              </div>

              <div className="bk-row-links">
                <label className="bk-check-row">
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" className="bk-link">Reset password</button>
              </div>

              <button type="submit" className="bk-btn-full primary" disabled={loading}>
                {loading ? 'Signing in…' : (isFull ? 'Join waitlist' : 'Sign in to book')}
              </button>

              <div className="bk-or">or</div>
              <button type="button" className="bk-btn-full google">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>

              <p className="bk-no-account">Don't have an account? <button type="button" onClick={() => {}}>Sign up</button></p>

              <div style={{textAlign:'center', marginTop: 'auto'}}>
                <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="20" fontFamily="sans-serif" fontSize="10" fill="var(--ink-muted)" letterSpacing="0.5">powered by</text>
                  <text x="58" y="20" fontFamily="sans-serif" fontSize="12" fontWeight="600" fill="var(--ink-soft)">WellnessLiving</text>
                </svg>
              </div>
            </form>
          )}

          {/* ── STEP 2: Confirmed ── */}
          {step === 2 && (
            <div className="bk-confirmed">
              <div className="bk-check-circle">
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none"><path d="M2 11L10 19L26 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 className="bk-confirmed__title">{isFull ? 'You\'re on the list.' : 'You\'re booked.'}</h2>
              <p className="bk-confirmed__sub">
                {isFull
                  ? "We'll email you the moment a spot opens. You won't need to do anything — just accept the notification."
                  : "A confirmation has been sent to your email. See you on the mat!"}
              </p>
              <div className="bk-confirmed__card">
                <strong>{cls.name}</strong>
                <div>
                  <svg width="13" height="13" viewBox="0 0 14 15" fill="none" style={{verticalAlign:'middle', marginRight:6}}><rect x="1" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6h12M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {cls.day} · {cls.time}
                </div>
                <div>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{verticalAlign:'middle', marginRight:6}}><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 12C3.5 10 5 9 7 9s3.5 1 4.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  w/ {cls.teacher}
                </div>
                <div>
                  <svg width="13" height="13" viewBox="0 0 14 16" fill="none" style={{verticalAlign:'middle', marginRight:6}}><path d="M7 1C4.239 1 2 3.239 2 6c0 4 5 9 5 9s5-5 5-9c0-2.761-2.239-5-5-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                  2020 Central Rd, 2nd Floor, Fort Lee, NJ
                </div>
              </div>
              <p className="bk-wl-note">
                Managed via WellnessLiving. Cancel at least 6 hours before class to avoid a charge.
              </p>
              <button className="bk-btn-full primary" style={{width:'100%'}} onClick={close}>Done</button>
            </div>
          )}
        </div>

        {/* CTA bar (only on step 0) */}
        {step === 0 && (
          <div className="bk-cta-bar">
            <button className="bk-btn-full primary" onClick={() => setStep(1)}>
              {isFull ? 'Join waitlist' : 'Reserve my spot'}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
            <p className="note">Sign in to use your class credits or membership</p>
          </div>
        )}
      </div>
    </>
  );
}

// Inject styles
(function(){
  const s = document.createElement('style');
  s.textContent = drawerStyle;
  document.head.appendChild(s);
})();

const drawerMount = document.createElement('div');
document.body.appendChild(drawerMount);
ReactDOM.createRoot(drawerMount).render(<BookingDrawer />);
