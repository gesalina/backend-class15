import { productModel } from "./models/product.model.js";
/**
* This class handle everything about our products
*/
class ProductManager {
    constructor(){
        this.error = "";
    }
    /**
    * This function get all the product from our collection
    */
    getProducts = async (/**req,res*/) => {
        /**
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const query = req.query.query || {};

        const filter = {};

        if(query.category) filter.category = query.category;
        if(query.availability) filter.availability = query.availibility;

        const options = {
            page,
            limit,
            sort: {price: sort},
            lean: true
        }

        const products = await productModel.paginate(filter, options);
        */
        
        const products = await productModel.find().lean();
        return products;
    };
    /**
    * This function find a product by ID
    */
    findProductById = async (productId) => {
        const product = await productModel.find({id: productId});
        if(!product || product <= 0){
            return this.error = {error:'Product not found'}
        }
        return product
    }
    /**
    * This function generate new id in each new product inserted
    */
    generateId = async() => {
        const getProductsId = await this.getProducts();
        return getProductsId.length === 0 ? 1 : getProductsId.at(-1).id + 1;
    }
    
    createProduct = async(product) => {
        const result = await productModel.create({id: await this.generateId(),...product,status: true});
        return result
    }
    deleteProduct = async(productId) => {
        const result = await productModel.findOneAndDelete({id: productId});
        if(!result || result <= 0){
            return this.error = {error: 'Product not found'}
        }
        return result;
    }
    updateProduct = async(productId, data) => {
        const result = await productModel.findOneAndUpdate({id: productId}, data);
        if(!result || result <= 0){
            return this.error = {error: `Cant update a inexistent ID`}
        }
        return result;
    }
}

export default ProductManager;
