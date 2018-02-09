const express = require("express");
const bodyParser = require("body-parser");
//const FileStore = require('session-file-store')(session)
const next = require("next");

var compression = require('compression')
import { apolloUploadExpress } from 'apollo-upload-server'

var port = process.env.NODE_ENV !== "production" ? 3000 : 80;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { schema } = require("./graphqlSchema");
//console.log('schema====')
//console.log(schema)

app.prepare().then(() => {

  const server = express();
  server.use(compression());
  //  server.use(bodyParser.json());
  //  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(
    "/graphql",
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    apolloUploadExpress(),
    graphqlExpress({ schema })
  );


  // server.use(
  //   "/graphiql",
  //   graphiqlExpress({
  //     endpointURL: "/graphql",
  //   }) 
  // );
  server.use((req, res, next) => {
    return next();
  });
  server.use(handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready  on http://localhost:${port}`);
  });
});
