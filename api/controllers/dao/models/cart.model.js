import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    products:{
        type: Array,
        default: []
    }
})


export const cartModel = mongoose.model(cartCollection, cartSchema);