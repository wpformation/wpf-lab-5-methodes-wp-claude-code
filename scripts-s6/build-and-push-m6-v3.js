#!/usr/bin/env node
/*
 * S6 Bloc A — Build et push M6 v3 (10 sections Direction B Lab).
 *
 * Stratégie :
 *   - Clone le markup M2 v3 (déjà 10 sections vrais blocs Gutenberg natifs validés S4)
 *   - Adapte le banner pour M6 (pas is-featured, "MÉTHODE 06 · Gutenberg pur + CSS dans core/html")
 *   - Embarque tout le CSS (M2 v2 réutilisé + footer-lab-shared) dans 1 SEUL bloc core/html <style> en TÊTE
 *     — c'est l'essence distinctive de M6 : CSS dans content, pas en meta Spectra ni en fichier plugin
 *   - Re-scope CSS body.page-id-129 → body.page-id-257
 *   - Append footer-lab-M6.html (current = M·06, 7 méthodes listées)
 *   - Change slug → methode-gutenberg-pur, titre → "Méthode 6 · Gutenberg pur + CSS dans core/html"
 *   - Astra meta full-width
 *   - Rate-limit Tiger Protect : sleep 18s entre POST + retry boucle 429 (22s × 12 max)
 *
 * Page cible : id=257 (réutilisée, slug renommé). 253 sera trashée séparément.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const creds = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'credentials.json'), 'utf8')).wp_test;
const base = creds.site_url.replace(/\/$/, '');
const auth = 'Basic ' + Buffer.from(creds.admin_user + ':' + creds.app_password).toString('base64');

const M6_PAGE_ID = 257;
const M6_SLUG = 'methode-gutenberg-pur';
const M6_TITLE = 'Méthode 6 · Gutenberg pur + CSS dans core/html';

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
  console.log('S6 Bloc A — Build et push M6 v3 (10 sections Direction B Lab)');
  console.log('═══════════════════════════════════════════════════════════');

  // === 1. Préparer le CSS (re-scope page-id-129 → page-id-257 + concaténer footer-lab-shared) ===
  let m2css = fs.readFileSync(path.resolve(__dirname, 'page-2-methode-wpformation-v2.css'), 'utf8');
  m2css = m2css.replace(/body\.page-id-129/g, `body.page-id-${M6_PAGE_ID}`);
  // Header de remplacement
  m2css = m2css.replace(/^\/\*[\s\S]*?\*\//, `/* ============================================================================
   M6 — Gutenberg pur + CSS dans core/html (S6 — 2026.05.21)
   CSS adapté de M2 v2 + footer-lab-shared, embarqué dans 1 SEUL core/html <style>.
   Scope : body.page-id-${M6_PAGE_ID}
   Particularité M6 : aucun stockage CSS en meta, le content de la page transporte tout.
   ============================================================================ */`);

  const sharedCss = fs.readFileSync(path.resolve(__dirname, 'footer-lab-shared.css'), 'utf8');
  const fullCss = m2css + '\n\n/* ============== FOOTER LAB SHARED (banner + Astra normalize + footer) ============== */\n' + sharedCss;
  console.log(`  CSS final : ${fullCss.length} chars (${(fullCss.length / 1024).toFixed(1)} KB)`);

  // === 2. Préparer le markup ===
  let markup = fs.readFileSync(path.resolve(__dirname, 'page-2-methode-wpformation-v3.html'), 'utf8');

  // 2a. Retirer l'éventuel ancien footer S4-OCTIES injecté
  markup = markup.replace(/<!--\s*S4-OCTIES FOOTER LAB START\s*-->[\s\S]*?<!--\s*S4-OCTIES FOOTER LAB END\s*-->\s*/g, '');
  // 2b. Retirer le commentaire "Footer Lab supprimé S4-bis"
  markup = markup.replace(/<!--\s*Footer Lab supprimé.*?-->\s*/g, '');

  // 2c. Adapter le banner pour M6 (cherche sec-method-banner avec ou sans is-featured)
  // Le banner M2 actuel (après s6c-patch) : sec-method-banner SIMPLE + "MÉTHODE 02" + "VOIE HISTORIQUE"
  markup = markup.replace(
    /<!-- wp:group \{"className":"sec-method-banner(?: is-featured)?"\} -->[\s\S]*?<!-- \/wp:group -->/m,
    `<!-- wp:group {"className":"sec-method-banner"} -->
<div class="wp-block-group sec-method-banner">
  <!-- wp:paragraph {"className":"banner-prefix"} --><p class="banner-prefix">VOUS CONSULTEZ ·</p><!-- /wp:paragraph -->
  <!-- wp:paragraph {"className":"banner-num"} --><p class="banner-num">MÉTHODE 06</p><!-- /wp:paragraph -->
  <!-- wp:paragraph {"className":"banner-name"} --><p class="banner-name">Gutenberg pur + CSS dans core/html</p><!-- /wp:paragraph -->
  <!-- wp:paragraph {"className":"banner-tag"} --><p class="banner-tag">100% NATIF</p><!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`
  );

  // === 3. Prepend bloc core/html <style> en TÊTE (essence M6) ===
  const stylePrelude = `<!-- wp:html -->
<style id="m6-page-style">
${fullCss}
</style>
<!-- /wp:html -->

`;
  markup = stylePrelude + markup.trimStart();

  // === 4. Append footer-lab-M6 ===
  const footerM6 = fs.readFileSync(path.resolve(__dirname, 'footer-lab-M6.html'), 'utf8');
  markup = markup.trimEnd() + '\n\n<!-- S6 FOOTER LAB M6 START -->\n' + footerM6 + '\n<!-- S6 FOOTER LAB M6 END -->\n';

  console.log(`  Markup final : ${markup.length} chars (${(markup.length / 1024).toFixed(1)} KB)`);

  // === 5. Sauvegarder le markup pour reference + git history ===
  const outPath = path.resolve(__dirname, 'page-m6-natif-v3.html');
  fs.writeFileSync(outPath, markup, 'utf8');
  console.log(`  Saved → ${outPath}`);

  // === 6. PUSH : title + slug + content ===
  console.log(`\n  > Push title + slug + content → page ${M6_PAGE_ID}`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${M6_PAGE_ID}`, {
    title: M6_TITLE,
    slug: M6_SLUG,
    content: markup,
    status: 'publish'
  }), 'M6 title+slug+content');
  await sleep(18000);

  // === 7. PUSH : Astra meta full-width + retirer meta CSS Spectra (pour rester pur M6) ===
  console.log(`  > Push Astra meta full-width + clear meta Spectra CSS`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${M6_PAGE_ID}`, {
    meta: {
      'ast-site-content-layout': 'full-width',
      'site-content-layout': 'page-builder',
      'site-sidebar-layout': 'no-sidebar',
      '_uag_custom_page_level_css': ''
    }
  }), 'M6 meta');
  await sleep(18000);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Done. Page ${M6_PAGE_ID} = M6`);
  console.log(`URL  : ${base}/${M6_SLUG}/`);
  console.log(`Edit : ${base}/wp-admin/post.php?post=${M6_PAGE_ID}&action=edit`);
  console.log('═══════════════════════════════════════════════════════════');
})().catch(e => { console.error('ERROR:', e); process.exit(1); });
