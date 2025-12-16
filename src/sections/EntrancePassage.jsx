import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EntrancePassage() {
  const sectionRef = useRef(null);

  // ===== PC refs =====
  const imageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const subLeftImgRef = useRef(null);
  const subRightImgRef = useRef(null);

  // ===== SP refs =====
  const spMainImgRef = useRef(null);
  const spSubImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         PC animations
      ========================= */
      if (window.innerWidth >= 768) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        tl.fromTo(
          leftTextRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
          .fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.985 },
            { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
            "-=0.35"
          )
          .fromTo(
            rightTextRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          );

        gsap.fromTo(
          subLeftImgRef.current,
          { opacity: 0, y: 14, scale: 0.97 },
          {
            opacity: 0.82,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
            },
          }
        );

        gsap.fromTo(
          subRightImgRef.current,
          { opacity: 0, y: -14, scale: 0.97 },
          {
            opacity: 0.78,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 45%",
            },
          }
        );
      }

      /* =========================
         SP animations
      ========================= */
      if (window.innerWidth < 768) {
        gsap.fromTo(
          spMainImgRef.current,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        gsap.fromTo(
          spSubImgRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 0.8,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f6f3ee]">
      {/* =================================================
          PC
      ================================================= */}
      <div className="hidden md:block py-[26vh]">
        <h2 className="absolute top-[10vh] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.45em] text-[#3a3a3a]/55">
          ENTRANCE PASSAGE
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left text */}
          <p
            ref={leftTextRef}
            className="absolute right-[calc(50%+22vw)] top-[10%] max-w-[220px] text-[13px] leading-[2.25] tracking-[0.14em] text-[#3a3a3a]/75"
          >
            <span className="text-[#2f2f2f]/90">風が、ほんの少し変わる。</span>
            <br />
            そのことに気づくのは、
            <br />
            扉をくぐってから。
            <br />
            <br />
            足音は、いつのまにか遠くなり、
            <br />
            外の時間が、
            <br />
            背中の向こうへほどけていく。
          </p>

          {/* Main image */}
          <div
            ref={imageRef}
            className="relative w-[26vw] min-w-[300px] aspect-[3/5] bg-cover bg-center z-10"
            style={{ backgroundImage: "url(/images/entrance-vertical.png)" }}
          />

          {/* Sub images */}
          <div
            ref={subLeftImgRef}
            className="absolute left-[15vw] bottom-[5%] w-[230px] aspect-[4/3] bg-cover bg-center rounded-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
            style={{
              backgroundImage: "url(/images/entrance-sub-right1.png)",
              transform: "rotate(-1.2deg)",
            }}
          />

          <div
            ref={subRightImgRef}
            className="absolute right-[18vw] top-[10%] w-[200px] aspect-[3/4] bg-cover bg-center rounded-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
            style={{
              backgroundImage: "url(/images/entrance-sub-right.png)",
              transform: "rotate(1deg)",
            }}
          />

          {/* Right text */}
          <p
            ref={rightTextRef}
            className="absolute left-[calc(50%+22vw)] bottom-[10%] max-w-[220px] text-[13px] leading-[2.25] tracking-[0.14em] text-[#3a3a3a]/75 text-right"
          >
            白い壁に、午後の影。
            <br />
            その隙間から、ひらける光。
            <br />
            <br />
            通路の先にあるのは、
            <br />
            名前のない青と、
            <br />
            静かな時間だけ。
          </p>
        </div>
      </div>

      {/* =================================================
          SP
      ================================================= */}
      <div className="md:hidden py-[20vh] px-6 relative overflow-hidden">
        <h2 className="text-center text-[11px] tracking-[0.42em] text-[#3a3a3a]/55 mb-[10vh]">
          ENTRANCE PASSAGE
        </h2>

        <p className="mx-auto mb-[12vh] max-w-[26ch] text-center text-[13px] leading-[2.1] tracking-[0.14em] text-[#3a3a3a]/75">
          <span className="text-[#2f2f2f]/90">風が、ほんの少し変わる。</span>
          <br />
          扉をくぐった、その瞬間から。
        </p>

        <div
          ref={spMainImgRef}
          className="mx-auto w-[72%] aspect-[3/5] bg-cover bg-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
          style={{ backgroundImage: "url(/images/entrance-vertical.png)" }}
        />

        <p className="mx-auto mt-[12vh] max-w-[28ch] text-center text-[13px] leading-[2.2] tracking-[0.14em] text-[#3a3a3a]/70">
          足音は、いつのまにか遠くなり、
          <br />
          外の時間が、
          <br />
          背中の向こうへほどけていく。
        </p>

        <div
          ref={spSubImgRef}
          className="absolute right-[8vw] bottom-[3vh] w-[130px] aspect-[4/3] bg-cover bg-center rounded-[2px] opacity-80 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          style={{
            backgroundImage: "url(/images/entrance-sub-right.png)",
            transform: "rotate(1.2deg)",
          }}
        />
      </div>
    </section>
  );
}
