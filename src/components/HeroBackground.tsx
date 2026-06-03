import ParticlesBackground from "@/components/ParticlesBackground";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030303]" aria-hidden>
      <div className="aurora-curtain aurora-curtain-1 absolute inset-0" />
      <div className="aurora-curtain aurora-curtain-2 absolute inset-0" />
      <div className="aurora-curtain aurora-curtain-3 absolute inset-0" />

      <div className="aurora-orb aurora-orb-1 absolute -top-[10%] left-[10%] h-[55vh] w-[55vh] rounded-full bg-[#70ffd8] blur-[100px]" />
      <div className="aurora-orb aurora-orb-2 absolute top-[5%] right-[5%] h-[50vh] w-[50vh] rounded-full bg-[#38bdf8] blur-[110px]" />
      <div className="aurora-orb aurora-orb-3 absolute top-[30%] left-[25%] h-[45vh] w-[65vw] rounded-full bg-[#5eead4] blur-[120px]" />

      <div className="aurora-beam absolute inset-x-0 top-0 h-[70vh]" />

      <ParticlesBackground />
      <div className="hero-grid absolute inset-0 z-[2]" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-[40vh] bg-gradient-to-t from-teal-950/25 via-blue-950/10 to-transparent" />
      <div className="hero-noise absolute inset-0 z-[3] opacity-[0.04]" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_20%,#030303_80%)]" />
    </div>
  );
}
