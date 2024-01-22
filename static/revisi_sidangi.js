// Import library dan function yang dibutukan
import { getValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { token } from "../controller/cookies.js"

var header = new Headers();
// header.append("AUTH", token);
header.append("AUTH", token)
header.append("Content-Type", "application/json");

// Event listener for form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Your existing code for handling the button click
    const InputNPM = getValue('inputNilaiNIM');
    const InputTahun = getValue('inputNilaiTahun');
    const InputRevisi = getValue('inputrevisi');

    // Check if all required fields are filled
    if (!InputTahun || !InputNPM || !InputRevisi) {
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
            SubmitPendaftaranSidangP3();
        }
    });
});

// Untuk POST Pendaftaran Sidang P3
// Membuat function untuk mengirimkan data pendaftaran sidang p3
function SubmitPendaftaranSidangP3() {
    const InputNPM = getValue('inputNilaiNIM');
    const InputTahun = getValue('inputNilaiTahun');
    const InputRevisi = getValue('inputrevisi');

    let split = InputRevisi.split(",")

    const myData = {
        "nim" : InputNPM,
        "tahun_aka" : InputTahun,
        "revisi" : split
    };

    console.log(myData);

    fetch("https://kimteungbim.ulbi.ac.id/public/revisi/", {
        method : "POST",
        headers: header,
        body : JSON.stringify(myData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            Swal.fire({
                icon : 'success',
                title : 'Sukses!',
                text : 'Pendaftaran Sidang Proyek 3 Berhasil Disubmit',
                showConfirmButton : false,
                timer : 1500
            })
            .then(() => {
                window.location.href = 'success_daftarp3.html';
            })
        } else {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : 'Pendaftaran Sidang Proyek 3 Gagal Disubmit'
            })
        }
    })
    .catch(error => {
        console.error("Error saat melakukan POST Data : ", error);
    });
}