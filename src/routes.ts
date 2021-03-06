import { PLATFORM } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";

export const ROUTES: RouteConfig[] = [
  {
    route: "my-lists",
    title: "Mis Listas",
    name: "lists",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/my-lists"),
  },
  {
    route: ["", "home"],
    title: "Inicio",
    name: "home",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/home"),
  },
  {
    route: ["about", "acerca"],
    title: "Acerca",
    name: "about",
    nav: true,
    moduleId: PLATFORM.moduleName("./pages/about"),
  },
  {
    route: "my-lists/:id",
    title: "Mi Lista Detallada",
    name: "listdetail",
    nav: false,
    moduleId: PLATFORM.moduleName("./pages/list-detail"),
  },
];
