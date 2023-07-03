import { productModel } from "./models/product.model.js";

class ProductManager {
    constructor(){
        this.error = "";
    }
    getProducts = async () => {
        const products = await productModel.find().lean();
        return products;
    };
    findProductById = async (productId) => {
        const product = await productModel.find({id: productId});
        if(!product || product <= 0){
            return this.error = {error:'Product not found'}
        }
        return product
    }
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