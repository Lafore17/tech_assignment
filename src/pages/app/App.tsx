import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "configs";

const App: React.FC = () => (
  <div>
    <BrowserRouter>
      <React.Suspense fallback={null}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </div>
);

export default App;
