import StickyHeader from '@/components/StickyHeader';
import WatchParties from '@/components/WatchParties';
import HeroGame from '@/components/HeroGame';
import SeriesSpine from '@/components/SeriesSpine';
import PlayerCarousel from '@/components/PlayerCarousel';
import ShotMap from '@/components/ShotMap';
import TeamStatsBars from '@/components/TeamStatsBars';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main>
        <WatchParties />
        <HeroGame />
        <ShotMap />
        <TeamStatsBars />
        <SeriesSpine />
        <PlayerCarousel />
      </main>
      <Footer />
    </>
  );
}
