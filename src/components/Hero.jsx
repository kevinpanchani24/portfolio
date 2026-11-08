import IntroTile from './hero/IntroTile.jsx';
import PhotoTile from './hero/PhotoTile.jsx';
import { StackTile, StatusTile, CurrentTile, EduTile, CommandTile } from './hero/InfoTiles.jsx';

// Bento grid of glass tiles at different depths
export default function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="bento">
        <IntroTile />
        <PhotoTile />
        <StackTile />
        <StatusTile />
        <CurrentTile />
        <EduTile />
        <CommandTile />
      </div>
    </section>
  );
}
