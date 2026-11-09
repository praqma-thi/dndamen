const itemBrowser = document.querySelector("[data-item-list]");

if (itemBrowser) {
  const searchInput = document.querySelector("[data-item-search]");
  const tagFilters = Array.from(document.querySelectorAll("[data-tag-filter]"));
  const controls = document.querySelector("[data-item-controls]");
  const countOutput = document.querySelector("[data-item-count]");
  const favoriteStatus = document.querySelector("[data-favorite-status]");
  const noResults = document.querySelector("[data-item-no-results]");
  const cards = Array.from(itemBrowser.querySelectorAll("[data-item-id]"));
  const storageKey = "dndamen-favorite-items-v1";
  const originalOrder = new Map(cards.map((card, index) => [card, index]));
  let favorites = new Set();
  let storageAvailable = true;

  try {
    const savedFavorites = window.localStorage.getItem(storageKey);
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      if (!Array.isArray(parsedFavorites) || !parsedFavorites.every((id) => typeof id === "string")) {
        throw new TypeError("Saved item favorites must be an array of item IDs.");
      }
      favorites = new Set(parsedFavorites);
    }
  } catch (error) {
    storageAvailable = false;
    favoriteStatus.textContent = "Saved favorites couldn't be loaded; changes will last for this visit only.";
    console.error("Unable to load saved item favorites.", error);
  }

  const updateFavoriteButtons = () => {
    cards.forEach((card) => {
      const button = card.querySelector("[data-favorite-button]");
      const isFavorite = favorites.has(card.dataset.itemId);
      button.setAttribute("aria-pressed", String(isFavorite));
      button.setAttribute("aria-label", isFavorite ? "Remove from favorites" : "Add to favorites");
      button.textContent = isFavorite ? "★" : "☆";
      button.hidden = false;
    });
  };

  const renderItems = () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const selectedTags = tagFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);
    let visibleCount = 0;

    cards.forEach((card) => {
      const itemName = card.dataset.itemName;
      const itemTags = card.dataset.itemTags.split("||");
      const matchesName = itemName.includes(query);
      const matchesTags = selectedTags.every((tag) => itemTags.includes(tag));
      card.hidden = !(matchesName && matchesTags);
      if (!card.hidden) visibleCount += 1;
    });

    cards
      .slice()
      .sort((a, b) => {
        const favoriteOrder = Number(favorites.has(b.dataset.itemId)) - Number(favorites.has(a.dataset.itemId));
        return favoriteOrder || originalOrder.get(a) - originalOrder.get(b);
      })
      .forEach((card) => itemBrowser.appendChild(card));

    countOutput.textContent = `${visibleCount} ${visibleCount === 1 ? "item" : "items"}`;
    noResults.hidden = visibleCount > 0;
  };

  const saveFavorites = () => {
    if (!storageAvailable) return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      storageAvailable = false;
      favoriteStatus.textContent = "Favorites can't be saved in this browser; changes will last for this visit only.";
      console.error("Unable to save item favorites.", error);
    }
  };

  cards.forEach((card) => {
    const button = card.querySelector("[data-favorite-button]");
    button.addEventListener("click", () => {
      const itemId = card.dataset.itemId;
      if (favorites.has(itemId)) {
        favorites.delete(itemId);
      } else {
        favorites.add(itemId);
      }
      updateFavoriteButtons();
      renderItems();
      saveFavorites();
    });
  });

  searchInput.addEventListener("input", renderItems);
  tagFilters.forEach((filter) => filter.addEventListener("change", renderItems));
  document.querySelector("[data-clear-filters]").addEventListener("click", () => {
    searchInput.value = "";
    tagFilters.forEach((filter) => {
      filter.checked = false;
    });
    renderItems();
    searchInput.focus();
  });

  controls.hidden = false;
  updateFavoriteButtons();
  renderItems();
}
