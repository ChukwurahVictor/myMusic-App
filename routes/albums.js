const router = require('express').Router();

const Artiste = require('../models/Artiste');
const Album = require('../models/Album');
const Song = require('../models/Song');

//Associations
Album.belongsTo(Artiste, {
   foreignKey: 'ArtisteId'
});

Album.hasMany(Song, {
   foreignKey: 'AlbumId'
});

//Get all albums
router.get('/', async(req, res) => {
   try{
      const albums = await Album.findAll()
      res.send(albums)
   } catch(error) {
      console.log(error);      
      res.status(500).send(error);
   }
});

//Add a new album
router.post('/', async(req, res) => {
   try {
      const album = req.body;
      const newAlbum = await Album.create(album)
      res.status(201).send(newAlbum);
   } catch(error) {
      console.log(error);
      res.status(400).send(error);
   }
});

//Get one album
router.get('/:albumId', async(req, res) => {
   try {
      const { albumId } = req.params;
      const album = await Album.findByPk(albumId, {
         include: [Artiste]
      })
      if(album) {
         return res.send(album)
      }
      return res.status(404).send('Album with the specified ID does not exists')
   } catch(error) {
      res.status(500).send(error)
   }
});

//Update an album
router.patch('/:albumId', async(req, res) => {
   try {
      const { albumId } = req.params;
      const [ updated ] = await Album.update(req.body, {
        where: { id: albumId }
      });
      if (updated) {
        const updatedAlbum = await Song.findOne({ where: { id: albumId } });
        return res.status(200).json({ updatedAlbum });
      }
      throw new Error('Album not found');
   } catch (error) {
      return res.status(500).send(error.message);
   }
});

//Delete an album
router.delete('/:albumId', async(req, res) => {
   try {
      const { albumId } = req.params;
      const deleted = await Album.destroy({
         where: {id: albumId}});
      if(deleted) {
         return res.status(200).send('Deleted successfully')
      }
      return res.send('Album not found')
   } catch(error) {
      console.log(error)
      res.status(500).send(error)
   }
});

module.exports = router;