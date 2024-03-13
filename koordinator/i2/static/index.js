import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllPendaftaranI2, UrlGetSuperRole } from "../../../static/controller/template.js";
import { token } from "../../../static/controller/cookies.js";

const requestOptions = {
    method: "GET",
    headers: {
        LOGIN: token,
        "Content-Type": "application/json",
    },
};

fetch(UrlGetSuperRole, requestOptions)
  .then(response => response.json())
  .then(data => {
    if (data.success === false) {
      window.location.href = '/';
    } else {
      // Lakukan sesuatu jika respons berhasil
      console.log('API response success');
    }
  })
  .catch(error => {
    // Tangani error jika fetch gagal
    console.error('Error fetching data:', error);
  });

// Wait for the DOM to be fully loaded
CihuyDomReady(() => {
  const bodypm = CihuyId("pm-body");
  const bodyna = CihuyId("na-body");
  const bodyrp = CihuyId("rp-body");

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
  // Check if all required elements are available
  if (bodypm && bodyna && bodyrp) {

      fetch(UrlGetAllPendaftaranI2, requestOptions)
          .then((result) => result.json())
          .then((data) => {
              if (data.success) {
                  data.data.forEach((ajuan) => {
                      const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';

                      let rowData = `
                      <div id="popupContainer" class="modal fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-body">
                                <!-- The iframe will be dynamically added here -->
                            </div>
                            </div>
                        </div>
                        </div>

                      <tr>
                          <td>${ajuan.npm}</td>
                          <td><a href="./detail.html?npm=${ajuan.npm}">${ajuan.judul_penelitian}</a></td>
                          <td>${getNameByCode(ajuan.pembimbing1)}</td>
                          <td>${getNameByCode(ajuan.pembimbing2)}</td>

                          <td>
                            <button class="btn btn-primary view-proposal" data-url="${ajuan.url_proposal_penelitian}">
                                <i class="bi bi-eye"></i>
                            </button>
                            </td>
                            <td>
                            <button class="btn btn-primary view-plagiarism" data-url="${ajuan.url_plagiarisme_proposal}">
                                <i class="bi bi-eye"></i>
                            </button>
                         </td>
                          
                          <td>
                              <a class="btn btn-success" href="${ajuan.url_plagiarisme_proposal}" role="button"><i class="bi bi-check-circle"></i></a>
                              <a class="btn btn-danger" href="${ajuan.url_plagiarisme_proposal}" role="button"><i class="bi bi-x-circle"></i></a>
                          </td>
                      </tr>
                  `;
                      if (!ajuan.approval && ajuan.catatan === "") {
                          bodypm.innerHTML += rowData;
                      } else if (!ajuan.approval && ajuan.catatan !== "") {
                          bodyrp.innerHTML += rowData;
                      } else {
                          bodyna.innerHTML += rowData;
                      }
                  });
              } else {
                  console.error("Status is not true.");
              }
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  } else {
      console.error("One or more required elements not found.");
  }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('view-proposal') || event.target.classList.contains('view-plagiarism')) {
      const url = event.target.getAttribute('data-url');
      if (url) {
        openPopupWithIframe(url);
      }
    }
  });
  
  function openPopupWithIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '860px';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
  
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';
    modalBody.appendChild(iframe);
  
    $('#popupContainer').modal('show');
  }