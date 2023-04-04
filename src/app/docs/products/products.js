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
    queryParams: {
      type: "object",
      properties: {
        page: {
          type: "integer",
          description: "Número da página",
        },
        limit: {
          type: "integer",
          description: "Limite de itens por página",
        },
        filter: {
          type: "string",
          description: "Filtro de pesquisa",
        },
      },
    },
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
  post: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Produtos"],
    description: "Cria um novo produto",
    operationId: "createProduct",
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
              initialStock: {
                type: "number",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Produto criado com sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/products",
            },
          },
        },
      },
      400: {
        description: "Erro de validação",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/genericError",
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
  },
};
