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
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          if (data.success) {
            data.data.forEach((ajuan) => {
              const rowData = document.createElement("div");

              if (!ajuan.approval && ajuan.catatan === "") {
                document.getElementById("placeholder-pm").parentNode.setAttribute("hidden", "true");
                // Append to bodypm if approval is false and catatan is empty
                rowData.innerHTML = `
                <a href="detail.html?npm=${ajuan.npm}">
                <div class="col-md-6">
                    <div class="card text-white bg-grey mb-2" style="min-height: 175px">
                        <div class="card-body">
                            <h4 id="pm-number">${ajuan.npm}</h4>
                            <h5 class="card-title">${ajuan.judul_penelitian}</h5>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="w-100 btn btn-outline-primary">Proposal</button>
                            </div>
                            <div class="col">
                                <button type="button" class="w-100 btn btn-outline-primary">Pendukung</button>
                            </div>
                        </div>
                    </div>
                    </div>
                  </a>
                `;
                bodypm.appendChild(rowData);
              } else if (!ajuan.approval && ajuan.catatan !== "") {
                document.getElementById("placeholder-rp").parentNode.setAttribute("hidden", "true");
                // Append to bodyrp if approval is false and catatan is not empty
                rowData.innerHTML = `
                  <a href="detail.html?npm=${ajuan.npm}">
                  <div class="col-md-6">
                      <div class="card text-white bg-grey mb-2" style="min-height: 175px">
                          <div class="card-body">
                              <h4 id="pm-number">${ajuan.npm}</h4>
                              <h5 class="card-title">${ajuan.judul_penelitian}</h5>
                          </div>
                          <div class="row">
                              <div class="col">
                                  <button type="button" class="w-100 btn btn-outline-primary">Proposal</button>
                              </div>
                              <div class="col">
                                  <button type="button" class="w-100 btn btn-outline-primary">Pendukung</button>
                              </div>
                          </div>
                      </div>
                      </div>
                    </a>
                      `;
                bodyrp.appendChild(rowData);
              } else {
                document.getElementById("placeholder-na").parentNode.setAttribute("hidden", "true");
                // Append to bodyna for other cases
                rowData.innerHTML = `
                <a href="detail.html?npm=${ajuan.npm}">
                <div class="col-md-6">
                    <div class="card text-white bg-grey mb-2" style="min-height: 175px">
                        <div class="card-body">
                            <h4 id="pm-number">${ajuan.npm}</h4>
                            <h5 class="card-title">${ajuan.judul_penelitian}</h5>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="w-100 btn btn-outline-primary">Proposal</button>
                            </div>
                            <div class="col">
                                <button type="button" class="w-100 btn btn-outline-primary">Pendukung</button>
                            </div>
                        </div>
                    </div>
                    </div>
                  </a>
                `;
                bodyna.appendChild(rowData);
              }
            });
          } else {
            console.error("Status is not true.");
          }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    } else {
      console.error("One or more required elements not found.");
    }
  });
  