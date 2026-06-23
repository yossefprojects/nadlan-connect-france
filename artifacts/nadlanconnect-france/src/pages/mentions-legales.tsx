import { Layout } from "@/components/layout";
import { FileText } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  fr: {
    hero: {
      badge: "Informations légales",
      title: "Mentions Légales",
      subtitle: "Conformément à la loi n°2004-575 du 21 juin 2004",
    },
    editor: {
      title: "1. Éditeur du site",
      introBold: "NadlanConnect France",
      introText: " est une extension française de NadlanConnect.com.",
      websiteLabel: "Site web : ",
      contactLabel: "Email de contact : disponible sur ",
    },
    hosting: {
      title: "2. Hébergement",
      hostedByBefore: "Ce site est hébergé par ",
      hostName: "Replit, Inc.",
      location: "San Francisco, Californie, États-Unis",
    },
    ip: {
      title: "3. Propriété intellectuelle",
      body: "L'ensemble du contenu de ce site (textes, images, logos, simulateurs, algorithmes) est la propriété exclusive de NadlanConnect France / NadlanConnect.com. Toute reproduction, distribution, modification ou utilisation à des fins commerciales sans autorisation écrite préalable est strictement interdite.",
    },
    data: {
      title: "4. Données personnelles",
      before: "Le traitement des données personnelles est décrit dans notre ",
      link: "Politique de Confidentialité",
      after: ". Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
    },
    liability: {
      title: "5. Responsabilité",
      p1: "NadlanConnect France s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'exactitude, l'exhaustivité ou la pertinence des informations disponibles sur ce site.",
      p2Bold: "Important :",
      p2Text: " Les simulations fournies par notre outil sont indicatives et ne constituent pas un conseil financier, fiscal ou juridique. Tout investissement immobilier comporte des risques. Consultez un professionnel qualifié avant toute décision d'investissement.",
    },
    externalLinks: {
      title: "6. Liens externes",
      before: "Ce site peut contenir des liens vers des sites tiers. NadlanConnect France ne contrôle pas ces sites et ne peut être tenu responsable de leur contenu. Les liens externes s'ouvrent avec l'attribut ",
      after: ".",
    },
    law: {
      title: "7. Droit applicable",
      body: "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.",
    },
    contact: {
      title: "8. Contact",
      before: "Pour toute question relative au site, vous pouvez nous contacter via ",
      after: ".",
    },
  },
  en: {
    hero: {
      badge: "Legal information",
      title: "Legal Notice",
      subtitle: "In accordance with French Law No. 2004-575 of 21 June 2004",
    },
    editor: {
      title: "1. Site publisher",
      introBold: "NadlanConnect France",
      introText: " is the French extension of NadlanConnect.com.",
      websiteLabel: "Website: ",
      contactLabel: "Contact email: available on ",
    },
    hosting: {
      title: "2. Hosting",
      hostedByBefore: "This site is hosted by ",
      hostName: "Replit, Inc.",
      location: "San Francisco, California, United States",
    },
    ip: {
      title: "3. Intellectual property",
      body: "All content on this site (text, images, logos, simulators, algorithms) is the exclusive property of NadlanConnect France / NadlanConnect.com. Any reproduction, distribution, modification or commercial use without prior written authorization is strictly prohibited.",
    },
    data: {
      title: "4. Personal data",
      before: "The processing of personal data is described in our ",
      link: "Privacy Policy",
      after: ". In accordance with the GDPR and the French Data Protection Act (loi Informatique et Libertés), you have the right to access, rectify and delete your data.",
    },
    liability: {
      title: "5. Liability",
      p1: "NadlanConnect France strives to provide accurate and up-to-date information but cannot guarantee the accuracy, completeness or relevance of the information available on this site.",
      p2Bold: "Important:",
      p2Text: " The simulations provided by our tool are indicative and do not constitute financial, tax or legal advice. Any property investment carries risks. Consult a qualified professional before making any investment decision.",
    },
    externalLinks: {
      title: "6. External links",
      before: "This site may contain links to third-party sites. NadlanConnect France does not control these sites and cannot be held responsible for their content. External links open with the ",
      after: " attribute.",
    },
    law: {
      title: "7. Applicable law",
      body: "These legal notices are governed by French law. In the event of a dispute, the French courts shall have sole jurisdiction.",
    },
    contact: {
      title: "8. Contact",
      before: "For any question regarding the site, you can contact us via ",
      after: ".",
    },
  },
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function MentionsLegales() {
  const { lang } = useLang();
  const t = content[lang];
  return (
    <Layout>
      <section className="relative h-[28vh] min-h-[180px] flex items-end overflow-hidden bg-[#0d1117]">
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <FileText className="w-3 h-3" /> {t.hero.badge}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">{t.hero.title}</h1>
          <p className="text-white/50 text-sm mt-1">{t.hero.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <Section title={t.editor.title}>
          <p><strong>{t.editor.introBold}</strong>{t.editor.introText}</p>
          <p>{t.editor.websiteLabel}<a href="https://nadlan-connect-france.replit.app" className="text-sea hover:underline">nadlan-connect-france.replit.app</a></p>
          <p>{t.editor.contactLabel}<a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-sea hover:underline">nadlanconnect.com</a></p>
        </Section>

        <Section title={t.hosting.title}>
          <p>
            {t.hosting.hostedByBefore}<strong>{t.hosting.hostName}</strong><br />
            {t.hosting.location}<br />
            <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-sea hover:underline">replit.com</a>
          </p>
        </Section>

        <Section title={t.ip.title}>
          <p>{t.ip.body}</p>
        </Section>

        <Section title={t.data.title}>
          <p>
            {t.data.before}
            <a href="/politique-confidentialite" className="text-sea hover:underline">
              {t.data.link}
            </a>{t.data.after}
          </p>
        </Section>

        <Section title={t.liability.title}>
          <p>{t.liability.p1}</p>
          <p>
            <strong>{t.liability.p2Bold}</strong>{t.liability.p2Text}
          </p>
        </Section>

        <Section title={t.externalLinks.title}>
          <p>
            {t.externalLinks.before}<code className="bg-gray-100 px-1 rounded text-xs">rel="noopener noreferrer"</code>{t.externalLinks.after}
          </p>
        </Section>

        <Section title={t.law.title}>
          <p>{t.law.body}</p>
        </Section>

        <Section title={t.contact.title}>
          <p>
            {t.contact.before}
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-sea hover:underline">
              nadlanconnect.com
            </a>{t.contact.after}
          </p>
        </Section>
      </div>
    </Layout>
  );
}
