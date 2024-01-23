// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { token } from "./controller/cookies.js";

if (token == "") {
    window.location.href = "https://euis.ulbi.ac.id/";
}

// Event listener for form submission
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Your existing code for handling the button click
    const InputNPM = getValue('inputNilaiNPM');
    const InputTahun = getValue('inputTahunAkademik');
    const InputTipeBimbingan = getValue('selectTipeBimbingan');
    const InputRevisi = getValue('inputRevisi');

    // Check if all required fields are filled
    if (!InputTahun || !InputNPM || !InputTipeBimbingan || !InputRevisi) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua Field Harus Diisi',
        });
        return;
    }

    // Your existing code for displaying confirmation dialog and submitting data
    Swal.fire({
        title: 'Submit Revisi sidang?',
        text: 'Apakah anda yakin ingin submit revisi sidang?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            // Call the correct function (SubmitPendaftaranSidangP3)

            const myData = {
                "nim": InputNPM,
                "tahun_aka": InputTahun,
                "tipe": InputTipeBimbingan,
                "revisi": InputRevisi.split(",")
            };

            console.log(myData);

            // Pengkondisian endpoint
            let url = "";
            if (InputTipeBimbingan != "p3") {
                url = "https://kimteungbim.ulbi.ac.id/revisi/";
            } else {
                url = "https://kimteungbim.ulbi.ac.id/sidang/p3/revisi/";
            }

            postWithToken(url, "LOGIN", token, myData)
                .then(data => {
                    // Handle results for the second action
                    if (data.status === "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sukses!',
                            text: 'Input Revisi Sidang Proyek 3 Berhasil Disubmit',
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then(() => {
                                window.location.href = 'revisi_sidang.html';
                            });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Input Revisi Sidang Proyek 3 Gagal Disubmit'
                        });
                    }
                })
                .catch(error => {
                    console.error("Error saat melakukan POST Data : ", error);
                });
        }
    });
});