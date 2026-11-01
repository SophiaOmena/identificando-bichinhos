const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { ANIMAL_CATEGORIES, SPECIMENS_DATABASE } = require('../js/database.js');

test('Banco de Dados - Validação das 4 Categorias e Espécies', async (t) => {
    await t.test('deve conter as 4 categorias essenciais de animais peçonhentos e vetores', () => {
        const expectedCategories = ['barbeiros', 'cobras', 'escorpioes', 'aranhas'];
        expectedCategories.forEach(cat => {
            assert.ok(ANIMAL_CATEGORIES[cat], `Categoria ${cat} não encontrada`);
            assert.ok(ANIMAL_CATEGORIES[cat].name);
            assert.ok(ANIMAL_CATEGORIES[cat].emoji);
        });
    });

    await t.test('todas as espécies devem possuir campos obrigatórios e imagens no disco', () => {
        const assetsDir = path.join(__dirname, '..', 'assets', 'images');
        const requiredFields = [
            'id',
            'category',
            'scientificName',
            'commonName',
            'isVenomousOrVector',
            'urgencyLevel',
            'keyIdentificationFeatures',
            'lookalikeDifferentiator',
            'firstAidProtocol',
            'antivenomSerum',
            'imageSvg'
        ];

        SPECIMENS_DATABASE.forEach(spec => {
            requiredFields.forEach(field => {
                assert.ok(spec[field] !== undefined, `Campo ausente ${field} em ${spec.scientificName}`);
            });
            assert.ok(Array.isArray(spec.keyIdentificationFeatures) && spec.keyIdentificationFeatures.length >= 2);

            const imgPath = path.join(assetsDir, spec.imageSvg);
            assert.ok(fs.existsSync(imgPath), `Imagem ausente: ${spec.imageSvg}`);
            const stat = fs.statSync(imgPath);
            assert.ok(stat.size > 200, `Arquivo de imagem vazio ou corrompido: ${spec.imageSvg}`);
        });
    });

    await t.test('deve incluir diferenciação entre espécies de alto risco e controles inofensivos', () => {
        // Barbeiro vs Percevejo
        const barbeiro = SPECIMENS_DATABASE.find(s => s.id === 'triatoma_infestans');
        const percevejo = SPECIMENS_DATABASE.find(s => s.id === 'percevejo_fitofago');
        assert.ok(barbeiro && barbeiro.isVenomousOrVector === true);
        assert.ok(percevejo && percevejo.isVenomousOrVector === false);

        // Coral verdadeira vs Falsa-coral
        const coralV = SPECIMENS_DATABASE.find(s => s.id === 'micrurus_corallinus');
        const coralF = SPECIMENS_DATABASE.find(s => s.id === 'falsa_coral');
        assert.ok(coralV && coralV.isVenomousOrVector === true);
        assert.ok(coralF && coralF.isVenomousOrVector === false);

        // Armadeira vs Aranha de jardim
        const armadeira = SPECIMENS_DATABASE.find(s => s.id === 'phoneutria_nigriventer');
        const lycosa = SPECIMENS_DATABASE.find(s => s.id === 'lycosa_erythrognatha');
        assert.ok(armadeira && armadeira.isVenomousOrVector === true);
        assert.ok(lycosa && lycosa.isVenomousOrVector === false);
    });
});
