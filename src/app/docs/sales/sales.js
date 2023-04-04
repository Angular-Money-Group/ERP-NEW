module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Vendas"],
    summary: "Get sales",
    description: "Get sales",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              day: {
                type: "string",
                description: "Day of the month",
                example: "01-12-2020",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Sales",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "string",
                  description: "User",
                  example: "John Doe",
                },
                products: {
                  type: "array",
                  description: "Products",
                  items: {
                    type: "object",
                    properties: {
                      product: {
                        type: "string",
                        description: "Product",
                        example: "Product 1",
                      },
                      quantity: {
                        type: "number",
                        description: "Quantity",
                        example: 1,
                      },
                      total: {
                        type: "number",
                        description: "Total",
                        example: 100,
                      },
                    },
                  },
                },
                totalSell: {
                  type: "number",
                  description: "Total sell",
                  example: 100,
                },
                cpfCnpjClient: {
                  type: "string",
                  description: "CPF/CNPJ Client",
                  example: "12345678910",
                },
                state: {
                  type: "string",
                  description: "Estado",
                  example: "Open",
                },
                paymentMethods: {
                  type: "array",
                  description: "Payment methods",
                  items: {
                    type: "object",
                    properties: {
                      method: {
                        type: "string",
                        description: "Method",
                        example: "Dinheiro",
                      },
                      value: {
                        type: "number",
                        description: "Value",
                        example: 100,
                      },
                    },
                  },
                },
                createdAt: {
                  type: "date",
                  description: "Created at",
                  example: "2020-12-01T00:00:00.000Z",
                },
              },
            },
          },
        },
      },
    },
  },
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Vendas"],
    summary: "Create sale",
    description: "Create sale",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              products: {
                type: "array",
                description: "Products",
                items: {
                  type: "object",
                  properties: {
                    product: {
                      type: "string",
                      description: "Product",
                      example: "Product 1",
                    },
                    quantity: {
                      type: "number",
                      description: "Quantity",
                      example: 1,
                    },
                    total: {
                      type: "number",
                      description: "Total",
                      example: 100,
                    },
                  },
                },
              },
              totalSell: {
                type: "number",
                description: "Total sell",
                example: 100,
              },
              cpfCnpjClient: {
                type: "string",
                description: "CPF/CNPJ Client",
                example: "12345678910",
              },
              paymentMethods: {
                type: "array",
                description: "Payment methods",
                items: {
                  type: "object",
                  properties: {
                    method: {
                      type: "string",
                      description: "Method",
                      example: "Dinheiro",
                    },
                    value: {
                      type: "number",
                      description: "Value",
                      example: 100,
                    },
                  },
                },
              },
              cashierID: {
                type: "string",
                description: "Cashier ID",
                example: "5fcf9b9b9b9b9b9b9b9b9b9b",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Sales",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "string",
                  description: "User",
                  example: "John Doe",
                },
                products: {
                  type: "array",
                  description: "Products",
                  items: {
                    type: "object",
                    properties: {
                      product: {
                        type: "string",
                        description: "Product",
                        example: "Product 1",
                      },
                      quantity: {
                        type: "number",
                        description: "Quantity",
                        example: 1,
                      },
                      total: {
                        type: "number",
                        description: "Total",
                        example: 100,
                      },
                    },
                  },
                },
                totalSell: {
                  type: "number",
                  description: "Total sell",
                  example: 100,
                },
                cpfCnpjClient: {
                  type: "string",
                  description: "CPF/CNPJ Client",
                  example: "12345678910",
                },
                state: {
                  type: "string",
                  description: "Estado",
                  example: "Open",
                },
                paymentMethods: {
                  type: "array",
                  description: "Payment methods",
                  items: {
                    type: "object",
                    properties: {
                      method: {
                        type: "string",
                        description: "Method",
                        example: "Dinheiro",
                      },
                      value: {
                        type: "number",
                        description: "Value",
                        example: 100,
                      },
                    },
                  },
                },
                createdAt: {
                  type: "date",
                  description: "Created at",
                  example: "2020-12-01T00:00:00.000Z",
                },
              },
            },
          },
        },
      },
    },
  },
};
