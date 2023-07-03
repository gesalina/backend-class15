import {cartModel} from './models/cart.model.js'

class cartManager {
    constructor() {
      this.error = "";
    }
    /**
     * Get the products
     */
    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    };
    /**
     * Get the products by ID
     */
    findCartById = async (cartId) => {
        const cart = await cartModel.find({id: cartId});
        if(!cart || cart <= 0){
            return this.error = {error:'Cart not found'}
        }
        return cart
    };
    /**
     * Create a new product
     */
    createCart = async () => {
      const generateId = await this.createtId();
      const result = await cartModel.create({id: generateId});
      return result
    };
    /**
     * Get the products of a cart
     */
    getCartProduct = async (cartId) => {
      const cartProducts = await cartModel.findOne({id: cartId}).lean();
      const products = cartProducts.products;
      if(!cartProducts || cartProducts.products <= 0) return this.error = {error:'This cart dont have products'}
      return products
    };
    /**
     * Create a UNIQUE ID for each product
     */
    createtId = async() => {
        const getCartId = await this.getCarts();
        return getCartId.length === 0 ? 1 : getCartId.at(-1).id + 1;
    }
    /**
     * Add a new product to the cart, if this exist, increase the quantity
     */
    updateCart = async (cartId, productId, quantity) => {
      let cart = await cartModel.findOne({id: cartId});
      let search = cart.products.find((products) => products.product === productId);
      if(isNaN(productId) || isNaN(quantity)) return this.error = { error: 'The product or the quantity need be a number'};
      productId = parseInt(productId);
      if(cart && !search){
          cart.products.push({product: productId, quantity: quantity});
          return await cartModel.updateOne({cartId}, cart);
            } else {
          return cartModel.updateOne({id:cartId, 'products.product': productId},{$inc: {"products.$.quantity": quantity}});
        }
    };
  }
  export default cartManager;