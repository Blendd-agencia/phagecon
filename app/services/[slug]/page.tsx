import { notFound } from 'next/navigation';
import { services,serviceHref } from '../../content/services';
import { PageHero,ContactBand } from '../../components/editorial';
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=services.find(s=>s.slug===slug);return {title:`${s?.name??'Services'} | PHAGECON`,description:s?.summary};}
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const service=services.find(s=>s.slug===slug);if(!service)notFound();
 const index=services.indexOf(service);const next=services[(index+1)%services.length];
 return <main id="main" className={`inner-page service-page service-${service.slug}`} style={{'--accent':service.color} as React.CSSProperties}>
 <PageHero label={service.name} title={service.headline} description={service.summary} image={service.image}><div className="hero-links"><a className="button" href={`/quotation?service=${service.slug}`}>{service.slug==='training'?'Discuss your training needs':'Discuss your project'} ↗</a><a className="text-link" href="#expertise">Explore our expertise ↓</a></div><div className="service-fact"><strong>{service.fact}</strong><span>{service.factLabel}</span></div></PageHero>
 <div className="service-body container" id="expertise"><aside className="section-index"><p>On this page</p><nav aria-label={`${service.name} sections`}>{service.sections.map((section,i)=><a key={section.id} href={`#${section.id}`}><span>{String(i+1).padStart(2,'0')}</span>{section.title}</a>)}</nav><a className="index-contact" href={`/quotation?service=${service.slug}`}>Talk to our team ↗</a></aside><div className="service-detail"><div className="service-overview"><p className="section-kicker">{service.name}</p><h2>{service.short}</h2>{service.intro.map(p=><p key={p}>{p}</p>)}</div>
 {service.slug==='regulatory-scientific-affairs'&&<nav className="lifecycle-strip" aria-label="Product lifecycle">{[['strategy','Plan'],['dossier','Develop'],['submission','Submit'],['launch','Launch'],['maintenance','Maintain']].map(([id,name],i)=><a key={id} href={`#${id}`}><span>0{i+1}</span>{name}<b>↗</b></a>)}</nav>}
 <div className="expertise-sections">{service.sections.map((section,i)=><section id={section.id} className="expertise-section" key={section.id}><span className="section-number">{String(i+1).padStart(2,'0')}</span><div><h2>{section.title}</h2>{section.intro&&<p>{section.intro}</p>}<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>{service.slug==='training'&&section.id==='sessions'&&<a className="text-link" href="/events">Explore Events &amp; Training ↗</a>}</div></section>)}</div></div></div>
 <ContactBand service={service.slug} title={service.slug==='training'?'What would you like your team to learn?':undefined}/><a className="next-service container" href={serviceHref(next.slug)}><span>Explore another area of expertise</span><h2>{next.name}</h2><b>↗</b></a>
 </main>;
}
