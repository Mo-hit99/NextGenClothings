import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import helmet from 'helmet'
import { db_connection } from "./DB Connection/db_connection.js";
import { Product_router } from "./routes/product_router.js";
import { User_route } from "./routes/User_routes.js";
import Payment_router from "./routes/payment_router.js";
import invoice_Router from "./routes/invoice_router.js";



dotenv.config();

const port= process.env.PORT || 8080;
const app = express();
app.use(helmet())
// const corsOptions = {
  //   origin: 'http://localhost:5173', // Allow this origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // If you need to include credentials (cookies, authorization headers)
  // };
  app.use(express.json())
  app.use(cors())

app.use('/productData',express.static("public"));

app.use(Product_router)
app.use(User_route)
app.use(Payment_router)
app.use(invoice_Router)


app.listen(port,()=>{
  console.log('http://localhost:'+port);
  db_connection()
})