# Matrice finale — 7 méthodes WordPress × Claude Code

**Date** : 2026-05-21 — Session S6
**Auteur** : Claude Code (généré pour Fabrice / WPFormation)
**Pages live** :
- HUB · https://test.wpformation.com/
- M·01 · https://test.wpformation.com/accueil-gutenberg-natif/
- M·02 · https://test.wpformation.com/methode-wpformation/
- M·03 · https://test.wpformation.com/methode-html-monobloc/
- M·04 · https://test.wpformation.com/methode-html-multiblocs/
- M·05 · https://test.wpformation.com/methode-spectra-pro/
- M·06 · https://test.wpformation.com/methode-gutenberg-pur/ (S6 nouveau)
- M·07 · https://test.wpformation.com/methode-blocs-php-custom/ (S6 nouveau)

---

## 1 · Grille de scoring (6 critères × 5 points = /30 par méthode)

| Critère | Description | Pondération |
|---|---|---|
| **C1 — Éditabilité Gutenberg** | Un rédacteur non-tech peut-il modifier titre/lead/CTA depuis l'admin WP sans casser la mise en page ? | 1.0 |
| **C2 — Qualité visuelle finale** | Le rendu front est-il pixel-conforme à la maquette Direction B Lab (palette, typo, offsets, brutalist) ? | **2.0** (sensible Fabrice) |
| **C3 — Indépendance plugin** | Combien de plugins payants/tiers la méthode requiert-elle pour fonctionner ? | 1.5 |
| **C4 — Reproductibilité scriptée** | La méthode peut-elle être déployée 1-shot via REST/Playwright/CLI sans clics UI manuels ? | 1.0 |
| **C5 — Performance (poids content + assets)** | Taille du `post_content` BDD + KB injectés en page (CSS/JS/images). | 0.5 |
| **C6 — Maintenabilité long-terme** | Versionnage Git du design ? MAJ centralisée cross-pages possible ? | 1.5 |

**Score brut** = somme des 6 critères × 5 → **/30 par méthode**
**Score pondéré** = (C1 + C2×2 + C3×1.5 + C4 + C5×0.5 + C6×1.5) × 5 → **/37.5 par méthode**

---

## 2 · Scoring détaillé par méthode

### M·01 — Gutenberg natif (0 plugin, 0 CSS)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 5 | 2 | 5 | 5 | 5 | 3 | **25/30** | **29.5/37.5** |
| Justif | Tout en blocs core éditables | Design wireframe contraint par les blocs core | Aucun plugin requis | 100% REST POST | Content ~10 KB, 0 CSS extra | Pas de versionning Git, contenu DB only |

**Cas d'usage** : page brouillon / formation débutants WordPress / site one-off pour non-tech.

### M·02 — Gutenberg natif + CSS personnalisé page-level (Spectra meta)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 5 | 5 | 3 | 5 | 4 | 2 | **24/30** | **30.5/37.5** |
| Justif | Blocs natifs préservés | Design pro Direction B | Requiert Spectra (free, mais dépendant) | REST + meta `_uag_custom_page_level_css` | CSS en meta (~115 KB par page) | CSS pas dans Git, doublonné en N pages |

**Cas d'usage** : site marketing custom géré en interne par 1 dev + rédacteurs. **La voie historique WPFormation (Alexandra).**

### M·03 — HTML monobloc

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 1 | 5 | 5 | 3 | 3 | 2 | **19/30** | **25.5/37.5** |
| Justif | 1 bloc HTML géant, inéditable pour non-tech | Design libre absolu | Aucun plugin | REST simple, mais markup gros | Content lourd (~70 KB inline) | Pas Git, pas centralisé |

**Cas d'usage** : landing one-shot live livrée par graphiste, à figer définitivement (jamais re-éditer en BO).

### M·04 — HTML multi-blocs (10 wp:html)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 3 | 5 | 5 | 4 | 3 | 2 | **22/30** | **28.5/37.5** |
| Justif | Sections déplaçables mais HTML opaque par section | Design libre | Aucun plugin | REST simple, CSS en meta | Content ~25 KB + CSS meta | Pas Git, doublonné |

**Cas d'usage** : site avec sections sensibles à réorganiser sans toucher au design fin.

### M·05 — Spectra Pro (full Spectra blocks)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 4 | 4 | 2 | 4 | 3 | 3 | **20/30** | **25.5/37.5** |
| Justif | UI Spectra Pro confortable mais Code Editor fragile | Design plugin-driven, presets corrects mais moins fin | Dépendant Spectra Pro **payant** | REST possible mais souvent UI manuelle | Plugin Spectra Pro lourd côté assets | Configuration en BDD, peu Git-friendly |

**Cas d'usage** : agence avec abonnement Spectra Pro, équipe non-codeurs.

### M·06 — Gutenberg pur + CSS dans 1 core/html (S6 nouveau)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | 5 | 5 | **5** | 5 | 3 | 3 | **26/30** | **32.5/37.5** |
| Justif | Blocs natifs + CSS visible dans 1 bloc core/html éditable | Design pro Direction B (= M·02) | **Zéro plugin requis** (vs M·02 qui exige Spectra) | REST 100% | Content lourd (~190 KB embarqué CSS) | CSS dans content, exportable mais pas Git-natif |

**Cas d'usage** : site indépendant, design custom one-page, pas de plugin Spectra. **Variante 100% native de la voie d'Alexandra.**

### M·07 — Blocs PHP custom (plugin wpf-lab, autoRegister WP 7.0) (S6 nouveau)

| | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | **Brut** | **Pondéré** |
|---|---|---|---|---|---|---|---|---|
| Score | **5** | 5 | **5** | 5 | **5** | **5** | **30/30** | **37.5/37.5** |
| Justif | Champs typés autoRegister (panel WP natif) | Design 100% locké dans le plugin | Zéro plugin tiers (plugin custom = sous notre contrôle) | REST 1-shot (11 blocs auto-registered) | Content ~3 KB par page (markup minimal) | **CSS + render PHP versionnés Git, MAJ centralisée 1 release = N pages** |

**Cas d'usage** : refonte site marketing pro avec design system rigoureux + rédacteurs non-techs + équipe dev maintenant la stack long-terme. **La voie pro 2026.**

---

## 3 · Tableau de ranking final

| Rang | Méthode | Brut /30 | Pondéré /37.5 | Verdict synthétique |
|---|---|---|---|---|
| **1** ★ | **M·07 — Blocs PHP custom** | **30** | **37.5** | Le maximum sur tous les critères. La voie pro 2026. |
| **2** | M·06 — Gutenberg pur + core/html | 26 | 32.5 | Variante 100% native de M·02. Indépendance maximum. |
| **3** | M·02 — Gutenberg + CSS perso (Spectra meta) | 24 | 30.5 | La voie historique WPFormation. Dépendance Spectra. |
| 4 | M·01 — Gutenberg natif | 25 | 29.5 | Baseline WordPress. Sans design. |
| 5 | M·04 — HTML multi-blocs | 22 | 28.5 | Compromis design libre + sections déplaçables. |
| 6 | M·03 — HTML monobloc | 19 | 25.5 | Design libre absolu. Inéditable pour non-tech. |
| 6 | M·05 — Spectra Pro | 20 | 25.5 | UI riche mais dépendance plugin payant. |

---

## 4 · Identification du meilleur compromis (par cas d'usage)

| Cas d'usage | Méthode recommandée | Justification |
|---|---|---|
| **Site marketing pro avec design system + rédacteurs non-techs** | **M·07** | Design 100% locké + édition champ par champ. Maintenable long-terme via Git. |
| **Site indépendant, page one-off, pas de plugin** | **M·06** | Pixel-conforme M·02 sans dépendance Spectra. |
| **Site historique WPFormation (legacy)** | M·02 | Setup éprouvé, équipe connaît Spectra meta. Garder pour les sites en place. |
| **Formation WordPress débutants** | M·01 | Pédagogie : pas de CSS, juste les blocs core. |
| **Refonte WPFormation 2026 (vision long-terme)** | **M·07** | DNA exact Fabrice (PHP), versionnable Git, déployable cross-projets (OGEEAT, LoginArmor, etc.) |
| **Landing one-shot pixel-perfect** | M·03 | Design libre 100% + figer définitivement. Pas de re-édition prévue. |
| **Agence avec Spectra Pro licence** | M·05 | Si l'agence paie déjà l'abonnement, UI Spectra Pro est confortable. |
| **Site headless (Next.js / Astro consume REST)** | **M·07** | HTML PHP rendu serveur = clean. Compatible API REST sans transformation. |

---

## 5 · Insights stratégiques pour l'article WPFormation

1. **Le verdict change avec l'arrivée de M·07** : avant S6, la voie d'Alexandra (M·02) était LA recommandation. Avec WP 7.0 + autoRegister, **M·07 devient supérieure** sur tous les critères strictement quantifiables. La voie d'Alexandra (M·02) reste **le compromis historique** et garde sa pertinence pour les sites existants.

2. **M·06 est la voie "indépendance" stratégique** : pour les développeurs qui veulent éviter d'enchaîner les dépendances plugin (Spectra hier, autre demain), M·06 prouve qu'on peut faire de l'Alexandra-grade design sans aucun plugin tiers.

3. **M·07 ouvre un usage qui n'existait pas** : avant WP 7.0, créer un bloc PHP custom nécessitait soit ACF Pro (payant + dépendance externe), soit React + wp-scripts (coût d'entrée élevé). Le combo `apiVersion: 1 + autoRegister + autoRegister + is_dynamic` change la donne — **un développeur PHP solo peut désormais livrer un plugin custom de design system en quelques heures**, sans toucher au JS.

4. **Le marqueur "content léger" de M·07** (~3 KB par page vs ~190 KB pour M·06) est un avantage compétitif **pour les sites multilingues / fortes volumétries** : duplique 100 pages → 300 KB vs 19 MB. La différence est tangible.

5. **Sur le pilier "Maintenabilité long-terme" (C6)** : seul M·07 obtient 5/5. C'est l'argument décisif pour une refonte pro 2026 — une release du plugin propage automatiquement à toutes les pages qui utilisent les blocs.

---

## 6 · Pondération alternative (si Fabrice veut peser plus le Design)

Si on applique `C2 Design × 3.0` au lieu de 2.0 (Fabrice insiste sur la sensibilité design) :

| Rang | Méthode | Pondéré Design×3 /42.5 |
|---|---|---|
| 1 ★ | **M·07** | **42.5** |
| 2 | M·06 | 37.5 |
| 3 | M·02 | 35.5 |
| 4 | M·04 | 33.5 |
| 5 | M·03 | 30.5 |
| 6 | M·05 | 29.5 |
| 7 | M·01 | 29.5 |

→ Le ranking est inchangé en tête (M·07 reste #1), mais M·06 et M·02 creusent l'écart sur les méthodes sans CSS custom (M·01).

---

## 7 · Recommandation finale Fabrice

> **Migrer WPFormation production de M·02 vers M·07 en 2026-S2** :
>
> - Phase 1 : utiliser le plugin `wpf-lab` actuel comme base, l'étendre avec les blocs propres au branding WPFormation (logo, header, footer brand, formation cards…)
> - Phase 2 : refondre les pages clés (accueil, formations, blog index) en utilisant ces blocs custom
> - Phase 3 : garder les anciennes pages en M·02 (legacy) tant qu'elles ne sont pas refondues
>
> **Avantages attendus** :
> - Design system unifié et versionné Git
> - Édition rédactionnelle simplifiée (panels typés)
> - Maintenabilité long-terme (1 release = N pages)
> - Préparation à un éventuel passage headless (Next.js / Astro / Eleventy)
>
> **Coût d'entrée** : ~1-2 jours de dev pour étendre `wpf-lab` aux composants WPFormation, puis ~30 min par bloc supplémentaire.

---

*EOF · matrice S6 · 2026-05-21*
