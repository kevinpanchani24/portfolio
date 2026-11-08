import { useState } from 'react';
import { profile } from '../../data/profile.js';
import Tile from './Tile.jsx';

const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function Photo() {
  const [failed, setFailed] = useState(false);
  if (failed || !profile.photo) {
    return <div className="photo-fallback" aria-hidden="true"><span>{initials}</span></div>;
  }
  return <img className="photo" src={profile.photo} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)} />;
}

export default function PhotoTile() {
  return (
    <Tile area="photo" i={1} depth={2} className="tile-flush">
      <Photo />
    </Tile>
  );
}
