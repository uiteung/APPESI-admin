import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";

let token = getCookie("login")
if (token == "") {
    window.location.href("https://euis.ulbi.ac.id/")
}

// Penilaian BackEnd Proyek 3
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formInput");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        Swal.fire({
            title : 'Input Nilai Sidang Proyek 3',
            text: 'Apakah anda yakin ingin input Nilai Sidang Proyek 3?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
        }).then((result) => {
            if (result.isConfirmed) {
                // Continue with form submission
                SubmitNilaiBackEndP3();
            }
        });
    });
    // Untuk Submit Nilai BackEnd
    function SubmitNilaiBackEndP3() {
        const inputNPM = getValue('inputNPM');
        const inputTahunAkademik = getValue('inputTahunAkademik');
        const InputTipe = "p3";
        const inputNilaiBE1 = getValue('inputNilaiBE1');
        const inputNilaiBE2 = getValue('inputNilaiBE2');
        const inputNilaiBE3 = getValue('inputNilaiBE3');
        const inputNilaiBE4 = getValue('inputNilaiBE4');

        let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

        let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPM),
        "tahun_aka" : inputTahunAkademik,
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
        if (results.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: results.status,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'input_nilai_p3.html';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
        });
    };
})


// Penilaian FrontEnd Proyek 3
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formInput");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Use SweetAlert for confirmation
        Swal.fire({
            title: 'Input Nilai Sidang Proyek 3',
            text: 'Apakah anda yakin ingin input Nilai Sidang Proyek 3?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
        }).then((result) => {
            if (result.isConfirmed) {
                // Continue with form submission
                SubmitNilaiFrontEndP3();
            }
        });
    });

    // Untuk Submit Nilai FrontEnd
    function SubmitNilaiFrontEndP3() {
        const inputNPM = getValue('inputNPM');
        const inputTahunAkademik = getValue('inputTahunAkademik');
        const InputTipe = "p3";
        const inputNilaiFE1 = getValue('inputNilaiFE1');
        const inputNilaiFE2 = getValue('inputNilaiFE2');
        const inputNilaiFE3 = getValue('inputNilaiFE3');
        const inputNilaiFE4 = getValue('inputNilaiFE4');

        let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

        let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPM),
        "tahun_aka" : inputTahunAkademik,
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
        if (results.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: results.status,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'input_nilai_p3.html';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
      });
    };
})



// function responsesdata(value) {
//     console.log(value)
// }