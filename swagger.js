const swaggerAutogen = require('swagger-autogen')();


const doc = {
  info: {
    title: 'My API',
    description: 'This API allows you to manage tasks in a task management system. You can perform CRUD (Create, Read, Update, Delete) operations on tasks'
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth', './routes/task'];


swaggerAutogen(outputFile, routes, doc);