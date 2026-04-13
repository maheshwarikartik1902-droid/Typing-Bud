import React from 'react'
import { useNavigate } from 'react-router-dom'

// Only things Tailwind can't do: font import, keyframe, gradient, tight tracking
const minimalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Inter:wght@400;500;600&display=swap');
    @keyframes lp-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
    .lp-blink    { animation: lp-blink 1s infinite; }
    .lp-thermal  { background: linear-gradient(135deg, #ffb59f 0%, #f06539 100%); }
    .lp-tight    { letter-spacing: -0.03em; }
    .lp-editorial{ letter-spacing: -0.02em; }
    .group:hover .lp-glow { background: rgba(255,181,159,0.16) !important; }
`

const FEATURES = [
    { icon: '👁️', title: 'Distraction-Free Focus', desc: 'A zero-clutter interface that disappears when you start typing. Pure focus on the words, and nothing else.' },
    { icon: '📈', title: 'Analytics', desc: 'Get your WPM and accuracy with high-precision graph across every session.' },
    { icon: '🎨', title: 'Customizable Aesthetics', desc: "Dozens of premium themes from Nord to Carbon. Tailor your workspace to match your setup's soul." },
    { icon: '⌨️', title: 'Sound Feedback', desc: 'Satisfying mechanical click or soft pop sounds for every keystroke. Your fingers will thank you.' },
    { icon: '💬', title: 'Quote Mode', desc: 'Practice with real quotes from literature and tech. Variety keeps your sessions fresh and engaging.' },
    { icon: '⚡', title: 'Multiple Test Modes', desc: 'Time attack, word count, or quote completion — pick the mode that matches your training goal.' },
]

export default function LandingPage({ onStart }) {
    const navigate = useNavigate();
    return (
        <>
            <style>{minimalStyles}</style>

            <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#0f1419', color: '#dee3ea', fontFamily: 'Inter, sans-serif' }}>

                {/* ── Navbar ──────────────────────────────────────────── */}
                <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
                    style={{ backgroundColor: 'rgba(15,20,25,0.82)', borderColor: 'rgba(91,64,57,0.12)' }}>
                    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                        <span className="text-xl font-bold lp-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#dee3ea' }}>
                            Typing Bud
                        </span>
                        <div className="flex items-center gap-4">
                            <button className="bg-transparent border-0 cursor-pointer text-xs font-bold uppercase tracking-widest px-4 py-2 rounded opacity-65 hover:opacity-100 transition-opacity"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#dee3ea' }}>
                                Login
                            </button>
                            <button onClick={onStart}
                                className="lp-thermal border-0 cursor-pointer text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-md hover:scale-95 transition-transform"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#3a0a00' }}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="pt-16">

                    {/* ── Hero ────────────────────────────────────────── */}
                    <section className="max-w-7xl mx-auto px-8 pt-40 pb-24 flex flex-col items-center text-center">



                        {/* h1 */}
                        <h1 className="lp-editorial font-bold leading-[1.08] max-w-4xl mb-6"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.8rem,7vw,5rem)' }}>
                            Master Your Keystrokes<br />
                            with <span style={{ color: '#ffb59f' }}>Minimalist Precision Platform</span>
                        </h1>

                        {/* subheading */}
                        <p className="text-lg max-w-xl leading-relaxed mb-10 opacity-80" style={{ color: '#e4beb4' }}>
                            Experience the ultimate typing environment engineered for speed,
                            focus, and surgical accuracy. No distractions — just you and the rhythm.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 justify-center mb-20">
                            <button onClick={() => navigate("/practice")}
                                className="lp-thermal border-0 cursor-pointer text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-lg hover:scale-95 transition-transform"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#3a0a00' }}>
                                Start Typing Now
                            </button>
                            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="border-0 cursor-pointer text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-lg transition-colors hover:brightness-110"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: '#30353b', color: '#ffb59f' }}>
                                Contact Us
                            </button>
                        </div>

                        {/* ── App Mockup ────── */}
                        <div className="relative w-full max-w-4xl mx-auto group">

                            {/* ambient glow */}
                            <div className="lp-glow absolute inset-0 rounded-full blur-[80px] transition-all duration-700"
                                style={{ background: 'rgba(255,181,159,0.08)' }} />
                        </div>
                    </section>

                    {/* ── Features ────────────────────────────────────── */}
                    {<section className="py-24 px-8" style={{ backgroundColor: '#171c21' }}>
                        <div className="max-w-7xl mx-auto">

                            <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-3"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#ffb59f' }}>
                                Why Typing Bud
                            </p>

                            <h2 className="text-center font-bold lp-editorial mb-16"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
                                Built for <span style={{ color: '#ffb59f' }}>performance</span>,<br />
                                designed for focus
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {FEATURES.map(f => (
                                    <div key={f.title}
                                        className="p-10 rounded-xl border transition-all duration-200 hover:-translate-y-1 cursor-default"
                                        style={{ backgroundColor: '#1b2025', borderColor: 'rgba(91,64,57,0.05)' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,181,159,0.2)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(91,64,57,0.05)'}>
                                        <div className="text-3xl mb-6">{f.icon}</div>
                                        <h3 className="font-bold text-xl mb-3"
                                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#dee3ea' }}>
                                            {f.title}
                                        </h3>
                                        <p className="leading-relaxed text-sm opacity-70" style={{ color: '#e4beb4' }}>
                                            {f.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>}

                    {/* ── CTA ─────────────────────────────────────────── */}
                    <section className="py-32 px-8 text-center">
                        <div className="max-w-2xl mx-auto">

                            <h2 className="font-bold lp-editorial mb-5"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
                                Ready to reach<br />
                                <span style={{ color: '#ffb59f' }}>100+ WPM?</span>
                            </h2>

                            <p className="text-lg leading-relaxed mb-10 opacity-60" style={{ color: '#e4beb4' }}>
                                Join typing enthusiasts today.
                                Experience the cleanest typing interface ever designed.
                            </p>

                            {/*<button onClick={onStart}
                                className="lp-thermal border-0 cursor-pointer text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-lg hover:scale-95 transition-transform mb-8"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#3a0a00' }}>
                                Start for Free
                            </button>

                            <br />

                            <button className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer text-sm font-bold uppercase tracking-widest mt-4 transition-all"
                                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#ffb59f' }}>
                                Join the Community <span>→</span>
                            </button>*/}
                        </div>
                    </section>
                </main>

                {/* ── Footer ──────────────────────────────────────────── */}
                <section id='contact'>
                <footer className="border-t px-8 py-12"
                    style={{ backgroundColor: '#0f1419', borderColor: 'rgba(91,64,57,0.15)' }}>
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">

                        <span className="font-bold text-lg lp-editorial"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#dee3ea' }}>
                            Typing Bud
                        </span>

                        <div className="flex flex-wrap gap-8">
                            {['Contact us'].map(l => (
                                <a key={l} href="https://www.linkedin.com/in/kartik-maheshwari-/"
                                    className="text-sm no-underline transition-colors duration-500 hover:text-[#ffb59f]"
                                    style={{ color: 'rgba(222,227,234,0.5)' }}>
                                    {l}
                                </a>
                            ))}
                        </div>

                        <span className="text-sm " style={{ color: 'rgba(222,227,234,0.4)' }}>
                            © 2026 Typing Bud. Engineered for performance.
                        </span>
                    </div>
                </footer>
                </section>
            </div>
        </>
    )
}