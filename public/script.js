function filterCatalog() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const items = document.querySelectorAll('.catalog-item');
  
    items.forEach(item => {
      const itemName = item.getAttribute('data-name').toLowerCase();
      if (itemName.includes(searchInput)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  