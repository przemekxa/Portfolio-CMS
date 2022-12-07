import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import Sections from "./pages/Sections";
import SignIn from "./pages/SignIn";

const basename = "/panel";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/sections",
      element: <Sections />,
    },
    {
      path: "/auth",
      element: <SignIn />,
    },
  ],
  { basename }
);
