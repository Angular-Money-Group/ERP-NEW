module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Get all cashiers",
    operationId: "getCashiers",
    parameters: [],
    responses: {
      200: {
        description: "Cashiers were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/getCashiersResponse",
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
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Create a cashier",
    operationId: "createCashier",
    parameters: [],
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
      201: {
        description: "Cashier created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericSuccess",
            },
          },
        },
      },
      402: {
        description: "Payment required",
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
};
