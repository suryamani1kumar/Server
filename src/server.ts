import cluster from "cluster";
import os from "os";
import app from "./app";
import { config } from "./config/config";

const numberOfCUP = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < numberOfCUP; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.listen(config.PORT, () => {
    console.log(
      `[Worker ${process.pid}]: Server is running at http://localhost:${config.PORT}`
    );
  });
}
