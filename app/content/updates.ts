export type NewsItem={id:string;title:string;summary:string;category:string;source:string;date:string;url:string};
// Selected archive entries from phagecon.com/noticias.php, checked 11 November 2026.
// Dates are the dates shown in Phagecon's archive, not a live feed.
export const news:NewsItem[]=[
 {id:'inhalation-quality',title:'Quality guidance for inhaled and nasal medicines',summary:'EDQM is developing analytical guidance for inhaled and nasal preparations.',category:'Quality',source:'EDQM',date:'2026-05-29',url:'https://www.edqm.eu/en/-/the-european-pharmacopoeia-commission-intensifies-its-efforts-on-quality-control-guidance-for-preparations-for-inhalation-and-nasal-administration'},
 {id:'fast-eu',title:'Portugal authorises its first FAST EU clinical trial',summary:'INFARMED reports a Portuguese approval under the initiative for faster multinational trial assessment.',category:'Regulatory',source:'INFARMED',date:'2026-05-21',url:'https://www.infarmed.pt/web/infarmed/infarmed/-/journal_content/56/15786/13055540'},
 {id:'breakthrough-devices',title:'A European pilot for innovative medical devices',summary:'A new EMA initiative supports the development of breakthrough medical devices.',category:'Medical devices',source:'INFARMED',date:'2026-05-18',url:'https://www.infarmed.pt/web/infarmed/infarmed/-/journal_content/56/15786/13047253'},
 {id:'pharmacopoeia-13-1',title:'European Pharmacopoeia 13.1: a notice for CEP holders',summary:'EDQM outlines actions for certificate holders ahead of revised monographs taking effect.',category:'Quality',source:'EDQM',date:'2026-04-24',url:'https://www.edqm.eu/en/-/implementation-of-the-european-pharmacopoeia-issue-13.1-notification-for-cep-holders'},
 {id:'pregnancy-pv',title:'Pharmacovigilance guidance for pregnancy and breastfeeding',summary:'A GVP update addresses safety monitoring in pregnant and breastfeeding populations.',category:'Pharmacovigilance',source:'ECA Academy',date:'2026-04-10',url:'https://www.gmp-compliance.org/gmp-news/new-gvp-guideline-for-populations-of-pregnant-or-breastfeeding-women'},
];
export type EventItem={id:string;title:string;kind:'Event'|'Training'|'Podcast';date:string;location:string;description:string;url:string};
// Add only confirmed programmes; empty states are intentional, not demonstration events.
export const events:EventItem[]=[];
export type Job={id:string;title:string;location:string;department:string;about:string;requirements:string[];offer:string[]};
// Roadmap examples are templates, not active vacancies.
export const jobs:Job[]=[];
