import './styles.scss';

import template from './template.html';

interface TourProperties {
  target: Element,
  description: string;
}

interface TourConfig {
  edges?: number;
}

const defaultConfig: TourConfig = {
  edges: 16,
};

class Tour {
  items: TourProperties[];

  private config: TourConfig;

  private activeIndex: number;

  private activeTour: TourProperties;

  private cloneContainer: HTMLElement;

  private dialog: HTMLElement;

  constructor(config: TourConfig = {}) {
    this.items = [];
    this.activeIndex = 0;

    this.config = {
      ...defaultConfig,
      ...config,
    };

    this.activeTour = {} as TourProperties;
    this.cloneContainer = {} as HTMLElement;
    this.dialog = {} as HTMLElement;
  }

  start(items: TourProperties[]) {
    this.items = items;

    this.setActiveTour(0);

    this.show();
  }

  private setActiveTour(index: number) {
    this.activeIndex = index;
    this.activeTour = this.items[index];
  }

  private show() {
    document.body.insertAdjacentHTML('beforeend', template);

    this.cloneContainer = document.querySelector('.tour .tour__clone') as HTMLElement;

    this.dialog = document.querySelector('.tour .tour__dialog') as HTMLElement;

    this.renderTargetElement();
    this.adjustDialogPosition();
  }

  private renderTargetElement() {
    const { target } = this.activeTour;
    const {
      width,
      height,
      top,
      left,
    } = target.getBoundingClientRect();

    const clonedElement = target.cloneNode(true);

    Object.assign(this.cloneContainer.style, {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
    });

    const cloneElement = this.cloneContainer.appendChild(clonedElement) as HTMLElement;
    cloneElement.style.position = 'static';
  }

  private alignToElement(
    targetPosition: number,
    targetElementSize: number,
    elementSize: number,
    windowSize: number,
    edges = 0,
  ) {
    const top = targetPosition + targetElementSize + edges;

    const isOverflowed = top + elementSize > windowSize;

    if (isOverflowed) {
      return windowSize - elementSize - targetElementSize - edges;
    }

    return top;
  }

  private alignCenter(
    targetPosition: number,
    targetElementSize: number,
    elementSize: number,
    windowSize: number,
    edges = 0,
  ) {
    const cloneHalfHeight = targetElementSize / 2;

    const dialogHaldHeight = elementSize / 2;

    const top = targetPosition + cloneHalfHeight - dialogHaldHeight;

    if (top < edges) {
      return edges;
    }

    const isOverflowed = top + elementSize > windowSize;

    if (isOverflowed) {
      return windowSize - elementSize - edges;
    }

    return top;
  }

  private adjustDialogPosition() {
    const { edges } = this.config;

    const {
      width,
      height,
      top,
      left,
    } = this.activeTour.target.getBoundingClientRect();

    const horizontalAlign = width < height;

    let topPosition: number;
    let leftPosition: number;

    if (horizontalAlign) {
      topPosition = this.alignCenter(
        top,
        height,
        this.dialog.clientHeight,
        window.innerHeight,
        edges,
      );

      leftPosition = this.alignToElement(
        left,
        width,
        this.dialog.clientWidth,
        window.innerWidth,
        edges,
      );
    } else {
      topPosition = this.alignToElement(
        top,
        height,
        this.dialog.clientHeight,
        window.innerHeight,
        edges,
      );

      leftPosition = this.alignCenter(
        left,
        width,
        this.dialog.clientWidth,
        window.innerWidth,
        edges,
      );
    }

    Object.assign(this.dialog.style, {
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
    });
  }
}

export { TourProperties };
export default new Tour();
