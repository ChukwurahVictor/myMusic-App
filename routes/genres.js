const router = require('express').Router();

const Genre = require('../models/Genre');
const Song = require('../models/Song');

//Associations
Genre.belongsTo(Song, {
   foreignKey: 'AlbumId'
});


//Get all genres
router.get('/', async(req, res) => {
   try{
      const genre = await Genre.findAll()
      res.send(genre)
   } catch(error) {
      console.log(error)
      res.status(500).send(error)
   }
});

//Add a new genre
router.post('/', async(req, res) => {
   try {
      const genre = req.body;
      const newGenre = await Genre.create(genre)
      res.status(201).send(newGenre);
   } catch(error) {
      console.log(error);
      res.status(400).send(error);
   }
});

//Get one genre
router.get('/:genreId', async(req, res) => {
   try {
      const { genreId } = req.params;
      const genre = await Genre.findByPk(genreId, {
         include: [Song]
      })
      if (song) {
         return res.status(200).json({ genre });
      }
      return res.status(404).send('Genre with the specified ID does not exists');
   } catch(error) {
      console.log(error);
      res.status(500).send(error)
   }
});

//Update a genre
router.patch('/:genreId', async(req, res) => {
   try {
      const { genreId } = req.params;
      const [ updated ] = await Genre.update(req.body, {
        where: { id: genreId }
      });
      if (updated) {
        const updatedGenre = await Genre.findOne({ where: { id: songId } });
        return res.status(200).json({ updatedGenre });
      }
      throw new Error('Genre not found');
   } catch (error) {
      return res.status(500).send(error.message);
   }
});

//Delete a genre
router.delete('/:genreId', async(req, res) => {
   try {
      const { genreId } = req.params;
      const deleted = await Genre.destroy({
        where: { id: genreId }
      });
      if (deleted) {
        return res.status(200).send("Genre deleted");
      }
      throw new Error("Genre not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
});

module.exports = router;