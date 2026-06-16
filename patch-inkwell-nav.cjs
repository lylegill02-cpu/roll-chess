#!/usr/bin/env node
'use strict';
/** Patch inkwell-home nav: /chess → hybrid trainers, free /chess for hippo. */
const fs = require('fs');
const path = require('path');
const { deployPage, loadServiceRoleKey } = require('../shapedqr/deploy-auth');

const REST = 'https://zmrouoqututfndplboyc.supabase.co/rest/v1/page_content';

function patchNav(html) {
  let out = html;
  out = out.replace(/<a href="\/chess"[^>]*>Roll Chess<\/a>\s*/g, '');
  out = out.replace(
    '<a href="/ground-news">Ground News</a>\n    <a href="/store">Store</a>',
    '<a href="/ground-news">Ground News</a>\n    <a href="/roll-chess">Roll Chess</a>\n    <a href="/kick-chess">Kick Chess</a>\n    <a href="/store">Store</a>'
  );
  if (!out.includes('href="/roll-chess"')) {
    out = out.replace(
      '<a href="/store">Store</a>',
      '<a href="/roll-chess">Roll Chess</a>\n    <a href="/kick-chess">Kick Chess</a>\n    <a href="/store">Store</a>'
    );
  }
  return out;
}

(async () => {
  const key = loadServiceRoleKey();
  const headers = { apikey: key, Authorization: 'Bearer ' + key };
  const res = await fetch(`${REST}?slug=eq.inkwell-home&select=html`, { headers });
  const rows = await res.json();
  if (!rows[0]?.html) throw new Error('inkwell-home not found');
  const home = patchNav(rows[0].html);
  const ok = await deployPage('inkwell-home', home);
  console.log('patch inkwell-home nav:', ok, home.length, 'chars');
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
