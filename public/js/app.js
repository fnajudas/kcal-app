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
        }
    },

    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
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

        // Settings
        this.bindSettingsEvents();
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

        this.elements.resetAllBtn?.addEventListener('click', () => {
            if (confirm('Hapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
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

        let results = FoodsDB.search(query, 6);

        if (CalorieAPI.isConfigured() && results.length < 3) {
            hint.textContent = 'Mencari...';
            try {
                const apiResults = await CalorieAPI.search(query);
                const localNames = results.map(r => r.name.toLowerCase());
                const uniqueApiResults = apiResults.filter(r => !localNames.includes(r.name.toLowerCase()));
                results = [...results, ...uniqueApiResults].slice(0, 8);
            } catch (error) {
                console.error('API error:', error);
            }
        }

        this.state.autocomplete.suggestions = results;
        this.state.autocomplete.selectedIndex = -1;

        if (results.length === 0) {
            suggestions.innerHTML = '<li class="autocomplete-no-results">Tidak ditemukan.</li>';
            suggestions.classList.add('active');
            this.state.autocomplete.isOpen = true;
            hint.textContent = '';
            return;
        }

        suggestions.innerHTML = results.map((food, index) => `
            <li class="autocomplete-item ${food.source === 'api' ? 'from-api' : ''}" data-index="${index}">
                <span class="autocomplete-item-name">
                    ${this.highlightMatch(food.name, query)}
                    ${food.source === 'api' ? '<span class="api-badge">API</span>' : ''}
                </span>
                <div class="autocomplete-item-info">
                    <span class="autocomplete-item-calories">${food.calories} kcal</span>
                    <span class="autocomplete-item-portion">${food.portion}</span>
                </div>
            </li>
        `).join('');

        suggestions.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectAutocompleteItem(parseInt(item.dataset.index));
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
        Storage.checkAndResetDaily();
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
        }
    },

    showAllSections() {
        this.elements.goalSection.style.display = 'block';
        this.elements.dashboardSection.style.display = 'block';
        this.elements.foodSection.style.display = 'block';
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
    },

    validateProfile(profile) {
        if (!profile.gender) { alert('Pilih jenis kelamin'); return false; }
        if (!profile.age || profile.age < 10 || profile.age > 120) { alert('Umur: 10-120 tahun'); return false; }
        if (!profile.height || profile.height < 100 || profile.height > 250) { alert('Tinggi: 100-250 cm'); return false; }
        if (!profile.weight || profile.weight < 30 || profile.weight > 300) { alert('Berat: 30-300 kg'); return false; }
        if (!profile.activity) { alert('Pilih level aktivitas'); return false; }
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
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
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
            alert('Masukkan nama dan kalori');
            return;
        }

        Storage.addFood({ name, calories });
        this.elements.foodNameInput.value = '';
        this.elements.foodCaloriesInput.value = '';
        this.elements.foodHint.textContent = '';
        this.closeAutocomplete();
        this.elements.foodNameInput.focus();

        this.loadFoods();
        this.updateDashboard();
        this.loadHistory(); // Update riwayat kalori otomatis
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
        li.querySelector('.delete-food-btn').addEventListener('click', () => {
            Storage.removeFood(food.id);
            this.loadFoods();
            this.updateDashboard();
            this.loadHistory(); // Update riwayat kalori
        });
        return li;
    },

    handleClearFoods() {
        if (confirm('Hapus semua makanan hari ini?')) {
            Storage.clearFoods();
            this.loadFoods();
            this.updateDashboard();
            this.loadHistory(); // Update riwayat kalori
        }
    },

    /**
     * Weight progress
     */
    handleAddWeight() {
        const weight = parseFloat(this.elements.weightInputField.value);
        if (!weight || weight < 30 || weight > 300) {
            alert('Masukkan berat yang valid (30-300 kg)');
            return;
        }

        Storage.addWeightEntry(weight);
        this.elements.weightInputField.value = '';
        this.loadWeightProgress();
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
            alert('Tidak ada makanan untuk disimpan sebagai template');
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
            alert('Masukkan nama template');
            return;
        }

        const foods = Storage.getFoods().map(f => ({ name: f.name, calories: f.calories }));
        Storage.saveMealTemplate({ name, foods });
        this.hideTemplateModal();
        this.loadTemplates();
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
                if (btn.dataset.action === 'apply') {
                    Storage.applyMealTemplate(id);
                    this.loadFoods();
                    this.updateDashboard();
                    this.loadHistory(); // Update riwayat kalori
                } else {
                    Storage.deleteMealTemplate(id);
                    this.loadTemplates();
                }
            });
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
