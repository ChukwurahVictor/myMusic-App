const router = require('express').Router();

const Artiste = require('../models/Artiste');
const Album = require('../models/Album');
const Song = require('../models/Song');

//Associations
Song.belongsTo(Album, {
   foreignKey: 'AlbumId'
});

Song.belongsTo(Artiste, {
   foreignKey: 'ArtisteId'
});

//Get all songs
router.get('/', async(req, res) => {
   try{
      const songs = await Song.findAll()
      res.send(songs)
   } catch(error) {
      console.log(error)
      res.status(500).send(error)
   }
});

//Add a new song
router.post('/', async(req, res) => {
   try {
      const song = req.body;
      const newSong = await Song.create(song)
      res.status(201).send(newSong);
   } catch(error) {
      console.log(error);
      res.status(400).send(error);
   }
});

//Get one song
router.get('/:songId', async(req, res) => {
   try {
      const { songId } = req.params;
      const song = await Song.findByPk(songId, {
         include: [Album, Artiste]
      })
      if (song) {
         return res.status(200).json({ song });
      }
      return res.status(404).send('Song with the specified ID does not exists');
   } catch(error) {
      console.log(error);
      res.status(500).send(error)
   }
});

//Update a song
router.patch('/:songId', async(req, res) => {
   try {
      const { songId } = req.params;
      const [ updated ] = await Song.update(req.body, {
        where: { id: songId }
      });
      if (updated) {
        const updatedSong = await Song.findOne({ where: { id: songId } });
        return res.status(200).json({ updatedSong });
      }
      throw new Error('Song not found');
   } catch (error) {
      return res.status(500).send(error.message);
   }
});

//Delete a song
router.delete('/:songId', async(req, res) => {
   try {
      const { songId } = req.params;
      const deleted = await Song.destroy({
        where: { id: songId }
      });
      if (deleted) {
        return res.status(200).send("Song deleted");
      }
      throw new Error("Song not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
});

module.exports = router;