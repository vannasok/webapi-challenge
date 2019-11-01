const express = require('express');
const helmet = require('helmet');
const server = express();

const actionsRouter = require('./actions/actionsRouter.js');
const projectRouter = require('./projects/projectRouter.js');

// custom middleware
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use('/actions', actionsRouter);
server.use('/projects', projectRouter);

server.get('/', (req, res) => {
   res.status(200).json({ message: 'Server is Running' });
});

function logger(req, res, next) {
   const time = new Date().toLocaleTimeString();
   const date = new Date().toLocaleDateString();
   console.log(
      `${req.method} Request | http://localhost:4000${req.url} | ${date} , ${time}`
   );
   next();
}
module.exports = server;
