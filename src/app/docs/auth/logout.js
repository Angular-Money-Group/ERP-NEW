module.exports = {
  get: {
    tags: ["Auth"],
    description: "Logout",
    operationId: "logout",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Usuario deslogado com sucesso!",
      },
      401: {
        description: "Usuario não autorizado",
        schema: {
            $ref: "#/components/schemas/genericError",
        },
      },
    },
  }
};
  