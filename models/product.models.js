import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plz enter product name"],
    },
    quantity: {
      type: Number,
      required: [true, "Plz enter product quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Plz enter product price"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product
