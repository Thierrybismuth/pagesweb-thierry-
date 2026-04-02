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
→ Permet d'estimer l'assurance (~0,3% à 0,5% du capital) et l'économie potentielle

**Q6 — Votre logement date d'avant 2000 ?**
- Non → ❌ Sortie LAV
- Oui / Je ne sais pas → Q7

**Q7 — Votre facture énergétique vous pèse ou vous avez des problèmes de confort thermique ?**
- Non → ❌ Sortie LAV
- Oui → ✅ LAV activé

---

## CIBLE 2 — COMMERÇANTS (À CONSTRUIRE)

### Enseignes : ConvoK · PerDus · RecommerCer

---

## CIBLE 3 — GRANDES ENTREPRISES (À CONSTRUIRE)

### Enseignes : ConvoK · LAV (CEE) · Re-uz

---

## Prochaines étapes
1. ✅ Arborescence Particuliers — VALIDÉE (sauf argumentaires)
2. 🔲 Arborescence Commerçants
3. 🔲 Arborescence Grandes Entreprises
4. 🔲 Argumentaires client par enseigne
5. 🔲 Pastilles consultant (commission + arguments)
6. 🔲 Conception visuelle (artifact puis GitHub Pages)
