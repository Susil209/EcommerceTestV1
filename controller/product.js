// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("data.json", { encoding: "utf-8" }));
// const productsArr = data.products;

const {Product} = require("../model/product");

const createProduct = async (req, res) => {
  const newProduct = req.body;
  // connect to db
  const product = new Product(newProduct);
  await product.save()
    .then((item)=>{
      res.send(`The new product ${item.title} is created successfully.`)
    })
    .catch((e)=>{
      res.json(e);
    })

  // const newProduct = req.body;
  // productsArr.push(newProduct);
  // res.send(`The new product ${newProduct.title} is created successfully.`);
}

const getAllProducts = async (req, res) => {
    await Product.find({})
      .then((products)=>{
        res.json(products);
      }) 
      .catch((e)=>{
        res.json(e);
      })
}

const getProduct = async (req, res) => {
  const productId = req.params.id;
  await Product.findById(productId)
    .then((product)=>{
      res.json(product);
    })
    .catch((e)=>{
      res.json(e);
    })
    // const productId = Number(req.params.id);
    // const product = productsArr.find((item) => item.id === productId);
    // res.json(product);
  }



const replaceProduct = async (req, res) => {
  const productId = req.params.id;
  const updateProduct = req.body;
  await Product.findOneAndReplace({_id:productId},updateProduct,{returnDocument:'after'})
      .then((updatedItem)=>{
        res.json(updatedItem);
      })
      .catch((e)=>{
        res.json(e);
      })
    // const productId = Number(req.params.id);
    // const updateProduct = req.body;
    // const getProductIndex = productsArr.findIndex(
    //   (item) => item.id === productId
    // );
    // productsArr.splice(getProductIndex, 1, { id: productId, ...updateProduct });
    // res.sendStatus(200).send("Product update successfully.");
  }

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateProduct = req.body;
  await Product.findOneAndUpdate({_id:productId},updateProduct,{new: true})
      .then((updatedItem)=>{
        res.json(updatedItem);
      })
      .catch((e)=>{
        res.json(e);
      })

    // const productId = Number(req.params.id);
    // const getProductIndex = productsArr.findIndex(
    //   (item) => item.id === productId
    // );
    // const product = productsArr[getProductIndex];
    // productsArr.splice(getProductIndex, 1, { ...product, ...req.body });
    // res.sendStatus(200).json();   
  }

const deleteProduct = async (req,res)=>{
  const productId = req.params.id;
    await Product.findOneAndDelete({_id:productId})
      .then((product)=>{
        res.json(product);
      })   
      .catch((e)=>{
        res.json(e);
      })
    // const productId = Number(req.params.id);
    // const getProductIndex = productsArr.findIndex(
    //   (item) => item.id === productId
    // );
    // productsArr.splice(getProductIndex, 1);
    // res.send("Product deleted successfully");
  }

module.exports = {getAllProducts,getProduct,createProduct,replaceProduct,updateProduct,deleteProduct};