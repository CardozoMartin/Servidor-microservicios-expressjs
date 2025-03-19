import { Schema, Document, model } from 'mongoose'

export interface IProduct extends Document {
    name: string,
    price: number,
    status: boolean,
    category: string,
}

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true,

    },
    category: {
        type: String,
        require: true
    }

})

export default model<IProduct>('product', productSchema)