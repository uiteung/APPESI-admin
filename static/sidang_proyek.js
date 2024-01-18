// Jika klik halaman yang belum tersedia
document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    var ajukanSidangBtn = document.getElementById("proyek1Btn");

    // Add a click event listener to the button
    ajukanSidangBtn.addEventListener("click", function () {
        // Display a SweetAlert
        Swal.fire({
            title: 'Halaman Belum Tersedia',
            text: 'Maaf, halaman ini belum tersedia.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    var ajukanSidangBtn = document.getElementById("proyek2Btn");

    // Add a click event listener to the button
    ajukanSidangBtn.addEventListener("click", function () {
        // Display a SweetAlert
        Swal.fire({
            title: 'Halaman Belum Tersedia',
            text: 'Maaf, halaman ini belum tersedia.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});