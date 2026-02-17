const map = L.map("map", {
  zoomControl: true,
  attributionControl: false,
}).setView([-23.9822, -48.8756], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

let currentMarker = null;

async function performSearch() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const btn = document.getElementById("searchBtn");
  const originalContent = btn.innerHTML;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: { "Accept-Language": "pt-BR" },
    });
    const results = await response.json();

    if (results.length > 0) {
      const { lat, lon, display_name } = results[0];
      const latitude = Number(lat);
      const longitude = Number(lon);

      if (currentMarker) map.removeLayer(currentMarker);

      const customIcon = L.divIcon({
        className: "custom-div-icon",
        html: '<div class="custom-marker"></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      currentMarker = L.marker([latitude, longitude], {
        icon: customIcon,
      })
        .addTo(map)
        .bindPopup(
          `<b style="color: var(--gintama-cyan); font-size: 1rem;">Local encontrado</b><br>${display_name}`,
        )
        .openPopup();

      map.flyTo([latitude, longitude], 17, { duration: 2 });
    } else {
      alert("Local não encontrado.");
    }
  } catch {
    alert("Falha ao conectar com o serviço de mapas.");
  } finally {
    btn.innerHTML = originalContent;
  }
}

document.getElementById("searchBtn").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") performSearch();
});
