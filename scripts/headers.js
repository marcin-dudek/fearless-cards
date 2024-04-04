import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

const __dirname = path.resolve();
const buildDir = path.join(__dirname, 'build');

function removeCspMeta(inputFile) {
  const fileContents = fs.readFileSync(inputFile, { encoding: 'utf-8' });
  const root = parse(fileContents);
  const element = root.querySelector('head meta[http-equiv="content-security-policy"]');
  const content = element.getAttribute('content');
  root.remove(element);
  return content;
}

function createHeaders(csp) {
  const headers = `/*
  Access-Control-Allow-Origin: *
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: document-domain=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: ${csp}
`;
  const headersFile = path.join(buildDir, '_headers');
  console.log(`Writing headers to ${headersFile}`);
  fs.writeFileSync(headersFile, headers);
}

async function main() {
  const filename = path.join(buildDir, 'index.html');
  let csp = removeCspMeta(filename);
  createHeaders(csp);
}

main();
