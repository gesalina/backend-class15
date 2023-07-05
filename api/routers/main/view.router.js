import { Router } from "express";
import ProductManager from '../../controllers/dao/ProductManager.js'

const router = Router();
const product = new ProductManager();

/*
* This router allows to show the products in the main view
*/

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

/**
*  This router allows show the products | EXPERIMENTAL
*
router.get('/products', async(request, response) => {
  const getProducts = await product.getProducts();
  response.render('home', {
    plugins = '?plugins=aspect-radio',
    view_name: 'Tenda - Products',
    products: getProducts
  })
})
*/

/**
* This router allows to render the products on realtime
* have a form and a delete button working with websocket
*/
router.get('/realtimeproducts', async(request, response) => {
  const products = await product.getProducts();
  response.render('realTimeProducts', {
    view_name: "Productos en tiempo real",
    products: products
  })
})
/**
*  This router render the chat, that work with websocket
*/
router.get('/chat', async(request, response) => {
  response.render('chat');
})

export default router;
