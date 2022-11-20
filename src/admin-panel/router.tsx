import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";

const basename = "/panel";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },

    {
      path: "/auth",
      element: <SignIn />,
    },
  ],
  { basename }
);
