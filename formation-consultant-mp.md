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
- Non → ❌ SORTIE
- Oui → ✅ KW activé (acheteur)

**Q3 — Avez-vous un projet de vente en réflexion ?**
- Oui → ✅ KW activé (vendeur) → Q4
- Non → Q4

**Q4 — Avez-vous un crédit immobilier en cours ?**
- Non → Q6 (LAV)
- Oui → Q5

**Q5 — Votre assurance emprunteur a été souscrite via votre banque ?**
- Non → Q6 (LAV)
- Oui / Je ne sais pas → ✅ APC activé

**Q5a — Années restantes sur le crédit ?**
- < 5 ans → potentiel limité
- ≥ 5 ans → levier fort

**Q5b — Mensualité de crédit ?**
→ Simulation : taux assurance 0,4% (modifiable), économie estimée 40%

**Q6 — Logement d'avant 2000 ?**
- Non → ❌ Sortie LAV
- Oui / NSP → Q6b

**Q6b — Type de chauffage ?** Fioul / Gaz / Électrique / PAC / Bois
**Q6c — Type de logement ?** Maison / Appartement
**Q6d — Propriétaire occupant ou bailleur ?**
**Q6e — Tranche de revenus ?** Très modeste / Modeste / Intermédiaire / Supérieur
**Q6f — Déjà bénéficié d'une aide rénovation ?**
**Q6g — Surface (m²) ?**
**Q6h — Facture d'énergie ?** + pastille : 1 mois / 2 mois / 1 an
→ Simulation : isolation -25/30%, PAC -50/70%, combiné -75%
→ ✅ LAV activé

---

## ARGUMENTAIRES CIBLE 1 — PARTICULIERS

### KW — Profil ACHETEUR

**Punchline :** *"Avec KW, vous avez un interlocuteur et une équipe de 30."*

📌 Pastille consultant :
> **L'écosystème** — Le BC KW fédère agent immobilier, courtier crédit, courtier travaux et partenaires déménagement. Vous n'avez pas à chercher ces intervenants vous-même.
>
> **La puissance collective** — Un BC KW réunit 20 à 50 négociateurs. Dès votre recherche enregistrée, ils cherchent en parallèle — dont certains ont des biens en off market.
>
> **Face à une agence classique** — 4 ou 5 négociateurs vs 30 qui travaillent pour vous dès le premier jour.

**CTA :** "Je veux être mis en contact avec un conseiller KW" → thierry@thierrybismuth.com + CC consultant + test@kw.fr
→ 💰 8% de la commission KW

### KW — Profil VENDEUR *(en attente infos terrain)*

---

### APC — Assurément Pas Cher

**ARG 1** — *"Votre banque baisse ses taux de crédit et se rattrape sur votre assurance. 90% des emprunteurs ne le voient pas."*
📌 Les banques gonflent discrètement l'assurance emprunteur pour compenser leurs marges réduites sur le crédit.

**ARG 2** — *"La loi Lemoine (2022) interdit toute perte de protection. Vous changez d'assurance, vous gardez les mêmes garanties — souvent meilleures."*
📌 APC travaille avec AXA, Generali, Allianz. Résiliation possible à tout moment depuis 2022.

**ARG 3** — *"Pas de plateforme à remplir seul. Un interlocuteur qui gère tout pour vous."*
📌 Contre les solutions 100% digitales sans accompagnement humain.

**CTA :** "Je veux qu'on analyse mon assurance" → thierry@thierrybismuth.com + CC consultant + test@apc.fr
→ 💰 ~500€ par contrat renégocié

---

### LAV — Les Artisans Verts

**ARG 1** — *"6 000 chantiers réalisés. Pas une promesse — un bilan."*
📌 10 ans d'existence, particuliers + grands industriels + bâtiments publics.

**ARG 2** — *"LAV commercialise, achète le matériel, pose et gère les aides. Un seul interlocuteur, aucune sous-traitance."*
📌 Maîtrise de toute la chaîne, zéro intermédiaire inconnu.

**ARG 3** — *"Le devis est toujours à zéro reste à charge. Pas d'option cachée, pas de surprise."*
📌 Options supplémentaires chiffrées séparément, jamais incluses en douce.

**ARG 4** — *"Des conditions de crédit négociées avec les grandes banques, impossibles à obtenir seul."*
📌 Accords cadres bancaires pour travaux hors CEE.

**CTA :** "Je veux un diagnostic gratuit" → thierry@thierrybismuth.com + CC consultant + test@lav.fr
→ 💰 7% du chantier (1 000€ à 2 000€ selon habitation)

---

## CIBLE 2 — COMMERÇANTS / ARTISANS / RESTAURATEURS / TPE

### Arborescence validée

**Q1 — Votre activité rencontre-t-elle des difficultés ?**
- Oui → Q1b
- Non → Q2

**Q1b — Envisagez-vous une reconversion ?**
- Oui → ✅ RecommerCer → C1 à C7
- Non → Q3

**Q2 — Comptez-vous embaucher prochainement ?**
- Oui → ✅ ConvoK → Q3
- Non → Q3

**Q3 — Souhaiteriez-vous attirer plus de clients ?**
- Oui → Q3b
- Non → ❌ Fin

**Q3b — Avez-vous un espace disponible devant ou dans votre commerce ?**
- Oui → ✅ PerDus
- Non → ❌ Fin

### Critères RecommerCer (C1–C7)
C1 Surface (m²) · C2 Autorisation restauration + extraction · C3 Type clientèle actuelle · C4 Produit/service/les deux · C5 Univers souhaités · C6 Budget (<10K / 10-30K / 30-50K / >50K€) · C7 Horizon (trimestre/semestre/année/2 ans)

---

### ARGUMENTAIRES CIBLE 2

#### RecommerCer *(punchlines à rédiger)*
**ARG 1** — Vous avez déjà l'entreprise, le local, les clients, le banquier. Changer de métier ne repart pas de zéro.
**ARG 2** — Des concepts qui explosent cherchent des emplacements comme le vôtre (King Marcel, Basilic & Co, Petits-fils, Rapid Pare-Brise...)
**ARG 3** — Agir tant qu'il reste un an de trésorerie et l'envie.
**ARG 4** — Donnez 5 critères. On revient en 8 jours avec 5 enseignes. Sans engagement.

#### ConvoK *(VALIDÉS)*
**ARG 1** — *"50% des patrons galent à recruter. Presque aucun ne veut payer un cabinet. Résultat : le poste reste vide des mois."*
📌 Cabinets : 15-25% du salaire annuel = 6 000€ pour un poste à 40K€.

**ARG 2** — *"LinkedIn et Indeed vous donnent des CV. ConvoK vous met des candidats en face de vous."*
📌 Sourcing massif, relances mail/SMS/WhatsApp, convocations — sans que le patron leve le petit doigt.

**ARG 3** — *"3 critères. 4 à 6 candidats en 8 jours. Vous ne payez que si vous recrutez."*
📌 1h30–2h d'entretiens café. Forfait 2 000€ à l'embauche uniquement.

**CTA ConvoK — si oui :**
1. Intitulé du poste · 2. Localisation · 3. Critères libres · 4. Date souhaitée · 5. Email client
📌 Mention : *"ConvoK est une prestation simple et transparente. Ce formulaire tient lieu de document contractuel."*
→ thierry@thierrybismuth.com + CC consultant + test@convok.fr → 💰 1 000€/recrutement

#### PerDus *(VALIDÉS)*
**ARG 1** — *"8–10% du commerce = internet. 5% de ces colis ne sont jamais livrés. Stock énorme, disponible."*
📌 Amazon, La Poste, grands transporteurs. Le commerçant ne risque rien.

**ARG 2** — *"Une semaine de comm' gratuite. 2 jours de flux inhabituel dans votre boutique."*
📌 Réseaux sociaux + flyers rue + flyers clientèle. Stand 25–100 kg selon espace.

**ARG 3** — *"Comm' gratuite. Nouveaux clients. Certains repartent avec un produit à vous."*

**CTA PerDus — si oui :** Surface (m² + int/ext) · Date · Email
→ thierry@thierrybismuth.com + CC consultant + test@perdus.fr → 💰 8€/kg (100kg=800€, 400kg=3 200€)

---

## CIBLE 3 — GRANDES ENTREPRISES

### Arborescence validée

**Q1 — Prévoyez-vous des recrutements dans l'année ?**
- Oui → Q1b
- Non → Q2

**Q1b — En avez-vous actuellement en cours ?**
- Oui → ✅ ConvoK (urgence)
- Non → ✅ ConvoK (anticipation)
→ Dans les deux cas → Q2

**Q2 — Gérez-vous des bâtiments de grande surface ?**
*(entrepôts, usines, hôtels, hôpitaux, gymnases, bâtiments publics ≥ 5 000 m²)*
- Non → Q3
- Oui → ✅ LAV CEE activé → Q2b

**Q2b — Questions LAV CEE :**
1. Type d'activité
2. Surface (m²)
3. Hauteur sous plafond (m)
4. Bâtiment chauffé ? + puissance (kW)
5. Groupes froids ? + puissance (kW)
6. HP flottante / régulation en place ?
7. Bâtiment isolé ? (toiture, façade, sol)
8. Type d'éclairage (LED / néon / halo / mixte)
9. Propriétaire ou locataire des murs ?
📌 Locataire non rédhibitoire si accord propriétaire — éclairage et régulation possibles même sans toucher l'enveloppe.

→ Q3

**Q3 — Accueillez-vous du public régulièrement ou ponctuellement ?**
*(hôtel, salle de concert, salon pro, restaurant, cantine, CHR...)*
- Non → ❌ Fin
- Oui → Q3b

**Q3b — Servez-vous plus de 100 couverts ou 100 verres par jour ?**
- Non → ❌ Fin
- Oui → ✅ Re-uz activé

---

### ARGUMENTAIRES CIBLE 3

#### ConvoK Grands Comptes *(VALIDÉS)*

**ARG 1** — *"Vos RH gèrent les dossiers. Personne ne gère les candidats."*
📌 Postes ouverts, CVs qui s'accumulent, candidats qui disparaissent. ConvoK livre 4–6 candidats qualifiés en 8 jours.

**ARG 2** — *"-80% vs un cabinet de chasse. ConvoK à 2 000€ forfait. Même résultat, sans le ticket d'entrée."*
📌 S'adresse aux postes récurrents (terrain, logistique, commercial, technique) — pas aux C-levels.

**ARG 3** — Identique TPE : 3 critères, 8 jours, paiement à l'embauche.

→ thierry@thierrybismuth.com + CC consultant + test@convok.fr → 💰 50% du CA

---

#### LAV CEE Grandes Surfaces *(VALIDÉS)*

**ARG 1** — *"Depuis 2026, les CEE sont prioritairement fléchés vers le tertiaire. C'est une fenêtre courte — et massive."*
📌 Depuis 2005, 90% des fonds CEE allaient aux particuliers. À partir de 2026, priorité au tertiaire. Fenêtre à saisir maintenant.

**ARG 2** — *"Technique ET administrative. Les deux ensemble, c'est rare. LAV les a."*
📌 Deux mondes séparés : ceux qui font les travaux (mais ne maîtrisent pas les CEE) et ceux qui maîtrisent les CEE (mais sur petits chantiers particuliers). LAV a les deux depuis 10 ans, sur grandes surfaces, milliers de chantiers valorisés. Une des très rares entreprises en France dans ce cas.

**ARG 3** — *"Bureau d'études, travaux, contrôle, relation délégataires CEE. Rien n'est sous-traité."*
📌 Toute la chaîne internalisée : bureau d'études, exécution, contrôle a posteriori, relation délégataires. Zéro intermédiaire.

**ARG 4** — *"Le devis est toujours à zéro reste à charge. Quitte à ne pas tout faire — jamais de surprise."*
📌 LAV s'engage sur zéro reste à charge même à marge nulle. Options supplémentaires en devis séparé.

**CTA :** "Je veux un audit gratuit de mon bâtiment" → thierry@thierrybismuth.com + CC consultant + test@lav.fr
→ 💰 8% du chantier (souvent >100 000€)

---

#### Re-uz *(VALIDÉS)*

**ARG 1** — *"Un verre à 0,30€ + 1€ de consigne. Soit ils le rendent, soit ils le gardent. Dans les deux cas vous gagnez."*
📌 Verre acheté 0,30€, siglé à votre marque. Client rend → 1€ récupéré, marge doublée. Client garde → 0,70€ net + votre marque part chez lui.

**ARG 2** — *"Re-uz est le leader européen des Ecocups. Ils gèrent tout — vous encaissez."*
📌 Fourniture verres siglés, logistique, suivi. Économies sur jetables, bilan CO₂ amélioré, marque renforcée.

**CTA :** "Je veux être contacté par Re-uz" → thierry@thierrybismuth.com + CC consultant + test@re-uz.fr
→ 💰 8% du CA Re-uz généré

---

## À FAIRE après la grille complète
- Stratégie globale de présentation de Multi-Potentiel
- Démarches de prospection avant même le premier RDV

---

## Prochaines étapes
1. ✅ Cible 1 Particuliers — arborescence + KW acheteur + APC + LAV
2. 🔲 KW vendeur — en attente infos terrain
3. 🔲 Punchlines RecommerCer — à rédiger
4. ✅ Cible 2 Commerçants — arborescence + ConvoK + PerDus + RecommerCer (args)
5. ✅ Cible 3 Grandes Entreprises — arborescence + ConvoK + LAV CEE + Re-uz
6. 🔲 Conception visuelle (artifact puis GitHub Pages)
7. 🔲 Stratégie globale MP + prospection amont
