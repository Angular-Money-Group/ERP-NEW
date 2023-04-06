module.exports = {
    get: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Employee"],
        description: "Get employee by id",
        operationId: "getEmployeeById",
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
                description: "Employee was obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Employee",
                        },
                    },
                },
            },
            404: {
                description: "Employee not found",
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
    put: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Employee"],
        description: "Update employee by id",
        operationId: "updateEmployeeById",
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
                        $ref: "#/components/schemas/Employee",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Employee was updated",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Employee",
                        },
                    },
                },
            },

            404: {
                description: "Employee not found",
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
        tags: ["Employee"],
        description: "Delete employee by id",
        operationId: "deleteEmployeeById",
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
                description: "Employee was deleted",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericSuccess",
                        },
                    },
                },
            },
            404: {
                description: "Employee not found",
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
}