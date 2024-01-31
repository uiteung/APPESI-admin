// Validasi Form yang harus diisi dengan Angka saja
document.addEventListener("DOMContentLoaded", function () {
    // Dapatkan elemen-elemen yang dibutuhkan
    var inputNPMBE = document.getElementById("inputNPMBE");
    var inputNilaiBE1 = document.getElementById("inputNilaiBE1");
    var inputNilaiBE2 = document.getElementById("inputNilaiBE2");
    var inputNilaiBE3 = document.getElementById("inputNilaiBE3");
    var inputNilaiBE4 = document.getElementById("inputNilaiBE4");

    var inputNPMFE = document.getElementById("inputNPMFE");
    var inputNilaiFE1 = document.getElementById("inputNilaiFE1");
    var inputNilaiFE2 = document.getElementById("inputNilaiFE2");
    var inputNilaiFE3 = document.getElementById("inputNilaiFE3");
    var inputNilaiFE4 = document.getElementById("inputNilaiFE4");

    // Tambahkan event listener untuk validasi input
    inputNPMBE.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNPMBE.value = inputNPMBE.value.replace(/\D/g, "");
    });
    
    inputNilaiBE1.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiBE1.value = inputNilaiBE1.value.replace(/\D/g, "");
    });
    
    inputNilaiBE2.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiBE2.value = inputNilaiBE2.value.replace(/\D/g, "");
    });
    
    inputNilaiBE3.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiBE3.value = inputNilaiBE3.value.replace(/\D/g, "");
    });

    inputNilaiBE4.addEventListener("input", function () {
        // Hapus karakter non-angka dari nilai input
        inputNilaiBE4.value = inputNilaiBE4.value.replace(/\D/g, "");
    });

    inputNPMFE.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNPMFE.value = inputNPMFE.value.replace(/\D/g, "");
    });
    
    inputNilaiFE1.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiFE1.value = inputNilaiFE1.value.replace(/\D/g, "");
    });
    
    inputNilaiFE2.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiFE2.value = inputNilaiFE2.value.replace(/\D/g, "");
    });
    
    inputNilaiFE3.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiFE3.value = inputNilaiFE3.value.replace(/\D/g, "");
    });

    inputNilaiFE4.addEventListener("input", function () {
        // Hapus karakter non-angka dari nilai input
        inputNilaiFE4.value = inputNilaiFE4.value.replace(/\D/g, "");
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Menangkap elemen select
  var selectPosisiAnggota2 = document.getElementById('selectPosisiAnggota2');
  var titleForm = document.getElementById('titleForm');
  var labelNilai1 = document.getElementById('labelNilai1');
  var labelNilai2 = document.getElementById('labelNilai2');
  var labelNilai3 = document.getElementById('labelNilai3');
  var labelNilai4 = document.getElementById('labelNilai4');

  // Menambahkan event listener untuk mendeteksi perubahan pada elemen select
  selectPosisiAnggota2.addEventListener('change', function() {
    // Memperbarui judul form berdasarkan pilihan yang dipilih
    if (selectPosisiAnggota2.value === 'Frontend') {
      titleForm.innerText = 'Penilaian Frontend Developer';
      labelNilai1.innerText = 'Semua JS Dirilis Versi di JSDelivr dari Semua JS Buatan Sendiri yang Dipakai Frontend';
      labelNilai2.innerText = 'Pemanggilan JSDelivr Pada HTML yang Sudah Pasti Pakai Type Module';
      labelNilai3.innerText = 'Kelengkapan CSS, Favicon, 404.html, Modal, Transisi, Loading, Responsive dan Hasil Analisis dari gtmetrix.com';
      labelNilai4.innerText = 'Memakai Custom Domain pada GitHub Pages nya';

      // Mengganti ID dan placeholder untuk input nilai sesuai dengan Frontend
      document.getElementById('inputNilaiBE1').id = 'inputNilaiFE1';
      document.getElementById('inputNilaiBE2').id = 'inputNilaiFE2';
      document.getElementById('inputNilaiBE3').id = 'inputNilaiFE3';
      document.getElementById('inputNilaiBE4').id = 'inputNilaiFE4';

    } 
    // else {
    //   // Default jika tidak ada pilihan yang dipilih
    //   titleForm.innerText = 'Penilaian Developer';
    //   labelNilai1.innerText = 'Semua Endpoint Berfungsi Termasuk Otorisasi dan Autentikasi Token';
    //   labelNilai2.innerText = 'Package Dibuat Sendiri dan Semua Digunakan';
    //   labelNilai3.innerText = 'Semua Endpoint di GCF Memakai Package yang Dibuat dan Lokasi Server di Jakarta';
    //   labelNilai4.innerText = 'Terintegrasi dengan wa.my.id';

    //   // Mengganti ID dan placeholder untuk input nilai sesuai dengan default
    //   document.getElementById('inputNilaiFE1').id = 'inputNilaiBE1';
    //   document.getElementById('inputNilaiFE2').id = 'inputNilaiBE2';
    //   document.getElementById('inputNilaiFE3').id = 'inputNilaiBE3';
    //   document.getElementById('inputNilaiFE4').id = 'inputNilaiBE4';
    // }
  });
});