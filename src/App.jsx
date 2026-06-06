import { useState, useEffect, useRef } from "react";

// ── QUIZZES DATA ─────────────────────────────────────────────────────────────
const QUIZZES = [
  { title: "Fundamental Rights", emoji: "⚖️", questions: [
    { q: "Which Article guarantees the Right to Equality?", options: ["Article 21", "Article 14", "Article 19", "Article 32"], answer: 1 },
    { q: "Freedom of speech is guaranteed under:", options: ["19(1)(a)", "Article 20", "Article 22", "Article 32"], answer: 0 },
    { q: "Right to life and personal liberty is under:", options: ["Article 14", "Article 21", "Article 22", "Article 16"], answer: 1 },
  ]},
  { title: "Fundamental Duties", emoji: "🏛️", questions: [
    { q: "Fundamental Duties were added by:", options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "86th Amendment"], answer: 0 },
    { q: "How many Fundamental Duties are there currently?", options: ["10", "11", "12", "9"], answer: 1 },
    { q: "Fundamental Duties are mentioned in:", options: ["Part IVA", "Part III", "Part IX", "Part VII"], answer: 0 },
  ]},
  { title: "Directive Principles", emoji: "📜", questions: [
    { q: "DPSP concept is borrowed from:", options: ["USA", "Ireland", "UK", "Japan"], answer: 1 },
    { q: "Which of the following is NOT a DPSP?", options: ["Equal pay for equal work", "Right to property", "Free legal aid", "Protection of environment"], answer: 1 },
    { q: "DPSPs are:", options: ["Justiciable", "Non-justiciable", "Partially enforceable", "Enforced by Supreme Court only"], answer: 1 },
  ]},
  { title: "Indian Penal Code", emoji: "🔍", questions: [
    { q: "IPC was enacted in:", options: ["1860", "1947", "1950", "1857"], answer: 0 },
    { q: "Section 302 IPC deals with:", options: ["Kidnapping", "Murder", "Dowry death", "Culpable homicide"], answer: 1 },
    { q: "Section 375 IPC relates to:", options: ["Theft", "Rape", "Dacoity", "Forgery"], answer: 1 },
  ]},
  { title: "CrPC Procedures", emoji: "🏢", questions: [
    { q: "Code of Criminal Procedure was enacted in:", options: ["1973", "1860", "1935", "1955"], answer: 0 },
    { q: "Section 41 CrPC deals with:", options: ["Arrest without warrant", "Bail", "Remand", "Appeal"], answer: 0 },
    { q: "Section 167 CrPC is about:", options: ["FIR registration", "Remand procedure", "Filing charge sheet", "Criminal force"], answer: 1 },
  ]},
  { title: "Indian Evidence Act", emoji: "📑", questions: [
    { q: "Indian Evidence Act was enacted in:", options: ["1872", "1950", "1905", "1882"], answer: 0 },
    { q: "Dying declaration falls under Section:", options: ["32(1)", "34", "27", "60"], answer: 0 },
    { q: "An admission is essentially a:", options: ["Statement", "Confession", "Proof of guilt", "Legal argument"], answer: 0 },
  ]},
  { title: "IT Act", emoji: "💻", questions: [
    { q: "Information Technology Act was passed in:", options: ["2000", "2008", "2010", "1998"], answer: 0 },
    { q: "Section 66A (struck down) related to:", options: ["Hacking", "Offensive online messages", "Cyber-stalking", "Data breach"], answer: 1 },
    { q: "Digital Signature provisions appear in Section:", options: ["2", "3", "4", "6"], answer: 1 },
  ]},
  { title: "Constitution Basics", emoji: "🇮🇳", questions: [
    { q: "Indian Constitution was adopted on:", options: ["26 Jan 1950", "26 Nov 1949", "15 Aug 1947", "26 Jan 1945"], answer: 1 },
    { q: "Number of Schedules in the original Constitution:", options: ["7", "8", "10", "12"], answer: 1 },
    { q: "Total articles in the original Constitution:", options: ["395", "399", "380", "420"], answer: 0 },
  ]},
  { title: "Constitutional Amendments", emoji: "✏️", questions: [
    { q: "First Constitutional Amendment was in:", options: ["1951", "1950", "1955", "1960"], answer: 0 },
    { q: "42nd Amendment is popularly called:", options: ["Mini Constitution", "Fundamental Amendment", "Largest Amendment", "Emergency Constitution"], answer: 0 },
    { q: "97th Amendment relates to:", options: ["Co-operative Societies", "GST", "Right to Education", "SC/ST Reservation"], answer: 0 },
  ]},
  { title: "Landmark Judgments", emoji: "⚖️", questions: [
    { q: "Kesavananda Bharati case established the:", options: ["Basic Structure Doctrine", "Right to Equality", "Emergency Powers", "Right to Privacy"], answer: 0 },
    { q: "Maneka Gandhi v. Union of India expanded:", options: ["Article 14", "Article 19", "Article 21", "Article 32"], answer: 2 },
    { q: "Shah Bano case dealt with:", options: ["Triple Talaq", "Muslim women's maintenance rights", "Reservation", "Dowry prohibition"], answer: 1 },
  ]},
];

// ── IPC SECTIONS ──────────────────────────────────────────────────────────────
const IPC_SECTIONS = [
  { section: "34", title: "Common Intention", cat: "General Principles", text: "When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone." },
  { section: "96", title: "Right of Private Defence", cat: "General Exceptions", text: "Nothing is an offence which is done in the exercise of the right of private defence. Every person has the right to defend their body and the body of others, and the property of themselves and others, against any act which is an offence." },
  { section: "299", title: "Culpable Homicide", cat: "Offences Against Body", text: "Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide." },
  { section: "300", title: "Murder", cat: "Offences Against Body", text: "Culpable homicide is murder if the act by which death is caused is done with the intention of causing death; or with the intention of causing such bodily injury as the offender knows to be likely to cause death; or with the intention of causing bodily injury sufficient in the ordinary course of nature to cause death; or with the knowledge that the act is so imminently dangerous that it must cause death or such bodily injury as is likely to cause death." },
  { section: "302", title: "Punishment for Murder", cat: "Offences Against Body", text: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine. Section 302 is one of the most serious provisions of the IPC. Capital punishment (death penalty) is awarded in the rarest of rare cases as held in Bachan Singh v. State of Punjab (1980)." },
  { section: "304", title: "Culpable Homicide not amounting to Murder", cat: "Offences Against Body", text: "Whoever commits culpable homicide not amounting to murder shall be punished with imprisonment for life, or imprisonment for a term which may extend to ten years, and shall also be liable to fine. If the act is done with the knowledge that it is likely to cause death but without any intention to cause death, the punishment may extend to ten years." },
  { section: "304B", title: "Dowry Death", cat: "Matrimonial Offences", text: "Where the death of a woman is caused by any burns or bodily injury or occurs under abnormal circumstances within seven years of marriage, and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or any relative of her husband for, or in connection with, any demand for dowry, such death shall be called 'dowry death'. The husband or relative shall be deemed to have caused her death and shall be punished with imprisonment for not less than seven years, which may extend to imprisonment for life." },
  { section: "307", title: "Attempt to Murder", cat: "Offences Against Body", text: "Whoever does any act with such intention or knowledge that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment for a term which may extend to ten years, and shall also be liable to fine. If hurt is caused, imprisonment may extend to life." },
  { section: "323", title: "Voluntarily Causing Hurt", cat: "Offences Against Body", text: "Whoever voluntarily causes hurt shall be punished with imprisonment for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both. This section deals with simple hurt not involving grievous injuries." },
  { section: "363", title: "Punishment for Kidnapping", cat: "Offences Against Person", text: "Whoever kidnaps any person from India or from lawful guardianship shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine. Kidnapping from guardianship applies only to minors (below 16 for males, below 18 for females)." },
  { section: "375", title: "Rape", cat: "Sexual Offences", text: "A man is said to commit rape who has sexual intercourse with a woman under circumstances falling under any of the following: against her will, without her consent, with consent obtained under fear or fraud, with consent when she is of unsound mind or intoxicated, with or without consent when she is under eighteen years of age, or when she is unable to communicate consent. Exception: Sexual intercourse by a man with his own wife, not being under fifteen years of age, is not rape." },
  { section: "376", title: "Punishment for Rape", cat: "Sexual Offences", text: "Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than seven years, but which may extend to imprisonment for life, and shall also be liable to fine. Where rape is committed on a woman under twelve years, imprisonment shall not be less than twenty years, or life imprisonment, or death." },
  { section: "378", title: "Theft", cat: "Offences Against Property", text: "Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft. Three essentials: (1) Dishonest intention to take, (2) Movable property, (3) Without consent." },
  { section: "379", title: "Punishment for Theft", cat: "Offences Against Property", text: "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both." },
  { section: "390", title: "Robbery", cat: "Offences Against Property", text: "In all robbery there is either theft or extortion. Theft is robbery if the offender voluntarily causes or attempts to cause death, hurt, or wrongful restraint, or instills fear of such harm, in order to commit theft or carry away stolen property. Extortion is robbery if the offender puts the victim in fear at the time and place of extortion." },
  { section: "392", title: "Punishment for Robbery", cat: "Offences Against Property", text: "Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine. If the robbery is committed on the highway between sunset and sunrise, the imprisonment may be extended to fourteen years." },
  { section: "420", title: "Cheating and Dishonestly Inducing Delivery of Property", cat: "Offences Against Property", text: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy any valuable security, shall be punished with imprisonment for a term which may extend to seven years, and shall also be liable to fine." },
  { section: "498A", title: "Cruelty by Husband or Relatives", cat: "Matrimonial Offences", text: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Cruelty includes conduct causing grave injury or danger to life, limb, or health, or harassment to coerce the woman or her relatives to meet unlawful demands including dowry." },
  { section: "499", title: "Defamation", cat: "Offences Against Reputation", text: "Whoever, by words either spoken or intended to be read, or by signs or visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing it will harm, the reputation of such person, is said to defame that person. Ten exceptions exist, including truth in public interest, fair comment on public conduct, and reports of court proceedings." },
  { section: "500", title: "Punishment for Defamation", cat: "Offences Against Reputation", text: "Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both." },
];

// ── CrPC SECTIONS ─────────────────────────────────────────────────────────────
const CRPC_SECTIONS = [
  { section: "41", title: "Arrest Without Warrant", cat: "Arrest", text: "Any police officer may without a Magistrate's order and without a warrant arrest any person who commits, in the presence of a police officer, a cognizable offence; or against whom a reasonable complaint has been made or credible information received that they have committed a cognizable offence. After amendments, police must record reasons for arrest and the arrestee must be informed of grounds." },
  { section: "46", title: "How Arrest is Made", cat: "Arrest", text: "In making an arrest the police officer or other person making the arrest shall actually touch or confine the body of the person to be arrested, unless there be a submission to the custody by word or action. If a woman is to be arrested, her submission to custody on an oral intimation shall be presumed. No woman shall be arrested after sunset and before sunrise, except in exceptional circumstances." },
  { section: "125", title: "Maintenance of Wives, Children and Parents", cat: "Maintenance", text: "If any person having sufficient means neglects or refuses to maintain his wife unable to maintain herself, or his legitimate or illegitimate minor child, or his father or mother unable to maintain himself or herself, a Magistrate may order such person to make a monthly allowance for their maintenance at a monthly rate not exceeding five hundred rupees. The Supreme Court in various judgments has interpreted this section broadly to ensure justice." },
  { section: "154", title: "Information in Cognizable Cases (FIR)", cat: "FIR & Investigation", text: "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, read over to the informant, and signed by the person giving it. The police cannot refuse to register an FIR in cognizable offences. A copy of the FIR shall be given to the informant free of charge. Lalita Kumari v. Govt. of U.P. (2014) held that registration of FIR is mandatory." },
  { section: "161", title: "Examination of Witnesses by Police", cat: "FIR & Investigation", text: "Any police officer making an investigation may examine orally any person supposed to be acquainted with the facts and circumstances of the case. Such person is bound to answer truly all questions, other than questions the answers to which would tend to expose him to a criminal charge or penalty or forfeiture." },
  { section: "164", title: "Recording of Confessions and Statements", cat: "FIR & Investigation", text: "Any Metropolitan Magistrate or Judicial Magistrate may, whether or not he has jurisdiction in the case, record any confession or statement made to him in the course of an investigation. The Magistrate must warn the person that he is not bound to make a confession, and that any confession may be used against him." },
  { section: "167", title: "Procedure when Investigation cannot be Completed in 24 Hours (Remand)", cat: "Remand & Custody", text: "Whenever any person is arrested and detained and investigation cannot be completed within 24 hours, the officer shall transmit a copy of case diary to the nearest Judicial Magistrate and forward the accused to the Magistrate. The Magistrate may authorize detention not exceeding 15 days at a time. If investigation is not completed in 60 days (non-NDPS) or 90 days (serious offences), the accused is entitled to bail as a matter of right (default bail)." },
  { section: "173", title: "Report of Police Officer on Completion of Investigation (Chargesheet)", cat: "FIR & Investigation", text: "Every investigation shall be completed without unnecessary delay. On completion, the officer in charge shall forward a report (chargesheet) to the Magistrate in the prescribed form. The report shall state the names of parties, nature of information, names of persons who appear to have been acquainted with the case, whether any offence appears to have been committed, and whether the accused has been arrested." },
  { section: "197", title: "Prosecution of Judges and Public Servants", cat: "Special Provisions", text: "When any person who is a Judge, Magistrate, or public servant not removable from office save by or with the sanction of the Government is accused of any offence alleged to have been committed while acting or purporting to act in the discharge of his official duty, no Court shall take cognizance except with the previous sanction of the Government. This protection is to prevent vexatious prosecution of bonafide official actions." },
  { section: "200", title: "Examination of Complainant", cat: "Complaint to Magistrate", text: "A Magistrate taking cognizance of an offence on complaint shall examine upon oath the complainant and the witnesses present, if any, and the substance of such examination shall be reduced to writing and shall be signed by the complainant and the witnesses, and also by the Magistrate." },
  { section: "320", title: "Compounding of Offences", cat: "Settlement", text: "Certain offences punishable under the IPC may be compounded by persons mentioned in the Schedule. Offences compoundable without court permission include hurt, wrongful restraint, defamation, and criminal trespass. Offences compoundable only with court permission include causing grievous hurt and theft. The composition of an offence shall have the effect of an acquittal of the accused." },
  { section: "437", title: "Bail in Non-Bailable Cases (Magistrate)", cat: "Bail", text: "When any person accused of a non-bailable offence is arrested or detained, he may be released on bail, but not if there are reasonable grounds for believing he has been guilty of an offence punishable with death or imprisonment for life. However, any person below 16 years, or a woman, or a sick or infirm person may be released even in serious cases. In long-pending cases, bail shall ordinarily be granted." },
  { section: "438", title: "Anticipatory Bail", cat: "Bail", text: "When any person has reason to believe that he may be arrested on accusation of having committed a non-bailable offence, he may apply to the High Court or Court of Session for a direction that in the event of arrest he shall be released on bail. The Court considers: nature and gravity of accusation, antecedents of the applicant, possibility of fleeing justice, and whether accusation is made with intent to humiliate. The Supreme Court in Sushila Aggarwal v. State (2020) held anticipatory bail can be for unlimited period." },
  { section: "439", title: "Special Powers of High Court or Court of Session Regarding Bail", cat: "Bail", text: "A High Court or Court of Session may direct that any person accused of an offence and in custody be released on bail, impose conditions for bail, or modify conditions imposed by a lower court. These superior courts have inherent power to grant or cancel bail considering all relevant circumstances." },
  { section: "482", title: "Saving of Inherent Powers of High Court", cat: "High Court Powers", text: "Nothing in this Code shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Code, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice." },
];

// ── CONSTITUTION ARTICLES ─────────────────────────────────────────────────────
const ARTICLES = [
  { no: "12", title: "Definition of State", part: "Part III – Fundamental Rights", text: "In this Part, unless the context otherwise requires, 'the State' includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India. This wide definition ensures all state actions are subject to fundamental rights scrutiny." },
  { no: "13", title: "Laws Inconsistent with Fundamental Rights", part: "Part III – Fundamental Rights", text: "All laws in force inconsistent with Fundamental Rights shall be void to the extent of inconsistency. The State shall not make any law which takes away or abridges the rights conferred by this Part. This is the basis of judicial review — the power of courts to declare laws unconstitutional." },
  { no: "14", title: "Equality Before Law", part: "Part III – Fundamental Rights", text: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This includes both negative (no discrimination) and positive (equal protection) aspects. The Supreme Court has evolved the principle of 'reasonable classification' under this Article." },
  { no: "15", title: "Prohibition of Discrimination", part: "Part III – Fundamental Rights", text: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. However, the State can make special provisions for women, children, and socially and educationally backward classes or Scheduled Castes and Scheduled Tribes." },
  { no: "16", title: "Equality of Opportunity in Public Employment", part: "Part III – Fundamental Rights", text: "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. The State can make provisions for reservation of appointments or posts in favour of any backward class of citizens not adequately represented in the services under the State." },
  { no: "17", title: "Abolition of Untouchability", part: "Part III – Fundamental Rights", text: "'Untouchability' is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of 'Untouchability' shall be an offence punishable in accordance with law. This is an absolute right — it cannot be suspended even during Emergency." },
  { no: "19", title: "Six Freedoms of Citizens", part: "Part III – Fundamental Rights", text: "All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions or cooperative societies; (d) move freely throughout India; (e) reside and settle in any part of India; and (g) practise any profession or carry on any occupation, trade or business. These rights are subject to reasonable restrictions under Article 19(2)–(6)." },
  { no: "20", title: "Protection in Respect of Conviction for Offences", part: "Part III – Fundamental Rights", text: "Three protections: (1) Ex post facto law — no conviction for an act that wasn't an offence when committed, and no penalty greater than then-existing law; (2) Double Jeopardy — no prosecution and punishment for the same offence more than once; (3) Self-incrimination — no person accused shall be compelled to be a witness against himself. Article 20 cannot be suspended even during Emergency." },
  { no: "21", title: "Protection of Life and Personal Liberty", part: "Part III – Fundamental Rights", text: "No person shall be deprived of his life or personal liberty except according to procedure established by law. Interpreted expansively by the Supreme Court in Maneka Gandhi v. Union of India (1978) to include right to privacy, dignity, livelihood, health, shelter, speedy trial, legal aid, and a host of other rights. K.S. Puttaswamy v. Union of India (2017) declared privacy a fundamental right under Article 21." },
  { no: "21A", title: "Right to Education", part: "Part III – Fundamental Rights", text: "The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine. Added by the 86th Constitutional Amendment Act, 2002. This led to the enactment of the Right to Education Act, 2009." },
  { no: "22", title: "Protection Against Arrest and Detention", part: "Part III – Fundamental Rights", text: "Rights upon arrest: (1) No detention without being informed of grounds; (2) Right to consult and be defended by a lawyer of choice; (3) Every arrested person must be produced before the nearest Magistrate within 24 hours; (4) No detention beyond 24 hours without a Magistrate's order. Preventive detention laws are an exception — the Advisory Board procedure applies." },
  { no: "32", title: "Right to Constitutional Remedies", part: "Part III – Fundamental Rights", text: "The right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights is guaranteed. The Supreme Court has power to issue directions or writs including: Habeas Corpus (produce the body), Mandamus (command to perform duty), Prohibition (stop inferior court), Certiorari (quash order), Quo Warranto (by what authority). Dr. Ambedkar called Article 32 'the heart and soul of the Constitution'." },
  { no: "44", title: "Uniform Civil Code", part: "Part IV – DPSP", text: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India. This Directive Principle aims at replacing personal laws based on religious scriptures and customs with a common set of laws governing matters such as marriage, divorce, maintenance, inheritance, and adoption for all citizens." },
  { no: "45", title: "Provision for Early Childhood Care and Education", part: "Part IV – DPSP", text: "The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years. (Originally required free and compulsory education up to age 14, but was modified after Article 21A was added by the 86th Amendment)." },
  { no: "51", title: "Promotion of International Peace and Security", part: "Part IV – DPSP", text: "The State shall endeavour to: (a) promote international peace and security; (b) maintain just and honourable relations between nations; (c) foster respect for international law and treaty obligations; and (d) encourage settlement of international disputes by arbitration." },
  { no: "51A", title: "Fundamental Duties", part: "Part IVA – Fundamental Duties", text: "It shall be the duty of every citizen of India to: abide by the Constitution; cherish national ideals; uphold sovereignty, unity and integrity of India; defend the country; promote harmony and the spirit of common brotherhood; value and preserve the rich heritage of our composite culture; protect and improve the natural environment; develop the scientific temper, humanism and spirit of inquiry and reform; safeguard public property; strive towards excellence; and provide opportunities for education to one's child between the ages of 6 and 14. (Added by 42nd Amendment, 1976; 11th duty added by 86th Amendment, 2002.)" },
];

// ── LEGAL TIPS ────────────────────────────────────────────────────────────────
const LEGAL_TIPS = [
  "Article 21 has been expansively interpreted to include the right to privacy (K.S. Puttaswamy, 2017), livelihood, health, shelter, and a dignified death.",
  "Section 498A IPC (cruelty by husband) and Section 304B (dowry death) are both cognizable, non-bailable, and non-compoundable offences.",
  "An FIR is mandatory in cognizable offences — police cannot refuse (Lalita Kumari v. Govt. of U.P., 2014). File a complaint with SP or use e-FIR if denied.",
  "Anticipatory bail (Section 438 CrPC) is applied before arrest. Regular bail (Section 437/439) is applied after arrest in non-bailable offences.",
  "The Basic Structure Doctrine from Kesavananda Bharati v. State of Kerala (1973) holds that Parliament cannot amend fundamental features of the Constitution.",
  "Section 167(2) CrPC: Default bail is available if chargesheet is not filed within 60 days (minor offences) or 90 days (serious offences requiring 10+ years punishment).",
  "The difference between culpable homicide (Section 299) and murder (Section 300) lies in the degree of intention and knowledge involved.",
  "Five Constitutional Writs: Habeas Corpus (produce the body), Mandamus (command a public duty), Prohibition (stop inferior court), Certiorari (quash lower court order), Quo Warranto (show authority for holding office).",
];

// ── STYLING ───────────────────────────────────────────────────────────────────
const G = {
  bg: '#07070f',
  card: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.08)',
  accent: '#c9a432',
  accentSoft: 'rgba(201,164,50,0.15)',
  purple: '#8b5dff',
  purpleSoft: 'rgba(139,93,255,0.15)',
  muted: '#9499b8',
  fontDisplay: '"Cormorant Garamond", serif',
  fontBody: '"DM Sans", sans-serif',
  fontMono: '"JetBrains Mono", monospace',
};

const c = (extra = {}) => ({
  background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, ...extra,
});

const b = (extra = {}) => ({
  padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
  fontFamily: G.fontBody, fontSize: 14, fontWeight: 500, transition: 'all 0.2s', ...extra,
});

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function Landing({ onLogin }) {
  const features = [
    { icon: '💬', title: 'AI Legal Chat', desc: 'Ask any legal question, get instant AI answers with section citations and case law references.' },
    { icon: '📖', title: 'IPC & CrPC Browser', desc: 'Browse 500+ sections of the Indian Penal Code and Code of Criminal Procedure.' },
    { icon: '🏛️', title: 'Constitution Explorer', desc: 'Explore Fundamental Rights, Directive Principles, and Fundamental Duties with explanations.' },
    { icon: '🎯', title: 'Legal Quizzes', desc: '10 comprehensive quiz modules covering all key areas of Indian law.' },
    { icon: '🔍', title: 'Semantic Search', desc: 'Find relevant sections using natural language — not just keyword matching.' },
    { icon: '📊', title: 'Study Dashboard', desc: 'Track your learning progress, access daily legal tips, and manage your studies.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: G.fontBody, color: '#fff', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 60px', borderBottom: `1px solid ${G.border}`, backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(7,7,15,0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 26 }}>⚖️</span>
          <span style={{ fontFamily: G.fontDisplay, fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>LegalBot</span>
          <span style={{ fontSize: 10, background: 'rgba(201,164,50,0.15)', border: '1px solid rgba(201,164,50,0.3)', color: G.accent, padding: '2px 8px', borderRadius: 20, fontWeight: 600, letterSpacing: 0.5 }}>BETA</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onLogin} style={{ ...b({ padding: '9px 18px', background: 'transparent', border: `1px solid ${G.border}`, color: G.muted }) }}>Sign In</button>
          <button onClick={onLogin} style={{ ...b({ padding: '9px 18px', background: G.accent, color: '#000', fontWeight: 600 }) }}>Get Started →</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '90px 60px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(139,93,255,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,164,50,0.08)', border: '1px solid rgba(201,164,50,0.25)', borderRadius: 100, padding: '7px 18px', fontSize: 13, color: G.accent, marginBottom: 28, fontWeight: 500 }}>
          🇮🇳 Indian Legal Intelligence Platform — IPC · CrPC · Constitution
        </div>
        <h1 style={{ fontFamily: G.fontDisplay, fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-2px', maxWidth: 800, margin: '0 auto 24px' }}>
          Master Indian Law<br />with <span style={{ color: G.accent }}>AI-Powered</span> Research
        </h1>
        <p style={{ fontSize: 17, color: G.muted, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.75 }}>
          Explore IPC sections, CrPC procedures, and the Constitution through AI chat, semantic search, interactive quizzes, and landmark case references.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button onClick={onLogin} style={{ ...b({ fontSize: 15, padding: '13px 30px', borderRadius: 50, fontWeight: 600, background: `linear-gradient(135deg, ${G.purple}, #a855f7, ${G.accent})`, color: '#fff' }) }}>
            Start Learning Free →
          </button>
          <button onClick={onLogin} style={{ ...b({ fontSize: 15, padding: '13px 30px', borderRadius: 50, background: 'transparent', border: `1px solid ${G.border}`, color: '#fff' }) }}>
            View Demo
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        {[['511', 'IPC Sections'], ['484', 'CrPC Sections'], ['10', 'Quiz Modules'], ['395+', 'Constitution Articles'], ['AI', 'Powered Chat']].map(([val, label], i, arr) => (
          <div key={label} style={{ textAlign: 'center', padding: '28px 40px', borderRight: i < arr.length - 1 ? `1px solid ${G.border}` : 'none' }}>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: G.fontDisplay, color: G.accent }}>{val}</div>
            <div style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '80px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: G.fontDisplay, fontSize: 44, fontWeight: 700, marginBottom: 12 }}>Everything a Law Student Needs</h2>
          <p style={{ color: G.muted, fontSize: 16 }}>A complete platform built for Indian legal education</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 960, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} onClick={onLogin} style={{ ...c({ padding: 26, cursor: 'pointer', transition: 'all 0.25s' }) }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,93,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(139,93,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = G.card; }}>
              <div style={{ fontSize: 30, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: G.muted, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 60px 100px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(139,93,255,0.12), rgba(201,164,50,0.08))', border: `1px solid ${G.border}`, borderRadius: 24, padding: '70px 40px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: G.fontDisplay, fontSize: 42, fontWeight: 700, marginBottom: 16 }}>Start Your Legal Journey</h2>
          <p style={{ color: G.muted, marginBottom: 36, fontSize: 16, lineHeight: 1.7 }}>Join law students and legal professionals mastering Indian law with AI-powered assistance.</p>
          <button onClick={onLogin} style={{ ...b({ fontSize: 16, padding: '14px 44px', borderRadius: 50, background: G.accent, color: '#000', fontWeight: 700 }) }}>
            Create Free Account →
          </button>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${G.border}`, padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.6, fontSize: 13 }}>
          <span>⚖️</span> <span>LegalBot — Indian Legal Intelligence</span>
        </div>
        <div style={{ fontSize: 12, color: G.muted }}>IPC · CrPC · Constitution · Case Law</div>
      </div>
    </div>
  );
}

// ── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const inp = { width: '100%', padding: '12px 15px', borderRadius: 10, border: `1px solid ${G.border}`, background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: G.fontBody, boxSizing: 'border-box', transition: 'border 0.2s' };

  const submit = () => {
    if (!email || !pass) { setErr('Please fill all required fields.'); return; }
    if (mode === 'signup' && !name) { setErr('Please enter your full name.'); return; }
    onSuccess({ name: name || email.split('@')[0], email });
  };

  return (
    <div style={{ minHeight: '100vh', background: G.bg, display: 'flex', fontFamily: G.fontBody }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(139,93,255,0.15) 0%, rgba(201,164,50,0.08) 100%)', borderRight: `1px solid ${G.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,93,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 56, marginBottom: 20 }}>⚖️</div>
        <h1 style={{ fontFamily: G.fontDisplay, fontSize: 48, fontWeight: 700, lineHeight: 1.1, marginBottom: 20, color: '#fff' }}>
          Indian Legal<br/><span style={{ color: G.accent }}>Intelligence</span>
        </h1>
        <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.7, maxWidth: 360, marginBottom: 40 }}>
          AI-powered platform for exploring IPC, CrPC, the Constitution, and landmark case laws.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['💬 AI Legal Chat with Claude', '📖 Browse IPC & CrPC Sections', '🎯 10 Quiz Modules', '🏛️ Constitution Articles & Duties'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: G.muted, fontSize: 14 }}>{item}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', marginBottom: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setErr(''); }} style={{ flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: G.fontBody, fontSize: 14, fontWeight: 600, transition: '0.2s', background: mode === m ? G.accent : 'transparent', color: mode === m ? '#000' : G.muted }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {err && <div style={{ background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.25)', borderRadius: 10, padding: '10px 14px', color: '#ff8080', fontSize: 13, marginBottom: 16 }}>{err}</div>}

          {mode === 'signup' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: G.muted, display: 'block', marginBottom: 6, fontWeight: 500 }}>FULL NAME</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inp} onFocus={e => { e.target.style.borderColor = G.purple; }} onBlur={e => { e.target.style.borderColor = G.border; }} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: G.muted, display: 'block', marginBottom: 6, fontWeight: 500 }}>EMAIL ADDRESS</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp} onFocus={e => { e.target.style.borderColor = G.purple; }} onBlur={e => { e.target.style.borderColor = G.border; }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: G.muted, display: 'block', marginBottom: 6, fontWeight: 500 }}>PASSWORD</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" style={inp} onFocus={e => { e.target.style.borderColor = G.purple; }} onBlur={e => { e.target.style.borderColor = G.border; }} onKeyDown={e => e.key === 'Enter' && submit()} />
          </div>
          <button onClick={submit} style={{ ...b({ width: '100%', padding: '13px', fontSize: 15, borderRadius: 12, fontWeight: 700, background: `linear-gradient(90deg, ${G.purple}, ${G.accent})`, color: '#fff' }) }}>
            {mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
          <div style={{ position: 'relative', margin: '18px 0', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: G.border }} />
            <span style={{ position: 'relative', background: G.bg, padding: '0 12px', color: G.muted, fontSize: 12 }}>OR</span>
          </div>
          <button onClick={() => onSuccess({ name: 'Demo User', email: 'demo@legalbot.in' })} style={{ ...b({ width: '100%', padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, color: G.muted, fontSize: 14 }) }}>
            🚀 Continue as Guest — No signup needed
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, user, onLogout }) {
  const nav = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'chat', icon: '💬', label: 'AI Legal Chat' },
    { id: 'laws', icon: '📖', label: 'Laws Browser' },
    { id: 'articles', icon: '🏛️', label: 'Constitution' },
    { id: 'quiz', icon: '🎯', label: 'Quizzes' },
  ];
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: 240, height: '100vh', background: 'rgba(5,5,18,0.98)', borderRight: `1px solid ${G.border}`, display: 'flex', flexDirection: 'column', padding: '22px 12px', zIndex: 100, backdropFilter: 'blur(20px)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ fontSize: 26, marginBottom: 4 }}>⚖️</div>
        <div style={{ fontFamily: G.fontDisplay, fontSize: 18, fontWeight: 700 }}>LegalBot</div>
        <div style={{ fontSize: 10, color: G.muted, marginTop: 2, letterSpacing: 1 }}>AI LEGAL PLATFORM</div>
      </div>
      <ul style={{ listStyle: 'none', flex: 1 }}>
        {nav.map(item => (
          <li key={item.id} style={{ marginBottom: 3 }}>
            <button onClick={() => setPage(item.id)} style={{ ...b({ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 10, fontFamily: G.fontBody }), background: page === item.id ? 'rgba(139,93,255,0.18)' : 'transparent', border: `1px solid ${page === item.id ? 'rgba(139,93,255,0.3)' : 'transparent'}`, color: page === item.id ? '#fff' : G.muted, fontWeight: page === item.id ? 600 : 400, fontSize: 13.5 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
              {item.label}
              {page === item.id && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: G.purple, flexShrink: 0 }} />}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ borderTop: `1px solid ${G.border}`, paddingTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${G.purple}, ${G.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: 10, color: G.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || ''}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ ...b({ width: '100%', padding: '9px', borderRadius: 9, fontSize: 12 }), background: 'rgba(255,70,70,0.08)', border: '1px solid rgba(255,70,70,0.18)', color: '#ff7979' }}>Sign Out</button>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, setPage }) {
  const [tip] = useState(() => LEGAL_TIPS[Math.floor(Math.random() * LEGAL_TIPS.length)]);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const h = new Date().getHours();
  const greet = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';

  const quickCards = [
    { icon: '💬', label: 'Ask Legal AI', sub: 'Get AI-powered legal answers', page: 'chat', color: G.purple },
    { icon: '📖', label: 'Browse Laws', sub: 'IPC & CrPC sections', page: 'laws', color: '#3b82f6' },
    { icon: '🏛️', label: 'Constitution', sub: 'Articles & Fundamental Rights', page: 'articles', color: '#10b981' },
    { icon: '🎯', label: 'Take a Quiz', sub: '10 comprehensive modules', page: 'quiz', color: G.accent },
  ];

  return (
    <div style={{ padding: '32px 36px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <p style={{ color: G.muted, fontSize: 14, marginBottom: 5 }}>{greet}, {user?.name?.split(' ')[0] || 'Counselor'} 👋</p>
          <h1 style={{ fontFamily: G.fontDisplay, fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>Legal Dashboard</h1>
        </div>
        <div style={{ ...c({ padding: '16px 22px', textAlign: 'right', borderRadius: 14 }) }}>
          <div style={{ fontSize: 20, fontWeight: 600, fontFamily: G.fontMono, color: G.accent }}>{time}</div>
          <div style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>{date}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'IPC Sections', value: '511', icon: '📋', clr: '#3b82f6' },
          { label: 'CrPC Sections', value: '484', icon: '⚖️', clr: G.purple },
          { label: 'Quizzes', value: '10', icon: '🎯', clr: '#10b981' },
          { label: 'Constitution', value: '395', icon: '🏛️', clr: G.accent },
        ].map(s => (
          <div key={s.label} style={{ ...c({ padding: '20px 16px', textAlign: 'center', borderRadius: 14 }) }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: G.fontDisplay, color: s.clr, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: G.muted, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <p style={{ fontSize: 11, color: G.muted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Quick Access</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 28 }}>
        {quickCards.map(card => (
          <div key={card.label} onClick={() => setPage(card.page)} style={{ ...c({ padding: '18px 20px', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', transition: 'all 0.22s', borderRadius: 14 }) }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${card.color}55`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = `${card.color}0a`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = G.card; }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: `${card.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{card.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: G.muted, fontSize: 12, marginTop: 2 }}>{card.sub}</div>
            </div>
            <div style={{ color: G.muted, fontSize: 16 }}>→</div>
          </div>
        ))}
      </div>

      {/* Recent sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ ...c({ padding: '18px 20px', borderRadius: 14 }) }}>
          <p style={{ fontSize: 11, color: G.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase' }}>Key IPC Sections</p>
          {[['302', 'Murder', '#ef4444'], ['498A', 'Cruelty by Husband', G.accent], ['420', 'Cheating', '#3b82f6']].map(([sec, title, clr]) => (
            <div key={sec} onClick={() => setPage('laws')} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${G.border}`, cursor: 'pointer', transition: '0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <span style={{ fontSize: 11, background: `${clr}20`, color: clr, padding: '3px 8px', borderRadius: 6, fontFamily: G.fontMono, fontWeight: 600, flexShrink: 0 }}>§{sec}</span>
              <span style={{ fontSize: 13, color: '#dde0ff' }}>{title}</span>
            </div>
          ))}
        </div>
        <div style={{ ...c({ padding: '18px 20px', borderRadius: 14 }) }}>
          <p style={{ fontSize: 11, color: G.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase' }}>Key CrPC Sections</p>
          {[['154', 'FIR Registration', '#10b981'], ['437', 'Bail (Non-Bailable)', G.purple], ['438', 'Anticipatory Bail', G.accent]].map(([sec, title, clr]) => (
            <div key={sec} onClick={() => setPage('laws')} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${G.border}`, cursor: 'pointer', transition: '0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <span style={{ fontSize: 11, background: `${clr}20`, color: clr, padding: '3px 8px', borderRadius: 6, fontFamily: G.fontMono, fontWeight: 600, flexShrink: 0 }}>§{sec}</span>
              <span style={{ fontSize: 13, color: '#dde0ff' }}>{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div style={{ ...c({ padding: 22, borderLeft: `4px solid ${G.accent}`, borderRadius: '0 14px 14px 0', background: 'rgba(201,164,50,0.04)' }) }}>
        <div style={{ fontSize: 11, color: G.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>💡 Daily Legal Tip</div>
        <p style={{ lineHeight: 1.75, fontSize: 14, color: '#dde0ff', margin: 0 }}>{tip}</p>
      </div>
    </div>
  );
}

// ── AI CHAT PAGE ──────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are LegalBot, an expert AI assistant specializing in Indian law. You help law students, lawyers, and citizens understand:
- Indian Penal Code (IPC, 1860) sections and offences
- Code of Criminal Procedure (CrPC, 1973): arrest, bail, FIR, remand, trial
- Indian Constitution: Fundamental Rights (Part III), DPSP (Part IV), Fundamental Duties (Part IVA)
- Landmark Supreme Court and High Court judgments
- Legal procedures, rights, and remedies

Guidelines:
- Always cite relevant sections clearly (e.g., "Section 302 IPC", "Article 21 of the Constitution")
- Mention 1-2 landmark cases when relevant (case name + year)
- Keep responses focused and educational — structured with clear points
- Be helpful and supportive for law students preparing for exams
- If asked about non-Indian law, redirect to Indian law perspective`;

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! 🙏 I am LegalBot — your AI assistant for Indian law.\n\nI can help you understand IPC sections, CrPC procedures, constitutional rights, and landmark judgments.\n\nWhat legal question can I help you with today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    const newMsgs = [...messages, { role: 'user', content: q }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'assistant', content: data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.' }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '⚠️ Connection error. Please check your internet and try again.' }]);
    }
    setLoading(false);
  };

  const suggestions = ['What is Section 302 IPC?', 'Explain anticipatory bail (Sec 438)', 'What are Fundamental Rights?', 'How to file an FIR?', 'Kesavananda Bharati case', 'Difference between murder and culpable homicide'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '32px 36px 24px' }}>
      <h1 style={{ fontFamily: G.fontDisplay, fontSize: 34, fontWeight: 700, marginBottom: 4 }}>AI Legal Chat</h1>
      <p style={{ color: G.muted, fontSize: 13, marginBottom: 16 }}>Ask any question about Indian law — IPC, CrPC, Constitution, and landmark case laws.</p>

      {/* Suggestions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {suggestions.map(s => (
          <button key={s} onClick={() => setInput(s)} style={{ ...b({ padding: '6px 13px', fontSize: 11, borderRadius: 20, background: 'rgba(139,93,255,0.1)', border: '1px solid rgba(139,93,255,0.2)', color: '#c4b0ff', fontWeight: 500 }) }}>
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', ...c({ padding: 20, borderRadius: 16, marginBottom: 14 }), display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: msg.role === 'user' ? `linear-gradient(135deg, ${G.purple}, ${G.accent})` : 'rgba(255,255,255,0.07)', border: `1px solid ${G.border}` }}>
              {msg.role === 'user' ? '👤' : '⚖️'}
            </div>
            <div style={{ maxWidth: '78%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(139,93,255,0.22), rgba(201,164,50,0.1))' : 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, fontSize: 13.5, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: '#e8eaff' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: `1px solid ${G.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚖️</div>
            <div style={{ padding: '12px 16px', borderRadius: '4px 16px 16px 16px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, color: G.muted, fontSize: 13 }}>Researching Indian law...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about IPC sections, CrPC procedures, constitutional rights, landmark cases..."
          style={{ flex: 1, padding: '13px 20px', borderRadius: 50, border: `1px solid ${G.border}`, background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: G.fontBody }} />
        <button onClick={send} disabled={loading} style={{ ...b({ padding: '13px 24px', borderRadius: 50, fontWeight: 700, fontSize: 15, background: loading ? 'rgba(139,93,255,0.25)' : `linear-gradient(90deg, ${G.purple}, ${G.accent})`, color: '#fff' }) }}>
          {loading ? '...' : '→'}
        </button>
      </div>
    </div>
  );
}

// ── LAWS BROWSER ──────────────────────────────────────────────────────────────
function LawsBrowser() {
  const [tab, setTab] = useState('ipc');
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  const data = tab === 'ipc' ? IPC_SECTIONS : CRPC_SECTIONS;
  const cats = ['All', ...new Set(data.map(s => s.cat))];
  const filtered = data.filter(s =>
    (cat === 'All' || s.cat === cat) &&
    (!search || s.section.includes(search) || s.title.toLowerCase().includes(search.toLowerCase()) || s.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: selected ? 390 : '100%', padding: '32px 24px 32px 36px', overflowY: 'auto', transition: 'width 0.3s', flexShrink: 0 }}>
        <h1 style={{ fontFamily: G.fontDisplay, fontSize: 34, fontWeight: 700, marginBottom: 4 }}>Laws Browser</h1>
        <p style={{ color: G.muted, fontSize: 13, marginBottom: 20 }}>Browse IPC and CrPC sections with full explanations.</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[['ipc', '📋 IPC (1860)'], ['crpc', '⚖️ CrPC (1973)']].map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); setCat('All'); setSelected(null); setSearch(''); }} style={{ ...b({ padding: '9px 20px', borderRadius: 10 }), background: tab === id ? G.accent : 'rgba(255,255,255,0.06)', border: `1px solid ${tab === id ? 'transparent' : G.border}`, color: tab === id ? '#000' : '#fff', fontWeight: tab === id ? 700 : 400, fontSize: 13 }}>
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab.toUpperCase()} by number or keyword...`}
          style={{ width: '100%', padding: '10px 15px', borderRadius: 10, border: `1px solid ${G.border}`, background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 13, marginBottom: 14, outline: 'none', fontFamily: G.fontBody, boxSizing: 'border-box' }} />

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 18 }}>
          {cats.map(ct => (
            <button key={ct} onClick={() => setCat(ct)} style={{ ...b({ padding: '4px 11px', borderRadius: 20, fontSize: 11 }), background: cat === ct ? 'rgba(139,93,255,0.2)' : 'transparent', border: `1px solid ${cat === ct ? 'rgba(139,93,255,0.4)' : G.border}`, color: cat === ct ? '#c4b0ff' : G.muted, fontWeight: cat === ct ? 600 : 400 }}>
              {ct}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(s => (
            <div key={s.section} onClick={() => setSelected(selected?.section === s.section ? null : s)} style={{ ...c({ padding: '14px 16px', cursor: 'pointer', transition: 'all 0.18s', borderRadius: 13, borderColor: selected?.section === s.section ? 'rgba(139,93,255,0.5)' : G.border, background: selected?.section === s.section ? 'rgba(139,93,255,0.07)' : G.card }) }}
              onMouseEnter={e => { if (selected?.section !== s.section) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; } }}
              onMouseLeave={e => { if (selected?.section !== s.section) { e.currentTarget.style.borderColor = G.border; } }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <span style={{ background: 'rgba(139,93,255,0.15)', border: '1px solid rgba(139,93,255,0.3)', borderRadius: 7, padding: '3px 9px', fontSize: 12, fontWeight: 700, color: '#c4b0ff', flexShrink: 0, fontFamily: G.fontMono }}>§{s.section}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: G.accent, marginBottom: 4 }}>{s.cat}</div>
                  <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{s.text.slice(0, selected ? 60 : 100)}...</div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 48, color: G.muted, fontSize: 14 }}>No sections found matching "{search}"</div>}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ flex: 1, padding: '32px 36px 32px 28px', borderLeft: `1px solid ${G.border}`, overflowY: 'auto' }}>
          <button onClick={() => setSelected(null)} style={{ ...b({ marginBottom: 24, fontSize: 12, padding: '8px 14px' }), background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, color: G.muted }}>← Close</button>
          <div style={{ display: 'inline-block', background: 'rgba(139,93,255,0.15)', border: '1px solid rgba(139,93,255,0.3)', borderRadius: 9, padding: '6px 14px', fontSize: 14, fontWeight: 700, color: '#c4b0ff', fontFamily: G.fontMono, marginBottom: 18 }}>
            Section {selected.section} {tab.toUpperCase()}
          </div>
          <h2 style={{ fontFamily: G.fontDisplay, fontSize: 30, fontWeight: 700, marginBottom: 6, lineHeight: 1.2 }}>{selected.title}</h2>
          <div style={{ color: G.accent, fontSize: 13, marginBottom: 26 }}>{selected.cat}</div>
          <div style={{ ...c({ padding: 24, borderLeft: `4px solid ${G.purple}`, borderRadius: '0 14px 14px 0', background: 'rgba(139,93,255,0.04)' }) }}>
            <p style={{ lineHeight: 1.85, fontSize: 14.5, color: '#dde2ff', margin: 0 }}>{selected.text}</p>
          </div>
          <div style={{ marginTop: 20, ...c({ padding: '14px 18px', borderRadius: 12, display: 'flex', gap: 10, alignItems: 'center' }) }}>
            <span style={{ fontSize: 16 }}>📌</span>
            <div style={{ fontSize: 13, color: G.muted }}>
              Section {selected.section} of the {tab === 'ipc' ? 'Indian Penal Code, 1860' : 'Code of Criminal Procedure, 1973'} — <span style={{ color: G.accent }}>{selected.cat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── QUIZ PAGE ─────────────────────────────────────────────────────────────────
function QuizPage() {
  const [active, setActive] = useState(null);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const start = (quiz) => { setActive(quiz); setQi(0); setSel(null); setScore(0); setDone(false); };
  const reset = () => setActive(null);

  const pick = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    if (idx === active.questions[qi].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qi + 1 >= active.questions.length) { setDone(true); return; }
    setQi(i => i + 1);
    setSel(null);
  };

  if (!active) {
    return (
      <div style={{ padding: '32px 36px' }}>
        <h1 style={{ fontFamily: G.fontDisplay, fontSize: 34, fontWeight: 700, marginBottom: 4 }}>Legal Quizzes</h1>
        <p style={{ color: G.muted, fontSize: 13, marginBottom: 28 }}>10 comprehensive quiz modules covering all key areas of Indian law. Test your knowledge!</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          {QUIZZES.map((quiz, i) => (
            <div key={i} onClick={() => start(quiz)} style={{ ...c({ padding: '22px 24px', cursor: 'pointer', transition: 'all 0.22s', borderRadius: 14 }) }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${G.purple}50`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(139,93,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = G.card; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 30 }}>{quiz.emoji}</div>
                <div style={{ fontSize: 11, color: G.muted, background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 20 }}>{quiz.questions.length} Qs</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 6 }}>{quiz.title}</div>
              <div style={{ color: G.accent, fontSize: 12, fontWeight: 500 }}>Start Quiz →</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / active.questions.length) * 100);
    const medal = pct >= 80 ? '🏆' : pct >= 50 ? '📚' : '💪';
    const msg = pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good effort!' : 'Keep practicing!';
    const clr = pct >= 80 ? '#10b981' : pct >= 50 ? G.accent : '#ef4444';
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 36 }}>
        <div style={{ ...c({ padding: '50px 44px', textAlign: 'center', maxWidth: 480, borderRadius: 22 }) }}>
          <div style={{ fontSize: 64, marginBottom: 18 }}>{medal}</div>
          <h2 style={{ fontFamily: G.fontDisplay, fontSize: 38, fontWeight: 700, marginBottom: 6 }}>Quiz Complete!</h2>
          <p style={{ color: G.muted, marginBottom: 28, fontSize: 14 }}>{active.title}</p>
          <div style={{ fontSize: 64, fontWeight: 700, fontFamily: G.fontDisplay, color: clr, marginBottom: 4 }}>{score}/{active.questions.length}</div>
          <div style={{ fontSize: 20, color: clr, marginBottom: 8 }}>{pct}%</div>
          <div style={{ color: G.muted, marginBottom: 36, fontSize: 15 }}>{msg}</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => start(active)} style={{ ...b({ padding: '12px 26px', borderRadius: 11, fontWeight: 700, background: `linear-gradient(90deg, ${G.purple}, ${G.accent})`, color: '#fff' }) }}>Retry</button>
            <button onClick={reset} style={{ ...b({ padding: '12px 26px', borderRadius: 11, background: 'transparent', border: `1px solid ${G.border}`, color: G.muted }) }}>All Quizzes</button>
          </div>
        </div>
      </div>
    );
  }

  const q = active.questions[qi];
  return (
    <div style={{ padding: '32px 36px', maxWidth: 680 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <button onClick={reset} style={{ ...b({ fontSize: 12, padding: '7px 14px', background: 'transparent', border: `1px solid ${G.border}`, color: G.muted }) }}>← Quit</button>
        <div style={{ fontSize: 13, color: G.muted }}>{active.title} · Q {qi + 1}/{active.questions.length}</div>
        <div style={{ fontSize: 13, color: G.accent, fontWeight: 600 }}>Score: {score}</div>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 32 }}>
        <div style={{ height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${G.purple}, ${G.accent})`, width: `${(qi / active.questions.length) * 100}%`, transition: '0.4s' }} />
      </div>
      <h2 style={{ fontFamily: G.fontDisplay, fontSize: 26, lineHeight: 1.4, marginBottom: 30, fontWeight: 600 }}>{q.q}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
        {q.options.map((opt, i) => {
          let bc = G.border, bg = 'rgba(255,255,255,0.04)', tc = '#fff';
          if (sel !== null) {
            if (i === q.answer) { bc = '#10b98180'; bg = 'rgba(16,185,129,0.1)'; tc = '#6ee7b7'; }
            else if (i === sel) { bc = '#ef444480'; bg = 'rgba(239,68,68,0.1)'; tc = '#fca5a5'; }
          }
          return (
            <div key={i} onClick={() => pick(i)} style={{ ...c({ padding: '14px 18px', cursor: sel !== null ? 'default' : 'pointer', borderColor: bc, background: bg, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', transition: 'all 0.2s' }) }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', border: `1px solid ${bc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: tc, flexShrink: 0, fontWeight: 600 }}>
                {sel !== null && i === q.answer ? '✓' : sel === i && i !== q.answer ? '✗' : String.fromCharCode(65 + i)}
              </div>
              <span style={{ color: tc, fontSize: 14 }}>{opt}</span>
            </div>
          );
        })}
      </div>
      {sel !== null && (
        <button onClick={next} style={{ ...b({ padding: '12px 28px', borderRadius: 11, fontWeight: 700, fontSize: 14, background: `linear-gradient(90deg, ${G.purple}, ${G.accent})`, color: '#fff' }) }}>
          {qi + 1 >= active.questions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ── CONSTITUTION ARTICLES PAGE ────────────────────────────────────────────────
function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [part, setPart] = useState('All');
  const [selected, setSelected] = useState(null);

  const parts = ['All', ...new Set(ARTICLES.map(a => a.part))];
  const filtered = ARTICLES.filter(a =>
    (part === 'All' || a.part === part) &&
    (!search || a.no.includes(search) || a.title.toLowerCase().includes(search.toLowerCase()) || a.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: selected ? 390 : '100%', padding: '32px 24px 32px 36px', overflowY: 'auto', transition: 'width 0.3s', flexShrink: 0 }}>
        <h1 style={{ fontFamily: G.fontDisplay, fontSize: 34, fontWeight: 700, marginBottom: 4 }}>Constitution of India</h1>
        <p style={{ color: G.muted, fontSize: 13, marginBottom: 20 }}>Explore Fundamental Rights, Directive Principles, and Fundamental Duties.</p>

        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles by number, title, or keyword..."
          style={{ width: '100%', padding: '10px 15px', borderRadius: 10, border: `1px solid ${G.border}`, background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 13, marginBottom: 14, outline: 'none', fontFamily: G.fontBody, boxSizing: 'border-box' }} />

        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
          {parts.map(p => (
            <button key={p} onClick={() => setPart(p)} style={{ ...b({ padding: '4px 11px', borderRadius: 20, fontSize: 11 }), background: part === p ? 'rgba(201,164,50,0.18)' : 'transparent', border: `1px solid ${part === p ? 'rgba(201,164,50,0.4)' : G.border}`, color: part === p ? G.accent : G.muted, fontWeight: part === p ? 600 : 400 }}>
              {p === 'All' ? 'All Parts' : p.replace(' – ', ': ')}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(a => (
            <div key={a.no} onClick={() => setSelected(selected?.no === a.no ? null : a)} style={{ ...c({ padding: '14px 16px', cursor: 'pointer', transition: 'all 0.18s', borderRadius: 13, borderColor: selected?.no === a.no ? 'rgba(201,164,50,0.5)' : G.border, background: selected?.no === a.no ? 'rgba(201,164,50,0.05)' : G.card }) }}
              onMouseEnter={e => { if (selected?.no !== a.no) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; }}
              onMouseLeave={e => { if (selected?.no !== a.no) e.currentTarget.style.borderColor = G.border; }}>
              <div style={{ display: 'flex', gap: 11 }}>
                <span style={{ background: 'rgba(201,164,50,0.15)', border: '1px solid rgba(201,164,50,0.3)', borderRadius: 7, padding: '3px 9px', fontSize: 12, fontWeight: 700, color: G.accent, flexShrink: 0 }}>Art.{a.no}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 3 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: G.muted, marginBottom: 4 }}>{a.part}</div>
                  <div style={{ fontSize: 12, color: G.muted, lineHeight: 1.5 }}>{a.text.slice(0, selected ? 60 : 95)}...</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={{ flex: 1, padding: '32px 36px 32px 28px', borderLeft: `1px solid ${G.border}`, overflowY: 'auto' }}>
          <button onClick={() => setSelected(null)} style={{ ...b({ marginBottom: 24, fontSize: 12, padding: '8px 14px' }), background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, color: G.muted }}>← Close</button>
          <div style={{ display: 'inline-block', background: 'rgba(201,164,50,0.15)', border: '1px solid rgba(201,164,50,0.3)', borderRadius: 9, padding: '6px 14px', fontSize: 14, fontWeight: 700, color: G.accent, marginBottom: 18 }}>
            Article {selected.no}
          </div>
          <h2 style={{ fontFamily: G.fontDisplay, fontSize: 30, fontWeight: 700, marginBottom: 6, lineHeight: 1.2 }}>{selected.title}</h2>
          <div style={{ color: G.muted, fontSize: 13, marginBottom: 26 }}>{selected.part}</div>
          <div style={{ ...c({ padding: 24, borderLeft: `4px solid ${G.accent}`, borderRadius: '0 14px 14px 0', background: 'rgba(201,164,50,0.04)' }) }}>
            <p style={{ lineHeight: 1.85, fontSize: 14.5, color: '#dde2ff', margin: 0 }}>{selected.text}</p>
          </div>
          <div style={{ marginTop: 20, ...c({ padding: '14px 18px', borderRadius: 12, display: 'flex', gap: 10, alignItems: 'center' }) }}>
            <span>📌</span>
            <div style={{ fontSize: 13, color: G.muted }}>
              {selected.part} — Constitution of India, 1950
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('landing');
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  if (view === 'landing') return <Landing onLogin={() => setView('auth')} />;
  if (view === 'auth') return <AuthPage onSuccess={(u) => { setUser(u); setView('app'); }} />;

  return (
    <div style={{ display: 'flex', background: G.bg, minHeight: '100vh', fontFamily: G.fontBody, color: '#fff' }}>
      <Sidebar page={page} setPage={setPage} user={user} onLogout={() => { setUser(null); setView('landing'); setPage('dashboard'); }} />
      <div style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }}>
        {page === 'dashboard' && <Dashboard user={user} setPage={setPage} />}
        {page === 'chat' && <ChatPage />}
        {page === 'laws' && <LawsBrowser />}
        {page === 'articles' && <ArticlesPage />}
        {page === 'quiz' && <QuizPage />}
      </div>
    </div>
  );
}
