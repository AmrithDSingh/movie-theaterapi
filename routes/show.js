const express = require('express');
const router = express.Router();

app.get("/shows", (req, res) =>{
    res.json(showsData)
});
app.get('/shows/:showId', (req, res) => {
    const showId = req.params.showId;
    const show = showsData.find(show => show.id === showId);
  
    if (!show) {
      res.status(404).send('Show not found');
    } else {
      res.json(show);
    }
  });
  app.get('/shows/genres/:genre', (req, res) => {
    const genre = req.params.genre;
    const genreShows = showsData.filter(show => show.genre === genre);
  
    res.json(genreShows);
  });
  app.put('/shows/:showId/watched', (req, res) => {
    const showId = req.params.showId;
    const rating = req.body.rating;
  
    const showIndex = showsData.findIndex(show => show.id === showId);
    if (showIndex === -1) {
      res.status(404).send('Show not found');
      return;
    }
  
    showsData[showIndex].rating = rating;
    res.json(showsData[showIndex]);
  });

module.exports = router;
