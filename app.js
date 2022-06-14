const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'This server is working!',
    data: 'Bu yerda json chiqishi kerak edi',
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port} port...`);
});
