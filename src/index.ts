import { Logger } from './app/services/logger.service';
import { App } from "./app"

const port = process.env.PORT || 3000;

new App().server.listen(port, () => {
    Logger.infoLog(`Server running on port ${port}`);
});