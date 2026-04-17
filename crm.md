# CRM Mobile (crm.html)

URL : https://thierrybismuth.com/crm.html

## Fonctions
- Lit sheet `1CqFrk0RgkO9xJuglSTPz3dgcd-tbU33VrYaM0lt_BJg` onglet `Suivi contacts`
- Filtres : Enseigne envisagée, Département, recherche (nom/entreprise/tél/mail)
- Boutons tap-to-call (tel:) et tap-to-mail (mailto:)
- Édition Commentaire (col J) + Statut (col K)
- Commentaire préfixé date DD/MM: auto, concaténé à l'ancien

## Backend
- Read : POST `/webhook/lecteur-sheet-v3` (WF `cEQOUUnnKhs3a9Ox`)
- Write : POST `/webhook/445f5803-663f-45f3-baf8-3e25101c2a6e` (WF `AdzJix5RryLJd1Pr`)

## Statuts proposés
Nouveau, Contacté, En cours, RDV programmé, Positif, KO, Stop, À relancer, Injoignable, Message laissé

## À ajouter (plus tard)
- Auth PIN
- Ajout nouveau contact
- Historique appels
