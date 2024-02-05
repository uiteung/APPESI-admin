import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDataAPI } from "https://c-craftjs.github.io/appesi/api.js";
import { UrlGetAllPersyaratan } from "../controller/template.js";

let token = getCookie("login");

if (token == "") {
    window.location.href("https://euis.ulbi.ac.id/");
}

// Get Data All Pendaftaran
CihuyDomReady(() => {
  const tablebody = CihuyId("tablebody");
  const buttonPreviousPage = CihuyId("prevPageBtn");
  const buttonNextPage = CihuyId("nextPageBtn");
  const halamanSaatIni = CihuyId("currentPage");
  const itemPerPage = 5;
  let halamannow = 1;
  const pilihPenguji = CihuyId("selectPenguji");

  // Mapping NIDN ke Nama
  const codeToNameMapping = {
    "0420058801": "Roni Andarsyah, S.T.,M.Kom.,SFPC",
    "0427078401": "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC",
    "0407117405": "M. Yusril Helmi Setyawan, S.Kom.,M.Kom.,SFPC",
    "0410118609": "Rolly Maulana Awangga, S.T.,MT.,CAIP,SFPC",
    "0402058005": "Mohamad Nurkamal Fauzan, S.T.,M.T.,SFPC",
    "0423127804": "Roni Habibi, S.Kom.,M.T.,SFPC",
    "0416048803": "Syafrial Fachri Pane,ST. M.TI.,EBDP.,CDSP.,SFPC",
    "0402047205": "Rd. Nuraini Siti Fatonah, S.S.,M.Hum.,SFPC",
    "0415048901": "Nisa Hanum Harani, S.Kom.,M.T.,CDSP.,SFPC",
    "0415107901": "Woro Isti Rahayu, S.T.,M.T.,SFPC",
    "0403117607": "Noviana Riza, S.Si.,M.T.,SFPC",
  };
  const nameToCodeMapping = {
    "Roni Andarsyah, S.T.,M.Kom.,SFPC": "0420058801",
    "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC": "0427078401",
    "M. Yusril Helmi Setyawan, S.Kom.,M.Kom.,SFPC": "0407117405",
    "Rolly Maulana Awangga, S.T.,MT.,CAIP,SFPC": "0410118609",
    "Mohamad Nurkamal Fauzan, S.T.,M.T.,SFPC": "0402058005",
    "Roni Habibi, S.Kom.,M.T.,SFPC": "0423127804",
    "Syafrial Fachri Pane,ST. M.TI.,EBDP.,CDSP.,SFPC": "0416048803",
    "Rd. Nuraini Siti Fatonah, S.S.,M.Hum.,SFPC": "0402047205",
    "Nisa Hanum Harani, S.Kom.,M.T.,CDSP.,SFPC": "0415048901",
    "Woro Isti Rahayu, S.T.,M.T.,SFPC": "0415107901",
    "Noviana Riza, S.Si.,M.T.,SFPC": "0403117607",
  };

  pilihPenguji.addEventListener("change", () => {
    const selectedCode = pilihPenguji.value;
    TampilDataByPenguji(selectedCode);
  });

  // Function to display data based on selected penguji code
  function TampilDataByPenguji(selectedCode) {
    const baris = CihuyQuerySelector("#tablebody tr");

    // Filter rows based on selected penguji code
    for (let i = 0; i < baris.length; i++) {
      const pengujiCell = baris[i].querySelector("td:nth-child(5) p");
      const pengujiCode = nameToCodeMapping[pengujiCell.innerText.trim()];

      // Check if the row matches the selected penguji
      if (selectedCode === "" || pengujiCode === selectedCode) {
        baris[i].style.display = "table-row";
      } else {
        baris[i].style.display = "none";
      }
    }

    updatePagination();
  }
  //cihuydataapi
  CihuyDataAPI(UrlGetAllPersyaratan, token, (error, data) => {
    if (error) {
      console.error("Error:", error);
      return;
    }

    if (data && Array.isArray(data.data)) {
      let tableData = "";
      data.data.forEach((item, index) => {
        if (item.persyaratan) {
          const values = item.persyaratan;
          const jadwal = item.jadwal;
          const waktuSidangFormatted = new Date(
            jadwal.waktuSidang
          ).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const getNameByCode = (code) =>
            codeToNameMapping[code] || "Tidak Ada";

          // Your existing logic for creating tableData

          tableData += `
                        <tr>
                        <td hidden></td>
                        <td>
                            <p class="fw-bold mb-1">${index + 1}</p>
                        </td>
                        <td>
                            <p class="fw-bold mb-1">${values.npm_1}</p>
                            <p class="fw-bold mb-1">${values.posisi_mhs_1}</p>
                        </td>
                        <td>
                            <p class="fw-bold mb-1">${values.npm2}</p>
                            <p class="fw-bold mb-1">${values.posisi_mhs_2}</p>
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
  });

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

// Penilaian BackEnd Proyek 3
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formInputBE");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        Swal.fire({
            title : 'Input Nilai Sidang Proyek 3',
            text: 'Apakah anda yakin ingin input Nilai Sidang Proyek 3?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
        }).then((result) => {
            if (result.isConfirmed) {
                // Continue with form submission
                SubmitNilaiBackEndP3();
            }
        });
    });
    // Untuk Submit Nilai BackEnd
    function SubmitNilaiBackEndP3() {
        const inputNPMBE = getValue('inputNPMBE');
        const inputTahunAkademikBE = getValue('inputTahunAkademikBE');
        const InputTipe = "p3";
        const inputNilaiBE1 = getValue('inputNilaiBE1');
        const inputNilaiBE2 = getValue('inputNilaiBE2');
        const inputNilaiBE3 = getValue('inputNilaiBE3');
        const inputNilaiBE4 = getValue('inputNilaiBE4');

        let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

        let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPMBE),
        "tahun_aka" : inputTahunAkademikBE,
        "tipe_bimbingan" : InputTipe,
        "assessment_inputs" : [
            {"assess_name" : "Semua endpoint berfungsi termasuk otorisasi dan autentikasi token", "assess_weight": 25, "value" : parseInt(inputNilaiBE1)},
            {"assess_name" : "Package dibuat sendiri dan semua digunakan", "assess_weight": 25, "value" : parseInt(inputNilaiBE2)},
            {"assess_name" : "Semua endpoint di GCF memakai package yang dibuat dan lokasi server di jakarta", "assess_weight": 25, "value" : parseInt(inputNilaiBE3)},
            {"assess_name" : "Terintegrasi dengan wa.my.id", "assess_weight": 25, "value" : parseInt(inputNilaiBE4)},
        ]
    };

        postWithToken(url, "LOGIN", token,  data, (results) => {
        // Handle results for the second action
        if (results.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: results.status,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'input_nilai_p3.html';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
        });
    };
})


// Penilaian FrontEnd Proyek 3
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formInputFE");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Use SweetAlert for confirmation
        Swal.fire({
            title: 'Input Nilai Sidang Proyek 3',
            text: 'Apakah anda yakin ingin input Nilai Sidang Proyek 3?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
        }).then((result) => {
            if (result.isConfirmed) {
                // Continue with form submission
                SubmitNilaiFrontEndP3();
            }
        });
    });

    // Untuk Submit Nilai FrontEnd
    function SubmitNilaiFrontEndP3() {
        const inputNPMFE = getValue('inputNPMFE');
        const inputTahunAkademikFE = getValue('inputTahunAkademikFE');
        const InputTipe = "p3";
        const inputNilaiFE1 = getValue('inputNilaiFE1');
        const inputNilaiFE2 = getValue('inputNilaiFE2');
        const inputNilaiFE3 = getValue('inputNilaiFE3');
        const inputNilaiFE4 = getValue('inputNilaiFE4');

        let url = "https://kimteungbim.ulbi.ac.id/sidang/p3/nilai/"

        let data = {
        "prodi" : 14,
        "nim" : parseInt(inputNPMFE),
        "tahun_aka" : inputTahunAkademikFE,
        "tipe_bimbingan" : InputTipe,
        "assessment_inputs" : [
            {"assess_name" : "semua js di rilis versi di jsdelivr dari semua js buatan sendiri yang dipakai frontend", "assess_weight": 25, "value" : parseInt(inputNilaiFE1)},
            {"assess_name" : "pemanggilan jsdelivr pada html yang sudah pasti pakai type module", "assess_weight": 25, "value" : parseInt(inputNilaiFE2)},
            {"assess_name" : "kelengkapan css, favicon, 404.html, modal, transisi, loading, responsive dan hasil analisis dari gtmetrix.com", "assess_weight": 25, "value" : parseInt(inputNilaiFE3)},
            {"assess_name" : "memakai custom domain pada github pages nya.", "assess_weight": 25, "value" : parseInt(inputNilaiFE4)},
        ]
    };

        postWithToken(url, "LOGIN", token,  data, (results) => {
        // Handle results for the second action
        if (results.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: results.status,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'input_nilai_p3.html';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal submit penilaian. Silakan coba lagi.',
            });
        }
      });
    };
})



// function responsesdata(value) {
//     console.log(value)
// }