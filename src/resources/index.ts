import {FrameworkConfiguration, PLATFORM} from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName("./elements/shopy-navbar/shopy-navbar"),
    PLATFORM.moduleName("./elements/shopy-back/shopy-back"),
    // value converters
    PLATFORM.moduleName("./value-converters/routefilter"),
    PLATFORM.moduleName("./value-converters/jsonify"),
  ]);
}
