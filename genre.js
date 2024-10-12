let animeList = [];
let filteredAnime = [];
let currentPage = 1;
const itemsPerPage = 10;

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch('animeData.json');
    animeList = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');

    document.getElementById('genreTitle').textContent = `Genre: ${genre}`;
    
    filterAnimeByGenre(genre);
    displayAnimeList(currentPage);
}

// Fungsi untuk memfilter anime berdasarkan genre
function filterAnimeByGenre(genre) {
    filteredAnime = animeList.filter(anime => anime.genre.includes(genre));
}

// Fungsi untuk menampilkan daftar anime dengan pagination
function displayAnimeList(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAnime = filteredAnime.slice(startIndex, endIndex);

    const container = document.getElementById('animeContainer');
    container.innerHTML = ''; // Kosongkan kontainer sebelum mengisi data

    currentAnime.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <li>
        <div>
        <div class="top">
            <img src="${anime.image}" alt="${anime.title}" width="75" height="120" loading="lazy">
            <div class="anime-title"><h2>${anime.title}</h2></div>
            <div class="descs"><p>${anime.synopsis}</p></div
            
            <div class="anime-info">Rating: ${anime.rating}</div>
            <div class="anime-info">Genre: ${anime.genre}</div>
            </div>
            
            </div>
            <div class="boxinfores">
            <span class="dashicons dashicons-star-empty"></span>
            <span class="nilaiseries">N/A</span>
            <span class="dashicons dashicons-desktop"></span>
            <span class="typeseries">TV</span>
             <span class="rsrated">Fall 2024</span></div>
              </li>
            
            
        `;

        // Tambahkan event listener untuk mengalihkan ke halaman detail
        card.addEventListener('click', () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        container.appendChild(card);
    });

    updatePagination(page);
}

// Fungsi untuk memperbarui pagination
function updatePagination(page) {
    const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    // Tampilkan informasi halaman
    pageInfo.textContent = `Page ${page} of ${totalPages}`;

    // Atur tombol Previous dan Next
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;

    // Event listener untuk tombol Previous
    prevButton.onclick = () => {
        if (page > 1) {
            currentPage--;
            displayAnimeList(currentPage);
            window.scrollTo(0, 0); // Scroll ke atas saat ganti halaman
        }
    };

    // Event listener untuk tombol Next
    nextButton.onclick = () => {
        if (page < totalPages) {
            currentPage++;
            displayAnimeList(currentPage);
            window.scrollTo(0, 0); // Scroll ke atas saat ganti halaman
        }
    };
}

// Ambil elemen input dan tombol pencarian
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchform");
const searchButton = document.getElementById("searchButton");

// Fungsi untuk melakukan pencarian
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
}

// Event listener untuk klik tombol pencarian
searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Event listener untuk tekan tombol Enter di form
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Fungsi untuk menampilkan anime yang difilter
function displayFilteredAnime(query) {
    const filteredAnime = animeList.filter(anime =>
        anime.title.toLowerCase().includes(query.toLowerCase()) || 
        anime.genre.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById('animeContainer');
    container.innerHTML = '';

    const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredAnime.slice(startIndex, endIndex).forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-title">${anime.title}</div>
            <div class="anime-info">Genre: ${anime.genre}</div>
            <div class="anime-info">Rating: ${anime.rating}</div>
            <p>${anime.synopsis}</p>
        `;

        // Tambahkan event listener untuk mengalihkan ke halaman detail
        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        container.appendChild(card);
    });

    // Pagination
    document.getElementById('prevPage').style.display = currentPage === 1 ? 'none' : 'inline';
    document.getElementById('nextPage').style.display = currentPage === totalPages ? 'none' : 'inline';
}


// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();