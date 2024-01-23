import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";

let token = getCookie("login")
if (token == "") {
    window.location.href("https://euis.ulbi.ac.id/")
}

// Penilaian BackEnd Proyek 3
// Form Validation BackEnd Proyek 3
const formValidateBE = document.querySelector('formInputBE');
formValidateBE.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputNPMBE = getValue('inputNPMBE');
    const inputTahunAkademikBE = getValue('inputTahunAkademikBE');
    const inputNilaiBE1 = getValue('inputNilaiBE1');
    const inputNilaiBE2 = getValue('inputNilaiBE2');
    const inputNilaiBE3 = getValue('inputNilaiBE3');
    const inputNilaiBE4 = getValue('inputNilaiBE4');

    if (!inputNPMBE || !inputTahunAkademikBE || !inputNilaiBE1 || !inputNilaiBE2 || !inputNilaiBE3 || !inputNilaiBE4) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua Field Harus Diisi',
        });
        return;
    }

    // Alert konfirmasi
    Swal.fire({
        title: 'Input Penilaian Sidang Proyek 3?',
        text: 'Apakah anda yakin ingin input penilaian sidang proyek 3?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    })
}).then((result) => {
    if (result.isConfirmed) {
        SubmitNilaiBackEndP3();
    }
})

// Untuk Submit Nilai BackEnd
function SubmitNilaiBackEndP3() {
      const inputNPMBE = getValue('inputNPMBE');
      const inputTahunAkademikBE = getValue('inputTahunAkademikBE');
      const InputTipe = "p3";
      const inputNilaiBE1 = getValue('inputNilaiBE1');
      const inputNilaiBE2 = getValue('inputNilaiBE2');
      const inputNilaiBE3 = getValue('inputNilaiBE3');
      const inputNilaiBE4 = getValue('inputNilaiBE4');

      let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

      let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPMBE),
        "tahun_aka" : inputTahunAkademikBE,
        "tipe_bimbingan" : InputTipe,
        "assessment_inputs" : [
            {"assess_name" : "Semua endpoint berfungsi termasuk otorisasi dan autentikasi token", "assess_weight": 25, "value" : parseInt(inputNilaiBE1)},
            {"assess_name" : "Package dibuat sendiri dan semua digunakan", "assess_weight": 25, "value" : parseInt(inputNilaiBE2)},
            {"assess_name" : "Semua endpoint di GCF memakai package yang dibuat dan lokasi server di jakarta", "assess_weight": 25, "value" : parseInt(inputNilaiBE3)},
            {"assess_name" : "Terintegrasi dengan wa.my.id", "assess_weight": 25, "value" : parseInt(inputNilaiBE4)},
        ]
    };

      postWithToken(url, "LOGIN", token,  data, (results) => {
        // Handle results for the second action
        if (results.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Penilaian Sidang Proyek 3 berhasil disubmit!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
      });
};


// Penilaian FrontEnd Proyek 3
// Form Validation FrontEnd Proyek 3
const formValidateFE = document.querySelector('formInputFE');
formValidateFE.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputNPMFE = getValue('inputNPMFE');
    const inputTahunAkademikFE = getValue('inputTahunAkademikFE');
    const inputNilaiFE1 = getValue('inputNilaiFE1');
    const inputNilaiFE2 = getValue('inputNilaiFE2');
    const inputNilaiFE3 = getValue('inputNilaiFE3');
    const inputNilaiFE4 = getValue('inputNilaiFE4');

    if (!inputNPMFE || !inputTahunAkademikFE || !inputNilaiFE1 || !inputNilaiFE2 || !inputNilaiFE3 || !inputNilaiFE4) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua Field Harus Diisi',
        });
        return;
    }

    // Alert konfirmasi
    Swal.fire({
        title: 'Input Penilaian Sidang Proyek 3?',
        text: 'Apakah anda yakin ingin input penilaian sidang proyek 3?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    })
}).then((result) => {
    if (result.isConfirmed) {
        SubmitNilaiFrontEndP3();
    }
})

// Untuk Submit Nilai FrontEnd
function SubmitNilaiFrontEndP3() {
      const inputNPMFE = getValue('inputNPMFE');
      const inputTahunAkademikFE = getValue('inputTahunAkademikFE');
      const InputTipe = "p3";
      const inputNilaiFE1 = getValue('inputNilaiFE1');
      const inputNilaiFE2 = getValue('inputNilaiFE2');
      const inputNilaiFE3 = getValue('inputNilaiFE3');
      const inputNilaiFE4 = getValue('inputNilaiFE4');

      let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

      let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPMFE),
        "tahun_aka" : inputTahunAkademikFE,
        "tipe_bimbingan" : InputTipe,
        "assessment_inputs" : [
            {"assess_name" : "semua js di rilis versi di jsdelivr dari semua js buatan sendiri yang dipakai frontend", "assess_weight": 25, "value" : parseInt(inputNilaiFE1)},
            {"assess_name" : "pemanggilan jsdelivr pada html yang sudah pasti pakai type module", "assess_weight": 25, "value" : parseInt(inputNilaiFE2)},
            {"assess_name" : "kelengkapan css, favicon, 404.html, modal, transisi, loading, responsive dan hasil analisis dari gtmetrix.com", "assess_weight": 25, "value" : parseInt(inputNilaiFE3)},
            {"assess_name" : "memakai custom domain pada github pages nya.", "assess_weight": 25, "value" : parseInt(inputNilaiFE4)},
        ]
    };
  
      postWithToken(url, "LOGIN", token,  data, (results) => {
        // Handle results for the second action
        if (results.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Penilaian Sidang Proyek 3 berhasil disubmit!',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
    });
};
// function responsesdata(value) {
//     console.log(value)
// }