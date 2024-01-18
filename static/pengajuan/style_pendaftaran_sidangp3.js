// Kondisi Ketika Posisi 1 Diisi FullStack
document.addEventListener("DOMContentLoaded", function () {
    // Dapatkan elemen-elemen yang dibutuhkan
    var posisiAnggota1 = document.getElementById("selectPosisiAnggota1");
    var npmAnggota2 = document.getElementById("inputNPMAnggota2");
    var posisiAnggota2 = document.getElementById("selectPosisiAnggota2");

    // Tambahkan event listener untuk mengatur properti disabled
    posisiAnggota1.addEventListener("change", function () {
      if (posisiAnggota1.value === "FullStack") {
        // Jika posisi anggota 1 adalah FullStack, nonaktifkan input NPM Anggota 2 dan Posisi Anggota 2
        npmAnggota2.disabled = true;
        posisiAnggota2.disabled = true;
      } else {
        // Jika posisi anggota 1 bukan FullStack, aktifkan kembali input NPM Anggota 2 dan Posisi Anggota 2
        npmAnggota2.disabled = false;
        posisiAnggota2.disabled = false;
      }
    });
  });

// Validasi Form NPM Harus diisi dengan Angka saja
document.addEventListener("DOMContentLoaded", function () {
    // Dapatkan elemen-elemen yang dibutuhkan
    var npmAnggota1 = document.getElementById("inputNPMAnggota1");
    var npmAnggota2 = document.getElementById("inputNPMAnggota2");

    // Tambahkan event listener untuk validasi input NPM Anggota 1
    npmAnggota1.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      npmAnggota1.value = npmAnggota1.value.replace(/\D/g, "");
    });

    // Tambahkan event listener untuk validasi input NPM Anggota 2
    npmAnggota2.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      npmAnggota2.value = npmAnggota2.value.replace(/\D/g, "");
    });
  });
