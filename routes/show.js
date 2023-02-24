const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { showsData } = require('../data/shows');

router.get("/shows", (req, res) =>{
    res.json(showsData)
});
router.get('/shows/:showId', (req, res) => {
    const showId = req.params.showId;
    const show = showsData.find(show => show.id === showId);
  
    if (!show) {
      res.status(404).send('Show not found');
    } else {
      res.json(show);
    }
  });
  router.get('/shows/genres/:genre', (req, res) => {
    const genre = req.params.genre;
    const genreShows = showsData.filter(show => show.genre.toLowerCase() === genre.toLowerCase());

    if (shows.length > 0) {
      res.json(shows);
    } else {
      res.status(404).send("No shows found for that genre");
    }
  });
  router.put("/:id/watched", (req, res) => {
    const id = req.params.id;
    const rating = req.body.rating;
    const show = showsData.find((show) => show.id == id);
  
    if (show) {
      if (rating >= 0 && rating <= 5) {
        show.rating = rating;
        res.send(`Rating for ${show.title} updated to ${rating}`);
      } else {
        res.status(400).send("Invalid rating value. Must be between 0 and 5");
      }
    } else {
      res.status(404).send("Show not found");
    }
  });
  router.put("/:id/updates", (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const show = showsData.find((show) => show.id == id);
  
    if (show) {
      if (status && status.trim().length >= 5 && status.trim().length <= 25) {
        show.status = status.trim();
        res.send(`Status for ${show.title} updated to ${show.status}`);
      } else {
        res.status(400).send("Invalid status value. Must be between 5 and 25 characters and cannot be empty or contain whitespace");
      }
    } else {
      res.status(404).send("Show not found");
    }
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = showsData.findIndex((show) => show.id == id);
  
    if (index !== -1) {
      showsData.splice(index, 1);
      res.send(`Show with id ${id} deleted`);
    } else {
      res.status(404).send("Show not found");
    }
  });

module.exports = router;
