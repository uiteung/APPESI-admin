// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllPersyaratan } from "./controller/template.js";
import { token } from "./controller/cookies.js"

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

    // Untuk Get All Data Pendaftar
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

                    // Function untuk ambil nama dosen dari NIDN
                    const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';

                    // Your existing mapping logic here
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

    const searchInput = CihuyId("searchInputMasuk");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.data.filter((item) => {
            const npm1 = item.persyaratan.npm_1.toLowerCase();
            const npm2 = item.persyaratan.npm2.toLowerCase();
            const pembimbing = getNameByCode(item.persyaratan.pembimbing).toLowerCase();
            const penguji = getNameByCode(item.jadwal.penguji2).toLowerCase();

            return npm1.includes(searchTerm) || npm2.includes(searchTerm) || pembimbing.includes(searchTerm) || penguji.includes(searchTerm);
        });

        displayData(halamannow, filteredData);
        updatePagination();
    });

    

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