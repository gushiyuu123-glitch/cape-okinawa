import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!footerRef.current?.children?.length) return;

      gsap.fromTo(
        footerRef.current.children,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        bg-[#f6f3ee]
        pt-[18vh]
        pb-[12vh]
        text-center
      "
    >
      {/* 余韻コピー */}
      <p
        className="
          text-[12px]
          leading-[2.4]
          tracking-[0.18em]
          text-[#3a3a3a]/55
          mb-14
        "
      >
        また、風の静かな日に。
      </p>

      {/* ブランド署名 */}
      <p
        className="
          text-[11px]
          tracking-[0.32em]
          text-[#3a3a3a]/45
          mb-4
        "
      >
        CAPE. OKINAWA
      </p>

      {/* Gushiken Design リンク（控えめ + 上質） */}
      <a
        href="https://gushikendesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-[10px]
          tracking-[0.28em]
          text-[#3a3a3a]/40
          hover:text-[#3a3a3a]/70
          transition-colors
          duration-500
        "
      >
        © 2025 GUSHIKEN DESIGN — Portfolio
      </a>
    </footer>
  );
}
