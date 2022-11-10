export function getFormValues(formName: string) {
  // Get the data from the current submit form:
  const data: any = {};
  (
    Array.from(
      document.querySelectorAll(`form#${formName} input`) || []
    ) as HTMLInputElement[]
  ).forEach((el) => {
    if (el.name) data[el.name] = el.value;
  });
  (
    Array.from(
      document.querySelectorAll(`form#${formName} select`) || []
    ) as HTMLInputElement[]
  ).forEach((el) => {
    data['table'] = el.value;
  });
  return data;
}

export function cleanForm(formName: string) {
  // Clearing the inputs from the last form sent:
  (
    Array.from(
      document.querySelectorAll(`form#${formName} input`) || []
    ) as HTMLInputElement[]
  ).forEach((el) => {
    el.value = '';
  });
}

export function messageUp(message: string) {
  const errorMessage = document.getElementById(
    'error-message'
  ) as HTMLDivElement;
  errorMessage.classList.remove('display');
  getParagraphElement('error').innerText = message;
}

export function getFormElement(id: string): HTMLFormElement {
  return document.getElementById(id) as HTMLFormElement;
}

export function getParagraphElement(id: string): HTMLParagraphElement {
  return document.getElementById(id) as HTMLParagraphElement;
}

export function movement(formId: string) {
  // A function that allows moving open forms:
  const formElement = getFormElement(formId);
  var mousePosition;
  var offset = [0, 0];
  var isDown = false;

  formElement.addEventListener(
    'mousedown',
    function (e) {
      isDown = true;
      offset = [
        formElement.offsetLeft - e.clientX,
        formElement.offsetTop - e.clientY,
      ];
    },
    true
  );

  document.addEventListener(
    'mouseup',
    function () {
      isDown = false;
    },
    true
  );

  document.addEventListener(
    'mousemove',
    function (event) {
      event.preventDefault();
      if (isDown) {
        mousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
        formElement.style.left = mousePosition.x + offset[0] + 'px';
        formElement.style.top = mousePosition.y + offset[1] + 'px';
      }
    },
    true
  );
}
