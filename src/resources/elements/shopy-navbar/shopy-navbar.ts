import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Sidenav } from "materialize-css";

export class ShopyNavbar {

  @bindable
  protected routes: any[];
  protected sidenavRef: HTMLUListElement;
  protected sidenav: Sidenav;

  protected attached() {
    this.sidenav = M.Sidenav.init(this.sidenavRef, { draggable: true });
  }

}
