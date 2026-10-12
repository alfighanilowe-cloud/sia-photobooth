# 📸 Sistem Informasi Akuntansi Photobooth (SIA Photobooth)

> **Tugas UTS Mata Kuliah Pengkodean dan Pemrograman – S1 Akuntansi**  
> **Oleh:** Alfifathin Ghanilowe  
> 🌐 **Demo Website:** [https://alfighanilowe-cloud.github.io/sia-photobooth/](https://alfighanilowe-cloud.github.io/sia-photobooth/)

---

## 📌 Deskripsi Proyek
**SIA Photobooth** adalah aplikasi web satu halaman (*single-page web application*) yang dirancang khusus untuk mempermudah pencatatan keuangan dan operasional usaha jasa photobooth. Sistem ini mengintegrasikan pencatatan transaksi operasional secara real-time dengan pemrosesan akuntansi otomatis hingga penyajian laporan keuangan.

Setiap transaksi yang diinput akan **otomatis dijurnal** ke dalam database cloud, lalu diringkas secara sistematis ke dalam **Jurnal Umum**, **Buku Besar**, hingga **Laporan Keuangan** (Laporan Laba Rugi dan Posisi Keuangan/Kas).

---

## ✨ Fitur Utama
- **Dashboard Ringkasan Keuangan:** Tampilan visual interaktif untuk memantau Kas & Bank, Pendapatan Sewa, Beban Operasional, dan Laba Bersih secara real-time.
- **Input Transaksi & Auto-Journaling:** Form pencatatan transaksi persewaan photobooth dan beban operasional yang otomatis menjaga keseimbangan (*balance*) Debit dan Kredit.
- **Jurnal Umum (General Journal):** Rekapitulasi kronologis seluruh transaksi beserta rincian akun debit dan kreditnya.
- **Buku Besar (General Ledger):** Pengelompokan mutasi transaksi berdasarkan masing-masing Kode Akun (Chart of Accounts).
- **Laporan Keuangan Otomatis:**
  - **Laporan Laba Rugi (*Income Statement*):** Menghitung total pendapatan dikurangi beban operasional.
  - **Laporan Posisi Keuangan (*Balance Sheet Overview*):** Pemantauan posisi saldo kas aktif dan akumulasi laba ditahan.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend Framework:** JavaScript / React / Next.js & Tailwind CSSz
- **Database & Backend:** Cloud Database (Firebase / MongoDB / Cloud SQL)
- **Code Editor:** Visual Studio Code
- **Deployment & Version Control:** GitHub Pages & GitHub Repository

---

## 📁 Struktur Repositori

```text
sia-photobooth/
├── frontend/                  # Folder aset & script aplikasi
│   ├── css/
│   ├── js/
│   │   ├── jurnal.js
│   │   ├── bukubesar.js
│   │   └── laporan.js
│   └── index.html
├── index.html                 # Pengalih halaman utama ke frontend/
├── README.md                  # Dokumentasi proyek
└── .gitignore
