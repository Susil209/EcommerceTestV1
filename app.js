require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cors());
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use(express.json());

// Router
app.use("/products", productRouter.router);
app.use("/users", userRouter.router);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// app.get("/", (req, res) => {
// //   res.json(productsArr);
//   res.sendFile(path.resolve("index.html"));
// });

// MVC - model view controller
// RESTful API

/*
// Read GET /products
app.get("/products", getAllProducts);
// Read GET /products/:id
app.get("/products/:id", getProduct);
//Create POST /products
app.post("/products", createProduct);
//Update PUT /products/id
app.put("/products/:id",replaceProduct);
//Updated PATCH /products/id
app.patch("/products/:id", updateProduct);
//Delete DELETE /products/:id
app.delete("/products/:id",deleteProduct);
*/

app.listen(process.env.PORT, () => {
  console.log("Server is running at port 4000...");
});

/*
const http = require("http");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json", { encoding: "utf-8" }));
const indexHtml = fs.readFileSync("index.html", "utf-8");
const productsArr = data.products;


const server = http.createServer((req, res) => {

    if(req.url.startsWith("/products")){
        // console.log(req.url.split("/")[2])
        const productId = Number(req.url.split("/")[2]);
        const product = productsArr.find(productItem => productItem.id === productId);
        // console.log(product);
        res.writeHead(200,{"Content-Type" : "text/html"});
        let modifiedProduct = indexHtml.replace("**title**",product.title).replace("**url**",product.thumbnail).replace("**price**",product.price).replace("**rating**",product.rating);
        res.end(modifiedProduct);
    }

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(indexHtml);
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
      break;

    default:
      res.writeHead(404);
      res.end();
  }
});

server.listen(4000, () => {
  console.log("Server is runnung on port 4000...");
});
*/
