import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, serviceHref } from '../../content/services';
import { serviceIcons } from '../../content/service-icons';
import { getServiceExperience, type Capability } from '../../content/service-experiences';
import { ServiceExplorer } from '../../components/service-explorer';
import './service-experience.css';

const origin = 'https://phagecon-k21q.vercel.app';
export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) return { title: 'Service not found | PHAGECON', robots: { index: false, follow: false } };
  const url = origin + serviceHref(service.slug);
  return { title: `${service.name} Consulting | PHAGECON`, description: service.summary, alternates: { canonical: url }, robots: { index: false, follow: false },
    openGraph: { title: `${service.name} | PHAGECON`, description: service.summary, url, type: 'website', images: [{ url: `${origin}/assets/${service.image ?? 'ef7ed.png'}` }] },
    twitter: { card: 'summary_large_image', title: `${service.name} | PHAGECON`, description: service.summary }
  };
}

function CapabilityCard({ card, feature = false }: { card: Capability; feature?: boolean }) {
  const Heading = feature ? 'h3' : 'h4';
  return <details className="capability"><summary>{!feature && <span className="card-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M7 5h18v22H7zM11 11h10M11 16h10M11 21h6" /></svg></span>}
    <div>{card.tag && <span className="label-tag">{card.tag}</span>}<Heading>{card.title}</Heading><span className="card-teaser">{card.teaser}</span></div><span className="expand-mark" aria-hidden="true">+</span></summary>
    <div className="capability-body"><ul>{card.items.map(item => <li key={item}>{item}</li>)}</ul></div></details>;
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const experience = getServiceExperience(service);
  const next = services[(services.indexOf(service) + 1) % services.length];
  const enquiry = `/quotation?service=${service.slug}`;
  const url = origin + serviceHref(service.slug);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': origin + '/#organization', name: 'PHAGECON', url: origin + '/', logo: origin + '/assets/04cfe.png' },
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: `${service.name} | PHAGECON`, description: service.summary, inLanguage: 'en', mainEntity: { '@id': url + '#service' }, breadcrumb: { '@id': url + '#breadcrumb' } },
    { '@type': 'Service', '@id': url + '#service', name: service.name, serviceType: service.name, description: service.summary, url, provider: { '@id': origin + '/#organization' } },
    { '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Services', item: origin + '/services' }, { '@type': 'ListItem', position: 2, name: service.name, item: url }] }
  ] };
  return <main id="main" className="service-experience" style={{ '--service-image': `url('/assets/${service.image ?? 'ef7ed.png'}')` } as CSSProperties}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="hero"><div className="hero-copy wrap"><nav className="crumb" aria-label="Breadcrumb"><a href="/services">Services</a><span aria-hidden="true"> / </span><span>{service.name}</span></nav>
      <h1 className="eyebrow service-title">{service.name}</h1><p className="hero-headline">{experience.headline[0]}<br /><em>{experience.headline[1]}</em></p>
      <p>{service.slug === 'regulatory-scientific-affairs' ? 'PHAGECON provides regulatory affairs and scientific consultancy for pharmaceutical companies, from Marketing Authorisation (MA) dossiers and submissions to market access and post-authorisation lifecycle management.' : service.summary}</p>
      <div className="hero-actions"><a className="button" href="#journey">Find your next step <span aria-hidden="true">↓</span></a><a className="subtle-link" href={enquiry}>Discuss your {service.slug === 'training' ? 'training needs' : 'project'} ↗</a></div></div>
      <div className="scope-line wrap"><span>{service.fact} · {service.factLabel}</span><span>Pharmaceutical expertise</span></div></section>
    <section className="journey" id="journey"><div className="wrap"><div className="journey-heading"><div><p className="eyebrow">{service.slug === 'regulatory-scientific-affairs' ? 'Your product. Every stage.' : 'Your needs. Our expertise.'}</p><h2>{experience.journeyTitle}</h2></div><p className="aside-copy"><b>Start with the challenge in front of you.</b>{experience.journeyIntro}</p></div>
      <ServiceExplorer stages={experience.stages.map(({ id, name, hint }) => ({ id, name, hint }))}>{experience.stages.map(stage => <div className="phase-content" key={stage.id}>
        <div className="phase-story"><p className="eyebrow">{stage.eyebrow}</p><h3 id={`phase-heading-${stage.id}`}>{stage.title}</h3><p>{stage.description}</p><div className="phase-signature"><img src={serviceIcons[service.slug]} width="48" height="48" alt="" /><span>{service.factLabel}</span></div></div>
        <div className="capabilities">{stage.cards.map((card, index) => <CapabilityCard card={card} key={`${stage.id}-${index}`} />)}{service.slug === 'training' && stage.id === 'programmes' && <a className="subtle-link" href="/events">Explore Events &amp; Training ↗</a>}</div>
      </div>)}</ServiceExplorer>
      <details className="complete-scope"><summary className="all-toggle">Complete scope of {service.name.toLowerCase()} services</summary><div className="all-capabilities">{service.intro.map(text => <p key={text}>{text}</p>)}{service.sections.map(section => <div id={section.id} key={section.id}><h3>{section.title}</h3>{section.intro && <p>{section.intro}</p>}<ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></details>
    </div></section>
    <section className="science"><div className="wrap science-grid"><div><p className="eyebrow">{experience.feature.label}</p><h2>{experience.feature.title}</h2><p className="science-intro">{experience.feature.description}</p></div><div className="capabilities">{experience.feature.cards.map(card => <CapabilityCard key={card.title} card={card} feature />)}</div></div></section>
    <section className="service-overview wrap" aria-labelledby="overview-heading"><h2 id="overview-heading">{service.name} at a glance</h2><dl><div><dt>Who we support</dt><dd>{experience.audience}</dd></div><div><dt>What we deliver</dt><dd>{experience.deliverables}</dd></div><div><dt>Scope of support</dt><dd>{experience.scope}</dd></div></dl></section>
    <section className="end wrap"><div className="end-grid"><div><p className="eyebrow">The next step is a conversation</p><h2>{service.slug === 'training' ? 'Tell us what your team needs to learn.' : 'Tell us where you are. Let’s work on what comes next.'}</h2></div><div className="end-side"><p>{service.slug === 'training' ? 'Share your topics, participants and preferred schedule. We can discuss the options with you.' : 'One specific challenge or an entire project. We bring together the expertise you need.'}</p><a className="button" href={enquiry}>Discuss your {service.slug === 'training' ? 'training needs' : 'project'} <span aria-hidden="true">↗</span></a></div></div>
      <a className="related-service" href={serviceHref(next.slug)}><img src={serviceIcons[next.slug]} width="38" height="38" alt="" /><span><small>Explore another area of expertise</small>{next.name}</span><span aria-hidden="true">↗</span></a>
    </section>
  </main>;
}
