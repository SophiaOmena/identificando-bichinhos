# Identificando Bichinhos 🪲🐍🦂🕷️

> **Identificador por Foto e Guia de Reconhecimento de Animais Peçonhentos e Vetores (Barbeiros, Cobras, Escorpiões e Aranhas)**

O **Identificando Bichinhos** é uma aplicação web mobile desenvolvida para identificação visual rápida, conscientização comunitária e orientação de primeiros socorros contra acidentes com animais peçonhentos e vetores no Brasil, com base em diretrizes do **Ministério da Saúde**, **Instituto Butantan** e **Fiocruz**.

---

## 🎯 Objetivo e Funcionalidades

O sistema auxilia qualquer pessoa ou profissional de campo a reconhecer espécimes fotografados ou avistados, respondendo às dúvidas mais críticas em segundos:

1. **📷 Scanner por Foto e Bancos de Imagens:**
   - Permite tirar fotos com a câmera do celular ou carregar fotos da galeria.
   - Inclui **bancos de imagens de referência integrados** para testar o diagnóstico de espécimes com 1 clique.
   - Cálculo de convergência morfológica (%) e emissão imediata de alerta de gravidade (**PERIGO IMEDIATO** vs **INOFENSIVO**).

2. **⚖️ Duelos Visuais (Comparador Lado a Lado):**
   - **🪲 Barbeiro vs Percevejo de Planta:** Teste do bico (rostro reto e curto de 3 segmentos que dobra sob a cabeça no barbeiro vs bico longo que vai até o abdômen no percevejo fitófago inofensivo).
   - **🐍 Coral-Verdadeira vs Falsa-Coral:** Teste dos anéis ventrais (anéis completos que dão a volta em todo o corpo na verdadeira vs ventre claro/interrompido na falsa).
   - **🦂 Escorpião-Amarelo vs Escorpião-Marrom:** Teste da serrilha dorsal no 4º segmento caudal do *Tityus serrulatus* (alta gravidade pediátrica).
   - **🕷️ Aranha-Armadeira vs Aranha-de-Jardim:** Teste da postura de ataque erguida em 90°, pelos vermelhos nas quelíceras e disposição ocular.

3. **📚 Catálogo Completo de Espécies:**
   - Dossiês detalhados com nomes científicos, nomes populares, morfologia diagnóstica, habitat, hábitos noturnos e fotos/vetores anatômicos em alta resolução.

4. **💉 Guia de Soros Antipeçonhentos e Emergência:**
   - Mapeamento direto de soros do SUS: **SAB** (Antibotrópico), **SAC** (Anticrotálico), **SAL** (Antilaquético), **SAE** (Antielapídico), **SAEsc** (Antiescorpiônico) e **SAAr** (Antiaracnídico).
   - Botão de discagem rápida 24h para o **Disque-Intoxicação Nacional (0800 722 6001)** e **SAMU (192)**.
   - Regras de ouro de primeiros socorros (o que fazer e o que NUNCA fazer).

---

## 🔬 Acervo Científico de Espécies Catalogadas

| Categoria | Espécie | Nome Popular | Importância Médica / Vetor | Status de Risco |
| :--- | :--- | :--- | :--- | :--- |
| 🪲 **Barbeiro** | *Triatoma infestans* | Barbeiro bicudo | Doença de Chagas (*T. cruzi*) | **VETOR GRAVE** |
| 🪲 **Barbeiro** | *Panstrongylus megistus* | Barbeiro-da-mata | Doença de Chagas (*T. cruzi*) | **VETOR GRAVE** |
| 🪲 **Percevejo** | *Acanthocephala spp.* | Percevejo fitófago | Nenhuma (alimenta-se de seiva) | **INOFENSIVO** |
| 🐍 **Cobra** | *Bothrops jararaca* | Jararaca | Acidente botrópico (proteolítico) | **PEÇONHENTO** |
| 🐍 **Cobra** | *Crotalus durissus* | Cascavel | Acidente crotálico (neuro/miotóxico) | **PEÇONHENTO** |
| 🐍 **Cobra** | *Micrurus corallinus* | Coral-verdadeira | Acidente elapídico (parada respiratória) | **PEÇONHENTO** |
| 🐍 **Cobra** | *Oxyrhopus guibei* | Falsa-coral | Nenhuma relevância tóxica | **INOFENSIVO** |
| 🦂 **Escorpião** | *Tityus serrulatus* | Escorpião-amarelo | Acidente escorpiônico (letalidade infantil) | **PEÇONHENTO** |
| 🦂 **Escorpião** | *Tityus bahiensis* | Escorpião-marrom | Acidente escorpiônico moderado/grave | **PEÇONHENTO** |
| 🕷️ **Aranha** | *Phoneutria nigriventer* | Armadeira | Phoneutrismo (dor extrema, priapismo) | **PEÇONHENTO** |
| 🕷️ **Aranha** | *Loxosceles intermedia* | Aranha-marrom | Loxoscelismo (necrose cutânea, violino) | **PEÇONHENTO** |
| 🕷️ **Aranha** | *Latrodectus curacaviensis* | Viúva-negra | Latrodectismo (espasmos musculares) | **PEÇONHENTO** |
| 🕷️ **Aranha** | *Lycosa erythrognatha* | Aranha-de-jardim | Reação local branda (seta dorsal) | **INOFENSIVO** |

---

## 🧪 Testes de Garantia de Qualidade (QA)

A suíte de testes automatizados cobre a integridade do banco de dados, motor de classificação por foto, diferenciação de controles inofensivos e conformidade dos protocolos de soroterapia.

Para rodar os testes:

```bash
npm test
```

Saída esperada:
```
✔ Banco de Dados - Validação das 4 Categorias e Espécies
✔ Protocolos de Emergência, Soros e Contatos - QA
✔ Motor de Identificação por Foto - QA e Acurácia
✔ Validação de Vetores SVG e Filtros do Catálogo
ℹ tests 16
ℹ pass 16
ℹ fail 0
```

---

## 🚀 Como Executar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SophiaOmena/identificando-bichinhos.git
cd identificando-bichinhos

# 2. Inicie um servidor local
python3 -m http.server 8080

# 3. Acesse http://localhost:8080 no seu navegador
```

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para mais detalhes.

**Desenvolvido por Sophia Omena**.
