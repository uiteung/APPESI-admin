// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetPersyaratanByNIDN } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Get Data Program Studi
CihuyDomReady(() => {
    const tablebody = CihuyId("tablebody");
    const buttonPreviousPage = CihuyId("prevPageBtn");
    const buttonNextPage = CihuyId("nextPageBtn");
    const halamanSaatIni = CihuyId("currentPage");
    const itemPerPage = 5;
    let halamannow = 1;

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
                    const jadwal = item.jadwal;

                    // Format tanggal
                    const waktuSidangFormatted = new Date(jadwal.waktuSidang).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });

                    // Your existing mapping logic here
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
    
            // Untuk Memunculkan Pagination Halamannya
            displayData(halamannow);
            updatePagination();
        } else {
            console.error("Data or data.data is undefined or not an array.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Fungsi untuk Menampilkan Data
	function displayData(page) {
		const baris = CihuyQuerySelector("#tablebody tr");
		const mulaiindex = (page - 1) * itemPerPage;
		const akhirindex = mulaiindex + itemPerPage;

		for (let i = 0; i < baris.length; i++) {
			baris[i].style.display = "none";
		}
	}
});