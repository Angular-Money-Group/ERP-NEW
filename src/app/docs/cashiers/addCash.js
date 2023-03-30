module.exports = {
    post: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Caixas"],
        description: "Add cash a cashier",
        operationId: "addCashier",
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "Cashier id",
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addCash",
                    },
                }
            }
        },
        responses: {
            200: {
                description: "Cashiers were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericSuccess",
                        },
                    },
                },
            },
            500: {
                description: "Server error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
                        },
                    },
                },
            },
        },
    }
}