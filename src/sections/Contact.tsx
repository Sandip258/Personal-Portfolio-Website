import { useState, type FormEvent } from 'react';
import { ArrowIcon } from '../components/ArrowIcon';

interface Route { label: string; detail?: string; href: string; kind?: string }
interface Field { name: string; label: string; type?: string; placeholder?: string; autoComplete?: string; required?: boolean; options?: string[] }
interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  routes: readonly Route[];
  form: { action?: string; fields: readonly Field[]; submitLabel: string; privacyNote?: string };
}

const isUnconfigured = (value?: string) => !value || /YOUR_|FORM_ACTION/.test(value);

export function Contact({ content }: { content: ContactContent }) {
  const [notice, setNotice] = useState('');
  const form = content.form;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isUnconfigured(form.action)) {
      event.preventDefault();
      setNotice('The project form is ready. Add the production form endpoint in the content configuration to enable delivery.');
    }
  };

  return (
    <section className="section shell" id="contact" aria-labelledby="contact-heading">
      <div className="contact-panel">
        <div className="contact-panel__intro">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="contact-heading">{content.title}</h2>
          <p>{content.description}</p>
          <div className="contact-routes" aria-label="Contact options">
            {content.routes.map((route, index) => {
              const unavailable = isUnconfigured(route.href);
              return unavailable ? (
                <span className={`contact-route ${index === 0 ? 'contact-route--primary' : ''}`} key={route.label} aria-disabled="true">
                  <span><strong>{route.label}</strong>{route.detail && <small>{route.detail}</small>}</span><ArrowIcon />
                </span>
              ) : (
                <a className={`contact-route ${index === 0 ? 'contact-route--primary' : ''}`} href={route.href} key={route.label}>
                  <span><strong>{route.label}</strong>{route.detail && <small>{route.detail}</small>}</span><ArrowIcon />
                </a>
              );
            })}
          </div>
        </div>

        <form className="brief-form" id="project-brief" action={isUnconfigured(form.action) ? undefined : form.action} method="post" onSubmit={handleSubmit}>
          <p className="meta-label">Project brief · 2 minutes</p>
          <div className="brief-form__grid">
            {form.fields.map((field) => (
              <label className={field.name === 'brief' || field.type === 'textarea' ? 'brief-form__wide' : undefined} key={field.name}>
                <span>{field.label}{field.required && <span aria-hidden="true"> *</span>}</span>
                {field.options?.length ? (
                  <select name={field.name} required={field.required} defaultValue="">
                    <option value="" disabled>Select one</option>
                    {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea name={field.name} placeholder={field.placeholder} autoComplete={field.autoComplete} required={field.required} rows={4} />
                ) : (
                  <input name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} autoComplete={field.autoComplete} required={field.required} />
                )}
              </label>
            ))}
          </div>
          <button className="button brief-form__submit" type="submit">{form.submitLabel}<ArrowIcon /></button>
          {form.privacyNote && <p className="brief-form__privacy">{form.privacyNote}</p>}
          <p className="brief-form__notice" aria-live="polite">{notice}</p>
        </form>
      </div>
    </section>
  );
}
