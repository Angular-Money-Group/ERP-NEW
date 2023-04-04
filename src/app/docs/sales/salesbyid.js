module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Vendas"],
    summary: "Get sales by id",
    description: "Get sales by id",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "Sales id",
        required: true,
        type: "string",
        example: "5f9f1b9b9b9b9b9b9b9b9b9b",
      },
    ],
    responses: {
      200: {
        description: "Sales",
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
