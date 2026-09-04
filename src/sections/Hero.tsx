import { ArrowIcon } from '../components/ArrowIcon';

interface Cta { label: string; href: string }
interface FeaturedImpact {
  label: string;
  title: string;
  value: string;
  context: string;
  ctaLabel?: string;
  href?: string;
}

interface HeroProps {
  content: {
    eyebrow: string;
    headline: string;
    highlight: string;
    supportingCopy: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    featuredImpact: FeaturedImpact;
  };
}

function GrowthLine() {
  return (
    <svg className="growth-line" viewBox="0 0 360 116" preserveAspectRatio="none" role="img" aria-label="Illustrative upward performance curve">
      <defs>
        <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".24" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="growth-line__area" d="M2 103 C38 101 50 94 73 91 S108 99 133 82 S171 69 196 71 S228 58 248 61 S285 46 300 30 S332 24 358 5 L358 116 L2 116 Z" />
      <path className="growth-line__stroke" d="M2 103 C38 101 50 94 73 91 S108 99 133 82 S171 69 196 71 S228 58 248 61 S285 46 300 30 S332 24 358 5" />
      <circle cx="358" cy="5" r="4" />
    </svg>
  );
}

export function Hero({ content }: HeroProps) {
  const proof = content.featuredImpact;
  const cvUnconfigured = /DOWNLOAD_CV_URL|YOUR_/.test(content.secondaryCta.href);
  return (
    <section className="shell hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="hero-title">{content.headline} <span>{content.highlight}</span></h1>
        <p className="hero__support">{content.supportingCopy}</p>
        <div className="hero__actions">
          <a className="button" href={content.primaryCta.href}>{content.primaryCta.label}<ArrowIcon /></a>
          {cvUnconfigured ? (
            <span className="text-link text-link--disabled" aria-disabled="true" title="CV link will be added soon">{content.secondaryCta.label}<ArrowIcon /></span>
          ) : (
            <a className="text-link" href={content.secondaryCta.href}>{content.secondaryCta.label}<ArrowIcon /></a>
          )}
        </div>
      </div>
      <a className="hero-proof" href={proof.href ?? '#work'} aria-label={`${proof.title}: ${proof.value} ${proof.context}`}>
        <div>
          <p className="meta-label">{proof.label}</p>
          <h2>{proof.title}</h2>
        </div>
        <div className="hero-proof__chart"><GrowthLine /></div>
        <div className="hero-proof__footer">
          <div><strong>{proof.value}</strong><span>{proof.context}</span></div>
          <span className="text-link">{proof.ctaLabel ?? 'View case study'}<ArrowIcon /></span>
        </div>
      </a>
    </section>
  );
}
