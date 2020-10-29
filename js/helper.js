var Helper = {};

Helper.appendHtml = (tag, html) => {
  let element = document.querySelector(tag);
  element.innerHTML += html;
};

Helper.setHtml = (tag, html) => {
  document.querySelector(tag).innerHTML = html;
};
