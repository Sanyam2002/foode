import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { CartPage } from "./components/CartPage";
import { Checkout } from "./components/Checkout";
import { Category } from "./components/Category";
import { Login } from "./components/Login";
import { ProductDetail } from "./components/ProductDetail";
import { Signup } from "./components/Signup";
import { Receipe } from "./components/Receipe";
import { Forgot } from "./components/Forgot";
import { Reset } from "./components/Reset";
import { RecBDetails } from "./components/RecBDetails";
import { RecNDetails } from "./components/RecNDetails";
import { RecPDetails } from "./components/RecPDetails";
import { Profile } from "./components/Profile";
import { SnacksBeverages } from "./components/SnacksBeverages";
import ProfileState from "./components/context/ProfileState";
import CartState from "./components/context/CartState";
import SweetAlertState from "./components/context/SweetAlertState";
import RecommendState from "./components/context/RecommendState";
import { LandingProfile } from "./components/LandingProfile";
import UploadProduct from "./components/Upload/UploadProduct";
import { Dairy } from "./components/Dairy";
import { DryFruits } from "./components/DryFruits";
import { Spices } from "./components/Spices";
import { Fruits } from "./components/Fruits";
import {Beverages} from "./components/Beverages";
import {CookingBaking} from "./components/CookingandBaking";
import { OrderSummary } from './components/OrderSummary';
import { OrderHistory } from './components/OrderHistory';

function App() {
  return (
    <>
      <SweetAlertState>
        <CartState>
          <RecommendState>
          <ProfileState>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/contacts">
                  <Contact />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/cartpage">
                  <CartPage />
                </Route>
                <Route exact path="/checkout">
                  <Checkout />
                </Route>
                <Route exact path="/Vegetables">
                  <Category />
                </Route>
                <Route exact path="/Snacks">
                  <SnacksBeverages />
                </Route>
                <Route exact path="/Beverages">
                  <Beverages/>
                </Route>
                <Route exact path="/CookingBaking">
                  <CookingBaking/>
                </Route>
                <Route exact path="/dairy">
                  <Dairy />
                </Route>
                <Route exact path="/dry_fruits">
                  <DryFruits />
                </Route>
                <Route exact path="/spices">
                  <Spices />
                </Route>
                <Route exact path="/Fruits">
                  <Fruits />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/profilelanding">
                  <LandingProfile />
                </Route>
                <Route exact path="/signin">
                  <Signup />
                </Route>
                <Route exact path="/receipe">
                  <Receipe />
                </Route>
                <Route exact path="/forgot">
                  <Forgot />
                </Route>
                <Route exact path="/reset">
                  <Reset />
                </Route>
                <Route exact path="/biryani">
                  <RecBDetails />
                </Route>
                <Route exact path="/PannerLababadar">
                  <RecPDetails />
                </Route>
                <Route exact path="/noodles">
                  <RecNDetails />
                </Route>
                <Route exact path="/product/upload">
                  <UploadProduct />
                </Route>
                <Route exact path="/product/:productId">
                  <ProductDetail />
                </Route>
                <Route exact path="/ordersummary">
                  <OrderSummary />
                </Route>
                <Route exact path="/orderhistory">
                  <OrderHistory />
                </Route>
              </Switch>
            </Router>
          </ProfileState>
          </RecommendState>
        </CartState>
      </SweetAlertState>
    </>
  );
}

export default App;
