const express = require('express');
const router = express.Router();

app.get('/users', (req, res) => {
    res.json(usersData);
  });
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = usersData.find(user => user.id === userId);
  
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  });
  app.get('/users/:userId/shows', (req, res) => {
    const userId = req.params.userId;
    const userShows = showsData.filter(show => show.userId === userId);
  
    res.json(userShows);
  });
  app.put('/users/:userId/shows/:showId', (req, res) => {
    const userId = req.params.userId;
    const showId = req.params.showId;
    const showData = req.body;
    const userIndex = usersData.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.status(404).send('User not found');
    return;
  } 
  const showIndex = showsData.findIndex(show => show.id === showId);
  if (showIndex === -1) {
    res.status(404).send('Show not found');
    return;
  }
  const userShows = usersData[userIndex].shows;
  const userShowIndex = userShows.findIndex(show => show.id === showId);
  if (userShowIndex === -1) {
    userShows.push({ id: showId, ...showData });
  } else {
    userShows[userShowIndex] = { id: showId, ...showData };
  }

  res.json(usersData[userIndex]);
});

module.exports = router;
