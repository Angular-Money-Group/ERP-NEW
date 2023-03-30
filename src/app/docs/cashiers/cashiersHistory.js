module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Caixas"],
    description: "Get all cashiers",
    operationId: "getHistoryCashiers",
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
        description: "Cashiers were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericSuccess",
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
