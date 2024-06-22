// @ts-check

/** @type import("../../../../frontend/src/extensions").ExtensionModule */
export default {
  init() {
    console.log("initialising extension");
  },
  onPageLoad() {
    console.log("a Fava report page has loaded", window.location.pathname);
  },
  onExtensionPageLoad(ctx) {
    console.log(
      "the page for the PortfolioList extension has loaded",
      window.location.pathname,
    );

    const fetchedDataElement = document.getElementById("fetched-data");
    if (fetchedDataElement) {
      ctx.api.get("example_data", {}).then((d) => {
        console.log("fetched data:", d);
        fetchedDataElement.innerText = `fetched data: ${JSON.stringify(d)}`;
      });
    }

    const updateFilter = document.getElementById("portfolio-update-filter");
    updateFilter?.addEventListener("click", () => {
      const filterInput = document.getElementById("portfolio-list-filter");
      if (filterInput instanceof HTMLInputElement && filterInput.value.length) {
        const search = new URLSearchParams(window.location.search);
        search.set("account_filter", filterInput.value);
        window.location.search = search.toString();
      }
    });

    const clearFilter = document.getElementById("portfolio-clear-filter");
    clearFilter?.addEventListener("click", () => {
      const search = new URLSearchParams(window.location.search);
      search.delete("account_filter");
      window.location.search = search.toString();
    });
  },
};
