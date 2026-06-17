const fs = require('fs');

const stableHashPath = require.resolve('metro-cache/src/stableHash');
const source = fs.readFileSync(stableHashPath, 'utf8');
const patchedSource = source.replace('.createHash("md4")', '.createHash("sha1")');

if (source !== patchedSource) {
  fs.writeFileSync(stableHashPath, patchedSource);
  console.log('Patched metro-cache stableHash for Node.js 20.');
}
