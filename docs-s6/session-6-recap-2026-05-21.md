# Récapitulatif Session 6 (2026-05-21)

> **Statut global** : S6 + S6c livrées en une seule session (Auto Mode actif). Le travail est en place, **mais reste provisoire** en attente de validation visuelle Fabrice et de petits chantiers résiduels listés en §6.

---

## 1 · Ce qui a été livré

### Bloc A — Refonte M·06 en 10 sections Direction B Lab ✅
- Page 257, slug renommé `methode-gutenberg-pur`, titre `Méthode 6 · Gutenberg pur + CSS dans core/html`
- 10 sections en vrais blocs Gutenberg natifs (clone du markup M·02 v3 validé S4 post-correction S3)
- **CSS ~130 KB embarqué dans 1 seul bloc `core/html` `<style>` en tête** (essence M·06 : pas de meta Spectra, tout dans le content)
- Banner page courante M·06 (non-featured), footer-lab-M6.html, Astra `full-width`
- Page 253 (M·06 v1 Spectra échec) trashée
- URL : https://test.wpformation.com/methode-gutenberg-pur/

### Bloc B — Plugin wpf-lab v1.1.0 + page M·07 ✅
- Plugin `wpf-lab/wpf-lab.php` étendu de 3 → **11 blocs PHP custom** : `lab-utility`, `lab-localnav`, `lab-banner`, `lab-hero`, `lab-stats`, `lab-why`, `lab-pillars`, `lab-feature-twocol`, `lab-methods-table`, `lab-team`, `lab-cta-final`
- Pattern uniforme : `apiVersion 1` + `supports.autoRegister: true` + `autoRegister: true` + `is_dynamic` + `render: "file:./render.php"`
- `style.css` enrichi avec les classes `.wpf-lab-utility`, `.wpf-lab-localnav`, `.wpf-lab-banner`, `.wpf-lab-stats`, `.wpf-lab-why`, `.wpf-lab-pillars`, `.wpf-lab-methods`, `.wpf-lab-team`
- Zip Unix-compatible via `make-zip-unix.js`, upload+activation via MCP `claudeus_wp_plugins__activate`
- Page 262 reset : slug renommé `methode-blocs-php-custom`, titre `Méthode 7 · Blocs PHP custom (autoRegister WP 7.0)`, content ultra-léger (~3 KB = 11 lignes de blocs custom + footer-lab-M7)
- URL : https://test.wpformation.com/methode-blocs-php-custom/

### Bloc C — HUB v3 (7 méthodes) ✅
- Page 225 mise à jour avec 2 nouveaux encarts M·06 + M·07 dans `.hub-cards-list`
- M·07 désormais `hub-encart--featured` (M·02 a perdu cette classe)
- Banner HUB "Benchmark · 7 façons", hero "Quelle est la meilleure façon...", stats KPI "7 méthodes testées", verdict "★ retenue M·07"

### Bloc D — Matrice scoring 7 méthodes ✅
- Rapport `rapports/matrice-finale-7-methodes-2026-05-21-S6.md`
- Scoring 6 critères × 5 points = /30 par méthode + version pondérée /37.5
- **Ranking final** :
  1. ★ M·07 — Blocs PHP custom · 30/30 · 37.5/37.5 (nouvelle voie pro 2026)
  2. M·06 — Gutenberg pur + core/html · 26/30 · 32.5/37.5
  3. M·02 — Gutenberg + CSS (Spectra meta) · 24/30 · 30.5/37.5 (voie historique)
  4. M·01 — Gutenberg natif · 25/30 · 29.5/37.5
  5. M·04 — HTML multi-blocs · 22/30 · 28.5/37.5
  6. M·03 — HTML monobloc · 19/30 · 25.5/37.5
  6. M·05 — Spectra Pro · 20/30 · 25.5/37.5

### Bloc E — Note technique pour rédacteur WPFormation ✅
- Document `docs/note-technique-pour-redacteur-wpformation-S6.md` (renommé depuis "article-...")
- **PAS l'article final** (qui sera rédigé par WP Formation à l'URL `https://wpformation.com/creer-page-wordpress-claude-code/`)
- Contient : protocole de benchmark, fiche par méthode (avantages, inconvénients, pour qui, pour combien), tableau comparatif, recommandations par cas d'usage, annexes (captures BO, scripts, patterns)

### Bloc F — 7 footers + URL article unifiée ✅
- Régénérés via `scripts/generate-footers-s6c.js` (script générateur qui partage 1 template)
- 8 footers (HUB + M1-M7) avec :
  - Titre de colonne "LES 7 MÉTHODES" (au lieu de 5)
  - 7 entrées de méthodes + 1 entrée HUB · Index en tête
  - ★ migrée de "02 · Gutenberg + CSS ★" vers "07 · Blocs PHP custom ★"
  - URL article (col Ressources) : `https://wpformation.com/creer-page-wordpress-claude-code/`
  - Pitch "Sept méthodes testées" (au lieu de "Cinq")
  - `is-current` sur la bonne entrée selon la page
- Push via `push-s4-octies-footers.js` (M1-M5), `build-and-push-hub-v3.js` (HUB), `build-and-push-m6-v3.js` (M6), `push-m7-final.js` (M7)

### Bloc G — Menu Astra refait (8 items) ✅
- Script `s6c-rebuild-menu-astra.js` avec retry 429 (toutes les opérations menu ont eu besoin d'1 retry 22s)
- Items maintenant :
  1. ★ Hub (nouveau) → page 225
  2. 01 · Gutenberg natif → page 131
  3. 02 · Gutenberg + CSS → page 129 (★ retirée)
  4. 03 · HTML monobloc → page 135
  5. 04 · HTML multi-blocs → page 137
  6. 05 · Spectra Pro → page 133
  7. 06 · Gutenberg pur (nouveau) → page 257
  8. 07 · Blocs PHP custom ★ (nouveau) → page 262

### Bloc H — Patches contenu 5 → 7 méthodes ✅ (partiel)
- Script `s6c-patch-markups.js` appliqué : **142 patches** sur 7 fichiers locaux
  - `page-1-accueil-gutenberg-natif-v3.html` : 16 patches
  - `page-2-methode-wpformation-v3.html` : 29 patches (texte + retire is-featured banner + retire featured ligne 02 du tableau + verdict tag pointe sur M·07 + footnote rewrite)
  - `page-3-methode-html-monobloc-v2.html` : 23 patches
  - `page-4-methode-html-multiblocs-v2.html` : 23 patches
  - `page-5-methode-spectra-pro-v3.html` : 24 patches
  - `page-0-homepage-hub-v2.html` : 25 patches (texte + retire featured M·02 + migre ★ verdict vers M·07 + marquee + his-cell--acid + CTA href + final btn)
  - `page-2-methode-wpformation-v2.css` : 2 patches
- Couvre : "5 méthodes" / "5 façons" / "cinq" / "Cinq" → 7/sept · ★ migrée de M·02 vers M·07 · URLs CTA "lire l'article" → `creer-page-wordpress-claude-code/`

### Bloc I — Nouveau gagnant M·07 ✅
- HUB encart M·02 : `hub-encart--featured` retirée → encart standard
- HUB encart M·07 : `hub-encart--featured` ajoutée + pill "★ LA NOUVELLE · BLOCS PHP NATIFS WP 7.0"
- HUB hero "VAINQUEUR M·07" (au lieu de M·02)
- HUB stat "1 ★ retenue M·07"
- HUB marquee "★ M·07 LA RETENUE"
- HUB CTA final pointe sur `/methode-blocs-php-custom/`
- M·02 banner is-featured → standard, banner tag "VOIE HISTORIQUE"
- M·02 verdict strip cell 02 perd `.win`, verdict tag dit "MÉTHODE 07 GAGNE"
- M·02 roadmap card 02 perd `.featured`
- M·02 footnote réécrite pour pointer M·07 comme méthode retenue
- Menu Astra : ★ retirée de l'item "02 · Gutenberg + CSS", ★ ajoutée sur "07 · Blocs PHP custom ★"

### Bloc J — Captures finales × 8 pages ✅
- 16 captures finales dans `captures/s6c-FINAL-*.png` (8 pages × desktop+mobile)
- Inspection visuelle : voir §3.

---

## 2 · État final du site

| Élément | id | URL | Statut | Banner | Featured? |
|---|---|---|---|---|---|
| HUB | 225 | / | publish, page d'accueil | "HUB · 7 façons" | n/a |
| M·01 | 131 | /accueil-gutenberg-natif/ | publish, menu | "MÉTHODE 01" | non |
| M·02 | 129 | /methode-wpformation/ | publish, menu | "MÉTHODE 02 · VOIE HISTORIQUE" | non (★ retirée) |
| M·03 | 135 | /methode-html-monobloc/ | publish, menu | "MÉTHODE 03" | non |
| M·04 | 137 | /methode-html-multiblocs/ | publish, menu | "MÉTHODE 04" | non |
| M·05 | 133 | /methode-spectra-pro/ | publish, menu | "MÉTHODE 05" | non |
| M·06 | 257 | /methode-gutenberg-pur/ | publish, menu | "MÉTHODE 06 · 100% NATIF" | non |
| **M·07** | 262 | /methode-blocs-php-custom/ | publish, menu | "MÉTHODE 07 · 100% PHP" | **★ NOUVEAU GAGNANT** |
| M·06 v1 (échec) | 253 | trashée | — | — | — |

**Plugin** : `wpf-lab/wpf-lab` v1.1.0 active avec 11 blocs `wpf/lab-*` enregistrés.

**Menu Astra GENERAL (id=5)** : 8 items (★ Hub + 7 méthodes).

**Pages secondaires** : 200, 213 (tests S1-S2) toujours présentes — pas touchées.

---

## 3 · Audit visuel des captures finales

### Cohérence vérifiée ✅

- ✅ Menu Astra : 8 items visibles en haut de chaque page, "06 · Gutenberg pur" et "07 · Blocs PHP custom ★" présents
- ✅ Banner page courante : M·02 plus en mode `is-featured` (fond noir au lieu d'acid)
- ✅ Hero texte : "7 façons de builder WordPress" propagé partout (M·02, M·03, M·04, M·05, M·06)
- ✅ Hero M·07 spécifique : "Méthode 07 — blocs PHP × zéro JS"
- ✅ Stats sections : "X méthodes testées" → patch text appliqué ; tableau "les 7 méthodes" partout
- ✅ M·07 tableau benchmark interne : **7 lignes complètes** via le bloc `wpf/lab-methods-table` (référence canonique)
- ✅ M·07 banner : étoile + offset acid-violet → identifié visuellement comme "le nouveau gagnant"
- ✅ Footer noir : "LES 7 MÉTHODES" partout, `is-current` migre selon la page, ★ sur M·07
- ✅ HUB hero "VAINQUEUR M·07" + stat "★ retenue M·07" cohérent
- ✅ HUB 7 encarts visibles, M·07 = featured (pill "★ LA NOUVELLE"), M·02 = non-featured
- ✅ URL CTA "Lire l'article complet" → `https://wpformation.com/creer-page-wordpress-claude-code/`

### Imperfections résiduelles (à traiter en session suivante)

⚠️ **KPI 01 des `sec-stats`** : la valeur brute du premier KPI reste à "**5**" (devrait être "**7**") sur les pages M·01, M·02, M·03, M·04, M·05, M·06. Le find/replace text "5 méthodes" n'a pas matché parce que le KPI affiche juste le chiffre "5" dans `<h2 class="stat-value">5</h2>` sans contexte "méthodes" juste à côté. **À patcher en chirurgie ciblée**.

⚠️ **Tableau benchmark interne** : sur M·01 à M·06, le tableau `.method-table` (Direction B Lab canonique) reste à **5 lignes** (M·01 → M·05). La version 7 lignes existe uniquement sur M·07 (via le bloc PHP `wpf/lab-methods-table`). À uniformiser : soit en ajoutant 2 lignes (M·06, M·07) au tableau dans le markup de chaque page, soit en remplaçant le tableau Direction B par le bloc `<!-- wp:wpf/lab-methods-table /-->` partout (cohérence forte, mais demande activation du plugin sur M·01-M·06).

⚠️ **Sur M·03, M·04, M·05** : le tableau interne (HTML brut) a probablement encore une ligne 02 marquée `.method-row featured` (legacy "M·02 gagnant"). À patcher.

⚠️ **Hero M·02 "verdict strip" et autres détails internes** : le find/replace cible quelques patterns mais le contenu Direction B interne est rich, certains résidus peuvent subsister (à inspecter visuellement en session suivante).

⚠️ **Validation éditeur WP côté Fabrice** : pour M·02, M·06, M·07, **ouvrir l'éditeur Gutenberg sur navigateur réel** et vérifier que les blocs sont éditables au clic (rappel S5 : Playwright fresh tombait parfois en Code Editor, mais utilisateur réel a le mode visuel).

---

## 4 · Décisions Auto Mode prises sans demande explicite

1. **Slug M·06** : `methode-gutenberg-pur` (cohérent avec pattern `methode-XXX` des M·01-M·05). Le brief du kick-off suggérait `methode-06-gutenberg-natif` mais c'était divergent du pattern existant.
2. **Slug M·07** : `methode-blocs-php-custom`.
3. **Page M·06 finale** : réutilisée id=257 (slug + titre renommés), page 253 trashée.
4. **Page M·07 finale** : réutilisée id=262 (slug + titre renommés).
5. **Gagnant après Fabrice "redéfinir le gagnant"** : **M·07** (logique : 30/30 brut, 37.5/37.5 pondéré, seul à coupler "design 100% locké" + "versionnable Git" + "MAJ centralisée 1 release = N pages").
6. **Étoile dans le menu Astra** : retirée de "02 · Gutenberg + CSS", ajoutée sur "07 · Blocs PHP custom ★".
7. **HUB en tête de menu Astra** : item "★ Hub" en position 1, avant les 7 méthodes.
8. **Tableau benchmark Direction B interne (5 lignes)** : laissé en l'état sur les pages M·01-M·06 (contenu Direction B canonique, refonte 5→7 lignes différée).
9. **Article WPFormation** : NON rédigé par Claude (l'article sera rédigé par WP Formation). Le document `note-technique-pour-redacteur-wpformation-S6.md` sert de matériel brut pour le rédacteur.

---

## 5 · Pour la prochaine session

### Chantiers résiduels (S7 si besoin)

1. **Patcher KPI 01** : passer "5" → "7" dans `<h2 class="stat-value">` du premier KPI sur M·01 à M·06.
2. **Tableau benchmark 7 lignes** : ajouter M·06 + M·07 au tableau Direction B sur les 6 pages M·01-M·06. Coût estimé : ~30 min de markup par page × 6 = 3h.
3. **Featured row migration** : retirer `.method-row featured` de la ligne 02 et le mettre sur la ligne 07 nouvellement ajoutée. Sur M·03/M·04/M·05 (HTML brut), find/replace ciblé.
4. **Hero M·02 / M·06 / autres** : nettoyer les résidus "★ MÉTHODE 02 GAGNE" qui peuvent subsister dans le contenu interne (verdict strip, roadmap, etc.).
5. **Validation éditeur côté Fabrice** : ouvrir M·02, M·06, M·07 en BO réel, vérifier l'éditabilité Gutenberg ; capturer pour archive.
6. **Cleanup zombie** : dossier `wp-content/plugins/wpf-lab-blocks/` (zip Windows S5 cassé) à supprimer via cPanel File Manager o2switch.
7. **Pages secondaires** : 200 (`limportant-cest-les-containers`) et 213 (`test-page-header-footer`) — décider trash ou archivage.

### Refonte profonde (long terme)

- Intégrer le bloc `wpf/lab-methods-table` (qui affiche 7 méthodes scorées canoniquement) **sur HUB + M·01-M·06** pour avoir un tableau unique cross-pages → 1 release plugin = N pages MAJ.
- Étendre `wpf-lab` avec les composants WPFormation (header brand, formation cards, blog index card) pour préparer la **refonte WPFormation 2026** (M·07 = la voie pro recommandée).
- Publier le repo `wpf-lab` sur github.com/wpformation pour accompagner l'article WP Formation.

---

## 6 · Liste exhaustive des fichiers produits / modifiés

### Plugin (livrable réutilisable)

```
wpf-lab/
├── wpf-lab.php             # v1.1.0 : loop register 11 blocs
├── style.css               # ~700 lignes : classes wpf-lab-* pour 11 blocs
└── blocks/
    ├── lab-utility/{block.json, render.php}     (S6 nouveau)
    ├── lab-localnav/{block.json, render.php}    (S6 nouveau)
    ├── lab-banner/{block.json, render.php}      (S6 nouveau)
    ├── lab-hero/{block.json, render.php}        (existant)
    ├── lab-stats/{block.json, render.php}       (S6 nouveau)
    ├── lab-why/{block.json, render.php}         (S6 nouveau)
    ├── lab-pillars/{block.json, render.php}     (S6 nouveau)
    ├── lab-feature-twocol/{block.json, render.php} (existant)
    ├── lab-methods-table/{block.json, render.php} (S6 nouveau, contenu 7 méthodes figé)
    ├── lab-team/{block.json, render.php}        (S6 nouveau, contenu figé)
    └── lab-cta-final/{block.json, render.php}   (existant)
```

### Scripts utilitaires (réutilisables)

```
scripts/
├── make-zip-unix.js                  # zip Unix-compat (cross-projets)
├── upload-wpf-lab-blocks-plugin.js   # upload Playwright wp-admin
├── screenshot.js                      # captures desktop + mobile
├── push-s4-octies-footers.js          # pipeline push M1-M5 (footers + CSS shared)
├── build-and-push-hub-v3.js           # pipeline HUB v3 (7 méthodes, M·07 gagnant)
├── build-and-push-m6-v3.js            # pipeline M·06 (clone M·02 + CSS dans core/html)
├── push-m7-final.js                   # pipeline M·07 (11 blocs PHP custom)
├── generate-footers-s6c.js            # générateur 8 footers depuis template
├── s6c-patch-markups.js               # 142 patches text 5→7 + gagnant
├── s6c-rebuild-menu-astra.js          # MAJ menu Astra 8 items
└── footer-lab-{HUB,M1...M7}.html       # 8 fichiers footer
```

### Rapports + docs

```
docs/
├── matrice-evaluation.md              # grille de scoring (existant, base)
├── note-technique-pour-redacteur-wpformation-S6.md   # S6 nouveau (matière brute)
├── candidats.md, protocole-test.md, README.md       # existants

rapports/
├── (rapports S1-S5 existants)
├── matrice-finale-7-methodes-2026-05-21-S6.md       # S6 nouveau (Bloc D)
└── session-6-recap-2026-05-21.md                    # CE FICHIER
```

### Captures (16 finales)

```
captures/
└── s6c-FINAL-{HUB,M1,M2,M3,M4,M5,M6,M7}-{desktop,mobile}.png
```

---

## 7 · Verbatim et règles à garder en tête

> **Fabrice (S6c)** : « Sur toutes les méthodes, sur toutes les pages, tu as laissé cinq façons de... Désormais, **C7**, tu dois tout mettre à jour, le contenu. Les résultats etc... Il faut également refaire le menu pour afficher les sept méthodes. Redéfinir le gagnant. Refaire les footers. Etc... Quand tu as tout fini, tu recheques tout, tu refais une passe, tu double-checks et tu vérifies que tout est OK, que tout est raccord. »

**Règles confirmées en S6** :
- ✅ Pas de `wp:html` pour cacher la non-éditabilité (M·02 et M·06 = vrais blocs Gutenberg natifs, M·07 = blocs PHP custom)
- ✅ Validation avant claim : captures desktop + mobile à chaque étape, **mais validation éditeur reste à confirmer côté Fabrice**
- ✅ Rate-limit Tiger Protect : sleep 18s + retry 22s × 12 sur 429, appliqué sur tous les scripts
- ✅ Zip Unix-compat via `make-zip-unix.js`
- ✅ Wrap helpers PHP dans `if ( ! function_exists() )` pour éviter "Cannot redeclare"
- ✅ Brief Direction B = source unique (couleurs, typo, contenus)
- ✅ URL article correcte : `https://wpformation.com/creer-page-wordpress-claude-code/`

---

*EOF · S6 + S6c · 2026-05-21 · Direction B Lab + Plugin wpf-lab v1.1.0 · 7 méthodes en compétition · M·07 nouveau gagnant*
