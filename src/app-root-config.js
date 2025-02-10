import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";
import {
  LOAD_ERROR,
  registerApplication,
  start,
  getAppNames,
  getAppStatus,
  checkActivityFunctions,
  addErrorHandler,
  unloadApplication
} from "single-spa";

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
  loaders: {
    topNav: "",
  },
  errors: {
    topNav: "<h1>Failed to load topnav</h1>",
    topMenu: "<h1>Failed to load topMenu</h1>",
  },
  props: {
    
  },
});
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => {
    console.log('loadApp: ', name);
    return System.import(name)
  },
});
// Delay starting the layout engine until the styleguide CSS is loaded
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

System.import("pulse-portal-styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  window.getAppNames = getAppNames;
  window.getAppStatus = getAppStatus;
  start();

  // addErrorHandler(err => {
  //   console.log('===single-spa err===: ', err);
  //   if (getAppStatus(err.appOrParcelName) === LOAD_ERROR) {
  //     System.delete(System.resolve(err.appOrParcelName));
  //   }
  // });

  // function throttle(fn, delay) {
  //   let timer;
  //   let lastTime = 0;

  //   return function () {
  //     const context = this;
  //     const args = arguments;
  //     const now = new Date().getTime();

  //     if (now - lastTime > delay) {
  //       lastTime = now;
  //       fn.apply(context, args);
  //     } else {
  //       clearTimeout(timer);
  //       timer = setTimeout(() => {
  //         lastTime = now;
  //         fn.apply(context, args);
  //       }, delay - (now - lastTime));
  //     }
  //   };
  // }

  // window.onresize = throttle(function () {
  //   console.log('===reload: ', new Date().getTime());
    
  //   window.location.replace(location.href);

  //   const appsThatShouldBeActive = checkActivityFunctions();
  //   console.log('appsThatShouldBeActive: ', appsThatShouldBeActive);

  //   // unloadApplication('pulse-portal-navbar'); // dont‘t work
  // }, 500);
});
