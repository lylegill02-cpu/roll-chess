#!/usr/bin/env node
'use strict';
/** Deploy ROLL CHESS to inkwell.wiki (page_content slugs). */
const fs = require('fs');
const path = require('path');
const { deployPage } = require('../shapedqr/deploy-auth');

const ROOT = __dirname;

function read(name) {
  return fs.readFileSync(path.join(ROOT, name), 'utf8');
}

function inkwellize(html, pairs) {
  let out = html;
  for (const [from, to] of pairs) out = out.split(from).join(to);
  return out;
}

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

async function main() {
  const landing = inkwellize(read('index.html'), [
    ['href="trainer.html"', 'href="/chess-trainer"'],
    ['href="rules.md"', 'href="/chess-rules"'],
  ]);
  const trainer = inkwellize(read('trainer.html'), [
    ['href="index.html"', 'href="/chess"'],
    ['href="rules.md"', 'href="/chess-rules"'],
  ]);
  const rules = read('rules.html');

  const jobs = [
    ['chess', landing],
    ['chess-trainer', trainer],
    ['chess-rules', rules],
  ];

  let ok = true;
  for (const [slug, html] of jobs) {
    if (!(await deployPage(slug, html))) ok = false;
  }

  const homeRestore = path.join(ROOT, '_inkwell-home-restore.txt');
  if (fs.existsSync(homeRestore) && process.env.PATCH_INKWELL_HOME === '1') {
    const home = patchHome(read('_inkwell-home-restore.txt'));
    if (!(await deployPage('inkwell-home', home))) ok = false;
    else console.log('inkwell-home updated with Roll Chess link');
  } else {
    console.log('Skip inkwell-home (set PATCH_INKWELL_HOME=1 to patch from _inkwell-home-restore.txt)');
  }

  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
