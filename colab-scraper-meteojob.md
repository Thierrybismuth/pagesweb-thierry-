# 🤖 Guide complet : Scraper CV Météojob → Drive → CRM → Mailing

**Dernière MAJ** : 17 avril 2026  
**Testé sur** : campagne Smart Duck Nîmes (90 CVs extraits)  
**Auteur** : Thierry Bismuth / Multi-Potentiel

---

## 🎯 Vue d'ensemble du workflow complet

```
[1] Météojob CV-thèque (recherche ciblée)
        ↓
[2] Colab v24 (scraper Playwright + cookies)
        ↓
[3] Google Drive (sous-dossier par campagne)
        ↓
[4] WF N8N 6sTsKeZGpE8GEqwB (extraction + injection CRM)
        ↓
[5] Tableau de chasse (onglet Suivi contacts)
        ↓
[6] WF N8N 3Uah7aS460nzvEHu (mailing séquencé)
```

---

## 📋 ÉTAPE 1 — Préparer la recherche Météojob

### Construire l'URL de recherche

1. Va sur **Météojob recruteur** → CV-thèque
2. Configure les filtres :
   - **Localisation** : ville + rayon km (ex: Nîmes + 30km)
   - **Mots-clés** : selon l'enseigne (esthétique, coiffure, commercial, immobilier...)
   - **Exclusion** : ajoute le nom de l'enseigne déjà campagnée pour éviter doublons
   - **Expérience** : adapter selon profil recherché (ex: 6-10 + 11-20 + 20+)
   - **Salaire** : 21000-100000 (inclure "no salary")
3. Copie l'URL complète depuis la barre d'adresse

### Exemple d'URL Smart Duck Nîmes (fonctionnelle)
```
https://www.meteojob.com/recruiter/cvtheque/results?mode=0&jobs=&locations=%5B%22N%C3%AEmes+%2830%29%7C2990363%7C43.83665%7C4.35788%7C30%7C11071623%7C3016670%7C6431349%7C3017382%7CNimes%22%5D&includeKeywords=%5B%22esth%C3%A9tique%22%5D&optionalKeywords=%5B%5D&excludeKeywords=%5B%22smartduck%22%5D&wishedLocationFilter=false&addressLocationFilter=true&resumeLibraryRange=9&page=1&sorting=SCORING&includeCandidatesViewedByUser=false&experienceLevels=%5B%7B%22meteojobId%22%3A%22TEN_TWENTY%22%2C%22count%22%3A15%7D%2C%7B%22meteojobId%22%3A%22TWENTY_AND_MORE%22%2C%22count%22%3A9%7D%2C%7B%22meteojobId%22%3A%22SIX_TEN%22%2C%22count%22%3A45%7D%5D&salary=%7B%22min%22%3A21000%2C%22max%22%3A100000%2C%22includeNoSalary%22%3Atrue%7D&fromFilters=true
```

### Note le nombre de pages
- Regarde en bas des résultats combien de pages il y a
- Règle `PAGE_END` dans le Colab en conséquence (ex: 3 pages = PAGE_END=5 par sécurité)

---

## 📋 ÉTAPE 2 — Récupérer les cookies Météojob

### Sur Chrome / Chromebook
1. Ouvre **meteojob.com** et connecte-toi au compte recruteur
2. **Ctrl + Shift + I** → onglet **Console**
3. Tape : `copy(document.cookie)` + Entrée
4. Les cookies sont dans le presse-papiers

### Cookies critiques à extraire du document.cookie
Parser manuellement pour récupérer les valeurs de :
- `meteojob.security.authtoken` (⚠️ expire en quelques heures, à refresh)
- `currentUser` (stable = 152108 pour Thierry)
- `last_connection` (timestamp, change à chaque connexion)
- `_tty` (stable)
- `clevercookie` (stable)
- `hubspotutk` (stable)
- `tarteaucitron` (stable)
- `tracking_adsource` (= "direct")

---

## 📋 ÉTAPE 3 — Préparer le dossier Drive cible

1. Va sur Google Drive
2. Crée un sous-dossier dans `CVs entrepreneurs/` 
   - Ex: `CVs Smart Duck Nîmes`, `CVs ADA Avignon`, `CVs KW Marseille`
3. **Note l'ID du dossier** (dans l'URL : `drive.google.com/drive/folders/[ID]`)

---

## 📋 ÉTAPE 4 — Lancer le Colab scraper

### Notebook Colab v24 — 5 cellules

#### Cellule 1 — Install Playwright
```python
!pip install playwright
!playwright install chromium
!playwright install-deps chromium
```

#### Cellule 2 — Install playwright-stealth
```python
!pip install playwright-stealth
```

#### Cellule 3 — Monter Google Drive
```python
from google.colab import drive
drive.mount('/content/drive')
```

#### Cellule 4 — Install browser-cookie3
```python
!pip install browser-cookie3
```

#### Cellule 5 — Scraper principal (à personnaliser)
```python
import asyncio, os
from datetime import datetime
from playwright.async_api import async_playwright

# ============================================
# 🔧 CONFIGURATION — À ADAPTER PAR CAMPAGNE
# ============================================

# 1. URL Météojob (copie depuis navigateur)
SEARCH_URL = "COLLER_URL_METEOJOB_ICI"

# 2. Nom du sous-dossier Drive cible (doit exister dans "CVs entrepreneurs")
CAMPAGNE = "CVs Smart Duck Nîmes"  # ← ADAPTER

# 3. Pages à scraper (voir bas de la recherche Météojob)
PAGE_START = 1
PAGE_END = 5  # Prends une marge de sécurité

SAVE_DIR = f"/content/drive/MyDrive/CVs entrepreneurs/{CAMPAGNE}/"
os.makedirs(SAVE_DIR, exist_ok=True)
print(f"Dossier OK : {SAVE_DIR}")

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# 4. COOKIES FRAIS (⚠️ à refresh à chaque run, valables ~quelques heures)
COOKIES = [
    {"name": "meteojob.security.authtoken", "value": "XXX", "domain": "www.meteojob.com", "path": "/", "secure": True},
    {"name": "currentUser", "value": "152108", "domain": "www.meteojob.com", "path": "/", "secure": True},
    {"name": "last_connection", "value": "XXX", "domain": "www.meteojob.com", "path": "/", "secure": True},
    {"name": "_tty", "value": "1673443787836473821", "domain": ".meteojob.com", "path": "/", "secure": True},
    {"name": "clevercookie", "value": "9cf067ba-9d6f-445d-a23f-ff55d5df87a8", "domain": ".meteojob.com", "path": "/", "secure": True},
    {"name": "tarteaucitron", "value": "!hubspot=true!gcmadstorage=true!gcmadsuserdata=true!gcmanalyticsstorage=true!gcmfunctionality=true!gcmpersonalization=true!gcmsecurity=true!cc-custom-cookie-functional=true!googleads=true!gcmads=true!facebook=true!bingads=true!clarity=true!gtag=true!recaptcha=true!adsenseauto=true!googlepartners=true!snapchat=true!linkedin=true!twitter=true!youtube=true!dailymotion=true", "domain": "www.meteojob.com", "path": "/", "secure": True},
    {"name": "tracking_adsource", "value": "direct", "domain": "www.meteojob.com", "path": "/", "secure": True},
    {"name": "hubspotutk", "value": "8ea64aa10e9f44798af9b327d796eae5", "domain": ".meteojob.com", "path": "/", "secure": True},
]

# ============================================
# FONCTIONS (ne pas modifier)
# ============================================

async def fermer_tarteaucitron(page):
    try:
        await page.evaluate("""
            ['tarteaucitronRoot','tarteaucitronAlertBig'].forEach(id => {
                var el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
        """)
    except: pass

async def cliquer_suivant(page):
    try:
        btn = page.locator('button.mat-mdc-paginator-navigation-next, button.mat-paginator-navigation-next').first
        if await btn.is_visible() and await btn.is_enabled():
            await btn.click()
            return True
    except: pass
    try:
        btns = await page.locator('button').all()
        for btn in btns:
            txt = await btn.inner_text(timeout=500)
            if 'navigate_next' in txt.lower() or 'chevron_right' in txt.lower():
                if await btn.is_enabled():
                    await btn.click()
                    return True
    except: pass
    return False

async def get_rows(page):
    rows = await page.locator('tr[class*="candidate-clickable"]').all()
    if not rows:
        rows = await page.locator('mat-row').all()
    if not rows:
        rows = await page.locator('tr.cdk-row').all()
    return rows

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox"])
        context = await browser.new_context(accept_downloads=True)
        await context.add_cookies(COOKIES)
        page = await context.new_page()

        log("Navigation...")
        await page.goto(SEARCH_URL)
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(3)
        await fermer_tarteaucitron(page)

        if "signin" in page.url or "login" in page.url:
            log("ERREUR - pas connecte (cookies expirés ?)")
            await browser.close()
            return

        log("Connecte !")
        if PAGE_START > 1:
            log(f"Navigation vers page {PAGE_START}...")
            for p_idx in range(PAGE_START - 1):
                ok = await cliquer_suivant(page)
                if not ok: break
                await page.wait_for_load_state("networkidle")
                await asyncio.sleep(2)

        log(f"Debut du scraping...")
        total = 0
        page_num = PAGE_START

        while page_num <= PAGE_END:
            log(f"--- PAGE {page_num} ---")
            await fermer_tarteaucitron(page)
            await asyncio.sleep(1)

            rows = await get_rows(page)
            log(f"{len(rows)} candidats trouves")

            if len(rows) == 0:
                log("Plus de candidats - fin")
                break

            for i, row in enumerate(rows):
                try:
                    await fermer_tarteaucitron(page)
                    try:
                        name = (await row.inner_text(timeout=3000)).strip().split('\n')[0][:30]
                    except:
                        name = f"Candidat_{page_num}_{i+1}"
                    log(f"  {i+1}. {name}")

                    await row.click()
                    await asyncio.sleep(2)
                    await fermer_tarteaucitron(page)

                    dl_btn = page.locator('button:has-text("file_download")').first
                    if await dl_btn.is_visible():
                        async with page.expect_download(timeout=10000) as dl_info:
                            await dl_btn.click()
                        dl = await dl_info.value
                        safe = "".join(c for c in name if c.isalnum() or c in " -").strip()
                        path = os.path.join(SAVE_DIR, f"CV_{safe}_p{page_num}_{i+1}.pdf")
                        await dl.save_as(path)
                        log(f"     ✅ Drive : {os.path.basename(path)}")
                        total += 1
                    else:
                        log(f"     Bouton non visible")
                except Exception as e:
                    log(f"     Erreur : {e}")

                await page.keyboard.press("Escape")
                await asyncio.sleep(1)

            if page_num < PAGE_END:
                ok = await cliquer_suivant(page)
                if not ok:
                    log("Bouton suivant non trouve - fin")
                    break
                await page.wait_for_load_state("networkidle")
                await asyncio.sleep(3)

            page_num += 1

        log(f"✅ TERMINE - {total} CV sauvegardés dans : {SAVE_DIR}")
        await browser.close()

await run()
```

### ⏱️ Durée estimée
- ~3-5 secondes par CV
- 25 CV par page
- 90 CV ≈ 10-15 minutes
- 500 CV ≈ 1h15

### ⚠️ Contraintes
- **Ordi allumé + onglet Colab ouvert** pendant tout le run (sinon runtime coupe)
- Désactiver la mise en veille automatique (Paramètres Chromebook → Alimentation)
- Wifi stable
- Cookies frais (refresh juste avant de lancer si tu en as fait un il y a >2h)

### ✨ Possibilité : lancer plusieurs requêtes
Tu peux enchaîner plusieurs recherches Météojob (mots-clés différents) dans le **même dossier** :
- Change juste `SEARCH_URL` et `PAGE_END`
- Relance la cellule 5
- Les doublons sont écrasés automatiquement (même nom de fichier)

---

## 📋 ÉTAPE 5 — Lancer l'extraction + injection CRM via N8N

Le WF **`6sTsKeZGpE8GEqwB`** ("Liste Cvs d'un dossier + extrait les données + tableau de chasse SANS SMS NI EMAIL") fait tout :
1. Liste les PDFs du dossier Drive
2. Download + extraction texte via GPT-4.1-mini  
3. Parse : prénom, nom, email, tel (normalisé +33), poste, entreprise, localisation, département
4. Injecte dans le tableau de chasse `1CqFrk0RgkO9xJuglSTPz3dgcd-tbU33VrYaM0lt_BJg` onglet "Suivi contacts"
5. Déplace le CV vers dossier "traités" `1dOGgLPOKVXHmf9pnpdVmUBUht5ohesSh`

### ✅ Depuis avril 2026 : folderId dynamique

Le WF accepte maintenant un `folderId` dans le body webhook. Plus besoin de modifier le WF à la main à chaque campagne.

### 🚀 Lancer l'extraction

```bash
curl -s -X POST \
  "https://thierryb.app.n8n.cloud/webhook/3e864c38-1fec-41e1-a048-bb44658e016d" \
  -H "Content-Type: application/json" \
  -d '{
    "folderId": "ID_DOSSIER_DRIVE_CAMPAGNE",
    "origine": "Nom campagne + date",
    "enseigne": "NomEnseigne",
    "bilan": "CAMPAGNE_ENVOYEE",
    "commentaire": "DD/MM: [TAG] à envoyer"
  }'
```

### Exemple Smart Duck Nîmes (testé OK le 17/04/2026)
```bash
curl -s -X POST \
  "https://thierryb.app.n8n.cloud/webhook/3e864c38-1fec-41e1-a048-bb44658e016d" \
  -H "Content-Type: application/json" \
  -d '{
    "folderId": "1UJB-J4L_Lnh61zdxddqPSLvu3zjSiZ3L",
    "origine": "CVs Esthéticiennes Nîmes Colab 17/04/2026",
    "enseigne": "SmartDuck",
    "bilan": "CAMPAGNE_ENVOYEE",
    "commentaire": "17/04: [SD-OPERATIONNEL] à envoyer"
  }'
```

### ⏱️ Durée estimée
- ~10 secondes par CV (lecture + OpenAI + Sheets)
- 90 CV ≈ 15-20 min
- 500 CV ≈ 1h30

### 📊 Suivi en temps réel
Va sur https://thierryb.app.n8n.cloud/workflow/6sTsKeZGpE8GEqwB → onglet **Executions**

---

## 📋 ÉTAPE 6 — Lancer le mailing séquencé

Une fois les CVs dans le tableau de chasse, utilise le WF **`3Uah7aS460nzvEHu`** ("Envoi mails candidats chasse") en boucle.

### Body par appel
```json
{
  "mail": "destinataire@email.com",
  "subject": "Objet du mail",
  "message": "Corps HTML"
}
```

### Endpoint
```
POST https://thierryb.app.n8n.cloud/webhook/5df73b8d-5d5d-4140-9806-71849445d79b
```

### Consigne anti-spam
- **Minimum 30 secondes entre chaque envoi** (Gmail antispam)
- Pour gros volume (>200 mails) : étaler sur plusieurs jours
- Adapter le message : pas de mention géographique si la campagne est nationale

### Template mail Smart Duck (testé)
**Objet** : Smart Duck — opportunité avec investisseurs

**Corps** :
> Bonjour [Prénom],
> 
> Je me permets de revenir vers vous concernant une opportunité de développement avec l'enseigne Smart Duck.
> 
> Le dossier a progressé : nous avons désormais des investisseurs privés très intéressés par le modèle économique, prêts à accompagner un entrepreneur qui souhaiterait exploiter un ou plusieurs centres.
> 
> Nous cherchons un entrepreneur qui exploiterait concrètement le centre au quotidien, avec une participation active au capital, sans avoir nécessairement besoin de faire un investissement financier.
> 
> Ce profil s'adresse à une personne ayant déjà une expérience dans l'esthétique au sens large (esthétique, beauté, bien-être, soins, cosmétique, parfumerie, spa, coiffure haut de gamme, vente en univers beauté…).
> 
> Est-ce que dans cette configuration le projet pourrait vous intéresser ?
> 
> Si oui, faites-moi signe : je vous envoie le dossier de présentation pour qu'on puisse en parler rapidement.
> 
> Bien cordialement,  
> Thierry Bismuth — Multi-Potentiel / ODYSKILLS  
> 0610703090

---

## 🎯 Récapitulatif des IDs utiles

### Dossiers Drive
| Dossier | ID |
|---|---|
| CVs entrepreneurs (parent) | `11IEzJZ2F9gAw8NbmY22Gg_sRx-YBq4jk` |
| Dossier CVs traités | `1dOGgLPOKVXHmf9pnpdVmUBUht5ohesSh` |
| Re-UZ local (ancien point d'entrée) | `1hDuEdH08tCNWjN3CJdGa_tA_xRT2FzZw` |

### Workflows N8N
| WF | ID | Webhook |
|---|---|---|
| Extraction CVs + CRM | `6sTsKeZGpE8GEqwB` | `/webhook/3e864c38-1fec-41e1-a048-bb44658e016d` |
| Envoi mail | `3Uah7aS460nzvEHu` | `/webhook/5df73b8d-5d5d-4140-9806-71849445d79b` |
| Append row CRM | `q7uUmHDncXgrMMTf` | `/webhook/append-tableau-chasse` |

### Tableau de chasse
- Sheet ID : `1CqFrk0RgkO9xJuglSTPz3dgcd-tbU33VrYaM0lt_BJg`
- Onglet : `Suivi contacts`
- Colonnes : Origine fichier | Date import | Enseigne envisagée | Qui | Département | Entreprise | Poste | Tel | Mail | Commentaire | Statut | Secteurs

---

## 🚀 Templates rapides par enseigne

### Smart Duck (esthétique)
- Mots-clés : `esthéticienne`, `esthétique`, `spa`, `massage`, `bien-être`
- Expérience : 6-10 ans + 11-20 ans + 20+
- Exclure : `smartduck` si relance

### ADA (location de véhicules)
- Mots-clés : `location véhicule`, `transport`, `logistique`, `chef agence`
- Expérience : 10+ ans
- Profils : reprise d'agence, gestionnaires

### KW (immobilier)
- Mots-clés : `mandataire immobilier`, `conseiller immobilier`, `agent commercial`
- Expérience : 5+ ans
- Exclure : réseaux concurrents selon cible

### LAV (services B2B)
- Mots-clés : `commercial B2B`, `technico-commercial`, `responsable développement`
- Expérience : 10+ ans

---

## 🔧 Dépannage rapide

| Problème | Solution |
|---|---|
| Colab bug au login Météojob | Cookies expirés → refresh et relance cellule 5 |
| Colab se fige au milieu | Runtime Colab coupé → relance cellule 5 avec PAGE_START ajusté |
| CVs dans dossier mais pas dans tableau | Vérif execution N8N WF `6sTsKeZGpE8GEqwB` (erreur OpenAI ?) |
| Mail pas envoyé | Vérif credential Gmail dans WF `3Uah7aS460nzvEHu` |
| Doublons dans tableau de chasse | Append or Update matche sur Mail → si mail déjà présent, update la ligne existante |

---

## 📝 Checklist avant chaque campagne

- [ ] URL Météojob construite avec bons filtres (localisation, mots-clés, exclusions)
- [ ] Cookies frais récupérés (<2h)
- [ ] Dossier Drive créé dans `CVs entrepreneurs/[nom campagne]`
- [ ] ID du dossier noté
- [ ] Colab lancé avec `CAMPAGNE` et `SEARCH_URL` adaptés
- [ ] Chromebook + onglet Colab ouverts, mise en veille off
- [ ] Attendre fin du scraping (voir log)
- [ ] Lancer webhook extraction avec `folderId`, `enseigne`, `origine`, `commentaire`
- [ ] Attendre fin extraction (~15-20 min pour 90 CVs)
- [ ] Vérifier tableau de chasse : lignes bien injectées
- [ ] Préparer template mail (adapter selon enseigne + géo)
- [ ] Lancer mailing séquencé 30s entre chaque
- [ ] Surveiller taux de bounce / réponses

---

**Document évolutif** — à mettre à jour après chaque nouvelle campagne avec les apprentissages.
