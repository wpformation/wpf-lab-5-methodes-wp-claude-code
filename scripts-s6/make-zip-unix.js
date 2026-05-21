#!/usr/bin/env node
/*
 * Build a zip with forward-slash paths (Unix-compatible) for WordPress plugin upload.
 * PowerShell's Compress-Archive emits backslashes which break extraction on Linux servers.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function makeZip(rootDir, outFile) {
  const files = [];
  function walk(dir, base) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = base ? base + '/' + entry.name : entry.name;
      if (entry.isDirectory()) walk(full, rel);
      else files.push({ rel: rel.split(path.sep).join('/'), full });
    }
  }
  walk(rootDir, path.basename(rootDir));

  const central = [];
  const local = [];
  let offset = 0;
  const now = new Date();
  const dosTime = ((now.getHours() & 0x1f) << 11) | ((now.getMinutes() & 0x3f) << 5) | ((Math.floor(now.getSeconds() / 2)) & 0x1f);
  const dosDate = (((now.getFullYear() - 1980) & 0x7f) << 9) | (((now.getMonth() + 1) & 0xf) << 5) | (now.getDate() & 0x1f);

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = c ^ buf[i];
      for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  for (const f of files) {
    const data = fs.readFileSync(f.full);
    const compressed = zlib.deflateRawSync(data);
    const nameBuf = Buffer.from(f.rel, 'utf8');
    const crc = crc32(data);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);

    local.push(localHeader, nameBuf, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(dosTime, 12);
    centralHeader.writeUInt16LE(dosDate, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    central.push(centralHeader, nameBuf);
    offset += 30 + nameBuf.length + compressed.length;
  }

  const centralBuf = Buffer.concat(central);
  const localBuf = Buffer.concat(local);

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8); eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(localBuf.length, 16);
  eocd.writeUInt16LE(0, 20);

  fs.writeFileSync(outFile, Buffer.concat([localBuf, centralBuf, eocd]));
  console.log('Wrote', outFile, '(' + (localBuf.length + centralBuf.length + 22) + ' bytes, ' + files.length + ' files)');
  console.log('Entries:');
  for (const f of files) console.log('  ' + f.rel);
}

const root = process.argv[2] || 'wpf-lab-blocks';
const out = process.argv[3] || 'wpf-lab-blocks.zip';
makeZip(root, out);
