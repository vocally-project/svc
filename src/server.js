import express from "express";
import cors from "cors";

import { createUser, getAllUser } from "./controller";
import validate, { createUserConfig } from "./validationHandle";

class Server {
    constructor(config) {
        this.app = express();
        this.config = config;
    }

    initializeBodyParser() {
        const { app } = this;
        app.use(express.json());
    };

    setupRoute() {
        this.app.use(cors())
        this.app.use("/health-check", (req, res) => {
            res.send("I am all okay...!!!")
        });

        this.app.post('/create-user', validate(createUserConfig), createUser);
        this.app.get('/users', getAllUser);
    };

    run() {
        const { app, config: { port } } = this;
        const errorMessage = "Error Encountered";
        const successMessage = `| App listening on port ${port} |`;

         app.listen(port, err => {
                    if (err) {
                        console.log("~".repeat(errorMessage.length));
                        console.log(errorMessage.length);
                        console.log("~".repeat(errorMessage.length));
                    }
                    console.log("~".repeat(successMessage.length));
                    console.log(successMessage);
                    console.log("~".repeat(successMessage.length));
        })
    };
};

export default Server;