async function search() {
  const q = document.getElementById("q").value;
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;


  const res = await fetch(`/search?q=${q}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();

  const tbody = document.getElementById("results");
  const noData = document.getElementById("noData");

  tbody.innerHTML = "";
  noData.innerHTML = "";

  if (data.length === 0) {
    noData.innerHTML = "No results found";
    return;
  }

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.product_name}</td>
        <td>${item.category}</td>
        <td>₹${item.price}</td>
        <td>${item.quantity}</td>
      </tr>
    `;
  });
}