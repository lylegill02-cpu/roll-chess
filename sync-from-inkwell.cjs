#!/usr/bin/env node
'use strict';
/** Pull live inkwell HTML into local GitHub Pages files (reverse deploy links). */
const fs = require('fs');
const path = require('path');
const { loadServiceRoleKey } = require('../shapedqr/deploy-auth');

const REST = 'https://zmrouoqututfndplboyc.supabase.co/rest/v1/page_content';

async function fetchSlug(slug) {
  const key = loadServiceRoleKey();
  const res = await fetch(`${REST}?slug=eq.${slug}&select=html`, {
    headers: { apikey: key, Authorization: 'Bearer ' + key },
  });
  const rows = await res.json();
  if (!rows[0]?.html) throw new Error('missing slug: ' + slug);
  return rows[0].html;
}

function githubize(html, landing, trainer, rules) {
  let out = html;
  const pairs = [
    [`href="/${trainer}"`, 'href="trainer.html"'],
    [`href="/${rules}"`, 'href="rules.html"'],
    [`href="/${landing}"`, 'href="index.html"'],
    [`href="/${landing}/"`, 'href="index.html"'],
  ];
  for (const [from, to] of pairs) out = out.split(from).join(to);
  return out;
}

const SPECS = [
  {
    dir: path.join(__dirname),
    landing: 'roll-chess',
    trainer: 'roll-chess-trainer',
    rules: 'roll-chess-rules',
    files: [
      ['index.html', 'roll-chess'],
      ['trainer.html', 'roll-chess-trainer'],
      ['rules.html', 'roll-chess-rules'],
    ],
  },
  {
    dir: path.join(__dirname, '..', 'kick-chess-publish'),
    landing: 'kick-chess',
    trainer: 'kick-chess-trainer',
    rules: 'kick-chess-rules',
    files: [
      ['index.html', 'kick-chess'],
      ['trainer.html', 'kick-chess-trainer'],
      ['rules.html', 'kick-chess-rules'],
    ],
  },
];

(async () => {
  for (const spec of SPECS) {
    for (const [file, slug] of spec.files) {
      const html = await fetchSlug(slug);
      const local = githubize(html, spec.landing, spec.trainer, spec.rules);
      const dest = path.join(spec.dir, file);
      fs.writeFileSync(dest, local);
      console.log('wrote', dest, local.length, 'chars');
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
