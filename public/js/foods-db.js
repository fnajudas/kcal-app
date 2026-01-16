/**
 * Foods Database
 * Database makanan Indonesia dengan informasi kalori per porsi
 */

const FoodsDB = {
    // Database makanan (kalori per porsi standar)
    foods: [
        // === NASI & KARBOHIDRAT ===
        { name: "Nasi Putih", calories: 204, portion: "1 piring (150g)" },
        { name: "Nasi Goreng", calories: 350, portion: "1 piring" },
        { name: "Nasi Goreng Ayam", calories: 450, portion: "1 piring" },
        { name: "Nasi Goreng Seafood", calories: 480, portion: "1 piring" },
        { name: "Nasi Uduk", calories: 300, portion: "1 piring" },
        { name: "Nasi Kuning", calories: 280, portion: "1 piring" },
        { name: "Nasi Padang", calories: 550, portion: "1 porsi lengkap" },
        { name: "Nasi Campur", calories: 450, portion: "1 piring" },
        { name: "Nasi Gudeg", calories: 500, portion: "1 piring" },
        { name: "Nasi Pecel", calories: 400, portion: "1 piring" },
        { name: "Nasi Rawon", calories: 480, portion: "1 porsi" },
        { name: "Bubur Ayam", calories: 350, portion: "1 mangkuk" },
        { name: "Lontong", calories: 150, portion: "2 potong" },
        { name: "Ketupat", calories: 150, portion: "2 potong" },
        { name: "Mie Goreng", calories: 400, portion: "1 piring" },
        { name: "Mie Ayam", calories: 450, portion: "1 mangkuk" },
        { name: "Mie Rebus", calories: 350, portion: "1 mangkuk" },
        { name: "Indomie Goreng", calories: 380, portion: "1 bungkus" },
        { name: "Indomie Kuah", calories: 310, portion: "1 bungkus" },
        { name: "Kwetiau Goreng", calories: 420, portion: "1 piring" },
        { name: "Bihun Goreng", calories: 350, portion: "1 piring" },
        { name: "Roti Tawar", calories: 80, portion: "1 lembar" },
        { name: "Roti Bakar", calories: 150, portion: "1 porsi" },
        { name: "Kentang Goreng", calories: 320, portion: "1 porsi sedang" },
        { name: "Singkong Goreng", calories: 200, portion: "3 potong" },
        { name: "Ubi Goreng", calories: 180, portion: "3 potong" },

        // === AYAM ===
        { name: "Ayam Goreng", calories: 280, portion: "1 potong paha" },
        { name: "Ayam Goreng Dada", calories: 250, portion: "1 potong dada" },
        { name: "Ayam Bakar", calories: 250, portion: "1 potong" },
        { name: "Ayam Geprek", calories: 400, portion: "1 porsi" },
        { name: "Ayam Penyet", calories: 380, portion: "1 porsi" },
        { name: "Ayam Crispy", calories: 350, portion: "1 potong" },
        { name: "Ayam KFC", calories: 320, portion: "1 potong" },
        { name: "Ayam McD", calories: 300, portion: "1 potong" },
        { name: "Sate Ayam", calories: 250, portion: "10 tusuk" },
        { name: "Opor Ayam", calories: 300, portion: "1 potong + kuah" },
        { name: "Rendang Ayam", calories: 350, portion: "1 potong" },
        { name: "Chicken Nugget", calories: 280, portion: "6 pcs" },
        { name: "Chicken Wings", calories: 350, portion: "6 pcs" },

        // === DAGING SAPI ===
        { name: "Rendang Sapi", calories: 400, portion: "1 potong" },
        { name: "Sate Sapi", calories: 300, portion: "10 tusuk" },
        { name: "Semur Daging", calories: 350, portion: "1 porsi" },
        { name: "Empal", calories: 280, portion: "2 potong" },
        { name: "Dendeng", calories: 200, portion: "3 lembar" },
        { name: "Bakso", calories: 300, portion: "1 mangkuk" },
        { name: "Soto Daging", calories: 350, portion: "1 mangkuk" },
        { name: "Rawon", calories: 400, portion: "1 mangkuk" },
        { name: "Sop Buntut", calories: 450, portion: "1 mangkuk" },
        { name: "Steak Sapi", calories: 500, portion: "200g" },
        { name: "Burger", calories: 450, portion: "1 buah" },

        // === SEAFOOD ===
        { name: "Ikan Goreng", calories: 200, portion: "1 ekor sedang" },
        { name: "Ikan Bakar", calories: 180, portion: "1 ekor sedang" },
        { name: "Ikan Pepes", calories: 150, portion: "1 bungkus" },
        { name: "Udang Goreng", calories: 200, portion: "5 ekor" },
        { name: "Udang Bakar", calories: 180, portion: "5 ekor" },
        { name: "Cumi Goreng Tepung", calories: 250, portion: "1 porsi" },
        { name: "Cumi Bakar", calories: 150, portion: "1 porsi" },
        { name: "Kepiting Saus Padang", calories: 350, portion: "1 ekor" },
        { name: "Kerang", calories: 120, portion: "1 porsi" },
        { name: "Pempek", calories: 400, portion: "4 pcs + kuah" },
        { name: "Otak-otak", calories: 150, portion: "3 tusuk" },

        // === TELUR ===
        { name: "Telur Goreng", calories: 120, portion: "1 butir" },
        { name: "Telur Dadar", calories: 150, portion: "1 porsi" },
        { name: "Telur Rebus", calories: 75, portion: "1 butir" },
        { name: "Telur Ceplok", calories: 110, portion: "1 butir" },
        { name: "Telur Balado", calories: 180, portion: "2 butir" },
        { name: "Omelette", calories: 200, portion: "1 porsi" },
        { name: "Scrambled Egg", calories: 180, portion: "2 butir" },

        // === SAYURAN ===
        { name: "Sayur Asem", calories: 80, portion: "1 mangkuk" },
        { name: "Sayur Lodeh", calories: 120, portion: "1 mangkuk" },
        { name: "Sayur Sop", calories: 100, portion: "1 mangkuk" },
        { name: "Capcay", calories: 150, portion: "1 piring" },
        { name: "Tumis Kangkung", calories: 80, portion: "1 piring" },
        { name: "Tumis Bayam", calories: 70, portion: "1 piring" },
        { name: "Tumis Buncis", calories: 60, portion: "1 piring" },
        { name: "Gado-gado", calories: 350, portion: "1 piring" },
        { name: "Karedok", calories: 300, portion: "1 piring" },
        { name: "Urap", calories: 150, portion: "1 piring" },
        { name: "Pecel", calories: 200, portion: "1 piring" },
        { name: "Lalapan", calories: 50, portion: "1 porsi" },
        { name: "Salad", calories: 100, portion: "1 piring" },

        // === TAHU & TEMPE ===
        { name: "Tahu Goreng", calories: 80, portion: "2 potong" },
        { name: "Tahu Bacem", calories: 100, portion: "2 potong" },
        { name: "Tahu Isi", calories: 150, portion: "2 buah" },
        { name: "Tempe Goreng", calories: 150, portion: "3 potong" },
        { name: "Tempe Bacem", calories: 120, portion: "3 potong" },
        { name: "Tempe Orek", calories: 180, portion: "1 piring kecil" },
        { name: "Tempe Mendoan", calories: 200, portion: "3 potong" },
        { name: "Perkedel Tahu", calories: 150, portion: "2 buah" },
        { name: "Tahu Tek", calories: 280, portion: "1 porsi" },

        // === GORENGAN & SNACK ===
        { name: "Gorengan", calories: 150, portion: "2 buah" },
        { name: "Bakwan", calories: 100, portion: "2 buah" },
        { name: "Risoles", calories: 150, portion: "2 buah" },
        { name: "Pastel", calories: 180, portion: "2 buah" },
        { name: "Lumpia", calories: 120, portion: "2 buah" },
        { name: "Martabak Telur", calories: 500, portion: "1/4 loyang" },
        { name: "Martabak Manis", calories: 450, portion: "1/4 loyang" },
        { name: "Pisang Goreng", calories: 130, portion: "2 buah" },
        { name: "Keripik", calories: 150, portion: "1 bungkus kecil" },
        { name: "Krupuk", calories: 100, portion: "5 keping" },
        { name: "Cireng", calories: 150, portion: "5 buah" },
        { name: "Cilok", calories: 180, portion: "10 buah" },
        { name: "Siomay", calories: 250, portion: "1 porsi" },
        { name: "Batagor", calories: 280, portion: "1 porsi" },
        { name: "Dimsum", calories: 200, portion: "4 pcs" },

        // === SOTO & SOP ===
        { name: "Soto Ayam", calories: 350, portion: "1 mangkuk" },
        { name: "Soto Betawi", calories: 450, portion: "1 mangkuk" },
        { name: "Soto Madura", calories: 300, portion: "1 mangkuk" },
        { name: "Soto Lamongan", calories: 320, portion: "1 mangkuk" },
        { name: "Sop Ayam", calories: 250, portion: "1 mangkuk" },
        { name: "Sop Iga", calories: 400, portion: "1 mangkuk" },
        { name: "Bakso Kuah", calories: 300, portion: "1 mangkuk" },
        { name: "Bakso Goreng", calories: 200, portion: "5 buah" },

        // === MINUMAN ===
        { name: "Teh Manis", calories: 80, portion: "1 gelas" },
        { name: "Teh Tawar", calories: 0, portion: "1 gelas" },
        { name: "Kopi Hitam", calories: 5, portion: "1 gelas" },
        { name: "Kopi Susu", calories: 120, portion: "1 gelas" },
        { name: "Es Kopi Susu", calories: 150, portion: "1 gelas" },
        { name: "Cappuccino", calories: 120, portion: "1 cup" },
        { name: "Latte", calories: 150, portion: "1 cup" },
        { name: "Americano", calories: 15, portion: "1 cup" },
        { name: "Susu Full Cream", calories: 150, portion: "1 gelas" },
        { name: "Susu Low Fat", calories: 100, portion: "1 gelas" },
        { name: "Jus Jeruk", calories: 120, portion: "1 gelas" },
        { name: "Jus Alpukat", calories: 200, portion: "1 gelas" },
        { name: "Jus Mangga", calories: 130, portion: "1 gelas" },
        { name: "Es Jeruk", calories: 100, portion: "1 gelas" },
        { name: "Es Teh Manis", calories: 90, portion: "1 gelas" },
        { name: "Es Campur", calories: 250, portion: "1 mangkuk" },
        { name: "Es Cendol", calories: 200, portion: "1 gelas" },
        { name: "Es Doger", calories: 220, portion: "1 gelas" },
        { name: "Es Buah", calories: 180, portion: "1 mangkuk" },
        { name: "Coca Cola", calories: 140, portion: "1 kaleng 330ml" },
        { name: "Sprite", calories: 130, portion: "1 kaleng 330ml" },
        { name: "Fanta", calories: 140, portion: "1 kaleng 330ml" },
        { name: "Boba Milk Tea", calories: 350, portion: "1 cup" },
        { name: "Thai Tea", calories: 250, portion: "1 gelas" },
        { name: "Matcha Latte", calories: 200, portion: "1 cup" },
        { name: "Smoothie", calories: 250, portion: "1 gelas" },
        { name: "Milkshake", calories: 350, portion: "1 gelas" },
        { name: "Air Mineral", calories: 0, portion: "1 gelas" },

        // === BUAH ===
        { name: "Pisang", calories: 90, portion: "1 buah" },
        { name: "Apel", calories: 80, portion: "1 buah" },
        { name: "Jeruk", calories: 60, portion: "1 buah" },
        { name: "Mangga", calories: 100, portion: "1 buah" },
        { name: "Pepaya", calories: 50, portion: "1 potong" },
        { name: "Semangka", calories: 50, portion: "1 potong besar" },
        { name: "Melon", calories: 45, portion: "1 potong" },
        { name: "Anggur", calories: 70, portion: "15 butir" },
        { name: "Alpukat", calories: 160, portion: "1/2 buah" },
        { name: "Durian", calories: 150, portion: "2 biji" },
        { name: "Salak", calories: 80, portion: "3 buah" },
        { name: "Rambutan", calories: 70, portion: "10 buah" },
        { name: "Kelapa Muda", calories: 50, portion: "1 gelas air" },

        // === DESSERT & KUE ===
        { name: "Es Krim", calories: 200, portion: "1 scoop" },
        { name: "Pudding", calories: 150, portion: "1 cup" },
        { name: "Brownies", calories: 250, portion: "1 potong" },
        { name: "Cheesecake", calories: 350, portion: "1 potong" },
        { name: "Donat", calories: 250, portion: "1 buah" },
        { name: "Croissant", calories: 230, portion: "1 buah" },
        { name: "Roti Coklat", calories: 280, portion: "1 buah" },
        { name: "Kue Lapis", calories: 150, portion: "1 potong" },
        { name: "Klepon", calories: 100, portion: "3 buah" },
        { name: "Onde-onde", calories: 150, portion: "2 buah" },
        { name: "Serabi", calories: 180, portion: "2 buah" },
        { name: "Pancake", calories: 200, portion: "2 lembar" },
        { name: "Waffle", calories: 250, portion: "1 buah" },
        { name: "Coklat", calories: 150, portion: "1 bar kecil" },

        // === FAST FOOD ===
        { name: "Pizza", calories: 280, portion: "1 slice" },
        { name: "Spaghetti", calories: 400, portion: "1 piring" },
        { name: "Lasagna", calories: 450, portion: "1 porsi" },
        { name: "French Fries", calories: 320, portion: "1 porsi sedang" },
        { name: "Hotdog", calories: 300, portion: "1 buah" },
        { name: "Sandwich", calories: 350, portion: "1 buah" },
        { name: "Kebab", calories: 450, portion: "1 buah" },
        { name: "Shawarma", calories: 400, portion: "1 buah" },
        { name: "Sushi", calories: 250, portion: "6 pcs" },
        { name: "Ramen", calories: 450, portion: "1 mangkuk" },
        { name: "Takoyaki", calories: 200, portion: "6 pcs" },
        { name: "Gyoza", calories: 180, portion: "5 pcs" },

        // === SARAPAN ===
        { name: "Nasi Goreng Telur", calories: 400, portion: "1 piring" },
        { name: "Bubur Kacang Hijau", calories: 200, portion: "1 mangkuk" },
        { name: "Lontong Sayur", calories: 350, portion: "1 porsi" },
        { name: "Nasi Kuning Telur", calories: 350, portion: "1 piring" },
        { name: "Sereal", calories: 150, portion: "1 mangkuk + susu" },
        { name: "Oatmeal", calories: 150, portion: "1 mangkuk" },
        { name: "Granola", calories: 200, portion: "1/2 cup" },
        { name: "Toast Butter", calories: 180, portion: "2 lembar" },
        { name: "Toast Selai", calories: 200, portion: "2 lembar" }
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
