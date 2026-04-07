import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import PrivateRoute from "../Auth/PrivateRoute";

// Provide a seamless fallback for chunk loading
const PageLoader = () => (
  <div className="flex-1 min-h-[70vh] flex items-center justify-center bg-[#f8f8f8]">
    <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#111111] animate-spin"></div>
  </div>
);

const Home = React.lazy(() => import("../pages/Home/Home"));
const Collections = React.lazy(() => import("../pages/Collections/Collections"));
const Contact = React.lazy(() => import("../pages/Contact/Contact"));
const About = React.lazy(() => import("../pages/About/About"));
const Sell = React.lazy(() => import("../pages/Sell/Sell"));
const Login = React.lazy(() => import("../Auth/Login"));
const Register = React.lazy(() => import("../Auth/Register"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));

const CategoriesOverview = React.lazy(() => import("../pages/CategoriesOverview/CategoriesOverview"));
const Subcategories = React.lazy(() => import("../pages/Subcategories/Subcategories"));
const ProductListing = React.lazy(() => import("../pages/ProductListing/ProductListing"));

const Shop = React.lazy(() => import("../pages/Shop/Shop"));
const NewArrivals = React.lazy(() => import("../pages/NewArrivals/NewArrivals"));
const Sale = React.lazy(() => import("../pages/Sale/Sale"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const Wishlist = React.lazy(() => import("../pages/Wishlist/Wishlist"));

const Suspended = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Suspended><Home /></Suspended> },
      { path: "products", element: <Suspended><Shop /></Suspended> },
      { path: "product/:id", element: <Suspended><Product /></Suspended> },
      
      { path: "categories", element: <Suspended><CategoriesOverview /></Suspended> },
      { path: "category/:categoryName", element: <Suspended><Subcategories /></Suspended> },
      { path: "products/:category/:subcategory", element: <Suspended><ProductListing /></Suspended> },

      { path: "new-arrivals", element: <Suspended><NewArrivals /></Suspended> },
      { path: "collections", element: <Suspended><Collections /></Suspended> },
      { path: "sale", element: <Suspended><Sale /></Suspended> },
      { path: "contacts", element: <Suspended><Contact /></Suspended> },
      { path: "about", element: <Suspended><About /></Suspended> },
      { path: "brands", element: <Suspended><About /></Suspended> },
      { path: "sell", element: <PrivateRoute><Suspended><Sell /></Suspended></PrivateRoute> },
      { path: "cart", element: <PrivateRoute><Suspended><Cart /></Suspended></PrivateRoute> },
      { path: "wishlist", element: <PrivateRoute><Suspended><Wishlist /></Suspended></PrivateRoute> },
    ],
  },
  { path: "/login", element: <Suspended><Login /></Suspended> },
  { path: "/register", element: <Suspended><Register /></Suspended> },
  { path: "*", element: <h1 className="p-10 text-xl font-bold text-center w-full mt-20">404 - Page Not Found</h1> },
]);

export default router;
