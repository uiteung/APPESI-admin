// Validasi Form NPM Harus diisi dengan Angka saja
document.addEventListener("DOMContentLoaded", function () {
    // Dapatkan elemen-elemen yang dibutuhkan
    var inputNilaiNPM = document.getElementById("inputNilaiNPM");

    // Tambahkan event listener untuk validasi input NPM Anggota 1
    inputNilaiNPM.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNilaiNPM.value = inputNilaiNPM.value.replace(/\D/g, "");
    });
  });