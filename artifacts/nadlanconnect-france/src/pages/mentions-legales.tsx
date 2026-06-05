import { Layout } from "@/components/layout";
import { FileText } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function MentionsLegales() {
  return (
    <Layout>
      <section className="relative h-[28vh] min-h-[180px] flex items-end overflow-hidden bg-[#0d1117]">
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <FileText className="w-3 h-3" /> Informations légales
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Mentions Légales</h1>
          <p className="text-white/50 text-sm mt-1">Conformément à la loi n°2004-575 du 21 juin 2004</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <Section title="1. Éditeur du site">
          <p><strong>NadlanConnect France</strong> est une extension française de NadlanConnect.com.</p>
          <p>Site web : <a href="https://nadlan-connect-france.replit.app" className="text-[#C9A84C] hover:underline">nadlan-connect-france.replit.app</a></p>
          <p>Email de contact : disponible sur <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">nadlanconnect.com</a></p>
        </Section>

        <Section title="2. Hébergement">
          <p>
            Ce site est hébergé par <strong>Replit, Inc.</strong><br />
            San Francisco, Californie, États-Unis<br />
            <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">replit.com</a>
          </p>
        </Section>

        <Section title="3. Propriété intellectuelle">
          <p>
            L'ensemble du contenu de ce site (textes, images, logos, simulateurs, algorithmes) est la
            propriété exclusive de NadlanConnect France / NadlanConnect.com. Toute reproduction,
            distribution, modification ou utilisation à des fins commerciales sans autorisation écrite
            préalable est strictement interdite.
          </p>
        </Section>

        <Section title="4. Données personnelles">
          <p>
            Le traitement des données personnelles est décrit dans notre{" "}
            <a href="/politique-confidentialite" className="text-[#C9A84C] hover:underline">
              Politique de Confidentialité
            </a>.
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
            de rectification et de suppression de vos données.
          </p>
        </Section>

        <Section title="5. Responsabilité">
          <p>
            NadlanConnect France s'efforce de fournir des informations exactes et à jour, mais ne peut
            garantir l'exactitude, l'exhaustivité ou la pertinence des informations disponibles sur ce site.
          </p>
          <p>
            <strong>Important :</strong> Les simulations fournies par notre outil sont indicatives et ne
            constituent pas un conseil financier, fiscal ou juridique. Tout investissement immobilier
            comporte des risques. Consultez un professionnel qualifié avant toute décision d'investissement.
          </p>
        </Section>

        <Section title="6. Liens externes">
          <p>
            Ce site peut contenir des liens vers des sites tiers. NadlanConnect France ne contrôle pas
            ces sites et ne peut être tenu responsable de leur contenu. Les liens externes s'ouvrent
            avec l'attribut <code className="bg-gray-100 px-1 rounded text-xs">rel="noopener noreferrer"</code>.
          </p>
        </Section>

        <Section title="7. Droit applicable">
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les
            tribunaux français seront seuls compétents.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Pour toute question relative au site, vous pouvez nous contacter via{" "}
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
              nadlanconnect.com
            </a>.
          </p>
        </Section>
      </div>
    </Layout>
  );
}
