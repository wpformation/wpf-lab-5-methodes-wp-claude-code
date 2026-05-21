# WPF Lab — Blocs Direction B

> **11 blocs Gutenberg PHP custom** pour WordPress 7.0+, écrits sans JavaScript et sans build, grâce au pattern **`autoGenerateControl`** (UI d'édition auto-générée par WP 7.0 depuis le schéma d'attributs du `block.json`).

**Version** : 1.1.0 · **Auteur** : Fabrice Ducarme — WPFormation · **Licence** : GPL-2.0-or-later · **WP requis** : 6.9+ · **PHP requis** : 7.4+

Ce plugin a été développé et battle-tested dans le cadre du projet [WPF-AI-LAB](https://github.com/wpformation/wpf-ai-lab) — un benchmark comparatif de 7 méthodes pour créer une page WordPress en 2026. Il y représente la **méthode M·07**, classée 1ʳᵉ au scoring final (30/30 brut, 37,5/37,5 pondéré).

Article complet du benchmark : <https://wpformation.com/creer-page-wordpress-claude-code/>

---

## Pourquoi ce plugin existe

WordPress 7.0 (janvier 2026) a introduit un combo de flags qui change la donne pour les développeurs PHP solo :

```json
{
  "apiVersion": 1,
  "supports": { "autoRegister": true },
  "is_dynamic": true,
  "render": "file:./render.php",
  "attributes": {
    "monChamp": {
      "type": "string",
      "default": "valeur par défaut",
      "autoGenerateControl": true
    }
  }
}
```

Effet : WordPress lit le `block.json`, voit `autoGenerateControl: true` sur chaque attribut, et **génère automatiquement la sidebar d'édition Gutenberg** — un input par attribut, type adapté à `type`. Le rendu front est piloté par `render.php` côté serveur. **Zéro React, zéro `edit.js`, zéro `save.js`, zéro `wp-scripts`, zéro build.**

Avant WP 7.0, écrire un bloc PHP custom avec UI complète demandait soit ACF Pro (payant, dépendance externe), soit React + wp-scripts (coût d'entrée élevé). Aujourd'hui, un dev PHP solo livre un design system complet en quelques heures.

---

## Liste des 11 blocs

| Bloc | Slug | Usage |
|---|---|---|
| Utility bar | `wpf/lab-utility` | Barre noire top-page (status, version, env) |
| Localnav | `wpf/lab-localnav` | Header brand + navigation locale dashed |
| Banner | `wpf/lab-banner` | Bandeau page courante sticky |
| Hero | `wpf/lab-hero` | Titre large + lead + 2 CTA + meta line |
| Stats | `wpf/lab-stats` | 4 KPI sur fond noir (1 cellule violet) |
| Why | `wpf/lab-why` | 2-col : argumentaire + pull-quote + capture frame + scores |
| Pillars | `wpf/lab-pillars` | 4 piliers d'évaluation en grille 2×2 (acid / paper / violet / paper) |
| Feature 2-col | `wpf/lab-feature-twocol` | Visuel code monospace + titre + body + pros/cons |
| Methods table | `wpf/lab-methods-table` | Tableau benchmark 7 méthodes scoré (contenu figé) |
| Team | `wpf/lab-team` | 3 cartes contributeurs (contenu figé) |
| CTA final | `wpf/lab-cta-final` | CTA pleine page sur fond noir, mots colorés acid/violet |

Tous les blocs partagent une feuille de style commune `style.css` (~30 KB, classes préfixées `.wpf-lab-*`).

---

## Installation

### Méthode 1 — Téléchargement zip (recommandée)

1. Télécharger le zip de la dernière release : [Releases](https://github.com/wpformation/wpf-lab/releases)
2. WP Admin → Extensions → Ajouter → Téléverser une extension → choisir le zip
3. Activer

### Méthode 2 — Clone Git dans `wp-content/plugins/`

```bash
cd wp-content/plugins/
git clone https://github.com/wpformation/wpf-lab.git
```

Puis activer le plugin depuis WP Admin → Extensions.

### Méthode 3 — Composer (avenir, pas encore packagé)

```bash
composer require wpformation/wpf-lab
```

---

## Utilisation

Une fois le plugin activé, les 11 blocs apparaissent dans Gutenberg sous la catégorie « widgets » (filtrer par `lab`).

### Insertion via l'éditeur Gutenberg

Ajouter un nouveau bloc → rechercher « Lab » → choisir le bloc voulu. Chaque champ est éditable depuis la sidebar de droite (auto-générée par WP 7.0).

### Insertion programmatique (REST API ou fichier .html)

Le markup minimum d'un bloc, sans surcharge d'attributs :

```html
<!-- wp:wpf/lab-hero /-->
```

C'est tout. Le bloc utilisera tous les `default` déclarés dans son `block.json`.

Pour surcharger un attribut :

```html
<!-- wp:wpf/lab-hero {"titleHighlight":"mon site","lead":"Mon lead personnalisé."} /-->
```

### Exemple d'empilement complet (10 sections Direction B Lab)

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
```

`post_content` total = ~3 KB. Tout le design est dans le plugin (versionné Git).

---

## Architecture

```
wpf-lab/
├── wpf-lab.php          # Bootstrap — register_block_type() en boucle sur les 11 blocs
├── style.css            # Feuille de style partagée — classes .wpf-lab-* préfixées
├── README.md
├── LICENSE
└── blocks/
    ├── lab-utility/
    │   ├── block.json   # Déclaration attributs avec autoGenerateControl
    │   └── render.php   # Template serveur (PHP pur)
    ├── lab-localnav/
    │   ├── block.json
    │   └── render.php
    ├── ... (idem pour les 11 blocs)
    └── lab-cta-final/
        ├── block.json
        └── render.php
```

### Le pattern d'un bloc minimal

`blocks/lab-hero/block.json` :

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 1,
  "name": "wpf/lab-hero",
  "title": "Lab — Hero",
  "category": "widgets",
  "supports": {
    "autoRegister": true,
    "align": ["full"]
  },
  "attributes": {
    "titleHighlight": {
      "type": "string",
      "label": "Titre — mot surligné (acid)",
      "default": "blocs PHP",
      "autoGenerateControl": true
    }
  },
  "render": "file:./render.php",
  "style": "wpf-lab-blocks-style"
}
```

`blocks/lab-hero/render.php` :

```php
<?php
$titleHighlight = $attributes['titleHighlight'] ?? 'blocs PHP';
?>
<section class="wpf-lab-hero">
  <h1 class="wpf-lab-hero__title">
    <span class="wpf-lab-hero__title-hl"><?php echo esc_html( $titleHighlight ); ?></span>
  </h1>
</section>
```

C'est tout. WP gère la registration, l'UI d'édition, et l'enqueue du CSS.

---

## Design Direction B Lab

Le design embarqué dans le plugin suit la palette **Direction B Lab** :

| Token | Valeur | Usage |
|---|---|---|
| `--b-bg` (bone) | `#EDECE7` | Fond principal |
| `--b-paper` | `#FFFFFF` | Cartes blanches |
| `--b-ink` | `#0A0A0A` | Texte principal, fonds noirs |
| `--b-ink-2` | `#2A2A2A` | Texte secondaire |
| `--b-ink-3` | `#6E6E6E` | Texte tertiaire / monospace metadata |
| `--b-acid` | `#D7FF3A` | Accent principal (highlights, CTA, success) |
| `--b-violet` | `#6F4BFF` | Accent secondaire (titres tags, ombres) |

| Police | Usage |
|---|---|
| `Space Grotesk` 400–700 | Titres, body, CTA |
| `JetBrains Mono` 400–600 | Eyebrows, KPI labels, technical metadata |

Les polices sont chargées via `@import` Google Fonts en tête de `style.css`. Si tu veux les self-hoster, supprime les `@import` et déclare-les via `wp_enqueue_style()` dans `wpf-lab.php`.

---

## Personnalisation

### Surcharger le CSS

Ne pas modifier `style.css` directement (sera écrasé à la mise à jour). À la place, dans le `style.css` de ton thème enfant :

```css
/* Exemple : changer la couleur acid */
.wpf-lab-hero,
.wpf-lab-feature,
.wpf-lab-cta {
  --b-acid: #B8E62A; /* ta couleur */
}
```

### Surcharger un render.php

Tu peux dupliquer un dossier `blocks/lab-XXX/` dans ton thème ou un plugin enfant et faire pointer un autre `register_block_type()` dessus. Documentation détaillée dans le wiki à venir.

### Étendre avec tes propres blocs

Le plugin est conçu pour servir de **squelette de design system**. Ajouter un bloc :

1. Créer `blocks/mon-bloc/block.json` avec `apiVersion: 1`, `supports.autoRegister: true`, `is_dynamic: true`, `autoGenerateControl: true` sur chaque attribut éditable
2. Créer `blocks/mon-bloc/render.php`
3. Ajouter `'mon-bloc'` dans le tableau `$blocks` de `wpf-lab.php`
4. Ajouter les styles `.wpf-lab-mon-bloc` dans `style.css`

---

## Limites connues

1. **WordPress 7.0+ requis** : le combo `autoGenerateControl + autoRegister + is_dynamic` n'existe pas avant.
2. **Contenu figé pour 2 blocs** : `lab-methods-table` et `lab-team` ont leur contenu interne hard-codé dans `render.php` (7 méthodes scorées et 3 contributeurs, c'est le contenu du benchmark WPF-AI-LAB). Pour un usage cross-site, **fork le plugin et adapte ces 2 render.php** à ton contenu, ou crée des attributs JSON `repeater`.
3. **Polices Google Fonts via `@import`** : pas RGPD-friendly par défaut. Self-hoster pour la prod.
4. **Pas encore traduit** : `Text Domain: wpf-lab-blocks` déclaré mais pas de `.pot/.po` fournis. Pull request bienvenue.

---

## Roadmap

- [ ] Self-host des polices (Space Grotesk + JetBrains Mono) en assets locaux
- [ ] Pattern repeater pour `lab-methods-table` (lignes éditables)
- [ ] Pattern repeater pour `lab-team` (cartes éditables)
- [ ] Traductions FR + EN (.pot, fr_FR.po, en_US.po)
- [ ] Build cross-browser test (Safari 17+, Firefox 130+, Chromium 121+)
- [ ] Publier sur WordPress.org / WP plugin directory
- [ ] Variation `Direction A` (palette claire éditoriale) et `Direction C` (sombre)

---

## Crédits et remerciements

- **Conception et benchmark** : Fabrice Ducarme — [WPFormation](https://wpformation.com)
- **Co-développement** : Claude Code (Anthropic, modèle Opus 4.7)
- **Pattern `autoGenerateControl`** : équipe Core AI WordPress (livré en WP 7.0, janvier 2026)
- **Inspiration design Direction B** : tradition brutalist-éditoriale (Werkplaats Typografie, mschf, etc.)

---

## Licence

GPL-2.0-or-later — voir [LICENSE](LICENSE).

Compatible WordPress (WP est GPL-v2 ; tout plugin distribué doit être GPL-compatible).

---

## Liens

- **Repo** : <https://github.com/wpformation/wpf-lab>
- **Issues** : <https://github.com/wpformation/wpf-lab/issues>
- **Article benchmark complet** : <https://wpformation.com/creer-page-wordpress-claude-code/>
- **Site de démo live** (méthode M·07) : <https://test.wpformation.com/methode-blocs-php-custom/>
- **Repo du benchmark WPF-AI-LAB** : <https://github.com/wpformation/wpf-ai-lab> *(en projet)*
