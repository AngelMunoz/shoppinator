import { RouteConfig } from "aurelia-router";

export class RouteFilterValueConverter {

  public toView(routes: RouteConfig[], position) {
    return routes.filter(r => r.settings.position === position);
  }

}
