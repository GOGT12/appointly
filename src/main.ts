import { env } from "./config/env.js";
import { buildServer } from "./server.js";

async function main() {
    const app =  buildServer();
    await app.listen({ port: env.PORT, host: "0.0.0.0"});
}

main();
