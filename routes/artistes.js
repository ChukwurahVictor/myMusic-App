const router = require('express').Router();

const Artiste = require('../models/Artiste');
const Album = require('../models/Album');
const Song = require('../models/Song');

//Associations
Artiste.hasMany(Album, {
   foreignKey: 'ArtisteId'
 });
 
 Artiste.hasMany(Song, {
   foreignKey: 'ArtisteId'
 });

//Get all artistes
router.get('/', async(req, res) => {
   try{
      const artistes = await Artiste.findAll()
      res.send(artistes)
   } catch(error) {
      res.status(500).send(error)
   }
});

//Add a new artiste
router.post('/', async(req, res) => {
   try {
      const artiste = req.body;
      const newArtiste = await Artiste.create(artiste)
      res.status(201).send(newArtiste);
   } catch(error) {
      console.log(error);
      res.status(400).send(error);
   }
});

//Get one artiste
router.get('/:artisteId', async(req, res) => {
   try {
      const { artisteId } = req.params;
      const artiste = await Artiste.findByPk(artisteId, {
         include: [Album, Song] 
      })
      if(artiste) {
         return res.send(artiste)
      }
      return res.send('Artiste with the specified ID does not exist')
   } catch(error) {
      res.status(500).send(error)
   }
});

//Update a artiste
router.patch('/:artisteId', async(req, res) => {
   try {
      const { artisteId } = req.params;
      const [ updated ] = await Artiste.update(req.body, {
        where: { id: artisteId }
      });
      if (updated) {
        const updatedArtiste = await Artiste.findOne({ where: { id: artisteId } });
        return res.status(200).json({ updatedArtiste });
      }
      throw new Error('Artiste not found');
   } catch (error) {
      return res.status(500).send(error.message);
   }
});

//Delete a artiste
router.delete('/:artisteId', async(req, res) => {
   try {
      const { artisteId } = req.params;
      const deleted = await Artiste.destroy({
        where: { id: artisteId }
      });
      if (deleted) {
        return res.status(200).send("Artiste deleted");
      }
      throw new Error("Artiste not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
});

module.exports = router;