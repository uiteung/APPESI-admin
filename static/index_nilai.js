// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllNilaiP3 } from "./controller/template.js";
import { token } from "./controller/cookies.js"

// Get Data Program Studi
CihuyDomReady(() => {
    const tablebody = CihuyId("tablebody-nilai");
    const buttonPreviousPage = CihuyId("prevPageBtn-nilai");
    const buttonNextPage = CihuyId("nextPageBtn-nilai");
    const halamanSaatIni = CihuyId("currentPage-nilai");
    const itemPerPage = 5;
    let halamannow = 1;

    const requestOptions = {
        method: 'GET',
        headers: {
            'LOGIN': token,
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
    fetch(UrlGetAllNilaiP3, requestOptions)
    .then((result) => {
    return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            data.data.forEach((item, index) => {
                if (item.nilai) {
                    const { nim, tipe, tahun, nilai } = item;
                    tableData += `
                        <tr>
                            <td hidden></td>
                            <td>
                                <p class="fw-bold mb-1">${index + 1}</p>
                            </td>    
                            <td>
                                <p class="fw-bold mb-1">${nim}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${tipe}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${tahun}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${nilai.map(item => item.value).join(', ')}</p>
                            </td>
                            <td>
                                <button type="button" class="btn btn-info m-1" data-nilai-npm="${nim}">Detail</button>
                            </td>
                        </tr>`;
                }
            });

            // Menghitung banyaknya data
            const totalData = data.data.length;

            // Untuk menampilkan jumlah nilai sidang di html
            const jumlahNilaiSidangElement = CihuyId("jumlahNilaiMahasiswa");
            if (jumlahNilaiSidangElement) {
                jumlahNilaiSidangElement.innerText = `Jumlah Nilai Mahasiswa: ${totalData}`;
            }

            // Tampilkan data pegawai ke dalam tabel
            document.getElementById("tablebody-nilai").innerHTML = tableData;
    
            // Untuk Memunculkan Pagination Halamannya
            displayData(halamannow);
            updatePagination();

            // Menambahkan event listener untuk button "Detail"
            const detailNilaiButtons = document.querySelectorAll('.btn-info');
            detailNilaiButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const _npm = event.target.getAttribute('data-nilai-npm');
                    window.location.href = `detail_nilai_p3.html?_npm=${_npm}`;
                })
            })
        } else {
            console.error("Data or data.data is undefined or not an array.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Fungsi untuk Menampilkan Data
	function displayData(page) {
		const baris = CihuyQuerySelector("#tablebody-nilai tr");
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
			tablebody.querySelectorAll("#tablebody-nilai tr").length / itemPerPage
		);
		if (halamannow < totalPages) {
			halamannow++;
			displayData(halamannow);
			updatePagination();
		}
	});
});