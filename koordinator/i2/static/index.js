import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllPendaftaranI2 } from "../../../static/controller/template.js";
import { token } from "../../../static/controller/cookies.js";

// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded
CihuyDomReady(() => {
  const bodypm = CihuyId("pm-body");
  const bodyna = CihuyId("na-body");
  const bodyrp = CihuyId("rp-body");

  // Check if all required elements are available
  if (bodypm && bodyna && bodyrp) {
      const requestOptions = {
          method: "GET",
          headers: {
              LOGIN: token,
              "Content-Type": "application/json",
          },
      };

      fetch(UrlGetAllPendaftaranI2, requestOptions)
          .then((result) => result.json())
          .then((data) => {
              if (data.success) {
                  data.data.forEach((ajuan) => {
                      let rowData = `
                          <tr>
                              <td>${ajuan.npm}</td>
                              <td>${ajuan.judul_penelitian}</td>
                              <td>${ajuan.pembimbing1}</td>
                              <td>${ajuan.pembimbing2}</td>
                              <td>
                                  <a class="btn btn-primary" href="${ajuan.url_proposal_penelitian}" role="button">Proposal</a>
                              </td>
                              <td>
                                  <a class="btn btn-primary" href="${ajuan.url_plagiarisme_proposal}" role="button">Portofolio</a>
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
