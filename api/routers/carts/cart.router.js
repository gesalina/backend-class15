import {Router, response} from 'express';
import cartManager from '../../controllers/dao/CartManager.js'


const router = Router();
const cart = new cartManager();

/**
 * This endpoint get all carts
 */
router.get("/", async (request, response) => {
  const getCarts = await cart.getCarts();
  return response.json({carts: getCarts});
})
/**
 * This endpoint get the products of a cart
 */
router.get("/:cid/products", async(request, reponse) => {
  const cartId = request.params.cid;
  const getProductsCarts = await cart.getCartProduct(cartId);
  if(getProductsCarts.error){
    return reponse.status(404).json({status: 'error', error: getProductsCarts.error});
  }
  reponse.json({products: getProductsCarts});
});
/**
 * This endpoint find a cart by ID
 */
router.get("/:cid", async (request, response) => {
    const cartId = request.params.cid;
    const getCart = await cart.findCartById(cartId);
    if(getCart.error){
      return response.status(404).json({status: 'error',  error: getCart.error});
    }
    response.json({cart: getCart});
})
/**
 * This endpoint create a new cart
 */
router.post("/", async (request, response) => {
    await cart.createCart();
    response.json({ message: "Producto creado satisfactoriamente"});
  });
/**
 * This endpoint add or update the product the a specific cart
 */
router.post("/:cid/product/:pid", async (request, response) => {
    let cartId = request.params.cid;
    let productId = request.params.pid;
    const { quantity } = request.body;
    const cartUpdate = await cart.updateCart(cartId, productId, quantity);
    if(cartUpdate.error){
      return response.status(404).json({status: 'error', error: cartUpdate.error});
    }
    response.json({status:'Success'});
  })
export default router