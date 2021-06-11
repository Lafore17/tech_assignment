import React from "react";

const IntermediaryList = React.lazy(() => import("pages/intermediaries/list"));
const IntermediaryDetails = React.lazy(
  () => import("pages/intermediaries/details")
);
const ProductList = React.lazy(() => import("pages/products/list"));
const ProductDetails = React.lazy(() => import("pages/products/details"));
const NoMatch = React.lazy(() => import("pages/noMatch"));

export const routes = [
  { exact: true, path: "/intermediaries", component: IntermediaryList },
  { exact: true, path: "/intermediaries/details/:id", component: IntermediaryDetails },
  { exact: true, path: "/products", component: ProductList },
  { exact: true, path: "/products/details/:id", component: ProductDetails },
  { exact: true, path: "*", component: NoMatch },
];
