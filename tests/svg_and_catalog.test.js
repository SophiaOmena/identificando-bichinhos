const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { SPECIMENS_DATABASE } = require('../js/database.js');

test('Validação de Vetores SVG e Filtros do Catálogo', async (t) => {
    await t.test('todos os arquivos SVG devem ter formato válido com viewBox', () => {
        const assetsDir = path.join(__dirname, '..', 'assets', 'images');
        const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.svg'));
        assert.ok(files.length >= 13, `Esperava pelo menos 13 SVGs, encontrou ${files.length}`);

        files.forEach(file => {
            const content = fs.readFileSync(path.join(assetsDir, file), 'utf-8');
            assert.ok(content.includes('<svg'), `${file} não contém <svg`);
            assert.ok(content.includes('</svg>'), `${file} não contém </svg>`);
            assert.ok(content.includes('viewBox='), `${file} não contém viewBox`);
        });
    });

    await t.test('filtros por categoria devem retornar os espécimes esperados', () => {
        const barbeiros = SPECIMENS_DATABASE.filter(s => s.category === 'barbeiros');
        assert.ok(barbeiros.length >= 3);

        const cobras = SPECIMENS_DATABASE.filter(s => s.category === 'cobras');
        assert.ok(cobras.length >= 4);

        const escorpioes = SPECIMENS_DATABASE.filter(s => s.category === 'escorpioes');
        assert.ok(escorpioes.length >= 2);

        const aranhas = SPECIMENS_DATABASE.filter(s => s.category === 'aranhas');
        assert.ok(aranhas.length >= 4);
    });
});
