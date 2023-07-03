import { Router } from "express";
import ProductManager from '../../controllers/dao/ProductManager.js'

const router = Router();
const product = new ProductManager();

// ENDPOINT - Get all products

router.get("/", async (request, response) => {
  const getProducts = await product.getProducts();
  let limit = request.query.limit;
  if (limit) return response.render('home', getProducts.slice(0, limit));
  response.render('home', {
    plugins: '?plugins=aspect-ratio',
    view_name: 'Products View',
    products: getProducts
  }
    );
});

router.get('/realtimeproducts', async(request, response) => {
  const products = await product.getProducts();
  response.render('realTimeProducts', {
    view_name: "Productos en tiempo real",
    products: products
  })
})

router.get('/chat', async(request, response) => {
  response.render('chat');
})

export default router;