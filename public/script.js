let currentPage = 1;
const itemsPerPage = 5; // Must match the server-side itemsPerPage

function fetchCatalog(page) {
  fetch(`/catalog?page=${page}`)
    .then(response => response.json())
    .then(data => {
      renderCatalog(data.items);
      updatePagination(page, data.totalPages);
    });
}

function renderCatalog(items) {
  const catalogGrid = document.getElementById('catalog-grid');
  catalogGrid.innerHTML = '';

  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    itemElement.setAttribute('data-name', item.name);
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
    `;
    catalogGrid.appendChild(itemElement);
  });
}

function updatePagination(page, totalPages) {
  document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
  document.getElementById('prev').disabled = (page === 1);
  document.getElementById('next').disabled = (page === totalPages);
}

function changePage(delta) {
  const newPage = currentPage + delta;
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    fetchCatalog(currentPage);
  }
}

function filterCatalog() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const items = document.querySelectorAll('.catalog-item');

  items.forEach(item => {
    const itemName = item.getAttribute('data-name').toLowerCase();
    if (itemName.includes(searchInput)) {
      item.style.display = catalog-item;
    } else {
      item.style.display = 'none';
    }
  });
}

// Initial fetch
fetchCatalog(currentPage);
