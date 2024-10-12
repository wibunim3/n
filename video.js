let animeList = [];

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch("animeData.json");
    animeList = await response.json();
    const animeId = new URLSearchParams(window.location.search).get("animeId");
    const episodeIndex = parseInt(
        new URLSearchParams(window.location.search).get("episode")
    );

    displayVideo(animeId, episodeIndex);
}

// Fungsi untuk menampilkan video
function displayVideo(animeId, episodeIndex) {
    const anime = animeList.find(anime => anime.id === animeId);

    if (anime) {
        const episode = anime.episodes[episodeIndex];
        document.getElementById("videoTitle").innerText = episode.title;
        document.getElementById("videoPlayer").src = episode.videoUrl;

        // Navigasi episode
        document.getElementById("prevEpisode").onclick = () => {
            if (episodeIndex > 0) {
                window.location.href = `video.html?animeId=${animeId}&episode=${
                    episodeIndex - 1
                }`;
            }
        };

        document.getElementById("nextEpisode").onclick = () => {
            if (episodeIndex < anime.episodes.length - 1) {
                window.location.href = `video.html?animeId=${animeId}&episode=${
                    episodeIndex + 1
                }`;
            }
        };

        // Kembali ke daftar episode
        document.getElementById("backToEpisodes").onclick = () => {
            window.location.href = `detail.html?id=${animeId}`;
        };
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

// Fungsi untuk menampilkan anime yang difilter
function displayFilteredAnime(query) {
    const filteredAnime = animeList.filter(
        anime =>
            anime.title.toLowerCase().includes(query.toLowerCase()) ||
            anime.genre.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById("animeContainer");
    container.innerHTML = "";

    const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredAnime.slice(startIndex, endIndex).forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
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
    document.getElementById("prevPage").style.display =
        currentPage === 1 ? "none" : "inline";
    document.getElementById("nextPage").style.display =
        currentPage === totalPages ? "none" : "inline";
}

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();
