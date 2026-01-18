/**
 * Storage Module
 * Handles all localStorage operations for the Kcal Calculator app
 */

const Storage = {
    // Storage keys
    KEYS: {
        PROFILE: 'kcal_profile',
        FOODS: 'kcal_foods',
        FOODS_HISTORY: 'kcal_foods_history',
        LAST_DATE: 'kcal_last_date',
        GOAL: 'kcal_goal',
        WEIGHT_LOG: 'kcal_weight_log',
        WATER_LOG: 'kcal_water_log',
        WATER_LAST_DATE: 'kcal_water_last_date',
        BODY_MEASUREMENTS: 'kcal_body_measurements',
        MEAL_TEMPLATES: 'kcal_meal_templates',
        CUSTOM_PRICES: 'kcal_custom_prices',
        CUSTOM_FOODS: 'kcal_custom_foods',
        THEME_MODE: 'kcal_theme_mode',
        THEME_AUTO: 'kcal_theme_auto'
    },

    // ==================== PROFILE ====================
    
    saveProfile(profile) {
        try {
            localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
            return true;
        } catch (error) {
            console.error('Error saving profile:', error);
            return false;
        }
    },

    getProfile() {
        try {
            const data = localStorage.getItem(this.KEYS.PROFILE);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting profile:', error);
            return null;
        }
    },

    deleteProfile() {
        localStorage.removeItem(this.KEYS.PROFILE);
    },

    // ==================== GOAL SETTING ====================
    
    /**
     * Save user goal (target weight, calorie goal type)
     * @param {Object} goal - { targetWeight, goalType: 'deficit'|'maintenance'|'surplus', customCalories }
     */
    saveGoal(goal) {
        try {
            localStorage.setItem(this.KEYS.GOAL, JSON.stringify(goal));
            return true;
        } catch (error) {
            console.error('Error saving goal:', error);
            return false;
        }
    },

    getGoal() {
        try {
            const data = localStorage.getItem(this.KEYS.GOAL);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting goal:', error);
            return null;
        }
    },

    // ==================== FOODS (TODAY) ====================
    
    saveFoods(foods) {
        try {
            localStorage.setItem(this.KEYS.FOODS, JSON.stringify(foods));
            return true;
        } catch (error) {
            console.error('Error saving foods:', error);
            return false;
        }
    },

    getFoods() {
        try {
            const data = localStorage.getItem(this.KEYS.FOODS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting foods:', error);
            return [];
        }
    },

    addFood(food) {
        const foods = this.getFoods();
        food.id = Date.now();
        food.timestamp = this.getIndonesiaDateTime();
        food.date = this.getTodayDate();
        foods.push(food);
        return this.saveFoods(foods);
    },

    removeFood(foodId) {
        const foods = this.getFoods();
        const filtered = foods.filter(f => f.id !== foodId);
        return this.saveFoods(filtered);
    },

    clearFoods() {
        localStorage.removeItem(this.KEYS.FOODS);
    },

    getTotalCalories() {
        const foods = this.getFoods();
        return foods.reduce((total, food) => total + (food.calories || 0), 0);
    },

    // ==================== FOODS HISTORY ====================
    
    /**
     * Get all food history
     * @returns {Object} { 'YYYY-MM-DD': [foods], ... }
     */
    getFoodsHistory() {
        try {
            const data = localStorage.getItem(this.KEYS.FOODS_HISTORY);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error getting foods history:', error);
            return {};
        }
    },

    /**
     * Save foods for a specific date to history
     */
    saveFoodsToHistory(date, foods) {
        const history = this.getFoodsHistory();
        history[date] = foods;
        
        // Keep only last 30 days
        const dates = Object.keys(history).sort().reverse();
        if (dates.length > 30) {
            dates.slice(30).forEach(d => delete history[d]);
        }
        
        try {
            localStorage.setItem(this.KEYS.FOODS_HISTORY, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Error saving foods history:', error);
            return false;
        }
    },

    /**
     * Get foods for a specific date from history
     */
    getFoodsByDate(date) {
        const history = this.getFoodsHistory();
        return history[date] || [];
    },

    /**
     * Get calories for a specific date
     */
    getCaloriesByDate(date) {
        const foods = this.getFoodsByDate(date);
        return foods.reduce((total, food) => total + (food.calories || 0), 0);
    },

    /**
     * Get last N days of calorie history
     */
    getCalorieHistory(days = 7) {
        const history = [];
        const todayStr = this.getTodayDate();
        
        for (let i = days - 1; i >= 0; i--) {
            // Get date in Indonesia timezone
            const dateObj = this.getIndonesiaDateOffset(-i);
            const dateStr = this.getIndonesiaDate(dateObj);
            
            // For today, use current foods; for past days, use history
            let calories;
            if (dateStr === todayStr) {
                calories = this.getTotalCalories();
            } else {
                calories = this.getCaloriesByDate(dateStr);
            }
            
            // Get day name in Indonesian
            const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
            
            history.push({
                date: dateStr,
                calories: calories,
                dayName: dayName
            });
        }
        
        return history;
    },

    // ==================== WEIGHT LOG ====================
    
    /**
     * Get all weight logs
     * @returns {Array} [{ date, weight, timestamp }, ...]
     */
    getWeightLog() {
        try {
            const data = localStorage.getItem(this.KEYS.WEIGHT_LOG);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting weight log:', error);
            return [];
        }
    },

    /**
     * Add weight entry
     */
    addWeightEntry(weight) {
        const log = this.getWeightLog();
        const today = this.getTodayDate();
        
        // Check if already logged today
        const existingIndex = log.findIndex(e => e.date === today);
        
        const entry = {
            date: today,
            weight: parseFloat(weight),
            timestamp: this.getIndonesiaDateTime()
        };
        
        if (existingIndex >= 0) {
            log[existingIndex] = entry; // Update existing
        } else {
            log.push(entry);
        }
        
        // Sort by date
        log.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        try {
            localStorage.setItem(this.KEYS.WEIGHT_LOG, JSON.stringify(log));
            return true;
        } catch (error) {
            console.error('Error saving weight log:', error);
            return false;
        }
    },

    /**
     * Get weight progress (first, current, change)
     */
    getWeightProgress() {
        const log = this.getWeightLog();
        if (log.length === 0) return null;
        
        const first = log[0];
        const current = log[log.length - 1];
        const change = current.weight - first.weight;
        
        return {
            startWeight: first.weight,
            startDate: first.date,
            currentWeight: current.weight,
            currentDate: current.date,
            change: change,
            entries: log.length
        };
    },

    /**
     * Delete weight entry by date
     */
    deleteWeightEntry(date) {
        const log = this.getWeightLog();
        const filtered = log.filter(e => e.date !== date);
        localStorage.setItem(this.KEYS.WEIGHT_LOG, JSON.stringify(filtered));
    },

    // ==================== WATER INTAKE ====================
    
    /**
     * Get today's water intake (in glasses)
     */
    getWaterIntake() {
        try {
            // Check if it's a new day
            const lastDate = localStorage.getItem(this.KEYS.WATER_LAST_DATE);
            const today = this.getTodayDate();
            
            if (lastDate !== today) {
                // Reset for new day
                localStorage.setItem(this.KEYS.WATER_LOG, '0');
                localStorage.setItem(this.KEYS.WATER_LAST_DATE, today);
                return 0;
            }
            
            const data = localStorage.getItem(this.KEYS.WATER_LOG);
            return data ? parseInt(data) : 0;
        } catch (error) {
            console.error('Error getting water intake:', error);
            return 0;
        }
    },

    /**
     * Add water (1 glass = 250ml)
     */
    addWater(glasses = 1) {
        const current = this.getWaterIntake();
        const newTotal = current + glasses;
        localStorage.setItem(this.KEYS.WATER_LOG, newTotal.toString());
        localStorage.setItem(this.KEYS.WATER_LAST_DATE, this.getTodayDate());
        return newTotal;
    },

    /**
     * Remove water
     */
    removeWater(glasses = 1) {
        const current = this.getWaterIntake();
        const newTotal = Math.max(0, current - glasses);
        localStorage.setItem(this.KEYS.WATER_LOG, newTotal.toString());
        return newTotal;
    },

    /**
     * Reset water intake
     */
    resetWater() {
        localStorage.setItem(this.KEYS.WATER_LOG, '0');
    },

    // ==================== BODY MEASUREMENTS ====================
    
    /**
     * Get all body measurements
     * @returns {Array} [{ date, waist, chest, arm, thigh, hip }, ...]
     */
    getBodyMeasurements() {
        try {
            const data = localStorage.getItem(this.KEYS.BODY_MEASUREMENTS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting body measurements:', error);
            return [];
        }
    },

    /**
     * Add body measurement entry
     */
    addBodyMeasurement(measurements) {
        const log = this.getBodyMeasurements();
        const today = this.getTodayDate();
        
        const entry = {
            date: today,
            timestamp: this.getIndonesiaDateTime(),
            ...measurements
        };
        
        // Check if already logged today
        const existingIndex = log.findIndex(e => e.date === today);
        
        if (existingIndex >= 0) {
            log[existingIndex] = entry;
        } else {
            log.push(entry);
        }
        
        // Sort by date
        log.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        try {
            localStorage.setItem(this.KEYS.BODY_MEASUREMENTS, JSON.stringify(log));
            return true;
        } catch (error) {
            console.error('Error saving body measurements:', error);
            return false;
        }
    },

    /**
     * Get latest body measurement
     */
    getLatestBodyMeasurement() {
        const log = this.getBodyMeasurements();
        return log.length > 0 ? log[log.length - 1] : null;
    },

    /**
     * Delete body measurement by date
     */
    deleteBodyMeasurement(date) {
        const log = this.getBodyMeasurements();
        const filtered = log.filter(e => e.date !== date);
        localStorage.setItem(this.KEYS.BODY_MEASUREMENTS, JSON.stringify(filtered));
    },

    // ==================== MEAL TEMPLATES ====================
    
    /**
     * Get all meal templates
     * @returns {Array} [{ id, name, foods: [...], totalCalories }, ...]
     */
    getMealTemplates() {
        try {
            const data = localStorage.getItem(this.KEYS.MEAL_TEMPLATES);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting meal templates:', error);
            return [];
        }
    },

    /**
     * Save meal template
     */
    saveMealTemplate(template) {
        const templates = this.getMealTemplates();
        
        template.id = template.id || Date.now();
        template.createdAt = template.createdAt || this.getIndonesiaDateTime();
        template.totalCalories = template.foods.reduce((sum, f) => sum + f.calories, 0);
        
        // Check if updating existing
        const existingIndex = templates.findIndex(t => t.id === template.id);
        
        if (existingIndex >= 0) {
            templates[existingIndex] = template;
        } else {
            templates.push(template);
        }
        
        try {
            localStorage.setItem(this.KEYS.MEAL_TEMPLATES, JSON.stringify(templates));
            return template;
        } catch (error) {
            console.error('Error saving meal template:', error);
            return null;
        }
    },

    /**
     * Delete meal template
     */
    deleteMealTemplate(templateId) {
        const templates = this.getMealTemplates();
        const filtered = templates.filter(t => t.id !== templateId);
        localStorage.setItem(this.KEYS.MEAL_TEMPLATES, JSON.stringify(filtered));
    },

    /**
     * Apply meal template (add all foods to today)
     */
    applyMealTemplate(templateId) {
        const templates = this.getMealTemplates();
        const template = templates.find(t => t.id === templateId);
        
        if (!template) return false;
        
        template.foods.forEach(food => {
            this.addFood({ name: food.name, calories: food.calories });
        });
        
        return true;
    },

    // ==================== CUSTOM PRICES ====================
    
    /**
     * Get all custom prices
     * @returns {Object} { 'foodName': price, ... }
     */
    getAllCustomPrices() {
        try {
            const data = localStorage.getItem(this.KEYS.CUSTOM_PRICES);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error getting custom prices:', error);
            return {};
        }
    },

    /**
     * Get custom price for a specific food
     * @param {string} foodName - Food name
     * @returns {number|null} Custom price or null if not set
     */
    getCustomPrice(foodName) {
        const prices = this.getAllCustomPrices();
        return prices[foodName.toLowerCase()] || null;
    },

    /**
     * Save custom price for a food
     * @param {string} foodName - Food name
     * @param {number} price - Price in Rupiah
     */
    saveCustomPrice(foodName, price) {
        try {
            const prices = this.getAllCustomPrices();
            prices[foodName.toLowerCase()] = parseInt(price);
            localStorage.setItem(this.KEYS.CUSTOM_PRICES, JSON.stringify(prices));
            return true;
        } catch (error) {
            console.error('Error saving custom price:', error);
            return false;
        }
    },

    /**
     * Delete custom price for a food
     * @param {string} foodName - Food name
     */
    deleteCustomPrice(foodName) {
        const prices = this.getAllCustomPrices();
        delete prices[foodName.toLowerCase()];
        localStorage.setItem(this.KEYS.CUSTOM_PRICES, JSON.stringify(prices));
    },

    /**
     * Get effective price for a food (custom price if exists, otherwise default)
     * @param {string} foodName - Food name
     * @param {number} defaultPrice - Default price from database
     * @returns {number} Effective price
     */
    getEffectivePrice(foodName, defaultPrice) {
        const customPrice = this.getCustomPrice(foodName);
        return customPrice !== null ? customPrice : defaultPrice;
    },

    // ==================== CUSTOM FOODS (User-added) ====================

    /**
     * Get all custom foods added by user
     * @returns {Array} Array of custom foods [{ name, calories, portion, addedAt, usageCount }, ...]
     */
    getCustomFoods() {
        try {
            const data = localStorage.getItem(this.KEYS.CUSTOM_FOODS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting custom foods:', error);
            return [];
        }
    },

    /**
     * Save a custom food (user manually added)
     * Updates usage count if food already exists
     * @param {Object} food - { name, calories, portion? }
     */
    saveCustomFood(food) {
        const foods = this.getCustomFoods();
        const normalizedName = food.name.toLowerCase().trim();
        
        // Check if food already exists
        const existingIndex = foods.findIndex(f => f.name.toLowerCase() === normalizedName);
        
        if (existingIndex >= 0) {
            // Update existing food's usage count and calories
            foods[existingIndex].usageCount = (foods[existingIndex].usageCount || 1) + 1;
            foods[existingIndex].calories = food.calories; // Update with latest calories
            foods[existingIndex].lastUsed = this.getIndonesiaDateTime();
        } else {
            // Add new custom food
            foods.push({
                name: food.name.trim(),
                calories: food.calories,
                portion: food.portion || '1 porsi',
                addedAt: this.getIndonesiaDateTime(),
                lastUsed: this.getIndonesiaDateTime(),
                usageCount: 1,
                source: 'custom'
            });
        }
        
        try {
            localStorage.setItem(this.KEYS.CUSTOM_FOODS, JSON.stringify(foods));
            return true;
        } catch (error) {
            console.error('Error saving custom food:', error);
            return false;
        }
    },

    /**
     * Search custom foods by query
     * @param {string} query - Search query
     * @param {number} limit - Max results
     * @returns {Array} Matching custom foods
     */
    searchCustomFoods(query, limit = 5) {
        if (!query || query.length < 2) {
            return [];
        }

        const normalizedQuery = query.toLowerCase().trim();
        const foods = this.getCustomFoods();
        
        // Score-based search
        const scored = foods.map(food => {
            const name = food.name.toLowerCase();
            let score = 0;

            // Exact match
            if (name === normalizedQuery) {
                score = 100;
            }
            // Starts with query
            else if (name.startsWith(normalizedQuery)) {
                score = 80;
            }
            // Contains query
            else if (name.includes(normalizedQuery)) {
                score = 50;
            }

            // Boost by usage count
            score += Math.min((food.usageCount || 1) * 2, 20);

            return { food: { ...food, source: 'custom' }, score };
        });

        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.food);
    },

    /**
     * Search custom foods and return with scores (for combined sorting)
     * @param {string} query - Search query
     * @param {number} limit - Max results
     * @returns {Array} Array of { food, score }
     */
    searchCustomFoodsWithScore(query, limit = 10) {
        if (!query || query.length < 2) {
            return [];
        }

        const normalizedQuery = query.toLowerCase().trim();
        const foods = this.getCustomFoods();
        
        const scored = foods.map(food => {
            const name = food.name.toLowerCase();
            let score = 0;

            // Exact match
            if (name === normalizedQuery) {
                score = 100;
            }
            // Starts with query
            else if (name.startsWith(normalizedQuery)) {
                score = 80;
            }
            // Contains query
            else if (name.includes(normalizedQuery)) {
                score = 50;
            }

            // Small boost by usage count (max +10)
            score += Math.min((food.usageCount || 1), 10);

            return { food: { ...food, source: 'custom' }, score };
        });

        return scored
            .filter(item => item.score > 0)
            .slice(0, limit);
    },

    /**
     * Delete a custom food
     * @param {string} foodName - Food name to delete
     */
    deleteCustomFood(foodName) {
        const foods = this.getCustomFoods();
        const filtered = foods.filter(f => f.name.toLowerCase() !== foodName.toLowerCase());
        localStorage.setItem(this.KEYS.CUSTOM_FOODS, JSON.stringify(filtered));
    },

    /**
     * Check if a food name exists in custom foods
     * @param {string} foodName - Food name
     * @returns {Object|null} Custom food if exists
     */
    getCustomFood(foodName) {
        const foods = this.getCustomFoods();
        return foods.find(f => f.name.toLowerCase() === foodName.toLowerCase().trim()) || null;
    },

    /**
     * Save custom food with barcode
     * @param {Object} food - { name, calories, portion, barcode, brand }
     */
    saveCustomFoodWithBarcode(food) {
        const foods = this.getCustomFoods();
        
        // Check if barcode already exists
        const existingIndex = foods.findIndex(f => f.barcode === food.barcode);
        
        if (existingIndex >= 0) {
            // Update existing
            foods[existingIndex] = {
                ...foods[existingIndex],
                ...food,
                usageCount: (foods[existingIndex].usageCount || 1) + 1,
                lastUsed: this.getIndonesiaDateTime()
            };
        } else {
            // Add new
            foods.push({
                ...food,
                addedAt: this.getIndonesiaDateTime(),
                lastUsed: this.getIndonesiaDateTime(),
                usageCount: 1,
                source: 'barcode'
            });
        }
        
        try {
            localStorage.setItem(this.KEYS.CUSTOM_FOODS, JSON.stringify(foods));
            return true;
        } catch (error) {
            console.error('Error saving barcode food:', error);
            return false;
        }
    },

    /**
     * Get custom food by barcode
     * @param {string} barcode - Barcode number
     * @returns {Object|null} Custom food if exists
     */
    getCustomFoodByBarcode(barcode) {
        const foods = this.getCustomFoods();
        return foods.find(f => f.barcode === barcode) || null;
    },

    // ==================== TIMEZONE HELPERS ====================
    
    /**
     * Get current date in Indonesia timezone (WIB - Asia/Jakarta)
     * Returns format: YYYY-MM-DD
     */
    getIndonesiaDate(date = new Date()) {
        const options = { 
            timeZone: 'Asia/Jakarta', 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        };
        // Use sv-SE locale for YYYY-MM-DD format
        const formatter = new Intl.DateTimeFormat('sv-SE', options);
        return formatter.format(date);
    },

    /**
     * Get current datetime in Indonesia timezone
     * Returns ISO-like string with Indonesia time
     */
    getIndonesiaDateTime(date = new Date()) {
        const options = {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleString('sv-SE', options).replace(' ', 'T');
    },

    /**
     * Get a Date object representing a specific day in Indonesia timezone
     * @param {number} daysOffset - Number of days to offset (negative for past)
     */
    getIndonesiaDateOffset(daysOffset = 0) {
        // Get current time in Indonesia
        const now = new Date();
        const indonesiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        indonesiaTime.setDate(indonesiaTime.getDate() + daysOffset);
        return indonesiaTime;
    },

    // ==================== DAILY RESET ====================
    
    getTodayDate() {
        return this.getIndonesiaDate();
    },

    getLastDate() {
        return localStorage.getItem(this.KEYS.LAST_DATE);
    },

    saveCurrentDate() {
        localStorage.setItem(this.KEYS.LAST_DATE, this.getTodayDate());
    },

    /**
     * Check if it's a new day and archive foods
     */
    checkAndResetDaily() {
        const lastDate = this.getLastDate();
        const today = this.getTodayDate();

        if (lastDate && lastDate !== today) {
            // Archive yesterday's foods to history
            const yesterdayFoods = this.getFoods();
            if (yesterdayFoods.length > 0) {
                this.saveFoodsToHistory(lastDate, yesterdayFoods);
            }
            
            // Clear today's foods
            this.clearFoods();
            this.saveCurrentDate();
            return true;
        }
        
        if (!lastDate) {
            this.saveCurrentDate();
        }
        
        return false;
    },

    // ==================== THEME MANAGEMENT ====================
    
    /**
     * Get theme mode (light/dark)
     * @returns {string} 'light' or 'dark'
     */
    getThemeMode() {
        return localStorage.getItem(this.KEYS.THEME_MODE) || 'light';
    },

    /**
     * Set theme mode
     * @param {string} mode - 'light' or 'dark'
     */
    setThemeMode(mode) {
        localStorage.setItem(this.KEYS.THEME_MODE, mode);
    },

    /**
     * Check if theme auto-switch is enabled
     * @returns {boolean}
     */
    isThemeAuto() {
        const value = localStorage.getItem(this.KEYS.THEME_AUTO);
        return value === null ? true : value === 'true'; // Default to true
    },

    /**
     * Set theme auto-switch
     * @param {boolean} auto
     */
    setThemeAuto(auto) {
        localStorage.setItem(this.KEYS.THEME_AUTO, auto.toString());
    },

    // ==================== CLEAR ALL ====================
    
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }
};

// Make Storage available globally
window.Storage = Storage;
