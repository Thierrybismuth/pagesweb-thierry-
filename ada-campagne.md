# Campagne Repreneurs ADA — Documentation

## Vue d'ensemble
Campagne de prospection automatisée pour trouver des repreneurs de franchises ADA (et réutilisable pour d'autres enseignes). Basée sur l'envoi d'emails J0 + relances automatiques via N8N.

---

## Workflows N8N

| Workflow | ID | Rôle |
|---|---|---|
| WF Extraction | `6sTsKeZGpE8GEqwB` | Extrait contacts depuis Drive → Sheets |
| WF1 Envoi J0 | `UYPhsPX86rzHKkdj` | Envoi email initial |
| WF2 Scanner + Relances | `jhvZJRGoiP3CwiBf` | Scan Gmail 2h, relances auto, classification Claude Haiku |

---

## WF Extraction — Paramètres webhook
- Webhook : `3e864c38`
- Params : `folderId` / `enseigne` / `origine` / `commentaire` / `bilan`

---

## Statuts campagne

```
CAMPAGNE_ENVOYEE → RELANCE_1 → RELANCE_2 → RAPPEL_DEMANDE / STOP
```

### Classification Claude Haiku (WF2)
- `POSITIF` — intérêt confirmé
- `PROJET` — projet en cours, à recontacter
- `STOP` — pas intéressé / désabonnement
- `NEUTRE` — réponse ambiguë, pas d'action

---

## Colonnes Google Sheets spécifiques
- `Enseigne envisagée`
- `Origine fichier`
- `Statut`

---

## Enseignes actives
- **ADA Nîmes** — SAS Gard Mobilités, contact : Sébastien Gallet
  - Candidat profilé : Mickaël Cneude
  - Mandate : mission de cession

---

## Réutilisabilité
Ce template de campagne est conçu pour être répliqué sur d'autres enseignes en cession/reprise. Changer uniquement : `folderId`, `enseigne`, `origine` dans le webhook d'extraction.

---

## Credentials N8N (à réinjecter sur PUT)
- Sheets : `TqRSp5MdqhfG9oG5`
- Drive : `8YmfkOpKEBItuT4x`
- Gmail : `00d0wM4bL9Q0T1Jj`
- OpenAI : `JVIF2RDe8moEGCi`
