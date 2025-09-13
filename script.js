const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Seller Dashboard logic (basic placeholder)
const addForm = document.getElementById("addProductForm");
const myProducts = document.getElementById("myProducts");

if (addForm) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const district = document.getElementById("productDistrict").value;
    const category = document.getElementById("productCategory").value;

    const li = document.createElement("li");
    li.textContent = `${name} - MWK ${price} (${district}, ${category})`;
    myProducts.appendChild(li);

    addForm.reset();
  });
}