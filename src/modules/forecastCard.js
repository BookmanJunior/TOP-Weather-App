function elementCreator(htmlEl, content = "", ...classes) {
  const el = document.createElement(htmlEl);

  el.textContent = content;

  addArrayOfClasses(el, classes);

  return el;
}

function addArrayOfClasses(el, arr) {
  arr.forEach((item) => {
    el.classList.add(item);
  });
}

export default elementCreator;
