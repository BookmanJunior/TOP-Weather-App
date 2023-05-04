import pubsub from "./pubsub";

const screenController = () => {
  const searchForm = document.querySelector("form");
  const { locationSearch } = searchForm;
  const tempCBtn = document.querySelector(".tempC-btn");
  const tempFBtn = document.querySelector(".tempF-btn");

  searchForm.addEventListener("submit", publishSearchValue);

  tempCBtn.addEventListener("click", () => {
    toggleTempButton(tempCBtn);
    pubsub.publish("changeUnitsToMetric", "c");
  });

  tempFBtn.addEventListener("click", () => {
    toggleTempButton(tempFBtn);
    pubsub.publish("changeUnitsToImperial", "f");
  });

  function publishSearchValue(e) {
    e.preventDefault();
    const searchValue = locationSearch.value;
    searchForm.reset();
    pubsub.publish("search", searchValue);
  }

  function toggleTempButton(btn) {
    if (isButtonActive(btn)) {
      return;
    }
    removeCurrActiveBtnClass();
    btn.classList.add("active-temp-unit");
  }

  function isButtonActive(btn) {
    const isBtn = btn.classList.contains("active-temp-unit") === true;
    return isBtn;
  }

  function removeCurrActiveBtnClass() {
    const currentActiveTempBtn = document.querySelector(".active-temp-unit");
    currentActiveTempBtn.classList.remove("active-temp-unit");
  }
};

export default screenController;
