import getApp from "./server/app";

(async () => {
  const host = process.env.HOST;
  const port = process.env.PORT || 3001;
  const app = await getApp();

  try {
    await app.listen({ port: port as any, host: host as any });
    console.log(`App running on http://localhost:${port}/`);
    if (process.send) {
      process.send("Ready");
    }
  } catch (err) {
    console.error("Failure during startup!", err);
    process.exit(1);
  }
})();
