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
            type: ["object", "string"],
          },
          name: {
            type: "string",
          },
          totalCash: {
            type: "number",
          },
          stateCashier: {
            $ref: "#/components/stateCashier",
          },
          history: {
            type: "array",
            items: {
              $ref: "#/components/history",
            },
          },
          sales: {
            type: "array",
            items: {
              $ref: "#/components/sales",
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
      genericError: {
        type: "object",
        properties: {
          message: {
            type: "string",
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
