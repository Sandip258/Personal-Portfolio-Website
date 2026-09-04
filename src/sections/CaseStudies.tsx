import { ArrowIcon } from '../components/ArrowIcon';
import { SectionHeading } from '../components/SectionHeading';

interface CaseStudy {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  context: string;
  strategicShift: string;
  execution: string;
  outcome: string;
  outcomes: readonly string[];
}

interface Intro { eyebrow: string; title: string; note: string }

export function CaseStudies({ intro, studies }: { intro: Intro; studies: readonly CaseStudy[] }) {
  return (
    <section className="section shell" id="work" aria-labelledby="work-heading">
      <SectionHeading id="work-heading" eyebrow={intro.eyebrow} title={intro.title} note={intro.note} />
      <div className="case-grid">
        {studies.map((study, index) => (
          <article className={`case-card case-card--${index + 1}`} id={study.id} key={study.id}>
            <div>
              <div className="case-card__top">
                <p className="meta-label">{study.index} · {study.category}</p>
                <span className="square-arrow" aria-hidden="true"><ArrowIcon /></span>
              </div>
              <h3>{study.title}</h3>
              <p className="case-card__summary">{study.summary}</p>
            </div>
            <ul className="outcome-list" aria-label={`${study.title} outcomes`}>
              {study.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ul>
            <details className="case-details">
              <summary>Read the strategy <ArrowIcon direction="right" /></summary>
              <dl>
                <div><dt>Context</dt><dd>{study.context}</dd></div>
                <div><dt>Strategic shift</dt><dd>{study.strategicShift}</dd></div>
                <div><dt>Execution</dt><dd>{study.execution}</dd></div>
                <div><dt>Outcome</dt><dd>{study.outcome}</dd></div>
              </dl>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
