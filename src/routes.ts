import { PLATFORM } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";

export const ROUTES: RouteConfig[] = [
  {
    route: ["", "home"],
    title: "Home",
    name: "home",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/home"),
  },
  {
    route: "my-lists",
    title: "My Lists",
    name: "lists",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/my-lists"),
  },
  {
    route: "my-lists/:id",
    title: "My List Details",
    name: "listdetail",
    nav: false,
    moduleId: PLATFORM.moduleName("./pages/list-detail"),
  },
];
