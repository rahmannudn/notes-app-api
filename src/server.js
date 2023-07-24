const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async function () {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`server is running in ${server.info.uri}`);
};

init();
