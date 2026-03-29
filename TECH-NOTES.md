# Notes Techniques — Thierry Bismuth / ODYSKILLS
_Dernière mise à jour : 29 mars 2026_

---

## 1. CREDENTIALS N8N

| Usage | Credential Name | ID | Type N8N |
|---|---|---|---|
| Gmail + Drive | bismuththierry@gmail.com | `TqRSp5MdqhfG9oG5` | `googleSheetsOAuth2Api` |
| Gmail (envoi mails) | bismuththierry@gmail.com | `Ffb0bKqbYHjTAkK` | type inconnu — NE PAS utiliser pour HTTP Request |

**Règle critique :** Pour appeler l'API Google Drive via un nœud HTTP Request, utiliser le credential ID `TqRSp5MdqhfG9oG5` avec `nodeCredentialType: "googleSheetsOAuth2Api"`. C'est contre-intuitif mais c'est le seul qui fonctionne.

Types testés et **non fonctionnels** pour Drive via HTTP Request :
- `googleOAuth2Api` → credential not found
- `gmailOAuth2` → credential not found
- `googleDriveOAuth2Api` → credential not found

---

## 2. WORKFLOWS CLÉS

| ID | Nom | Usage |
|---|---|---|
| `BT1qzsxdbMzdVRLM` | Drive - Lister fichiers dossier FINAL | **Workflow Drive opérationnel** — POST `{folderId}` → retourne `files[]{id, name, mimeType, webViewLink}` |
| `iNKsbx5fCoJBjXCh` | GitHub Pages push | POST `{filename, content}` — envoyer HTML brut, jamais base64 |
| `kkPhA8E5n0OXqvwM` | Lecteur Sheet Filtre v2 | POST `{colonne, valeur}` |
| `fkFXjznI7a5zzdWO` | MAJ Bilan CRM | Mise à jour CRM — colonne "Qui" sensible à la casse |
| `3Uah7aS460nzvEHu` | Envoi mails candidats chasse | POST `{mail, subject, message}` |
| `xeXkKNa0eY1cdhoV` | Créateur de Workflows | Crée + active des workflows via l'API N8N |
| `QhP5iP0j3pwrIzxK` | Helper proxy API N8N | Proxy pour appels API internes |

**Workflows à nettoyer (doublons Drive non fonctionnels) :**
`Surmwcqwlha8CUBK`, `2jZFhXx7W29ac7lM`, `k6IL05UxCO4DTcaJ`, `1IXPaGK6Aru3s8YT`, `8c0jz8CaDzN65Jwq`

---

## 3. DRIVE — LISTER FICHIERS D'UN DOSSIER

**Workflow opérationnel :** `BT1qzsxdbMzdVRLM`

```json
POST webhook
{ "folderId": "<ID_DOSSIER_DRIVE>" }
```

Réponse :
```json
{ "files": [
  { "id": "...", "name": "...", "mimeType": "...", "webViewLink": "https://drive.google.com/file/d/.../view" }
]}
```

Lien CV Drive pour HTML : `https://drive.google.com/file/d/{FILE_ID}/view`

---

## 4. PAGES GITHUB PUBLIÉES

| Fichier | URL | Description |
|---|---|---|
| `emma-candidats.html` | https://thierrybismuth.github.io/pagesweb-thierry-/emma-candidats.html | Dossier candidats EMMA — 5 profils literie semaine 30 mars 2026 |

**IDs des CVs dans Drive (dossier `12Amk-9jjMrC1cmjG9F9RTNXCp3YZIeSM`) :**
| Candidat | ID Drive |
|---|---|
| Elias Mliha Touati | `1jtca_Me9PUyyUYP4GKm2pxKzheZQFJAm` |
| Nicolas Naihan | `1cHfVrE9tNdwRhS2quOjV4mEW4zcEgEWn` |
| Michael Benhinni | `1CTqz2V2UT2lC3_qS7kyaGIfNLMm86qRe` |
| Julien Combes | `1FxFUduwVn3G2T1_6wAT8vfNmBCiA3ydU` |
| Blandine Dumons | `1lMnUk-0BE3Qt3Gy1ySOmXRQu1JcJzWNa` |

---

## 5. RÈGLES IMPORTANTES

- **GitHub push :** Toujours envoyer le contenu HTML en string brut dans le champ `content`. Le workflow encode en base64 en interne. Double-encodage = page illisible.
- **Créateur de Workflows :** Ne jamais inclure le champ `active` dans le JSON de création (field read-only). Le workflow Créateur l'active ensuite via un appel séparé.
- **availableInMCP :** Les workflows créés via API ont ce flag à `false` par défaut. Pour qu'un workflow soit appelable depuis Claude, il faut le cocher manuellement dans N8N Settings, OU le passer à `true` dans le JSON de création (via le workflow Créateur).
- **Credential Drive :** Utiliser `TqRSp5MdqhfG9oG5` + type `googleSheetsOAuth2Api` pour tout appel HTTP Request vers l'API Google (Drive, Sheets, etc.).
