import StickyHeader from '@/components/StickyHeader';
import HeroGame from '@/components/HeroGame';
import SeriesSpine from '@/components/SeriesSpine';
import OriginTimeline from '@/components/OriginTimeline';
import PlayerCarousel from '@/components/PlayerCarousel';
import ShotMap from '@/components/ShotMap';
import TeamStatsBars from '@/components/TeamStatsBars';
import RallyHub from '@/components/RallyHub';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main>
        <HeroGame />
        <SeriesSpine />
        <OriginTimeline />
        <PlayerCarousel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <ShotMap />
          <TeamStatsBars />
        </div>
        <RallyHub />
      </main>
      <Footer />
    </>
  );
}
