# ouvrir-franchise — Référence système

Documentation du dispositif "entreprendre en franchise sans apport" — page principale `ouvrir-franchise.html`.

## Positionnement

**Cœur de la page** : entrepreneuriat en franchise **avec zéro apport**.
**Mécanique** : investisseur finance le ticket → exploitant (franchisé) opère → rachat progressif → majoritaire en 5 ans.
**Design** : palette D (noir #0a0a0a + or antique #c9a961 + ivoire #f5f1e8), typographie Cormorant Garamond + Inter.

## URL

- Live : https://thierrybismuth.com/ouvrir-franchise.html
- Ancienne page `franchise-sans-apport.html` → redirection meta-refresh vers ouvrir-franchise (fusion).

## CTA

1. **Inscription réunion d'information** (formulaire dans la page, section `#inscription`)
2. **Appel** : 06 10 70 30 90
3. **SMS** : 06 10 70 30 90
4. **Email** : thierry@thierrybismuth.com

## Réunions d'information récurrentes

| Créneau | Google Meet | Event ID (Calendar) | 1re occurrence |
|---|---|---|---|
| Lundi 13h00–14h00 | `meet.google.com/sxj-jfqx-hbg` | `5fsq546i689at1crsnk3ikvl1s` | Lun 20/04/2026 |
| Mercredi 18h00–19h00 | `meet.google.com/okn-ijii-eue` | `pm48e1bqje2eta2tfaqrns1fps` | Mer 22/04/2026 |

- Récurrence : `RRULE:FREQ=WEEKLY`
- Timezone : Europe/Paris
- Visibility : public
- Titre : *Entreprendre avec zéro euro*
- Description : 4 bullets (puissance franchise, investisseur, marque/savoir-faire/fournisseurs, majoritaire 5 ans)

## Mécanique d'inscription automatique

### Flow

```
Formulaire (page web) 
  ─POST JSON─▶ Apps Script webhook 
                ─▶ Calendar.Events.instances() prochain créneau
                ─▶ Calendar.Events.patch() ajoute l'email comme invité
                ─▶ Google envoie auto l'invitation Calendar avec lien Meet
  ◀──────JSON {ok:true, when:ISO}
Confirmation UI affichée
```

### URL webhook Apps Script

```
https://script.google.com/macros/s/AKfycbynoSPK22E8vt8GJZRDmB6qoHVehSSh4M9P7DvtF0IzKgJsF5bkRGQC_0wZf0Fv6qpk/exec
```

### Payload attendu (POST, Content-Type: text/plain;charset=utf-8)

```json
{ "email": "prenom@exemple.com", "day": "monday" }
```

`day` : `"monday"` ou `"wednesday"`.

### Réponse

- Succès : `{"ok": true, "when": "2026-04-20T13:00:00+02:00"}`
- Erreur : `{"ok": false, "error": "message"}`

### Code Apps Script (version prod)

```javascript
const EVENTS = {
  monday:    '5fsq546i689at1crsnk3ikvl1s',
  wednesday: 'pm48e1bqje2eta2tfaqrns1fps'
};

function doPost(e) {
  try {
    const { email, day } = JSON.parse(e.postData.contents);
    const eventId = EVENTS[day];
    if (!eventId || !email) throw new Error('email et day requis');

    const now = new Date();
    const in14d = new Date(Date.now() + 14*24*3600*1000);

    const { items } = Calendar.Events.instances('primary', eventId, {
      timeMin: now.toISOString(),
      timeMax: in14d.toISOString(),
      maxResults: 5
    });

    if (!items || items.length === 0) throw new Error('aucune instance à venir');
    items.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));
    const next = items[0];

    const attendees = next.attendees || [];
    if (!attendees.some(a => a.email === email)) {
      attendees.push({ email });
      Calendar.Events.patch({ attendees }, 'primary', next.id, { sendUpdates: 'all' });
    }

    return ContentService.createTextOutput(JSON.stringify({
      ok: true, when: next.start.dateTime
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Procédure de redéploiement Apps Script

Si modification du code :

1. Ctrl+S pour sauver (vérifier que "Modifications non enregistrées" disparaît)
2. **Déployer** (haut droite) → **Gérer les déploiements**
3. Clic ✏ (crayon) à droite du déploiement actif
4. ⚠️ **Critique** : dropdown "Version" → **"Nouvelle version"** (sinon l'ancien code reste actif)
5. **Déployer**

URL reste identique — pas besoin de mettre à jour le HTML.

## Paramètres de déploiement

- **Exécuter en tant que** : Moi (bismuththierry@gmail.com)
- **Qui a accès** : Tout le monde (sans compte Google — indispensable pour les visiteurs anonymes du site)

## Pièges évités

1. **curl -L transforme POST en GET** après redirect 302 → utiliser Python urllib (qui garde POST) ou fetch() browser.
2. **`Calendar.Events.instances()` ne garantit PAS l'ordre chronologique** → toujours `items.sort((a,b) => new Date(a.start.dateTime) - new Date(b.start.dateTime))` avant de prendre `[0]`.
3. **Content-Type CORS-safe** : `text/plain;charset=utf-8` pour éviter le preflight OPTIONS qu'Apps Script ne gère pas.
4. **Nouvelle version obligatoire** au redéploiement — sinon le code mis à jour ne s'exécute pas.

## Contenu secondaire conservé

La page intègre aussi (en position inférieure) le contenu "profil d'entrepreneur" de l'ancienne version :
- 7 axes fondamentaux (particuliers/pros, commerçant/commercial, etc.)
- CTA 30 min gratuites pour clarifier le projet

## Structure de la page

1. Hero — "Entreprendre. Sans apport. C'est désormais possible."
2. Les 4 piliers du dispositif
3. **Réunions d'information + formulaire d'inscription** (ancre `#inscription`)
4. Profil d'entrepreneur — 7 axes + CTA 30 min
5. CTA final (appel/SMS/email)

---

*Dernière MAJ : 18/04/2026 — Claude assistant*
