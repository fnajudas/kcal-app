/**
 * Calorie API Service
 * Integrates with CalorieNinjas API for external food data
 * 
 * Get your free API key at: https://calorieninjas.com/api
 */

const CalorieAPI = {
    // API Configuration
    API_KEY: 'mJ2sNsf81vqEiVw/ii/bPg==NfIsRkrwOapaLQ3m',
    BASE_URL: 'https://api.calorieninjas.com/v1/nutrition',

    // Cache for API results to reduce API calls
    cache: new Map(),
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

    /**
     * Check if API is configured
     */
    isConfigured() {
        return this.API_KEY && this.API_KEY.length > 0;
    },

    /**
     * Search for food nutrition data
     * @param {string} query - Food name to search
     * @returns {Promise<Array>} Array of food items with nutrition data
     */
    async search(query) {
        if (!this.isConfigured()) return [];

        // Check cache first
        const cacheKey = query.toLowerCase().trim();
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }

        try {
            const results = await this.fetchFromAPI(query);
            this.cache.set(cacheKey, {
                data: results,
                timestamp: Date.now()
            });
            return results;
        } catch (error) {
            console.error('CalorieNinjas API error:', error);
            return [];
        }
    },

    async fetchFromAPI(query) {
        const response = await fetch(`${this.BASE_URL}?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': this.API_KEY
            }
        });

        if (!response.ok) {
            console.error('CalorieNinjas API error:', response.status);
            return [];
        }

        const data = await response.json();
        return this.transformResults(data.items || [], query);
    },

    /**
     * Transform API response to our food format
     * @param {Array} items - API response items
     * @param {string} query - Original query for display
     * @returns {Array} Transformed food items
     */
    transformResults(items, query) {
        return items.map(item => {
            // API returns per 100g, calculate for reasonable portion
            const portionSize = this.estimatePortionSize(item.name);
            const caloriesPerPortion = Math.round((item.calories / 100) * portionSize);

            return {
                name: this.capitalizeWords(item.name),
                calories: caloriesPerPortion,
                portion: `${portionSize}g (estimasi)`,
                // Additional nutrition data from API
                nutrition: {
                    protein: item.protein_g,
                    carbs: item.carbohydrates_total_g,
                    fat: item.fat_total_g,
                    fiber: item.fiber_g,
                    sugar: item.sugar_g,
                    sodium: item.sodium_mg
                },
                source: 'api'
            };
        });
    },

    /**
     * Estimate portion size based on food type
     * @param {string} name - Food name
     * @returns {number} Estimated portion size in grams
     */
    estimatePortionSize(name) {
        const nameLower = name.toLowerCase();

        // Drinks
        if (nameLower.includes('juice') || nameLower.includes('milk') ||
            nameLower.includes('coffee') || nameLower.includes('tea') ||
            nameLower.includes('soda') || nameLower.includes('water')) {
            return 250; // 1 glass
        }

        // Rice, pasta, noodles
        if (nameLower.includes('rice') || nameLower.includes('pasta') ||
            nameLower.includes('noodle') || nameLower.includes('spaghetti')) {
            return 150; // 1 serving
        }

        // Bread
        if (nameLower.includes('bread') || nameLower.includes('toast')) {
            return 60; // 2 slices
        }

        // Meat, chicken, fish
        if (nameLower.includes('chicken') || nameLower.includes('beef') ||
            nameLower.includes('fish') || nameLower.includes('meat') ||
            nameLower.includes('pork') || nameLower.includes('lamb')) {
            return 150; // 1 serving
        }

        // Fruits
        if (nameLower.includes('apple') || nameLower.includes('banana') ||
            nameLower.includes('orange') || nameLower.includes('mango')) {
            return 150; // 1 medium fruit
        }

        // Vegetables
        if (nameLower.includes('salad') || nameLower.includes('vegetable') ||
            nameLower.includes('broccoli') || nameLower.includes('carrot')) {
            return 100; // 1 serving
        }

        // Eggs
        if (nameLower.includes('egg')) {
            return 100; // 2 eggs
        }

        // Default portion
        return 100;
    },

    /**
     * Capitalize first letter of each word
     */
    capitalizeWords(str) {
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },

    /**
     * Set API key
     * @param {string} key - CalorieNinjas API key
     */
    setApiKey(key) {
        this.API_KEY = key;
        // Save to localStorage for persistence
        if (key) {
            localStorage.setItem('kcal_api_key', key);
        } else {
            localStorage.removeItem('kcal_api_key');
        }
    },

    /**
     * Load API key from localStorage (overrides default if exists)
     */
    loadApiKey() {
        const savedKey = localStorage.getItem('kcal_api_key');
        if (savedKey) {
            this.API_KEY = savedKey;
        }
        // Keep default API_KEY if no saved key
    },

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    },

    /**
     * Search Indonesian foods in OpenFoodFacts by name
     * @param {string} query - Food name to search
     * @returns {Promise<Array>} Array of food items
     */
    async searchIndonesianFoods(query) {
        try {
            const data = await this.fetchIndonesianProducts(query);
            if (!data || !data.products) return [];

            return this.processIndonesianProducts(data.products);
        } catch (error) {
            console.error('OpenFoodFacts search error:', error);
            return [];
        }
    },

    async fetchIndonesianProducts(query) {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedQuery}&countries_tags_en=indonesia&fields=code,product_name,brands,nutriments,serving_size&page_size=8&json=true`
        );

        if (!response.ok) {
            console.error('OpenFoodFacts search error:', response.status);
            return null;
        }

        return response.json();
    },

    processIndonesianProducts(products) {
        return products
            .filter(product => this.hasCalorieData(product))
            .map(product => this.transformIndonesianProduct(product))
            .filter(food => food.calories > 0);
    },

    hasCalorieData(product) {
        const nutriments = product.nutriments || {};
        return nutriments['energy-kcal_100g'] || 
               nutriments['energy-kcal'] || 
               nutriments['energy_100g'];
    },

    transformIndonesianProduct(product) {
        const nutriments = product.nutriments || {};
        const calories = this.extractCaloriesFromNutriments(nutriments);
        const servingSize = product.serving_size || 100;
        const portion = servingSize === 100 ? '100g' : `${servingSize}g`;

        return {
            name: product.product_name || `Produk ${product.code}`,
            calories,
            portion,
            brand: product.brands || '',
            barcode: product.code,
            source: 'api'
        };
    },

    extractCaloriesFromNutriments(nutriments) {
        if (nutriments['energy-kcal_100g']) {
            return Math.round(nutriments['energy-kcal_100g']);
        }
        
        if (nutriments['energy-kcal']) {
            return Math.round(nutriments['energy-kcal']);
        }
        
        if (nutriments['energy_100g']) {
            return Math.round(nutriments['energy_100g'] / 4.184);
        }
        
        return 0;
    }
};

// Load API key on initialization
CalorieAPI.loadApiKey();

// Make CalorieAPI available globally
window.CalorieAPI = CalorieAPI;
