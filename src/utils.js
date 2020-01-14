const isValid = (value) => {
    return value.length >= 10
};

const createModal = (title, content) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
    <h1 class="${title === 'Error!' ? 'error' : ''}">${title}</h1>
    <div class="modal-content">${content}</div>
  `;

  mui.overlay('on', modal); // https://www.muicss.com/docs/v1/css-js/overlay
};

export {isValid, createModal}