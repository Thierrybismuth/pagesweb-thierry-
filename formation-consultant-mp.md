# Formation Consultant Multi-Potentiel — Grille de découverte client

## Contexte
Outil de formation et de découverte client pour les consultants du réseau Multi-Potentiel (ODYSKILLS).
Double usage : parcouru avec le client (ton bienveillant/pédagogique) + pastille discrète consultant (arguments complémentaires + commission).

## Enseignes Multi-Potentiel (8)
- **KW** — Immobilier, mise en relation acheteur/vendeur, 8% de la commission KW
- **APC** (Assurément Pas Cher) — Renégociation assurance emprunteur, ~500€/contrat
- **LAV** (Les Artisans Verts) — Rénovation énergétique 100% financée (MaPrimeRénov' + CEE), 7% du chantier. Aussi CEE grandes surfaces (≥5000m²), 8% du chantier
- **ConvoK** — Recrutement IA (PME : 2000€ ou 300€/mois / Grandes entreprises : alternative cabinet de chasse), 50% du CA
- **PerDus** — Ventes événementielles colis perdus en boutique, 8€/kg vendu
- **RecommerCer** — Reconversion d'activité commerciale (2000 enseignes), 12% du droit d'entrée
- **Re-uz** — Ecocups réutilisables pour événements/lieux publics, 8% du CA Re-uz

> Enseignes clients franchise (activité séparée, PAS MP) : Anacours, Helen Doron, Smart Duck, ADA

---

## Pages GitHub de référence
- `particuliers-mp.html`
- `commercants-mp.html`
- `grandes-entreprises-mp.html`
Repo : Thierrybismuth/pagesweb-thierry-

---

## Structure du formulaire

### Principe
1. Identifier le type de contact (particulier / commerçant / grande entreprise)
2. Questions de découverte → activation des enseignes pertinentes
3. Argumentaire client visible
4. Pastille consultant masquée (commission + arguments complémentaires)
5. CTA à la fin de chaque bloc enseigne → email automatique à thierry@thierrybismuth.com + CC consultant + test@[enseigne].fr
6. Saisie nom + email consultant en début de formulaire

---

## CIBLE 1 — PARTICULIERS

### Arborescence validée

**Q1 — Êtes-vous propriétaire de votre logement ?**
- Non → Q2
- Oui → Q3

**Q2 — Êtes-vous en cours d'achat immobilier ?**
- Non → ❌ SORTIE (aucune enseigne applicable)
- Oui → ✅ KW activé (profil acheteur)

**Q3 — Avez-vous un projet de vente en réflexion ?**
- Oui → ✅ KW activé (profil vendeur) → puis Q4
- Non → Q4

**Q4 — Avez-vous un crédit immobilier en cours ?**
- Non → ❌ Sortie APC → aller Q6 (LAV)
- Oui → Q5

**Q5 — Votre assurance emprunteur a été souscrite via votre banque ?**
- Non → ❌ Sortie APC → aller Q6 (LAV)
- Oui / Je ne sais pas → ✅ APC activé → Q5a + Q5b

**Q5a — Il vous reste combien d'années sur votre crédit ?**
- Moins de 5 ans → potentiel limité
- 5 ans et plus → ✅ levier fort

**Q5b — Votre mensualité de crédit est de combien ?**
→ Simulation automatique : taux assurance 0,4% (modifiable si client connaît son taux), économie estimée 40%
→ Formule : (mensualité × mois restants) × 0,4% × 40% = économie annuelle

**Q6 — Votre logement date d'avant 2000 ?**
- Non → ❌ Sortie LAV
- Oui / Je ne sais pas → Q6b

**Q6b — Type de chauffage ?**
→ Fioul / Gaz / Électrique / Pompe à chaleur / Bois
(Fioul et électrique = dossiers les plus rentables)

**Q6c — Type de logement ?**
→ Maison individuelle / Appartement
(LAV travaille principalement sur les maisons)

**Q6d — Propriétaire occupant ou bailleur ?**
→ Occupant = aides maximales / Bailleur = aides réduites, contrainte loyer 3 ans

**Q6e — Tranche de revenus du foyer ?**
→ Très modeste / Modeste / Intermédiaire / Supérieur
(Détermine le niveau MaPrimeRénov')

**Q6f — Déjà bénéficié d'une aide à la rénovation ?**
→ Oui / Non

**Q6g — Surface du logement ?**
→ Champ numérique (m²)

**Q6h — Montant de votre facture d'énergie ?**
→ Champ numérique + pastille : "Ce montant est pour : 1 mois · 2 mois · 1 an"
→ Simulation automatique selon type de chauffage :
  - Isolation seule : -25 à -30%
  - Pompe à chaleur (remplacement fioul/gaz) : -50 à -70%
  - Combiné : jusqu'à -75%
→ ✅ LAV activé

---

## ARGUMENTAIRES CIBLE 1 — PARTICULIERS

### KW — Profil ACHETEUR

**Punchline :** *"Avec KW, vous avez un interlocuteur et une équipe de 30."*

📌 Pastille consultant :
> **L'écosystème** — Le BC KW fédère sous un même toit l'agent immobilier, un courtier crédit, un courtier travaux et des partenaires déménagement. Vous n'avez pas à chercher ces intervenants vous-même après la signature — ils sont déjà dans le réseau.
>
> **La puissance collective** — Un BC KW réunit entre 20 et 50 négociateurs. Dès que votre recherche est enregistrée, tous les collègues du BC cherchent en parallèle — dont certains ont des biens en off market pas encore sur les portails publics.
>
> **L'argument clé face à une agence classique** — Une petite agence ou un réseau physique a 4 ou 5 négociateurs. KW en a 30 sur le même secteur qui travaillent pour vous dès le premier jour.

**CTA :** "Je veux être mis en contact avec un conseiller KW" → thierry@thierrybismuth.com + CC consultant + test@kw.fr

💰 Commission consultant : 8% de la commission KW en cas de vente signée

---

### KW — Profil VENDEUR
*(Arguments à compléter — en attente d'informations terrain)*

---

### APC — Assurément Pas Cher

**ARG 1 — Les banques jouent contre vous**
*Punchline :* *"Votre banque baisse ses taux de crédit et se rattrape sur votre assurance. 90% des emprunteurs ne le voient pas."*

📌 Pastille consultant :
> Les banques compriment leurs marges sur le crédit pour attirer les clients, et compensent discrètement en gonflant le coût de l'assurance emprunteur. C'est légal, discret, et très efficace. La grande majorité des emprunteurs ne regarde jamais cette ligne sur leur relevé.

**ARG 2 — La loi vous protège, les garanties aussi**
*Punchline :* *"La loi Lemoine (2022) interdit strictement toute perte de protection. Vous changez d'assurance, vous gardez au minimum les mêmes garanties — souvent meilleures."*

📌 Pastille consultant :
> Depuis 2022, tout emprunteur peut résilier son assurance à tout moment. La loi impose que la nouvelle assurance soit équivalente ou supérieure en garanties. APC travaille exclusivement avec des assureurs de premier plan : AXA, Generali, Allianz. Aucun risque, aucune perte de couverture.

**ARG 3 — Un humain qui s'occupe de tout**
*Punchline :* *"Pas de plateforme à remplir seul. Un interlocuteur qui gère tout pour vous."*

📌 Pastille consultant :
> La plupart des solutions du marché sont 100% digitales — le client uploade ses documents seul, suit sa procédure à distance, sans personne pour répondre à ses questions. APC c'est l'inverse : un interlocuteur humain dédié qui pilote le dossier de A à Z.

**CTA :** "Je veux qu'on analyse mon assurance" → thierry@thierrybismuth.com + CC consultant + test@apc.fr

💰 Commission consultant : ~500€ par contrat renégocié

---

### LAV — Les Artisans Verts

**ARG 1 — 10 ans et 6 000 chantiers**
*Punchline :* *"6 000 chantiers réalisés. Pas une promesse — un bilan."*

📌 Pastille consultant :
> LAV existe depuis 10 ans. 6 000 chantiers à son actif, des particuliers mais aussi de grands industriels et des bâtiments publics. Si les grandes entreprises leur font confiance pour leurs entrepôts et usines, c'est que la qualité est au rendez-vous.

**ARG 2 — Tout en interne, rien de délégué**
*Punchline :* *"LAV commercialise, achète le matériel, pose et gère les aides. Un seul interlocuteur, aucune sous-traitance."*

📌 Pastille consultant :
> Beaucoup d'acteurs de la rénovation énergétique délèguent la pose à des artisans locaux qu'ils ne contrôlent pas. LAV maîtrise toute la chaîne — de l'achat du matériel à la relation avec les organismes CEE. Zéro intermédiaire inconnu.

**ARG 3 — Zéro reste à charge garanti, sans fausse promesse**
*Punchline :* *"Le devis est toujours à zéro reste à charge. Pas d'option cachée, pas de surprise."*

📌 Pastille consultant :
> LAV s'engage sur un devis à zéro reste à charge avant tout démarrage. Si le client souhaite des options supplémentaires hors CEE, elles sont chiffrées séparément et clairement. Jamais incluses en douce dans le devis de base.

**ARG 4 — Et si le client veut aller plus loin ?**
*Punchline :* *"Des conditions de crédit négociées avec les grandes banques, impossibles à obtenir seul."*

📌 Pastille consultant :
> Pour les travaux hors CEE ou les aménagements complémentaires, LAV a des accords cadres avec de grandes banques. Des taux et conditions qu'un particulier ne peut pas obtenir en direct.

**CTA :** "Je veux un diagnostic gratuit" → thierry@thierrybismuth.com + CC consultant + test@lav.fr

💰 Commission consultant : 7% du montant du chantier (entre 1 000€ et 2 000€ selon habitation)

---

## CIBLE 2 — COMMERÇANTS / ARTISANS / RESTAURATEURS / TPE

### Arborescence validée

**Q1 — Votre activité rencontre-t-elle des difficultés en ce moment ?**
- Non → Q2
- Oui → Q1b

**Q1b — Envisagez-vous une reconversion vers une nouvelle activité ?**
- Oui → ✅ RecommerCer activé → Critères C1 à C7
- Non → Q3

**Q2 — Comptez-vous embaucher prochainement ?**
- Non → Q3
- Oui → ✅ ConvoK activé → Q3

**Q3 — Souhaiteriez-vous attirer plus de clients dans votre établissement ?**
- Non → ❌ Fin
- Oui → Q3b

**Q3b — Avez-vous un espace disponible, même petit, devant ou dans votre commerce ?**
- Non → ❌ Fin
- Oui → ✅ PerDus activé

---

### Critères RecommerCer (si intéressé par la reconversion)

**C1 — Surface du local (m²)**
→ Champ numérique

**C2 — Autorisation restauration avec extraction ?**
→ Oui / Non / Je ne sais pas

**C3 — Type de clientèle actuelle sur laquelle capitaliser**
→ Champ libre (ex : familles, bureaux, seniors, étudiants, artisans, professions libérales...)

**C4 — Produit, service ou les deux ?**
→ Produit / Service / Les deux

**C5 — Univers qui vous attirent spontanément ?**
→ Champ libre avec exemples suggérés :
Restauration (King Marcel, Basilic & Co, Berliner...) · Services à la personne (Petits-fils, Assistia...) · Auto (Rapid Pare-Brise, Uni Pare-Brise...) · Bien-être / Santé · Boulangerie nouvelle génération (Mariette, Augustin...) · Bâtiment / Rénovation (Wittox, Rénovert...)

**C6 — Budget de reconversion**
→ Moins de 10 000€ / 10 000 à 30 000€ / 30 000 à 50 000€ / Plus de 50 000€
📌 Pastille explicative : *Ce budget couvre le matériel, le droit d'entrée enseigne, la décoration et le stock de démarrage.*

**C7 — Horizon envisagé pour la reconversion**
→ Prochain trimestre / Prochain semestre / Dans l'année / Dans 2 ans

---

### ARGUMENTAIRES CIBLE 2 — COMMERÇANTS

#### RecommerCer — Arguments (VALIDÉS, punchlines à rédiger)

**ARG 1 — Vous avez déjà tout ce qu'il faut**
> Vous avez une entreprise, un local, des clients qui vous connaissent, un expert-comptable, un banquier. Changer d'univers métier ne repart pas de zéro — ça s'appuie sur tout ce que vous avez déjà construit.

**ARG 2 — Des business qui cartonnent dont vous n'avez jamais entendu parler**
> Il y a des enseignes, des marques, des concepts qui explosent en ce moment — et qui cherchent des emplacements comme le vôtre. King Marcel, Basilic & Co, Berliner, Petits-fils, Rapid Pare-Brise, Assistia... Des secteurs entiers en croissance à deux chiffres que vous ne voyez pas forcément depuis votre comptoir.

**ARG 3 — Agir tant qu'il est encore temps**
> Pour sauver une entreprise ou la transformer, il faut s'y prendre tant qu'il reste encore un an de trésorerie et l'envie. Trop tôt vaut mieux que trop tard.

**ARG 4 — La proposition RecommerCer**
> Donnez-nous 5 critères. On revient vers vous dans 8 jours avec 5 enseignes sélectionnées pour votre profil. Vous regardez, sans engagement. Si l'une vous intéresse, on creuse ensemble.

*Punchlines à rédiger — prochain échange*

---

#### ConvoK — Arguments (VALIDÉS)

**ARG 1 — Le marché se contredit**
*Punchline :* *"50% des patrons galent à recruter. Presque aucun ne veut payer un cabinet. Résultat : le poste reste vide pendant des mois."*

📌 Pastille consultant :
> Les prestataires classiques facturent 15 à 25% du salaire annuel — soit 6 000€ pour un poste à 40 000€. Le patron refuse, le poste reste ouvert, le business en souffre. C'est le cercle vicieux que ConvoK casse.

**ARG 2 — La valeur d'un partenaire, c'est pas les CV**
*Punchline :* *"LinkedIn et Indeed vous donnent des CV. ConvoK vous met des candidats en face de vous."*

📌 Pastille consultant :
> Les CVs, le patron peut en trouver seul. Ce qu'il ne sait pas faire c'est contacter massivement, relancer par mail, SMS, WhatsApp, et convoquer ceux qui méritent d'être vus. C'est exactement ce que fait ConvoK — sans qu'il lève le petit doigt.

**ARG 3 — Simple, rapide, sans risque**
*Punchline :* *"3 critères de votre part. 4 à 6 candidats devant vous en 8 jours. Vous ne payez que si vous recrutez."*

📌 Pastille consultant :
> Le patron donne : métier, localisation, 1 ou 2 critères libres. ConvoK fait le reste — sourcing, contacts, convocations. En 8 jours : 1h30 à 2h d'entretiens café. Forfait unique 2 000€, uniquement à l'embauche.

**CTA ConvoK — si le client dit oui :**
1. Intitulé du poste
2. Localisation
3. Critères complémentaires (champ libre)
4. Date souhaitée pour les entretiens
5. Email du client (reçoit copie du formulaire)

📌 Mention contractuelle : *"ConvoK est une prestation simple et transparente. Ce cahier des charges et ce formulaire tiennent lieu de document contractuel entre les parties."*

→ Email automatique : thierry@thierrybismuth.com + CC consultant + test@convok.fr

💰 Commission consultant : 50% du CA soit 1 000€ par recrutement signé

---

#### PerDus — Arguments (VALIDÉS)

**ARG 1 — Un marché colossal dont personne ne parle**
*Punchline :* *"8 à 10% du commerce se fait sur internet. 5% de ces colis ne sont jamais livrés. C'est un stock énorme — et il est disponible."*

📌 Pastille consultant :
> Ces colis sont rachetés à l'aveugle auprès d'Amazon, La Poste et des grands transporteurs. PerDus les acquiert, les trie et organise leur vente en boutique. Le commerçant n'achète rien, ne stocke rien, ne risque rien.

**ARG 2 — 48h qui changent la visibilité de votre magasin**
*Punchline :* *"Une semaine de communication gratuite autour de chez vous. 2 jours de flux inhabituel dans votre boutique."*

📌 Pastille consultant :
> PerDus organise tout en amont : réseaux sociaux + distribution de flyers dans les rues. Le commerçant remet lui-même des flyers à ses clients la semaine précédente. Le jour J : stand installé dans le magasin ou devant (si mairie OK), 25 à 100 kg de marchandise selon l'espace, 25 à 100 visiteurs supplémentaires.

**ARG 3 — Trois bénéfices directs pour le commerçant**
*Punchline :* *"Une campagne comm' gratuite. Des nouveaux clients qui découvrent votre boutique. Et certains repartent avec un produit à vous."*

📌 Pastille consultant :
> 1. Communication offerte autour du magasin en amont de l'événement
> 2. Chaque visiteur venu pour les colis peut repartir avec un produit du commerçant
> 3. Des habitants qui n'avaient jamais poussé la porte découvrent le commerce

**CTA PerDus — si le client dit oui :**
1. Surface disponible (m²) + intérieur / extérieur / les deux
2. Date souhaitée pour l'événement
3. Email du client (reçoit confirmation + logistique)

→ Email automatique : thierry@thierrybismuth.com + CC consultant + test@perdus.fr

💰 Commission consultant : 8€/kg vendu — 100kg = 800€, 400kg = 3 200€

---

## CIBLE 3 — GRANDES ENTREPRISES (À CONSTRUIRE)

### Enseignes : ConvoK · LAV (CEE) · Re-uz

---

## À FAIRE après la grille complète
- Stratégie globale de présentation de Multi-Potentiel
- Démarches de prospection avant même le premier RDV

---

## Prochaines étapes
1. ✅ Arborescence Particuliers — VALIDÉE
2. ✅ Argumentaires KW acheteur — VALIDÉS
3. 🔲 Argumentaires KW vendeur — EN ATTENTE (infos terrain)
4. ✅ Argumentaires APC — VALIDÉS
5. ✅ Argumentaires LAV — VALIDÉS
6. ✅ Arborescence Commerçants — VALIDÉE
7. ✅ Critères RecommerCer (C1–C7) — VALIDÉS
8. 🔲 Punchlines RecommerCer — À rédiger
9. ✅ Argumentaires ConvoK (commerçants) — VALIDÉS
10. ✅ Argumentaires PerDus — VALIDÉS
11. 🔲 Arborescence + Argumentaires Grandes Entreprises
12. 🔲 Conception visuelle (artifact puis GitHub Pages)
13. 🔲 Stratégie globale MP + prospection amont
