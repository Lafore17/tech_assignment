import React from "react";
import { RouteProps } from "react-router-dom";

const IntermediaryList = React.lazy(() => import("pages/intermediaries/list"));
const IntermediaryDetails = React.lazy(
  () => import("pages/intermediaries/details")
);
const ProductList = React.lazy(() => import("pages/products/list"));
const ProductDetails = React.lazy(() => import("pages/products/details"));
const NoMatch = React.lazy(() => import("pages/noMatch"));

export const routes: RouteProps[] = [
  { exact: true, path: "/intermediaries", component: IntermediaryList },
  { exact: true, path: "/intermediaries/details/:id", component: IntermediaryDetails },
  { exact: true, path: "/products", component: ProductList },
  { exact: true, path: "/products/details/:id", component: ProductDetails },
  { exact: true, path: "*", component: NoMatch },
];
