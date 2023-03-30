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
