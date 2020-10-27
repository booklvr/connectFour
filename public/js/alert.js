// /* eslint-disable */
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}"><p>${msg}</p></div>`;
  document.querySelector('.main').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
