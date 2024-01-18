import { token } from "./controller/cookies.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { UrlCekRole } from "./controller/template.js";

// Untuk Atur Sidebar
getWithHeader(UrlCekRole, "AUTH", token, responseSidebar);

function responseSidebar(result) {
    if (result.success) {
        document.getElementById("sidebar-mahasiswa").setAttribute('hidden');
        document.getElementById("sidebar-dosen").removeAttribute('hidden');
        console.log(result)
    } else {
        console.log(result)
    }
}