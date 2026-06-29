import { Router } from "express";

// Middlewares
import userAuth from "@middleware/user/Auth";

// Controllers
import Auth from "@controllers/User/Auth";
import Category from "@controllers/User/Category";
import Subcategory from "@controllers/User/Subcategory";
import Product from "@controllers/User/Product";
import CartIItem from "@controllers/User/CartIItem";
import Order from "@controllers/User/Order";
import Address from "@controllers/User/Address";

//--------------------------------------------------------------
const route = Router();
//--------------------------------------------------------------

// Auth ------------------------------------------
route.post("/auth/signup", Auth.Main.signup);
route.post("/auth/login", Auth.Main.login);
route.get("/user/get-profile", userAuth, Auth.Main.getProfile);

// Category ------------------------------------------
route.post("/category/create", userAuth, Category.Main.create);
route.get("/category/list", userAuth, Category.Main.list);

// Subcategory ------------------------------------------
route.post("/subcategory/create", userAuth, Subcategory.Main.create);
route.get("/subcategory/list", userAuth, Subcategory.Main.list);

// Product ------------------------------------------
route.post("/product/list", userAuth, Product.Main.list);
route.get("/product/details", userAuth, Product.Main.details);

// Cart Item ------------------------------------------
route.post("/cart-item/create", userAuth, CartIItem.Main.create);
route.get("/cart-item/get-cart", userAuth, CartIItem.Main.getCart);
route.post("/cart-item/set-quantity", userAuth, CartIItem.Main.setQuantity);
route.delete("/cart-item/delete", userAuth, CartIItem.Main.delete);

// Order ------------------------------------------
route.post("/order/create", userAuth, Order.Main.create);
route.get("/order/list", userAuth, Order.Main.list);

// Address ------------------------------------------
route.post("/address/create", userAuth, Address.Main.create);
route.get("/address/list", userAuth, Address.Main.list);

export default route;
