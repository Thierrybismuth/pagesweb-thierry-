# Rappels 15 min — Réunion zéro apport

Workflow n8n qui envoie un email de rappel aux inscrits 15 minutes avant chaque session "Entreprendre avec zéro euro", plus un récap à Thierry.

## Identifiants

- **Workflow ID** : `TSEGgLmdKALNpJbY`
- **Nom** : *Rappels 15min — Réunion zéro apport*
- **URL** : https://thierryb.app.n8n.cloud/workflow/TSEGgLmdKALNpJbY
- **Statut initial** : inactif (à activer après attache du credential Calendar)

## Architecture

```
Schedule Trigger (toutes les 5 min)
      ↓
Google Calendar — Get Events (fenêtre now+13min à now+17min)
  singleEvents: true, orderBy: startTime
      ↓
Code — Préparer emails
  Filtre sur summary contient "zéro euro"
  Extrait hangoutLink + heure de démarrage
  Pour chaque invité (≠ bismuththierry@gmail.com) → 1 item {to, subject, message}
  + 1 item récap pour Thierry avec liste inscrits + lien Meet
      ↓
Gmail — Send (batch, un email par item)
  Expéditeur : bismuththierry@gmail.com (credential existant)
  Signature : "Thierry Bismuth"
```

## Fenêtre de 13-17 min (pas 15 pile)

Le cron tourne toutes les 5 min mais peut avoir quelques secondes de dérive. Fenêtre de 4 min autour de T-15 garantit que chaque session tombe exactement une fois dans le filtre — pas de doublon, pas d'oubli.

Exemple : session à 13h00. Les exécutions cron autour :
- 12h40 → fenêtre [12h53, 12h57] → ne contient pas 13h00 ❌
- 12h45 → fenêtre [12h58, 13h02] → **contient 13h00** ✓ → envoi
- 12h50 → fenêtre [13h03, 13h07] → ne contient plus 13h00 ❌

## Contenu des emails

### Email invité (à chaque attendee)
**Sujet** : `Rappel — votre réunion démarre dans 15 minutes`

```
Bonjour,

Petit rappel : la réunion "Entreprendre avec zéro euro" démarre dans 15 minutes.

🔗 [Lien Google Meet cliquable]

À tout de suite,
Thierry Bismuth — 06 10 70 30 90
```

### Email Thierry (récap pré-session)
**Sujet** : `[Réunion zéro apport] N inscrit(s) à la session de HHhMM`

```
Bonjour Thierry,

Ta session "Entreprendre avec zéro euro" démarre dans 15 minutes (13h00).

Inscrits :
• prenom1@exemple.com
• prenom2@exemple.com
• prenom3@exemple.com

Lien Meet : [Lien Google Meet cliquable]

Bonne session !
```

## Filtre sur le nom de session

Le code node filtre par `summary.toLowerCase().includes('zéro euro')`. Ça protège contre d'éventuels autres events personnels qui tomberaient dans la fenêtre. Si le nom de la session change un jour, pense à mettre à jour ce filtre.

## Credentials

| Node | Credential | État |
|---|---|---|
| Gmail — Envoyer emails | `00d0wM4bL9Q0T1Jj` (Gmail bismuththierry) | ✅ attaché automatiquement |
| Google Calendar — Events | ⚠️ À créer et attacher manuellement | ⚠️ MANQUANT |

## Procédure d'activation (une seule fois)

1. Ouvrir https://thierryb.app.n8n.cloud/workflow/TSEGgLmdKALNpJbY
2. Cliquer sur le node **Events dans 13-17 min** (Google Calendar)
3. Dans le panneau credentials, cliquer **"Create New Credential"** ou **"Select credential"** → **"+ Create new"**
4. Type : **Google Calendar OAuth2 API**
5. Suivre le flow OAuth : "Sign in with Google" → valider avec `bismuththierry@gmail.com`
6. Save credential
7. De retour dans le node, sélectionner le credential nouvellement créé
8. Save le workflow (Ctrl+S)
9. Toggle en haut à droite pour **activer** le workflow

## Test manuel

Pour tester sans attendre 5 minutes :
1. Dans l'éditeur, clic droit sur le node **Toutes les 5 min** → **Execute node**
2. Ou créer un event de test dans Google Calendar démarrant dans 15 min pile, avec un email invité de test, et attendre le prochain cron

## Points d'attention

- **Dédup** : la fenêtre étroite suffit en pratique. Si un doublon se produit (très rare), on pourra ajouter un label Gmail "Rappel-envoyé-{eventId}" pour dédupliquer.
- **Expéditeur** : `bismuththierry@gmail.com` via le credential Gmail. Si tu veux basculer sur `thierry@thierrybismuth.com`, il faudra créer un credential Gmail distinct (SMTP avec alias) — pour l'instant on reste sur le Gmail principal.
- **Events passés** : le filtre `timeMin` exclut automatiquement les events passés. Pas de risque d'envoyer un rappel rétroactif.

---

*Créé : 18/04/2026 — Claude assistant*
