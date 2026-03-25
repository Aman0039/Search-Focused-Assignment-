async function search() {
  const q = document.getElementById("q").value;
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const res = await fetch(`http://localhost:5000/search?q=${q}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No results found</p>";
    return;
  }

  data.forEach(item => {
    container.innerHTML += `<p>${item.product_name} - ₹${item.price}</p>`;
  });
}