/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router"

import App from "./App";
import { ToasterProvider } from "./Providers/ToastProvider";
import { AuthProvider } from "./Providers/AuthProvider";
import { lazy } from "solid-js";

// Pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Auth = lazy(() => import("./Pages/Auth"));
const Store = lazy(() => import("./Pages/Store"));
const Contact = lazy(() => import("./Pages/Contact"));
const AssetForm = lazy(() => import("./Pages/AssetForm"))
const DetailAsset = lazy(() => import("./Pages/DetailAsset"))
const CartFavorite = lazy(() => import("./Pages/CartFavorite"))
const Dashboard = lazy(() => import("./Pages/Dashboard"))

// ...
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => (
  <AuthProvider>
    
    <ToasterProvider>
    
      <Router>
        <Route component={App}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/store" component={Store} />
          <Route path="/asset-form" component={AssetForm} />
          <Route path="/asset/:id" component={DetailAsset} />
          <Route path="/cart-favorite" component={CartFavorite} />
          <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="/auth" component={Auth} />
      </Router>
      
    </ToasterProvider>

  </AuthProvider>
), root!);
