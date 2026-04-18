# ouvrir-franchise — Référence système

Documentation de la paire de pages "entreprendre en franchise sans apport".

## Architecture 2-pages

| Page | Rôle | Palette | Cibles |
|---|---|---|---|
| `ouvrir-franchise.html` | **Page d'entrée / CTA hub** — inscription réunions, appel, SMS, mail | D : noir #0a0a0a + or antique #c9a961 + ivoire #f5f1e8 | Tous visiteurs |
| `franchise-sans-apport.html` | **Page détail du modèle** — parcours exploitant/investisseur, chiffres, tableau montée au capital, simulateur 5 ans | Vert forêt + brique + crème | Prospects sérieux qui veulent creuser |

Les deux pages se renvoient mutuellement via plusieurs points de contact.

### Liens ouvrir-franchise → franchise-sans-apport

1. **Hero** : bouton tertiaire "Voir le dispositif en détail"
2. **Bridge section** (après les 4 piliers) : bloc pleine largeur "Pour aller plus loin — chiffres, tableau, simulateur"
3. **Sessions detail-item** : "Vous voulez creuser avant ?" avec lien en ligne vers la page dédiée

### Liens franchise-sans-apport → ouvrir-franchise

1. **Hero bandeau** : "Réunion d'information gratuite — s'inscrire à une session →" pointe sur `#inscription`
2. **CTA section finale** : bouton primary "S'inscrire à une réunion d'information" en premier, suivi de appel/SMS/mail
3. **Footer** : "Réserver une réunion d'info ou m'appeler"

## URLs

- Page d'entrée : https://thierrybismuth.com/ouvrir-franchise.html
- Page détail : https://thierrybismuth.com/franchise-sans-apport.html

## CTA (unifiés sur les 2 pages)

1. **Inscription réunion d'information** (formulaire dans ouvrir-franchise.html, section `#inscription`) — primary CTA
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
Formulaire (ouvrir-franchise.html ou via lien depuis franchise-sans-apport.html)
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
5. **Ne pas écraser franchise-sans-apport.html par une redirection** — les 2 pages coexistent et se renvoient mutuellement (documenté ci-dessus).

## Structure ouvrir-franchise.html

1. Hero — "Entreprendre. Sans apport. C'est désormais possible." + 3 boutons (inscription, voir détail, appel)
2. Les 4 piliers du dispositif
3. **Bridge** — "Pour aller plus loin" → franchise-sans-apport.html
4. **Réunions d'information + formulaire d'inscription** (ancre `#inscription`)
5. Profil d'entrepreneur — 7 axes + CTA 30 min
6. CTA final (appel/SMS/email)

## Structure franchise-sans-apport.html

1. Hero — "Entreprenez sur votre talent, pas sur votre épargne" + bandeau réunion d'info (lien vers ouvrir-franchise)
2. Profils visés (opérationnel, commerçant en reconversion, expert-métier sans épargne)
3. Principe exploitant/investisseur (2 colonnes)
4. Montée au capital (tableau)
5. Mécanique 3 à 5 ans
6. Sources de financement du rachat
7. Perspective investisseur
8. Copilote
9. **Simulateur interactif 5 ans** (sliders : CA, charges, gérance, apport, rachat)
10. Atouts du dispositif
11. Process de la première discussion à l'ouverture
12. **CTA final** : inscription réunion + appel + SMS + mail
13. Footer → retour ouvrir-franchise

---

*Dernière MAJ : 18/04/2026 — architecture 2-pages avec ponts bidirectionnels*
