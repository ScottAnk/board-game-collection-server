const express = require('express')
const BoardGame = require('../models/boardgame')

const router = express.Router()

//INDEX
router.get('/', (req, res, next) => {
  BoardGame.find()
    .then((boardGames) => {
      res.status(200).json({boardGames: boardGames})
    })
    .catch(next)
})

//CREATE
router.post('/', (req, res, next) => {
  BoardGame.create(req.body.boardGame)
    .then((boardGame) => {
      res.status(201).json({boardGame: boardGame})
    })
    .catch(next)
})

//SHOW
router.get('/:id', (req, res, next) => {
  BoardGame.findById(req.params.id)
    .then((boardGame) => {
      res.status(200).json({boardGame: boardGame})
    })
    .catch(next)
})

//UPDATE
router.post('/:id', (req, res, next) => {
  // TODO BUG something's happening here randomly where mongoose throws a validation error but the boardGame document still gets updated
  BoardGame.findById(req.params.id)
    .then(boardGame => {
      boardGame.updateOne(req.body.boardGame)
      .then(() => boardGame.save())
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

//DELETE
router.delete('/:id', (req, res, next) => {
  BoardGame.findById(req.params.id)
    .then((boardGame) => boardGame.deleteOne())
    .then((boardGame) => res.status(200).json({boardGame: boardGame}))
    .catch(next)
})

module.exports = router