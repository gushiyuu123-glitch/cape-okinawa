import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const pcGridRef = useRef(null);
  const spGridRef = useRef(null);
  const [active, setActive] = useState(null);

  const images = useMemo(
    () => [
      { src: "/images/gallery-01.png", alt: "海へ続く小径" },
      { src: "/images/gallery-02.png", alt: "白い壁と影" },
      { src: "/images/gallery-03.png", alt: "窓辺の席" },
      { src: "/images/gallery-04.png", alt: "グラスと光" },
      { src: "/images/gallery-05.png", alt: "入口の気配" },
      { src: "/images/gallery-06.png", alt: "青の余韻" },
    ],
    []
  );

  // 画像ロード後 refresh（保険）
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll("img"));
    if (!imgs.length) return;

    let done = 0;
    const onDone = () => {
      done++;
      if (done >= imgs.length) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 120);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) onDone();
      else img.addEventListener("load", onDone, { once: true });
    });

    return () => imgs.forEach((img) => img.removeEventListener("load", onDone));
  }, []);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // 見出しは共通（PC/SPどっちでも）
      gsap.fromTo(
        [titleRef.current, leadRef.current],
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        }
      );

      // ✅ PCだけ
      mm.add("(min-width: 768px)", () => {
        const items = pcGridRef.current?.querySelectorAll("[data-photo]");
        if (!items?.length) return;

        items.forEach((item, i) => {
          const isEven = i % 2 === 0;
          gsap.fromTo(
            item,
            { opacity: 0, y: 24, x: isEven ? -10 : 10 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      });

      // ✅ SPだけ
      mm.add("(max-width: 767px)", () => {
        const items = spGridRef.current?.querySelectorAll("[data-photo]");
        if (!items?.length) return;

        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 18, x: i % 2 === 0 ? -6 : 6 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      });

      // ここで一回だけrefresh
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative bg-[#f6f3ee] py-[22vh]">
      <h2
        ref={titleRef}
        className="text-center text-[11px] tracking-[0.42em] text-[#3a3a3a]/55 mb-[6vh]"
      >
        GALLERY
      </h2>

      <p
        ref={leadRef}
        className="max-w-[720px] mx-auto text-center text-[13px] leading-[2.4] tracking-[0.14em] text-[#3a3a3a]/60 mb-[12vh] px-6"
      >
        写真は、少しだけ笑っている。
        <br />
        ここで過ごした時間みたいに。
      </p>

      {/* PC */}
      <div
        ref={pcGridRef}
        className="hidden md:flex flex-col gap-[14vh] max-w-[1100px] mx-auto px-6"
      >
        {[0, 2, 3, 5].map((idx, i) => (
          <div
            key={images[idx].src}
            className={`flex ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-start gap-10`}
          >
            <Photo img={images[idx]} onClick={setActive} className="w-[68%] rounded-[26px]" />
          </div>
        ))}
      </div>

      {/* SP */}
      <div ref={spGridRef} className="md:hidden flex flex-col gap-12 px-6">
        {images.map((img) => (
          <Photo key={img.src} img={img} onClick={setActive} className="w-full rounded-[22px]" />
        ))}
      </div>
    </section>
  );
}

function Photo({ img, onClick, className = "" }) {
  return (
    <button
      type="button"
      data-photo
      onClick={() => onClick(img)}
      className={`relative overflow-hidden bg-[#e6e3df] shadow-[0_14px_40px_rgba(0,0,0,0.12)] ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </button>
  );
}
