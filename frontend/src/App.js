import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SellerSignIn from "./components/SellerSignIn";
import SellerSignUp from "./components/SellerSignUp";
import SellerHome from "./components/SellerHome";
import SpecificRestaurant from "./components/SpecificRestaurant";
import RestaurantLandingPage from "./components/RestaurantLandingPage";
import CreateDish from "./components/CreateDish";
import EditDish from "./components/EditDish";
import CustomerLogin from "./components/CustomerLogin";
import CustomerSignUp from "./components/CustomerSignUp";
import CustomerHome from "./components/CustomerHome";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CustomerProfile from "./components/CustomerProfile";
import OrderSuccess from "./components/OrderSuccess";
import Order from "./components/Order";
import SellerOrder from "./components/SellerOrder";
import Favourites from "./components/Favourites";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={Home} exact />
        <Route exact path="/getRestaurants" component={RestaurantLandingPage} />
        <Route path="/getRestaurants/:id" component={SpecificRestaurant} />
        <Route path="/seller/signin" component={SellerSignIn} />
        <Route path="/seller/signup" component={SellerSignUp} />
        <Route path="/seller/home" component={SellerHome} />
        <Route path="/seller/create" component={CreateDish} />
        <Route path="/seller/editdish/:dishid" component={EditDish} />
        <Route path="/customer/login" component={CustomerLogin} />
        <Route path="/customer/signup" component={CustomerSignUp} />
        <Route path="/customer/home" component={CustomerHome} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/ordersuccess" component={OrderSuccess} />
        <Route path="/customer/orders" component={Order} />
        <Route path="/seller/order" component={SellerOrder} />
        <Route path="/customer/favourites" component={Favourites} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
