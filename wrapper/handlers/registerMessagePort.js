const registerMessagePort = (e) => {
  const port = e.ports[0];

  port.on("msg", (e) => {
    console.log(e);
  });
};

module.exports = {
  registerMessagePort: registerMessagePort,
};
