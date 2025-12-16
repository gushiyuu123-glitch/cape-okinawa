import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const afterPhotoRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Title */
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      /* Menu list */
      if (listRef.current?.children?.length) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }

      /* After photo */
      if (afterPhotoRef.current) {
        gsap.fromTo(
          afterPhotoRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: afterPhotoRef.current,
              start: "top 75%",
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
      id="menu"
      className="bg-[#f6f3ee] py-[24vh]"
    >
      {/* =========================
          Title
      ========================= */}
      <h2
        ref={titleRef}
        className="
          text-center
          text-[11px]
          tracking-[0.45em]
          text-[#3a3a3a]/55
          mb-[10vh]
        "
      >
        MENU
      </h2>

      {/* =========================
          Content
      ========================= */}
      <div className="max-w-[760px] mx-auto px-6">
        {/* ===== COFFEE ===== */}
        <div className="mb-[12vh]">
          <p className="text-[11px] tracking-[0.32em] text-[#3a3a3a]/45 mb-4">
            COFFEE
          </p>

          <p
            className="
              text-[13px]
              md:leading-[2.2]
              leading-[2.0]
              text-[#3a3a3a]/65
              mb-10
            "
          >
            深く焙煎しすぎない豆を、
            <br />
            風の通る午後に合わせて。
          </p>

          <ul
            ref={listRef}
            className="
              md:space-y-5
              space-y-4
            "
          >
            {[
              ["Drip Coffee", "600"],
              ["Cafe Latte", "680"],
              ["Flat White", "720"],
              ["Iced Coffee", "650"],
            ].map(([name, price]) => (
              <li
                key={name}
                className="
                  flex items-baseline justify-between
                  text-[14px]
                  tracking-[0.12em]
                  text-[#2f2f2f]/80

                  md:flex-row
                  flex-col gap-1
                "
              >
                <span className="leading-snug">{name}</span>
                <span className="text-[12px] tracking-[0.18em] text-[#2f2f2f]/55">
                  ¥{price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== SWEETS ===== */}
        <div>
          <p className="text-[11px] tracking-[0.32em] text-[#3a3a3a]/45 mb-4">
            SWEETS
          </p>

          <p
            className="
              text-[13px]
              md:leading-[2.2]
              leading-[2.0]
              text-[#3a3a3a]/65
              mb-10
            "
          >
            甘さは控えめに。
            <br />
            余韻だけが残るように。
          </p>

          <ul className="md:space-y-5 space-y-4">
            {[
              ["Basque Cheesecake", "750"],
              ["Chocolate Terrine", "780"],
              ["Seasonal Tart", "800"],
            ].map(([name, price]) => (
              <li
                key={name}
                className="
                  flex items-baseline justify-between
                  text-[14px]
                  tracking-[0.12em]
                  text-[#2f2f2f]/80

                  md:flex-row
                  flex-col gap-1
                "
              >
                <span className="leading-snug">{name}</span>
                <span className="text-[12px] tracking-[0.18em] text-[#2f2f2f]/55">
                  ¥{price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* =========================
            Aftertaste Photo
        ========================= */}
        <div className="mt-[16vh]">
          <div
            ref={afterPhotoRef}
            className="
              relative
              w-full
              max-w-[640px]
              mx-auto
              aspect-[4/3]
              overflow-hidden
              rounded-[12px]
              bg-[#eae6df]
            "
          >
            <img
              src="/images/menu-after.png"
              alt="after the last sip"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/6 mix-blend-soft-light" />
          </div>

          <p
            className="
              mt-5
              text-center
              text-[10px]
              tracking-[0.28em]
              text-[#3a3a3a]/35
            "
          >
            after the last sip
          </p>
        </div>
      </div>
    </section>
  );
}
