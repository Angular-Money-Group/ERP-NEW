import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      total: Number,
    },
  ],
  totalSell: Number,
  cpfcnpjClient: String,
  state: String,
  paymentMethods: [
    {
      method: String,
      value: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SaleModel = mongoose.model("Sale", SaleSchema);

export default SaleModel;


export interface SaleType {
  user: string;
  products: SaleProduct[];
  totalSell: number;
  cpfcnpjClient: string | null;
  state: string;
  paymentMethods: PaymentMethod[];
  createdAt: Date;
}

export interface SaleProduct {
  product: string;
  quantity: number;
  total: number;
}

export interface PaymentMethod {
  method: string;
  value: number;
}