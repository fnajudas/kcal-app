/**
 * Foods Database
 * Database makanan Indonesia dengan informasi kalori per porsi
 */

const FoodsDB = {
    // Database makanan (kalori per porsi standar) dengan estimasi harga
    foods: [
        // === NASI & KARBOHIDRAT ===
        { name: "Nasi Putih", calories: 204, portion: "1 piring (150g)", price: 5000 },
        { name: "Nasi Goreng", calories: 350, portion: "1 piring", price: 15000 },
        { name: "Nasi Goreng Ayam", calories: 450, portion: "1 piring", price: 20000 },
        { name: "Nasi Goreng Seafood", calories: 480, portion: "1 piring", price: 25000 },
        { name: "Nasi Uduk", calories: 300, portion: "1 piring", price: 12000 },
        { name: "Nasi Kuning", calories: 280, portion: "1 piring", price: 12000 },
        { name: "Nasi Padang", calories: 550, portion: "1 porsi lengkap", price: 35000 },
        { name: "Nasi Campur", calories: 450, portion: "1 piring", price: 25000 },
        { name: "Nasi Gudeg", calories: 500, portion: "1 piring", price: 25000 },
        { name: "Nasi Pecel", calories: 400, portion: "1 piring", price: 15000 },
        { name: "Nasi Rawon", calories: 480, portion: "1 porsi", price: 30000 },
        { name: "Bubur Ayam", calories: 350, portion: "1 mangkuk", price: 15000 },
        { name: "Lontong", calories: 150, portion: "2 potong", price: 5000 },
        { name: "Ketupat", calories: 150, portion: "2 potong", price: 5000 },
        { name: "Mie Goreng", calories: 400, portion: "1 piring", price: 15000 },
        { name: "Mie Ayam", calories: 450, portion: "1 mangkuk", price: 18000 },
        { name: "Mie Rebus", calories: 350, portion: "1 mangkuk", price: 12000 },
        { name: "Indomie Goreng", calories: 380, portion: "1 bungkus", price: 5000 },
        { name: "Indomie Kuah", calories: 310, portion: "1 bungkus", price: 5000 },
        { name: "Kwetiau Goreng", calories: 420, portion: "1 piring", price: 18000 },
        { name: "Bihun Goreng", calories: 350, portion: "1 piring", price: 15000 },
        { name: "Roti Tawar", calories: 80, portion: "1 lembar", price: 2000 },
        { name: "Roti Bakar", calories: 150, portion: "1 porsi", price: 10000 },
        { name: "Kentang Goreng", calories: 320, portion: "1 porsi sedang", price: 15000 },
        { name: "Singkong Goreng", calories: 200, portion: "3 potong", price: 5000 },
        { name: "Ubi Goreng", calories: 180, portion: "3 potong", price: 5000 },

        // === AYAM ===
        { name: "Ayam Goreng", calories: 280, portion: "1 potong paha", price: 15000 },
        { name: "Ayam Goreng Dada", calories: 250, portion: "1 potong dada", price: 18000 },
        { name: "Ayam Bakar", calories: 250, portion: "1 potong", price: 18000 },
        { name: "Ayam Geprek", calories: 400, portion: "1 porsi", price: 18000 },
        { name: "Ayam Penyet", calories: 380, portion: "1 porsi", price: 20000 },
        { name: "Ayam Crispy", calories: 350, portion: "1 potong", price: 15000 },
        { name: "Ayam KFC", calories: 320, portion: "1 potong", price: 25000 },
        { name: "Ayam McD", calories: 300, portion: "1 potong", price: 22000 },
        { name: "Sate Ayam", calories: 250, portion: "10 tusuk", price: 25000 },
        { name: "Opor Ayam", calories: 300, portion: "1 potong + kuah", price: 18000 },
        { name: "Rendang Ayam", calories: 350, portion: "1 potong", price: 20000 },
        { name: "Chicken Nugget", calories: 280, portion: "6 pcs", price: 20000 },
        { name: "Chicken Wings", calories: 350, portion: "6 pcs", price: 25000 },
        { name: "Ceker Ayam", calories: 110, portion: "3 buah (50g)", price: 8000 },
        { name: "Kulit Ayam Goreng", calories: 225, portion: "1 porsi (50g)", price: 10000 },
        { name: "Ati Ampela", calories: 145, portion: "1 porsi (100g)", price: 12000 },
        { name: "Ati Ayam", calories: 120, portion: "3 buah", price: 8000 },
        { name: "Ampela Ayam", calories: 145, portion: "3 buah", price: 8000 },
        { name: "Usus Ayam", calories: 130, portion: "5 tusuk", price: 10000 },

        // === DAGING SAPI ===
        { name: "Rendang Sapi", calories: 400, portion: "1 potong", price: 25000 },
        { name: "Sate Sapi", calories: 300, portion: "10 tusuk", price: 35000 },
        { name: "Semur Daging", calories: 350, portion: "1 porsi", price: 25000 },
        { name: "Empal", calories: 280, portion: "2 potong", price: 20000 },
        { name: "Dendeng", calories: 200, portion: "3 lembar", price: 25000 },
        { name: "Bakso", calories: 300, portion: "1 mangkuk", price: 15000 },
        { name: "Soto Daging", calories: 350, portion: "1 mangkuk", price: 25000 },
        { name: "Rawon", calories: 400, portion: "1 mangkuk", price: 30000 },
        { name: "Sop Buntut", calories: 450, portion: "1 mangkuk", price: 65000 },
        { name: "Steak Sapi", calories: 500, portion: "200g", price: 85000 },
        { name: "Burger", calories: 450, portion: "1 buah", price: 35000 },
        { name: "Paru Goreng", calories: 275, portion: "1 porsi (100g)", price: 15000 },
        { name: "Paru Balado", calories: 300, portion: "1 porsi", price: 18000 },
        { name: "Babat Goreng", calories: 180, portion: "1 porsi (100g)", price: 15000 },

        // === SEAFOOD ===
        { name: "Ikan Goreng", calories: 200, portion: "1 ekor sedang", price: 20000 },
        { name: "Ikan Bakar", calories: 180, portion: "1 ekor sedang", price: 25000 },
        { name: "Ikan Pepes", calories: 150, portion: "1 bungkus", price: 18000 },
        { name: "Udang Goreng", calories: 200, portion: "5 ekor", price: 30000 },
        { name: "Udang Bakar", calories: 180, portion: "5 ekor", price: 35000 },
        { name: "Cumi Goreng Tepung", calories: 250, portion: "1 porsi", price: 25000 },
        { name: "Cumi Bakar", calories: 150, portion: "1 porsi", price: 30000 },
        { name: "Kepiting Saus Padang", calories: 350, portion: "1 ekor", price: 75000 },
        { name: "Kerang", calories: 120, portion: "1 porsi", price: 25000 },
        { name: "Pempek", calories: 400, portion: "4 pcs + kuah", price: 25000 },
        { name: "Otak-otak", calories: 150, portion: "3 tusuk", price: 10000 },

        // === TELUR ===
        { name: "Telur Goreng", calories: 120, portion: "1 butir", price: 5000 },
        { name: "Telur Dadar", calories: 150, portion: "1 porsi", price: 6000 },
        { name: "Telur Rebus", calories: 75, portion: "1 butir", price: 3000 },
        { name: "Telur Ceplok", calories: 110, portion: "1 butir", price: 5000 },
        { name: "Telur Balado", calories: 180, portion: "2 butir", price: 10000 },
        { name: "Telur Puyuh", calories: 14, portion: "1 butir", price: 1000 },
        { name: "Telur Puyuh Goreng", calories: 70, portion: "5 butir", price: 5000 },
        { name: "Telur Puyuh Balado", calories: 100, portion: "5 butir", price: 8000 },
        { name: "Omelette", calories: 200, portion: "1 porsi", price: 15000 },
        { name: "Scrambled Egg", calories: 180, portion: "2 butir", price: 15000 },

        // === SAYURAN ===
        { name: "Sayur Asem", calories: 80, portion: "1 mangkuk", price: 8000 },
        { name: "Sayur Lodeh", calories: 120, portion: "1 mangkuk", price: 8000 },
        { name: "Sayur Sop", calories: 100, portion: "1 mangkuk", price: 10000 },
        { name: "Capcay", calories: 150, portion: "1 piring", price: 18000 },
        { name: "Tumis Kangkung", calories: 80, portion: "1 piring", price: 10000 },
        { name: "Tumis Bayam", calories: 70, portion: "1 piring", price: 10000 },
        { name: "Tumis Buncis", calories: 60, portion: "1 piring", price: 10000 },
        { name: "Gado-gado", calories: 350, portion: "1 piring", price: 15000 },
        { name: "Karedok", calories: 300, portion: "1 piring", price: 15000 },
        { name: "Urap", calories: 150, portion: "1 piring", price: 8000 },
        { name: "Pecel", calories: 200, portion: "1 piring", price: 12000 },
        { name: "Lalapan", calories: 50, portion: "1 porsi", price: 5000 },
        { name: "Salad", calories: 100, portion: "1 piring", price: 25000 },

        // === TAHU & TEMPE ===
        { name: "Tahu Goreng", calories: 80, portion: "2 potong", price: 3000 },
        { name: "Tahu Bacem", calories: 100, portion: "2 potong", price: 4000 },
        { name: "Tahu Isi", calories: 150, portion: "2 buah", price: 5000 },
        { name: "Tempe Goreng", calories: 150, portion: "3 potong", price: 4000 },
        { name: "Tempe Bacem", calories: 120, portion: "3 potong", price: 5000 },
        { name: "Tempe Orek", calories: 180, portion: "1 piring kecil", price: 8000 },
        { name: "Tempe Mendoan", calories: 200, portion: "3 potong", price: 6000 },
        { name: "Perkedel Tahu", calories: 150, portion: "2 buah", price: 6000 },
        { name: "Tahu Tek", calories: 280, portion: "1 porsi", price: 15000 },

        // === GORENGAN & SNACK ===
        { name: "Gorengan", calories: 150, portion: "2 buah", price: 4000 },
        { name: "Bakwan", calories: 100, portion: "2 buah", price: 4000 },
        { name: "Risoles", calories: 150, portion: "2 buah", price: 8000 },
        { name: "Pastel", calories: 180, portion: "2 buah", price: 10000 },
        { name: "Lumpia", calories: 120, portion: "2 buah", price: 8000 },
        { name: "Martabak Telur", calories: 500, portion: "1/4 loyang", price: 25000 },
        { name: "Martabak Manis", calories: 450, portion: "1/4 loyang", price: 20000 },
        { name: "Pisang Goreng", calories: 130, portion: "2 buah", price: 5000 },
        { name: "Keripik", calories: 150, portion: "1 bungkus kecil", price: 10000 },
        { name: "Krupuk", calories: 100, portion: "5 keping", price: 3000 },
        { name: "Kerupuk Udang", calories: 120, portion: "5 keping (25g)", price: 5000 },
        { name: "Kerupuk Kulit", calories: 210, portion: "1 porsi (50g)", price: 8000 },
        { name: "Kerupuk Kulit Sapi", calories: 210, portion: "1 porsi (50g)", price: 10000 },
        { name: "Cireng", calories: 150, portion: "5 buah", price: 10000 },
        { name: "Cilok", calories: 180, portion: "10 buah", price: 10000 },
        { name: "Siomay", calories: 250, portion: "1 porsi", price: 15000 },
        { name: "Batagor", calories: 280, portion: "1 porsi", price: 15000 },
        { name: "Dimsum", calories: 200, portion: "4 pcs", price: 25000 },
        { name: "Seblak", calories: 350, portion: "1 porsi", price: 15000 },
        { name: "Seblak Kerupuk", calories: 230, portion: "1 porsi (50g)", price: 12000 },
        { name: "Ketoprak", calories: 450, portion: "1 porsi", price: 15000 },
        { name: "Bumbu Kacang", calories: 80, portion: "2 sdm (30g)", price: 3000 },

        // === SOTO & SOP ===
        { name: "Soto Ayam", calories: 350, portion: "1 mangkuk", price: 18000 },
        { name: "Soto Betawi", calories: 450, portion: "1 mangkuk", price: 30000 },
        { name: "Soto Madura", calories: 300, portion: "1 mangkuk", price: 18000 },
        { name: "Soto Lamongan", calories: 320, portion: "1 mangkuk", price: 18000 },
        { name: "Sop Ayam", calories: 250, portion: "1 mangkuk", price: 20000 },
        { name: "Sop Iga", calories: 400, portion: "1 mangkuk", price: 45000 },
        { name: "Bakso Kuah", calories: 300, portion: "1 mangkuk", price: 15000 },
        { name: "Bakso Goreng", calories: 200, portion: "5 buah", price: 10000 },

        // === MINUMAN ===
        { name: "Teh Manis", calories: 80, portion: "1 gelas", price: 5000 },
        { name: "Teh Tawar", calories: 0, portion: "1 gelas", price: 3000 },
        { name: "Kopi Hitam", calories: 5, portion: "1 gelas", price: 5000 },
        { name: "Kopi Susu", calories: 120, portion: "1 gelas", price: 15000 },
        { name: "Es Kopi Susu", calories: 150, portion: "1 gelas", price: 20000 },
        { name: "Cappuccino", calories: 120, portion: "1 cup", price: 25000 },
        { name: "Latte", calories: 150, portion: "1 cup", price: 28000 },
        { name: "Americano", calories: 15, portion: "1 cup", price: 22000 },
        { name: "Susu Full Cream", calories: 150, portion: "1 gelas", price: 8000 },
        { name: "Susu Low Fat", calories: 100, portion: "1 gelas", price: 10000 },
        { name: "Jus Jeruk", calories: 120, portion: "1 gelas", price: 12000 },
        { name: "Jus Alpukat", calories: 200, portion: "1 gelas", price: 15000 },
        { name: "Jus Mangga", calories: 130, portion: "1 gelas", price: 12000 },
        { name: "Es Jeruk", calories: 100, portion: "1 gelas", price: 8000 },
        { name: "Es Teh Manis", calories: 90, portion: "1 gelas", price: 5000 },
        { name: "Es Campur", calories: 250, portion: "1 mangkuk", price: 15000 },
        { name: "Es Cendol", calories: 200, portion: "1 gelas", price: 10000 },
        { name: "Es Doger", calories: 220, portion: "1 gelas", price: 12000 },
        { name: "Es Buah", calories: 180, portion: "1 mangkuk", price: 15000 },
        { name: "Coca Cola", calories: 140, portion: "1 kaleng 330ml", price: 8000 },
        { name: "Sprite", calories: 130, portion: "1 kaleng 330ml", price: 8000 },
        { name: "Fanta", calories: 140, portion: "1 kaleng 330ml", price: 8000 },
        { name: "Boba Milk Tea", calories: 350, portion: "1 cup", price: 25000 },
        { name: "Thai Tea", calories: 250, portion: "1 gelas", price: 18000 },
        { name: "Matcha Latte", calories: 200, portion: "1 cup", price: 28000 },
        { name: "Smoothie", calories: 250, portion: "1 gelas", price: 25000 },
        { name: "Milkshake", calories: 350, portion: "1 gelas", price: 30000 },
        { name: "Air Mineral", calories: 0, portion: "1 gelas", price: 3000 },

        // === BUAH ===
        { name: "Pisang", calories: 90, portion: "1 buah", price: 3000 },
        { name: "Apel", calories: 80, portion: "1 buah", price: 8000 },
        { name: "Jeruk", calories: 60, portion: "1 buah", price: 5000 },
        { name: "Mangga", calories: 100, portion: "1 buah", price: 8000 },
        { name: "Pepaya", calories: 50, portion: "1 potong", price: 5000 },
        { name: "Semangka", calories: 50, portion: "1 potong besar", price: 5000 },
        { name: "Melon", calories: 45, portion: "1 potong", price: 5000 },
        { name: "Anggur", calories: 70, portion: "15 butir", price: 15000 },
        { name: "Alpukat", calories: 160, portion: "1/2 buah", price: 8000 },
        { name: "Durian", calories: 150, portion: "2 biji", price: 25000 },
        { name: "Salak", calories: 80, portion: "3 buah", price: 8000 },
        { name: "Rambutan", calories: 70, portion: "10 buah", price: 10000 },
        { name: "Kelapa Muda", calories: 50, portion: "1 gelas air", price: 10000 },

        // === DESSERT & KUE ===
        { name: "Es Krim", calories: 200, portion: "1 scoop", price: 15000 },
        { name: "Pudding", calories: 150, portion: "1 cup", price: 10000 },
        { name: "Brownies", calories: 250, portion: "1 potong", price: 15000 },
        { name: "Cheesecake", calories: 350, portion: "1 potong", price: 35000 },
        { name: "Donat", calories: 250, portion: "1 buah", price: 12000 },
        { name: "Croissant", calories: 230, portion: "1 buah", price: 18000 },
        { name: "Roti Coklat", calories: 280, portion: "1 buah", price: 8000 },
        { name: "Kue Lapis", calories: 150, portion: "1 potong", price: 8000 },
        { name: "Klepon", calories: 100, portion: "3 buah", price: 5000 },
        { name: "Onde-onde", calories: 150, portion: "2 buah", price: 5000 },
        { name: "Serabi", calories: 180, portion: "2 buah", price: 8000 },
        { name: "Pancake", calories: 200, portion: "2 lembar", price: 25000 },
        { name: "Waffle", calories: 250, portion: "1 buah", price: 28000 },
        { name: "Coklat", calories: 150, portion: "1 bar kecil", price: 15000 },

        // === FAST FOOD ===
        { name: "Pizza", calories: 280, portion: "1 slice", price: 25000 },
        { name: "Spaghetti", calories: 400, portion: "1 piring", price: 35000 },
        { name: "Lasagna", calories: 450, portion: "1 porsi", price: 45000 },
        { name: "French Fries", calories: 320, portion: "1 porsi sedang", price: 18000 },
        { name: "Hotdog", calories: 300, portion: "1 buah", price: 20000 },
        { name: "Sandwich", calories: 350, portion: "1 buah", price: 25000 },
        { name: "Kebab", calories: 450, portion: "1 buah", price: 25000 },
        { name: "Shawarma", calories: 400, portion: "1 buah", price: 30000 },
        { name: "Sushi", calories: 250, portion: "6 pcs", price: 45000 },
        { name: "Ramen", calories: 450, portion: "1 mangkuk", price: 45000 },
        { name: "Takoyaki", calories: 200, portion: "6 pcs", price: 20000 },
        { name: "Gyoza", calories: 180, portion: "5 pcs", price: 25000 },

        // === SARAPAN ===
        { name: "Nasi Goreng Telur", calories: 400, portion: "1 piring", price: 18000 },
        { name: "Bubur Kacang Hijau", calories: 200, portion: "1 mangkuk", price: 10000 },
        { name: "Lontong Sayur", calories: 350, portion: "1 porsi", price: 15000 },
        { name: "Nasi Kuning Telur", calories: 350, portion: "1 piring", price: 15000 },
        { name: "Sereal", calories: 150, portion: "1 mangkuk + susu", price: 15000 },
        { name: "Oatmeal", calories: 150, portion: "1 mangkuk", price: 12000 },
        { name: "Granola", calories: 200, portion: "1/2 cup", price: 20000 },
        { name: "Toast Butter", calories: 180, portion: "2 lembar", price: 12000 },
        { name: "Toast Selai", calories: 200, portion: "2 lembar", price: 12000 }
    ],

    /**
     * Search foods by name
     * @param {string} query - Search query
     * @param {number} limit - Maximum results to return
     * @returns {Array} Matching food items
     */
    search(query, limit = 10) {
        if (!query || query.length < 2) {
            return [];
        }

        const normalizedQuery = query.toLowerCase().trim();
        
        // Score-based search for better results
        const scored = this.foods.map(food => {
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
            // Contains query as word
            else if (name.includes(` ${normalizedQuery}`) || name.includes(`${normalizedQuery} `)) {
                score = 60;
            }
            // Contains query anywhere
            else if (name.includes(normalizedQuery)) {
                score = 40;
            }
            // Fuzzy match - check each word
            else {
                const queryWords = normalizedQuery.split(' ');
                const nameWords = name.split(' ');
                
                queryWords.forEach(qWord => {
                    nameWords.forEach(nWord => {
                        if (nWord.startsWith(qWord)) {
                            score += 20;
                        } else if (nWord.includes(qWord)) {
                            score += 10;
                        }
                    });
                });
            }

            return { ...food, score };
        });

        // Filter and sort by score
        return scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(({ score, ...food }) => food);
    },

    /**
     * Get food by exact name
     * @param {string} name - Food name
     * @returns {Object|null} Food item or null
     */
    getByName(name) {
        return this.foods.find(
            food => food.name.toLowerCase() === name.toLowerCase()
        ) || null;
    },

    /**
     * Get all foods
     * @returns {Array} All food items
     */
    getAll() {
        return [...this.foods];
    },

    /**
     * Get food count
     * @returns {number} Total number of foods in database
     */
    getCount() {
        return this.foods.length;
    }
};

// Make FoodsDB available globally
window.FoodsDB = FoodsDB;
