import pubsub from "./pubsub";

const localStorageController = () => {
  const currDefaultLocation = "Dushanbe";

  pubsub.sub("search", updateDefaultLocation);

  function updateDefaultLocation(searchValue) {
    if (!isLocalStorageAvailable) {
      return;
    }
    localStorage.setItem("defaultLocation", searchValue);
  }

  function loadDefaultLocation() {
    if (isLocalStorageAvailable) {
      return getLocalData();
    }
    return currDefaultLocation;
  }

  function getLocalData() {
    const defaultLocation = localStorage.getItem("defaultLocation");
    if (defaultLocation) {
      return defaultLocation;
    }
    localStorage.setItem("defaultLocation", currDefaultLocation);
    return currDefaultLocation;
  }

  function isLocalStorageAvailable() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    loadDefaultLocation,
  };
};

export default localStorageController;
