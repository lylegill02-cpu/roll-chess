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

const SLUGS = {
  landing: 'roll-chess',
  trainer: 'roll-chess-trainer',
  rules: 'roll-chess-rules',
};

async function main() {
  const landing = inkwellize(read('index.html'), [
    ['href="trainer.html"', `href="/${SLUGS.trainer}"`],
    ['href="rules.md"', `href="/${SLUGS.rules}"`],
    ['href="rules.html"', `href="/${SLUGS.rules}"`],
  ]);
  const trainer = inkwellize(read('trainer.html'), [
    ['href="index.html"', `href="/${SLUGS.landing}"`],
    ['href="rules.md"', `href="/${SLUGS.rules}"`],
    ['href="rules.html"', `href="/${SLUGS.rules}"`],
  ]);
  const rules = inkwellize(read('rules.html'), [
    ['href="/chess-trainer"', `href="/${SLUGS.trainer}"`],
    ['href="/chess"', `href="/${SLUGS.landing}"`],
  ]);

  const jobs = [
    [SLUGS.landing, landing],
    [SLUGS.trainer, trainer],
    [SLUGS.rules, rules],
  ];

  let ok = true;
  for (const [slug, html] of jobs) {
    if (!(await deployPage(slug, html))) ok = false;
  }

  console.log('Skip inkwell-home (run patch-inkwell-nav.cjs separately)');

  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
