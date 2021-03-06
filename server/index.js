const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

let config = require("../nuxt.config");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listen on http://${host}:${port}`,
    badge: true
  })
}
start()
