import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "configs";

const App: React.FC = () => (
  <BrowserRouter>
    <React.Suspense fallback={null}>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

export default App;
