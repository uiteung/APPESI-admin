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

        // Use SweetAlert for confirmation
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to submit the form?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Continue with form submission
                submitForm();
            }
        });
    });

    function submitForm() {
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
            // alert(results.status)
            console.log(results);
            if (results.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: results.status,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = 'revisi_sidang.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: results.error_message || 'Failed to submit the form.',
                });
            }
        });
    }
});
