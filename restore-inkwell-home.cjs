#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { deployPage } = require('../shapedqr/deploy-auth');

function patchHome(html) {
  let out = html;
  if (!out.includes('href="/chess"')) {
    out = out.replace(
      '<a href="/ground-news">Ground News</a>\n    <a href="/store">Store</a>',
      '<a href="/ground-news">Ground News</a>\n    <a href="/chess">Roll Chess</a>\n    <a href="/store">Store</a>'
    );
  }
  return out;
}

(async () => {
  const src = path.join(__dirname, '_inkwell-home-restore.txt');
  const home = patchHome(fs.readFileSync(src, 'utf8'));
  const ok = await deployPage('inkwell-home', home);
  console.log('restore inkwell-home:', ok, home.length, 'chars');
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
