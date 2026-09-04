import { SectionHeading } from '../components/SectionHeading';

interface Intro { eyebrow: string; title: string; note: string }
interface Step { index: string; title: string; detail: string }

export function OperatingSystem({ intro, steps }: { intro: Intro; steps: Step[] }) {
  return (
    <section className="section shell" id="system" aria-labelledby="system-heading">
      <SectionHeading id="system-heading" eyebrow={intro.eyebrow} title={intro.title} note={intro.note} />
      <ol className="process-list">
        {steps.map((step) => (
          <li key={step.index}>
            <span className="process-list__number">{step.index}</span>
            <strong>{step.title}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
