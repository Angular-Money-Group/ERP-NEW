module.exports = {
    get: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Employee"],
        description: "Get all employees",
        operationId: "getEmployees",
        parameters: [],
        responses: {
            200: {
                description: "Employees were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Employee",
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
                        }
                    }
                }
            },
        },
    },
    post: {
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: ["Employee"],
        description: "Create employee",
        operationId: "createEmployee",
        parameters: [],
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
            201: {
                description: "Employee created",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Employee",
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
                        }
                    }
                }
            },
        },
    },
};
