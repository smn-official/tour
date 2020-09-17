import './styles.scss';

import { createElement } from './utils';

interface TourProperties {
  target: Element,
  description: string;
}

interface TourConfig {
  edges?: number;
}

class Tour {
  items: TourProperties[];

  private defaultConfig: TourConfig;

  private activeIndex: number;

  private tourElement: Element | null;

  constructor(config: TourConfig = {}) {
    this.items = [];
    this.activeIndex = 0;

    this.defaultConfig = {
      edges: 16,
      ...config,
    };

    this.tourElement = null;
  }

  start(items: TourProperties[]) {
    this.items = items;
    this.show();
  }

  private show() {
    this.tourElement = createElement('div', ['tour']);

    this.appendOverlayIntoTourElement();

    document.body.appendChild(this.tourElement);
  }

  private appendOverlayIntoTourElement() {
    const overlay = createElement('div', ['tour_overlay']);
    this.tourElement?.appendChild(overlay);
  }
}

export { TourProperties };
export default new Tour();
