const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from Middelware');
  next();
});

app.use((req, res, next) => {
  req.time = '12.04.2022';
  next();
});
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'This server is working!',
//     data: 'Bu yerda json chiqishi kerak edi',
//   });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    getDate: req.time,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const addTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'Information not found',
      message: `invalid ${id} id`,
    });
  }
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Information updated',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port} port...`);
});
