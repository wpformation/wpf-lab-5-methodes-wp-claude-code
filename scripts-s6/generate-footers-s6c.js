#!/usr/bin/env node
/*
 * S6c — Génère les 8 footers (HUB + M1-M7) avec :
 *   - 7 entrées de méthodes au lieu de 5
 *   - URL article correcte : https://wpformation.com/creer-page-wordpress-claude-code/
 *   - ★ migré de M·02 vers M·07 (nouveau gagnant)
 *   - pitch "Sept méthodes testées"
 *   - is-current sur la page courante
 *   - mention M·XX dans le bandeau bas
 */
const fs = require('fs');
const path = require('path');

const ARTICLE_URL = 'https://wpformation.com/creer-page-wordpress-claude-code/';

const PAGES = [
  { key: 'HUB', current: 'HUB',  slug_currentLi: '/',                                  bottomLabel: 'HUB INDEX',          bottomNum: '/' },
  { key: 'M1',  current: 'M·01', slug_currentLi: '/accueil-gutenberg-natif/',          bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·01' },
  { key: 'M2',  current: 'M·02', slug_currentLi: '/methode-wpformation/',              bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·02' },
  { key: 'M3',  current: 'M·03', slug_currentLi: '/methode-html-monobloc/',            bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·03' },
  { key: 'M4',  current: 'M·04', slug_currentLi: '/methode-html-multiblocs/',          bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·04' },
  { key: 'M5',  current: 'M·05', slug_currentLi: '/methode-spectra-pro/',              bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·05' },
  { key: 'M6',  current: 'M·06', slug_currentLi: '/methode-gutenberg-pur/',            bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·06' },
  { key: 'M7',  current: 'M·07', slug_currentLi: '/methode-blocs-php-custom/',         bottomLabel: 'PAGE COURANTE',      bottomNum: 'M·07' },
];

const METHODS = [
  { num: '01', label: 'Gutenberg natif',              url: '/accueil-gutenberg-natif/' },
  { num: '02', label: 'Gutenberg + CSS',              url: '/methode-wpformation/' },
  { num: '03', label: 'HTML monobloc',                url: '/methode-html-monobloc/' },
  { num: '04', label: 'HTML multi-blocs',             url: '/methode-html-multiblocs/' },
  { num: '05', label: 'Spectra Pro',                  url: '/methode-spectra-pro/' },
  { num: '06', label: 'Gutenberg pur',                url: '/methode-gutenberg-pur/' },
  { num: '07', label: 'Blocs PHP custom ★',           url: '/methode-blocs-php-custom/' }, // ★ nouveau gagnant
];

const HUB_HREF = '/';

function buildFooter(page) {
  // Construire la liste des 7 méthodes + HUB index, avec is-current sur la bonne entrée
  const items = [];

  // HUB index en tête (toujours)
  if ( page.current === 'HUB' ) {
    items.push(`          <li class="is-current"><a href="${HUB_HREF}">↳ HUB · Index</a></li>`);
  } else {
    items.push(`          <li><a href="${HUB_HREF}">↳ HUB · Index</a></li>`);
  }

  // Les 7 méthodes
  for ( const m of METHODS ) {
    const isCurrent = ( page.current === `M·${m.num}` );
    const liClass = isCurrent ? ' class="is-current"' : '';
    items.push(`          <li${liClass}><a href="${m.url}">${m.num} · ${m.label}</a></li>`);
  }

  const fullbleed = ( page.key === 'HUB' ) ? ' is-fullbleed' : '';

  return `<!-- wp:html -->
<footer class="lab-footer${fullbleed}">
  <div class="lab-footer-inner">
    <div class="lab-footer-grid">

      <div class="lab-footer-col lab-footer-brand-col">
        <h3 class="lab-footer-brand">wpformation<span class="sep">/</span><span class="lab">lab</span></h3>
        <p class="lab-footer-est">EST. 2006 · v2026.05 · BUILT IN PARIS</p>
        <p class="lab-footer-pitch">Lab d'expérimentation IA × WordPress. Sept méthodes testées, scorées, publiées en open-source.</p>
        <div class="lab-footer-social">
          <span>TW</span><span>GH</span><span>RSS</span><span>✉</span>
        </div>
      </div>

      <div class="lab-footer-col">
        <p class="lab-footer-col-title">WPFORMATION</p>
        <ul>
          <li><a href="https://wpformation.com">Accueil</a></li>
          <li><a href="https://wpformation.com/formations">Formations</a></li>
          <li><a href="https://wpformation.com/blog">Blog</a></li>
          <li><a href="https://wpformation.com/contact">Contact</a></li>
        </ul>
      </div>

      <div class="lab-footer-col">
        <p class="lab-footer-col-title">LES 7 MÉTHODES</p>
        <ul>
${items.join('\n')}
        </ul>
      </div>

      <div class="lab-footer-col">
        <p class="lab-footer-col-title">RESSOURCES</p>
        <ul>
          <li><a href="${ARTICLE_URL}">Article complet ↗︎</a></li>
          <li><a href="https://github.com/wpformation">GitHub WPF-AI-LAB</a></li>
          <li><a href="https://wpformation.com/blog">Blog technique</a></li>
          <li><a href="https://wpformation.com/contact">Nous contacter</a></li>
        </ul>
      </div>

    </div>

    <div class="lab-footer-bottom">
      <p>© 2026 · Lab WPFormation × Claude Code · Direction B Lab</p>
      <p class="lab-footer-current">${page.bottomLabel} <span class="num">${page.bottomNum}</span></p>
      <p class="lab-footer-eof">EOF · 2026.05.21 · BUILT WITH CLAUDE_CODE</p>
    </div>

  </div>
</footer>
<!-- /wp:html -->
`;
}

const scriptsDir = __dirname;
for ( const p of PAGES ) {
  const file = path.join(scriptsDir, `footer-lab-${p.key}.html`);
  const content = buildFooter(p);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`  Wrote ${file} (${content.length} chars)`);
}
console.log('Done — 8 footers regenerated for S6c.');
