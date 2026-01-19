// ============================================
// HTMX Error Handling
// ============================================

// Force swap on HTTP error responses (4xx, 5xx)
document.body.addEventListener("htmx:beforeSwap", function (evt) {
  const status = evt.detail.xhr.status;
  if (status >= 400) {
    // Allow the swap to happen even on error responses
    evt.detail.shouldSwap = true;
    evt.detail.isError = false;
  }
});

// ============================================
// Search Dropdown
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchResults = document.querySelector(".search-results");

  if (searchInput && searchResults) {
    // Close search results when clicking outside
    document.addEventListener("click", function (evt) {
      if (
        !searchInput.contains(evt.target) &&
        !searchResults.contains(evt.target)
      ) {
        searchResults.innerHTML = "";
      }
    });

    // Close search results on Escape
    searchInput.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        searchResults.innerHTML = "";
        searchInput.blur();
      }
    });

    // Close search results when navigating to a result
    searchResults.addEventListener("click", function (evt) {
      if (evt.target.closest("a")) {
        searchResults.innerHTML = "";
      }
    });
  }

  // Keyboard shortcut to focus search (Cmd+K or Ctrl+K)
  document.addEventListener("keydown", function (evt) {
    if ((evt.metaKey || evt.ctrlKey) && evt.key === "k") {
      evt.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });
});

// ============================================
// Active Link Highlighting
// ============================================

// Update active nav link after HTMX navigation
document.body.addEventListener("htmx:afterSettle", function () {
  const currentPath = window.location.pathname;

  // Update sidebar nav links
  document.querySelectorAll(".docs-nav .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update header nav links
  document.querySelectorAll(".header .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (currentPath.startsWith(href) && href !== "/") {
      link.classList.add("active");
    } else if (href === "/" && currentPath === "/") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
