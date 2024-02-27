// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetPendaftaranI2 } from "../controller/template.js";
import { token } from "../controller/cookies.js"

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

    // Untuk Get All Data Pendaftar
    fetch(UrlGetPendaftaranI2, requestOptions)
    .then((result) => {
    return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            data.data.forEach((item, index) => {
                if (item.persyaratan) {
                    const values = item.persyaratan;

                    // Function untuk ambil nama dosen dari NIDN
                    const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';

                    // Your existing mapping logic here
                    tableData += `
                        <tr style="text-align: center; vertical-align: middle">
                            <td hidden></td>
                            <td>
                                <p class="fw-bold mb-1">${index + 1}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${values.npm}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${getNameByCode(values.pembimbing1)}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${values.url_proposal_penelitian}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${values.url_plagiarisme_proposal}</p>
                            </td>
                        </tr>`;
                }
            });
            // Tampilkan data pegawai ke dalam tabel
            document.getElementById("tablebody").innerHTML = tableData;

            // Menghitung banyaknya data
            const totalData = data.data.length;

            // Untuk menampilkan jumlah pengajuan sidang di html
            const jumlahPengjuanSidangElement = CihuyId("jumlahPengjuanSidang");
            if (jumlahPengjuanSidangElement) {
                jumlahPengjuanSidangElement.innerText = `Jumlah Pengajuan: ${totalData}`;
            }
    
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
			if (i >= mulaiindex && i < akhirindex) {
				baris[i].style.display = "table-row";
			} else {
				baris[i].style.display = "none";
			}
		}
	}

    // Fungsi untuk Update Pagination
    function updatePagination() {
        halamanSaatIni.textContent = `Halaman ${halamannow}`;
    }

    // Button Pagination (Sebelumnya)
    buttonPreviousPage.addEventListener("click", () => {
        if (halamannow > 1) {
            halamannow--;
            displayData(halamannow);
            updatePagination();
        }
    });

    // Button Pagination (Selanjutnya)
	buttonNextPage.addEventListener("click", () => {
		const totalPages = Math.ceil(
			tablebody.querySelectorAll("#tablebody tr").length / itemPerPage
		);
		if (halamannow < totalPages) {
			halamannow++;
			displayData(halamannow);
			updatePagination();
		}
	});
});

// Fitur Search
document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.getElementById("searchInput");
	const tableBody = document.getElementById("tablebody").getElementsByTagName("tr");
	searchInput.addEventListener("input", function () {
		const searchText = searchInput.value.toLowerCase();

		for (const row of tableBody) {
			const cells = row.getElementsByTagName("td");
			let rowMatchesSearch = false;

			for (const cell of cells) {
				if (cell.textContent.toLowerCase().includes(searchText)) {
					rowMatchesSearch = true;
					break;
				}
			}
			row.style.display = rowMatchesSearch ? "" : "none";
		}
	});
});