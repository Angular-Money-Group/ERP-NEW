import mongoose from "mongoose";

const cashiersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  totalCash: Number,
  stateCashier: { state: String, ip: String },
  history: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" || "Employee",
      },
      operation: String,
      value: Number,
      ip: String,
      date: Date,
    },
  ],
  sales: [
    {
      client: String,
      sele: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
      },
      date: Date,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model("Cashier", cashiersSchema);

export interface Cashier {
  user: Object | string;
  name: string;
  totalCash: number;
  stateCashier: StateCashier
  history: History[];
  sales: Sales[];
  createdAt: Date;
  updatedAt: Date;
}

export interface History {
  user: string;
  operation: string;
  value: number;
  ip: string;
  date: Date;
}

export interface Sales  {
    client: string;
    sele: string;
    date: Date;
  }

export interface StateCashier {
    state: string;
    ip: string;
    }

