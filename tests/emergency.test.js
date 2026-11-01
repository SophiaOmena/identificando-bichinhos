const test = require('node:test');
const assert = require('node:assert/strict');

const { ANTIVENOM_GUIDE, EMERGENCY_CONTACTS, SPECIMENS_DATABASE } = require('../js/database.js');

test('Protocolos de Emergência, Soros e Contatos - QA', async (t) => {
    await t.test('guia de soros deve contemplar todas as peçonhas essenciais brasileiras', () => {
        assert.ok(Array.isArray(ANTIVENOM_GUIDE));
        assert.ok(ANTIVENOM_GUIDE.length >= 5);

        const serumNames = ANTIVENOM_GUIDE.map(s => s.name);
        assert.ok(serumNames.some(s => s.includes('Antibotrópico')));
        assert.ok(serumNames.some(s => s.includes('Anticrotálico')));
        assert.ok(serumNames.some(s => s.includes('Antielapídico')));
        assert.ok(serumNames.some(s => s.includes('Antiescorpiônico')));
        assert.ok(serumNames.some(s => s.includes('Antiaracnídico')));
    });

    await t.test('contatos de emergência e regras de ouro devem estar documentados', () => {
        assert.ok(EMERGENCY_CONTACTS.ciatoxNational.includes('0800 722 6001'));
        assert.ok(EMERGENCY_CONTACTS.samu.includes('192'));
        assert.ok(Array.isArray(EMERGENCY_CONTACTS.goldenRules));
        assert.ok(EMERGENCY_CONTACTS.goldenRules.some(r => r.includes('NUNCA faça torniquete')));
        assert.ok(EMERGENCY_CONTACTS.goldenRules.some(r => r.includes('NUNCA corte')));
    });

    await t.test('todas as espécies peçonhentas devem ter protocolo de primeiros socorros válido', () => {
        SPECIMENS_DATABASE.filter(s => s.isVenomousOrVector).forEach(s => {
            assert.ok(s.firstAidProtocol && s.firstAidProtocol.length > 20, `Primeiros socorros incompletos para ${s.scientificName}`);
            assert.ok(s.antivenomSerum && s.antivenomSerum.length > 3, `Soro ausente para ${s.scientificName}`);
        });
    });
});
