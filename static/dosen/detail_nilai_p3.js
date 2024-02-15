import { token } from "../controller/cookies.js";
import { UrlGetNilaiByNPM } from "../controller/template.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
	method: "GET",
	headers: header
};

// Ambil _npm dari URL
const urlParams = new URLSearchParams(window.location.search);
const _npm = urlParams.get('_npm');
const GetNilaiByNPM = UrlGetNilaiByNPM + `/${_npm}`;

// Untuk Set Value NPM
setValue('npm', _npm);