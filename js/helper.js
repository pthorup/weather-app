var Helper = {};

Helper.onClick = (tag, action) => {
  document.querySelector(tag).addEventListener('click', action);
};

Helper.onChange = (tag, action) => {
  document.querySelector(tag).addEventListener('change', action);
};

Helper.onInput = (tag, action) => {
  document.querySelector(tag).addEventListener('input', action);
};

Helper.setHtml = (tag, html) => {
  document.querySelector(tag).innerHTML = html;
};

Helper.getValue = (tag) => {
  return document.querySelector(tag).value;
};
