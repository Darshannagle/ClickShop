import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;
