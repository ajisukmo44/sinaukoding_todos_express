// create a handler for product
const  { getAllProduct, addProduct, deleteProduct, getProductById, updateProduct }  = require("../models/product.model.js");
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

exports.getProduct = async (req, res, next) => {
    // const product = await pool.query('SELECT * FROM product');
    let filteredproduct = await getAllProduct();
    let products = await getAllProduct();
    try {
      console.log("Fetching items for user:", req);
  
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        filteredproduct = products.filter(product => searchRegex.test(product.name));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      const output = {
        message: "List of product",
        data: filteredproduct,
        count: filteredproduct.length, 
        status: "success",
      };
      res.write(JSON.stringify(output));
      res.end();

    } catch (err) {
    res.status(500).json({message: err, success: false});
    }
}

exports.getProductDetail = async (req, res, next) => {
  const id = req.params.id;
  // res.json({id, success: true});
  try {
  const productx = await getProductById(id);
  const output = {
    message: "Detail of product",
    data: productx,
    status: "success",
  };
  if (productx) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "product not found" }));
  }
} catch (err) {
  res.status(500).json({message: err, success: false});
  }
  res.end();
}

exports.addProducts = async (req, res, next) => {
  try {
   const newProduct = {
     name: req.body.name,
     price: req.body.price,
     deskripsi: req.body.deskripsi,
     category: req.body.category,
   };
 
   await addProduct(newProduct);                          
   const output = {
     message: "Product added successfully",
     data: newProduct ,
     status: "success",
   };

  //  res.json({data: 'ok', success: true});
   res.writeHead(200, { "Content-Type": "application/json" });
   res.write(JSON.stringify(output));
  } catch (err) {
   console.error("Error creating product:", err);
   res.status(500).json({
     message: err.message || "Failed to create product item",
     success: false
   });
  }
  res.end();
 }

exports.deleteProduct =  async (req, res, next) => {
  const idd = req.params.id;
    
  const deleteProductx = await deleteProduct(idd);
  const output = {
    message: "Product deleted successfully",
    status: "success",
  };
  if (deleteProductx) {
    res.writeHead(200, { "Content-Type": "application/json" }); // No Content
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Product not found" }));
  }
  res.end();
};

exports.updateProductData = async (req, res) => {
  const id = req.params.id;
  let body = req.body || "";

  try {
    const updateData = body;
    await updateProduct(id, updateData);
    const output = {
      message: "Product updated successfully",
      data: updateData,
      status: "success",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(output));

   } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({
      message: err.message || "Failed to create product item",
      success: false
    });
  }
  
  res.end();
};

