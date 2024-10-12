let animeList = [];

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch("animeData.json");
    animeList = await response.json();
    const animeId = new URLSearchParams(window.location.search).get("id");
    displayAnimeDetail(animeId);
    // Panggil fungsi untuk menampilkan genre saat halaman dimuat
}

// Fungsi untuk menampilkan detail anime
function displayAnimeDetail(id) {
    const anime = animeList.find(anime => anime.id === id);

    if (anime) {
        document.getElementById("animeTitle").innerText = anime.title;
        document.getElementById("animeImage").src = anime.image;
        document.getElementById("animeSynopsis").innerText = anime.synopsis;
        document.getElementById(
            "animeGenre"
        ).innerText = `Genre: ${anime.genre}`;
        document.getElementById("animeRating").innerText = `${anime.rating}`;
        document.getElementById(
            "animePopularity"
        ).innerText = `Popularity: #${anime.popularity}`;
        document.getElementById(
            "animeMember"
        ).innerText = `Member: #${anime.member}`;
        document.getElementById(
            "animeDurasi"
        ).innerText = `Durasi: ${anime.durasi} menit`;
        document.getElementById(
            "animeEpisode"
        ).innerText = `${anime.totalepisode} Episode`;
        document.getElementById("animeSammer").innerText = `Tahun: ${anime.summer}`;

        const episodeList = document.getElementById("episodeList");
        episodeList.innerHTML = ""; // Kosongkan daftar episode sebelum menambah
        for (let index = anime.episodes.length - 1; index >= 0; index--) {
            const episode = anime.episodes[index];
            const li = document.createElement("li");
            li.innerHTML = `<a href="video.html?animeId=${anime.id}&episode=${index}">${episode.title}</a>`;
            episodeList.appendChild(li);
        }
    }
    if (anime) {
        const episodeList = document.getElementById("episodeTerakhir");
        episodeList.innerHTML = ""; // Kosongkan daftar episode sebelum menambah
        const lastIndex = anime.episodes.length - 1;
        const episode = anime.episodes[lastIndex];
        const li = document.createElement("li");
        li.innerHTML = `<a href="video.html?animeId=${
            anime.id
        }&episode=${lastIndex}">Episode ${lastIndex + 1}</a>`;
        episodeList.appendChild(li);
    }
    if (anime) {
        const episodeList = document.getElementById("episodePertama");
        episodeList.innerHTML = ""; // Kosongkan daftar episode sebelum menambah
        const firstIndex = 0;
        const episode = anime.episodes[firstIndex];
        const li = document.createElement("li");
        li.innerHTML = `<a href="video.html?animeId=${
            anime.id
        }&episode=${firstIndex}">Episode ${firstIndex + 1}</a>`;
        episodeList.appendChild(li);
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

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();
