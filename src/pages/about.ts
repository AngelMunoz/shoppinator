export class About {

  protected collapsibleRef: HTMLUListElement;

  protected attached() {
    M.Collapsible.init(this.collapsibleRef, { accordion: true });
  }
}
