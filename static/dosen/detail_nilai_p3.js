import { token } from "../controller/cookies.js";
import { UrlGetNilaiByNPM } from "../controller/template.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

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
const GetNilaiByNPM = UrlGetNilaiByNPM + `?npm=${_npm}`;

// Untuk Set Value NPM
setValue('npm', _npm);

// Ambil data dari endpoint
fetch(GetNilaiByNPM, requestOptions)
    .then(response => response.json())
    .then(data => {
        // Ambil elemen tbody dari tabel
        var tbody = document.getElementById("tablebody-nilai");
        const getNameByCode = (code) => codeToNameMapping[code] || "Tidak Ada";

        // Iterasi melalui data JSON dan membuat baris tabel untuk setiap entri
        data.data.forEach(function(item) {
            // Membuat baris tabel
            var row = document.createElement("tr");
            
            // Mengisi kolom tabel dengan data
            row.innerHTML = `
                <td hidden></td>
                <td>${getNameByCode(item.penilai)}</td>
                <td>${item.nilai[0].value}</td>
                <td>${item.nilai[1].value}</td>
                <td>${item.nilai[2].value}</td>
                <td>${item.nilai[3].value}</td>
                <td>
                    <button type="button" class="btn btn-info m-1" data-npm=${_npm} data-dosen=${item.penilai}>Update Nilai</button>
                </td>  
            `;
            
            // Menambahkan baris ke dalam tbody
            tbody.appendChild(row);
        });

        // Menambahkan event listener untuk button "Update"
        const updateNilaiButtons = document.querySelectorAll('.btn-info');
        updateNilaiButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const _npm = event.target.getAttribute('data-npm');
                const _nidn = event.target.getAttribute('data-dosen');
                window.location.href = `update_nilai_p3.html?_npm=${_npm}&_nidn=${_nidn}`;
            })
        })
    })
    .catch(error => console.log('Error fetching data:', error));
