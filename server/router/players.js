const { default: mongoose } = require("mongoose");

const router = require("express").Router();
//Model
const Player = mongoose.model('Player', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  submitDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
}))
// Ping backend
router.get('/ping', (req, res) => {
  try {
    res.status(200).send('Pinged!')
  } catch (error) {
    res.status(500).send('Ping failed: '+error.message)
  }
})

// Get Players
router.get('/', async(req, res) => {
  try {
    const players = await Player.find().sort({submitDate: -1}).limit(4);
    res.json(players);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// Add player
router.post('/', async(req, res) => {

  const player = new Player({
    name: req.body.name
  })

  try {
    await player.save();
    res.send("Post Successful!")
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }

})

module.exports = router;