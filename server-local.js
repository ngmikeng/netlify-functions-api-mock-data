const app = require('./serverless/server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Working on port ' + PORT);
});
