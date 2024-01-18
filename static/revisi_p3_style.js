// Fungsi umum untuk penyortiran tabel
function sortTable(table, columnIndex, ascending) {
	const tableBody = table.querySelector('tbody');
	const rows = Array.from(tableBody.querySelectorAll('tr'));

	rows.sort((a, b) => {
		const aValue = a.cells[columnIndex].textContent;
		const bValue = b.cells[columnIndex].textContent;
		return aValue.localeCompare(bValue, undefined, { numeric: true });
	});

	if (!ascending) {
		rows.reverse();
	}

	tableBody.innerHTML = '';

	rows.forEach(row => tableBody.appendChild(row));
}

// Pasang pendengar acara untuk tombol penyortiran di setiap kolom
const table = document.getElementById('example');
const headerCells = table.querySelectorAll('th');

headerCells.forEach((cell, index) => {
	// Tambahkan tombol arah penyortiran pada setiap header kolom
	cell.innerHTML += '<span class="sort-icon">&#8595;</span>';

	let ascending = true;

	cell.addEventListener('click', () => {
		// Toggle arah penyortiran saat tombol di klik
		ascending = !ascending;

		// Hapus tombol arah penyortiran pada semua kolom
		headerCells.forEach(headerCell => {
			headerCell.querySelector('.sort-icon').textContent = '';
		});

		// Tambahkan tombol arah penyortiran pada kolom yang di-klik
		cell.querySelector('.sort-icon').textContent = ascending ? '↓' : '↑';

		// Panggil fungsi penyortiran dengan arah yang sesuai
		sortTable(table, index, ascending);
	});
});

// Membuat fitur search
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.getElementById("tablebody").getElementsByTagName("tr");

    searchInput.addEventListener("input", function () {
      const searchText = searchInput.value.toLowerCase();

      for (const row of tableBody) {
        const cells = row.getElementsByTagName("td");
        let rowMatchesSearch = false;

        for (const cell of cells) {
          if (cell.textContent.toLowerCase().includes(searchText)) {
            rowMatchesSearch = true;
            break;
          }
        }

        row.style.display = rowMatchesSearch ? "" : "none";
      }
    });
  });
