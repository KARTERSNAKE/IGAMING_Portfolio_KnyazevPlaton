/**
 * CasinoDecor.tsx
 * Renders elegant, non-distracting ambient casino background:
 *  - Soft gold / champagne glow orbs
 *  - Subtle floating SVG poker chips
 * All elements are purely decorative and pointer-events: none.
 */

const CHIPS = [
    { size: 52, x: '8%', y: '15%', delay: '0s', duration: '7s', opacity: 0.22 },
    { size: 38, x: '88%', y: '10%', delay: '1.2s', duration: '9s', opacity: 0.18 },
    { size: 44, x: '5%', y: '72%', delay: '2.1s', duration: '8s', opacity: 0.20 },
    { size: 36, x: '91%', y: '68%', delay: '0.7s', duration: '11s', opacity: 0.16 },
    { size: 28, x: '75%', y: '85%', delay: '3.3s', duration: '6s', opacity: 0.14 },
    { size: 42, x: '18%', y: '88%', delay: '1.8s', duration: '10s', opacity: 0.19 },
    { size: 32, x: '50%', y: '6%', delay: '2.7s', duration: '8.5s', opacity: 0.15 },
];

/** Simple SVG poker chip */
function PokerChip({ size, color = '#c99a35' }: { size: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            {/* Outer ring */}
            <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="5" />
            {/* Dashed inner ring */}
            <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="3" strokeDasharray="12 6" />
            {/* Center fill */}
            <circle cx="50" cy="50" r="24" fill={color} fillOpacity="0.18" />
            {/* Tick marks */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                    <line
                        key={angle}
                        x1={50 + 38 * Math.cos(rad)}
                        y1={50 + 38 * Math.sin(rad)}
                        x2={50 + 46 * Math.cos(rad)}
                        y2={50 + 46 * Math.sin(rad)}
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                );
            })}
        </svg>
    );
}

export default function CasinoDecor() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

            {/* ── Soft ambient glow orbs ── */}
            <div
                className="casino-orb absolute"
                style={{
                    width: 480, height: 480, top: '-120px', left: '-160px',
                    background: 'radial-gradient(circle, rgba(212,168,67,0.09) 0%, transparent 70%)'
                }}
            />
            <div
                className="casino-orb absolute"
                style={{
                    width: 400, height: 400, bottom: '-100px', right: '-120px',
                    background: 'radial-gradient(circle, rgba(201,154,53,0.08) 0%, transparent 70%)'
                }}
            />
            <div
                className="casino-orb absolute"
                style={{
                    width: 320, height: 320, top: '40%', left: '60%',
                    background: 'radial-gradient(circle, rgba(232,192,96,0.06) 0%, transparent 70%)'
                }}
            />

            {/* ── Floating poker chips ── */}
            {CHIPS.map((chip, i) => (
                <div
                    key={i}
                    className="floating-chip absolute"
                    style={{
                        left: chip.x,
                        top: chip.y,
                        opacity: chip.opacity,
                        '--duration': chip.duration,
                        animationDelay: chip.delay,
                    } as React.CSSProperties}
                >
                    <PokerChip size={chip.size} />
                </div>
            ))}

            {/* ── Subtle grid lines (luxury texture) ── */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.025]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c99a35" strokeWidth="0.8" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
}
