const router = require('express').Router();
const MockTimeSeries = require('../../lib/mockTimeSeries');

router.get('/', function (req, res) {
  res.end('mock data api');
});

router.get('/mock-time-series', function (req, res) {
  const mockTimeSeries = new MockTimeSeries();
  const numberOfMapping = 5;
  let mockSerriesData = [];
  const dataMapping = ['dt'];
  const from = req.query.from;
  const until = req.query.until;
  const interval = req.query.interval * 1;
  for (let index = 0; index < numberOfMapping; index++) {
    const mockData = mockTimeSeries.sampleData({ methodType: 'gaussian', from, until, interval });
    mockSerriesData.push(mockData);
    // add mapping
    dataMapping.push(`m${index}`);
  }
  const dataSeries = mockSerriesData[0].map((data, objIndex) => {
    const arrItem = [data.timestamp, data.value];
    for (let index = 1; index < mockSerriesData.length; index++) {
      arrItem.push(mockSerriesData[index][objIndex].value);
    }
    return arrItem;
  });
  res.json({
    data: dataSeries,
    map: dataMapping
  });
});

module.exports = router;
