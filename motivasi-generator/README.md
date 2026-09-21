# NurMotivasi — Generator Gambar

Mini web app untuk membuat kartu gambar bertema **motivasi, islami, kata mutiara, dan semangat belajar**.

## Fitur
- Live preview canvas.
- 4 kategori konten.
- 4 tema visual.
- Rasio 1:1, 4:5, dan 9:16.
- Inspirasi acak dan contoh cepat.
- Export PNG langsung dari browser.
- Tidak membutuhkan backend atau API key.

## Menjalankan
Buka `index.html` langsung di browser, atau gunakan static server sederhana:

```bash
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080/motivasi-generator/`.

## Catatan konten islami
Kalimat pada demo adalah copy inspiratif umum, bukan kutipan Al-Qur'an atau hadis. Jika nanti ditambahkan ayat/hadis, tampilkan sumber dan referensinya secara akurat agar tidak memberi atribusi yang keliru.

## Pengembangan berikutnya
Arsitektur UI sengaja dibuat tanpa API agar mudah dipasang ke image-generation API di tahap berikutnya. Endpoint dapat ditambahkan di `app.js` untuk menghasilkan latar visual AI, sementara teks tetap dirender dengan canvas agar tipografi konsisten.
