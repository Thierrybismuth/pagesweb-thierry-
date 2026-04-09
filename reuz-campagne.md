# Campagne Recrutement Re-uz — Référence complète

## IDs Workflows N8N

| Opération | Nom | ID | Webhook |
|---|---|---|---|
| Extraction CVs | Liste Cvs d'un dossier... | `6sTsKeZGpE8GEqwB` | `https://thierryb.app.n8n.cloud/webhook/3e864c38-1fec-41e1-a048-bb44658e016d` |
| Boucle mail candidat (WF1) | 📧 Campagne Recrutement - 1. Envoi Initial | `iZ1Mh8TKc6pqMpbH` | `https://thierryb.app.n8n.cloud/webhook/9c9a4193-b5bf-4c56-8e75-42e03a756730` |
| Scan réponses (WF2) | YxLt6PD48xQwsQrD | — | scan Gmail x5/jour |
| Confirmations (WF3) | fkzt9MvAn66j1jy9 | — | — |

## Ressources

- **Tableau de chasse** : `1CqFrk0RgkO9xJuglSTPz3dgcd-tbU33VrYaM0lt_BJg` onglet `Suivi contacts`
- **Dossier CVs Re-uz Drive** : `1VoGw5amoOcyleJ8rPTLRyLpUjDdVWouw`
- **Filtre extraction** : Enseigne envisagée = `Re-uz`
- **Statut après envoi email 1** : `EMAIL1_ENVOYE`

---

## Logique de la boucle

```
Étape 1 (optionnelle) : Extraction CVs Drive → Tableau de chasse
Étape 2 : Boucle mail WF1 → lit Suivi contacts filtré Re-uz + email
Étape 3 : WF2 scan Gmail x5/jour → analyse réponses Claude
  ├── Toujours à l'écoute → Email 2 + statut ECOUTE
  │   ├── Veut en savoir plus → Email 3 + statut INFOS
  │   │   ├── Propose créneau → Confirmation RDV + Google Agenda + statut RDV
  │   │   └── Pas de créneau → demander 2-3 créneaux
  │   └── Refus indépendant/portage → Email STOP + statut STOP
  └── Plus en recherche → Email STOP + statut STOP
       └── S'il précise ce qu'il cherche → extraire + mettre dans Commentaire
```

---

## Objet commun à tous les emails de réponse

```
Re: [MP-ECOUTE] Une opportunité — êtes-vous disponible ?
```

---

## Email 1 — Envoi initial

**Objet :** `[MP-ECOUTE] Une opportunité — êtes-vous disponible ?`

```
Bonjour {{ Prénom }},

J'ai trouvé votre profil sur Météo Job — votre CV date peut-être un peu, et votre situation a probablement évolué depuis.

Je me permets quand même de vous contacter car je recherche un profil commercial terrain sur {{ Département }} pour représenter Re-uz, acteur européen de la vaisselle réutilisable — ecocups, gobelets — auprès des professionnels de la restauration et de l'événementiel.

Le terrain de jeu au quotidien : la prospection des cafés, hôtels et restaurants de votre secteur, ainsi que les campings et lieux événementiels. Re-uz équipe déjà Roland Garros, Disneyland, le Futuroscope, le Puy du Fou, les 24h du Mans, le Tour de France ou l'Olympique Lyonnais.

Ce n'est peut-être pas exactement votre dernier poste — mais il arrive qu'un manager en ait assez de manager, qu'un profil sédentaire ait envie de terrain, ou qu'un salarié soit prêt à tourner la page du salariat.

La mission se fait en portage salarial (CDI) ou en indépendant.

Êtes-vous toujours en recherche, ou avez-vous retrouvé un poste depuis ?

Bien cordialement,
Thierry Bismuth
06 10 70 30 90
```

---

## Email 2 — Candidat toujours à l'écoute

**Objet :** `Re: [MP-ECOUTE] Une opportunité — êtes-vous disponible ?`

```
Bonjour {{ Prénom }},

Merci pour votre retour.

Je recrute des commerciaux terrain pour Re-uz, acteur européen de la vaisselle réutilisable — ecocups et gobelets — auprès des professionnels de la restauration et de l'événementiel.

Vous connaissez probablement leurs références : Roland Garros, Disneyland, le Futuroscope, le Puy du Fou, le Tour de France, les 24h du Mans, le Parc Astérix, l'Olympique Lyonnais...

Je cherche un profil commercial terrain dans le {{ Département }} pour aller prospecter les cafés, hôtels et restaurants du secteur — c'est le cœur du job au quotidien.

Ce n'est peut-être pas exactement votre dernier poste — mais il arrive qu'un manager en ait assez de manager, qu'un profil sédentaire ait envie de terrain, ou qu'un salarié soit prêt à tourner la page.

La mission se fait en portage salarial (CDI) ou en indépendant.

L'univers, le métier ou le statut vous parlent ? Ça vaut 5 minutes au téléphone ?

Bien cordialement,
Thierry Bismuth
06 10 70 30 90
```

---

## Email 3 — Proposition d'appel

**Objet :** `Re: [MP-ECOUTE] Une opportunité — êtes-vous disponible ?`

```
Bonjour {{ Prénom }},

Je suis ravi(e) de votre intérêt. Je vous propose qu'on s'appelle pour vous présenter l'opportunité en détail — 15 à 20 minutes.

Pouvez-vous m'indiquer vos disponibilités ?

Bien cordialement,
Thierry Bismuth
06 10 70 30 90
```

---

## Email confirmation RDV

**Objet :** `Re: [MP-ECOUTE] Une opportunité — êtes-vous disponible ?`

```
Bonjour {{ Prénom }},

Parfait — je note notre échange téléphonique le {{ date }} à {{ heure }}.

Je vous envoie une invitation agenda pour ne pas l'oublier.

À très vite,
Thierry Bismuth
06 10 70 30 90
```

**Google Agenda :** RDV 30 min intitulé `RDV Téléphonique Re-Uz - {{ Prénom }} {{ Nom }}` avec nom, email, tél et département dans le corps.

---

## Email STOP

**Objet :** `Re: [MP-ECOUTE] Une opportunité — êtes-vous disponible ?`

```
Bonjour {{ Prénom }},

Merci pour votre retour — c'est toujours utile de savoir où vous en êtes.

Je note que ce n'est pas le bon moment. N'hésitez pas à me faire savoir ce que vous cherchez précisément — je ne manquerai pas de revenir vers vous si une opportunité correspondant à votre situation se présente.

Bonne continuation,
Thierry Bismuth
06 10 70 30 90
```

**Automatisation :** si le candidat précise ce qu'il cherche dans sa réponse → Claude extrait → renseigne la colonne `Commentaire` du tableau de chasse.

---

## Règles statuts tableau de chasse

| Étape | Statut |
|---|---|
| Email 1 envoyé | `EMAIL1_ENVOYE` |
| Répond, toujours à l'écoute | `ECOUTE` |
| Veut en savoir plus | `INFOS` |
| RDV calé | `RDV` |
| Refus / plus en recherche | `STOP` |
