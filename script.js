let itemsPerPage = 12;
let animeList = [];
let displayedItems = 0; // Menyimpan jumlah item yang telah ditampilkan

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch("contohVideo.json");
    animeList = await response.json();
    displayAnime(); // Tampilkan item saat halaman dimuat
}

// Fungsi untuk menampilkan lebih banyak anime
function displayAnime() {
    const container = document.getElementById("animeContainer");

    // Tampilkan lebih banyak item sesuai dengan jumlah itemsPerPage
    const nextItems = animeList.slice(displayedItems, displayedItems + itemsPerPage);
    nextItems.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
        <article class="animeseries post-139006">
                                <div class="sera">
        <div class="limit">
          <span class="types episodes"><span class="dashicons dashicons-plus-alt"></span>${anime.episode}</span>
          <div class="play"><span class="dashicons dashicons-video-alt3"></span></div>
            <img src="${anime.image}" alt="${anime.title}">
            <h3 class="title less nlat entry-title"><span>${anime.title}</span></h3>
           
            </div>
            </div>
                            </article>
        `;

        // Tambahkan event listener untuk mengalihkan ke halaman detail
        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        container.appendChild(card);
    });

    displayedItems += itemsPerPage; // Update jumlah item yang telah ditampilkan

    // Sembunyikan tombol "Load More" jika semua item sudah ditampilkan
    if (displayedItems >= animeList.length) {
        document.getElementById("loadMoreButton").style.display = "none";
    }
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

// Event listener untuk tombol "Load More"
document.getElementById("loadMoreButton").addEventListener("click", function () {
    displayAnime();
});

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();