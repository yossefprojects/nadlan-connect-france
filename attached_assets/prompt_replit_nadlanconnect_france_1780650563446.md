# PROMPT REPLIT — NadlanConnect France

## Site immobilier neuf français : droits, aides & défiscalisation

-----

Tu es un expert fullstack senior. Crée un site web complet appelé **NadlanConnect France** — une plateforme d’information et d’accompagnement sur l’immobilier neuf en France, visuellement connectée au site NadlanConnect (<https://nadlanconnect.com>).

-----

## 🎨 DESIGN — COHÉRENCE AVEC NADLANCONNECT

- Reprendre exactement la palette du site parent : bleu marine `#1E3A5F`, blanc `#FFFFFF`, accents dorés `#C9A84C`
- Logo : “NadlanConnect 🇫🇷 France” avec le même style typographique
- Header avec navigation : Accueil | Marché Neuf | Défiscalisation | Simulateur | Acteurs | Contact
- Footer avec mention : “NadlanConnect France — Une extension de NadlanConnect.com”
- Police : DM Sans (Google Fonts)
- Design responsive mobile-first
- Cards avec ombres douces, badges colorés, style professionnel et moderne

-----

## 🏗️ STACK TECHNIQUE

- **Frontend** : React 18 + Vite + Tailwind CSS
- **Backend** : Node.js + Express
- **PDF** : pdf-lib (lecture), pdfmake (génération), @react-pdf/renderer (brochures)
- **Upload** : Multer
- **IA** : Claude API — modèle `claude-sonnet-4-20250514`
- **Langue** : Français uniquement

-----

## 📄 CONTENU DU SITE — 5 PAGES PRINCIPALES

### Page 1 — Accueil (`/`)

- Hero section : “Investissez dans l’immobilier neuf en France” avec CTA “Découvrir les dispositifs” et “Simuler mon investissement”
- 3 blocs d’accroche :
  - ✅ Frais de notaire réduits (2-3% vs 7-8% dans l’ancien)
  - ✅ Normes RE2020 — performance énergétique garantie
  - ✅ Défiscalisation via Jeanbrun ou LMNP
- Section “Pourquoi NadlanConnect France ?” avec lien vers NadlanConnect.com

-----

### Page 2 — Marché Neuf (`/marche-neuf`)

Présenter les 3 piliers fondamentaux (données tirées du PDF) :

**Bloc 1 — La VEFA (Vente en l’État Futur d’Achèvement)**

- Achat sur plan sécurisé par la Garantie Financière d’Achèvement (GFA)
- Appels de fonds légaux : 35% à l’achèvement des fondations, 70% à la mise hors d’eau
- Afficher un schéma visuel des étapes de paiement VEFA

**Bloc 2 — La RE2020**

- Norme de construction à consommation quasi-nulle
- Faible empreinte carbone, charges réduites
- Badge “Valeur verte garantie”

**Bloc 3 — Frais de Notaire Réduits**

- Comparatif visuel : Neuf = 2-3% | Ancien = 7-8%
- Sur un bien à 200 000€ : économie de 8 000 à 10 000€

-----

### Page 3 — Défiscalisation (`/defiscalisation`)

Présenter les 2 dispositifs du PDF de manière claire et comparée :

**Dispositif A — Jeanbrun (Location nue)**

- Engagement : 9 ans minimum, résidence principale
- Amortissement : 3,5% du prix par an déduit des revenus fonciers
- Déficit foncier imputable sur revenu global : max 10 700€/an
- Idéal pour : contribuables avec salaires importants

**Dispositif B — LMNP Réel (Location meublée)**

- Amortissement du mobilier : 5 à 10 ans
- Amortissement du bâti hors terrain : 25 à 40 ans
- Loyers nets d’impôt sur très longue période
- Idéal pour : rentabilité nette maximale

**Tableau comparatif interactif** (données exactes du PDF) :

|Critère             |Jeanbrun (Nu)    |LMNP Réel (Meublé)      |
|--------------------|-----------------|------------------------|
|Type de bail        |Location nue     |Location meublée        |
|Loyer annuel estimé |7 200€ (plafonné)|8 640€ (marché)         |
|Amortissement annuel|7 000€ (3,5%)    |6 000€ (bâti + mobilier)|
|Résultat fiscal     |-3 800€ déficit  |-1 360€ déficit         |
|Gain fiscal net     |+1 140€/an       |0€ impôt sur loyers     |

Formule affichée :

> Résultat Jeanbrun = 7 200€ - 4 000€ - 7 000€ = **-3 800€**
> Gain impôt = 3 800€ × 30% (TMI) = **1 140€/an**

-----

### Page 4 — Simulateur IA (`/simulateur`)

Formulaire interactif + appel Claude API :

**Inputs utilisateur :**

- Prix du bien (€)
- Loyer mensuel estimé (€)
- Tranche marginale d’imposition (11%, 30%, 41%, 45%)
- Type de location : nue (Jeanbrun) ou meublée (LMNP)
- Charges annuelles (€)
- Durée de détention souhaitée (années)

**Appel backend POST `/api/simulate` :**

```js
// Envoyer à Claude API :
const prompt = `
Tu es un expert en fiscalité immobilière française.
Voici les données d'un investissement :
- Prix du bien : ${prix}€
- Loyer annuel : ${loyer * 12}€
- TMI : ${tmi}%
- Type : ${type} (${type === 'nu' ? 'Dispositif Jeanbrun' : 'LMNP Réel'})
- Charges annuelles : ${charges}€
- Durée : ${duree} ans

Calcule et retourne en JSON strict :
{
  "rendement_brut": "X.X%",
  "rendement_net": "X.X%",
  "gain_fiscal_annuel": XXXX,
  "economies_totales": XXXX,
  "resultat_fiscal": XXXX,
  "recommandation": "texte court",
  "score_investissement": XX,
  "points_vigilance": ["point1", "point2", "point3"]
}
`;
```

**Affichage des résultats :**

- Score d’investissement avec barre de progression (vert > 70, orange 40-70, rouge < 40)
- Carte “Rendement brut / net”
- Carte “Gain fiscal annuel”
- Carte “Économies totales sur la durée”
- Recommandation IA en texte
- Points de vigilance en liste

-----

### Page 5 — Les Acteurs (`/acteurs`)

Présenter la cartographie du secteur (données du PDF) :

**Section 1 — Promoteurs Immobiliers**
Cards avec logo placeholder + description :

- Nexity
- Altarea Cogedim
- Bouygues Immobilier
- Kaufman & Broad
- Icade (acteur public/institutionnel)

**Section 2 — Gestionnaires LMNP par secteur**

- 🎓 Résidences étudiantes : Nexity Studéa, Réside Études, Nemea Student
- 👴 Résidences seniors : Domitys, Les Girandières, Ovelia
- 🏖️ Tourisme & affaires : Pierre & Vacances, Adagio

**Section 3 — Conseillers & Intermédiaires**

- CGP (Cabinets de Gestion de Patrimoine)
- Courtiers digitaux : Gridky, Stellium, Primonial

-----

## 📄 FONCTIONNALITÉS PDF COMPLÈTES

### 1. Téléchargement du guide PDF

- Bouton “Télécharger le guide complet” sur la page Défiscalisation
- Génère avec pdfmake un PDF de synthèse NadlanConnect France contenant :
  - Page de couverture avec logo et titre “Guide Investissement Immobilier Neuf 2026”
  - Les 2 dispositifs fiscaux résumés
  - Le tableau comparatif Jeanbrun vs LMNP
  - Les acteurs clés
  - Pied de page : NadlanConnect France — nadlanconnect.com

### 2. Rapport PDF personnalisé après simulation

- Après chaque simulation IA, bouton “Exporter mon rapport PDF”
- PDF généré avec pdfmake contenant :
  - Les paramètres saisis
  - Les résultats calculés
  - La recommandation IA
  - Le score d’investissement
  - Nommé : rapport-simulation-[date].pdf

### 3. Upload & analyse de documents PDF

- Page ou modal “Analyser mon document”
- Drag & drop d’un PDF (contrat VEFA, notice descriptive promoteur, bail commercial LMNP)
- Backend : extraction du texte avec pdf-lib (route POST `/api/pdf/analyze`)
- Envoi à Claude API pour analyse : extraction du prix, surface, clauses importantes, risques
- Affichage structuré du résultat avec badge “Analysé par IA”

### 4. Brochure comparative PDF

- Sur la page Défiscalisation, bouton “Comparer les 2 dispositifs en PDF”
- @react-pdf/renderer génère une brochure A4 côte à côte Jeanbrun vs LMNP
- Design aux couleurs NadlanConnect

-----

## 📁 STRUCTURE DES FICHIERS

```
/client
  /src
    /components
      Header.jsx
      Footer.jsx
      ScoreBar.jsx            ← barre score investissement
      DeviceCard.jsx          ← card dispositif fiscal
      ActorCard.jsx           ← card acteur du marché
      PDFExportButton.jsx     ← génère et télécharge PDF
      PDFUploader.jsx         ← drag & drop analyse PDF
      SimulatorForm.jsx       ← formulaire simulateur
      ResultDashboard.jsx     ← affichage résultats IA
    /pages
      Home.jsx
      MarcheNeuf.jsx
      Defiscalisation.jsx
      Simulateur.jsx
      Acteurs.jsx
    /utils
      pdfGenerator.js         ← logique pdfmake
      apiClient.js
    App.jsx
    main.jsx

/server
  index.js
  /routes
    simulate.js               ← appel Claude pour simulation
    pdf.js                    ← upload, extract, generate
  /middleware
    upload.js                 ← config Multer
  /utils
    claudeClient.js           ← wrapper Anthropic SDK
    pdfExtract.js             ← extraction texte pdf-lib
```

-----

## 📦 DÉPENDANCES

**Frontend :**

```
react react-dom vite tailwindcss @tailwindcss/vite
@react-pdf/renderer react-pdf axios
```

**Backend :**

```
express cors dotenv multer pdf-lib pdfmake @anthropic-ai/sdk
```

-----

## 🔐 VARIABLES D’ENVIRONNEMENT (.env)

```
ANTHROPIC_API_KEY=ta_clé_ici
PORT=3001
VITE_API_URL=http://localhost:3001
```

-----

## ✅ POINTS CRITIQUES

- Tout en français
- Données financières 100% fidèles au PDF source (ne pas inventer de chiffres)
- Le tableau comparatif Jeanbrun/LMNP doit être pixel-perfect et lisible
- Gestion des erreurs propre sur toutes les routes API
- Le score IA : vert > 70, orange 40-70, rouge < 40
- Ne jamais coder en dur la clé API (toujours `process.env.ANTHROPIC_API_KEY`)
- CORS configuré entre client (port 5173) et serveur (port 3001)
- Mention “Extension de NadlanConnect.com” visible sur toutes les pages

-----

## 🚀 ORDRE DE DÉVELOPPEMENT

1. Structure du projet + dépendances
1. Header / Footer / routing React
1. Page Accueil
1. Page Marché Neuf (VEFA, RE2020, frais notaire)
1. Page Défiscalisation avec tableau comparatif interactif
1. Simulateur IA (formulaire + appel Claude API)
1. Page Acteurs
1. Fonctionnalités PDF (génération + upload + analyse)
1. Responsive mobile

**Commence maintenant.**