import './styles.scss';

interface TourProperties {
  target: Element,
  descriptiom: string;
};

class Tour {
  items: TourProperties[];

  constructor() {
    this.items = [];
  }

  start(items: TourProperties[]) {
    this.items = items;
  }
}

export { TourProperties };
export default new Tour();
