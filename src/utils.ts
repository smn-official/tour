const createElement = (tagName: string, classes?: string[]): Element => {
  const element = document.createElement(tagName);

  if (classes && classes.length) {
    element.classList.add(...classes);
  }

  return element;
};

export { createElement };
