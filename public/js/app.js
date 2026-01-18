/**
 * Main Application Module
 * Controls the UI and connects all components together
 */

const App = {
    // DOM Elements cache
    elements: {},

    // Current state
    state: {
        profile: null,
        calculations: null,
        goal: null,
        targetCalories: 0,
        foods: [],
        autocomplete: {
            selectedIndex: -1,
            suggestions: [],
            isOpen: false
        },
        generator: {
            results: [],
            selected: new Set()
        },
        scanner: {
            html5QrCode: null,
            isScanning: false,
            scannedProduct: null
        }
    },

    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
        this.initTheme();
        this.bindEvents();
        this.checkDailyReset();
        this.loadSavedData();
        this.updateCurrentDate();
        this.loadWaterIntake();
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // Profile
            profileSection: document.getElementById('profile-section'),
            profileForm: document.getElementById('profile-form'),
            profileDisplay: document.getElementById('profile-display'),
            editProfileBtn: document.getElementById('edit-profile-btn'),
            genderInput: document.getElementById('gender'),
            ageInput: document.getElementById('age'),
            heightInput: document.getElementById('height'),
            weightInput: document.getElementById('weight'),
            activityInput: document.getElementById('activity'),
            displayGender: document.getElementById('display-gender'),
            displayAge: document.getElementById('display-age'),
            displayHeight: document.getElementById('display-height'),
            displayWeight: document.getElementById('display-weight'),

            // Results
            resultsSection: document.getElementById('results-section'),
            bmiValue: document.getElementById('bmi-value'),
            bmiCategory: document.getElementById('bmi-category'),
            tdeeValue: document.getElementById('tdee-value'),
            bmiIndicator: document.getElementById('bmi-indicator'),
            idealHeight: document.getElementById('ideal-height'),
            idealWeightMin: document.getElementById('ideal-weight-min'),
            idealWeightMax: document.getElementById('ideal-weight-max'),
            weightDiffMessage: document.getElementById('weight-diff-message'),

            // Goal
            goalSection: document.getElementById('goal-section'),
            goalForm: document.getElementById('goal-form'),
            goalDisplay: document.getElementById('goal-display'),
            goalTypeInput: document.getElementById('goal-type'),
            targetWeightInput: document.getElementById('target-weight'),
            customCaloriesInput: document.getElementById('custom-calories'),
            displayTargetCalories: document.getElementById('display-target-calories'),
            displayTargetWeight: document.getElementById('display-target-weight'),
            displayGoalTime: document.getElementById('display-goal-time'),
            displayGoalDate: document.getElementById('display-goal-date'),
            editGoalBtn: document.getElementById('edit-goal-btn'),

            // Dashboard
            dashboardSection: document.getElementById('dashboard-section'),
            currentDate: document.getElementById('current-date'),
            progressRing: document.getElementById('progress-ring'),
            consumedCalories: document.getElementById('consumed-calories'),
            targetCalories: document.getElementById('target-calories'),
            remainingCalories: document.getElementById('remaining-calories'),
            percentageConsumed: document.getElementById('percentage-consumed'),
            statusMessage: document.getElementById('status-message'),

            // Water
            waterCurrent: document.getElementById('water-current'),
            waterTarget: document.getElementById('water-target'),
            waterMl: document.getElementById('water-ml'),
            waterPlus: document.getElementById('water-plus'),
            waterMinus: document.getElementById('water-minus'),
            waterBarFill: document.getElementById('water-bar-fill'),

            // Food Tracker
            foodSection: document.getElementById('food-section'),
            foodForm: document.getElementById('food-form'),
            foodNameInput: document.getElementById('food-name'),
            foodCaloriesInput: document.getElementById('food-calories'),
            foodSuggestions: document.getElementById('food-suggestions'),
            foodHint: document.getElementById('food-hint'),
            calorieHint: document.getElementById('calorie-hint'),
            foodList: document.getElementById('food-list'),
            emptyFoodMessage: document.getElementById('empty-food-message'),
            clearFoodsBtn: document.getElementById('clear-foods-btn'),

            // Templates
            showTemplatesBtn: document.getElementById('show-templates-btn'),
            templatesPanel: document.getElementById('templates-panel'),
            templatesList: document.getElementById('templates-list'),
            saveAsTemplateBtn: document.getElementById('save-as-template-btn'),
            templateModal: document.getElementById('template-modal'),
            templateNameInput: document.getElementById('template-name'),
            closeTemplateModal: document.getElementById('close-template-modal'),
            confirmSaveTemplate: document.getElementById('confirm-save-template'),
            cancelSaveTemplate: document.getElementById('cancel-save-template'),

            // Weight Section
            weightSection: document.getElementById('weight-section'),
            weightInputField: document.getElementById('weight-input'),
            addWeightBtn: document.getElementById('add-weight-btn'),
            weightStats: document.getElementById('weight-stats'),
            startWeight: document.getElementById('start-weight'),
            currentWeightDisplay: document.getElementById('current-weight-display'),
            weightChange: document.getElementById('weight-change'),
            weightChartContainer: document.getElementById('weight-chart-container'),

            // Body Measurements
            measurementsSection: document.getElementById('measurements-section'),
            toggleMeasurementForm: document.getElementById('toggle-measurement-form'),
            measurementForm: document.getElementById('measurement-form'),
            measurementDisplay: document.getElementById('measurement-display'),
            measurementHistory: document.getElementById('measurement-history'),
            measurementHistoryList: document.getElementById('measurement-history-list'),
            waistInput: document.getElementById('waist'),
            chestInput: document.getElementById('chest'),
            armInput: document.getElementById('arm'),
            thighInput: document.getElementById('thigh'),
            hipInput: document.getElementById('hip'),
            neckInput: document.getElementById('neck'),

            // History
            historySection: document.getElementById('history-section'),
            calorieChartBars: document.getElementById('calorie-chart-bars'),
            historyList: document.getElementById('history-list'),

            // Generator
            generatorSection: document.getElementById('generator-section'),
            generatorForm: document.getElementById('generator-form'),
            genTargetCalories: document.getElementById('gen-target-calories'),
            genTolerance: document.getElementById('gen-tolerance'),
            genBudgetMin: document.getElementById('gen-budget-min'),
            genBudgetMax: document.getElementById('gen-budget-max'),
            generatorResults: document.getElementById('generator-results'),
            generatorList: document.getElementById('generator-list'),
            generatorEmpty: document.getElementById('generator-empty'),
            generatorSummary: document.getElementById('generator-summary'),
            genResultCount: document.getElementById('gen-result-count'),
            genSelectedCount: document.getElementById('gen-selected-count'),
            genSelectedCalories: document.getElementById('gen-selected-calories'),
            genSelectedPrice: document.getElementById('gen-selected-price'),
            selectAllFoods: document.getElementById('select-all-foods'),
            clearSelection: document.getElementById('clear-selection'),
            addSelectedFoods: document.getElementById('add-selected-foods'),

            // Price Modal
            priceModal: document.getElementById('price-modal'),
            closePriceModal: document.getElementById('close-price-modal'),
            priceEditFoodName: document.getElementById('price-edit-food-name'),
            priceEditInput: document.getElementById('price-edit-input'),
            confirmPriceEdit: document.getElementById('confirm-price-edit'),
            resetPriceEdit: document.getElementById('reset-price-edit'),

            // Toast
            toastContainer: document.getElementById('toast-container'),

            // Confirm Modal
            confirmModal: document.getElementById('confirm-modal'),
            confirmIcon: document.getElementById('confirm-icon'),
            confirmTitle: document.getElementById('confirm-title'),
            confirmMessage: document.getElementById('confirm-message'),
            confirmCancel: document.getElementById('confirm-cancel'),
            confirmOk: document.getElementById('confirm-ok'),

            // Theme
            themeToggle: document.getElementById('theme-toggle'),
            themeIconSun: document.getElementById('theme-icon-sun'),
            themeIconMoon: document.getElementById('theme-icon-moon'),

            // Barcode Scanner
            scannerSection: document.getElementById('scanner-section'),
            startScannerBtn: document.getElementById('start-scanner-btn'),
            closeScannerBtn: document.getElementById('close-scanner-btn'),
            scannerContainer: document.getElementById('scanner-container'),
            scannerReader: document.getElementById('scanner-reader'),
            scannerResult: document.getElementById('scanner-result'),
            productName: document.getElementById('product-name'),
            productBrand: document.getElementById('product-brand'),
            productCalories: document.getElementById('product-calories'),
            productPortion: document.getElementById('product-portion'),
            addScannedFood: document.getElementById('add-scanned-food'),
            cancelScanned: document.getElementById('cancel-scanned'),
            manualInputContainer: document.getElementById('manual-input-container'),
            manualProductName: document.getElementById('manual-product-name'),
            manualProductCalories: document.getElementById('manual-product-calories'),
            saveManualProduct: document.getElementById('save-manual-product'),
            cancelManual: document.getElementById('cancel-manual'),

            // Settings
            settingsToggle: document.getElementById('settings-toggle'),
            settingsContent: document.getElementById('settings-content'),
            apiKeyInput: document.getElementById('api-key'),
            saveApiKeyBtn: document.getElementById('save-api-key'),
            clearApiKeyBtn: document.getElementById('clear-api-key'),
            apiStatus: document.getElementById('api-status'),
            resetAllBtn: document.getElementById('reset-all-btn')
        };
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Theme Toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Profile
        this.elements.profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmit();
        });
        this.elements.editProfileBtn.addEventListener('click', () => this.showProfileForm());

        // Goal
        this.elements.goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGoalSubmit();
        });
        this.elements.editGoalBtn?.addEventListener('click', () => this.showGoalForm());

        // Food
        this.elements.foodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFoodSubmit();
        });
        this.elements.clearFoodsBtn.addEventListener('click', () => this.handleClearFoods());

        // Water
        this.elements.waterPlus.addEventListener('click', () => this.addWater(1));
        this.elements.waterMinus.addEventListener('click', () => this.removeWater(1));

        // Weight
        this.elements.addWeightBtn.addEventListener('click', () => this.handleAddWeight());

        // Measurements
        this.elements.toggleMeasurementForm?.addEventListener('click', () => this.toggleMeasurementForm());
        this.elements.measurementForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleMeasurementSubmit();
        });

        // Templates
        this.elements.showTemplatesBtn?.addEventListener('click', () => this.toggleTemplatesPanel());
        this.elements.saveAsTemplateBtn?.addEventListener('click', () => this.showTemplateModal());
        this.elements.closeTemplateModal?.addEventListener('click', () => this.hideTemplateModal());
        this.elements.cancelSaveTemplate?.addEventListener('click', () => this.hideTemplateModal());
        this.elements.confirmSaveTemplate?.addEventListener('click', () => this.saveTemplate());

        // Autocomplete
        this.bindAutocompleteEvents();

        // Generator
        this.bindGeneratorEvents();

        // Scanner
        this.bindScannerEvents();

        // Settings
        this.bindSettingsEvents();

        // Visibility change - check daily reset when user returns to tab
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                const wasReset = Storage.checkAndResetDaily();
                if (wasReset) {
                    this.loadFoods();
                    this.updateDashboard();
                    this.loadHistory();
                    this.loadWaterIntake();
                    this.updateCurrentDate();
                    this.showToast('Hari baru dimulai! Data kemarin sudah disimpan ke riwayat.', 'info');
                }
            }
        });
    },

    /**
     * Bind settings events
     */
    bindSettingsEvents() {
        this.elements.settingsToggle.addEventListener('click', () => {
            const content = this.elements.settingsContent;
            const isOpen = content.style.display !== 'none';
            content.style.display = isOpen ? 'none' : 'block';
            this.elements.settingsToggle.classList.toggle('open', !isOpen);
        });

        this.elements.saveApiKeyBtn.addEventListener('click', () => {
            const key = this.elements.apiKeyInput.value.trim();
            if (key) {
                CalorieAPI.setApiKey(key);
                this.showApiStatus('API key berhasil disimpan!', 'success');
                this.elements.apiKeyInput.value = '';
            }
        });

        this.elements.clearApiKeyBtn.addEventListener('click', () => {
            CalorieAPI.setApiKey('');
            this.showApiStatus('API key dihapus', 'success');
        });

        this.elements.resetAllBtn?.addEventListener('click', async () => {
            const confirmed = await this.showConfirm({
                title: 'Reset Semua Data?',
                message: 'Semua data profil, makanan, template, dan riwayat akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.',
                confirmText: 'Reset Semua',
                cancelText: 'Batal',
                type: 'danger'
            });

            if (confirmed) {
                Storage.clearAll();
                location.reload();
            }
        });
    },

    showApiStatus(message, type) {
        const status = this.elements.apiStatus;
        status.textContent = message;
        status.className = `api-status ${type}`;
        setTimeout(() => {
            status.textContent = '';
            status.className = 'api-status';
        }, 3000);
    },

    /**
     * Bind autocomplete events
     */
    bindAutocompleteEvents() {
        const input = this.elements.foodNameInput;
        let debounceTimer = null;

        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleAutocompleteSearch(e.target.value);
            }, 200);
        });

        input.addEventListener('focus', () => {
            if (input.value.length >= 2) {
                this.handleAutocompleteSearch(input.value);
            }
        });

        input.addEventListener('keydown', (e) => this.handleAutocompleteKeydown(e));

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.autocomplete-wrapper')) {
                this.closeAutocomplete();
            }
        });
    },

    async handleAutocompleteSearch(query) {
        const suggestions = this.elements.foodSuggestions;
        const hint = this.elements.foodHint;

        if (query.length < 2) {
            this.closeAutocomplete();
            hint.textContent = '';
            return;
        }

        // 1. Search all sources and combine by relevance
        let customResults = Storage.searchCustomFoodsWithScore(query, 10);
        let localResults = FoodsDB.searchWithScore(query, 10);

        // Merge results, avoiding duplicates (prefer custom if same name)
        const seenNames = new Set();
        let allResults = [];

        // Combine all results with scores
        [...customResults, ...localResults].forEach(item => {
            const nameLower = item.food.name.toLowerCase();
            if (!seenNames.has(nameLower)) {
                seenNames.add(nameLower);
                allResults.push(item);
            }
        });

        // Sort by score (highest first) and take top 8
        allResults.sort((a, b) => b.score - a.score);
        let results = allResults.slice(0, 8).map(item => item.food);

        // 2. Search OpenFoodFacts for Indonesian products first (if not enough results)
        if (results.length < 5) {
            hint.textContent = 'Mencari produk Indonesia...';
            try {
                const indonesianResults = await CalorieAPI.searchIndonesianFoods(query);
                if (indonesianResults.length > 0) {
                    const existingNames = results.map(r => r.name.toLowerCase());
                    const uniqueIndonesianResults = indonesianResults.filter(r => !existingNames.includes(r.name.toLowerCase()));
                    
                    // Prioritize Indonesian products - add them at the beginning
                    results = [...uniqueIndonesianResults, ...results].slice(0, 8);
                    hint.textContent = `${results.length} ditemukan`;
                }
            } catch (error) {
                console.error('OpenFoodFacts search error:', error);
            }
        }

        // 3. Search CalorieNinjas API as fallback (if still not enough results)
        if (CalorieAPI.isConfigured() && results.length < 3) {
            hint.textContent = 'Mencari...';
            try {
                const apiResults = await CalorieAPI.search(query);
                const existingNames = results.map(r => r.name.toLowerCase());
                const uniqueApiResults = apiResults.filter(r => !existingNames.includes(r.name.toLowerCase()));
                results = [...results, ...uniqueApiResults].slice(0, 8);
                hint.textContent = `${results.length} ditemukan`;
            } catch (error) {
                console.error('API error:', error);
            }
        }

        this.state.autocomplete.suggestions = results;
        this.state.autocomplete.selectedIndex = -1;

        if (results.length === 0) {
            suggestions.innerHTML = '<li class="autocomplete-no-results">Tidak ditemukan. Makanan akan disimpan otomatis.</li>';
            suggestions.classList.add('active');
            this.state.autocomplete.isOpen = true;
            hint.textContent = '';
            return;
        }

        suggestions.innerHTML = results.map((food, index) => `
            <li class="autocomplete-item ${food.source === 'api' ? 'from-api' : ''} ${food.source === 'custom' ? 'from-custom' : ''}" data-index="${index}">
                <span class="autocomplete-item-name">
                    ${this.highlightMatch(food.name, query)}
                    ${food.source === 'api' ? '<span class="api-badge">API</span>' : ''}
                    ${food.source === 'custom' ? '<span class="custom-badge">Saya</span>' : ''}
                </span>
                <div class="autocomplete-item-info">
                    <span class="autocomplete-item-calories">${food.calories} kcal</span>
                    <span class="autocomplete-item-portion">${food.portion}</span>
                </div>
                ${food.source === 'custom' ? `<button class="delete-custom-food" data-name="${this.escapeHtml(food.name)}" title="Hapus dari daftar saya">&times;</button>` : ''}
            </li>
        `).join('');

        // Bind click events for selecting items
        suggestions.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't select if clicking delete button
                if (e.target.classList.contains('delete-custom-food')) return;
                this.selectAutocompleteItem(parseInt(item.dataset.index));
            });
        });

        // Bind delete button events for custom foods
        suggestions.querySelectorAll('.delete-custom-food').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const foodName = btn.dataset.name;

                const confirmed = await this.showConfirm({
                    title: 'Hapus Makanan?',
                    message: `"${foodName}" akan dihapus dari daftar makanan Anda dan tidak akan muncul di saran lagi.`,
                    confirmText: 'Hapus',
                    cancelText: 'Batal',
                    type: 'warning'
                });

                if (confirmed) {
                    Storage.deleteCustomFood(foodName);
                    this.showToast(`"${foodName}" dihapus dari daftar Anda`, 'success');
                    // Refresh suggestions
                    this.handleAutocompleteSearch(this.elements.foodNameInput.value);
                }
            });
        });

        suggestions.classList.add('active');
        this.state.autocomplete.isOpen = true;
        hint.textContent = `${results.length} ditemukan`;
    },

    handleAutocompleteKeydown(e) {
        const { suggestions, selectedIndex, isOpen } = this.state.autocomplete;
        if (!isOpen || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.moveAutocompleteSelection(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.moveAutocompleteSelection(-1);
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    this.selectAutocompleteItem(selectedIndex);
                }
                break;
            case 'Escape':
                this.closeAutocomplete();
                break;
        }
    },

    moveAutocompleteSelection(direction) {
        const { suggestions, selectedIndex } = this.state.autocomplete;
        const items = this.elements.foodSuggestions.querySelectorAll('.autocomplete-item');

        if (selectedIndex >= 0 && items[selectedIndex]) {
            items[selectedIndex].classList.remove('selected');
        }

        let newIndex = selectedIndex + direction;
        if (newIndex < 0) newIndex = suggestions.length - 1;
        if (newIndex >= suggestions.length) newIndex = 0;

        if (items[newIndex]) {
            items[newIndex].classList.add('selected');
            items[newIndex].scrollIntoView({ block: 'nearest' });
        }

        this.state.autocomplete.selectedIndex = newIndex;
    },

    selectAutocompleteItem(index) {
        const food = this.state.autocomplete.suggestions[index];
        if (!food) return;

        this.elements.foodNameInput.value = food.name;
        this.elements.foodCaloriesInput.value = food.calories;
        this.elements.foodHint.textContent = food.portion;
        this.closeAutocomplete();
        this.elements.foodCaloriesInput.focus();
    },

    closeAutocomplete() {
        this.elements.foodSuggestions.classList.remove('active');
        this.state.autocomplete.isOpen = false;
        this.state.autocomplete.selectedIndex = -1;
    },

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    },

    /**
     * Check daily reset
     */
    checkDailyReset() {
        const wasReset = Storage.checkAndResetDaily();
        if (wasReset) {
            // Show notification that a new day has started
            setTimeout(() => {
                this.showToast('Hari baru dimulai! Data kemarin sudah disimpan ke riwayat.', 'info');
            }, 500);
        }
    },

    /**
     * Load saved data
     */
    loadSavedData() {
        const profile = Storage.getProfile();
        const goal = Storage.getGoal();

        if (profile) {
            this.state.profile = profile;
            this.state.calculations = Calculator.calculateAll(profile);
            this.populateProfileForm(profile);
            this.showProfileDisplay(profile);
            this.showResults();
            this.showAllSections();

            if (goal) {
                this.state.goal = goal;
                this.state.targetCalories = Calculator.calculateTargetCalories(
                    this.state.calculations.tdee,
                    goal.goalType,
                    goal.customCalories
                );
                this.showGoalDisplay();
            } else {
                this.state.targetCalories = this.state.calculations.tdee;
                this.showGoalForm();
            }

            this.loadFoods();
            this.updateDashboard();
            this.loadWeightProgress();
            this.loadBodyMeasurements();
            this.loadHistory();
            this.loadTemplates();
            this.updateGeneratorMaxCalories();
        }
    },

    showAllSections() {
        this.elements.goalSection.style.display = 'block';
        this.elements.dashboardSection.style.display = 'block';
        this.elements.foodSection.style.display = 'block';
        this.elements.generatorSection.style.display = 'block';
        this.elements.scannerSection.style.display = 'block';
        this.elements.weightSection.style.display = 'block';
        this.elements.measurementsSection.style.display = 'block';
        this.elements.historySection.style.display = 'block';
    },

    /**
     * Handle profile submit
     */
    handleProfileSubmit() {
        const profile = {
            gender: this.elements.genderInput.value,
            age: parseInt(this.elements.ageInput.value),
            height: parseFloat(this.elements.heightInput.value),
            weight: parseFloat(this.elements.weightInput.value),
            activity: this.elements.activityInput.value
        };

        if (!this.validateProfile(profile)) return;

        Storage.saveProfile(profile);
        this.state.profile = profile;
        this.state.calculations = Calculator.calculateAll(profile);
        this.state.targetCalories = this.state.calculations.tdee;

        this.showProfileDisplay(profile);
        this.showResults();
        this.showAllSections();
        this.showGoalForm();
        this.updateDashboard();
        this.updateGeneratorMaxCalories();
    },

    validateProfile(profile) {
        if (!profile.gender) { this.showToast('Pilih jenis kelamin', 'error'); return false; }
        if (!profile.age || profile.age < 10 || profile.age > 120) { this.showToast('Umur: 10-120 tahun', 'error'); return false; }
        if (!profile.height || profile.height < 100 || profile.height > 250) { this.showToast('Tinggi: 100-250 cm', 'error'); return false; }
        if (!profile.weight || profile.weight < 30 || profile.weight > 300) { this.showToast('Berat: 30-300 kg', 'error'); return false; }
        if (!profile.activity) { this.showToast('Pilih level aktivitas', 'error'); return false; }
        return true;
    },

    populateProfileForm(profile) {
        this.elements.genderInput.value = profile.gender || '';
        this.elements.ageInput.value = profile.age || '';
        this.elements.heightInput.value = profile.height || '';
        this.elements.weightInput.value = profile.weight || '';
        this.elements.activityInput.value = profile.activity || '';
    },

    showProfileForm() {
        this.elements.profileForm.style.display = 'block';
        this.elements.profileDisplay.style.display = 'none';
        this.elements.editProfileBtn.style.display = 'none';
    },

    showProfileDisplay(profile) {
        this.elements.displayGender.textContent = profile.gender === 'male' ? 'Pria' : 'Wanita';
        this.elements.displayAge.textContent = `${profile.age} tahun`;
        this.elements.displayHeight.textContent = `${profile.height} cm`;
        this.elements.displayWeight.textContent = `${profile.weight} kg`;
        this.elements.profileForm.style.display = 'none';
        this.elements.profileDisplay.style.display = 'block';
        this.elements.editProfileBtn.style.display = 'block';
    },

    showResults() {
        const { bmi, bmiCategory, tdee } = this.state.calculations;
        const { height, weight } = this.state.profile;

        this.elements.bmiValue.textContent = bmi;
        this.elements.bmiCategory.textContent = bmiCategory.label;
        this.elements.bmiCategory.style.color = `var(--${bmiCategory.color})`;
        this.elements.tdeeValue.textContent = tdee.toLocaleString('id-ID');

        const indicatorPosition = Calculator.getBMIIndicatorPosition(bmi);
        this.elements.bmiIndicator.style.left = `${indicatorPosition}%`;

        const idealWeight = Calculator.getIdealWeightRange(height);
        this.elements.idealHeight.textContent = height;
        this.elements.idealWeightMin.textContent = idealWeight.min;
        this.elements.idealWeightMax.textContent = idealWeight.max;
        this.updateWeightDiffMessage(weight, idealWeight);

        this.elements.resultsSection.style.display = 'block';
    },

    updateWeightDiffMessage(currentWeight, idealWeight) {
        const diffEl = this.elements.weightDiffMessage;
        if (currentWeight < idealWeight.min) {
            const diff = (idealWeight.min - currentWeight).toFixed(1);
            diffEl.textContent = `Perlu naik ${diff} kg`;
            diffEl.className = 'ideal-weight-diff need-gain';
        } else if (currentWeight > idealWeight.max) {
            const diff = (currentWeight - idealWeight.max).toFixed(1);
            diffEl.textContent = `Perlu turun ${diff} kg`;
            diffEl.className = 'ideal-weight-diff need-lose';
        } else {
            diffEl.textContent = 'Berat ideal!';
            diffEl.className = 'ideal-weight-diff ideal';
        }
    },

    /**
     * Goal handling
     */
    handleGoalSubmit() {
        const goal = {
            goalType: this.elements.goalTypeInput.value,
            targetWeight: parseFloat(this.elements.targetWeightInput.value) || null,
            customCalories: parseInt(this.elements.customCaloriesInput.value) || null
        };

        Storage.saveGoal(goal);
        this.state.goal = goal;
        this.state.targetCalories = Calculator.calculateTargetCalories(
            this.state.calculations.tdee,
            goal.goalType,
            goal.customCalories
        );

        this.showGoalDisplay();
        this.updateDashboard();
        this.updateGeneratorMaxCalories();
        this.showToast('Goal berhasil disimpan', 'success');
    },

    showGoalForm() {
        this.elements.goalForm.style.display = 'block';
        this.elements.goalDisplay.style.display = 'none';

        if (this.state.goal) {
            this.elements.goalTypeInput.value = this.state.goal.goalType || 'maintenance';
            this.elements.targetWeightInput.value = this.state.goal.targetWeight || '';
            this.elements.customCaloriesInput.value = this.state.goal.customCalories || '';
        }
    },

    showGoalDisplay() {
        this.elements.goalForm.style.display = 'none';
        this.elements.goalDisplay.style.display = 'block';

        this.elements.displayTargetCalories.textContent = this.state.targetCalories.toLocaleString('id-ID');

        if (this.state.goal.targetWeight) {
            this.elements.displayTargetWeight.textContent = `${this.state.goal.targetWeight} kg`;

            const estimate = Calculator.estimateGoalTime(
                this.state.profile.weight,
                this.state.goal.targetWeight,
                this.state.goal.goalType
            );

            if (estimate && !estimate.error) {
                this.elements.displayGoalTime.textContent = `${estimate.weeks} minggu`;
                this.elements.displayGoalDate.textContent = estimate.targetDate;
            } else {
                this.elements.displayGoalTime.textContent = '-';
                this.elements.displayGoalDate.textContent = '-';
            }
        } else {
            this.elements.displayTargetWeight.textContent = '-';
            this.elements.displayGoalTime.textContent = '-';
            this.elements.displayGoalDate.textContent = '-';
        }
    },

    /**
     * Dashboard
     */
    updateCurrentDate() {
        const options = {
            timeZone: 'Asia/Jakarta',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        this.elements.currentDate.textContent = new Date().toLocaleDateString('id-ID', options);
    },

    updateDashboard() {
        if (!this.state.calculations) return;

        const consumed = Storage.getTotalCalories();
        const target = this.state.targetCalories;
        const remaining = Math.max(0, target - consumed);
        const percentage = Math.min(100, Math.round((consumed / target) * 100));

        this.elements.consumedCalories.textContent = consumed.toLocaleString('id-ID');
        this.elements.targetCalories.textContent = target.toLocaleString('id-ID');
        this.elements.remainingCalories.textContent = remaining.toLocaleString('id-ID');
        this.elements.percentageConsumed.textContent = `${percentage}%`;

        this.updateProgressRing(percentage, consumed > target);
        this.updateStatusMessage(consumed, target);
    },

    updateProgressRing(percentage, isOver) {
        const ring = this.elements.progressRing;
        const circumference = 2 * Math.PI * 65;
        const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;

        ring.classList.remove('warning', 'danger');
        if (isOver) ring.classList.add('danger');
        else if (percentage >= 80) ring.classList.add('warning');
    },

    updateStatusMessage(consumed, target) {
        const status = Calculator.getCalorieStatus(consumed, target);
        this.elements.statusMessage.querySelector('.status-icon').textContent = status.icon;
        this.elements.statusMessage.querySelector('.status-text').textContent = status.message;
        this.elements.statusMessage.className = `status-message ${status.type !== 'default' ? status.type : ''}`;
    },

    /**
     * Water tracking
     */
    loadWaterIntake() {
        const current = Storage.getWaterIntake();
        this.updateWaterDisplay(current);

        if (this.state.profile) {
            const recommended = Calculator.getRecommendedWater(this.state.profile.weight);
            this.elements.waterTarget.textContent = recommended.glasses;
        }
    },

    addWater(glasses) {
        const newTotal = Storage.addWater(glasses);
        this.updateWaterDisplay(newTotal);
    },

    removeWater(glasses) {
        const newTotal = Storage.removeWater(glasses);
        this.updateWaterDisplay(newTotal);
    },

    updateWaterDisplay(current) {
        const target = parseInt(this.elements.waterTarget.textContent) || 8;
        this.elements.waterCurrent.textContent = current;
        this.elements.waterMl.textContent = (current * 250).toLocaleString('id-ID');

        const percentage = Math.min(100, (current / target) * 100);
        this.elements.waterBarFill.style.width = `${percentage}%`;
    },

    /**
     * Food handling
     */
    handleFoodSubmit() {
        const name = this.elements.foodNameInput.value.trim();
        const calories = parseInt(this.elements.foodCaloriesInput.value);

        if (!name || !calories || calories < 1) {
            this.showToast('Masukkan nama dan kalori', 'warning');
            return;
        }

        // Add food to daily list
        Storage.addFood({ name, calories });

        // Check if this food is from our database or custom
        const isInDatabase = FoodsDB.search(name, 1).some(f => f.name.toLowerCase() === name.toLowerCase());
        const isCustomFood = Storage.getCustomFood(name);

        // If not in database, save as custom food for future suggestions
        if (!isInDatabase) {
            Storage.saveCustomFood({ name, calories });
            if (!isCustomFood) {
                this.showToast(`"${name}" ditambahkan ke makanan Anda`, 'success');
            } else {
                this.showToast(`"${name}" berhasil dicatat`, 'success');
            }
        } else {
            this.showToast(`"${name}" berhasil dicatat`, 'success');
        }

        this.elements.foodNameInput.value = '';
        this.elements.foodCaloriesInput.value = '';
        this.elements.foodHint.textContent = '';
        this.closeAutocomplete();
        this.elements.foodNameInput.focus();

        this.loadFoods();
        this.updateDashboard();
        this.loadHistory();
    },

    loadFoods() {
        const foods = Storage.getFoods();
        this.elements.foodList.innerHTML = '';

        if (foods.length === 0) {
            this.elements.emptyFoodMessage.style.display = 'block';
            this.elements.clearFoodsBtn.style.display = 'none';
        } else {
            this.elements.emptyFoodMessage.style.display = 'none';
            this.elements.clearFoodsBtn.style.display = 'block';
            foods.forEach(food => {
                this.elements.foodList.appendChild(this.createFoodItem(food));
            });
        }
    },

    createFoodItem(food) {
        const li = document.createElement('li');
        li.className = 'food-item';
        li.innerHTML = `
            <div class="food-info">
                <span class="food-name">${this.escapeHtml(food.name)}</span>
                <span class="food-calories"><span>${food.calories}</span> kcal</span>
            </div>
            <button class="delete-food-btn" title="Hapus">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        `;
        li.querySelector('.delete-food-btn').addEventListener('click', async () => {
            const foodName = food.name;
            const confirmed = await this.showConfirm({
                title: 'Hapus Makanan?',
                message: `"${foodName}" akan dihapus dari daftar hari ini.`,
                confirmText: 'Hapus',
                cancelText: 'Batal',
                type: 'danger'
            });

            if (confirmed) {
                Storage.removeFood(food.id);
                this.loadFoods();
                this.updateDashboard();
                this.loadHistory();
                this.showToast(`"${foodName}" dihapus dari daftar`, 'success');
            }
        });
        return li;
    },

    async handleClearFoods() {
        const foodCount = Storage.getFoods().length;
        if (foodCount === 0) {
            this.showToast('Tidak ada makanan untuk dihapus', 'warning');
            return;
        }

        const confirmed = await this.showConfirm({
            title: 'Hapus Semua Makanan?',
            message: `${foodCount} makanan akan dihapus dari daftar hari ini. Tindakan ini tidak dapat dibatalkan.`,
            confirmText: 'Hapus Semua',
            cancelText: 'Batal',
            type: 'danger'
        });

        if (confirmed) {
            Storage.clearFoods();
            this.loadFoods();
            this.updateDashboard();
            this.loadHistory();
            this.showToast(`${foodCount} makanan berhasil dihapus`, 'success');
        }
    },

    /**
     * Weight progress
     */
    handleAddWeight() {
        const weight = parseFloat(this.elements.weightInputField.value);
        if (!weight || weight < 30 || weight > 300) {
            this.showToast('Masukkan berat yang valid (30-300 kg)', 'warning');
            return;
        }

        Storage.addWeightEntry(weight);
        this.elements.weightInputField.value = '';
        this.loadWeightProgress();
        this.showToast(`Berat ${weight} kg berhasil dicatat`, 'success');
    },

    loadWeightProgress() {
        const progress = Storage.getWeightProgress();
        const log = Storage.getWeightLog();

        if (!progress) {
            this.elements.weightStats.style.display = 'none';
            this.elements.weightChartContainer.innerHTML = '<p class="empty-message">Belum ada data berat badan.</p>';
            return;
        }

        this.elements.weightStats.style.display = 'grid';
        this.elements.startWeight.textContent = `${progress.startWeight} kg`;
        this.elements.currentWeightDisplay.textContent = `${progress.currentWeight} kg`;

        const changeEl = this.elements.weightChange;
        const sign = progress.change > 0 ? '+' : '';
        changeEl.textContent = `${sign}${progress.change.toFixed(1)} kg`;
        changeEl.className = 'weight-stat-value ' + (progress.change > 0 ? 'positive' : progress.change < 0 ? 'negative' : '');

        // Chart
        const last7 = log.slice(-7);
        if (last7.length > 0) {
            const maxWeight = Math.max(...last7.map(e => e.weight));
            const minWeight = Math.min(...last7.map(e => e.weight));
            const range = maxWeight - minWeight || 1;

            this.elements.weightChartContainer.innerHTML = `
                <div class="chart-bars">
                    ${last7.map(entry => {
                const height = ((entry.weight - minWeight) / range) * 80 + 20;
                const date = new Date(entry.date);
                return `
                            <div class="chart-bar-item">
                                <span class="chart-bar-value">${entry.weight}</span>
                                <div class="chart-bar" style="height: ${height}px;"></div>
                                <span class="chart-bar-label">${date.getDate()}/${date.getMonth() + 1}</span>
                            </div>
                        `;
            }).join('')}
                </div>
            `;
        }
    },

    /**
     * Body measurements
     */
    toggleMeasurementForm() {
        const form = this.elements.measurementForm;
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    },

    handleMeasurementSubmit() {
        const measurements = {
            waist: parseFloat(this.elements.waistInput.value) || null,
            chest: parseFloat(this.elements.chestInput.value) || null,
            arm: parseFloat(this.elements.armInput.value) || null,
            thigh: parseFloat(this.elements.thighInput.value) || null,
            hip: parseFloat(this.elements.hipInput.value) || null,
            neck: parseFloat(this.elements.neckInput.value) || null
        };

        Storage.addBodyMeasurement(measurements);
        this.elements.measurementForm.style.display = 'none';
        this.loadBodyMeasurements();
        this.showToast('Ukuran tubuh berhasil disimpan', 'success');
    },

    loadBodyMeasurements() {
        const latest = Storage.getLatestBodyMeasurement();
        const all = Storage.getBodyMeasurements();

        if (!latest) {
            this.elements.measurementDisplay.innerHTML = '<p class="empty-message">Belum ada data ukuran tubuh.</p>';
            this.elements.measurementHistory.style.display = 'none';
            return;
        }

        const fields = [
            { key: 'waist', label: 'Pinggang' },
            { key: 'chest', label: 'Dada' },
            { key: 'arm', label: 'Lengan' },
            { key: 'thigh', label: 'Paha' },
            { key: 'hip', label: 'Pinggul' },
            { key: 'neck', label: 'Leher' }
        ];

        this.elements.measurementDisplay.innerHTML = `
            <div class="measurement-grid">
                ${fields.map(f => `
                    <div class="measurement-item">
                        <span class="measurement-label">${f.label}</span>
                        <span class="measurement-value">${latest[f.key] || '-'}</span>
                        <span class="measurement-unit">cm</span>
                    </div>
                `).join('')}
            </div>
        `;

        if (all.length > 1) {
            this.elements.measurementHistory.style.display = 'block';
            this.elements.measurementHistoryList.innerHTML = all.slice(-5).reverse().map(m => `
                <div class="measurement-history-item">
                    <span>${new Date(m.date).toLocaleDateString('id-ID')}</span>
                    <span>P: ${m.waist || '-'} | D: ${m.chest || '-'} | L: ${m.arm || '-'}</span>
                </div>
            `).join('');
        }
    },

    /**
     * History
     */
    loadHistory() {
        const history = Storage.getCalorieHistory(7);
        const target = this.state.targetCalories;

        // Chart
        const maxCal = Math.max(...history.map(h => h.calories), target);
        this.elements.calorieChartBars.innerHTML = history.map(h => {
            const height = maxCal > 0 ? (h.calories / maxCal) * 100 : 0;
            const isOver = h.calories > target;
            return `
                <div class="chart-bar-item">
                    <span class="chart-bar-value">${h.calories}</span>
                    <div class="chart-bar" style="height: ${height}px; background: ${isOver ? 'var(--danger)' : 'var(--primary)'};"></div>
                    <span class="chart-bar-label">${h.dayName}</span>
                </div>
            `;
        }).join('');

        // List
        const foodHistory = Storage.getFoodsHistory();
        const dates = Object.keys(foodHistory).sort().reverse().slice(0, 7);

        if (dates.length === 0) {
            this.elements.historyList.innerHTML = '<p class="empty-message">Belum ada riwayat.</p>';
            return;
        }

        this.elements.historyList.innerHTML = dates.map(date => {
            const foods = foodHistory[date];
            const total = foods.reduce((sum, f) => sum + f.calories, 0);
            const dateObj = new Date(date);
            return `
                <div class="history-day">
                    <div class="history-day-header">
                        <span class="history-day-date">${dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                        <span class="history-day-total">${total} kcal</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Templates
     */
    toggleTemplatesPanel() {
        const panel = this.elements.templatesPanel;
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },

    showTemplateModal() {
        const foods = Storage.getFoods();
        if (foods.length === 0) {
            this.showToast('Tidak ada makanan untuk disimpan sebagai template', 'warning');
            return;
        }
        this.elements.templateModal.style.display = 'flex';
    },

    hideTemplateModal() {
        this.elements.templateModal.style.display = 'none';
        this.elements.templateNameInput.value = '';
    },

    saveTemplate() {
        const name = this.elements.templateNameInput.value.trim();
        if (!name) {
            this.showToast('Masukkan nama template', 'warning');
            return;
        }

        const foods = Storage.getFoods().map(f => ({ name: f.name, calories: f.calories }));
        Storage.saveMealTemplate({ name, foods });
        this.hideTemplateModal();
        this.loadTemplates();
        this.showToast(`Template "${name}" berhasil disimpan`, 'success');
    },

    loadTemplates() {
        const templates = Storage.getMealTemplates();

        if (templates.length === 0) {
            this.elements.templatesList.innerHTML = '<p class="empty-message">Belum ada template.</p>';
            return;
        }

        this.elements.templatesList.innerHTML = templates.map(t => `
            <div class="template-item">
                <div class="template-info">
                    <span class="template-name">${this.escapeHtml(t.name)}</span>
                    <span class="template-calories">${t.totalCalories} kcal (${t.foods.length} item)</span>
                </div>
                <div class="template-actions">
                    <button class="btn btn-success btn-small" data-id="${t.id}" data-action="apply">Pakai</button>
                    <button class="btn btn-danger btn-small" data-id="${t.id}" data-action="delete">Hapus</button>
                </div>
            </div>
        `).join('');

        this.elements.templatesList.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const templates = Storage.getMealTemplates();
                const template = templates.find(t => t.id === id);
                const templateName = template ? template.name : 'Template';

                if (btn.dataset.action === 'apply') {
                    Storage.applyMealTemplate(id);
                    this.loadFoods();
                    this.updateDashboard();
                    this.loadHistory();
                    this.showToast(`Template "${templateName}" diterapkan`, 'success');
                } else {
                    Storage.deleteMealTemplate(id);
                    this.loadTemplates();
                    this.showToast(`Template "${templateName}" dihapus`, 'info');
                }
            });
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // ==================== THEME ====================

    /**
     * Initialize theme on app load
     */
    initTheme() {
        const isAuto = Storage.isThemeAuto();

        if (isAuto) {
            this.applyAutoTheme();
            // Check every 30 minutes for time-based switching
            setInterval(() => this.applyAutoTheme(), 30 * 60 * 1000);
        } else {
            const savedTheme = Storage.getThemeMode();
            this.applyTheme(savedTheme);
        }
    },

    /**
     * Apply theme based on time (auto mode)
     * Dark mode: 18:00 - 06:00 (6 PM - 6 AM)
     */
    applyAutoTheme() {
        const options = { timeZone: 'Asia/Jakarta', hour: 'numeric', hour12: false };
        const hour = parseInt(new Date().toLocaleString('en-US', options).split(',')[1]);
        const theme = (hour >= 18 || hour < 6) ? 'dark' : 'light';
        this.applyTheme(theme);
    },

    /**
     * Apply theme to document
     * @param {string} theme - 'light' or 'dark'
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update icons
        if (theme === 'dark') {
            this.elements.themeIconSun.style.display = 'none';
            this.elements.themeIconMoon.style.display = 'block';
        } else {
            this.elements.themeIconSun.style.display = 'block';
            this.elements.themeIconMoon.style.display = 'none';
        }

        // Update meta theme-color for mobile browsers
        document.querySelector('meta[name="theme-color"]').setAttribute(
            'content',
            theme === 'dark' ? '#1e293b' : '#2ecc71'
        );
    },

    /**
     * Toggle theme manually
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Disable auto mode when manually toggling
        Storage.setThemeAuto(false);
        Storage.setThemeMode(newTheme);
        this.applyTheme(newTheme);

        this.showToast(
            `Mode ${newTheme === 'dark' ? 'gelap' : 'terang'} aktif`,
            'info'
        );
    },

    // ==================== BARCODE SCANNER ====================

    /**
     * Bind scanner events
     */
    bindScannerEvents() {
        this.elements.startScannerBtn?.addEventListener('click', () => this.startBarcodeScanner());
        this.elements.closeScannerBtn?.addEventListener('click', () => this.stopBarcodeScanner());
        this.elements.addScannedFood?.addEventListener('click', () => this.addScannedFoodToDaily());
        this.elements.cancelScanned?.addEventListener('click', () => this.cancelScanResult());
        this.elements.saveManualProduct?.addEventListener('click', () => this.saveManualProduct());
        this.elements.cancelManual?.addEventListener('click', () => this.cancelManualInput());
    },

    /**
     * Start barcode scanner
     */
    async startBarcodeScanner() {
        try {
            // Check if camera is available
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasCamera = devices.some(device => device.kind === 'videoinput');

            if (!hasCamera) {
                this.showToast('Kamera tidak ditemukan', 'error');
                return;
            }

            // Show scanner container
            this.elements.scannerContainer.style.display = 'block';
            this.elements.startScannerBtn.style.display = 'none';
            this.elements.scannerResult.style.display = 'none';
            this.elements.manualInputContainer.style.display = 'none';

            // Initialize Html5QrcodeScanner
            const html5QrCode = new Html5Qrcode("scanner-reader");
            this.state.scanner.html5QrCode = html5QrCode;
            this.state.scanner.isScanning = true;

            // Start scanning with barcode support
            await html5QrCode.start(
                { facingMode: "environment" }, // Back camera
                {
                    fps: 10,
                    qrbox: { width: 250, height: 150 },
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.EAN_13,  // 0
                        Html5QrcodeSupportedFormats.EAN_8,   // 1
                        Html5QrcodeSupportedFormats.UPC_A,   // 3
                        Html5QrcodeSupportedFormats.UPC_E,   // 4
                        Html5QrcodeSupportedFormats.CODE_128, // 6
                        Html5QrcodeSupportedFormats.CODE_39   // 7
                    ]
                },
                (decodedText) => {
                    // Success callback - stop scanner and process
                    this.handleBarcodeScanned(decodedText);
                },
                (errorMessage) => {
                    // Error callback (can be ignored, happens frequently during scanning)
                }
            ).catch((err) => {
                console.error('Error starting scanner:', err);
                this.showToast('Gagal memulai scanner', 'error');
                this.stopBarcodeScanner();
            });
        } catch (error) {
            console.error('Scanner error:', error);
            this.showToast('Gagal membuka kamera: ' + error.message, 'error');
            this.stopBarcodeScanner();
        }
    },

    /**
     * Stop barcode scanner
     */
    async stopBarcodeScanner() {
        if (this.state.scanner.html5QrCode && this.state.scanner.isScanning) {
            try {
                await this.state.scanner.html5QrCode.stop();
                this.state.scanner.html5QrCode.clear();
            } catch (error) {
                console.error('Error stopping scanner:', error);
            }
        }

        this.state.scanner.html5QrCode = null;
        this.state.scanner.isScanning = false;
        this.elements.scannerContainer.style.display = 'none';
        this.elements.startScannerBtn.style.display = 'block';
    },

    /**
     * Handle barcode scanned
     */
    async handleBarcodeScanned(barcode) {
        // Stop scanner
        await this.stopBarcodeScanner();

        // Check if already in custom foods
        const customFood = Storage.getCustomFoodByBarcode(barcode);
        if (customFood) {
            this.showScannedProduct(customFood, barcode);
            return;
        }

        // Show loading
        this.showToast('Mencari produk...', 'info');

        // Search OpenFoodFacts API with Indonesia country preference
        try {
            // Try Indonesia product first (country code: id)
            let response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json?countries_tags_en=indonesia`);
            let data = await response.json();
            
            // If not found in Indonesia, try general search
            if (data.status !== 1 || !data.product) {
                response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
                data = await response.json();
            }

            console.log('OpenFoodFacts API Response:', data);

            if (data.status === 1 && data.product) {
                const product = data.product;
                const nutriments = product.nutriments || {};

                // Extract nutrition info - try multiple formats
                let calories = 0;
                
                // Try different calorie formats from OpenFoodFacts
                if (nutriments['energy-kcal_100g']) {
                    calories = Math.round(nutriments['energy-kcal_100g']);
                } else if (nutriments['energy-kcal']) {
                    calories = Math.round(nutriments['energy-kcal']);
                } else if (nutriments['energy-kcal_value']) {
                    calories = Math.round(nutriments['energy-kcal_value']);
                } else if (nutriments['energy_100g']) {
                    // Convert kJ to kcal (1 kcal = 4.184 kJ)
                    calories = Math.round(nutriments['energy_100g'] / 4.184);
                } else if (nutriments['energy']) {
                    calories = Math.round(nutriments['energy'] / 4.184);
                } else if (nutriments['energy-kcal_serving']) {
                    // Per serving
                    const servingSize = product.serving_size || 100;
                    calories = Math.round((nutriments['energy-kcal_serving'] / servingSize) * 100);
                } else if (nutriments['energy_serving']) {
                    const servingSize = product.serving_size || 100;
                    calories = Math.round((nutriments['energy_serving'] / 4.184 / servingSize) * 100);
                }

                // Get product name
                const productName = product.product_name || 
                                   product.product_name_en || 
                                   product.product_name_id ||
                                   product.abbreviated_product_name ||
                                   `Produk ${barcode}`;

                // Get brand
                const brand = product.brands || 
                             product.brand || 
                             product.brands_tags?.[0] ||
                             '';

                // Get portion info
                const servingSize = product.serving_size || 100;
                const portion = servingSize === 100 ? '100g' : `${servingSize}g`;

                // If calories found, show product with calories
                if (calories > 0) {
                    const food = {
                        name: productName,
                        calories: calories,
                        portion: portion,
                        brand: brand,
                        barcode: barcode,
                        source: 'barcode'
                    };

                    // Save to custom foods
                    Storage.saveCustomFoodWithBarcode(food);

                    // Show product
                    this.showScannedProduct(food, barcode);
                } else {
                    // Product found but no calorie data - show with manual input option
                    console.log('Product found but no calorie data:', product);
                    this.showProductWithManualCalorie(productName, brand, barcode);
                }
            } else {
                // Product not found in API
                console.log('Product not found in OpenFoodFacts:', barcode);
                this.showManualBarcodeInput(barcode);
            }
        } catch (error) {
            console.error('API error:', error);
            this.showToast('Gagal mengambil data produk: ' + error.message, 'error');
            this.showManualBarcodeInput(barcode);
        }
    },

    /**
     * Show scanned product result
     */
    showScannedProduct(product, barcode) {
        this.state.scanner.scannedProduct = { ...product, barcode };

        this.elements.productName.textContent = product.name;
        this.elements.productBrand.textContent = product.brand || 'Tidak diketahui';
        this.elements.productCalories.textContent = product.calories;
        this.elements.productPortion.textContent = product.portion || '100g';

        this.elements.scannerResult.style.display = 'block';
        this.elements.manualInputContainer.style.display = 'none';
    },

    /**
     * Show product found but without calorie data - allow manual input
     */
    showProductWithManualCalorie(productName, brand, barcode) {
        // Update title and description
        const titleEl = document.getElementById('manual-input-title');
        const descEl = document.getElementById('manual-input-description');
        if (titleEl) titleEl.textContent = 'Produk Ditemukan';
        if (descEl) descEl.textContent = 'Produk ditemukan tapi data kalori tidak tersedia. Silakan input kalori secara manual.';
        
        this.elements.manualProductName.value = productName;
        this.elements.manualProductCalories.value = '';
        this.state.scanner.scannedProduct = { 
            name: productName,
            brand: brand,
            barcode: barcode 
        };
        
        this.elements.scannerResult.style.display = 'none';
        this.elements.manualInputContainer.style.display = 'block';
        this.elements.manualProductCalories.focus();
        
        this.showToast('Produk ditemukan tapi data kalori tidak tersedia. Silakan input manual.', 'info');
    },

    /**
     * Show manual input when product not found
     */
    showManualBarcodeInput(barcode) {
        // Update title and description
        const titleEl = document.getElementById('manual-input-title');
        const descEl = document.getElementById('manual-input-description');
        if (titleEl) titleEl.textContent = 'Produk Tidak Ditemukan';
        if (descEl) descEl.textContent = 'Tambahkan informasi produk secara manual';
        
        this.elements.manualProductName.value = `Produk ${barcode}`;
        this.elements.manualProductCalories.value = '';
        this.state.scanner.scannedProduct = { barcode };
        
        this.elements.scannerResult.style.display = 'none';
        this.elements.manualInputContainer.style.display = 'block';
        this.elements.manualProductCalories.focus();
        
        this.showToast('Produk tidak ditemukan, tambahkan manual', 'warning');
    },

    /**
     * Add scanned food to daily list
     */
    addScannedFoodToDaily() {
        const product = this.state.scanner.scannedProduct;
        if (!product) return;

        Storage.addFood({
            name: product.name,
            calories: product.calories
        });

        this.loadFoods();
        this.updateDashboard();
        this.loadHistory();

        this.showToast(`"${product.name}" ditambahkan`, 'success');
        this.cancelScanResult();
    },

    /**
     * Cancel scan result
     */
    cancelScanResult() {
        this.elements.scannerResult.style.display = 'none';
        this.state.scanner.scannedProduct = null;
        this.elements.startScannerBtn.style.display = 'block';
    },

    /**
     * Save manual product
     */
    saveManualProduct() {
        const name = this.elements.manualProductName.value.trim();
        const calories = parseInt(this.elements.manualProductCalories.value);
        const scannedProduct = this.state.scanner.scannedProduct;
        const barcode = scannedProduct?.barcode;

        if (!name) {
            this.showToast('Masukkan nama produk', 'warning');
            return;
        }

        if (!calories || calories < 1) {
            this.showToast('Masukkan kalori yang valid', 'warning');
            return;
        }

        const food = {
            name: name,
            calories: calories,
            portion: '100g',
            brand: scannedProduct?.brand || '',
            barcode: barcode,
            source: 'barcode'
        };

        // Save to custom foods
        if (barcode) {
            Storage.saveCustomFoodWithBarcode(food);
        } else {
            // If no barcode, save as regular custom food
            Storage.saveCustomFood(food);
        }

        // Add to daily
        Storage.addFood({ name, calories });
        
        this.loadFoods();
        this.updateDashboard();
        this.loadHistory();
        
        this.showToast(`"${name}" disimpan dan ditambahkan`, 'success');
        this.cancelManualInput();
    },

    /**
     * Cancel manual input
     */
    cancelManualInput() {
        this.elements.manualInputContainer.style.display = 'none';
        this.state.scanner.scannedProduct = null;
        this.elements.startScannerBtn.style.display = 'block';
    },

    // ==================== TOAST NOTIFICATION ====================

    /**
     * Play notification sound based on type
     * @param {string} type - 'success', 'error', 'warning', 'info'
     */
    playNotificationSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Set volume
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

            // Different sounds for different types
            switch (type) {
                case 'success':
                    // Pleasant ascending two-tone
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                    oscillator.type = 'sine';
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.25);
                    break;

                case 'error':
                    // Low descending tone
                    oscillator.frequency.setValueAtTime(330, audioContext.currentTime); // E4
                    oscillator.frequency.setValueAtTime(262, audioContext.currentTime + 0.1); // C4
                    oscillator.type = 'square';
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;

                case 'warning':
                    // Alert beep (two quick beeps)
                    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
                    oscillator.type = 'triangle';
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.08);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + 0.12);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;

                case 'info':
                default:
                    // Soft notification ping
                    oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
                    oscillator.type = 'sine';
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
            }
        } catch (e) {
            // Audio not supported or blocked, silently fail
            console.log('Audio notification not available');
        }
    },

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duration in ms (default 3000)
     */
    showToast(message, type = 'info', duration = 3000) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        // Play notification sound
        this.playNotificationSound(type);

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                <span class="toast-message">${this.escapeHtml(message)}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        // Add to container
        this.elements.toastContainer.appendChild(toast);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => this.removeToast(toast), duration);
        }

        return toast;
    },

    /**
     * Remove toast with animation
     */
    removeToast(toast) {
        if (!toast || !toast.parentElement) return;

        toast.classList.add('toast-out');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    },

    /**
     * Show custom confirm dialog
     * @param {Object} options - Confirm options
     * @returns {Promise<boolean>}
     */
    showConfirm(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Konfirmasi',
                message = 'Apakah Anda yakin?',
                confirmText = 'Ya',
                cancelText = 'Batal',
                type = 'danger' // danger, warning, info
            } = options;

            // Set content
            this.elements.confirmTitle.textContent = title;
            this.elements.confirmMessage.textContent = message;
            this.elements.confirmOk.textContent = confirmText;
            this.elements.confirmCancel.textContent = cancelText;

            // Set icon style
            this.elements.confirmIcon.className = 'confirm-icon';
            if (type === 'warning') {
                this.elements.confirmIcon.classList.add('warning');
            } else if (type === 'info') {
                this.elements.confirmIcon.classList.add('info');
            }

            // Set button style
            this.elements.confirmOk.className = 'btn';
            if (type === 'danger') {
                this.elements.confirmOk.classList.add('btn-danger');
            } else if (type === 'warning') {
                this.elements.confirmOk.classList.add('btn-warning');
            } else {
                this.elements.confirmOk.classList.add('btn-primary');
            }

            // Play warning sound
            this.playNotificationSound('warning');

            // Show modal
            this.elements.confirmModal.style.display = 'flex';

            // Cleanup function
            const cleanup = () => {
                this.elements.confirmOk.removeEventListener('click', onConfirm);
                this.elements.confirmCancel.removeEventListener('click', onCancel);
                this.elements.confirmModal.removeEventListener('click', onBackdrop);
            };

            // Handlers
            const onConfirm = () => {
                cleanup();
                this.elements.confirmModal.style.display = 'none';
                resolve(true);
            };

            const onCancel = () => {
                cleanup();
                this.elements.confirmModal.style.display = 'none';
                resolve(false);
            };

            const onBackdrop = (e) => {
                if (e.target === this.elements.confirmModal) {
                    onCancel();
                }
            };

            // Attach listeners
            this.elements.confirmOk.addEventListener('click', onConfirm);
            this.elements.confirmCancel.addEventListener('click', onCancel);
            this.elements.confirmModal.addEventListener('click', onBackdrop);
        });
    },

    // ==================== FOOD GENERATOR ====================

    /**
     * Update generator max calories based on daily target
     */
    updateGeneratorMaxCalories() {
        if (this.elements.genTargetCalories && this.state.targetCalories) {
            this.elements.genTargetCalories.max = this.state.targetCalories;
            this.elements.genTargetCalories.placeholder = `Max ${this.state.targetCalories}`;
        }
    },

    /**
     * Bind generator events
     */
    bindGeneratorEvents() {
        // Generator form submit
        this.elements.generatorForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGeneratorSubmit();
        });

        // Select all / clear selection
        this.elements.selectAllFoods?.addEventListener('click', () => this.selectAllGeneratorFoods());
        this.elements.clearSelection?.addEventListener('click', () => this.clearGeneratorSelection());

        // Add selected foods
        this.elements.addSelectedFoods?.addEventListener('click', () => this.addSelectedFoodsToList());

        // Price modal
        this.elements.closePriceModal?.addEventListener('click', () => this.hidePriceModal());
        this.elements.confirmPriceEdit?.addEventListener('click', () => this.savePriceEdit());
        this.elements.resetPriceEdit?.addEventListener('click', () => this.resetPriceToDefault());

        // Close modal on backdrop click
        this.elements.priceModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.priceModal) {
                this.hidePriceModal();
            }
        });
    },

    /**
     * Handle generator form submit
     */
    handleGeneratorSubmit() {
        const targetCalories = parseInt(this.elements.genTargetCalories.value);
        const tolerance = parseInt(this.elements.genTolerance.value) / 100;
        const budgetMin = parseInt(this.elements.genBudgetMin.value) || 0;
        const budgetMax = parseInt(this.elements.genBudgetMax.value) || Infinity;

        if (!targetCalories || targetCalories < 50) {
            this.showToast('Masukkan target kalori minimal 50 kcal', 'warning');
            return;
        }

        // Validate against daily target calories
        const dailyTarget = this.state.targetCalories;
        if (targetCalories > dailyTarget) {
            this.showToast(`Target kalori tidak boleh melebihi target harian (${dailyTarget.toLocaleString('id-ID')} kcal)`, 'error');
            return;
        }

        // Calculate calorie range with tolerance
        const minCalories = targetCalories * (1 - tolerance);
        const maxCalories = targetCalories * (1 + tolerance);

        // Filter foods from database
        const results = this.generateFoodRecommendations(minCalories, maxCalories, budgetMin, budgetMax, targetCalories);

        // Store results
        this.state.generator.results = results;
        this.state.generator.selected.clear();

        // Display results
        this.displayGeneratorResults(results);
    },

    /**
     * Generate food recommendations based on criteria
     */
    generateFoodRecommendations(minCalories, maxCalories, budgetMin, budgetMax, targetCalories) {
        const allFoods = FoodsDB.getAll();

        const results = allFoods
            .filter(food => {
                // Filter by calorie range
                if (food.calories < minCalories || food.calories > maxCalories) {
                    return false;
                }

                // Get effective price (custom or default)
                const price = Storage.getEffectivePrice(food.name, food.price || 0);

                // Filter by budget range
                if (price < budgetMin || price > budgetMax) {
                    return false;
                }

                return true;
            })
            .map(food => {
                // Calculate how close to target
                const calorieDiff = Math.abs(food.calories - targetCalories);
                const matchPercentage = 100 - (calorieDiff / targetCalories * 100);
                const effectivePrice = Storage.getEffectivePrice(food.name, food.price || 0);
                const isCustomPrice = Storage.getCustomPrice(food.name) !== null;

                return {
                    ...food,
                    effectivePrice,
                    isCustomPrice,
                    matchPercentage: Math.max(0, matchPercentage),
                    calorieDiff
                };
            })
            .sort((a, b) => a.calorieDiff - b.calorieDiff); // Sort by closest to target

        return results;
    },

    /**
     * Display generator results
     */
    displayGeneratorResults(results) {
        this.elements.generatorResults.style.display = 'block';

        if (results.length === 0) {
            this.elements.generatorList.innerHTML = '';
            this.elements.generatorEmpty.style.display = 'block';
            this.elements.addSelectedFoods.style.display = 'none';
            this.updateGeneratorSummary();
            return;
        }

        this.elements.generatorEmpty.style.display = 'none';
        this.elements.addSelectedFoods.style.display = 'block';

        this.elements.generatorList.innerHTML = results.map((food, index) => `
            <li class="generator-item" data-index="${index}">
                <input type="checkbox" class="generator-item-checkbox" data-index="${index}">
                <div class="generator-item-info">
                    <span class="generator-item-name">
                        ${this.escapeHtml(food.name)}
                        ${this.getMatchIndicator(food.matchPercentage)}
                    </span>
                    <div class="generator-item-details">
                        <span class="generator-item-calories">${food.calories} kcal</span>
                        <span class="generator-item-portion">${food.portion}</span>
                    </div>
                </div>
                <div class="generator-item-price">
                    <span class="price-value ${food.isCustomPrice ? 'custom' : ''}">
                        Rp ${food.effectivePrice.toLocaleString('id-ID')}
                    </span>
                    <button class="edit-price-btn" data-food="${this.escapeHtml(food.name)}" data-price="${food.price}" title="Edit harga">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `).join('');

        // Bind events
        this.elements.generatorList.querySelectorAll('.generator-item').forEach(item => {
            const checkbox = item.querySelector('.generator-item-checkbox');
            const index = parseInt(item.dataset.index);

            // Click on item to toggle selection
            item.addEventListener('click', (e) => {
                if (e.target.closest('.edit-price-btn')) return;
                checkbox.checked = !checkbox.checked;
                this.toggleFoodSelection(index, checkbox.checked);
            });

            // Checkbox change
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            checkbox.addEventListener('change', () => {
                this.toggleFoodSelection(index, checkbox.checked);
            });
        });

        // Bind price edit buttons
        this.elements.generatorList.querySelectorAll('.edit-price-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const foodName = btn.dataset.food;
                const defaultPrice = parseInt(btn.dataset.price);
                this.showPriceModal(foodName, defaultPrice);
            });
        });

        this.updateGeneratorSummary();
    },

    /**
     * Get match indicator HTML based on percentage
     */
    getMatchIndicator(percentage) {
        if (percentage >= 95) {
            return '<span class="match-indicator exact">Exact</span>';
        } else if (percentage >= 80) {
            return '<span class="match-indicator close">Close</span>';
        } else {
            return '<span class="match-indicator far">~' + Math.round(percentage) + '%</span>';
        }
    },

    /**
     * Toggle food selection
     */
    toggleFoodSelection(index, isSelected) {
        const item = this.elements.generatorList.querySelector(`[data-index="${index}"]`);

        if (isSelected) {
            this.state.generator.selected.add(index);
            item?.classList.add('selected');
        } else {
            this.state.generator.selected.delete(index);
            item?.classList.remove('selected');
        }

        this.updateGeneratorSummary();
    },

    /**
     * Select all generator foods
     */
    selectAllGeneratorFoods() {
        this.state.generator.results.forEach((_, index) => {
            this.state.generator.selected.add(index);
        });

        this.elements.generatorList.querySelectorAll('.generator-item').forEach(item => {
            item.classList.add('selected');
            item.querySelector('.generator-item-checkbox').checked = true;
        });

        this.updateGeneratorSummary();
    },

    /**
     * Clear generator selection
     */
    clearGeneratorSelection() {
        this.state.generator.selected.clear();

        this.elements.generatorList.querySelectorAll('.generator-item').forEach(item => {
            item.classList.remove('selected');
            item.querySelector('.generator-item-checkbox').checked = false;
        });

        this.updateGeneratorSummary();
    },

    /**
     * Update generator summary
     */
    updateGeneratorSummary() {
        const results = this.state.generator.results;
        const selected = this.state.generator.selected;

        // Total results
        this.elements.genResultCount.textContent = `${results.length} makanan ditemukan`;

        // Selected count
        this.elements.genSelectedCount.textContent = `${selected.size} dipilih`;

        // Calculate selected totals
        let totalCalories = 0;
        let totalPrice = 0;

        selected.forEach(index => {
            const food = results[index];
            if (food) {
                totalCalories += food.calories;
                totalPrice += food.effectivePrice;
            }
        });

        this.elements.genSelectedCalories.textContent = `${totalCalories.toLocaleString('id-ID')} kcal`;
        this.elements.genSelectedPrice.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    },

    /**
     * Add selected foods to list
     */
    addSelectedFoodsToList() {
        const selected = this.state.generator.selected;
        const results = this.state.generator.results;

        if (selected.size === 0) {
            this.showToast('Pilih minimal satu makanan', 'warning');
            return;
        }

        // Store count before clearing (FIX: selected is a reference that gets cleared)
        const selectedCount = selected.size;

        // Add each selected food
        selected.forEach(index => {
            const food = results[index];
            if (food) {
                Storage.addFood({ name: food.name, calories: food.calories });
            }
        });

        // Clear selection
        this.clearGeneratorSelection();

        // Refresh UI
        this.loadFoods();
        this.updateDashboard();
        this.loadHistory();

        // Show success message with stored count
        this.showToast(`${selectedCount} makanan berhasil ditambahkan!`, 'success');
    },

    /**
     * Show price edit modal
     */
    showPriceModal(foodName, defaultPrice) {
        this.elements.priceEditFoodName.textContent = foodName;
        this.elements.priceEditFoodName.dataset.food = foodName;
        this.elements.priceEditFoodName.dataset.defaultPrice = defaultPrice;

        // Get current effective price
        const currentPrice = Storage.getEffectivePrice(foodName, defaultPrice);
        this.elements.priceEditInput.value = currentPrice;

        this.elements.priceModal.style.display = 'flex';
        this.elements.priceEditInput.focus();
    },

    /**
     * Hide price modal
     */
    hidePriceModal() {
        this.elements.priceModal.style.display = 'none';
        this.elements.priceEditInput.value = '';
    },

    /**
     * Save price edit
     */
    savePriceEdit() {
        const foodName = this.elements.priceEditFoodName.dataset.food;
        const newPrice = parseInt(this.elements.priceEditInput.value);

        if (!newPrice || newPrice < 0) {
            this.showToast('Masukkan harga yang valid', 'warning');
            return;
        }

        Storage.saveCustomPrice(foodName, newPrice);
        this.hidePriceModal();
        this.showToast(`Harga "${foodName}" disimpan: Rp ${newPrice.toLocaleString('id-ID')}`, 'success');

        // Refresh generator results
        this.handleGeneratorSubmit();
    },

    /**
     * Reset price to default
     */
    resetPriceToDefault() {
        const foodName = this.elements.priceEditFoodName.dataset.food;
        Storage.deleteCustomPrice(foodName);
        this.hidePriceModal();
        this.showToast(`Harga "${foodName}" dikembalikan ke default`, 'info');

        // Refresh generator results
        this.handleGeneratorSubmit();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
