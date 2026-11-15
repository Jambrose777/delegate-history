import { createApp } from './app.js';
import { config } from './config.js';
import { createDatabase } from './database/client.js';
function main(): void {
  const connection = createDatabase(config.databaseFile);
  const app = createApp({
    database: connection.database,
    frontendOrigin: config.frontendOrigin,
  });
  const server = app.listen(config.port, config.host, () => {
    console.log(`Backend listening at http://${config.host}:${config.port}`);
  });

  let isShuttingDown = false;
  function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;

    // Let in-flight HTTP requests finish before closing the database.
    server.close(() => {
      connection.close();
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

try {
  main();
} catch (error) {
  console.error('Failed to start the backend:', error);
  process.exitCode = 1;
}
