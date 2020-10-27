const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err);
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App Starting...\nListening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// error from heroku when heroku process has an error
// process.on('SIGTERM', () => {
//   console.log('SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log(' Process terminated');
//   });
// });
