# Kcal Calculator

Aplikasi web untuk menghitung BMI (Body Mass Index), kebutuhan kalori harian, dan tracking konsumsi makanan.

## Fitur

- **Profil Pengguna**: Input tinggi badan, berat badan, umur, jenis kelamin, dan level aktivitas
- **Perhitungan BMI**: Menghitung BMI dan menampilkan kategori (Underweight, Normal, Overweight, Obese)
- **Berat Badan Ideal**: Menampilkan range berat badan ideal berdasarkan tinggi
- **Kebutuhan Kalori Harian**: Menghitung TDEE menggunakan formula Mifflin-St Jeor
- **Food Tracker**: Catat makanan yang dikonsumsi dan kalorinya
- **Auto-Suggest Makanan**: Database 200+ makanan Indonesia dengan kalori otomatis
- **CalorieNinjas API**: Integrasi API untuk mencari makanan internasional
- **Dashboard**: Visualisasi progress kalori harian dengan circular progress bar
- **Reset Harian Otomatis**: Data makanan otomatis direset setiap hari baru

## Formula yang Digunakan

### BMI (Body Mass Index)
```
BMI = berat (kg) / (tinggi (m))²
```

Kategori BMI:
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30

### TDEE (Total Daily Energy Expenditure)

Menggunakan **Mifflin-St Jeor Equation**:

**Pria:**
```
BMR = 10 × berat(kg) + 6.25 × tinggi(cm) - 5 × umur(tahun) + 5
```

**Wanita:**
```
BMR = 10 × berat(kg) + 6.25 × tinggi(cm) - 5 × umur(tahun) - 161
```

**TDEE = BMR × Activity Multiplier**

Activity Multipliers:
- Sedentary (tidak aktif): 1.2
- Light (olahraga ringan 1-3x/minggu): 1.375
- Moderate (olahraga 3-5x/minggu): 1.55
- Active (olahraga 6-7x/minggu): 1.725
- Very Active (olahraga berat/atlet): 1.9

## Teknologi

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Data Storage**: localStorage (browser-based)

## Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm

### Instalasi

1. Clone atau download repository ini

2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## Struktur Folder

```
kcal-calculator/
├── package.json          # Dependencies dan scripts
├── server.js             # Express server
├── public/
│   ├── index.html        # Main HTML
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       ├── app.js        # Main app controller
│       ├── calculator.js # BMI & TDEE calculations
│       └── storage.js    # localStorage handler
└── README.md
```

## Cara Penggunaan

1. **Isi Profil**: Masukkan data diri (jenis kelamin, umur, tinggi, berat, level aktivitas)
2. **Lihat Hasil**: BMI dan kebutuhan kalori harian akan dihitung otomatis
3. **Catat Makanan**: Tambahkan makanan yang dikonsumsi beserta kalorinya
4. **Pantau Progress**: Lihat progress kalori harian di dashboard

## CalorieNinjas API (Opsional)

Untuk menggunakan fitur pencarian makanan internasional:

1. Daftar gratis di https://calorieninjas.com/api
2. Copy API key
3. Buka aplikasi, scroll ke bagian "Pengaturan API"
4. Paste dan simpan API key

Fitur API:
- 10,000 request gratis per bulan
- Akses database makanan internasional
- Informasi nutrisi lengkap (protein, karbo, lemak, dll)

## Catatan

- Data tersimpan di browser (localStorage), tidak perlu login
- Data makanan otomatis direset setiap hari baru
- Pencarian makanan menggunakan database lokal + API (jika dikonfigurasi)
- Aplikasi ini untuk tujuan edukasi, konsultasikan dengan ahli gizi untuk saran diet profesional

## License

MIT
