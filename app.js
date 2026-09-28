// Database sederhana di memory & LocalStorage
let daftarAkun = {
    "101": "Kas",
    "102": "Piutang Usaha",
    "103": "Perlengkapan Foto",
    "121": "Peralatan Kamera & Lighting",
    "201": "Utang Usaha",
    "301": "Modal Pemilik",
    "401": "Pendapatan Jasa Photobooth",
    "501": "Beban Sewa Tempat",
    "502": "Beban Listrik & Internet"
};

let jurnalTransaksi = JSON.parse(localStorage.getItem('jurnal_photobooth')) || [];

// Switch Tab Menu Navigation
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');

    renderAll();
}

// Tambah Transaksi & Generates Jurnal Umum
function tambahTransaksi(e) {
    e.preventDefault();

    const tgl = document.getElementById('tgl-transaksi').value;
    const ket = document.getElementById('ket-transaksi').value;
    const akunDebit = document.getElementById('akun-debit').value;
    const akunKredit = document.getElementById('akun-kredit').value;
    const nominal = parseFloat(document.getElementById('nominal-transaksi').value);

    const transaksiBaru = {
        id: Date.now(),
        tgl,
        ket,
        debitAcc: akunDebit,
        kreditAcc: akunKredit,
        nominal
    };

    jurnalTransaksi.push(transaksiBaru);
    localStorage.setItem('jurnal_photobooth', JSON.stringify(jurnalTransaksi));

    document.getElementById('form-transaksi').reset();
    alert('Transaksi berhasil dicatat ke Jurnal Umum!');
    renderAll();
}

// Render Jurnal Umum
function renderJurnal() {
    const tbody = document.getElementById('tbody-jurnal');
    tbody.innerHTML = '';

    jurnalTransaksi.forEach(item => {
        // Baris Debit
        const trDebit = `
            <tr>
                <td>${item.tgl}</td>
                <td><strong>${daftarAkun[item.debitAcc]}</strong><br><small style="color:#9A9BB0">${item.ket}</small></td>
                <td>${item.debitAcc}</td>
                <td>Rp ${item.nominal.toLocaleString('id-ID')}</td>
                <td>-</td>
            </tr>
        `;
        // Baris Kredit (Indented)
        const trKredit = `
            <tr style="border-bottom: 2px solid #2D2E42;">
                <td></td>
                <td class="indent-account">${daftarAkun[item.kreditAcc]}</td>
                <td>${item.kreditAcc}</td>
                <td>-</td>
                <td>Rp ${item.nominal.toLocaleString('id-ID')}</td>
            </tr>
        `;
        tbody.innerHTML += trDebit + trKredit;
    });
}

// Hitung Saldo Akun (Buku Besar)
function hitungSaldoAkun() {
    let saldo = { "101":0, "102":0, "103":0, "121":0, "201":0, "301":0, "401":0, "501":0, "502":0 };

    jurnalTransaksi.forEach(t => {
        // Debit
        if (["101", "102", "103", "121", "501", "502"].includes(t.debitAcc)) {
            saldo[t.debitAcc] += t.nominal;
        } else {
            saldo[t.debitAcc] -= t.nominal;
        }

        // Kredit
        if (["401", "201", "301"].includes(t.kreditAcc)) {
            saldo[t.kreditAcc] += t.nominal;
        } else {
            saldo[t.kreditAcc] -= t.nominal;
        }
    });

    return saldo;
}

// Render Dashboard & Laporan Keuangan
function renderLaporan() {
    const s = hitungSaldoAkun();

    const totalPendapatan = s["401"];
    const totalBeban = s["501"] + s["502"];
    const labaBersih = totalPendapatan - totalBeban;

    // Dashboard Update
    document.getElementById('dash-kas').innerText = `Rp ${s["101"].toLocaleString('id-ID')}`;
    document.getElementById('dash-pendapatan').innerText = `Rp ${totalPendapatan.toLocaleString('id-ID')}`;
    document.getElementById('dash-beban').innerText = `Rp ${totalBeban.toLocaleString('id-ID')}`;
    document.getElementById('dash-laba').innerText = `Rp ${labaBersih.toLocaleString('id-ID')}`;

    // Laporan Laba Rugi
    document.getElementById('rpt-pendapatan').innerText = `Rp ${totalPendapatan.toLocaleString('id-ID')}`;
    document.getElementById('rpt-beban').innerText = `Rp ${totalBeban.toLocaleString('id-ID')}`;
    document.getElementById('rpt-laba-bersih').innerText = `Rp ${labaBersih.toLocaleString('id-ID')}`;

    // Neraca
    const totalAsetTetap = s["103"] + s["121"];
    const totalAset = s["101"] + s["102"] + totalAsetTetap;
    const ekuitasAkhir = s["301"] + labaBersih;
    const totalPasiva = s["201"] + ekuitasAkhir;

    document.getElementById('rpt-kas').innerText = `Rp ${s["101"].toLocaleString('id-ID')}`;
    document.getElementById('rpt-aset-tetap').innerText = `Rp ${totalAsetTetap.toLocaleString('id-ID')}`;
    document.getElementById('rpt-total-aset').innerText = `Rp ${totalAset.toLocaleString('id-ID')}`;
    
    document.getElementById('rpt-utang').innerText = `Rp ${s["201"].toLocaleString('id-ID')}`;
    document.getElementById('rpt-ekuitas').innerText = `Rp ${ekuitasAkhir.toLocaleString('id-ID')}`;
    document.getElementById('rpt-total-pasiva').innerText = `Rp ${totalPasiva.toLocaleString('id-ID')}`;
}

function renderAll() {
    renderJurnal();
    renderLaporan();
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    document.getElementById('tgl-transaksi').valueAsDate = new Date();
    renderAll();
});