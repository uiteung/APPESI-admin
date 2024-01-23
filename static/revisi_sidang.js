import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";

let token = getCookie("login");
if (token == "") {
    window.location.href("https://euis.ulbi.ac.id/");
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const InputNPM = getValue('inputNilaiNPM');
        const InputTahun = getValue('inputTahunAkademik');
        const InputTipeBimbingan = getValue('selectTipeBimbingan');
        const InputRevisi = getValue('inputRevisi');

        let url = ""
        if (InputTipeBimbingan != "p3") {
            url = "https://kimteungbim.ulbi.ac.id/revisi/"
        } else {
            url = "https://kimteungbim.ulbi.ac.id/sidang/p3/revisi/"
        }

        let split = InputRevisi.split(",")

        let data = {
            "nim": InputNPM,
            "tahun_aka": InputTahun,
            "tipe": InputTipeBimbingan,
            "revisi": split
        };

        console.log(data);

        postWithToken(url, "LOGIN", token, data, (results) => {
            // Handle results for the second action
            if (results.status === "success") {
                showAlert("success", "Input Revisi Sidang Berhasil Disubmit");
            } else {
                showAlert("error", "Input Revisi Sidang Gagal Disubmit");
            }
        });
    });
});

function showAlert(type, message) {
    // Customize this function based on how you want to show alerts
    // For example, using Swal.fire for better UI
    if (type === "success") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: message,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = 'revisi_sidang.html';
        });
    } else if (type === "error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        });
    }
}