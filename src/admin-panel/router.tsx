import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import Media from "./pages/Media";
import Menu from "./pages/Menu";
import NewPage from "./pages/NewPage";
import Sections from "./pages/Sections";
import SignIn from "./pages/SignIn";

const basename = "/panel";

export const router = createBrowserRouter(
  [
    { path: "/", element: <Index /> },
    { path: "/sections", element: <Sections /> },
    { path: "/auth", element: <SignIn /> },
    { path: "/menu", element: <Menu /> },
    { path: "/media", element: <Media /> },
    { path: "/pages/new", element: <NewPage /> },
  ],
  { basename }
);
