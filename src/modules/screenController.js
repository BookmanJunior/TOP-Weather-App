import pubsub from "./pubsub";

const screenController = () => {
  const searchForm = document.querySelector("form");
  const { locationSearch } = searchForm;
  searchForm.addEventListener("submit", renderData);

  function renderData(e) {
    e.preventDefault();
    const searchValue = locationSearch.value;
    searchForm.reset();
    pubsub.publish("search", searchValue);
  }
};

export default screenController;
