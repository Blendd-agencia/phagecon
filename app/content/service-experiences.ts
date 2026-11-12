import type { Service } from './services';

export type Capability = { title: string; teaser: string; items: string[]; source?: string; tag?: string };
export type ServiceStage = { id: string; name: string; hint: string; eyebrow: string; title: string; description: string; cards: Capability[] };
export type ServiceExperience = {
  headline: [string, string]; journeyTitle: string; journeyIntro: string;
  stages: ServiceStage[];
  feature: { label: string; title: string; description: string; cards: Capability[] };
  audience: string; deliverables: string; scope: string;
};

export function getServiceExperience(service: Service): ServiceExperience {
  const card = (source: string, title: string, teaser: string, start = 0, end?: number): Capability => {
    const section = service.sections.find(s => s.id === source);
    if (!section) throw new Error(`Missing service content: ${service.slug}/${source}`);
    return { source, title, teaser, items: section.items.slice(start, end) };
  };
  const highlight = (title: string, teaser: string, items: string[], tag: string): Capability => ({title, teaser, items, tag});
  const stage = (id: string, name: string, hint: string, title: string, description: string, cards: Capability[]): ServiceStage => ({id, name, hint, eyebrow:hint, title, description, cards});
  switch (service.slug) {
    case 'regulatory-scientific-affairs': return {
      headline:['Complex regulations.','Clear direction.'], journeyTitle:'Where are you in your product’s journey?', journeyIntro:'Choose a stage to discover how we can help. Explore the detail when you need it.',
      stages:[
        stage('plan','Plan','Regulatory strategy & planning','Regulatory strategy & planning.','Understand your product, your markets and the requirements ahead. Find the gaps early and define a clear regulatory direction.',[
          card('strategy','Define your regulatory route','Product and market intelligence, regulatory requirements and a strategy for growth.'),card('gap-analysis','Know what is missing','A critical review of your documentation, with clear findings and recommendations.')]),
        stage('develop','Develop','MA dossiers & documentation','Marketing Authorisation dossier development.','Connect quality, safety and efficacy in documentation prepared for your procedure and your target authorities.',[
          card('dossier','Build the MA dossier','Technical and scientific expertise across all five modules, with MAH and QPPV provision for specific procedures.',0,3),card('dossier','Prepare it for submission','The right format for each authority, including eCTD publishing in collaboration with EXTEDO.',3)]),
        stage('submit','Submit','Submission to approval','Regulatory submissions & approval support.','Keep your procedure moving with coordinated submissions, authority liaison and responses throughout the evaluation phase.',[
          card('submission','Manage the evaluation','Submission, NCA liaison, slot booking and responses to authority requests.',0,3),card('submission','Complete the national phase','Coordinate the final product information, translations and mock-ups for your market.',3)]),
        stage('launch','Launch','Access & market entry','Product launch & market access.','Bring together the commercial, regulatory and operational requirements that support your product launch.',[
          card('launch','Prepare your launch','Pricing, reimbursement, distribution licences, partners and product materials.',0,4),card('launch','Explore your next market','Support for entry into Africa, Asia and South America following EU approval.',4)]),
        stage('maintain','Maintain','Post-authorisation','Post-authorisation lifecycle management.','Stay ahead of change with regulatory intelligence, dossier consolidation and lifecycle support after authorisation.',[
          card('maintenance','Manage change & continuity','Variations, renewals, line extensions and transfers, aligned with your long-term plans.',0,3),card('maintenance','Support portfolio decisions','Documentation and regulatory support for withdrawals and third-party submissions.',3)])
      ],
      feature:{label:'Scientific affairs & market access',title:'Scientific affairs. Evidence for market access.',description:'Turn scientific knowledge into a clear case for your product. Connect robust evidence with the requirements of your market.',cards:[
        {...card('scientific','Scientific affairs & medical writing','Technical reports and medical writing, backed by consistent bibliographic evidence.'),tag:'Evidence & communication'},
        {...card('market-access','HTA & pharmacoeconomics','Health Technology Assessment, pharmacoeconomics, pricing and reimbursement support.'),tag:'Value & access'}]},
      audience:'Pharmaceutical companies preparing, launching or maintaining products across national and international markets.',deliverables:'Regulatory strategies, documentation gap analyses, MA dossiers, authority responses and scientific reports, tailored to the project.',scope:'EU and emerging-market submissions, with support for entry into Africa, Asia and South America following EU MA approval.'
    };
    case 'pharmacovigilance': return {
      headline:['Patient safety.','Continuous commitment.'],journeyTitle:'What does your safety system need?',journeyIntro:'Build the foundations, manage ongoing activities or bring in specialist support. Start with your current priority.',
      stages:[
        stage('set-up','Set up','Systems & responsibilities','Build your pharmacovigilance system.','Establish the people, documentation and agreements that support your pharmacovigilance responsibilities.',[
          card('implementation','Appoint your safety contacts','EU QPPV, Deputy and local contact provision, with access to a medical doctor.',0,1),card('implementation','Put the framework in place','PSMF, procedures, work instructions and technical agreements.',1)]),
        stage('monitor','Monitor','Cases & safety signals','Maintain a clear view of product safety.','Bring together literature monitoring, case management and benefit–risk evaluation in your ongoing safety activities.',[
          card('monitoring','Monitor evidence & manage cases','Local and worldwide literature monitoring, ICSR/AER management and safety signals.',0,3),card('monitoring','Maintain your safety information','Safety profiles, reconciliations and Article 57 / xEVMPD management.',3)]),
        stage('support','Support','Reporting & risk management','Specialist support for demanding situations.','Access expertise for reporting, risk management, audits and the development of your team.',[
          card('specialist-support','Reporting & team readiness','Aggregate reports, pharmacovigilance training and audits.',0,3),card('specialist-support','Risk management & safety measures','Risk Management Plans, risk minimisation and urgent safety measures.',3)])
      ],feature:{label:'People & continuity',title:'Safety expertise. When you need it.',description:'Combine a structured pharmacovigilance system with specialist people and ongoing operational support.',cards:[
        highlight('24/7/365 safety contact availability','EU QPPV, Deputy and local contact provision.',[service.sections[0].items[0]],'Qualified support'),
        highlight('Support across the product lifecycle','From system implementation to day-to-day safety activities.',['Implementation, maintenance and specialist support can be discussed around your current requirements.'],'Continuity')]},
      audience:'Pharmaceutical companies establishing or maintaining their pharmacovigilance systems.',deliverables:'Safety-system documentation, literature monitoring, case management, aggregate reports and risk-management support.',scope:'EU-compliant systems with local and worldwide safety monitoring activities.'
    };
    case 'quality-assurance': return {
      headline:['Quality in your systems.','Confidence in your operations.'],journeyTitle:'Where does your quality system need support?',journeyIntro:'Explore the foundations, authorisations, daily operations and product requirements that shape your quality obligations.',
      stages:[
        stage('systems','Systems','QMS & improvement','Build quality into your organisation.','Develop a quality management system that supports your activities and continues to improve.',[
          card('qms','Develop your quality system','QMS development and implementation following GxP and ISO standards.',0,1),card('qms','Review & improve','Review existing systems and identify opportunities for continuous improvement.',1)]),
        stage('authorisations','Licensing','Responsibilities & authorisations','Navigate responsibilities and licensing.','Connect your operations with the requirements of health authorities, licensing procedures and certification.',[
          card('responsible-person','Responsible Person services','Support for Marketing Authorisation Holders and wholesale distributors.'),card('licensing','GxP licensing & certification','Licensing procedures for medicines and medical devices, with GxP certification support.')]),
        stage('operations','Operations','Audits & daily quality','Keep quality working every day.','Combine audit preparation with practical support for the quality issues that arise across your operations.',[
          card('audits','Audits & compliance reviews','GxP, ISO 9001 and ISO 13485 audits, preparation and gap analysis.'),card('operations','Operational quality support','CAPA, deviations, qualification, validation, batch release and inspection support.')]),
        stage('products','Products','Product-specific compliance','Match compliance to your product.','Work through the documentation and registration requirements relevant to each product category.',[
          card('product-compliance','Medical devices','PRRC services, technical files and CE marking support.',0,1),card('product-compliance','Cosmetics, supplements & biocides','Product files, labelling, conformity assessments and registration procedures.',1)])
      ],feature:{label:'Standards & practical support',title:'A quality framework. An operational partner.',description:'Bring documented requirements and day-to-day practice together, with support tailored to your products and activities.',cards:[
        highlight('GxP, ISO 9001 & ISO 13485','Systems, audits and certification support.',['Quality management system development and implementation.','Audit preparation, gap analysis and continuous improvement.'],'Quality standards'),
        highlight('From documentation to authorities','Support that connects your quality system with your operational requirements.',['Quality documentation and systems.','Liaison with health authorities for licensing and certification.'],'Practical expertise')]},
      audience:'Companies working with medicines, medical devices, cosmetics, food supplements and biocides.',deliverables:'Quality systems, audits, operational support, product documentation and licensing or certification assistance.',scope:'GxP, ISO 9001 and ISO 13485 quality requirements, alongside product-specific obligations.'
    };
    case 'good-manufacturing-practices': return {
      headline:['Manufacturing quality.','Inspection confidence.'],journeyTitle:'Where can we strengthen your GMP readiness?',journeyIntro:'Explore inspection preparation, audits, documentation and technical support for your manufacturing activities.',
      stages:[
        stage('prepare','Prepare','Inspections & certification','Prepare for regulatory inspections.','Build a structured approach to inspection readiness, with support before and during authority inspections.',[
          card('certification','Prepare your organisation','Guidance on preparing for regulatory inspections.',0,1),card('certification','Support during inspections','Specialist assistance during inspections conducted by authorities.',1)]),
        stage('audit','Audit','Assessment & improvement','Understand your compliance position.','Use internal and external audits to assess Good Manufacturing Practices and identify gaps.',[
          card('audits','Assess GMP compliance','Thorough assessments of your compliance with Good Manufacturing Practices.',0,1),card('audits','Identify improvement priorities','Gap analysis to support continuing improvement.',1)]),
        stage('document','Document','GMP documentation','Make your documentation work for you.','Review and develop essential documents in line with applicable regulatory requirements.',[
          card('documentation','Review & develop documents','Support with the essential documentation behind your manufacturing operations.',0,1),card('documentation','Align with requirements','Documentation aligned with applicable regulatory requirements.',1)]),
        stage('validate','Validate','Technical-scientific expertise','Bring expertise to critical processes.','Access technical-scientific guidance for validation and other processes central to GMP compliance.',[
          card('technical','Process & cleaning validation','Specialist guidance on process and cleaning validation.',0,2),card('technical','Critical compliance processes','Technical-scientific support for other critical compliance processes.',2)])
      ],feature:{label:'A continuing commitment to quality',title:'Inspection-ready. Quality-focused.',description:'GMP support connects preparation, documentation and technical expertise throughout manufacturing.',cards:[
        highlight('Before and during inspections','Support for readiness and authority inspections.',service.sections[0].items,'Inspection support'),
        highlight('A proactive approach to compliance','Combine audits, documentation and technical-scientific expertise.',['Internal and external GMP audits.','Essential documentation and validation guidance.'],'Continuing compliance')]},
      audience:'Companies manufacturing medicinal products and preparing for regulatory inspections.',deliverables:'GMP assessments, gap analyses, documentation reviews and technical-scientific guidance.',scope:'Inspection readiness, internal and external audits, process validation and cleaning validation.'
    };
    case 'translations': return {
      headline:['Scientific precision.','Clear communication.'],journeyTitle:'What does your document need?',journeyIntro:'Explore the documents we translate, the terminology behind them and the specialist validation that supports delivery.',
      stages:[
        stage('documents','Documents','Scientific & technical content','Translate the documents your work depends on.','From product information to scientific articles, align the translation with its purpose and audience.',[
          card('documents','Product, commercial & quality documents','Product information, pharmaceutical marketing and operational documentation.',0,3),card('documents','Scientific & specialist documents','Educational materials, reports, medical-device instructions and other documents on request.',3)]),
        stage('terminology','Terminology','Tools & requirements','Keep terminology consistent.','Use specialist tools and terminology resources alongside the requirements relevant to your documents.',[
          card('tools','Translation tools & terminology','Validated CAT tools, Translation Memories, Standard Terms and MedDRA.',0,2),card('tools','Regulatory document requirements','Support for Blue Box and QRD requirements.',2)]),
        stage('validation','Validation','Quality & delivery','Support accuracy from source to delivery.','Combine scientific and technical validation with a delivery approach that considers regulatory objectives, timing and cost.',[
          card('quality','Regulatory objectives & cost','NCA approval and regulatory compliance as objectives, with cost-effective solutions.',0,2),card('quality','Specialist validation & deadlines','Scientific and technical validation with attention to delivery timelines.',2)])
      ],feature:{label:'Experience & scientific review',title:'The meaning matters. Every detail counts.',description:'Experienced translators and a specialist validation team support accuracy, clarity and fidelity to the original meaning.',cards:[
        highlight('Over 10 years of translation expertise','Scientific and technical pharmaceutical translation.',['Experience includes back translation.'],'Specialist experience'),
        highlight('PharmD & MD validation','Review supported by pharmaceutical and medical expertise.',['Scientific and technical validation supports accuracy, clarity and fidelity to the original meaning.'],'Scientific review')]},
      audience:'Pharmaceutical companies communicating with authorities, healthcare professionals and patients.',deliverables:'Scientific and technical translations of product information, quality documents, marketing materials and specialist content.',scope:'Pharmaceutical and medical-device documentation, including back translation and PharmD/MD validation.'
    };
    case 'training': return {
      headline:['Specialist knowledge.','Practical value.'],journeyTitle:'What would you like your team to learn?',journeyIntro:'Start with your needs, then explore programme information and share the topics and timing that matter to your team.',
      stages:[
        stage('needs','Your needs','People & priorities','Shape training around your team.','Identify the knowledge your professionals need and explore a flexible approach to participation and budgets.',[
          card('approach','Relevant training expertise','An updated portfolio and integrated solutions responding to company needs.',0,2),card('approach','Flexible participation','Training for professionals and organisations, with flexibility in participation and budgets.',2)]),
        stage('programmes','Programmes','Sessions & planning','Plan your next learning opportunity.','Explore programme announcements or tell us the topics, participants and preferred schedule for your team.',[
          card('sessions','Explore Events & Training','Find programme announcements in our Events & Training area.',0,1),card('sessions','Discuss a training request','Share your learning priorities, participants and preferred timing.',1)])
      ],feature:{label:'Learning with a clear purpose',title:'Your people. Your priorities.',description:'Training adapted to professionals and pharmaceutical teams, with a focus on your company’s requirements.',cards:[
        highlight('For professionals and organisations','Participation shaped around the people who need it.',['Training for individual professionals and organisations.','Flexibility to manage participation and budgets.'],'People'),
        highlight('Start with a conversation','Tell us the skills your team needs to develop.',['Share your topics, participants and preferred schedule.','Discuss training options and requirements with our team.'],'Planning')]},
      audience:'Regulatory professionals, pharmaceutical teams and organisations seeking specialist training.',deliverables:'Training options shaped around learning priorities, company needs, participation and available budgets.',scope:'Programme announcements through Events & Training, alongside enquiries for specific training requirements.'
    };
    case 'tailored-services': return {
      headline:['Your specific challenge.','Our combined expertise.'],journeyTitle:'What would make the difference to your project?',journeyIntro:'Explore flexible capacity, task control, specialist knowledge and the wider expertise available through our network.',
      stages:[
        stage('capacity','Capacity','Experience & flexibility','Bring the right experience to your project.','Access knowledge built across projects and the flexibility to respond to changing requirements and timelines.',[
          card('experience','Experience across businesses','Knowledge accumulated across project types, client profiles and business environments.',0,1),card('experience','Flexible professional capacity','More than 50 professionals with flexibility to respond to changing requirements and tight deadlines.',1)]),
        stage('control','Control','Cost & task management','Keep delivery and costs in view.','Combine task control with formal reporting and continuing improvement throughout delivery.',[
          card('control','Cost-conscious delivery','Efficient delivery and strict cost control, including for large projects.',0,1),card('control','Track tasks & improve','Formal, periodic reporting to track tasks and continuously improve efficiency.',1)]),
        stage('expertise','Expertise','Knowledge & second opinions','Bridge the expertise gaps in your team.','Add specialist knowledge and experienced perspectives while keeping your team focused on its priorities.',[
          card('expertise','Extend your expertise','Specialist support without increasing headcount, so your team can focus on development and innovation.',0,2),card('expertise','Get another perspective','Second opinions from experienced consultants and a network of experts.',2)]),
        stage('network','Network','Connected capabilities','Connect your project with wider capabilities.','Bring together partners and specialists around the practical and regulatory needs of your project.',[
          card('network','A wide range of support','From printing DHPC letters to submitting ANDA procedures to the FDA.',0,1),card('network','Expertise around your needs','Combine capabilities around the specific requirements of your project.',1)])
      ],feature:{label:'An integrated approach',title:'Your requirements. A tailored response.',description:'Build support around your guidelines, expectations and stage of development, with complementary expertise in one team.',cards:[
        highlight('More than 50 professionals','Complementary expertise and flexible project support.',['Experience across client profiles and business environments.'],'Team capacity'),
        highlight('A connected network of experts','Specialist perspectives for a broad range of activities.',['Experienced consultants and partners can contribute expertise around specific project requirements.'],'Connected expertise')]},
      audience:'Companies seeking integrated pharmaceutical consultancy for specific project requirements.',deliverables:'Specialist capacity, second opinions, task and cost control, periodic reports and coordinated expertise.',scope:'Support shaped around the client’s requirements, guidelines and expectations at each project stage.'
    };
    default: throw new Error(`Missing service presentation: ${service.slug}`);
  }
}
