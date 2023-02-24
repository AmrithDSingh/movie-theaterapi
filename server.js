const express = require('express');
const userRouter = require('./routes/user');
const showRouter = require('./routes/show');

const app = express();

app.use('/users', userRouter);

app.use('/shows', showRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
const bodyParser = require('body-parser');
const usersData = require('./users.json').usersData;
const showsData = require('./shows.json').showsData;
const port = 3000;
app.use(bodyParser.json());

