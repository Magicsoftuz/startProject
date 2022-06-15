const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

console.log('PORT:' + process.env.PORT);
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port} port...`);
});
