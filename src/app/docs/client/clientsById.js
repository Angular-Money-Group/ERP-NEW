module.exports = {
    get: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Clients"],
        summary: "Get all clients",
        description: "Get all clients",
        parameters: [
            {
                name: "id",
                in: "path",
                type: "string",
                required: true,
                description: "Employee id",
            },
        ],
        responses: {
            200: {
                description: "Clients obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Clients",
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
    },
    put: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Clients"],
        description: "Create a new client",
        operationId: "createClient",
        parameters: [
            {
                name: "id",
                in: "path",
                type: "string",
                required: true,
                description: "Employee id",
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Client",
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Client created",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Client",
                        },
                    },
                },
            },
            400: {
                description: "Invalid client",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
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
    },
    delete: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Clients"],
        description: "Delete a client",
        operationId: "deleteClient",
        parameters: [
            {
                name: "id",
                in: "path",
                type: "string",
                required: true,
                description: "Employee id",
            },
        ],
        responses: {
            200: {
                description: "Client deleted",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericSuccess",
                        },
                    },
                },
            },
            404: {
                description: "Invalid client",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
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
    },
};
