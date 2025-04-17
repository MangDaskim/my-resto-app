const sheetId = "13z2HlpFMyeLtgtkGJ1_WcSnR8hVeDVhiE4i3l5MSp4k";
const apiKey = "AIzaSyCE9sA666v1oyFOOAduj9hKpiOjzdbDoTE"; // Ganti dengan API key Anda
const range = "Sheet1"; // Ganti jika nama sheet berbeda

async function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  const [headers, ...rows] = data.values;
  const items = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  renderRestoran(items);
}

function renderRestoran(data) {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.Restoran]) acc[item.Restoran] = [];
    acc[item.Restoran].push(item);
    return acc;
  }, {});

  const container = document.getElementById("resto-list");
  container.innerHTML = "";

  for (const [resto, menus] of Object.entries(grouped)) {
    const html = `
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-xl font-semibold mb-2">${resto}</h2>
        <ul class="space-y-1">
          ${menus.map(m => `
            <li class="flex justify-between border-b pb-1">
              <span>${m.Menu}</span>
              <span>Rp ${parseInt(m.Harga).toLocaleString('id-ID')}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  }
}

fetchData();
