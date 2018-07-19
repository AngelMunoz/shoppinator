import { PLATFORM } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";

export const ROUTES: RouteConfig[] = [
  {
    route: ["", "home"],
    title: "Inicio",
    name: "home",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/home"),
  },
  {
    route: "my-lists",
    title: "Mis Listas",
    name: "lists",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/my-lists"),
  },
  {
    route: "my-lists/:id",
    title: "Mi Lista Detallada",
    name: "listdetail",
    nav: false,
    moduleId: PLATFORM.moduleName("./pages/list-detail"),
  },
];
