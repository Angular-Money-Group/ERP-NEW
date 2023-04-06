module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Clients"],
    summary: "Get all clients",
    description: "Get all clients",
    responses: {
      200: {
        description: "Clients obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Clients",
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
    tags: ["Clients"],
    description: "Create a new client",
    operationId: "createClient",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Client",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Client created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Client",
            },
          },
        },
      },
      400: {
        description: "Invalid client",
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
