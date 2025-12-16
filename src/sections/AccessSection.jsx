import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AccessSection() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 写真 */
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      /* テキスト */
      if (textRef.current?.children?.length) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="access"
      className="bg-[#f6f3ee] py-[20vh]"
    >
      {/* =========================
          Title
      ========================= */}
      <h2 className="text-center text-[11px] tracking-[0.45em] text-[#3a3a3a]/55 mb-[14vh]">
        ACCESS
      </h2>

      {/* =========================
          PC
      ========================= */}
      <div className="hidden md:grid max-w-none mx-auto grid-cols-12">
        {/* 写真 */}
        <div className="md:-ml-[6vw] md:col-span-7">
          <div
            ref={photoRef}
            className="aspect-[16/10] overflow-hidden"
          >
            <img
              src="/images/access-cape.png"
              alt="Cafe exterior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* テキスト */}
        <div
          ref={textRef}
          className="md:col-span-5 px-10 flex items-center"
        >
          <div className="text-[13px] leading-[2.4] tracking-[0.14em] text-[#3a3a3a]/70">
            <p className="mb-8">
              旅の終わりに、<br />
              ふと思い出してもらえたら。
            </p>

            <p className="mb-6">
              〒000-0000<br />
              沖縄県〇〇市〇〇町 0-0-0
            </p>

            <p className="mb-8">
              Open 10:00 – 18:00<br />
              Closed on Wednesday
            </p>

            <p className="text-[11px] tracking-[0.28em] text-[#3a3a3a]/45">
              CAPE. OKINAWA
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          SP
      ========================= */}
      <div className="md:hidden px-6">
        {/* 写真 */}
        <div
          ref={photoRef}
          className="
            w-full
            aspect-[4/3]
            overflow-hidden
            rounded-[14px]
            mb-12
          "
        >
          <img
            src="/images/access-cape.png"
            alt="Cafe exterior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* テキスト */}
        <div
          ref={textRef}
          className="text-[13px] leading-[2.2] tracking-[0.14em] text-[#3a3a3a]/70"
        >
          <p className="mb-8">
            旅の終わりに、<br />
            ふと思い出してもらえたら。
          </p>

          <p className="mb-6">
            〒000-0000<br />
            沖縄県〇〇市〇〇町 0-0-0
          </p>

          <p className="mb-8">
            Open 10:00 – 18:00<br />
            Closed on Wednesday
          </p>

          <p className="text-[11px] tracking-[0.28em] text-[#3a3a3a]/45">
            CAPE. OKINAWA
          </p>
        </div>
      </div>
    </section>
  );
}
