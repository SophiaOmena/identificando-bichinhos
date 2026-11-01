/**
 * ============================================================================
 * Identificando Bichinhos - Lógica Principal da Aplicação
 * Autora: Anna Sophia
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Instanciar o classificador
    const classifier = new SpecimenPhotoClassifier(window.BICHINHOS_DB);

    // Estado da aplicação
    const state = {
        currentTab: 'scanner',
        activeCategory: 'all',
        currentSpecimenId: 'bothrops_jararaca',
        sampleIndex: 0
    };

    // Referências do DOM
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Scanner
    const scannerImgPreview = document.getElementById('scannerImgPreview');
    const scannerCanvas = document.getElementById('scannerCanvas');
    const filePhotoInput = document.getElementById('filePhotoInput');
    const btnShutterAction = document.getElementById('btnShutterAction');
    const btnNextSample = document.getElementById('btnNextSample');
    const samplePillsRow = document.getElementById('samplePillsRow');
    
    // Resultados do Scanner
    const resultCard = document.getElementById('resultCard');
    const resultCategoryBadge = document.getElementById('resultCategoryBadge');
    const resultSpeciesName = document.getElementById('resultSpeciesName');
    const resultCommonName = document.getElementById('resultCommonName');
    const resultDangerBadge = document.getElementById('resultDangerBadge');
    const resultConfidenceText = document.getElementById('resultConfidenceText');
    const resultConfidenceFill = document.getElementById('resultConfidenceFill');
    const resultAlertBox = document.getElementById('resultAlertBox');
    const resultUrgencyText = document.getElementById('resultUrgencyText');
    const resultSerumText = document.getElementById('resultSerumText');
    const resultLookalikeTip = document.getElementById('resultLookalikeTip');
    const btnResultOpenDetails = document.getElementById('btnResultOpenDetails');

    // Catálogo
    const catalogCategoryTabs = document.querySelectorAll('#catalogCategoryTabs .category-tab-btn');
    const catalogGrid = document.getElementById('catalogGrid');

    // Soros
    const serumsList = document.getElementById('serumsList');

    // Modais
    const modalSpecimenDetail = document.getElementById('modalSpecimenDetail');
    const modalDetailTitle = document.getElementById('modalDetailTitle');
    const modalDetailBody = document.getElementById('modalDetailBody');
    const modalSos = document.getElementById('modalSos');
    const btnHeaderSos = document.getElementById('btnHeaderSos');
    const allModals = document.querySelectorAll('.modal-overlay');

    // ------------------------------------------------------------------------
    // 1. NAVEGAÇÃO DE ABAS
    // ------------------------------------------------------------------------
    function switchTab(tabId) {
        state.currentTab = tabId;

        navButtons.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`pane${capitalize(tabId)}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        if (tabId === 'catalog') {
            renderCatalog();
        } else if (tabId === 'serums') {
            renderSerums();
        }
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // ------------------------------------------------------------------------
    // 2. SCANNER POR FOTO & BANCO DE AMOSTRAS DE TESTE
    // ------------------------------------------------------------------------
    function renderSamplePills() {
        if (!samplePillsRow) return;
        samplePillsRow.innerHTML = '';

        window.BICHINHOS_DB.SPECIMENS_DATABASE.forEach((spec, idx) => {
            const pill = document.createElement('div');
            pill.className = `sample-specimen-pill ${spec.id === state.currentSpecimenId ? 'active' : ''}`;
            pill.innerHTML = `
                <img src="assets/images/${spec.imageSvg}" alt="${spec.commonName}" class="sample-thumb">
                <span class="sample-name">${spec.commonName.split('(')[0].trim()}</span>
            `;
            pill.addEventListener('click', () => {
                document.querySelectorAll('.sample-specimen-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                state.currentSpecimenId = spec.id;
                state.sampleIndex = idx;
                loadSpecimenIntoScanner(spec.id);
            });
            samplePillsRow.appendChild(pill);
        });
    }

    function loadSpecimenIntoScanner(specimenId) {
        const spec = window.BICHINHOS_DB.SPECIMENS_DATABASE.find(s => s.id === specimenId);
        if (!spec) return;

        state.currentSpecimenId = spec.id;
        scannerImgPreview.src = `assets/images/${spec.imageSvg}`;
        
        // Executa diagnóstico
        runClassification(spec.id);
    }

    function runClassification(specimenIdHint = state.currentSpecimenId) {
        const analysis = classifier.classify(specimenIdHint);
        const spec = analysis.specimen;

        resultCategoryBadge.textContent = analysis.category.name;
        resultSpeciesName.textContent = spec.scientificName;
        resultCommonName.textContent = spec.commonName;

        if (spec.isVenomousOrVector) {
            resultDangerBadge.textContent = "PERIGO IMEDIATO";
            resultDangerBadge.className = "danger-tag danger";
            resultAlertBox.className = "result-alert-box danger";
        } else {
            resultDangerBadge.textContent = "INOFENSIVO";
            resultDangerBadge.className = "danger-tag safe";
            resultAlertBox.className = "result-alert-box safe";
        }

        resultConfidenceText.textContent = `${analysis.confidence}%`;
        resultConfidenceFill.style.width = `${analysis.confidence}%`;
        resultUrgencyText.textContent = spec.vectorFor;
        resultSerumText.textContent = spec.antivenomSerum;
        resultLookalikeTip.textContent = spec.lookalikeDifferentiator;

        resultCard.style.display = 'block';

        btnResultOpenDetails.onclick = () => {
            showSpecimenDetails(spec);
        };
    }

    if (btnShutterAction) {
        btnShutterAction.addEventListener('click', () => {
            btnShutterAction.style.transform = 'scale(0.9)';
            setTimeout(() => { btnShutterAction.style.transform = 'scale(1)'; }, 150);
            runClassification();
        });
    }

    if (btnNextSample) {
        btnNextSample.addEventListener('click', () => {
            const list = window.BICHINHOS_DB.SPECIMENS_DATABASE;
            state.sampleIndex = (state.sampleIndex + 1) % list.length;
            const nextSpec = list[state.sampleIndex];
            loadSpecimenIntoScanner(nextSpec.id);
            renderSamplePills();
        });
    }

    if (filePhotoInput) {
        filePhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    scannerImgPreview.src = event.target.result;
                    // Classifica automaticamente após o upload
                    setTimeout(() => {
                        runClassification();
                    }, 350);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ------------------------------------------------------------------------
    // 3. CATÁLOGO DE ESPÉCIES
    // ------------------------------------------------------------------------
    function renderCatalog() {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';

        const filtered = window.BICHINHOS_DB.SPECIMENS_DATABASE.filter(spec => {
            if (state.activeCategory === 'all') return true;
            return spec.category === state.activeCategory;
        });

        filtered.forEach(spec => {
            const card = document.createElement('div');
            card.className = 'specimen-card';
            card.innerHTML = `
                <div class="specimen-avatar-box">
                    <img src="assets/images/${spec.imageSvg}" alt="${spec.scientificName}">
                </div>
                <div class="specimen-card-scientific">${spec.scientificName}</div>
                <div class="specimen-card-common">${spec.commonName.split('(')[0].trim()}</div>
                <span class="danger-tag ${spec.isVenomousOrVector ? 'danger' : 'safe'}" style="font-size:9px; padding:2px 8px;">
                    ${spec.isVenomousOrVector ? 'PEÇONHENTO / VETOR' : 'INOFENSIVO'}
                </span>
            `;
            card.addEventListener('click', () => {
                showSpecimenDetails(spec);
            });
            catalogGrid.appendChild(card);
        });
    }

    catalogCategoryTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            catalogCategoryTabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeCategory = btn.dataset.cat;
            renderCatalog();
        });
    });

    // ------------------------------------------------------------------------
    // 4. DETALHES COMPLETOS DO ESPÉCIME (MODAL)
    // ------------------------------------------------------------------------
    function showSpecimenDetails(spec) {
        modalDetailTitle.textContent = spec.scientificName;
        modalDetailBody.innerHTML = `
            <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">
                <div style="width:76px; height:76px; border-radius:50%; background:#F8FAFC; padding:6px; flex-shrink:0;">
                    <img src="assets/images/${spec.imageSvg}" alt="${spec.scientificName}" style="width:100%; height:100%; object-fit:contain;">
                </div>
                <div>
                    <h4 style="font-size:16px; font-weight:800; color:#0F172A;">${spec.scientificName}</h4>
                    <p style="font-size:12px; color:#64748B;">${spec.commonName}</p>
                    <span class="danger-tag ${spec.isVenomousOrVector ? 'danger' : 'safe'}" style="margin-top:4px; display:inline-block;">
                        ${spec.urgencyLevel}
                    </span>
                </div>
            </div>

            <div style="font-size:13px; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:6px;">Marcas de Reconhecimento Rápido</div>
            <ul style="padding-left:18px; font-size:12px; color:#334155; line-height:1.5; margin-bottom:14px;">
                ${spec.keyIdentificationFeatures.map(f => `<li>${f}</li>`).join('')}
            </ul>

            <div style="background:#FFFBEB; border-left:3px solid #D97706; padding:10px; border-radius:6px; font-size:12px; color:#78350F; margin-bottom:14px;">
                <strong>🔍 Como não confundir:</strong><br>
                ${spec.lookalikeDifferentiator}
            </div>

            <div style="font-size:13px; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:6px;">Primeiros Socorros e Conduta</div>
            <p style="font-size:12px; color:#1E293B; line-height:1.5; margin-bottom:12px;">${spec.firstAidProtocol}</p>

            <div style="background:#EFF6FF; border-left:3px solid #0284C7; padding:10px; border-radius:6px; font-size:12px; color:#1E3A8A; margin-bottom:16px;">
                <strong>💉 Soro Indicado:</strong> ${spec.antivenomSerum}
            </div>

            <div style="display:flex; gap:8px;">
                <button id="btnModalLoadToScanner" style="flex:1; background:#0284C7; color:#FFF; border:none; padding:12px; border-radius:10px; font-weight:700; font-size:13px; cursor:pointer;">
                    Testar no Scanner
                </button>
            </div>
        `;

        document.getElementById('btnModalLoadToScanner').onclick = () => {
            closeAllModals();
            switchTab('scanner');
            loadSpecimenIntoScanner(spec.id);
        };

        openModal(modalSpecimenDetail);
    }

    // ------------------------------------------------------------------------
    // 5. GUIA DE SOROS
    // ------------------------------------------------------------------------
    function renderSerums() {
        if (!serumsList) return;
        serumsList.innerHTML = '';

        window.BICHINHOS_DB.ANTIVENOM_GUIDE.forEach(serum => {
            const card = document.createElement('div');
            card.className = 'serum-card';
            card.innerHTML = `
                <div class="serum-name">${serum.name}</div>
                <div class="serum-target"><strong>Indicação:</strong> ${serum.target}</div>
                <div class="serum-action">${serum.action}</div>
                <div style="font-size:11px; color:#0369A1; margin-top:4px;"><strong>Posologia:</strong> ${serum.dosageInfo}</div>
            `;
            serumsList.appendChild(card);
        });
    }

    // ------------------------------------------------------------------------
    // 6. GESTÃO DE MODAIS & SOS
    // ------------------------------------------------------------------------
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
    }

    function closeAllModals() {
        allModals.forEach(m => m.classList.remove('active'));
    }

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    if (btnHeaderSos) {
        btnHeaderSos.addEventListener('click', () => {
            openModal(modalSos);
        });
    }

    // Inicialização da aba padrão
    renderSamplePills();
    loadSpecimenIntoScanner('bothrops_jararaca');
});
