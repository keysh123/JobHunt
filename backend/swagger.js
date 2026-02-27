
import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
// const routes = ['./path/userRoutes.js', './path/bookRoutes.js'];
const routes = ['./routes/user.route.js', './routes/company.route.js', './routes/job.route.js', './routes/application.route.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);