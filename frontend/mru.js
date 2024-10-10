document
  .getElementById("mru-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const capacity = document.getElementById("capacity").value;
    const pages = document
      .getElementById("pages")
      .value.split(",")
      .map((page) => parseInt(page.trim()));

    fetch("https://pagereplacement.onrender.com/run-mru", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ capacity: capacity, pages: pages }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayCacheTable(data.cache);
        displayHitsAndMisses(data.hits, data.misses); // Add this line
      })
      .catch((error) => console.error("Error:", error));

    // New function to display hits and misses
    function displayHitsAndMisses(hits, misses) {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
        <h2>Results</h2>
        <p>Total Hits: <strong>${hits}</strong></p>
        <p>Total Page Faluts: <strong>${misses}</strong></p>
    `;
    }
  });

function displayCacheTable(data) {
  let tableDiv = document.getElementById("cache-table");
  tableDiv.innerHTML = ""; // Clear previous table

  if (data.length === 0) return;

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  // Create table header
  let headerRow = document.createElement("tr");
  let headers = ["Steps"];
  headers.forEach((header) => {
    let th = document.createElement("th");
    th.innerText = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table rows
  data.forEach((frame, index) => {
    let row = document.createElement("tr");
    let stepCell = document.createElement("td");
    stepCell.innerText = `Step ${index + 1}`;
    row.appendChild(stepCell);

    frame.forEach((page) => {
      let cell = document.createElement("td");
      cell.innerText = page;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);
}
