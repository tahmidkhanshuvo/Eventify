import React from "react";

export default function BackgroundFX() {
  return (
    <>
      {/* base gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />

      {/* soft moving blobs */}
      <div className="pointer-events-none absolute -top-44 -left-36 h-[40rem] w-[40rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />

      {/* rotating conic sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(125,157,210,0.25),transparent_30%,rgba(63,195,177,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* animated vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />

      <style jsx global>{`
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(22px, -12px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-slower {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 10px) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes rotate-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 16s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 26s ease-in-out infinite; }
        .animate-rotate-slower { animation: rotate-slower 40s linear infinite; }
      `}</style>
    </>
  );
}

