import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContextUser.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";
import { ReviewProvider } from "./Context/ReviewContext.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
    <BrowserRouter>
            <CartProvider>

    <AuthProvider>
      <ProductProvider>
        <ReviewProvider>
          <OrderProvider>
              <App />
          </OrderProvider>
        </ReviewProvider>
      </ProductProvider>
    </AuthProvider>
    </CartProvider>

    </BrowserRouter>

  // </StrictMode>
);
