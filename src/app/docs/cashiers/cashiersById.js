module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Get cashier by id",
    operationId: "getCashierById",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Cashier id",
      },
    ],
    responses: {
      200: {
        description: "Cashier was obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/cashiers",
            },
          },
        },
      },
      404: {
        description: "Cashier not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
    },
  },
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Create a cashier",
    operationId: "updateCashier",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Cashier id",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/cashiers",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Operation success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericSuccess",
            },
          },
        },
      },
      422: {
        description: "Cashier not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
    },
  },
  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Delete a cashier",
    operationId: "deleteCashier",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Cashier id",
      },
    ],
    responses: {
      200: {
        description: "Operation success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericSuccess",
            },
          },
        },
      },
      404: {
        description: "Error on delete item",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/shemas/genericError",
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
    },
  },
};
