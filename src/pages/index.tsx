import { lazy } from "react";


const lazyLoad = (importFunc: () => Promise<any>, delay = 1000) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );
};

export const Home = lazyLoad(() => import("./Home"));
export const SignIn = lazyLoad(() => import("./SignIn"));
export const SignUp = lazyLoad(() => import("./SignUp"));
export const ManagerCabinet = lazyLoad(() => import("./ManagerCabinet"));
export const Orders = lazyLoad(() => import("./Orders"));
export const CreateOrder = lazyLoad(() => import("./CreateOrder"));
export { default as NotFoundPage } from "./NotFound";
export { default as ServerError } from "./ServerError";
export { default as Loading } from "./Loading";
