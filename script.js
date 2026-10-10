
const bakeryProducts = [
  { id: "bread", name: "Artisan Breads" },
  { id: "pastries", name: "Fresh Pastries" },
  { id: "cakes", name: "Custom Cakes" }
];

const storageKeys = {
  favorites: "northStarFavorites",
  lastUpdated: "northStarFavoritesUpdated"
};

function getFavorites() {
  return JSON.parse(localStorage.getItem(storageKeys.favorites) || "[]");
}

function saveFavorites(favorites) {
  localStorage.setItem(storageKeys.favorites, JSON.stringify(favorites));
  localStorage.setItem(storageKeys.lastUpdated, new Date().toLocaleString());
}

function toggleFavorite(productId) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.includes(productId)
    ? favorites.filter(id => id !== productId)
    : [...favorites, productId];

  saveFavorites(updatedFavorites);
  displayFavorites();
}

function displayFavorites() {
  const container = document.getElementById("bakery-favorites");
  if (!container) return;

  const favorites = getFavorites();
  container.innerHTML = "";

  bakeryProducts.forEach(product => {
    const button = document.createElement("button");
    const selected = favorites.includes(product.id);

    button.textContent = selected
      ? `★ ${product.name} - Saved`
      : `☆ Save ${product.name}`;

    button.type = "button";
    button.setAttribute("aria-pressed", String(selected));
    button.addEventListener("click", () => toggleFavorite(product.id));

    container.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", displayFavorites);


/* Touchstone 4: Contact Form Validation */

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + "-error");

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = "darkred";
        errorElement.style.display = "block";
    }
}

function clearFormErrors() {
    document.querySelectorAll(".field-error").forEach(error => {
        error.textContent = "";
    });
}

function validateContactForm(event) {
    event.preventDefault();

    clearFormErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pickupDate = document.getElementById("pickup-date").value;
    const itemDetails = document.getElementById("item-details").value.trim();
    const requestType = document.querySelector(
        'input[name="request-type"]:checked'
    );

    const feedback = document.getElementById("form-feedback");
    let isValid = true;

    feedback.textContent = "";

    if (name.length < 2) {
        showFieldError("name", "Please enter your name (at least 2 characters).");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showFieldError("email", "Please enter a valid email address.");
        isValid = false;
    }

    if (!pickupDate) {
        showFieldError("pickup-date", "Please choose a preferred pickup date.");
        isValid = false;
    }

    if (!requestType) {
        showFieldError("request-type", "Please select a request type.");
        isValid = false;
    }

    if (itemDetails.length < 5) {
        showFieldError("item-details", "Please enter at least 5 characters.");
        isValid = false;
    }

    if (isValid) {
        feedback.textContent =
            "Your form is valid! This is a demonstration; no request has been sent.";
        feedback.style.color = "green";
    } else {
        feedback.textContent =
            "Please correct the highlighted errors before continuing.";
        feedback.style.color = "darkred";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("bakery-contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", validateContactForm);
    }
});
