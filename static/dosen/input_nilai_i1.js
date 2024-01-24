import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";

let token = getCookie("login")
if (token == "") {
    window.location.href("https://euis.ulbi.ac.id/")
}

// Penilaian Internship 1
// Form Validation Internship 1
const formValidate = document.querySelector('form');
formValidate.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputNPM = getValue('inputNPM');
    const inputTahunAkademik = getValue('inputTahunAkademik');
    const poin1 = getValue('poin1');
    const poin2 = getValue('poin2');
    const poin3 = getValue('poin3');
    const poin4 = getValue('poin4');
    const poin5 = getValue('poin5');
    const poin6 = getValue('poin6');
    const poin7 = getValue('poin7');

    if (!inputNPM || !inputTahunAkademik || !poin1 || !poin2 || !poin3 || !poin4 || !poin5 || !poin6 || !poin7) {
        Swal.fire({
            icon : 'warning',
            title : 'Oops...',
            text : 'Semua Field Harus Diisi',
        });
        return;
    }

    Swal.fire({
        title: 'Input Penilaian Sidang Internship 3?',
        text: 'Apakah anda yakin ingin input penilaian sidang internship 3?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    })
}).then((result) => {
    if (result.isConfirmed) {
        SubmitNilaiI1();
    }
})

// Untuk Submit Nilai Internship 1
function SubmitNilaiI1() {
    const inputNPM = getValue('inputNPM');
    const inputTahunAkademik = getValue('inputTahunAkademik');
    const poin1 = getValue('poin1');
    const poin2 = getValue('poin2');
    const poin3 = getValue('poin3');
    const poin4 = getValue('poin4');
    const poin5 = getValue('poin5');
    const poin6 = getValue('poin6');
    const poin7 = getValue('poin7');

      let url = "https://kimteungbim.ulbi.ac.id/nilai/"

  
      let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPM),
        "tahun_aka" : inputTahunAkademik,
        "tipe_bimbingan" : "i1",
        "assessment_inputs" : [
            {"assess_name" : "content", "assess_weight": 15, "value" : parseInt(poin1)},
            {"assess_name" : "Delivery Written article and oral presentation", "assess_weight": 15, "value" : parseInt(poin2)},
            {"assess_name" : "Penjelasan dan Pembahasan Terkait topik penelitian", "assess_weight": 15, "value" : parseInt(poin3)},
            {"assess_name" : "Penyusunan Dokumen Penelitian", "assess_weight": 15, "value" : parseInt(poin4)},
            {"assess_name" : "Hasil Penelitian", "assess_weight": 20, "value" : parseInt(poin5)},
            {"assess_name" : "Kesimpulan Penelitian", "assess_weight": 10, "value" : parseInt(poin6)},
            {"assess_name" : "Daftar Pustaka", "assess_weight": 10, "value" : parseInt(poin7)},
        ]
    };
  
      console.log(data);
  
      postWithToken(url, "LOGIN", token,  data, (results) => {
        console.log(results);
        // Handle results for the second action
        if (results.success) {
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
    
}