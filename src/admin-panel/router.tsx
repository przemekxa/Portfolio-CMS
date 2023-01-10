import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import Media from "./pages/Media";
import Menu from "./pages/Menu";
import Page from "./pages/Page";
import SignIn from "./pages/SignIn";

const basename = "/panel";
export const pagesPrefix = "/pages";

export const router = createBrowserRouter(
  [
    { path: "/signin", element: <SignIn /> },
    { path: "/menu", element: <Menu /> },
    { path: "/media", element: <Media /> },
    {
      path: pagesPrefix,
      children: [
        { index: true, element: <Home /> },
        { path: "new", element: <Page /> },
        { path: ":pageId", element: <Page /> },
      ],
    },
  ],
  { basename }
);
