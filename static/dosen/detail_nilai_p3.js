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

// Ambil _npm dari URL
const urlParams = new URLSearchParams(window.location.search);
const _npm = urlParams.get('_npm');
const GetNilaiByNPM = UrlGetNilaiByNPM + `/${_npm}`;

// Untuk Set Value NPM
setValue('npm', _npm);

// Ambil data dari endpoint
fetch(GetNilaiByNPM, requestOptions)
    .then(response => response.json())
    .then(data => {
        // Ambil elemen tbody dari tabel
        var tbody = document.getElementById("tablebody-nilai");

        // Iterasi melalui data JSON dan membuat baris tabel untuk setiap entri
        data.data.forEach(function(item) {
            // Membuat baris tabel
            var row = document.createElement("tr");
            
            // Mengisi kolom tabel dengan data
            row.innerHTML = `
                <td hidden></td>
                <td>${item.penilai}</td>
                <td>${item.nilai[0].value}</td>
                <td>${item.nilai[1].value}</td>
                <td>${item.nilai[2].value}</td>
                <td>${item.nilai[3].value}</td>
            `;
            
            // Menambahkan baris ke dalam tbody
            tbody.appendChild(row);
        });
    })
    .catch(error => console.log('Error fetching data:', error));
