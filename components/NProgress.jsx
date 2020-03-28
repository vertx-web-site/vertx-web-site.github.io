import NProgress from "nprogress";
import Router from "next/router";

import "./NProgress.scss";

let timer;
NProgress.configure({ showSpinner: false });

const routeChangeStart = () => {
  timer = setTimeout(NProgress.start, 100);
};

const routeChangeEnd = () => {
  clearTimeout(timer);
  NProgress.done();
};

Router.events.on("routeChangeStart", routeChangeStart);
Router.events.on("routeChangeComplete", routeChangeEnd);
Router.events.on("routeChangeError", routeChangeEnd);

export default () => (<></>);
