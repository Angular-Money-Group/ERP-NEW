module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Dashboard"],
    description: "Get dashboard",
    operationId: "getDashboard",
    parameters: [],
    query: {
      type: "object",
      properties: {
        startDate: {
          type: "string",
          description: "Start date",
          example: "2020-01-01",
        },
        endDate: {
          type: "string",
          description: "End date",
          example: "2020-01-31",
        },
      },
    },
    responses: {
      200: {
        description: "Dashboard",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/dashboard",
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
            },
          },
        },
      },
      500: {
        description: "Internal server error",
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
