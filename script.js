// ========== GLOBAL CART ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========== ADD TO CART ==========
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  alert(`✅ ${name} added to cart`);
}

// ========== REMOVE FROM CART ==========
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// ========== UPDATE CART TABLE ==========
function updateCart() {
  const tbody = document.getElementById("order-table-body");
  if (!tbody) return;

  let total = 0;
  tbody.innerHTML = "";

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${subtotal.toLocaleString()}</td>
      <td><button onclick="removeFromCart(${index})">❌</button></td>
    `;
    tbody.appendChild(row);
  });

  const totalEl = document.getElementById("total-price");
  if (totalEl) {
    totalEl.textContent = `Rs. ${total.toLocaleString()}`;
  }
}

// ========== GO TO CHECKOUT ==========
function goToCheckout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}

// ========== SAVE TO FAVOURITES ==========
function saveToFavourites() {
  localStorage.setItem("favouriteCart", JSON.stringify(cart));
  alert("Cart saved to favourites!");
}

// ========== LOAD FROM FAVOURITES ==========
function loadFromFavourites() {
  const fav = JSON.parse(localStorage.getItem("favouriteCart"));
  if (!fav) return alert("No favourite saved!");
  cart = fav;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// ========== FAVOURITES PAGE DISPLAY ==========
document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  const favTable = document.getElementById("favourite-table");
  const favEmpty = document.getElementById("favourite-empty");
  const favButtons = document.getElementById("favourite-buttons");
  const favTotal = document.getElementById("favourite-total");

  if (favTable && favEmpty && favButtons && favTotal) {
    const tbody = favTable.querySelector("tbody");
    const fav = JSON.parse(localStorage.getItem("favouriteCart"));

    if (!fav || fav.length === 0) {
      favEmpty.style.display = "block";
      favTable.style.display = "none";
      favButtons.style.display = "none";
      return;
    }

    let total = 0;
    fav.forEach(item => {
      const subtotal = item.quantity * item.price;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${subtotal.toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });

    favTotal.textContent = `Rs. ${total.toLocaleString()}`;
    favTable.style.display = "table";
    favButtons.style.display = "block";
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      document.getElementById("delivery-date").textContent = deliveryDate.toDateString();

      checkoutForm.style.display = "none";
      document.getElementById("confirmation").style.display = "block";
    });
  }
});

// ========== APPLY & CLEAR FAVOURITES ==========
function applyFavourite() {
  const fav = localStorage.getItem("favouriteCart");
  if (fav) {
    localStorage.setItem("cart", fav);
    alert("Favourite order applied to your cart!");
    window.location.href = "items.html"; // <-- FIXED from index.html
  }
}

function clearFavourite() {
  localStorage.removeItem("favouriteCart");
  alert("Favourite order cleared.");
  location.reload();
}


// ========== DISPLAY ORDER SUMMARY ON CART PAGE ==========
document.addEventListener("DOMContentLoaded", () => {
  const summaryTable = document.getElementById("summary-table");
  const totalSummary = document.getElementById("summary-total");

  if (summaryTable && totalSummary) {
    let total = 0;
    summaryTable.innerHTML = "";

    cart.forEach(item => {
      const subtotal = item.quantity * item.price;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Rs. ${subtotal.toLocaleString()}</td>
      `;
      summaryTable.appendChild(row);
    });

    totalSummary.textContent = `Rs. ${total.toLocaleString()}`;
  }
});
