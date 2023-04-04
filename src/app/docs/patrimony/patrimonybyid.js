module.exports = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ["Patrimônio"],
    description: "Retorna todos os Patrimônio",
    operationId: "getPatrimonyByID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do Patrimonio",
        required: true,
        schema: {
          type: "integer",
          format: "int64",
        },
      },
    ],
    responses: {
      200: {
        description: "Lista de Patrimônio",
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
    tags: ["Patrimônio"],
    description: "Atualiza um Patrimonio",
    operationId: "updatePatrimony",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do Patrimonio",
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
              observation: {
                type: "string",
                description: "Observação do Patrimonio",
              },
              isActive: {
                type: "boolean",
                description: "Status do Patrimonio",
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
    tags: ["Patrimônio"],
    description: "Deleta um Patrimonio",
    operationId: "deleteProduct",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do Patrimonio",
        required: true,
        schema: {
          type: "integer",
          format: "int64",
        },
      },
    ],
    responses: {
      200: {
        description: "Patrimonio deletado",
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
