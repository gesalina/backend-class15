import { Router } from "express";
import ProductManager from '../../controllers/dao/ProductManager.js'

const router = Router();
const productDatabase = new ProductManager();

// ENDPOINT - Get all products
router.get("/", async(request, response) => {
  const mongoProducts = await productDatabase.getProducts();
  let limit = request.query.limit;
  if (limit) return response.json(getProducts.slice(0, limit));
  response.json({products: mongoProducts});
})

/**
 * This endpoint filter a product by ID
 */
router.get("/:pid", async(request, response) => {
  let id = request.params.pid;
  const mongoProducts = await productDatabase.findProductById(id);
  if(mongoProducts.error){
    return response.status(404).json({ error: `${mongoProducts.error}`})
  }
  return response.json({products: mongoProducts});
})
/**
 * This endpoint create a new product
 */
router.post("/", async(request, response) => {
  let product = request.body;
  try{
  const mongoProducts = await productDatabase.createProduct(product);
  request.app.get('socketio').emit('updateProducts', mongoProducts);
  response.json({status: 'success', products: mongoProducts})
} catch (err){
  response.status(404).json({status: 'error',  error: `${err.message}`})
  }
})
/**
 * This endpoint delete a product by ID
 */
router.delete("/:pid", async(request, response) => {
  let id = request.params.pid;
  try{
  const mongoProducts = await productDatabase.deleteProduct(id);
  if(mongoProducts.error){
    return response.status(404).json({status: 'error',  error: `${mongoProducts.error}`})
  }
  response.json({status: 'success', products: mongoProducts})
} catch (err){
    response.status(404).json({status: 'error',  error: `${err.message}`})
  }
})
/**
 * This endpoint update a product
 */
router.put("/:pid", async(request, response) => {
  let id = request.params.pid;
  let data = request.body;
  if(Object.keys(data).length < 7) return  response.status(404).json({status: 'error', error: 'All the fields are needed'})

  try{
  const mongoProducts = await productDatabase.updateProduct(id, data);
  if(mongoProducts.error){
    return response.status(404).json({status: 'error',  error: `${mongoProducts.error}`})
  }
  response.json({status: 'success', products: mongoProducts})
} catch (err){
    response.status(404).json({status: 'error',  error: `${err.message}`})
  }
});

export default router;
