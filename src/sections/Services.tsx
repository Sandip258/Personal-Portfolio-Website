import { ArrowIcon } from '../components/ArrowIcon';
import { SectionHeading } from '../components/SectionHeading';

interface Intro { eyebrow: string; title: string; note: string }
interface Service { index: string; title: string; summary: string; deliverables?: readonly string[] }

export function Services({ intro, services }: { intro: Intro; services: readonly Service[] }) {
  return (
    <section className="section shell" id="services" aria-labelledby="services-heading">
      <SectionHeading id="services-heading" eyebrow={intro.eyebrow} title={intro.title} note={intro.note} />
      <div className="service-list">
        {services.map((service) => (
          <article className="service-row" key={service.index}>
            <span className="service-row__number">{service.index}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              {service.deliverables?.length ? (
                <ul className="service-row__deliverables">
                  {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </div>
            <a href="#contact" className="service-row__arrow" aria-label={`Discuss ${service.title}`}><ArrowIcon /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
