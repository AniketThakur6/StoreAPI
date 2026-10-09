import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import PublicRoute from "./protected/PublicRoute";
import ProtectedRoute from "./protected/ProtectedRoute";
import HomeLayout from "../layouts/HomeLayout";
import SessionLoader from "../components/SessionLoader";

const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const EditProduct = lazy(() => import("../pages/EditProduct"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductImages = lazy(() => import("../pages/ProductImages"));

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicRoute />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <ProductPage />,
        },
        {
          path: ":id",
          element: <ProductDetails />,
        },
        {
          path: "images",
          element: <ProductImages />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "add",
              element: <AddProduct />,
            },
            {
              path: ":id/edit",
              element: <EditProduct />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<SessionLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRoute;