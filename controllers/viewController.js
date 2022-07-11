const getAllTours = (req, res) => {
  res.status(200).render('overview', {
    title: 'All tours',
  });
};

const getOneTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'This Tashkent City',
  });
};

module.exports = { getAllTours, getOneTour };
