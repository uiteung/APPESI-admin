// Import library dan function yang dibutukan
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { getValue, setInner, setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlCekPendaftaranSidangP3, UrlPostPendaftaranSidangP3 } from "../controller/template.js";
import { token } from "../controller/cookies.js"

var header = new Headers();
// header.append("AUTH", token);
header.append("AUTH", token)
header.append("Content-Type", "application/json");

// Cek Pendaftaran Sidang P3
await getWithHeader(UrlCekPendaftaranSidangP3, "AUTH", token, inputDaftarSidangP3);

async function inputDaftarSidangP3(result) {
    const bgSuccess = 'alert alert-success';

    if (result.data) {
        setInner('AlertDaftarSidang', 'Anda Sudah Mengisi Form Persyaratan, Tunggu Informasi Selanjutnya!');
        document.getElementById('AlertDaftarSidang').className = bgSuccess;

        const jadwal = result.data.jadwal;
        const persyaratan = result.data.persyaratan;

        setValue('inputNPMAnggota1', persyaratan.npm_1);
        setValue('selectPosisiAnggota1', persyaratan.posisi_mhs_1);
        setValue('inputNPMAnggota2', persyaratan.npm2);
        setValue('selectPosisiAnggota2', persyaratan.posisi_mhs_2);
        setValue('selectPembimbing', persyaratan.pembimbing);
        // setValue('tanggalSidang', jadwal.waktuSidang);
        setValue('selectPenguji', jadwal.penguji2);
        setValue('inputUrlPelatihan', persyaratan.url_pengabdian);
        setValue('inputDaftarHadir', persyaratan.daftar_hadir);
        setValue('inputBuktiSubmitArtikel', persyaratan.bukti_artikel);
        setValue('inputUrlGoogleBook', persyaratan.url_google_book);
    }
}

// Event listener for form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Your existing code for handling the button click
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    // const selectKelasAnggota1 = getValue('selectKelasAnggota1');
    // const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    // const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    // const selectKelasAnggota2 = getValue('selectKelasAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const selectPenguji = getValue('selectPenguji');
    const tanggalSidang = getValue('tanggalSidang');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    // Check if all required fields are filled
    if (!inputNPMAnggota1 || !selectPosisiAnggota1 || !selectPembimbing || !selectPenguji || !tanggalSidang || !inputUrlPelatihan ||
        !inputDaftarHadir || !inputBuktiSubmitArtikel || !inputUrlGoogleBook) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua Field Harus Diisi',
        });
        return;
    }

    // Your existing code for displaying confirmation dialog and submitting data
    Swal.fire({
        title: 'Submit Pendaftaran Sidang Proyek 3?',
        text: 'Apakah anda yakin ingin submit pendaftaran sidang proyek 3?',
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
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    // const selectKelasAnggota1 = getValue('selectKelasAnggota1');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    // const selectKelasAnggota2 = getValue('selectKelasAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const selectPenguji = getValue('selectPenguji');
    const tanggalSidang = getValue('tanggalSidang');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    const myData = {
        "npm_1": inputNPMAnggota1, 
        "posisi_mhs_1": selectPosisiAnggota1, 
        "npm2": inputNPMAnggota2,
        "posisi_mhs_2": selectPosisiAnggota2, 
        "pembimbing": selectPembimbing, 
        "url_pengabdian": inputUrlPelatihan, 
        "daftar_hadir": inputDaftarHadir, 
        "bukti_artikel": inputBuktiSubmitArtikel, 
        "url_google_book": inputUrlGoogleBook,
        "jadwal": {
            "penguji1": selectPembimbing,
            "penguji2": selectPenguji,
            "waktu_sidang": tanggalSidang,
            "ruangan":  "202"
        }
    };

    console.log(myData);

    fetch(UrlPostPendaftaranSidangP3, {
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