// Validasi Form yang harus diisi dengan Angka saja
document.addEventListener("DOMContentLoaded", function () {
    // Dapatkan elemen-elemen yang dibutuhkan
    var inputNPM = document.getElementById("inputNPM");
    // var inputTahunAkademik = document.getElementById("inputTahunAkademik");
    var poin1 = document.getElementById("poin1");
    var poin2 = document.getElementById("poin2");
    var poin3 = document.getElementById("poin3");
    var poin4 = document.getElementById("poin4");
    var poin5 = document.getElementById("poin5");
    var poin6 = document.getElementById("poin6");

    // Tambahkan event listener untuk validasi input
    inputNPM.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      inputNPM.value = inputNPM.value.replace(/\D/g, "");
    });
    
    // inputTahunAkademik.addEventListener("input", function () {
    //   // Hapus karakter non-angka dari nilai input
    //   inputTahunAkademik.value = inputTahunAkademik.value.replace(/\D/g, "");
    // });
    
    poin1.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      poin1.value = poin1.value.replace(/\D/g, "");
    });
    
    poin2.addEventListener("input", function () {
        // Hapus karakter non-angka dari nilai input
        poin2.value = poin2.value.replace(/\D/g, "");
      });

    poin3.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      poin3.value = poin3.value.replace(/\D/g, "");
    });

    poin4.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      poin4.value = poin4.value.replace(/\D/g, "");
    });

    poin5.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      poin5.value = poin5.value.replace(/\D/g, "");
    });

    poin6.addEventListener("input", function () {
      // Hapus karakter non-angka dari nilai input
      poin6.value = poin6.value.replace(/\D/g, "");
    });
    
  });