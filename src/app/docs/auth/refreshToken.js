module.exports = {
    post: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Auth"],
        description: "refreshToken",
        operationId: "refreshToken",
        parameters: [],
        responses: {
            200: {
                description: "Return accessToken!",
                schema: {
                    $ref: "#/components/schemas/authRefreshTokenResponse",
                },
            },
            401: {
                description: "Invalid refresh token",
                schema: {
                    $ref: "#/components/schemas/genericError",
                },
            }
        },
    }
}