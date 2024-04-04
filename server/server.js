const express = require('express');

const cors = require('cors');
const createError = require('http-errors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //ROUTES PREFIX
    this.ocPath = '/api/oc';


    this.middleware();
    //Rutas de mi aplicación
    this.routes();
    //Handlers
    this.handlers();
  }
  handlers() {

    this.app.use((req, res, next) => {
      next(createError.NotFound());
    });

    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        status: err.status || 500,
        message: err.message,
      });
    });
  }
  middleware() {
    this.app.use(cors())
    //Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false
    }));
    //Morgan
    // this.app.use(morgan('dev'));
    //Public
    this.app.use(express.static('public'));
  }
  routes() {
    this.app.use(this.ocPath, require('../routes/oc.route'))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Api ejecutandose en puerto ', this.port)
    })
  }
}

module.exports = Server