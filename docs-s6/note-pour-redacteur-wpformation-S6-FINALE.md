# Note pour le rédacteur WPFormation — Article « Créer une page WordPress avec Claude Code »

> **Document de transmission** destiné au Claude Code du projet WPFormation, en charge de réécrire / mettre à jour l'article cible :
>
> **URL finale** : `https://wpformation.com/creer-page-wordpress-claude-code/`
>
> **Statut actuel de l'article** : version « hier » (figée à la session précédente), publiée avec **5 méthodes** et un **mauvais vainqueur déclaré** (M·02 « Gutenberg + CSS personnalisé »). À **mettre à jour intégralement** avec les éléments ci-dessous.
>
> **Date du présent rapport** : 2026-05-21 — session S6 du projet WPF-AI-LAB.

---

## Table des matières

1. [Synthèse exécutive (pour aller à l'essentiel)](#1-synthèse-exécutive)
2. [Pourquoi ce rapport existe — historique S1 → S6](#2-pourquoi-ce-rapport-existe)
3. [Le protocole de benchmark (méthodologie chiffrée)](#3-le-protocole-de-benchmark)
4. [Les 7 méthodes en compétition — fiches détaillées](#4-les-7-méthodes-en-compétition)
5. [Matrice de scoring 7 × 6 critères](#5-matrice-de-scoring)
6. [Classement final + verdict par cas d'usage](#6-classement-final)
7. [Les 2 nouvelles méthodes S6 — récit détaillé](#7-les-2-nouvelles-méthodes-s6)
8. [La passe « wow » sur M·07 (effets CSS Direction B)](#8-la-passe-wow-sur-m07)
9. [Pourquoi M·07 gagne — argumentaire pour l'article](#9-pourquoi-m07-gagne)
10. [Anti-patterns et pièges techniques rencontrés](#10-anti-patterns-et-pièges)
11. [URLs et ressources pour l'article](#11-urls-et-ressources)
12. [Annexes techniques (code & extraits)](#12-annexes-techniques)
13. [Trame éditoriale suggérée pour la nouvelle version](#13-trame-éditoriale-suggérée)

---

## 1 · Synthèse exécutive

**Le test a évolué de 5 → 7 méthodes**. La session S6 (21 mai 2026) a ajouté deux nouvelles approches qui n'existaient pas dans l'article précédent :

- **M·06 — Gutenberg pur + CSS dans un seul bloc `core/html`** : la voie 100 % WordPress natif, sans aucun plugin tiers, avec un design pixel-conforme à la voie historique de WPFormation.
- **M·07 — Blocs PHP custom (plugin `wpf-lab` + autoRegister WP 7.0)** : la voie pro 2026, qui exploite le nouveau pattern WordPress 7.0 permettant d'écrire des blocs PHP custom avec UI auto-générée, **sans une ligne de JavaScript, sans React, sans build**.

**Le vainqueur change** : ce n'est plus M·02 (« Gutenberg + CSS personnalisé »). C'est **M·07**, qui obtient un score parfait **30 / 30 brut · 37,5 / 37,5 pondéré**. M·02 (l'ancien vainqueur) reste cité comme **la voie historique** (la « voie d'Alexandra » chez WPFormation), pertinente pour les sites existants, mais surpassée pour toute refonte 2026.

**M·06 prend la 2ᵉ place** (26 / 30 · 32,5 / 37,5) en démontrant qu'on peut faire du design Direction B-grade **sans aucun plugin**. M·02 descend à la 3ᵉ place (24 / 30 · 30,5 / 37,5).

**Ce qui doit changer dans l'article** :

- Le titre doit refléter « **7 méthodes** » (et non plus 5).
- Le vainqueur déclaré doit être **M·07** (et non plus M·02).
- Deux nouvelles fiches méthodes doivent être ajoutées (M·06 et M·07).
- La matrice de scoring doit être recalculée avec les 7 lignes.
- Le verdict final doit être revu : la **voie pro 2026 = blocs PHP custom**, la voie historique reste M·02 mais comme legacy.
- L'illustration de la solution gagnante doit montrer **les effets visuels de M·07** (passe « wow » détaillée en §8).

---

## 2 · Pourquoi ce rapport existe

### 2.1 Contexte projet WPF-AI-LAB

Le projet **WPF-AI-LAB** est un lab d'évaluation comparative pour départager les façons de créer une page WordPress moderne en 2026 — sur le site de test isolé `test.wpformation.com`, avec une grille de scoring chiffrée plutôt qu'un jugement à l'œil.

Le lab a démarré le 19 mai 2026 avec **5 méthodes** initiales :

- M·01 — Gutenberg natif (baseline WordPress)
- M·02 — Gutenberg natif + CSS personnalisé page-level (Spectra meta)
- M·03 — HTML monobloc (1 seul `wp:html` géant)
- M·04 — HTML multi-blocs (10 `wp:html` sectionnés)
- M·05 — Spectra Pro (full Spectra blocks)

L'article publié initialement reposait sur ces 5 méthodes et déclarait **M·02 vainqueur**.

### 2.2 Pourquoi 2 nouvelles méthodes en S6

Au cours des sessions S4 et S5, deux constats sont apparus :

1. **M·02 a un défaut structurel** : elle exige le plugin Spectra (gratuit certes, mais ajout de dépendance). Question légitime : peut-on obtenir le même rendu **sans aucun plugin** ? → naissance de **M·06**.

2. **WordPress 7.0 a livré en janvier 2026 le `autoRegister` (PHP-only block registration)** : un nouveau combo (`supports.autoRegister: true` (au niveau bloc) + un rendu (`render: "file:./render.php"` ou `render_callback`)) qui permet d'écrire un bloc PHP custom complet **sans toucher au JavaScript**. Cette nouveauté change la donne pour les développeurs PHP solo (le profil WPFormation), qui pouvaient jusqu'ici choisir entre ACF Pro (payant) ou React+wp-scripts (coût d'entrée élevé). → naissance de **M·07**.

Ces deux ajouts ont été testés en S6, scorés avec la même grille, et placés dans le classement. **Le vainqueur a changé**.

### 2.3 Ce que ce rapport contient

Ce document est conçu pour permettre au Claude Code du projet WPFormation de **réécrire l'article cible**. Il contient :

- La méthodologie complète (transposable en section « comment on a testé »)
- Les fiches détaillées des 7 méthodes
- La matrice de scoring 6 critères × 7 méthodes
- Le récit du gagnant (M·07) avec code samples
- Les URLs de toutes les pages de démonstration
- Les anti-patterns rencontrés (utilisables comme encarts pédagogiques)
- Une trame éditoriale suggérée

---

## 3 · Le protocole de benchmark

### 3.1 Environnement

| Champ | Valeur |
|---|---|
| Site de test | `https://test.wpformation.com` |
| Hébergeur | o2switch (Tiger Protect actif → rate-limit 429 sur écritures fréquentes) |
| Thème | Astra (free) |
| Plugin Spectra | Activé (free + Pro pour M·05) |
| WordPress version | 7.0+ (pour le `autoRegister` (PHP-only block registration) de M·07) |
| Outil pilote | Claude Code (CLI), Auto Mode actif |
| API d'écriture | REST API WordPress + meta Spectra `_uag_custom_page_level_css` pour le CSS par page |
| Captures | Playwright (1440×900 desktop + 375×812 mobile) |

### 3.2 Une maquette de référence pour départager

Toutes les méthodes ont implémenté la même maquette : **Direction B Lab**.

C'est une maquette brutalist-éditoriale créée pour le lab (palette `bone #EDECE7` + `ink #0A0A0A` + `acid #D7FF3A` + `violet #6F4BFF`, typographies Space Grotesk + JetBrains Mono, 10 sections : utility, localnav, banner, hero, stats, why, pillars, feature-2col, methods-table, team, cta-final).

L'objectif : **rejouer la même maquette avec chaque méthode**, puis scorer le résultat. C'est ce qui permet de comparer objectivement (et non un site différent par méthode, où la perception design biaiserait le verdict).

### 3.3 Six critères de scoring

| # | Critère | Description | Pondération |
|---|---|---|---|
| **C1** | Éditabilité Gutenberg | Un rédacteur non-tech peut-il modifier titre / lead / CTA depuis l'admin WP sans casser la mise en page ? | 1,0 |
| **C2** | Qualité visuelle finale | Le rendu front est-il pixel-conforme à la maquette Direction B Lab ? | **2,0** (sensibilité forte) |
| **C3** | Indépendance plugin | Combien de plugins payants ou tiers la méthode requiert-elle ? | 1,5 |
| **C4** | Reproductibilité scriptée | La méthode peut-elle être déployée 1-shot via REST / Playwright / CLI ? | 1,0 |
| **C5** | Performance | Taille du `post_content` BDD + KB injectés en page (CSS / JS / images) | 0,5 |
| **C6** | Maintenabilité long-terme | Versionnage Git ? MAJ centralisée cross-pages possible ? | 1,5 |

Chaque critère est noté de **1 (très faible) à 5 (excellent)**.

- **Score brut** = somme des 6 critères × 5 → **sur 30 par méthode**
- **Score pondéré** = (C1 + C2×2 + C3×1,5 + C4 + C5×0,5 + C6×1,5) × 5 → **sur 37,5 par méthode**

### 3.4 Workflow type d'un test

1. Snapshot site avant
2. Choix d'une méthode et d'un scénario
3. Exécution du protocole de cette méthode (script `push-mX-...js` dédié)
4. Capture desktop + mobile + zooms BO
5. Scoring chiffré C1 à C6 + justification écrite
6. Rapport horodaté `rapports/<scenario>-<methode>-<YYYY-MM-DD-HHmm>.md`
7. Cleanup site

---

## 4 · Les 7 méthodes en compétition

Pour chaque méthode : pitch, comment ça marche techniquement, avantages, inconvénients, pour qui, captures référence.

### 4.1 — M·01 · Gutenberg natif

**URL démo** : https://test.wpformation.com/accueil-gutenberg-natif/

**Pitch** : Que rend WordPress « tel quel », sans CSS personnalisé, sans plugin, juste avec les blocs Gutenberg core ?

**Technique** :
- 100 % blocs `core/*` (heading, paragraph, image, columns, buttons, list, cover, table, group, quote)
- Aucune meta CSS, aucun plugin
- Le rendu repose **exclusivement sur les styles par défaut du thème Astra**

**Avantages** :
- Zéro dépendance (un site neuf qui s'installe en 5 min)
- 100 % éditable par n'importe quel rédacteur
- Sauvegarde / migration triviales (tout est dans le `post_content`)
- Pédagogique : démontre les limites natives

**Inconvénients** :
- Design « wireframe » : la maquette Direction B est inatteignable
- Pas d'effets visuels, pas de typographies personnalisées
- Verdict honnête : **le baseline WordPress fait peur en 2026**

**Pour qui** : pages brouillons, formations débutants WordPress, sites one-off pour non-techniques.

**Score** : 25 / 30 brut · **29,5 / 37,5 pondéré** · Rang 4

---

### 4.2 — M·02 · Gutenberg natif + CSS personnalisé (Spectra meta)

**URL démo** : https://test.wpformation.com/methode-wpformation/

**Pitch** : C'est **la voie historique WPFormation** (la « voie d'Alexandra »). On garde des blocs Gutenberg natifs éditables, et on injecte un CSS par-page via la meta Spectra `_uag_custom_page_level_css`.

**Technique** :
- Markup : 100 % blocs `core/*` éditables (heading, paragraph, columns, etc.)
- Design : CSS personnalisé poussé dans la meta `_uag_custom_page_level_css` du plugin Spectra (free)
- Le CSS scope page (sélecteurs `body.page-id-XXX`) pour ne pas leaker sur d'autres pages

**Avantages** :
- Markup éditable préservé (rédacteurs autonomes)
- Design pixel-conforme Direction B
- Plugin Spectra free uniquement (pas de Pro requis)
- Setup éprouvé depuis plusieurs années chez WPFormation

**Inconvénients** :
- Requiert le plugin Spectra (dépendance)
- Le CSS est stocké en BDD page par page (pas de versioning Git natif)
- Doublonnage CSS si N pages partagent le même design
- Une MAJ design = N pages à toucher (sauf si on utilise `footer-lab-shared` injecté programmatiquement)

**Pour qui** : sites marketing custom, équipe interne 1 dev + N rédacteurs, projets existants WPFormation.

**Score** : 24 / 30 brut · **30,5 / 37,5 pondéré** · Rang 3

**Tag dans l'article** : **★ La voie historique** (et non plus « La gagnante »)

---

### 4.3 — M·03 · HTML monobloc

**URL démo** : https://test.wpformation.com/methode-html-monobloc/

**Pitch** : Une seule grosse iframe d'HTML/CSS collée dans un bloc Custom HTML. Le designer livre, le contenu est figé.

**Technique** :
- 1 seul bloc `core/html` contenant **tout** le HTML + le `<style>` inline
- Aucune dépendance plugin
- Rendu pixel-perfect

**Avantages** :
- Design 100 % libre
- Zéro plugin
- Reproductible (1 fichier HTML → 1 page WP)

**Inconvénients** :
- **Inéditable** pour un rédacteur non-tech (le bloc Custom HTML montre du code)
- Si le client demande « change le titre », il faut éditer le HTML manuellement
- Risque CSP / sanitize si WordPress filtre certaines balises
- Pas SEO-friendly pour les blocs sémantiques (tout est dans un container générique)

**Pour qui** : landing one-shot livrée par un graphiste, jamais re-éditée en BO.

**Score** : 19 / 30 brut · **25,5 / 37,5 pondéré** · Rang 6

---

### 4.4 — M·04 · HTML multi-blocs (10 wp:html)

**URL démo** : https://test.wpformation.com/methode-html-multiblocs/

**Pitch** : Variante de M·03, mais on découpe le HTML en N blocs Custom HTML (1 par section), de sorte que les sections soient déplaçables dans l'éditeur.

**Technique** :
- 10 blocs `core/html` (un par section : utility, localnav, banner, hero, stats, why, pillars, feature, methods-table, team, cta)
- CSS poussé en meta Spectra `_uag_custom_page_level_css` (séparé du markup)

**Avantages vs M·03** :
- Sections déplaçables / réordonnables / dupliquables dans l'éditeur Gutenberg
- Possible suppression d'une section sans casser le reste
- CSS séparable du markup

**Inconvénients** :
- Le contenu **d'une section** reste opaque (toujours du HTML brut dans chaque bloc)
- Plus de blocs = plus de poids `post_content`
- Si une section utilise un design partagé (header / footer), changement = N blocs à toucher

**Pour qui** : site avec sections sensibles à réorganiser sans toucher au design fin.

**Score** : 22 / 30 brut · **28,5 / 37,5 pondéré** · Rang 5

---

### 4.5 — M·05 · Spectra Pro

**URL démo** : https://test.wpformation.com/methode-spectra-pro/

**Pitch** : Refaire la maquette en utilisant uniquement les blocs Spectra Pro (advanced columns, advanced heading, container, etc.), sans CSS perso.

**Technique** :
- Plugin Spectra Pro (payant) activé
- Markup = blocs `uagb/*` (Spectra)
- Design configuré directement via les panels Spectra (typo, espacement, couleurs)
- Aucun CSS personnalisé externe

**Avantages** :
- UI Spectra Pro très confortable pour qui paie l'abonnement
- Presets de blocs déjà pertinents
- Édition WYSIWYG totale

**Inconvénients** :
- **Dépendance plugin payant** (abonnement Spectra Pro)
- L'UI Spectra Pro peut **basculer en Code Editor** sur certaines manipulations programmatiques (vu pendant les tests via Playwright)
- Le design final reste « presets-driven » : moins fin que du CSS écrit à la main pour atteindre une charte précise
- Plugin lourd côté assets (CSS / JS chargés sur toutes les pages)

**Pour qui** : agence avec abonnement Spectra Pro, équipe non-codeurs, design ne demandant pas de finesse pixel-perfect.

**Score** : 20 / 30 brut · **25,5 / 37,5 pondéré** · Rang 6 (ex-aequo avec M·03)

---

### 4.6 — M·06 · Gutenberg pur + CSS dans un seul `core/html` ★ NOUVEAU S6

**URL démo** : https://test.wpformation.com/methode-gutenberg-pur/

**Pitch** : C'est la variante **100 % native** de M·02. Tout le design Direction B, mais sans dépendance Spectra. Le CSS est embarqué dans un seul bloc `core/html` placé en tête de page (qui contient juste une balise `<style>` géante).

**Technique** :
- Markup : 100 % blocs `core/*` éditables (identique à M·02 sur ce plan)
- Design : un seul bloc `core/html` au sommet du contenu contenant `<style>...</style>` (~130 KB de CSS)
- Aucune meta CSS, aucun plugin (Spectra peut être désinstallé)

**Différence clé avec M·03/M·04** : M·06 utilise **un seul** `core/html` **uniquement pour le `<style>`**. Le reste du contenu est en vrais blocs Gutenberg natifs éditables.

**Avantages** :
- **Zéro plugin requis** (vs M·02 qui exige Spectra)
- Markup éditable préservé (rédacteurs autonomes)
- Design pixel-conforme Direction B (équivalent M·02)
- Une seule page = un seul fichier (CSS embarqué)

**Inconvénients** :
- `post_content` lourd (~190 KB par page, CSS inclus)
- Pas de versioning Git natif (le CSS est dans la BDD)
- Doublonnage si N pages partagent le même CSS (pareil que M·02)
- Le bloc `core/html` du `<style>` peut sembler intimidant pour un rédacteur, **mais on peut le ranger en mode "non-affiché"** dans la sidebar Gutenberg pour le masquer.

**Pour qui** : site indépendant, design custom, refus catégorique de toute dépendance plugin tiers.

**Score** : 26 / 30 brut · **32,5 / 37,5 pondéré** · **Rang 2**

**À retenir pour l'article** : M·06 est **la voie « indépendance plugin »** stratégique. Pour les équipes WPFormation qui veulent prouver qu'on peut faire un design pro sans dépendance externe, c'est l'argument.

---

### 4.7 — M·07 · Blocs PHP custom (plugin `wpf-lab` + autoRegister WP 7.0) ★ NOUVEAU S6 ★ GAGNANT

**URL démo** : https://test.wpformation.com/methode-blocs-php-custom/

**Pitch** : La voie **pro 2026**. Un plugin custom (`wpf-lab`) déclare 11 blocs PHP, chacun avec un rendu serveur et une UI d'édition **auto-générée par WordPress 7.0** depuis le schéma d'attributs (`autoRegister`). **Zéro JavaScript, zéro React, zéro build**. Le design est versionné dans Git, déployable sur N pages en un seul upload de plugin.

**Technique** :

Pour chaque bloc (par exemple `lab-hero`) :

`wpf-lab/blocks/lab-hero/block.json` :
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 1,
  "name": "wpf/lab-hero",
  "title": "Lab Hero",
  "category": "wpf-lab",
  "supports": { "html": false, "autoRegister": true },
  "render": "file:./render.php",
  "attributes": {
    "eyebrowFile":   { "type": "string", "default": "METHODE-07-PHP-ONLY-BLOCK-REGISTRATION.MD" },
    "eyebrowPath":   { "type": "string", "default": "WP 7.0 · 2026.05.21" },
    "titleStart":    { "type": "string", "default": "Méthode 07 —" },
    "titleHighlight":{ "type": "string", "default": "blocs PHP" },
    "titleEnd":      { "type": "string", "default": "× zéro JS" },
    "lead":          { "type": "string", "default": "3 blocs Gutenberg custom écrits en PHP pur via Claude Code, avec UI auto-générée WP 7.0 (autoRegister). Design Direction B Lab locké, édition non-destructive par champs." },
    "ctaPrimary":    { "type": "string", "default": "Voir section 2" },
    "ctaSecondary":  { "type": "string", "default": "Retour Hub" },
    "metaLine":      { "type": "string", "default": "section 1/3 · blocs PHP natifs · UI autoRegister · zéro build" }
  }
}
```

`wpf-lab/blocks/lab-hero/render.php` :
```php
<?php
$eyebrowFile   = $attributes['eyebrowFile']   ?? 'METHODE-07-ACF-PHP.MD';
$eyebrowPath   = $attributes['eyebrowPath']   ?? 'POC ACF/PHP · 2026.05.21';
$titleStart    = $attributes['titleStart']    ?? 'Méthode 07 —';
$titleHighlight= $attributes['titleHighlight']?? 'blocs PHP';
$titleEnd      = $attributes['titleEnd']      ?? '× zéro JS';
$lead          = $attributes['lead']          ?? 'Lead…';
$ctaPrimary    = $attributes['ctaPrimary']    ?? 'Voir section 2';
$ctaSecondary  = $attributes['ctaSecondary']  ?? 'Retour Hub';
$metaLine      = $attributes['metaLine']      ?? '';
?>
<section class="wpf-lab-hero">
  <p class="wpf-lab-hero__eyebrow">
    <span class="wpf-lab-hero__eyebrow-tag">FILE</span>
    <?php echo esc_html( $eyebrowFile ); ?> · <?php echo esc_html( $eyebrowPath ); ?>
  </p>
  <h1 class="wpf-lab-hero__title">
    <?php echo esc_html( $titleStart ); ?>
    <span class="wpf-lab-hero__title-hl"><?php echo esc_html( $titleHighlight ); ?></span>
    <?php echo esc_html( $titleEnd ); ?>
  </h1>
  <p class="wpf-lab-hero__lead"><?php echo esc_html( $lead ); ?></p>
  <div class="wpf-lab-hero__cta-row">
    <a href="#section-2" class="wpf-lab-btn wpf-lab-btn--acid"><?php echo esc_html( $ctaPrimary ); ?> ↘</a>
    <a href="/" class="wpf-lab-btn wpf-lab-btn--ghost"><?php echo esc_html( $ctaSecondary ); ?></a>
  </div>
  <p class="wpf-lab-hero__meta"><?php echo esc_html( $metaLine ); ?></p>
</section>
```

Et dans le contenu de la page, **une seule ligne** :
```html
<!-- wp:wpf/lab-hero /-->
```

WordPress 7.0 fait le reste : il lit le `block.json`, voit `autoRegister: true` sur chaque attribut, et génère automatiquement la sidebar d'édition (un champ par attribut, type `string` → input texte, type `boolean` → toggle, etc.).

**Le rendu front est piloté par `render.php` côté serveur**. Pas d'hydration, pas de `useBlockProps`, pas de `edit.js`, pas de `save.js`.

**Architecture du plugin `wpf-lab` v1.1.0** :
```
wpf-lab/
├── wpf-lab.php             # bootstrap : loop register 11 blocs
├── style.css               # ~1158 lignes : classes .wpf-lab-* pour les 11 blocs
└── blocks/
    ├── lab-utility/         (S6 nouveau, top bar 2 lignes monospace)
    ├── lab-localnav/        (S6 nouveau, header brand + nav locale)
    ├── lab-banner/          (S6 nouveau, page courante sticky)
    ├── lab-hero/            (déjà existant S5, étendu S6)
    ├── lab-stats/           (S6 nouveau, 4 KPI sur fond noir)
    ├── lab-why/             (S6 nouveau, 2-col + pull-quote + capture + scores)
    ├── lab-pillars/         (S6 nouveau, 4 piliers 2×2 acid/paper/violet)
    ├── lab-feature-twocol/  (déjà existant S5)
    ├── lab-methods-table/   (S6 nouveau, contenu 7 méthodes figé dans render.php)
    ├── lab-team/            (S6 nouveau, 3 contributeurs figés)
    └── lab-cta-final/       (déjà existant S5)
```

**Markup d'une page complète M·07** = **3 KB** :
```html
<!-- wp:wpf/lab-utility /-->
<!-- wp:wpf/lab-localnav /-->
<!-- wp:wpf/lab-banner /-->
<!-- wp:wpf/lab-hero /-->
<!-- wp:wpf/lab-stats /-->
<!-- wp:wpf/lab-why /-->
<!-- wp:wpf/lab-pillars /-->
<!-- wp:wpf/lab-feature-twocol /-->
<!-- wp:wpf/lab-methods-table /-->
<!-- wp:wpf/lab-team /-->
<!-- wp:wpf/lab-cta-final /-->
<!-- footer-lab-M7.html injecté en pied -->
```

C'est tout. **11 lignes de markup, 3 KB**. Tout le design est dans le plugin.

**Avantages** :
- **Design 100 % locké** dans le plugin (un rédacteur ne peut pas casser le rendu)
- **Édition champ par champ** (UI WordPress native auto-générée, intuitive pour rédacteurs)
- **`post_content` ultra-léger** (~3 KB par page vs ~190 KB pour M·06)
- **Versionnable Git** (le plugin est un dossier de fichiers versionné)
- **MAJ centralisée** : 1 release plugin → N pages MAJ automatiquement
- **Zéro plugin tiers** (le plugin custom = sous notre contrôle, pas une dépendance externe)
- **Compatible headless** : `render.php` produit du HTML serveur propre, exposable via REST API sans transformation
- **Compatible CI / déploiement automatisé** : zip du plugin → upload via Playwright wp-admin ou MCP

**Inconvénients** :
- **Coût d'entrée initial** : il faut un développeur PHP qui sait écrire 11 fichiers `block.json` + 11 `render.php`. Estimé 1-2 jours pour la structure de base.
- **Pas adapté aux sites où le rédacteur veut tout réorganiser** (les sections sont figées par le plugin)
- **Pas idéal pour les sites où chaque page a un design différent** (l'avantage `MAJ centralisée` perd son intérêt)

**Pour qui** : refonte site marketing pro avec design system rigoureux, équipe dev maintenant la stack long-terme, rédacteurs non-techs. **Le profil exact WPFormation 2026**.

**Score** : **30 / 30 brut · 37,5 / 37,5 pondéré** · **Rang 1 ★**

---

## 5 · Matrice de scoring

Récapitulatif chiffré.

### 5.1 Tableau global

| Méthode | C1 Édit | C2 Design | C3 Indép | C4 Repro | C5 Perf | C6 Maint | Brut /30 | Pondéré /37,5 |
|---|---|---|---|---|---|---|---|---|
| M·01 — Gutenberg natif | 5 | 2 | 5 | 5 | 5 | 3 | 25 | 29,5 |
| M·02 — Gutenberg + CSS perso | 5 | 5 | 3 | 5 | 4 | 2 | 24 | 30,5 |
| M·03 — HTML monobloc | 1 | 5 | 5 | 3 | 3 | 2 | 19 | 25,5 |
| M·04 — HTML multi-blocs | 3 | 5 | 5 | 4 | 3 | 2 | 22 | 28,5 |
| M·05 — Spectra Pro | 4 | 4 | 2 | 4 | 3 | 3 | 20 | 25,5 |
| **M·06** — Gutenberg pur + core/html | 5 | 5 | **5** | 5 | 3 | 3 | **26** | **32,5** |
| **M·07** — Blocs PHP custom ★ | **5** | **5** | **5** | **5** | **5** | **5** | **30** | **37,5** |

### 5.2 Lecture rapide

- **M·07 est seul à obtenir le maximum sur tous les critères**.
- **M·06 est le seul autre à atteindre 5 / 5 sur "Indépendance plugin"** sans sacrifier le design.
- **M·02 (l'ancien gagnant) reste très haut** mais ne sort en tête sur aucun critère individuel.

### 5.3 Pondération alternative (sensibilité design × 3 au lieu de × 2)

Si on insiste sur le design :

| Rang | Méthode | Pondéré Design×3 /42,5 |
|---|---|---|
| 1 ★ | M·07 | 42,5 |
| 2 | M·06 | 37,5 |
| 3 | M·02 | 35,5 |
| 4 | M·04 | 33,5 |
| 5 | M·03 | 30,5 |
| 6 | M·05 | 29,5 |
| 7 | M·01 | 29,5 |

→ Le ranking est inchangé en tête (M·07 reste #1).

---

## 6 · Classement final

### 6.1 Le podium

| Rang | Méthode | Brut | Pondéré | Verdict synthétique |
|---|---|---|---|---|
| **1 ★** | **M·07 — Blocs PHP custom** | **30** | **37,5** | Le maximum sur tous les critères. **La voie pro 2026**. |
| **2** | M·06 — Gutenberg pur + core/html | 26 | 32,5 | Variante 100 % native de M·02. Indépendance maximum. |
| **3** | M·02 — Gutenberg + CSS perso | 24 | 30,5 | **La voie historique WPFormation**. Garde sa valeur pour les sites legacy. |

### 6.2 Le reste du classement

| Rang | Méthode | Brut | Pondéré | Verdict |
|---|---|---|---|---|
| 4 | M·01 — Gutenberg natif | 25 | 29,5 | Le baseline. Sans design. |
| 5 | M·04 — HTML multi-blocs | 22 | 28,5 | Compromis design libre + sections déplaçables. |
| 6 | M·03 — HTML monobloc | 19 | 25,5 | Design libre absolu. Inéditable pour non-tech. |
| 6 | M·05 — Spectra Pro | 20 | 25,5 | UI riche mais dépendance plugin payant. |

### 6.3 Verdict par cas d'usage

| Cas d'usage | Méthode recommandée | Pourquoi |
|---|---|---|
| Site marketing pro avec design system + rédacteurs non-techs | **M·07** | Design 100 % locké + édition champ par champ. Maintenable long-terme via Git. |
| Site indépendant, page one-off, pas de plugin | **M·06** | Pixel-conforme M·02 sans dépendance Spectra. |
| Site historique WPFormation (legacy) | M·02 | Setup éprouvé, équipe connaît Spectra meta. Garder pour les sites en place. |
| Formation WordPress débutants | M·01 | Pédagogie : pas de CSS, juste les blocs core. |
| **Refonte WPFormation 2026** | **M·07** | DNA exact Fabrice (PHP), versionnable Git, déployable cross-projets. |
| Landing one-shot pixel-perfect | M·03 | Design libre 100 % + figer définitivement. |
| Agence avec Spectra Pro licence | M·05 | Si l'agence paie déjà l'abonnement, UI Spectra Pro est confortable. |
| Site headless (Next.js / Astro / Eleventy) | **M·07** | `render.php` produit du HTML serveur propre, exposable via REST sans transformation. |

---

## 7 · Les 2 nouvelles méthodes S6 — récit détaillé

### 7.1 M·06 — La quête de l'indépendance plugin

**Question initiale (S5)** : « Si M·02 est si bien, pourquoi a-t-on besoin de Spectra ? Peut-on faire pareil sans aucun plugin ? »

**Démarche** :
1. Cloner le markup M·02 (vrais blocs Gutenberg natifs)
2. Récupérer le CSS Direction B (~130 KB)
3. Au lieu de pousser le CSS dans la meta Spectra, l'**embarquer dans un seul bloc `core/html`** placé en tête de page, contenant `<style>...</style>`

**Résultat** : page M·06 publiée à https://test.wpformation.com/methode-gutenberg-pur/. Pixel-conforme M·02. Spectra peut être désinstallé, le rendu reste identique.

**Trade-off** : `post_content` plus lourd (190 KB vs 100 KB pour M·02), mais **zéro plugin requis**.

**Apport éditorial pour l'article** : démontrer qu'il existe une voie 100 % WordPress natif qui atteint la qualité M·02. C'est le contre-argument à « il faut Spectra ».

### 7.2 M·07 — La découverte du `autoRegister` (PHP-only block registration) WP 7.0

**Question initiale (S5)** : « Comment créer un bloc Gutenberg avec une UI d'édition custom sans JavaScript, sans React, sans build ? »

**Constat historique (avant WP 7.0)** :
- ACF Pro : payant, dépendance externe
- React + wp-scripts : coût d'entrée élevé pour un dev PHP
- Anciens blocs PHP (`register_block_type` sans `block.json`) : UI d'édition pauvre voire inexistante

**WP 7.0 a livré le combo PHP-only block registration** (dev note Miguel Fonseca du 3 mars 2026, ticket Trac #64639) :
```json
{
  "apiVersion": 1,
  "supports": { "autoRegister": true },
  "render": "file:./render.php",
  "attributes": {
    "champ1": { "type": "string", "default": "..." }
  }
}
```

**Effet** : WordPress lit le `block.json`, voit `supports.autoRegister: true` au niveau du bloc, **génère automatiquement la sidebar d'édition** dans Gutenberg en dérivant le contrôle du `type` de chaque attribut (`string` → input texte, `boolean` → toggle, `number`/`integer` → number input, `string` + `enum` → select). Aucun flag à poser par attribut. Aucun flag `is_dynamic` — le bloc est dynamique du fait d'avoir un `render`.

**Démarche** :
1. POC à 1 bloc (S5) → ~17 min, fonctionnel
2. Extension à 11 blocs (S6) pour couvrir la maquette Direction B complète
3. Chaque bloc : 1 fichier `block.json` (déclaratif) + 1 fichier `render.php` (template serveur)
4. Plugin packagé en zip Unix-compat, uploadé via Playwright wp-admin, activé via MCP

**Résultat** : page M·07 publiée à https://test.wpformation.com/methode-blocs-php-custom/. Markup `post_content` = **11 lignes, 3 KB**. Tout le reste (design, structure, contenu par défaut) est dans le plugin.

**Apport éditorial pour l'article** : c'est **la nouveauté technique majeure** que l'article doit présenter. Le `autoRegister` (PHP-only block registration) ouvre un usage qui n'existait pas pour les développeurs PHP solo. La maquette finale est livrée en quelques heures, versionnée Git, et déployable cross-projets (WPFormation 2026, OGEEAT, LoginArmor, etc.).

---

## 8 · La passe « wow » sur M·07

Pour démontrer **jusqu'où on peut aller** en qualité visuelle sur la solution retenue, une couche d'effets CSS **Direction B Lab** a été ajoutée par-dessus le plugin `wpf-lab`, sans toucher au markup PHP.

### 8.1 Stratégie technique

- CSS scopé exclusivement à M·07 via `body.page-id-262`
- Injecté dans la meta Spectra `_uag_custom_page_level_css` (la voie d'Alexandra appliquée par-dessus du PHP custom)
- **Combinaison hybride** : le plugin gère la structure / le markup serveur, le page-CSS gère le polish visuel
- Respect strict de `prefers-reduced-motion` (toutes les animations désactivées si l'utilisateur le demande dans son OS)

### 8.2 Les effets ajoutés

| Zone | Effet |
|---|---|
| **Hero** | Animation gradient acid permanente sur le mot highlighted (`shimmer` 9s) + petit carré acid `pulse` en coin haut-droit (signature) + entrée `fade-up` séquencée des éléments (eyebrow → titre → lead → CTA row) |
| **Banner sticky** | Shimmer acid traversant la barre toutes les 8 secondes (effet « lumière qui passe ») |
| **Stats KPI** | Hover : la cellule s'assombrit, une ligne acid glisse en bas, le chiffre scale 1.06 + letter-spacing s'affine |
| **Pillars (4 piliers)** | Hover : élévation `translateY(-12px) scale(1.04)` + ombre violet `16px 16px 0` + glow `0 0 48px` + bande acid de 8px qui apparaît en bas + le nom glisse de 4px + le weight respire en letter-spacing 0.24em. Variante violet → ombre acid, variante acid → ombre violet (jeu de complémentaires) |
| **Methods table (7 lignes)** | Hover row standard : translation X de 6px, fond `#FAFAF6`, bande acid 4px à gauche, score num scale 1.12. **Row M·07 (featured)** : halo acid pulsé permanent (`m7-row-pulse 3.6s`) + couronne ★ violet circulaire (`star-spin` 6s rotation) en haut à droite — c'est la signature « solution retenue » |
| **Why pull-quote** | Hover : translateY(-4px) + double ombre `-8px 8px 0 acid` + glow acid |
| **Why capture frame** | Hover : rotation -0.6° + double ombre (12px 12px 0 acid + -4px -4px 0 violet) |
| **Why score bars** | Sweep de lumière permanent (`bar-sweep` 3s) |
| **Team cards (3)** | Hover : translateY(-8px) + rotation -0.4° + ombre 16px 16px 0 violet ; carte Claude → ombre acid. Avatar : scale 1.12 + rotate -6° + saturation +30 % |
| **Feature 2-col viz** | Hover : translation diagonale (-4px, -4px) + rotation -0.4° + ombre violet 14px 14px 0 |
| **Feature pros / cons** | Hover : translateY(-3px) + intensification du fond + ombre noire pros / violet cons |
| **CTA final boutons** | Bouton primaire : effet `swipe` lumineux qui traverse au hover + translation diagonale + ombre violet 12px 12px 0. Bouton ghost : translation + ombre acid 6px 6px 0 |
| **CTA final titre** | Le mot acid utilise un gradient text animé (`acid-text-shift` 6s) |

### 8.3 Détail technique des keyframes

Toutes les animations sont écrites en CSS pur (zéro JS). Easing principal : `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring naturel) pour les hovers, `cubic-bezier(0.22, 1, 0.36, 1)` (smooth) pour les transitions de durée plus longue.

### 8.4 Performance

- CSS total ajouté : **~17 KB** (concaténé au `footer-lab-shared.css` de base, total page-level = 29,7 KB)
- Aucune image ajoutée, aucun JS ajouté
- Toutes les animations sont GPU-accelerated (`transform`, `opacity` uniquement)
- `will-change: transform` placé sur les éléments à hover-lift pour les promouvoir en compositor layer

### 8.5 Accessibilité

```css
@media (prefers-reduced-motion: reduce) {
  body.page-id-262 *,
  body.page-id-262 *::before,
  body.page-id-262 *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Toutes les transformations hover-lift sont également désactivées en mode reduced-motion.

### 8.6 Mobile

Sur mobile (`max-width: 768px`), les hover-lifts sont désactivés (pas de pointeur précis sur touch). Seuls les éléments « signature » (carré acid hero, couronne ★ M·07) restent visibles, **redimensionnés** pour ne pas gêner le viewport.

### 8.7 Captures de validation

| Fichier | Description |
|---|---|
| `captures/m7-wow-final-desktop.png` | M·07 desktop full-page, état final |
| `captures/m7-wow-final-mobile.png` | M·07 mobile 375×812 |
| `captures/m7-wow-hero-rest.png` | Hero au repos (carré acid visible) |
| `captures/m7-wow-pillars-rest.png` | Pillars au repos (grille 2×2 acid/paper/violet/paper) |
| `captures/m7-wow-pillars-hover.png` | Pillar acid en hover (élévation + ombre violet + bande révélée) |
| `captures/m7-wow-methods-rest.png` | Tableau 7 méthodes au repos (M·07 featured + ★ violet) |
| `captures/m7-wow-methods-row-hover.png` | Row standard au hover (translation + bande acid) |
| `captures/m7-wow-team-hover.png` | Team card au hover (lift + rotation + ombre violet) |
| `captures/m7-wow-stats-hover.png` | KPI au hover (assombrissement + ligne acid + scale) |
| `captures/m7-wow-cta-btn-hover.png` | Bouton CTA au hover (swipe lumineux + translation) |

---

## 9 · Pourquoi M·07 gagne

Synthèse des arguments éditoriaux pour la nouvelle version de l'article :

### 9.1 Le combo gagnant

| Force | Score | Détail |
|---|---|---|
| **Éditabilité Gutenberg** | 5 / 5 | Sidebar auto-générée par WP 7.0, un champ par attribut, intuitive pour rédacteurs |
| **Qualité visuelle** | 5 / 5 | Design 100 % verrouillé dans le plugin, pas de drift possible |
| **Indépendance plugin** | 5 / 5 | Aucune dépendance tierce (le plugin custom est sous notre contrôle) |
| **Reproductibilité** | 5 / 5 | Zip + upload + activation = 1 minute. Même processus sur N sites |
| **Performance** | 5 / 5 | `post_content` ~3 KB par page (vs 190 KB pour M·06, 100 KB pour M·02) |
| **Maintenabilité** | 5 / 5 | 1 release plugin → N pages MAJ. Versionnable Git natif. |

### 9.2 Ce que M·07 résout que les autres ne résolvaient pas

1. **L'indépendance + le design pro en un seul package** : M·06 atteignait l'indépendance mais au prix d'un `post_content` lourd. M·02 atteignait le design mais avec Spectra. M·07 est **le seul à concilier les deux**.

2. **La MAJ cross-pages 1-shot** : avant M·07, modifier le design d'une banner = N pages à toucher (N opérations BDD). Avec M·07, modifier `wpf-lab/style.css` + bump version + upload = toutes les pages utilisant `<!-- wp:wpf/lab-banner /-->` sont MAJ.

3. **L'export headless** : `render.php` produit du HTML serveur **avant** d'être éventuellement consommé par un frontend Next.js / Astro. Pas de transformation `block-renderer.js`, pas de hydration React côté client. C'est compatible nativement.

4. **Le zéro JS** : aucune dépendance React, aucun build webpack, aucun JS chargé en page (sauf si on en ajoute volontairement pour des interactions front).

### 9.3 Pour qui ce n'est PAS adapté

- Sites où le rédacteur veut **réorganiser radicalement** les sections (pillars en haut, hero en bas) → trop figé
- Sites avec **un design différent par page** (chaque landing une identité) → le coût d'écriture de 11 blocs ne s'amortit pas
- Équipes **sans aucun dev PHP** → barrière à l'entrée
- Sites où **chaque section doit héberger du contenu rich-text long** → les attributs `string` ne sont pas optimisés pour ça (préférer alors un attribut `string` long + parsing markdown serveur)

### 9.4 La phrase à retenir pour l'article

> **« WordPress 7.0 a transformé l'écriture de blocs custom en exercice de PHP solo. Avec le `autoRegister` (PHP-only block registration), on livre un design system complet en 1 plugin, sans une ligne de JavaScript, versionné Git, déployable cross-projets. C'est la voie pro 2026. »**

---

## 10 · Anti-patterns et pièges techniques

À utiliser comme encarts pédagogiques dans l'article :

### 10.1 Le piège du `wp:html` pour cacher la non-éditabilité

Tentation de la session S3 : pour gagner du temps sur M·02, embarquer toute la maquette dans un seul `<!-- wp:html -->`. **C'est une triche détectable et inacceptable** : le rédacteur ouvre l'éditeur, voit du code à la place du contenu, ne peut rien modifier.

**Règle absolue** : M·02 doit être en **vrais blocs Gutenberg natifs** (`wp:heading`, `wp:paragraph`, `wp:columns`, `wp:buttons`, `wp:list`, `wp:cover`, `wp:table`, `wp:group`). Le CSS Direction B fait le design **par-dessus**, le markup reste éditable.

### 10.2 Le rate-limit Tiger Protect chez o2switch

Sur les hébergements o2switch avec Tiger Protect activé, les écritures REST API rapides déclenchent un HTTP 429 « Too Many Requests ». Solution éprouvée : **sleep 18 s entre les POST + retry 22 s × 12 boucles sur 429**.

```js
async function withRetry(fn, label) {
  for (let i = 0; i < 12; i++) {
    const r = await fn();
    if (r && r.status >= 200 && r.status < 300) return r;
    if (r && r.status === 429) {
      await sleep(22000);
      continue;
    }
    return r;
  }
}
```

### 10.3 Le `Cannot redeclare` PHP

Wrapper systématiquement les helpers PHP du plugin dans `if ( ! function_exists() )` pour éviter le « Cannot redeclare » si une autre extension déclare une fonction homonyme.

### 10.4 Le zip Windows / Unix-compat

Les zips créés avec PowerShell sur Windows utilisent les antislashes comme séparateurs internes, ce que `unzip` côté Linux / cPanel n'aime pas (résultat : structure cassée, plugin invisible). Solution : créer le zip avec un script Node qui utilise `archiver` (slashes forward natifs).

### 10.5 Caractères flèches `↗` `→` `↘` rendus en emoji color

Sur grands titres, Chromium remplace les flèches Unicode par leur version emoji color. Solution : ajouter le **variation selector U+FE0E** directement dans le markup (`↗︎`), ou utiliser un SVG inline.

### 10.6 Spectra qui bascule en Code Editor sous Playwright

Lors des tests automatisés Playwright sur Spectra Pro, l'éditeur basculait parfois en « Code Editor » au lieu de l'éditeur visuel — sans clic explicite. À noter dans l'article comme limitation Spectra Pro pour les workflows scriptés.

---

## 11 · URLs et ressources

### 11.1 Pages de démonstration live

| Méthode | URL | Page ID |
|---|---|---|
| HUB (page d'accueil) | https://test.wpformation.com/ | 225 |
| M·01 | https://test.wpformation.com/accueil-gutenberg-natif/ | 131 |
| M·02 | https://test.wpformation.com/methode-wpformation/ | 129 |
| M·03 | https://test.wpformation.com/methode-html-monobloc/ | 135 |
| M·04 | https://test.wpformation.com/methode-html-multiblocs/ | 137 |
| M·05 | https://test.wpformation.com/methode-spectra-pro/ | 133 |
| **M·06** | https://test.wpformation.com/methode-gutenberg-pur/ | 257 |
| **M·07** ★ | https://test.wpformation.com/methode-blocs-php-custom/ | 262 |

### 11.2 Article cible (à écrire)

| Champ | Valeur |
|---|---|
| URL | `https://wpformation.com/creer-page-wordpress-claude-code/` |
| Statut actuel | Publié avec 5 méthodes + mauvais vainqueur (M·02) |
| Cible | Mettre à jour avec 7 méthodes + nouveau vainqueur M·07 + section « passe wow » |

### 11.3 Captures clés

Toutes les captures sont dans `g:\CLAUDE-PROJETS\WPF-AI-LAB\captures\`.

**Captures finales (rendu page entier)** :
- `s6c-FINAL-HUB-desktop.png` + `-mobile.png`
- `s6c-FINAL-M1-desktop.png` à `s6c-FINAL-M7-desktop.png` (+ mobile)

**Captures M·07 avec couche wow** :
- `m7-wow-final-desktop.png` + `m7-wow-final-mobile.png`
- `m7-wow-{hero,banner,stats,pillars,methods,team,cta}-rest.png` (7 zones au repos)
- `m7-wow-{pillars,methods-row,team,stats,cta-btn}-hover.png` (5 hovers)

---

## 12 · Annexes techniques

### 12.1 Stack technique complète

```
- WordPress 7.0+
- Thème : Astra (free)
- Plugin Spectra (free) — requis pour M·02, M·04 (CSS page-level)
- Plugin Spectra Pro — requis pour M·05
- Plugin wpf-lab v1.1.0 — requis pour M·07 (custom, dans ce repo)
- Hébergeur : o2switch (Tiger Protect)
- Polices : Space Grotesk 700, JetBrains Mono 500 (Google Fonts)
```

### 12.2 Pattern WP 7.0 autoRegister (rappel)

**Pré-requis combinés** :

```json
{
  "apiVersion": 1,
  "supports": { "autoRegister": true },
  "render": "file:./render.php"
}
```

**Pour chaque attribut éditable, déclare simplement son `type`** — c'est tout :

```json
{
  "attributes": {
    "monChamp": {
      "type": "string",
      "default": "valeur par défaut"
    }
  }
}
```

Pas de flag par attribut. WordPress 7.0+ dérive le contrôle sidebar du `type` déclaré (`string` → input texte, `boolean` → toggle, `integer`/`number` → number input, `string` + `enum` → select).

**Boostrap PHP** (`wpf-lab.php`) :

```php
function wpf_lab_register_blocks() {
    $blocks = array(
        'lab-utility', 'lab-localnav', 'lab-banner', 'lab-hero',
        'lab-stats', 'lab-why', 'lab-pillars', 'lab-feature-twocol',
        'lab-methods-table', 'lab-team', 'lab-cta-final',
    );
    foreach ( $blocks as $slug ) {
        register_block_type( __DIR__ . '/blocks/' . $slug );
    }
}
add_action( 'init', 'wpf_lab_register_blocks' );

function wpf_lab_enqueue_style() {
    wp_enqueue_style(
        'wpf-lab',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        '1.1.0'
    );
}
add_action( 'wp_enqueue_scripts', 'wpf_lab_enqueue_style' );
```

### 12.3 Footer-lab-shared : la voie de partage CSS cross-pages

Pour harmoniser banner / menu / footer sur les 8 pages (HUB + M·01 à M·07), un fichier `footer-lab-shared.css` (~12,5 KB) est injecté en meta Spectra `_uag_custom_page_level_css` sur chaque page. Modifier ce fichier + push REST sur les 8 pages = 1 MAJ cross-pages.

**Sur M·07, ce CSS est complété par `wow-m7.css`** (la couche d'effets), concaténés et poussés ensemble dans la meta de la page 262.

### 12.4 Pipeline de déploiement S6

```bash
# 1. Footers (8 pages)
node scripts/generate-footers-s6c.js      # génère footer-lab-{HUB,M1..M7}.html

# 2. Push M·01 à M·05 (footers + CSS shared via Spectra meta)
node scripts/push-s4-octies-footers.js

# 3. Push HUB v3 (7 méthodes, M·07 featured)
node scripts/build-and-push-hub-v3.js

# 4. Push M·06 (clone M·02 + CSS dans core/html)
node scripts/build-and-push-m6-v3.js

# 5. Push M·07 (11 blocs PHP custom)
node scripts/push-m7-final.js

# 6. Menu Astra (8 items)
node scripts/s6c-rebuild-menu-astra.js

# 7. (Bonus) Passe wow M·07
node scripts/push-wow-m7.js
```

### 12.5 Liste exhaustive des fichiers produits en S6

**Plugin (réutilisable)** :
```
wpf-lab/
├── wpf-lab.php
├── style.css (1158 lignes)
└── blocks/lab-{utility,localnav,banner,hero,stats,why,pillars,
              feature-twocol,methods-table,team,cta-final}/
    ├── block.json
    └── render.php
```

**Scripts utilitaires** :
```
scripts/
├── make-zip-unix.js                  (zip Unix-compat cross-projets)
├── upload-wpf-lab-blocks-plugin.js   (upload Playwright wp-admin)
├── screenshot.js                      (captures desktop + mobile)
├── push-s4-octies-footers.js          (pipeline push M1-M5)
├── build-and-push-hub-v3.js           (pipeline HUB v3)
├── build-and-push-m6-v3.js            (pipeline M·06)
├── push-m7-final.js                   (pipeline M·07)
├── generate-footers-s6c.js            (générateur 8 footers depuis template)
├── s6c-patch-markups.js               (142 patches 5→7 + gagnant)
├── s6c-rebuild-menu-astra.js          (menu Astra 8 items)
├── push-wow-m7.js                     (S6 bonus : passe wow M·07)
├── capture-m7-wow-hovers.js           (captures zones M·07 rest+hover)
├── wow-m7.css                         (couche d'effets Direction B)
└── footer-lab-{shared.css, HUB.html, M1.html, ..., M7.html}
```

**Rapports + docs** :
```
docs/
├── matrice-evaluation.md
├── note-technique-pour-redacteur-wpformation-S6.md
└── ...

rapports/
├── matrice-finale-7-methodes-2026-05-21-S6.md
├── session-6-recap-2026-05-21.md
└── note-pour-redacteur-wpformation-S6-FINALE.md   ← CE FICHIER
```

---

## 13 · Trame éditoriale suggérée

Pour faciliter la réécriture de l'article. Le rédacteur peut s'en inspirer librement.

### Plan suggéré

1. **Intro (200-300 mots)**
   - Le constat : créer une page WordPress « pro » en 2026, c'est 7 façons et autant de compromis
   - Le test : maquette Direction B Lab rejouée 7 fois, scorée chiffré
   - Le verdict : un changement de leader en mai 2026 grâce à WP 7.0

2. **Méthodologie (300 mots)**
   - Section « Comment on a testé »
   - La grille 6 critères + pondération
   - Le scoring chiffré rend la comparaison non-subjective

3. **Les 7 méthodes en détail (400-600 mots par méthode = 2 800-4 200 mots)**
   - Pour chaque : pitch + technique + pour / contre + captures + score
   - Insister sur M·02 « la voie historique » (importante pour les lecteurs WPFormation existants)
   - Détailler M·07 avec un code sample minimal `block.json + render.php`

4. **Tableau récapitulatif (200 mots de commentaire + table)**
   - Le tableau 7 lignes × 6 critères
   - Lecture : seul M·07 obtient le maximum partout

5. **Le verdict (300-500 mots)**
   - M·07 gagne, M·06 prend la 2ᵉ, M·02 garde sa valeur en legacy
   - Verdict par cas d'usage (table « quel cas → quelle méthode »)

6. **Focus M·07 (500-800 mots)**
   - Le `autoRegister` (PHP-only block registration) expliqué
   - Code sample concret (1 bloc complet, block.json + render.php)
   - La couche « wow » CSS Direction B (mentionner les hovers, l'étoile pulsée, le shimmer)
   - Captures de la page live

7. **Pour qui c'est adapté / pas adapté (200-300 mots)**
   - Liste claire des cas d'usage où M·07 brille vs ceux où il faut préférer autre chose

8. **Anti-patterns et pièges (300-500 mots)**
   - 4-6 encarts pédagogiques basés sur §10 (le piège `wp:html`, le rate-limit Tiger Protect, le zip Windows, les flèches emoji, etc.)

9. **Conclusion + CTA (200 mots)**
   - La phrase à retenir
   - Lien vers le test live `test.wpformation.com`
   - CTA pour le repo `wpf-lab` si publié sur GitHub (Phase 3 prévue)

### Longueur cible

**3 000 à 5 000 mots**. C'est un article de fond, comparatif, technique. Pas un quick-read.

### Ton

- Direct, factuel, chiffré
- Honnêteté sur les inconvénients de chaque méthode (M·07 inclus)
- Premier rang à la personne qui transmet le test (« on a testé », « le verdict »)
- Pas d'emojis dans le corps (utiliser ★ et caractères Unicode uniquement)

### Visuels recommandés

- 1 screenshot par méthode (M·01 à M·07) en hero
- 1 capture de la table 7-méthodes (depuis `captures/m7-wow-methods-rest.png`)
- 1 capture du hover pillars (depuis `captures/m7-wow-pillars-hover.png`) — pour démontrer la couche « wow »
- 1 zoom code sample bloc M·07 (`block.json + render.php`)
- 1 capture du BO Gutenberg (sidebar `autoRegister` en action)

### Mots-clés SEO suggérés

- créer une page WordPress
- Claude Code WordPress
- bloc Gutenberg personnalisé
- autoRegister WordPress 7
- bloc PHP custom WordPress
- WordPress 2026
- alternative ACF Pro
- WordPress sans React
- Spectra vs blocs PHP
- Direction B Lab

---

## 14 · Checklist pour le rédacteur

- [ ] Lire ce document en entier (45-60 min)
- [ ] Consulter les 8 URLs live sur `test.wpformation.com` (5-10 min de browsing)
- [ ] Récupérer les captures clés depuis `captures/m7-wow-*.png` et `captures/s6c-FINAL-*.png`
- [ ] Confirmer le ton et la longueur cible avec Fabrice
- [ ] Rédiger un draft v1 (3 000-5 000 mots)
- [ ] Soumettre à Fabrice pour relecture
- [ ] Publier à l'URL `https://wpformation.com/creer-page-wordpress-claude-code/`

---

*EOF · Note pour le rédacteur WPFormation · S6 FINALE · 2026-05-21*

*Co-Authored-By: Claude Code (claude-opus-4-7) · WPF-AI-LAB project*
