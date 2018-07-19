import { bindable, autoinject } from "aurelia-framework";

@autoinject
export class ShopyListDetailCollection {
  @bindable
  public items: any[];

  protected newItem: { name: string; done: boolean; } = { name: "", done: false };

  constructor(private element: Element) { }

  protected updateItem(item) {
    const event = new CustomEvent("on-item-update", { detail: item });
    this.element.dispatchEvent(event);
  }

  protected removeItem(item) {
    const event = new CustomEvent("on-item-remove", { detail: item });
    this.element.dispatchEvent(event);
  }

  protected addItem(item) {
    item._id = item.name;
    const event = new CustomEvent("on-item-add", { detail: item });
    this.element.dispatchEvent(event);
    this.newItem = { name: "", done: false };
  }

}
