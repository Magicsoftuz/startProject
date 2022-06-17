const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.PASSWORD
).replace('<username>', process.env.LOGIN);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

app.listen(+process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Server running on port...`);
});
