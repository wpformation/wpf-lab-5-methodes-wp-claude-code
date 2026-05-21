#!/usr/bin/env node
/*
 * S6 Bloc B — Push M7 final (10 sections via 11 blocs PHP custom du plugin wpf-lab v1.1.0).
 *
 * Page cible : id=262 (réutilisée, slug renommé).
 *
 * Markup ultra-minimal : 1 ligne par bloc + footer-lab-shared injecté en meta CSS
 * (cohérent M1-M5 + M6). Le design du plugin (wpf-lab-*) est dans style.css packagé.
 *
 * Rate-limit Tiger Protect : sleep 18s + retry 22s × 12 sur 429.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const creds = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'credentials.json'), 'utf8')).wp_test;
const base = creds.site_url.replace(/\/$/, '');
const auth = 'Basic ' + Buffer.from(creds.admin_user + ':' + creds.app_password).toString('base64');

const M7_PAGE_ID = 262;
const M7_SLUG = 'methode-blocs-php-custom';
const M7_TITLE = 'Méthode 7 · Blocs PHP custom (autoGenerateControl WP 7.0)';

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
  console.log('S6 Bloc B — Push M7 final (11 blocs PHP custom du plugin wpf-lab v1.1)');
  console.log('═══════════════════════════════════════════════════════════');

  // === 1. Markup : empilement des 11 blocs custom + footer-lab-M7 ===
  const footerM7 = fs.readFileSync(path.resolve(__dirname, 'footer-lab-M7.html'), 'utf8');

  const markup = `<!-- wp:wpf/lab-utility /-->

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

<!-- S6 FOOTER LAB M7 START -->
${footerM7}
<!-- S6 FOOTER LAB M7 END -->
`;
  console.log(`  Markup : ${markup.length} chars`);

  // === 2. CSS = footer-lab-shared uniquement (banner + Astra normalize + footer noir) ===
  const sharedCss = fs.readFileSync(path.resolve(__dirname, 'footer-lab-shared.css'), 'utf8');
  console.log(`  Meta CSS (footer-lab-shared) : ${sharedCss.length} chars`);

  // === 3. Push title + slug + content ===
  console.log(`\n  > Push title + slug + content → page ${M7_PAGE_ID}`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${M7_PAGE_ID}`, {
    title: M7_TITLE,
    slug: M7_SLUG,
    content: markup,
    status: 'publish'
  }), 'M7 title+slug+content');
  await sleep(18000);

  // === 4. Push Astra meta full-width + footer-lab-shared CSS en meta ===
  console.log(`  > Push Astra full-width + meta CSS footer-lab-shared`);
  await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${M7_PAGE_ID}`, {
    meta: {
      'ast-site-content-layout': 'full-width',
      'site-content-layout': 'page-builder',
      'site-sidebar-layout': 'no-sidebar',
      '_uag_custom_page_level_css': sharedCss
    }
  }), 'M7 meta');
  await sleep(18000);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Done. Page ${M7_PAGE_ID} = M7`);
  console.log(`URL  : ${base}/${M7_SLUG}/`);
  console.log(`Edit : ${base}/wp-admin/post.php?post=${M7_PAGE_ID}&action=edit`);
  console.log('═══════════════════════════════════════════════════════════');
})().catch(e => { console.error('ERROR:', e); process.exit(1); });
