import Hero from "../sections/Hero";
import VerticalNav from "../sections/VerticalNav";
import EntrancePassage from "../sections/EntrancePassage";
import StaySection from "../sections/StaySection";
import GallerySection from "../sections/GallerySection";
import MenuSection from "../sections/MenuSection";
import AccessSection from "../sections/AccessSection";
import FooterSection from "../sections/FooterSection";
export default function CafeHome() {
  return (
    <main className="min-h-screen bg-[#f6f3ee]">
      {/* 常駐ナビ */}
      <VerticalNav />

      {/* Hero（基準点） */}
      <section id="hero">
        <Hero />
      </section>

      {/* Entrance Passage（入店体験） */}
      <section id="entrance">
        <EntrancePassage />
      </section>

      {/* Stay Section（滞在体験） */}
      <section id="stay">
        <StaySection />
      </section>
      {/* Gallery Section（ギャラリー） */}
      <section id="gallery">
        <GallerySection />
      </section>
      {/* Menu Section（メニュー） */}
      <section id="menu">
        <MenuSection />
      </section>
      {/* Access Section（アクセス） */}
      <section id="access">
        <AccessSection />
      </section>
 
{/* Footer */}
<FooterSection />

    </main>
  );
}
