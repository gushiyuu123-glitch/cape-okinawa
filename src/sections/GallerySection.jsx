import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const gridRef = useRef(null);

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

  /* =========================
     Animation
  ========================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, leadRef.current],
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

const items = gridRef.current?.querySelectorAll("[data-photo]");
if (!items?.length) return;

items.forEach((item, i) => {
  const isEven = i % 2 === 0;

  gsap.fromTo(
    item,
    {
      opacity: 0,
      y: 20,
      x: isEven ? -6 : 6,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
    }
  );
});


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ESC close */
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f6f3ee] py-[22vh]">
      {/* =========================
          Heading
      ========================= */}
      <h2
        ref={titleRef}
        className="
          text-center
          text-[11px]
          tracking-[0.42em]
          text-[#3a3a3a]/55
          mb-[6vh]
        "
      >
        GALLERY
      </h2>

      <p
        ref={leadRef}
        className="
          max-w-[720px]
          mx-auto
          text-center
          text-[13px]
          leading-[2.4]
          tracking-[0.14em]
          text-[#3a3a3a]/60
          mb-[12vh]
          px-6
        "
      >
        写真は、少しだけ笑っている。
        <br />
        ここで過ごした時間みたいに。
      </p>

      {/* =========================
          PC : pop grid
      ========================= */}
<div
  ref={gridRef}
  className="
    hidden md:flex
    flex-col
    gap-[14vh]
    max-w-[1100px]
    mx-auto
    px-6
  "
>
  {[
    {
      img: images[0],
      text: "風の音だけが、\n先に届いていた。",
    },
    {
      img: images[2],
      text: "いつの間にか、\n時間を忘れていた。",
    },
    {
      img: images[3],
      text: "コーヒーの温度と、\n午後の光。",
    },
    {
      img: images[5],
      text: "帰り道だけが、\n少し静かだった。",
    },
  ].map((item, i) => (
    <div
      key={item.img.src}
      className={`
        flex
        ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}
        items-start
        gap-10
      `}
    >
      {/* 写真 */}
      <Photo
        img={item.img}
        onClick={setActive}
        className="
          w-[68%]
          rounded-[26px]
        "
      />

      {/* テキスト */}
      <p
        className="
          max-w-[18ch]
          text-[13px]
          leading-[2.4]
          tracking-[0.14em]
          text-[#3a3a3a]/55
          whitespace-pre-line
          translate-y-[18px]
        "
      >
        {item.text}
      </p>
    </div>
  ))}
</div>

{/* =========================
    SP : vertical flow gallery
========================= */}
<div
  ref={gridRef}
  className="
    md:hidden
    flex flex-col
    gap-12
    px-6
  "
>
  {images.map((img, i) => (
    <Photo
      key={img.src}
      img={img}
      onClick={setActive}
      className={[
        "w-full",
        i % 2 === 0
          ? "rounded-[26px] translate-x-[-4px]"
          : "rounded-[18px] translate-x-[4px]",
      ].join(" ")}
    />
  ))}
</div>

      {/* =========================
          Lightbox
      ========================= */}
      {active && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/55
            backdrop-blur-[6px]
            flex items-center justify-center
            px-6
          "
          onClick={() => setActive(null)}
        >
          <div
            className="
              relative
              max-w-[1100px] w-full
              bg-white
              rounded-[26px]
              shadow-[0_40px_120px_rgba(0,0,0,0.45)]
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10]">
              <img
                src={active.src}
                alt={active.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/15 mix-blend-soft-light" />
            </div>

            <div className="px-6 py-5 flex items-center justify-between">
              <p className="text-[12px] tracking-[0.16em] text-[#3a3a3a]/70">
                {active.alt}
              </p>
              <button
                onClick={() => setActive(null)}
                className="
                  text-[11px]
                  tracking-[0.22em]
                  text-[#3a3a3a]/55
                  hover:text-[#3a3a3a]
                  transition-colors
                "
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================
   Photo : pop style
========================= */
function Photo({ img, onClick, className = "" }) {
  return (
    <button
      type="button"
      data-photo
      onClick={() => onClick(img)}
      className={[
        "relative overflow-hidden bg-[#e6e3df]",
        "shadow-[0_14px_40px_rgba(0,0,0,0.12)]",
        "transition-all duration-[500ms] ease-out",
        "hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
      aria-label={img.alt}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="
          w-full h-full object-cover
          transition-transform duration-[900ms]
          hover:scale-[1.06]
        "
      />

      {/* pop光 */}
      <div
        className="
          absolute inset-0
          opacity-0 hover:opacity-100
          transition-opacity duration-[600ms]
          bg-gradient-to-tr
          from-white/0
          via-white/20
          to-white/30
          pointer-events-none
        "
      />
    </button>
  );
}
