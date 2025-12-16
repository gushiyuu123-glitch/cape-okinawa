import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const scenes = [
  {
    image: "/images/sea-morning.png",
    text: "朝の光が、\n海に溶けていた。",
    textColor: "text-[#3a3a3a]/70",
    veil: "bg-gradient-to-b from-white/5 via-white/0 to-white/10",
  },
  {
    image: "/images/sea-evening.png",
    text: "何もしない午後が、\nいちばん贅沢だった。",
    textColor: "text-[#3a2f26]/70",
    veil: "bg-gradient-to-b from-[#f6f3ee]/5 via-transparent to-[#f6f3ee]/10",
  },
  {
    image: "/images/sea-night.png",
    text: "夜は、\n時間の音がいちばん静か。",
    textColor: "text-[#f2f2f2]/75",
    veil: "bg-gradient-to-b from-black/20 via-black/10 to-black/25",
  },
];

export default function StaySectionPop() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const [index, setIndex] = useState(0);

  /* =========================
     シーン切り替え（6秒）
  ========================= */
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  /* =========================
     フェード & 呼吸
  ========================= */
  useEffect(() => {
    if (!bgRef.current || !textRef.current) return;

    gsap.killTweensOf([bgRef.current, textRef.current]);

    // 背景フェード
    gsap.fromTo(
      bgRef.current,
      { opacity: 0, filter: "blur(14px)", scale: 1.08 },
      {
        opacity: 0.55,
        filter: "blur(8px)",
        scale: 1.05,
        duration: 1.6,
        ease: "power2.out",
      }
    );

    // 呼吸（ループ）
    gsap.to(bgRef.current, {
      scale: 1.07,
      duration: 6,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // テキスト
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: 0.15,
      }
    );
  }, [index]);

  const scene = scenes[index];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[90vh]
        flex items-center justify-center
        overflow-hidden
        bg-[#f6f3ee]
      "
    >
      {/* =========================
          背景
      ========================= */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scene.image})` }}
        />
        <div className={`absolute inset-0 ${scene.veil}`} />
      </div>

      {/* =========================
          コピー
      ========================= */}
      <p
        ref={textRef}
        className={`
          relative z-10
          px-6
          text-[20px] sm:text-[22px] md:text-[26px]
          leading-[1.8]
          tracking-[0.12em]
          font-light
          text-center
          whitespace-pre-line
          ${scene.textColor}
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]
        `}
      >
        {scene.text}
      </p>
    </section>
  );
}
