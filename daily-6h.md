# 📊 Daily 6h — Rapport Quotidien

Workflow qui envoie chaque matin à 6h (Paris) un email récap avec 4 sections :

1. ⚠️ **Workflows plantés** des dernières 24h (depuis l'API N8N)
2. 🔄 **Récurrences exécutées** (workflows scheduled + webhook)
3. 📌 **Sujets à relancer** (Tableau Chasse, statut contenant "relanc"/"attente"/"rappel")
4. 💬 **Sujets Claude ouverts** (sheet `sujets-ouverts` que toi et Claude alimentez)

## Setup en 3 étapes

### 1. Créer la sheet `sujets-ouverts`

- Nouveau Google Sheet nommé `sujets-ouverts`
- Premier onglet nommé `sujets`
- Colonnes ligne 1 : `sujet | date | lien | deadline | statut`
- Copier l'ID du sheet (l'URL `docs.google.com/spreadsheets/d/<ID>/edit`)

### 2. Créer la credential N8N API Header

Dans N8N → Credentials → New → **Header Auth** :
- Name : `N8N API Key Header`
- Header Name : `X-N8N-API-KEY`
- Header Value : ta clé API N8N (Settings → API → Create API Key si besoin)

### 3. Importer le workflow

1. Ouvrir `daily-6h-workflow.json`
2. Remplacer `A_REMPLIR_SHEET_SUJETS_OUVERTS` par l'ID du sheet créé à l'étape 1
3. N8N → Workflows → Import from File → `daily-6h-workflow.json`
4. Ouvrir les 2 nodes HTTP (`Exec en erreur 24h` + `Exec réussies 24h`) → rattacher la credential "N8N API Key Header"
5. Activer le workflow (toggle en haut à droite)

## Convention "track" côté Claude

Quand tu veux capturer un sujet en cours à la fin d'une conversation, tu me dis **"track"** + le lien de la conversation. J'append une ligne au sheet `sujets-ouverts` via le workflow `q7uUmHDncXgrMMTf` adapté (ou via Append Row dédié).

Quand un sujet est réglé, tu mets `statut = fait` dans la sheet, il disparaît du daily.

## Palette email

Fraîche bleu ardoise/bleu nuit : `#0f4c75` (titres), `#fde8e8` (erreurs rouge), `#fef3c7` (relances ambre), `#dbeafe` (ouverts bleu), `#d1fae5` (récurrences vert).

## Test manuel

Clic "Execute Workflow" dans N8N → tu reçois le mail immédiatement sans attendre 6h.

## Ressources N8N utilisées

- Trigger : Schedule cron `0 6 * * *` TZ Europe/Paris
- API N8N : `GET /api/v1/executions?status=error|success&limit=...`
- Sheets : Tableau chasse `1CqFrk0RgkO9xJuglSTPz3dgcd-...` + sujets-ouverts (à créer)
- Gmail : credential `00d0wM4bL9Q0T1Jj`
