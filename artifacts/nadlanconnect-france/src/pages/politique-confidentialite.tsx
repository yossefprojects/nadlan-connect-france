import { Layout } from "@/components/layout";
import { Shield } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PolitiqueConfidentialite() {
  return (
    <Layout>
      <section className="relative h-[28vh] min-h-[180px] flex items-end overflow-hidden bg-[#1E3A5F]">
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium mb-3">
            <Shield className="w-3 h-3" /> RGPD & Confidentialité
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Politique de Confidentialité</h1>
          <p className="text-white/50 text-sm mt-1">Dernière mise à jour : juin 2025</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <Section title="1. Responsable du traitement">
          <p>
            NadlanConnect France, extension française de NadlanConnect.com, est responsable du traitement
            de vos données personnelles collectées sur le site <strong>nadlan-connect-france.replit.app</strong>.
          </p>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons uniquement les données nécessaires au bon fonctionnement du service :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Données de simulation immobilière (prix, surface, revenus) — traitées localement, non stockées</li>
            <li>Adresses email fournies volontairement via le formulaire d'inscription aux alertes</li>
            <li>Données de navigation anonymisées (cookies analytiques si consentement)</li>
            <li>Données des documents PDF analysés — traitement IA temporaire, non conservées</li>
          </ul>
        </Section>

        <Section title="3. Finalités du traitement">
          <ul className="list-disc list-inside space-y-1">
            <li>Fourniture des outils de simulation et d'analyse IA</li>
            <li>Envoi d'alertes et d'opportunités immobilières (sur consentement)</li>
            <li>Amélioration du service et mesure d'audience (avec votre accord)</li>
          </ul>
        </Section>

        <Section title="4. Base légale">
          <p>Le traitement repose sur :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Consentement</strong> : pour les cookies non essentiels et les communications marketing</li>
            <li><strong>Intérêt légitime</strong> : pour la sécurité du site et la prévention des fraudes</li>
            <li><strong>Exécution du contrat</strong> : pour la fourniture des services demandés</li>
          </ul>
        </Section>

        <Section title="5. Durée de conservation">
          <ul className="list-disc list-inside space-y-1">
            <li>Données de simulation : non conservées (traitement en temps réel)</li>
            <li>Documents PDF : supprimés immédiatement après analyse</li>
            <li>Adresses email (inscriptions) : jusqu'à désinscription ou 3 ans maximum</li>
            <li>Cookies analytiques : 13 mois maximum</li>
          </ul>
        </Section>

        <Section title="6. Vos droits (RGPD)">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer à certains traitements</li>
          </ul>
          <p className="mt-3">
            Pour exercer vos droits, contactez-nous via{" "}
            <a href="https://nadlanconnect.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
              nadlanconnect.com
            </a>.
            Vous pouvez également introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">CNIL</a>.
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>Nous utilisons des cookies pour :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Cookies essentiels</strong> : fonctionnement du site (pas de consentement requis)</li>
            <li><strong>Cookies analytiques</strong> : mesure d'audience anonymisée (avec votre accord)</li>
          </ul>
          <p className="mt-3">Vous pouvez modifier vos préférences à tout moment via le bandeau cookies.</p>
        </Section>

        <Section title="8. Sécurité">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
            vos données contre tout accès non autorisé, perte ou divulgation. Le site utilise HTTPS,
            des en-têtes de sécurité (X-Frame-Options, Content-Security-Policy) et des connexions chiffrées.
          </p>
        </Section>

        <Section title="9. Transferts internationaux">
          <p>
            Les simulations IA utilisent l'API Anthropic Claude, hébergée aux États-Unis. Les données
            transmises sont limitées aux informations strictement nécessaires à la simulation et ne
            permettent pas d'identifier personnellement un utilisateur.
          </p>
        </Section>
      </div>
    </Layout>
  );
}
