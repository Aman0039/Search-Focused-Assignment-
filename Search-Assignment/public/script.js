
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("q").value = params.get("q") || "";
    document.getElementById("category").value = params.get("category") || "";
    document.getElementById("minPrice").value = params.get("minPrice") || "";
    document.getElementById("maxPrice").value = params.get("maxPrice") || "";

    if ([...params.keys()].length > 0) {
        fetchAndRender(params);
    }
});


// search function to handle search
function search() {
    const q = document.getElementById("q").value.trim();
    const category = document.getElementById("category").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    // fetch data
    fetchAndRender(params);
}


async function fetchAndRender(params) {
    const url = `/api/search?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();

    const results = document.getElementById("results");
    const noData = document.getElementById("noData");

    results.innerHTML = "";

    if (!data.length) {
        noData.innerText = "No products found";
        return;
    }

    noData.innerText = "";

    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.product_name}</td>
                <td>${item.category}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
            </tr>
        `;
        results.innerHTML += row;
    });
}