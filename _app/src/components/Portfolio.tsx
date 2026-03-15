/**
 * Portfolio.tsx
 * Main portfolio page: hero block + 3 accordion sections.
 * Animated entrance via Framer Motion.
 */

import { motion } from 'framer-motion';
import Accordion from './Accordion';

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

function TechTag({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-block text-[0.68rem] font-semibold tracking-[0.1em] uppercase
                     px-[10px] py-[3px] rounded-[6px] bg-white/8 text-white/55
                     border border-white/10 mr-1 mt-1">
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
                    <img src="/photo.png" alt="Plato Knyazev" className="w-full h-full object-cover object-top" />
                </div>

                {/* Text */}
                <div>
                    <h1 className="font-['Playfair_Display',serif] text-[clamp(2rem,5vw,3rem)] font-bold
                         leading-[1.1] text-[#0a0a0a] tracking-[-0.02em]">
                        Plato Knyazev
                    </h1>

                    <span className="shimmer-text inline-block mt-2 text-[0.75rem] font-semibold
                           tracking-[0.22em] uppercase">
                        Creative Technologist
                    </span>

                    <p className="mt-5 text-[0.95rem] leading-[1.75] text-[#444] max-w-[520px]">
                        I work at the intersection of{' '}
                        <strong className="text-[#111] font-semibold">AI-assisted development</strong>{' '}
                        and creative engineering. Operating in next-generation multi-agent IDEs like{' '}
                        <strong className="text-[#111] font-semibold">Google Antigravity</strong>, I delegate
                        routine code to agents while maintaining architectural oversight — validating every
                        output for security vulnerabilities before it ships to production.
                        <br /><br />
                        My core principle:{' '}
                        <strong className="text-[#111] font-semibold">a well-structured prompt</strong>{' '}
                        (backed by a MindMap) can improve AI output quality by 20–40% and save a product.
                        I build automation systems for personal and business use — and I take cybersecurity
                        seriously: <em>"measure seven times, cut once."</em>
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2 mt-5">
                        {['ENG / RUS', 'AI Dev', 'Automation', 'Creative Tech', 'Content'].map((tag) => (
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

            {/* ══ ACCORDION 1: AI & Data Engineering ═══════ */}
            <Accordion icon="🧠" title="AI & Data Engineering"
                subtitle="Prompt architecture · LLMs · Agent workflows" delay={0.1}>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <ContentCard title="Prompt Engineering">
                        I craft clear, structured prompts backed by architectural MindMaps before any agent
                        interaction. Asking models to <em>justify</em> their reasoning reduces hallucinations
                        and improves code quality by <strong>20–40%</strong>.
                    </ContentCard>
                    <ContentCard title="Multi-Agent IDE">
                        I operate inside next-generation multi-agent environments (Google Antigravity),
                        delegating routine code generation to agents while performing detailed architectural
                        review before pushing to production.
                    </ContentCard>
                    <ContentCard title="Security-First Dev">
                        Every piece of AI-generated code is reviewed for security vulnerabilities. I build
                        sites that survive production — robust and cybersecure.
                        <em> "Measure seven times, cut once."</em>
                    </ContentCard>
                    <ContentCard title="Workflow & Automation">
                        I design autonomous systems for routine tasks — personal and business-facing.
                        Architectural thinking + agent expertise = production systems that scale.
                    </ContentCard>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {['Python 3.10+', 'OpenAI API', 'LLM Agents', 'Prompt Design', 'MindMapping', 'Aiohttp / Async', 'Cybersecurity'].map(s => <SkillPill key={s}>{s}</SkillPill>)}
                </div>
            </Accordion>

            {/* ══ ACCORDION 2: Creative Tech & Content ═════ */}
            <Accordion icon="🎨" title="Creative Tech & Content"
                subtitle="Lottie · After Effects · Adobe Suite · JSON animation" delay={0.2}>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <ContentCard title="After Effects → Lottie">
                        I animate in AE using acceleration plugins, then export to JSON via{' '}
                        <strong>Bodymovin</strong>. Lightweight, premium animations embedded directly
                        into the web — zero bloat.
                    </ContentCard>
                    <ContentCard title="Brand Design">
                        In Illustrator: sites, apps, logos, brandbooks — constructed on the{' '}
                        <strong>golden ratio</strong>. Mathematical precision = visual recognition.
                    </ContentCard>
                    <ContentCard title="Video Production">
                        Premiere Pro for vertical &amp; horizontal content. Fast, dynamic,
                        memorable — engineered for social-media virality in 2026's attention economy.
                    </ContentCard>
                    <ContentCard title="Photoshop & Raster">
                        Retouching, object removal, image quality enhancement — full raster workflow
                        to complement vector and motion deliverables.
                    </ContentCard>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {['Adobe AE', 'Illustrator', 'Premiere Pro', 'Photoshop', 'Lottie / Bodymovin', 'JSON Animation', 'Golden Ratio', 'Social Content'].map(s => <SkillPill key={s}>{s}</SkillPill>)}
                </div>
            </Accordion>

            {/* ══ ACCORDION 3: OpenClaw Pipeline ═══════════ */}
            <Accordion icon="⚙️" title="OpenClaw Content Pipeline"
                subtitle="Microservices · AI Judge · Zero-Downtime · Self-Healing" delay={0.3}>
                {/* Dark flagship card */}
                <div className="relative rounded-2xl overflow-hidden p-7"
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                        border: '1px solid rgba(212,168,67,0.2)'
                    }}>
                    {/* Ambient orb */}
                    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)' }} />

                    <span className="inline-block text-[0.65rem] font-bold tracking-[0.2em] uppercase
                           px-3 py-1 rounded-full border border-[#d4a843]/30
                           bg-[#d4a843]/15 text-[#d4a843] mb-3.5">
                        🚀 Flagship Project
                    </span>

                    <h2 className="font-['Playfair_Display',serif] text-[1.35rem] font-bold text-white
                         mb-3.5 tracking-[-0.01em]">
                        OpenClaw — Automated Content Conveyor
                    </h2>

                    <p className="text-[0.87rem] leading-[1.7] text-white/65 mb-4">
                        A fully autonomous Montage + Publishing pipeline built as a microservice ecosystem,
                        controllable by external LLM agents via a clean API "skill" interface.
                        Designed for zero-downtime, self-healing operation.
                    </p>

                    {[
                        ['Microservices (MCP)', 'Designed a full API architecture. Integrates as a ready-made "skill" for control via external LLM agents.'],
                        ['100% Automation (AI Judge)', 'Integrated OpenAI Vision for autonomous asset moderation — completely eliminating manual review labour.'],
                        ['Algorithmic SEO', 'LLM-generated unique metadata for safe YouTube scaling and spam-filter evasion.'],
                        ['Zero-Downtime (Self-Healing)', 'AI log processor that autonomously resolves failures — clears memory, restarts renders — without human intervention.'],
                    ].map(([label, desc]) => (
                        <div key={label} className="flex items-start gap-2.5 mb-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#d4a843] flex-shrink-0 mt-[7px]" />
                            <p className="text-[0.85rem] leading-[1.5] text-white/75">
                                <strong className="text-[#e8c060]">{label}:</strong> {desc}
                            </p>
                        </div>
                    ))}

                    {/* Stack tags */}
                    <div className="mt-5 pt-4 border-t border-white/08">
                        <p className="text-[0.68rem] font-bold tracking-[0.15em] uppercase text-white/30 mb-2.5">Stack</p>
                        {['Python 3.10+', 'Aiogram', 'Deemix (pip)', 'Aiohttp', 'Playwright', 'OpenAI Vision', 'YouTube API', 'Subprocess Async', 'Self-Healing Logs'].map(t => <TechTag key={t}>{t}</TechTag>)}
                    </div>
                </div>
            </Accordion>

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
