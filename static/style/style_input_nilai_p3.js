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

document.getElementById('selectPosisiAnggota2').addEventListener('change', function() {
  var selectedValue = this.value;

  if (selectedValue === 'Frontend') {
    document.getElementById('formInputBE').style.display = 'none';
    document.getElementById('formInputFE').style.display = 'block';
  } else if (selectedValue === 'Backend') {
    document.getElementById('formInputBE').style.display = 'block';
    document.getElementById('formInputFE').style.display = 'none';
  }
});