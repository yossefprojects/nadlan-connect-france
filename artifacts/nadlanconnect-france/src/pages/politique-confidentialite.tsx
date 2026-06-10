import { Layout } from "@/components/layout";
import { Shield } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      badge: "RGPD & Confidentialité",
      title: "Politique de Confidentialité",
      updated: "Dernière mise à jour : juin 2025",
    },
    s1: {
      title: "1. Responsable du traitement",
      before:
        "NadlanConnect France, extension française de NadlanConnect.com, est responsable du traitement de vos données personnelles collectées sur le site ",
      domain: "nadlan-connect-france.replit.app",
      after: ".",
    },
    s2: {
      title: "2. Données collectées",
      intro: "Nous collectons uniquement les données nécessaires au bon fonctionnement du service :",
      items: [
        "Données de simulation immobilière (prix, surface, revenus) — traitées localement, non stockées",
        "Adresses email fournies volontairement via le formulaire d'inscription aux alertes",
        "Données de navigation anonymisées (cookies analytiques si consentement)",
        "Données des documents PDF analysés — traitement IA temporaire, non conservées",
      ],
    },
    s3: {
      title: "3. Finalités du traitement",
      items: [
        "Fourniture des outils de simulation et d'analyse IA",
        "Envoi d'alertes et d'opportunités immobilières (sur consentement)",
        "Amélioration du service et mesure d'audience (avec votre accord)",
      ],
    },
    s4: {
      title: "4. Base légale",
      intro: "Le traitement repose sur :",
      items: [
        { label: "Consentement", text: " : pour les cookies non essentiels et les communications marketing" },
        { label: "Intérêt légitime", text: " : pour la sécurité du site et la prévention des fraudes" },
        { label: "Exécution du contrat", text: " : pour la fourniture des services demandés" },
      ],
    },
    s5: {
      title: "5. Durée de conservation",
      items: [
        "Données de simulation : non conservées (traitement en temps réel)",
        "Documents PDF : supprimés immédiatement après analyse",
        "Adresses email (inscriptions) : jusqu'à désinscription ou 3 ans maximum",
        "Cookies analytiques : 13 mois maximum",
      ],
    },
    s6: {
      title: "6. Vos droits (RGPD)",
      intro: "Conformément au RGPD, vous disposez des droits suivants :",
      items: [
        { label: "Droit d'accès", text: " : obtenir une copie de vos données" },
        { label: "Droit de rectification", text: " : corriger des données inexactes" },
        { label: "Droit à l'effacement", text: " : demander la suppression de vos données" },
        { label: "Droit à la portabilité", text: " : recevoir vos données dans un format structuré" },
        { label: "Droit d'opposition", text: " : vous opposer à certains traitements" },
      ],
      contactBefore: "Pour exercer vos droits, contactez-nous via",
      contactLink: "nadlanconnect.com",
      contactMid: ". Vous pouvez également introduire une réclamation auprès de la",
      cnilLink: "CNIL",
      contactEnd: ".",
    },
    s7: {
      title: "7. Cookies",
      intro: "Nous utilisons des cookies pour :",
      items: [
        { label: "Cookies essentiels", text: " : fonctionnement du site (pas de consentement requis)" },
        { label: "Cookies analytiques", text: " : mesure d'audience anonymisée (avec votre accord)" },
      ],
      outro: "Vous pouvez modifier vos préférences à tout moment via le bandeau cookies.",
    },
    s8: {
      title: "8. Sécurité",
      p: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Le site utilise HTTPS, des en-têtes de sécurité (X-Frame-Options, Content-Security-Policy) et des connexions chiffrées.",
    },
    s9: {
      title: "9. Transferts internationaux",
      p: "Les simulations IA utilisent l'API Anthropic Claude, hébergée aux États-Unis. Les données transmises sont limitées aux informations strictement nécessaires à la simulation et ne permettent pas d'identifier personnellement un utilisateur.",
    },
  },
  en: {
    hero: {
      badge: "GDPR & Privacy",
      title: "Privacy Policy",
      updated: "Last updated: June 2025",
    },
    s1: {
      title: "1. Data controller",
      before:
        "NadlanConnect France, the French extension of NadlanConnect.com, is the controller responsible for processing the personal data collected on the website ",
      domain: "nadlan-connect-france.replit.app",
      after: ".",
    },
    s2: {
      title: "2. Data collected",
      intro: "We only collect the data necessary for the service to function properly:",
      items: [
        "Property simulation data (price, surface area, income) — processed locally, not stored",
        "Email addresses voluntarily provided through the alerts sign-up form",
        "Anonymized browsing data (analytics cookies subject to consent)",
        "Data from analyzed PDF documents — temporary AI processing, not retained",
      ],
    },
    s3: {
      title: "3. Purposes of processing",
      items: [
        "Providing the simulation and AI analysis tools",
        "Sending property alerts and opportunities (subject to consent)",
        "Improving the service and measuring audience (with your consent)",
      ],
    },
    s4: {
      title: "4. Legal basis",
      intro: "Processing is based on:",
      items: [
        { label: "Consent", text: ": for non-essential cookies and marketing communications" },
        { label: "Legitimate interest", text: ": for site security and fraud prevention" },
        { label: "Performance of a contract", text: ": for the delivery of the requested services" },
      ],
    },
    s5: {
      title: "5. Retention period",
      items: [
        "Simulation data: not retained (processed in real time)",
        "PDF documents: deleted immediately after analysis",
        "Email addresses (sign-ups): until unsubscription or 3 years maximum",
        "Analytics cookies: 13 months maximum",
      ],
    },
    s6: {
      title: "6. Your rights (GDPR)",
      intro: "In accordance with the GDPR, you have the following rights:",
      items: [
        { label: "Right of access", text: ": obtain a copy of your data" },
        { label: "Right to rectification", text: ": correct inaccurate data" },
        { label: "Right to erasure", text: ": request the deletion of your data" },
        { label: "Right to portability", text: ": receive your data in a structured format" },
        { label: "Right to object", text: ": object to certain processing operations" },
      ],
      contactBefore: "To exercise your rights, contact us via",
      contactLink: "nadlanconnect.com",
      contactMid: ". You may also lodge a complaint with the",
      cnilLink: "CNIL",
      contactEnd: " (France's data protection authority).",
    },
    s7: {
      title: "7. Cookies",
      intro: "We use the following cookies:",
      items: [
        { label: "Essential cookies", text: ": for the site to function (no consent required)" },
        { label: "Analytics cookies", text: ": anonymized audience measurement (with your consent)" },
      ],
      outro: "You can change your preferences at any time via the cookie banner.",
    },
    s8: {
      title: "8. Security",
      p: "We implement appropriate technical and organizational measures to protect your data against any unauthorized access, loss or disclosure. The site uses HTTPS, security headers (X-Frame-Options, Content-Security-Policy) and encrypted connections.",
    },
    s9: {
      title: "9. International transfers",
      p: "AI simulations use the Anthropic Claude API, which is hosted in the United States. The data transmitted is limited to the information strictly necessary for the simulation and does not allow a user to be personally identified.",
    },
  },
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PolitiqueConfidentialite() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <Layout>
      <section className="relative h-[28vh] min-h-[180px] flex items-end overflow-hidden bg-[#1E3A5F]">
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <Shield className="w-3 h-3" /> {t.hero.badge}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">{t.hero.title}</h1>
          <p className="text-white/50 text-sm mt-1">{t.hero.updated}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <Section title={t.s1.title}>
          <p>
            {t.s1.before}<strong>{t.s1.domain}</strong>{t.s1.after}
          </p>
        </Section>

        <Section title={t.s2.title}>
          <p>{t.s2.intro}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {t.s2.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.s3.title}>
          <ul className="list-disc list-inside space-y-1">
            {t.s3.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.s4.title}>
          <p>{t.s4.intro}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {t.s4.items.map((item) => (
              <li key={item.label}><strong>{item.label}</strong>{item.text}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.s5.title}>
          <ul className="list-disc list-inside space-y-1">
            {t.s5.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.s6.title}>
          <p>{t.s6.intro}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {t.s6.items.map((item) => (
              <li key={item.label}><strong>{item.label}</strong>{item.text}</li>
            ))}
          </ul>
          <p className="mt-3">
            {t.s6.contactBefore}{" "}
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
              {t.s6.contactLink}
            </a>{t.s6.contactMid}{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">{t.s6.cnilLink}</a>{t.s6.contactEnd}
          </p>
        </Section>

        <Section title={t.s7.title}>
          <p>{t.s7.intro}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {t.s7.items.map((item) => (
              <li key={item.label}><strong>{item.label}</strong>{item.text}</li>
            ))}
          </ul>
          <p className="mt-3">{t.s7.outro}</p>
        </Section>

        <Section title={t.s8.title}>
          <p>{t.s8.p}</p>
        </Section>

        <Section title={t.s9.title}>
          <p>{t.s9.p}</p>
        </Section>
      </div>
    </Layout>
  );
}
