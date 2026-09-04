import { useEffect } from 'react';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar';
import { siteContent } from './data/content';
import { Hero } from './sections/Hero';
import { ImpactStrip } from './sections/ImpactStrip';
import { CaseStudies } from './sections/CaseStudies';
import { MediaShowcase } from './sections/MediaShowcase';
import { OperatingSystem } from './sections/OperatingSystem';
import { ChannelDesk } from './sections/ChannelDesk';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';
import './styles/global.css';

const isPlaceholder = (value: string) => /YOUR_|_URL$/.test(value);

function App() {
  useEffect(() => {
    document.title = siteContent.seo.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = siteContent.seo.description;
  }, []);

  return (
    <div id="top" className="site-frame">
      <Header nav={[...siteContent.nav]} cta={siteContent.hero.primaryCta} />
      <StatusBar items={[...siteContent.statusItems]} />
      <main id="main-content">
        <Hero content={siteContent.hero} />
        <ImpactStrip impacts={[...siteContent.impacts]} />
        <CaseStudies intro={siteContent.workIntro} studies={[...siteContent.caseStudies]} />
        <MediaShowcase intro={siteContent.mediaIntro} reels={[...siteContent.media.reels]} photos={[...siteContent.media.photos]} />
        <OperatingSystem intro={siteContent.processIntro} steps={[...siteContent.processSteps]} />
        <ChannelDesk copy={siteContent.channelDesk} />
        <Services intro={siteContent.servicesIntro} services={[...siteContent.services]} />
        <Contact content={siteContent.contact} />
      </main>
      <footer className="site-footer shell">
        <div><strong>{siteContent.footer.line}</strong><span>{siteContent.footer.note}</span></div>
        <nav aria-label="Social links">
          {siteContent.socials.map((social) => isPlaceholder(social.href) ? (
            <span key={social.label} aria-disabled="true">{social.label}</span>
          ) : (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
          ))}
        </nav>
      </footer>
    </div>
  );
}

export default App;
