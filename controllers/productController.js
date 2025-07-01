// create a handler for product
const product = require("../models/product.model.js");
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

exports.getProduct = async (req, res, next) => {
    let filteredproduct = product;
    try {
      console.log("Fetching items for user:", req);
  
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        filteredproduct = product.filter(product => searchRegex.test(product.name));
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
  try {
  const productx = product.find((product) => product.id == id);
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



exports.deleteProduct =  async (req, res, next) => {
  const id = req.params.id;
  const index = product.findIndex((product) => product.id == id);
  const output = {
    message: "product deleted successfully",
    status: "success",
  };
  if (index !== -1) {
    product.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" }); // No Content
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "product not found" }));
  }
  res.end();
};

// const updateProduct = (req, res) => {
//   const id = req.params.id;
//   let body = req.body || "";
//   const updatedproduct = body;
//   const output = {
//     message: "product updated successfully",
//     data: updatedproduct,
//     status: "success",
//   };
//   const index = product.findIndex((product) => product.id === id);
//   if (index !== -1) {
//     product[index] = { ...product[index], ...updatedproduct };
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(output));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ error: "product not found" }));
//   }
//   res.end();
// };



exports.addProduct = async (req, res, next) => {
 try {
  console.log("Request body:", req.body);
  
  // if (!req.body.name || !req.body.price) {
  //   return res.status(400).json({
  //     message: "Name and price are required",
  //     success: false
  //   });
  // }
  // // const item = await todoItem.save();
  // const newProduct = {...body, id: uuidv4()};
  // product.push(newProduct);
  res.writeHead(201, { "Content-Type": "application/json" });
  const output = {
    message: "Todo added successfully",
    data: req.body ,
    status: "success",
  };
  res.write(JSON.stringify(output));
 } catch (err) {
  console.error("Error creating todo:", err);
  res.status(500).json({
    message: err.message || "Failed to create todo item",
    success: false
  });
 }
}

// exports.getTodoItems = async (req, res, next) => {
//   try {
//     console.log("Fetching items for user:", req.user.id);
//     const todos = await TodoItem.find({ userid: req.user.id }) // Fetch items for the authenticated user;
//     console.log("Fetched todos:", todos);
//     res.json({todos, success: true});
//   } catch (err) {
//    res.status(500).json({message: err, success: false});
//   }
// }

// exports.deleteTodoItem = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const items = await TodoItem.find({ _id: id }); // Ensure the item belongs to the authenticated user
//     if(!items || items.length === 0) {
//       return res.status(404).json({message: "Item not found", success: false});
//     }
//     if(items[0].userid.toString() !== req.user.id) {
//       return res.status(403).json({message: "You are not authorized to delete this item", success: false});
//     }
//     const deletedItem = await TodoItem.findByIdAndDelete(id);
//     res.json({deletedItem, success: true});
//   } catch (err) {
//    res.status(500).json({message: err, success: false});
//   }
// }

// exports.updateTodoItem = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const items = await TodoItem.find({ _id: id }); // Ensure the item belongs to the authenticated user
//     if(!items || items.length === 0) {
//       return res.status(404).json({message: "Item not found", success: false}); 
//     }
//     if(items[0].userid.toString() !== req.user.id) {
//       return res.status(403).json({message: "You are not authorized to update this item", success: false});
//     }
  
//     const updatedItem = await TodoItem.findByIdAndUpdate(id, req.body, {new: true});
//     res.json({updatedItem, success: true});
//   } catch (err) {
//     res.status(500).json({message: err, success: false});
//   }
// }