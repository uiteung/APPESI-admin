// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetPersyaratanByNIDN } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Get Data Program Studi
CihuyDomReady(() => {

    const requestOptions = {
        method: 'GET',
        headers: {
            'AUTH': token,
            'Content-Type': 'application/json'
        }
    };

    // Untuk Get All Data Pendaftar
    fetch(UrlGetPersyaratanByNIDN, requestOptions)
    .then((result) => {
    return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            data.data.forEach((item, index) => {
                if (item.persyaratan) {
                    const values = item.persyaratan;

                    tableData += `
                    <option value="${values.npm_1}">${values.npm_1}</option>
                    <option value="${values.npm2}">${values.npm2}</option>
                    `
                    ;
                }
            });
            // Tampilkan data pegawai ke dalam tabel
            document.getElementById("inputNPMBE").innerHTML = tableData;
            document.getElementById("inputNPMFE").innerHTML = tableData;
        } else {
            console.error("Data or data.data is undefined or not an array.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});