import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import EditProduct from "./Pages/Products/EditProduct";
import AddProduct from "./Pages/Products/AddProduct";
import LoginFooter from "./Components/LoginFooter";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Loading from "./Components/Loading";
import UserList from "./Pages/Users";
import EditUserAdmin from "./Pages/Users/EditUserAdmin";
import CreateUserAdmin from "./Pages/Users/CreateUserAdmin";
import AddCategory from "./Pages/Categories/AddCategory";
import EditCategory from "./Pages/Categories/EditCategory";
import ProductList from "./Pages/Products";
import ProductForm from "./Components/ProductForm";
import ScrollToTop from "./Components/ScrollTop";
import Orders from "./Pages/Orders";
import UpdateStatusOrder from "./Pages/Orders/UpdateStatusOrder";
import CustomerList from "./Pages/Customer";
import ReviewList from "./Pages/Review";
import ListOrderOfCustomer from "./Pages/Customer/ListOrderOfCustomer";
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
// console.log(user);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return user ? children : <Navigate to="/auth/login-admin" replace />;
}

// Public Route Wrapper (redirects if authenticated)
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return user ? <Navigate to="/dash-board" replace /> : children;
}

const router = createBrowserRouter([
  {
    path: "/auth/login-admin",
    exact: true,
    element: (
      <>
        <PublicRoute>
          <section className="main flex min-h-screen w-full flex-col justify-between">
            <Login />

            <LoginFooter />
          </section>
        </PublicRoute>
      </>
    ),
  },

  {
    path: "/loading",
    exact: true,
    element: (
      <>
        <Loading />
      </>
    ),
  },
  {
    path: "/dash-board",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] py-4 px-5 w-[82%]">
                <Dashboard />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "*", // Catch-all route
    element: <Navigate to="/auth/login-admin" replace />,
  },

  {
    path: "/product/product-list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] py-4 px-5 w-[82%]">
               <ProductList/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/categories/list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] py-4 px-5 w-[82%]">
                <Categories />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/category/upload",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight border bg-[#f9f9f9] py-4 px-5 w-[82%]">
                <AddCategory/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/category/edit/:id",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight border bg-[#f9f9f9] py-4 px-5 w-[82%]">
                <EditCategory/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/product/product-edit/:idProduct",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] px-6 py-4 pb-0 w-[82%]">
                {/* <EditProduct /> */}
                <ProductForm/>

              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/product/upload",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] py-4 pb-0 w-[82%]">
                <AddProduct />
                {/* <ProductForm/> */}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/order/order-list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#f9f9f9] py-4 pb-0 w-[82%]">
                <Orders />
                {/* <ProductForm/> */}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/order/orderdetail/:id",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight px-14 bg-[#f9f9f9] py-4 pb-0 w-[82%]">
                <UpdateStatusOrder />
                  {/* <ProductForm/> */}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/order/product-edit/:id",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#fff] py-4 pb-0 w-[82%]">
                <Orders />
                {/* <ProductForm/> */}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  

  {
    path: "/account-admin/account-admin-list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main bg-[#f9f9f9]">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight py-4 px-10 w-[82%]">
                <div className="card border rounded-lg bg-white py-5 px-6">
                  <UserList />
                </div>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/account-admin/edit-account-admin/:id",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main bg-[#f9f9f9]">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight py-4 px-10 w-[82%]">
                <div className="card border rounded-lg bg-white py-5 px-6">
                  <EditUserAdmin />
                </div>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/account-admin/add-account-admin",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight border bg-[#f9f9f9] py-4 w-[82%]">
                <CreateUserAdmin/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/customer/customer-list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight border p-10 bg-[#f9f9f9] py-4 w-[82%]">
                <CustomerList/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/customer/orderOfCustomer/:id",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight bg-[#fff] py-4 pb-0 w-[82%]">
                <ListOrderOfCustomer />
                {/* <ProductForm/> */}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/review/review-list",
    exact: true,
    element: (
      <>
        <ProtectedRoute>
          <section className="main ">
            <Header />

            <div className="contentMain flex">
              <div className="sidebarWrapper w-[18%]">
                <SideBar />
              </div>

              <div className="contentRight border p-10 bg-[#f9f9f9] py-4 w-[82%]">
                <ReviewList/>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </>
    ),
  },
]);
function App() {
  // const [user, setUser] = useState(null);

  return (
    <>
    {/* <ScrollToTop/> */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
