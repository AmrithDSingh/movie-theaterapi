const { body, validationResult } = require('express-validator');
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRouter);
app.use('/shows', showRouter);

// Use the express-validator middleware
showRouter.use('/:id/updates', [
  body('status')
    .trim()
    .notEmpty().withMessage('Status field cannot be empty')
    .isLength({ min: 5, max: 25 }).withMessage('Status field must have a minimum length of 5 and a maximum length of 25 characters')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  });