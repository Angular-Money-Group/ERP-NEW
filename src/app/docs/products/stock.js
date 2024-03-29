module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"], // operation's tag.
    description: "Exportar produtos", // operation's desc.
    operationId: "exportProducts", // unique operation id.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Exporta produtos", // response desc.
        content: {
          // content-type
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            schema: {
              type: "string",
              format: "binary",
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
    tags: ["Produtos"], // operation's tag.
    description: "Importar produtos", // operation's desc.
    operationId: "importProducts", // unique operation id.
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              file: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Importa produtos", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericResponse", // id model
            },
          },
        },
      },
    },
  },
};
