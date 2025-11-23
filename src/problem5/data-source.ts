import "reflect-metadata";
import { DataSource } from "typeorm";

import { Resource } from "./entities";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: false,
    logging: true,
    entities: [Resource],
    migrations: ["./src/problem5/migrations/*.ts"],
    subscribers: []
});
