import { SectionHeading } from '../components/SectionHeading';

interface Reel { id: string; label: string; title: string; caption: string; url: string; poster: string; alt: string }
interface Photo { id: string; label: string; note: string; src: string; alt: string }
interface Intro { eyebrow: string; title: string; note: string }

const isPlaceholder = (value: string) => !value || /^(REEL_URL|PORTRAIT_IMAGE|BTS_IMAGE)/.test(value);

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const content = (
    <>
      {!isPlaceholder(reel.poster) && <img src={reel.poster} alt={reel.alt} loading="lazy" />}
      <span className="reel-card__wash" aria-hidden="true" />
      <span className="reel-card__index">{reel.label || `REEL 0${index + 1}`}</span>
      <span className="reel-card__play" aria-hidden="true">▶</span>
      <span className="reel-card__copy"><strong>{reel.title}</strong><small>{reel.caption}</small></span>
    </>
  );
  return isPlaceholder(reel.url) ? (
    <div className={`reel-card reel-card--${index + 1}`} aria-label={`${reel.title}, media placeholder`}>{content}</div>
  ) : (
    <a className={`reel-card reel-card--${index + 1}`} href={reel.url} target="_blank" rel="noreferrer" aria-label={`Watch ${reel.title}`}>{content}</a>
  );
}

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  return (
    <div className={`photo-card photo-card--${index + 1}`}>
      {!isPlaceholder(photo.src) && <img src={photo.src} alt={photo.alt} loading="lazy" />}
      <span className="photo-card__placeholder" aria-hidden="true"><i /><i /><i /></span>
      <span className="photo-card__copy"><strong>{photo.label}</strong><small>{photo.note}</small></span>
    </div>
  );
}

export function MediaShowcase({ intro, reels, photos }: { intro: Intro; reels: Reel[]; photos: Photo[] }) {
  return (
    <section className="section shell" id="reels" aria-labelledby="reels-heading">
      <SectionHeading id="reels-heading" eyebrow={intro.eyebrow} title={intro.title} note={intro.note} />
      <div className="media-layout">
        <div className="reel-grid">
          {reels.map((reel, index) => <ReelCard key={reel.id} reel={reel} index={index} />)}
        </div>
        <aside className="photo-grid" aria-label="Portrait and behind-the-scenes image placeholders">
          {photos.map((photo, index) => <PhotoCard key={photo.id} photo={photo} index={index} />)}
        </aside>
      </div>
    </section>
  );
}
