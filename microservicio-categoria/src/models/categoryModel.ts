import { Schema, Document, model } from 'mongoose';


export interface Icategory extends Document {
    name: string;
}

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

export default model<Icategory>('category', categorySchema);