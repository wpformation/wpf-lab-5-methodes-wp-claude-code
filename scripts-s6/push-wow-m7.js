#!/usr/bin/env node
/*
 * S6 BONUS — Push couche "wow" CSS sur M·07 (page id=262).
 *
 * Stratégie : concaténer footer-lab-shared.css (banner/menu/footer harmony cross-pages)
 * + wow-m7.css (effets Direction B scopés body.page-id-262) dans la meta Spectra
 * `_uag_custom_page_level_css`. Le markup PHP custom des blocs wpf-lab reste intact.
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
  console.log('S6 BONUS — Push couche "wow" CSS sur M·07 (page id=262)');
  console.log('═══════════════════════════════════════════════════════════');

  const sharedCss = fs.readFileSync(path.resolve(__dirname, 'footer-lab-shared.css'), 'utf8');
  const wowCss = fs.readFileSync(path.resolve(__dirname, 'wow-m7.css'), 'utf8');

  const combined =
    '/* ====== footer-lab-shared (banner + Astra normalize + footer noir) ====== */\n' +
    sharedCss +
    '\n\n/* ====== wow-m7 (effets Direction B scopés M·07) ====== */\n' +
    wowCss;

  console.log(`  footer-lab-shared : ${sharedCss.length} chars`);
  console.log(`  wow-m7            : ${wowCss.length} chars`);
  console.log(`  combined          : ${combined.length} chars`);

  console.log(`\n  > Push meta _uag_custom_page_level_css → page ${M7_PAGE_ID}`);
  const r = await withRetry(() => req('POST', `${base}/wp-json/wp/v2/pages/${M7_PAGE_ID}`, {
    meta: {
      'ast-site-content-layout': 'full-width',
      'site-content-layout': 'page-builder',
      'site-sidebar-layout': 'no-sidebar',
      '_uag_custom_page_level_css': combined
    }
  }), 'M7 wow CSS meta');

  if (r && r.status >= 200 && r.status < 300) {
    console.log(`  OK HTTP ${r.status}`);
  }

  await sleep(18000);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Done. Page ${M7_PAGE_ID} = M·07 avec couche wow.`);
  console.log(`URL  : ${base}/methode-blocs-php-custom/`);
  console.log(`Edit : ${base}/wp-admin/post.php?post=${M7_PAGE_ID}&action=edit`);
  console.log('═══════════════════════════════════════════════════════════');
})().catch(e => { console.error('ERROR:', e); process.exit(1); });
