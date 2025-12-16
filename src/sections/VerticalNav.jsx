import { useEffect, useState } from "react";

const items = [
  { id: "gallery", label: "Gallery" },
  { id: "menu", label: "Menu", passive: true }, // 通過点
  { id: "access", label: "Access" },
];


export default function VerticalNav() {
  const [isHero, setIsHero] = useState(true);
  const [active, setActive] = useState(null);

  /* Hero 判定（色切替） */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHero(entry.isIntersecting),
      { threshold: 0.45 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* 現在地判定（Menuは主張しない） */
  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          const id = e.target.id;
          const item = items.find((i) => i.id === id);

          if (!item?.passive) {
            setActive(id);
          }
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-20% 0px -20% 0px", // 安定化
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden md:flex fixed right-[4.5vw] top-1/2 -translate-y-1/2 z-20">
      <ul
        className={`
          flex flex-col gap-8
          text-[12px] tracking-[0.38em]
          transition-colors duration-[900ms]
          ${isHero ? "text-white/70" : "text-[#2f2f2f]/60"}
        `}
      >
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="
                  group flex items-center gap-4
                  transition-transform duration-[600ms] ease-out
                  hover:translate-x-[3px]
                "
              >
                {/* Indicator line */}
                <span className="relative w-[14px] h-[1px] overflow-hidden">
                  <span
                    className={`
                      absolute inset-0
                      origin-left
                      scale-x-0
                      transition-transform duration-[700ms] ease-out
                      ${isActive ? "scale-x-100" : ""}
                      ${
                        isHero
                          ? "bg-white/80"
                          : "bg-[#2f2f2f]/70"
                      }
                    `}
                  />
                </span>

                {/* Label */}
                <span
                  className={`
                    transition-opacity duration-[600ms]
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-65 group-hover:opacity-100"
                    }
                  `}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
