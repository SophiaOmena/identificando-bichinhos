const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../js/database.js');
const { SpecimenPhotoClassifier } = require('../js/scanner.js');

test('Motor de Identificação por Foto - QA e Acurácia', async (t) => {
    const classifier = new SpecimenPhotoClassifier(db);

    await t.test('deve identificar corretamente espécime por dica direta de referência com alta confiança', () => {
        const result = classifier.classify('bothrops_jararaca');
        assert.strictEqual(result.specimen.scientificName, 'Bothrops jararaca');
        assert.strictEqual(result.isEmergency, true);
        assert.ok(result.confidence >= 90);
        assert.strictEqual(result.antivenom, 'Soro Antibotrópico (SAB) ou Soro Antibotrópico-Crotálico');
    });

    await t.test('deve diagnosticar Cascavel quando detectado guizo ou chocalho', () => {
        const result = classifier.classify(null, {}, { hasRattle: true });
        assert.strictEqual(result.specimen.id, 'crotalus_durissus');
        assert.strictEqual(result.specimen.scientificName, 'Crotalus durissus');
        assert.ok(result.antivenom.includes('Anticrotálico'));
    });

    await t.test('deve diferenciar Barbeiro de Percevejo fitófago pelo formato do rostro', () => {
        const barbeiroResult = classifier.classify(null, {}, { straightBeakUnderHead: true });
        assert.strictEqual(barbeiroResult.specimen.id, 'triatoma_infestans');
        assert.strictEqual(barbeiroResult.isEmergency, true);

        const percevejoResult = classifier.classify(null, {}, { veryLongBeak: true });
        assert.strictEqual(percevejoResult.specimen.id, 'percevejo_fitofago');
        assert.strictEqual(percevejoResult.isEmergency, false);
    });

    await t.test('deve identificar Aranha-armadeira e Aranha-marrom por marcas diagnósticas', () => {
        const armadeiraResult = classifier.classify(null, {}, { raisedDefensePose: true });
        assert.strictEqual(armadeiraResult.specimen.id, 'phoneutria_nigriventer');

        const marromResult = classifier.classify(null, {}, { violinMark: true });
        assert.strictEqual(marromResult.specimen.id, 'loxosceles_intermedia');
    });
});
