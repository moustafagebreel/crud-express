const express = require('express');
const app = express();
const port = 3000; // You can change the port if needed

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data for products
let products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 19.99 },
];

// Create a new product
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = { id: products.length + 1, name, description, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Read all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Read a specific product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const updatedProduct = { id, name, description, price };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


app.post('/products', (req, res) => {
    const { name, description, price } = req.body;
  
    // التحقق من وجود الحقول المطلوبة
    if (!name || !price) {
      return res.status(400).json({ message: 'يجب تقديم اسم وسعر للمنتج' });
    }
  
    const newProduct = { id: products.length + 1, name, description, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price } = req.body;
  
    // التحقق من وجود الحقول المطلوبة
    if (!name || !price) {
      return res.status(400).json({ message: 'يجب تقديم اسم وسعر للمنتج' });
    }
  
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }
  
    const updatedProduct = { id, name, description, price };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  });
  