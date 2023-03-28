import { Cashier } from "./../models/cashiersSchema.model";
import CashierModel from "./../models/cashiersSchema.model";

export const createCashier = (user: string) => {

};

export const cashierMock: Cashier[] = [
  {
    user: "",
    name: "Caixa 1",
    totalCash: 0,
    stateCashier: {
      state: "Fechado",
      ip: "",
    },
    history: [],
    sales: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: "",
    name: "Caixa 2",
    totalCash: 0,
    stateCashier: {
      state: "Fechado",
      ip: "",
    },
    history: [],
    sales: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user: "",
    name: "Caixa 3",
    totalCash: 0,
    stateCashier: {
      state: "Fechado",
      ip: "",
    },
    history: [],
    sales: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
