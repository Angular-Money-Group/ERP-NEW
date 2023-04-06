module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      genericError: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      createUserRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          cpfCnpj: {
            type: "string",
          },
          role: {
            type: "string",
          },
        },
      },
      loginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      authLoginResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
      },
      authRefreshTokenResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
      },
      getCashiersResponse: {
        type: "object",
        properties: {
          cashiers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                user: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                totalCash: {
                  type: "number",
                  example: 0,
                },
                stateCashier: {
                  type: "object",
                  properties: {
                    state: {
                      type: "string",
                    },
                    ip: {
                      type: "string",
                    },
                  },
                },
                history: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "60d0b5b5b5b5b5b5b5b5b5b5",
                      },
                      operation: {
                        type: "string",
                        example: "open",
                      },
                      value: {
                        type: "number",
                        example: 0,
                      },
                      ip: {
                        type: "string",
                      },
                      date: {
                        type: "date",
                        example: "2021-03-01T00:00:00.000Z",
                      },
                    },
                  },
                },
                sales: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "11111111111",
                      },
                      client: {
                        type: "string",
                        example: "60d0b5b5b5b5b5b5b5b5b5b5",
                      },
                      sele: {
                        type: "string",
                        example: "60d0b5b5b5b5b5b5b5b5b5b5",
                      },
                      date: {
                        type: "date",
                        example: "2021-03-01T00:00:00.000Z",
                      },
                    },
                  },
                },

                createdAt: {
                  type: "string",
                  example: "2021-03-01T00:00:00.000Z",
                },
                updatedAt: {
                  type: "date",
                  example: "2021-03-01T00:00:00.000Z",
                },
              },
            },
          },
        },
      },
      stateCashier: {
        type: "object",
        properties: {
          state: {
            type: "string",
          },
          ip: {
            type: "string",
          },
        },
      },
      history: {
        type: "object",
        properties: {
          user: {
            type: "string",
          },
          operation: {
            type: "string",
          },
          value: {
            type: "number",
          },
          ip: {
            type: "string",
          },
          date: {
            type: "string",
            format: "date-time",
          },
        },
      },
      sales: {
        type: "object",
        properties: {
          client: {
            type: "string",
          },
          sele: {
            type: "string",
          },
          date: {
            type: "string",
            format: "date-time",
          },
        },
      },
      cashiers: {
        type: "object",
        properties: {
          user: {
            type: "string",
          },
          name: {
            type: "string",
          },
          totalCash: {
            type: "number",
          },
          stateCashier: {
            type: "object",
            properties: {
              state: {
                type: "string",
              },
              ip: {
                type: "string",
              },
            },
          },
          history: {
            type: "array",
            items: {
              type: "object",
              properties: {
                user: {
                  type: "string",
                },
                operation: {
                  type: "string",
                },
                value: {
                  type: "number",
                },
                ip: {
                  type: "string",
                },
                date: {
                  type: "string",
                  format: "date-time",
                },
              },
            },
          },
          sales: {
            type: "array",
            items: {
              type: "object",
              properties: {},
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      closeCashier: {
        type: "object",
        properties: {
          totalCash: {
            type: "number",
          },
        },
      },
      addCash: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      dashboard: {
        type: "object",
        properties: {
          totalSell: {
            type: "object",
            properties: {
              allDays: {
                type: "number",
                example: 30,
              },
              days: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    day: {
                      type: "number",
                      example: 1,
                    },
                    value: {
                      type: "number",
                      example: 0,
                    },
                  },
                },
              },
            },
          },
          totalStock: {
            type: "number",
            example: 0,
          },
          totalPatrimony: {
            type: "number",
            example: 0,
          },
        },
      },
      products: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Identificador do produto",
            example: "5f9f1b9b9c9d440000a1b1b1",
          },
          name: {
            type: "string",
            description: "Nome do produto",
            example: "Coca-cola",
          },
          priceCost: {
            type: "number",
            description: "Preço de custo do produto",
            example: 2.5,
          },
          priceSell: {
            type: "number",
            description: "Preço de venda do produto",
            example: 3.5,
          },
          barCode: {
            type: "string",
            description: "Código de barras do produto",
            example: "7891234567890",
          },
          category: {
            type: "string",
            description: "Categoria do produto",
            example: "Bebidas",
          },
          description: {
            type: "string",
            description: "Descrição do produto",
            example: "Refrigerante de cola",
          },
          createdAt: {
            type: "string",
            description: "Data de criação do produto",
            example: "2020-10-30T18:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            description: "Data de atualização do produto",
            example: "2020-10-30T18:00:00.000Z",
          },
        },
      },
      Employee: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome do funcionário",
            example: "João da Silva",
          },
          email: {
            type: "string",
            description: "Email do funcionário",
            example: "teste@teste.com",
          },
          password: {
            type: "string",
            description: "Senha do funcionário",
            example: "123456",
          },
          cpf: {
            type: "string",
            description: "CPF do funcionário",
            example: "12345678910",
          },
          isTemporary: {
            type: "boolean",
            description: "Se o funcionário tem senha temporária",
            example: false,
          },
          role: {
            type: "string",
            description: "Cargo do funcionário",
            example: "employee",
          },
          createdAt: {
            type: "string",
            description: "Data de criação do funcionário",
            example: "2020-10-30T18:00:00.000Z",
          },
        },
      },

      genericSuccess: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
