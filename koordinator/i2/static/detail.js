import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { getQueryString } from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import { UrlSearchPendaftaranI2, UrlGetAllPendaftaranI2 } from "../../../static/controller/template.js"; // Assuming UrlGetAllPendaftaranI2 is defined in template.js
import { token } from "../../../static/controller/cookies.js";

const q_npm = getQueryString().npm;
console.log('Value of npm query parameter:', q_npm);

CihuyDomReady(() => {
    const codeToNameMapping = {
      "0420058801": "Roni Andarsyah, S.T.,M.Kom.,SFPC",
      "0427078404": "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC",
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

    const requestOptions = {
        method: "GET",
        headers: {
          LOGIN: token,
          "Content-Type": "application/json",
        },
    };

    console.log("URL: " + UrlSearchPendaftaranI2 + "/" + q_npm)

    fetch(UrlSearchPendaftaranI2 + "/" + q_npm, requestOptions)
        .then((result) => result.json())
        .then((data) => {
            if (data.success) {
                // Process only the first entry in the data array
                const ajuan = data.data[0];
                const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';

                var npmValueElement = document.getElementById('npm_value');
                npmValueElement.textContent = ajuan.npm;

                var pem1mValueElement = document.getElementById('pembimbing1_value');
                pem1mValueElement.textContent = getNameByCode(ajuan.pembimbing1);

                var pem2mValueElement = document.getElementById('pembimbing2_value');
                pem2mValueElement.textContent = getNameByCode(ajuan.pembimbing2);

                var judulValueElement = document.getElementById('judul_value');
                judulValueElement.textContent = ajuan.judul_penelitian;

                var catatanValueElement = document.getElementById('catatan_value');
                catatanValueElement.textContent = ajuan.catatan;

                var statusValueElement = document.getElementById('status_value');
                if (ajuan.approval) {
                    statusValueElement.textContent = 'Disetujui';
                } else {
                    statusValueElement.textContent = 'Belum Disetujui';
                }
            } else {
                console.error("Status is not true.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
