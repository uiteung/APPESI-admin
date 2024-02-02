// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllPersyaratan } from "./controller/template.js";
import { token } from "./controller/cookies.js"

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
        "0427078401" : "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC",
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

    // Function untuk ambil nama dosen dari NIDN
    const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';

    // Get Data Program Studi
    fetch(UrlGetAllPersyaratan, requestOptions)
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

                        tableData += `
                            <tr>
                                <td>
                                    <p class="fw-bold mb-1">${index + 1}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${values.npm_1}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${values.npm2}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${getNameByCode(values.pembimbing)}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${getNameByCode(jadwal.penguji2)}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${waktuSidangFormatted}</p>
                                </td>
                            </tr>`;
                    }
                });

                document.getElementById("tablebody").innerHTML = tableData;

                const totalData = data.data.length;
                const jumlahPengjuanSidangElement = CihuyId("jumlahPengjuanSidang");
                if (jumlahPengjuanSidangElement) {
                    jumlahPengjuanSidangElement.innerText = `Jumlah Pengajuan: ${totalData}`;
                }

                displayData(halamannow);
                updatePagination();
            } else {
                console.error("Data or data.data is undefined or not an array.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    // Search Functionality
    const searchInput = CihuyId("searchInputMasuk");
    const searchButton = CihuyId("searchButtonMasuk");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            const searchData = data.data.filter((entry) => {
                const npm1 = entry.persyaratan.npm_1.toLowerCase();
                const npm2 = entry.persyaratan.npm2.toLowerCase();
                const pembimbing = getNameByCode(entry.persyaratan.pembimbing).toLowerCase();
                const penguji = getNameByCode(entry.jadwal.penguji2).toLowerCase();
                return npm1.includes(searchTerm) || npm2.includes(searchTerm) || pembimbing.includes(searchTerm) || penguji.includes(searchTerm);
            });
            // Update filteredData, totalData, halamannow, and display the data
            filteredData = searchData;
            totalData = filteredData.length;
            halamannow = 1;
            displayData(halamannow, filteredData);
            updatePagination();
        } else {
            // If the search term is empty, display the original data
            filteredData = data.data;
            totalData = filteredData.length;
            halamannow = 1;
            displayData(halamannow, filteredData);
            updatePagination();
        }
    });

    function displayData(page, filteredData) {
        const baris = CihuyQuerySelector("#tablebody tr");
        const mulaiindex = (page - 1) * itemPerPage;
        const akhirindex = mulaiindex + itemPerPage;

        for (let i = 0; i < baris.length; i++) {
            if (filteredData && i < filteredData.length) {
                if (i >= mulaiindex && i < akhirindex) {
                    baris[i].style.display = "table-row";
                } else {
                    baris[i].style.display = "none";
                }
            } else {
                baris[i].style.display = "none";
            }
        }
    }

    function updatePagination() {
        halamanSaatIni.textContent = `Halaman ${halamannow}`;
    }

    buttonPreviousPage.addEventListener("click", () => {
        if (halamannow > 1) {
            halamannow--;
            displayData(halamannow);
            updatePagination();
        }
    });

    buttonNextPage.addEventListener("click", () => {
        const totalPages = Math.ceil(tablebody.querySelectorAll("#tablebody tr").length / itemPerPage);
        if (halamannow < totalPages) {
            halamannow++;
            displayData(halamannow);
            updatePagination();
        }
    });
});
