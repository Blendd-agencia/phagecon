import { AmbientLight } from './ambient-light';
import type { ReactNode } from 'react';
export function PageHero({label,title,description,image,children}:{label:string;title:string;description:string;image?:string;children?:ReactNode}){
 return <section className={`page-hero ${image?'with-photo':''}`}><AmbientLight/><div className="hero-orbit" aria-hidden="true"/>{image&&<div className="page-hero-photo"><img src={`/assets/${image}`} alt=""/></div>}<div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>{label}</span></nav><p className="section-kicker">{label}</p><h1>{title}</h1><p className="page-lead">{description}</p>{children}</div><PageMarquee text={title.toUpperCase()}/></section>;
}
export function ContactBand({service,title='Let’s move your project forward.'}:{service?:string;title?:string}){return <section className="contact-band container"><div><p className="section-kicker">Expertise starts with a conversation</p><h2>{title}</h2></div><a className="button" href={`/quotation${service?`?service=${encodeURIComponent(service)}`:''}`}>Tell us what you need ↗</a></section>;}
export function SectionHeading({label,title,children}:{label:string;title:string;children?:ReactNode}){return <div className="section-heading"><p className="section-kicker">{label}</p><h2>{title}</h2>{children&&<p>{children}</p>}</div>;}

export function PageMarquee({text}:{text:string}){return <div className="marquee page-marquee" aria-hidden="true"><div><span>{text}</span><span>{text}</span></div></div>}
export function PhotoContactBand(){return <section className="contact-cta"><div className="cta-background"/><div className="cta-shade"/><div className="cta-copy"><p className="section-kicker">Your Partner in Pharmaceutical Excellence</p><h2>Discover how our expertise can support your Business Goals</h2><a className="button" href="/contacts">Contact Our Team ↗</a></div></section>}
