/**
 * Accordion.tsx
 * Smooth expand/collapse via Framer Motion layout animations.
 * Chevron rotates 180° when open.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
    icon: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    delay?: number;
}

export default function Accordion({ icon, title, subtitle, children, delay = 0 }: AccordionProps) {
    const [open, setOpen] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className="border-b border-[#f0f0f0]"
        >
            {/* ── Header ── */}
            <div
                role="button"
                aria-expanded={open}
                tabIndex={0}
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(!open)}
                className="flex items-center justify-between py-6 cursor-pointer select-none
                   hover:opacity-70 transition-opacity duration-200 gap-4"
            >
                <div className="flex items-center gap-4">
                    {/* Icon chip */}
                    <div className={[
                        'w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0',
                        'border transition-all duration-300',
                        open
                            ? 'border-[#d4a843]/30 bg-[#d4a843]/08 shadow-[0_4px_16px_rgba(212,168,67,0.12)]'
                            : 'border-[#f0f0f0] bg-[#fafafa]',
                    ].join(' ')}>
                        {icon}
                    </div>
                    <div>
                        <p className="text-[1rem] font-semibold text-[#111] tracking-[-0.01em]">{title}</p>
                        <p className="text-[0.75rem] text-[#999] mt-0.5">{subtitle}</p>
                    </div>
                </div>

                {/* Chevron */}
                <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    viewBox="0 0 24 24" fill="none"
                    stroke={open ? '#c99a35' : '#bbb'}
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    className="w-[22px] h-[22px] flex-shrink-0"
                >
                    <polyline points="6 9 12 15 18 9" />
                </motion.svg>
            </div>

            {/* ── Collapsible body ── */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="pb-8">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}
