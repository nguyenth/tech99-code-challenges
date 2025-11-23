
import express, { Application } from 'express'
import compression from 'compression'
import * as dotenv from 'dotenv';

import { errorHandler } from './middlewares'
import resource from './modules/resources/resource.api'
import { AppDataSource } from './data-source'

function main() {
    dotenv.config();

    const app: Application = express();
    const PORT: number = parseInt(process.env.PORT || '0');

    app.use(compression())
    app.use(express.json())

    // begin of route section
    app.use('/resources', [resource])
    // add more router here

    // end of route section

    app.use(errorHandler)

    AppDataSource.initialize()
        .then(() => {
            console.log("📦 Data Source has been initialized!");
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
}

main()