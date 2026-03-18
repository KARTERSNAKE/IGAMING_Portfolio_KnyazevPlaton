/**
 * Portfolio.tsx
 * Main portfolio page: hero block + 3 accordion sections.
 * Animated entrance via Framer Motion.
 */

import { motion } from 'framer-motion';

// ── Reusable sub-components ─────────────────────────────

function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-2xl p-5
                    hover:border-[#d4a843]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                    hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[0.78rem] font-bold tracking-[0.1em] uppercase text-[#c99a35] mb-2">{title}</p>
            <p className="text-[0.88rem] leading-[1.65] text-[#555]">{children}</p>
        </div>
    );
}

function SkillPill({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase
                     px-[14px] py-[5px] rounded-full bg-[#f5f5f5] text-[#444]
                     border border-[#ebebeb] hover:bg-[#d4a843]/10 hover:border-[#d4a843]/40
                     hover:text-[#a07825] transition-all duration-200 cursor-default">
            {children}
        </span>
    );
}


// ── Props ───────────────────────────────────────────────
interface Props {
    onReplay: () => void;
}

export default function Portfolio({ onReplay }: Props) {
    return (
        <main className="min-h-screen max-w-[860px] mx-auto px-6 pb-32 pt-20" aria-label="Portfolio">

            {/* ── Replay slot icon (top-left, fixed) ──────── */}
            <button
                id="replay-btn"
                onClick={onReplay}
                title="Replay intro"
                aria-label="Replay slot machine intro"
                className="fixed top-6 left-6 z-50 w-11 h-11 rounded-[12px] flex items-center justify-center
                   bg-white/90 border border-[#d4a843]/30 backdrop-blur-sm
                   shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer
                   hover:scale-110 hover:-rotate-6 hover:shadow-[0_6px_24px_rgba(212,168,67,0.25)]
                   hover:border-[#d4a843]/60 transition-all duration-250"
            >
                <svg viewBox="0 0 34.88 31.75" className="w-[22px] h-[22px] overflow-visible">
                  <g fill="none" stroke="#b28732" strokeMiterlimit={10}>
                    <rect x="1.25" y="3.43" width="25.3" height="27.07" rx="7.72" ry="7.72" strokeWidth={2.5} />
                    <g strokeWidth={2.5}>
                      <rect x="5.93" y="9.2" width="15.94" height="6.09" rx="2.59" ry="2.59"/>
                      <line x1="11.19" y1="9.2" x2="11.19" y2="15.29"/>
                      <line x1="16.67" y1="9.2" x2="16.67" y2="15.29"/>
                    </g>
                    <path d="M26.55,16.26h5.49c.88,0,1.59.71,1.59,1.59v3.9c0,.88-.71,1.59-1.59,1.59h-5.49v-7.08h0Z" strokeWidth={2.5} />
                    <line x1="30.25" y1="16.26" x2="30.25" y2="3.43" strokeWidth={2.5} />
                    <circle cx="30.25" cy="2.35" r="1.12" strokeWidth={2.45} />
                  </g>
                </svg>
            </button>

            {/* ══ HERO BLOCK ════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="grid grid-cols-[auto_1fr] gap-10 items-start pb-12 border-b border-[#f0f0f0]
                   max-sm:grid-cols-1 max-sm:text-center"
                aria-label="About Plato Knyazev"
            >
                {/* Photo */}
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0
                        shadow-[0_0_0_3px_#fff,0_0_0_5px_rgba(212,168,67,0.35),0_16px_40px_rgba(0,0,0,0.12)]
                        max-sm:mx-auto">
                    <img src="/guy.webp" alt="Plato Knyazev" className="w-full h-full object-cover object-top" />
                </div>

                {/* Text */}
                <div>
                    <h1 className="font-['Playfair_Display',serif] text-[clamp(2rem,5vw,3rem)] font-bold
                         leading-[1.1] text-[#0a0a0a] tracking-[-0.02em]">
                        Plato Knyazev
                    </h1>

                    <span className="shimmer-text inline-block mt-2 text-[0.75rem] font-semibold
                           tracking-[0.22em] uppercase">
                        Creative Technologist / Technical Animator
                    </span>

                    <p className="mt-5 text-[0.95rem] leading-[1.75] text-[#444] max-w-[520px]">
                        I bridge the gap between static design and fully functional web experiences. I specialize in crafting premium 2D assets for the GameDev and iGaming industries, bringing them to life with high-performance UI animation, and building interactive web prototypes to prove they work perfectly in the browser.
                        <br /><br />
                        My core principle: A well-structured asset architecture (Vector to JSON) can improve web performance by 100% and save development time. I build production-ready motion assets that guarantee zero CPU bottlenecking and flawless 60 FPS across mobile browsers.
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2 mt-5">
                        {['ENG / RUS', 'UI MOTION', 'TECHNICAL ANIMATION', 'LOTTIE / JSON', 'IGAMING ASSETS'].map((tag) => (
                            <span key={tag}
                                className={[
                                    'text-[0.72rem] font-medium tracking-[0.1em] uppercase px-3.5 py-[5px]',
                                    'rounded-full border',
                                    tag === 'ENG / RUS'
                                        ? 'border-[#d4a843]/40 text-[#a07825] bg-[#d4a843]/06'
                                        : 'border-[#e8e8e8] text-[#555] bg-[#fafafa]',
                                ].join(' ')}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Contact link */}
                    <div className="mt-5">
                        <a href="https://platonknyazev.taplink.bio/" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium
                          text-[#c99a35] border-b border-dashed border-[#d4a843]/40
                          hover:text-[#a07825] hover:border-[#a07825] transition-colors duration-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            platonknyazev.taplink.bio
                        </a>
                    </div>
                </div>
            </motion.section>

            {/* ── Section label ── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#ccc] pt-8 pb-2"
            >
                Projects &amp; Skills
            </motion.p>

            {/* ══ Technical Animation Pipeline ══════════════ */}
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="border-b border-[#f0f0f0]"
            >
                {/* ── Header ── */}
                <div className="flex items-center gap-4 py-6 select-none">
                    {/* Icon chip */}
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 border border-[#d4a843]/30 bg-[#d4a843]/08 shadow-[0_4px_16px_rgba(212,168,67,0.12)]">
                        ⚙️
                    </div>
                    <div>
                        <p className="text-[1rem] font-semibold text-[#111] tracking-[-0.01em]">Technical Animation Pipeline</p>
                        <p className="text-[0.75rem] text-[#999] mt-0.5">Lottie · After Effects · Adobe Suite · JSON animation</p>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="pb-8">
                    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                        <ContentCard title="Clean Vector Topology (Illustrator)">
                            All assets are meticulously hand-drawn using minimal anchor points. Strict avoidance of auto-tracing or redundant paths ensures an ultra-lightweight baseline for Bodymovin compilation.
                        </ContentCard>
                        <ContentCard title="Physics-Based Rigging (After Effects)">
                            Bypassing linear keyframes to construct custom bezier curves (Value/Speed graphs). Complex reel animations are logically driven via Null objects to simulate realistic mechanical tension and weight.
                        </ContentCard>
                        <ContentCard title="Web-Native Optimization (Lottie)">
                            Relying strictly on vector flat shading and linear gradients. No heavy raster effects (glows/drop shadows) are used. The final JSON exports remain under 500KB, guaranteeing a 1:1 visual match with zero lag.
                        </ContentCard>
                        <ContentCard title="Live Prototyping (React/Web)">
                            Deploying interactive Lottie animations into real web environments. Integrating state-changes (hover, click to spin/open) to deliver fully functional MVPs ready for frontend implementation.
                        </ContentCard>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {['ADOBE AFTER EFFECTS', 'ADOBE ILLUSTRATOR', 'LOTTIE / BODYMOVIN', 'JSON ANIMATION', 'UI/UX MOTION'].map(s => <SkillPill key={s}>{s}</SkillPill>)}
                    </div>
                </div>
            </motion.article>

            {/* ── Footer ── */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-20 pt-8 border-t border-[#f0f0f0] text-center text-[0.78rem]
                   text-[#bbb] tracking-[0.05em]"
            >
                <p>© 2026 <span className="text-[#d4a843]">Plato Knyazev</span> — Creative Technologist</p>
                <p className="mt-1.5">
                    Languages: ENG · RUS &nbsp;|&nbsp;
                    <a href="https://platonknyazev.taplink.bio/" target="_blank" rel="noopener noreferrer"
                        className="text-[#c99a35] border-b border-dashed border-[#d4a843]/40 text-[0.76rem]
                        hover:text-[#a07825] hover:border-[#a07825] transition-colors duration-200">
                        platonknyazev.taplink.bio
                    </a>
                </p>
            </motion.footer>

        </main>
    );
}
