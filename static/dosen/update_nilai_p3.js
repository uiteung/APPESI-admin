import { token } from "../controller/cookies.js";
import { UrlGetNilaiByNPMNIDN } from "../controller/template.js";
// import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
	method: "GET",
	headers: header
};

// Mapping NIDN ke Nama
const codeToNameMapping = {
    "0420058801" : "Roni Andarsyah, S.T.,M.Kom.,SFPC",
    "0427078404" : "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC",
    "0407117405" : "M. Yusril Helmi Setyawan, S.Kom.,M.Kom.,SFPC",
    "0410118609" : "Rolly Maulana Awangga, S.T.,MT.,CAIP,SFPC",
    "0402058005" : "Mohamad Nurkamal Fauzan, S.T.,M.T.,SFPC",
    "0423127804" : "Roni Habibi, S.Kom.,M.T.,SFPC",
    "0416048803" : "Syafrial Fachri Pane,ST. M.TI.,EBDP.,CDSP.,SFPC",
    "0402047205" : "Rd. Nuraini Siti Fatonah, S.S.,M.Hum.,SFPC",
    "0415048901" : "Nisa Hanum Harani, S.Kom.,M.T.,CDSP.,SFPC",
    "0415107901" : "Woro Isti Rahayu, S.T.,M.T.,SFPC",
    "0403117607" : "Noviana Riza, S.Si.,M.T.,SFPC",
};

// Ambil _npm dari URL
const urlParams = new URLSearchParams(window.location.search);
const _npm = urlParams.get('_npm');
const GetNilaiByNPM_NIDN = UrlGetNilaiByNPMNIDN + `?npm=${_npm}`;
const getNameByCode = (code) => codeToNameMapping[code] || "Tidak Ada";

// Get Data dan Simpan di Form ketika sudah isi
await getWithHeader(GetNilaiByNPM_NIDN, "LOGIN", token, nilaiMahasiswaP3);

async function nilaiMahasiswaP3(result) {
    if (result.success) {
        const data = result.data[0]; // Ambil data pertama dari array data
        const nilai = data.nilai;

        // Isi nilai dari JSON ke dalam input HTML
        document.getElementById('penilai').value = getNameByCode(data.penilai);
        document.getElementById('npm').value = data.nim;
        document.getElementById('nilai1').value = nilai[0].value;
        document.getElementById('nilai2').value = nilai[1].value;
        document.getElementById('nilai3').value = nilai[2].value;
        document.getElementById('nilai4').value = nilai[3].value;
        document.getElementById('poin1').innerText  = nilai[0].assess_name;
        document.getElementById('poin2').innerText  = nilai[1].assess_name;
        document.getElementById('poin3').innerText  = nilai[2].assess_name;
        document.getElementById('poin4').innerText  = nilai[3].assess_name;
    } else {
        console.log(result);
    }
}

// // Untuk Update Nilai P3
// function updateNilaiP3(newData) {
//     const updateData = {
//         "assessment_inputs" : newData 
//     };

//     try {
//         const response = fetch("https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/", {
//             method : 'PATCH',
//             headers : {
//                 'Content-Type' : 'application/json',
//                 'login' : token
//             },
//             body : JSON.stringify(updateData)
//         });

//         const result = response.json();
//         // console.log('Respon dari server : ', result);
//         console.log('Respon dari server : ', result);
//         // SweetAlert success
//         Swal.fire({
//             icon: 'success',
//             title: 'Sukses!',
//             text: 'Nilai berhasil diperbarui'
//         });
//     } catch (error) {
//         // console.error('Terjadi kesalahan : ', error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Terjadi kesalahan saat memperbarui nilai'
//         });
//     }
// }

// // Event listener untuk tombol "Update"
// document.addEventListener('DOMContentLoaded', function() {
//     const updateButton = document.getElementById('updateButton');
//     updateButton.addEventListener('click', function() {
//         // Tampilkan alert konfirmasi menggunakan SweetAlert
//         Swal.fire({
//             title: 'Konfirmasi',
//             text: 'Apakah Anda yakin ingin memperbarui nilai?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Ya, perbarui',
//             cancelButtonText: 'Batal'
//         }).then((result) => {
//             // Jika pengguna menekan tombol "Ya, perbarui"
//             if (result.isConfirmed) {
//                 // Dapatkan nilai baru dari input
//                 const newValue = [
//                     {
//                         "assess_name": document.getElementById('poin1').innerText,
//                         "assess_weight": 25,
//                         "value": parseInt(document.getElementById('nilai1').value)
//                     },
//                     {
//                         "assess_name": document.getElementById('poin2').innerText,
//                         "assess_weight": 25,
//                         "value": parseInt(document.getElementById('nilai2').value)
//                     },
//                     {
//                         "assess_name": document.getElementById('poin3').innerText,
//                         "assess_weight": 25,
//                         "value": parseInt(document.getElementById('nilai3').value)
//                     },
//                     {
//                         "assess_name": document.getElementById('poin4').innerText,
//                         "assess_weight": 25,
//                         "value": parseInt(document.getElementById('nilai4').value)
//                     }
//                 ];

//                 // Panggil fungsi pembaruan nilai dengan nilai baru
//                 updateNilaiP3(newValue);
//             }
//         });
//     });
// });
