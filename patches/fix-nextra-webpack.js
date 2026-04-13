// Patches nextra 2.13.4 NextraSearchPlugin to handle missing webpack.Compilation
// in Next.js 13.0.6 (different webpack export shape)
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'node_modules', 'nextra', 'dist', 'index.js');
if (!fs.existsSync(file)) process.exit(0);

let code = fs.readFileSync(file, 'utf8');

const needle = `var NextraSearchPlugin = class {
  apply(compiler) {
    const pluginName = this.constructor.name;
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: import_webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
        },`;

const replacement = `var NextraSearchPlugin = class {
  apply(compiler) {
    const pluginName = this.constructor.name;
    const _wp = import_webpack.webpack;
    if (!_wp || !_wp.Compilation) return;
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: _wp.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
        },`;

if (code.includes('if (!_wp || !_wp.Compilation) return;')) {
  // Already patched
  process.exit(0);
}

if (!code.includes(needle)) {
  console.warn('[patch] nextra dist/index.js structure changed, skipping patch');
  process.exit(0);
}

code = code.replace(needle, replacement);
fs.writeFileSync(file, code, 'utf8');
console.log('[patch] nextra webpack Compilation fix applied');
