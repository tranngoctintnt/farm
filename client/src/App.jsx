import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Page/Home";
import ProductList from "./Page/ProductList";
import Footer from "./components/Footer";
import { ProductDetails } from "./Page/ProductDetail";
import { createContext, useEffect, useMemo, useState } from "react";
import Login from "./Page/Login";
import Register from "./Page/Register";
import CartPage from "./Page/Cart";
import Verify from "./Page/Verify";
import toast, { Toaster } from "react-hot-toast";
import FogotPassword from "./Page/FogotPassword";
import Checkout from "./Page/Checkout";
import MyAccount from "./Page/MyAccount";
import MyList from "./Page/MyList";
import Orders from "./Page/Orders";
import ScrollToTop from "./components/ScrollTop";
import { useProduct } from "./Context/ProductContext";
import { useAuthUser } from "./Context/AuthContextUser";
import useAxiosInterceptor from "./Page/ProtectPage/autoLogout";
import MyAddress from "./Page/MyAddress";
import DetailOrderPage from "./Page/DetailOrderPage";
import ProductDetailDialog from "./components/ProductDetailDialog/ProductDetailDialog";
import useFetchDataCate from "./hook/fetchCate";
import ProtectedRoute from "./ProtectRoutes/ProtectedRoute";
import Contact from "./Page/Contact";
import About from "./Page/About";
import Policy from "./Page/Policy";
import Event from "./Page/Event";
const MyContext = createContext();

function App() {
  useAxiosInterceptor();
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const { categories } = useFetchDataCate();
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const { products, loading, fetchProducts, hasFetched } = useProduct();
  const { user } = useAuthUser();

  useEffect(() => {
    if (!loading && products.length === 0 && !hasFetched) {
      console.log("Fetching products in App");
      fetchProducts();
    }
  }, [fetchProducts, products, loading, hasFetched]);

  const toggleCartPanel = (newOpen) => () => {
    if (!user) {
      setOpenCartPanel(false);
    } else {
      setOpenCartPanel(newOpen);
    }
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const handleCloseProductDetailModal = () => {
    setOpenProductDetailModal(false);
  };

  const contextValues = useMemo(
    () => ({
      setOpenProductDetailModal,
      setSelectedProduct,
      selectedProduct,
      setOpenCartPanel,
      toggleCartPanel,
      openCartPanel,
      openAlertBox,
      isLogin,
      setIsLogin,
    }),
    [
      setOpenProductDetailModal,
      setSelectedProduct,
      selectedProduct,
      setOpenCartPanel,
      toggleCartPanel,
      openCartPanel,
      isLogin,
      setIsLogin,
    ]
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <MyContext.Provider value={contextValues}>
        <ScrollToTop />
        {/* <ProtectedRoute/> */}
        <Header categoriesData={categories} />
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute restrictIfAuthenticated redirectTo="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              //  <ProtectedRoute redirectTo="/">
              <Home />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/productList"
            element={<ProductList data={products} categories={categories} />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute restrictIfAuthenticated redirectTo="/">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute restrictIfAuthenticated redirectTo="/">
                <Verify />
              </ProtectedRoute>
            }
          />
          <Route path="/fogotpasword" element={<FogotPassword />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-account/:id"
            element={
              // <ProtectedRoute>

              <MyAccount />
              // </ProtectedRoute>
            }
          />
          <Route path="/my-list" element={<MyList />} />
          <Route
            path="/my-address/:id"
            element={
              // <ProtectedRoute>
              <MyAddress />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/my-order/:id"
            element={
              // <ProtectedRoute >
              <Orders />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              // <ProtectedRoute >
              <DetailOrderPage />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              // <ProtectedRoute >
              <Contact />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              // <ProtectedRoute >
              <About />
              // </ProtectedRoute>
            }
          />

<Route
            path="/policy"
            element={
              // <ProtectedRoute >
              <Policy/>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/event"
            element={
              // <ProtectedRoute >
              <Event/>
              // </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </MyContext.Provider>
      <Toaster />
      <ProductDetailDialog
        open={openProductDetailModal}
        onClose={handleCloseProductDetailModal}
        selectedProduct={selectedProduct}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      />
    </>
  );
}

export default App;
export { MyContext };
