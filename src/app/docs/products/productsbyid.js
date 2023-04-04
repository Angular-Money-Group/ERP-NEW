module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"],
    description: "Retorna todos os produtos",
    operationId: "getProducts",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do produto",
        required: true,
        schema: {
          type: "integer",
          format: "int64",
        },
      },
    ],
    responses: {
      200: {
        description: "Lista de produtos",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/products",
            },
          },
        },
      },
    },
    401: {
      description: "Não autorizado",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/genericError",
          },
        },
      },
    },
    500: {
      description: "Erro interno do servidor",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/genericError",
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
    tags: ["Produtos"],
    description: "Atualiza um produto",
    operationId: "updateProduct",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do produto",
        required: true,
        schema: {
          type: "integer",
          format: "int64",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              name: {
                type: "string",
              },
              priceCost: {
                type: "number",
              },
              priceSell: {
                type: "number",
              },
              barCode: {
                type: "string",
              },
              description: {
                type: "string",
              },
              category: {
                type: "string",
              },
              moveStock: {
                type: "number",
              },
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
    tags: ["Produtos"],
    description: "Deleta um produto",
    operationId: "deleteProduct",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do produto",
        required: true,
        schema: {
          type: "integer",
          format: "int64",
        },
      },
    ],
    responses: {
      200: {
        description: "Produto deletado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericSuccess",
            },
          },
        },
      },
      422: {
        description: "Erro de validação",
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
