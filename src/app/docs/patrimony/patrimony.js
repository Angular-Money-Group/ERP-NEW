module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Patrimônio"],
    description: "Retorna todos os Patrimônios",
    operationId: "getPatrimonys",
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
        description: "Lista de Patrimônios",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Patrimonys",
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
    tags: ["Patrimônio"],
    description: "Cria um novo Patrimônio",
    operationId: "createPatrimony",
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
        description: "Patrimônio criado com sucesso",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Patrimonys",
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
