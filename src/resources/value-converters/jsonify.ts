import { RouteConfig } from "aurelia-router";

export class JsonifyValueConverter {

  public toView(value) {
    return JSON.stringify(value, null, 2);
  }

}
