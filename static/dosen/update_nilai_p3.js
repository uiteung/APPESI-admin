import { token } from "../controller/cookies.js";
import { UrlGetNilaiByNPMNIDN } from "../controller/template.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
	method: "GET",
	headers: header
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

// Ambil _npm dari URL
const urlParams = new URLSearchParams(window.location.search);
const _npm = urlParams.get('_npm');
const GetNilaiByNPM_NIDN = UrlGetNilaiByNPMNIDN + `?npm=${_npm}`;
const getNameByCode = (code) => codeToNameMapping[code] || "Tidak Ada";

// Get Data dan Simpan di Form ketika sudah isi
await getWithHeader(GetNilaiByNPM_NIDN, "LOGIN", token, nilaiMahasiswaP3);
async function nilaiMahasiswaP3(result) {
    if (result.success) {
        setValue('penilai', getNameByCode(result.data.nim))
        setValue('npm', result.data.nim);
        setValue('nilai1', result.data.nilai[0].value);
        setValue('nilai2', result.data.nilai[1].value);
        setValue('nilai3', result.data.nilai[2].value);
        setValue('nilai4', result.data.nilai[3].value);
    } else {
        console.log(result)
    }
}
