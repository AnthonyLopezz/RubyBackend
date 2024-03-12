import { envs } from "./config/envs";
import { AppRoutes } from "./routes/routes";
import { Server } from "./settings/Server";
import { MongoDatabase } from "./settings/connection/mongo-db";

(() => {
  main();
})();

async function main() {

  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  });

  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
