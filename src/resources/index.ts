import {FrameworkConfiguration, PLATFORM} from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName("./elements/shopy-navbar/shopy-navbar"),
    PLATFORM.moduleName("./elements/shopy-back/shopy-back"),
    PLATFORM.moduleName("./elements/shopy-list-detail-collection/shopy-list-detail-collection"),
    // value converters
    PLATFORM.moduleName("./value-converters/routefilter"),
    PLATFORM.moduleName("./value-converters/jsonify"),
  ]);
}
