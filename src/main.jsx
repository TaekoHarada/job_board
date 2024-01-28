import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Error from "./routes/error";
import Index from "./routes";

import JobDetail, {
  loader as jobLoader,
  action as jobEditAction,
} from "./routes/jobDetail";

import EditJob, {
  loader as editLoader,
  action as editAction,
} from "./routes/editJob";

import ApplyForm, {
  loader as applyLoader,
  action as applyAction,
} from "./routes/applyForm";

import ApplyConfirmation, {
  loader as applyConfirmationLoader,
  action as applyConfirmationAction,
} from "./routes/applyConfirmation";

import ApplySuccess from "./routes/applySuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "jobs/:id",
        element: <JobDetail />,
        loader: jobLoader,
        action: jobEditAction,
      },
      {
        path: "jobs/:id/edit",
        element: <EditJob />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "jobs/:id/apply/:title",
        element: <ApplyForm />,
        loader: applyLoader,
        action: applyAction,
      },
      {
        path: "jobs/:id/apply/:title/confirmation",
        element: <ApplyConfirmation />,
        loader: applyConfirmationLoader,
        action: applyConfirmationAction,
      },
      {
        path: "jobs/success",
        element: <ApplySuccess />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
