import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import NewLaunches from "./Components/NewLaunches/NewLaunches";
import Footer from "./Components/Footer/Footer";
import All_Products_Display from "./Pages/All_Products_Display";
import Support from "./Components/Support/Support";
import SuccessPage from "./Pages/SuccessPage";
import { useLocation } from "react-router-dom";
import Profile from "./Pages/Profile";
import OrderedItems from "./Pages/OrderedItems";

function App() {
  const location = useLocation();
  const isSuccessPage = location.pathname === '/success';

  return (
    <div>
      {!isSuccessPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smartwatch" element={<ShopCategory category="smartwatch" />} />
        <Route path="/headphones" element={<ShopCategory category="headphones" />} />
        <Route path="/tws" element={<ShopCategory category="tws" />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/newlaunches" element={<NewLaunches />} />
        <Route path="/allproductsdisplay" element={<All_Products_Display />} />
        <Route path="/support" element={<Support />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ordereditems" element={<OrderedItems />} />
      </Routes>
      {!isSuccessPage && <Footer />}
    </div>
  );
};

export default App;
