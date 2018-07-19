import { Router, RouterConfiguration } from "aurelia-router";
import { ROUTES } from "routes";
import "./app.scss";
import { MainDB, initDatabases } from "pouch-utils/poucher";

export class App {
  public message = "Hello World!";

  protected router: Router;

  constructor() {
    initDatabases()
      .then(success => console.info(`Successfully Initialized Databases ${success}`))
      .catch(console.error);
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = "Shoppinator";
    config.map(ROUTES);
  }

  public attached() {
    return MainDB.get("lastroute")
      .then((record: any) => {
        if (record) { return this.router.navigateToRoute(record.name, record.param); }
        return;
      })
      .catch(() => console.info("No Last Route Recorded, staying in home"));
  }
}
