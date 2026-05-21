#!/usr/bin/env node
/*
 * S6 Bloc C — Build et push HUB v3 (7 méthodes au lieu de 5).
 *
 * Stratégie :
 *   - Patche le markup HUB v2 existant (banner, hero, marquee, intro, methodes head)
 *     pour passer de "5 méthodes" à "7 méthodes" (textes + chiffres + déco).
 *   - Ajoute 2 encarts M·06 + M·07 dans .hub-cards-list après M·05.
 *   - Réutilise le CSS HUB v2 (avec __PAGE_ID__ substitué) — la grid supporte N encarts.
 *   - Remplace le footer S4-OCTIES par un footer 7 méthodes (current = HUB).
 *   - Concatène footer-lab-shared en meta CSS.
 *   - Rate-limit Tiger Protect.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const creds = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'credentials.json'), 'utf8')).wp_test;
const base = creds.site_url.replace(/\/$/, '');
const auth = 'Basic ' + Buffer.from(creds.admin_user + ':' + creds.app_password).toString('base64');

const HUB_PAGE_ID = 225;

function req(method, fullUrl, payload) {
  return new Promise((resolve, reject) => {
    const u = new URL(fullUrl);
    const body = payload ? JSON.stringify(payload) : null;
    const headers = { Authorization: auth, Accept: 'application/json' };
    if (body) { headers['Content-Type'] = 'application/json'; headers['Content-Length'] = Buffer.byteLength(body); }
    const r = https.request({ method, hostname: u.hostname, port: 443, path: u.pathname + (u.search || ''), headers },
      (res) => { const cs = []; res.on('data', c => cs.push(c)); res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(cs).toString('utf8') })); });
    r.on('error', reject); if (body) r.write(body); r.end();
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function withRetry(fn, label) {
  for (let i = 0; i < 12; i++) {
    const r = await fn();
    if (r && r.status >= 200 && r.status < 300) return r;
    if (r && r.status === 429) { console.log(`  ${label} 429 try ${i+1} — sleep 22s`); await sleep(22000); continue; }
    console.log(`FAIL ${label} HTTP ${r ? r.status : 'null'} body=${r ? r.body.slice(0,500) : 'n/a'}`);
    return r;
  }
}

(async () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('S6 Bloc C — Build et push HUB v3 (7 méthodes)');
  console.log('═══════════════════════════════════════════════════════════');

  // === 1. Lire le markup v2 et patcher ===
  let markup = fs.readFileSync(path.resolve(__dirname, 'page-0-homepage-hub-v2.html'), 'utf8');

  // Patches textuels
  const replaces = [
    // Banner
    ['Benchmark · 5 façons de builder WordPress en 2026', 'Benchmark · 7 façons de builder WordPress en 2026'],
    // Hero deck
    ['On en a construit <strong>cinq</strong>.', 'On en a construit <strong>sept</strong>.'],
    ['avec cinq méthodes radicalement différentes',  'avec sept méthodes radicalement différentes'],
    ['du Gutenberg pur jusqu\'au HTML brut, en passant par le plugin UI Spectra', 'du Gutenberg pur jusqu\'au plugin de blocs PHP custom, en passant par le HTML brut et Spectra Pro'],
    // Hero meta cells
    ['<p class="hm-v">5</p>\n          <p class="hm-k"></p>', '<p class="hm-v">7</p>'],
    ['<p class="hm-k">MÉTHODES</p>\n          <p class="hm-v">5</p>', '<p class="hm-k">MÉTHODES</p>\n          <p class="hm-v">7</p>'],
    ['<a class="hub-jump" href="#methodes">↓ Voir les 5 démos</a>', '<a class="hub-jump" href="#methodes">↓ Voir les 7 démos</a>'],
    // Marquee
    ['<span class="mqe">5 MÉTHODES</span>', '<span class="mqe">7 MÉTHODES</span>'],
    // Intro left deck
    ['<p class="his-num">5</p>\n            <p class="his-label">méthodes<br>testées</p>', '<p class="his-num">7</p>\n            <p class="his-label">méthodes<br>testées</p>'],
    // Pull quote
    ['On a construit la <span class="hl-acid">même page</span> cinq fois.', 'On a construit la <span class="hl-acid">même page</span> sept fois.'],
    // Intro right prose
    ['on a construit la même page cinq fois', 'on a construit la même page sept fois'],
    ['avec les cinq méthodes', 'avec les sept méthodes'],
    ['<a href="#methodes" class="hub-intro-arrow">↓ Sauter aux 5 démos</a>', '<a href="#methodes" class="hub-intro-arrow">↓ Sauter aux 7 démos</a>'],
    // Section méthodes head
    ['<p class="hub-section-eyebrow">// 02.démos · 5 builds live · cliquables</p>', '<p class="hub-section-eyebrow">// 02.démos · 7 builds live · cliquables</p>'],
    ['<h2 class="hub-section-title">Les <span class="hl-acid">5 méthodes</span><br>en compétition.</h2>', '<h2 class="hub-section-title">Les <span class="hl-acid">7 méthodes</span><br>en compétition.</h2>'],
    ['<p class="hub-section-lede">Cinq pages. Une seule structure éditoriale. Cinq techniques de build. Ouvrez celles que vous voulez comparer.</p>', '<p class="hub-section-lede">Sept pages. Une seule structure éditoriale. Sept techniques de build. Ouvrez celles que vous voulez comparer.</p>'],
  ];
  let patchHits = 0;
  for ( const [from, to] of replaces ) {
    if ( markup.includes(from) ) { markup = markup.replace(from, to); patchHits++; }
  }
  console.log(`  Patches text OK : ${patchHits} / ${replaces.length}`);

  // === 2. Ajouter 2 encarts M·06 + M·07 après M·05 ===
  const m05End = '</a>\n\n    </div>\n  </section>';
  const newEncarts = `</a>

      <!-- ENCART 06 — Gutenberg pur + CSS dans core/html (S6) -->
      <a class="hub-encart" href="/methode-gutenberg-pur/">
        <div class="hub-encart-left">
          <p class="hub-encart-num">M · 06</p>
          <p class="hub-encart-slug">methode-gutenberg-pur</p>
        </div>
        <div class="hub-encart-mid">
          <h3 class="hub-encart-name">Gutenberg pur + CSS dans core/html</h3>
          <p class="hub-encart-tag">100 % core · 1 seul bloc core/html style · 0 plugin</p>
          <p class="hub-encart-blurb">Variante 100 % native de la voie d'Alexandra : blocs <code>core/*</code> exclusivement, le CSS sur-mesure est embarqué dans <strong>un seul bloc <code>core/html</code></strong> en tête de page, pas en meta Spectra. Édition Gutenberg native sur tout le contenu textuel. <em>Indépendance maximale, content auto-suffisant.</em></p>
          <ul class="hub-encart-perks">
            <li>Aucun plugin tiers</li>
            <li>CSS visible et éditable depuis l'admin</li>
            <li>Content portable (export = page complète)</li>
          </ul>
        </div>
        <div class="hub-encart-right">
          <p class="hub-encart-score"><span class="num">5.0</span><span class="max">/5</span></p>
          <p class="hub-encart-cta">voir la démo ↗︎</p>
        </div>
      </a>

      <!-- ENCART 07 — Blocs PHP custom (S6, ★ co-featured) -->
      <a class="hub-encart hub-encart--featured" href="/methode-blocs-php-custom/">
        <span class="hub-encart-pill">★ LA NOUVELLE · BLOCS PHP NATIFS WP 7.0</span>
        <div class="hub-encart-left">
          <p class="hub-encart-num">M · 07</p>
          <p class="hub-encart-slug">methode-blocs-php-custom</p>
        </div>
        <div class="hub-encart-mid">
          <h3 class="hub-encart-name">Blocs PHP custom (autoGenerateControl WP 7.0)</h3>
          <p class="hub-encart-tag">Plugin wpf-lab · 11 blocs PHP · 0 JS · 0 build · 0 ACF</p>
          <p class="hub-encart-blurb">Plugin custom <code>wpf-lab</code> embarquant 11 blocs Gutenberg en pur PHP. Chaque attribut <code>autoGenerateControl: true</code> du <code>block.json</code> génère automatiquement la commande UI dans le panel WP — sans une ligne de JavaScript ni de build. Design <strong>100 % locké</strong>, édition <strong>non-destructive</strong>. <em>La voie pro pour design system + rédacteurs non-techs.</em></p>
          <ul class="hub-encart-perks">
            <li>Design 100 % verrouillé dans le plugin</li>
            <li>Édition non-destructive (champs typés)</li>
            <li>Versionnable Git, headless-ready</li>
          </ul>
        </div>
        <div class="hub-encart-right">
          <p class="hub-encart-score"><span class="num">5.0</span><span class="max">/5</span></p>
          <p class="hub-encart-cta">voir la démo ↗︎</p>
        </div>
      </a>

    </div>
  </section>`;

  if ( markup.includes(m05End) ) {
    markup = markup.replace(m05End, newEncarts);
    console.log(`  Insertion 2 encarts M·06 + M·07 OK`);
  } else {
    console.log(`  ⚠ Insertion encarts FAILED (pattern m05End not found, vérifier)`);
  }

  // === 3. Remplacer le footer S4-OCTIES (ou S6 précédent) par footer-lab-HUB.html ===
  const footerHubInner = fs.readFileSync(path.resolve(__dirname, 'footer-lab-HUB.html'), 'utf8');
  const footerHub = `<!-- S6 FOOTER LAB HUB START -->
${footerHubInner}
<!-- S6 FOOTER LAB HUB END -->`;
  // Strip ancien footer S4-OCTIES OU S6 précédent
  markup = markup.replace(/<!--\s*S4-OCTIES FOOTER LAB START\s*-->[\s\S]*?<!--\s*S4-OCTIES FOOTER LAB END\s*-->/m, '');
  markup = markup.replace(/<!--\s*S6 FOOTER LAB HUB START\s*-->[\s\S]*?<!--\s*S6 FOOTER LAB HUB END\s*-->/m, '');
  markup = markup.trimEnd() + '\n\n' + footerHub + '\n';
  console.log(`  Footer HUB inject OK`);

  // === 4. Sauvegarder le markup pour git history ===
  const outPath = path.resolve(__dirname, 'page-0-homepage-hub-v3.html');
  fs.writeFileSync(outPath, markup, 'utf8');
  console.log(`  Saved → ${outPath} (${markup.length} chars)`);

  // === 5. Préparer le CSS = HUB v2 (avec __PAGE_ID__) + footer-lab-shared ===
  let hubCss = fs.readFileSync(path.resolve(__dirname, 'page-0-homepage-hub-v2.css'), 'utf8');
  hubCss = hubCss.replace(/__PAGE_ID__/g, String(HUB_PAGE_ID));
  const sharedCss = fs.readFileSync(path.resolve(__dirname, 'footer-lab-shared.css'), 'utf8');
  const fullCss = hubCss + '\n\n/* ====== FOOTER LAB SHARED (banner + Astra normalize + footer) ====== */\n' + sharedCss;
  console.log(`  CSS final : ${fullCss.length} chars`);

  // === 6. Push markup ===
  console.log(`\n  > Push markup → page ${HUB_PAGE_ID}`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${HUB_PAGE_ID}`, {
    content: markup
  }), 'HUB markup');
  await sleep(18000);

  // === 7. Push CSS meta ===
  console.log(`  > Push CSS meta → page ${HUB_PAGE_ID}`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${HUB_PAGE_ID}`, {
    meta: { '_uag_custom_page_level_css': fullCss }
  }), 'HUB css');
  await sleep(18000);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Done. Page ${HUB_PAGE_ID} = HUB v3`);
  console.log(`URL  : ${base}/`);
  console.log(`Edit : ${base}/wp-admin/post.php?post=${HUB_PAGE_ID}&action=edit`);
  console.log('═══════════════════════════════════════════════════════════');
})().catch(e => { console.error('ERROR:', e); process.exit(1); });
