import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VerticalNav from "./VerticalNav";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 背景：縦パララックス（空気） */
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      /* 背景：呼吸（超微） */
      gsap.to(bgRef.current, {
        scale: 1.06,
        duration: 10,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      /* コピー：ふわっと置かれる */
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 10, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* =========================
          PC
      ========================= */}
      <div className="hidden md:block">
        <div className="relative h-[100vh] min-h-[680px]">
          {/* Background */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/cafe-hero.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          />

          {/* Veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/45" />

          {/* Top info */}
          <div className="absolute top-7 left-[7vw] z-10 font-ui text-[12px] tracking-wide text-white/65">
            Open 10:00 – 18:00
          </div>

          {/* Copy */}
          <div
            ref={copyRef}
            className="absolute left-[7vw] bottom-[6vh] z-10 max-w-[36ch]"
          >
            <p className="font-en text-[11px] tracking-[0.45em] uppercase text-white/80">
              CAPE. OKINAWA
            </p>

            <h1 className="mt-3 font-jp text-[44px] leading-[1.12] tracking-wide text-white">
              海を眺めて、
              <br />
              コーヒーを。
            </h1>

            <p className="mt-5 font-ui text-sm leading-relaxed text-white/85">
              旅の途中でも、いつもの午後でも。
              風が通るテラスで、静かに一杯。
            </p>

            <div className="mt-7">
              <a
                href="#menu"
                className="
                  group inline-flex items-center gap-3
                  text-sm tracking-wide text-white/85
                  transition-transform duration-300
                  hover:translate-x-[2px]
                "
              >
                View menu
                <span
                  className="
                    inline-block h-[1px] w-10
                    bg-white/55
                    transition-all duration-500
                    group-hover:w-14
                    group-hover:bg-white/80
                  "
                />
              </a>
            </div>
          </div>

          {/* Vertical Nav */}
          <VerticalNav />

          {/* Scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-white/55 animate-[fade_4s_ease-in-out_infinite]">
              <span>SCROLL</span>
              <span className="h-10 w-[1px] bg-white/35" />
            </div>
          </div>
        </div>
      </div>
{/* =========================
    SP — Hero (Final)
========================= */}
<div className="md:hidden">
  <div className="relative min-h-[100svh] overflow-hidden">
    {/* Background */}
    <div
      ref={bgRef}
      className="absolute inset-0 scale-[1.08] will-change-transform"
      style={{
        backgroundImage: "url(/images/cafe-hero.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    />

    {/* Veil（SPは光を残す） */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/18 to-black/55" />

    {/* Top Info */}
    <div className="absolute top-8 left-6 z-10 font-ui text-[11px] tracking-wide text-white/70">
      Open 10:00 – 18:00
    </div>

    {/* Copy */}
    <div
      ref={copyRef}
      className="
        relative z-10
        px-6
        pt-[36svh]
        text-center
      "
    >
      <p className="font-en text-[10px] tracking-[0.45em] uppercase text-white/75">
        CAPE. OKINAWA
      </p>

      <h1 className="mt-4 font-jp text-[32px] leading-[1.2] tracking-[0.04em] text-white">
        海を眺めて、<br />
        コーヒーを。
      </h1>

      <p className="mt-5 font-ui text-[12px] leading-[1.85] text-white/80">
        旅の途中でも、<br />
        いつもの午後でも。
      </p>
    </div>

    {/* Scroll Hint */}
    <div
      className="
        absolute bottom-7 left-1/2
        -translate-x-1/2
        z-10
      "
    >
      <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-white/55">
        <span>SCROLL</span>
        <span className="h-9 w-[1px] bg-white/35" />
      </div>
    </div>
  </div>
</div>

    </section>
  );
}
