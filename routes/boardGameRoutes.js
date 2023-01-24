const express = require('express')
const BoardGame = require('../models/boardgame')
const { requireToken } = require('../config/auth')

const router = express.Router()

//INDEX
router.get('/', requireToken, (req, res, next) => {
  BoardGame.find()
    .then((boardGames) => {
      res.status(200).json({boardGames: boardGames})
    })
    .catch(next)
})

//CREATE
router.post('/', requireToken, (req, res, next) => {
  BoardGame.create(req.body.boardGame)
    .then((boardGame) => {
      res.status(201).json({boardGame: boardGame})
    })
    .catch(next)
})

//SHOW
router.get('/:id', requireToken, (req, res, next) => {
  BoardGame.findById(req.params.id)
    .then((boardGame) => {
      res.status(200).json({boardGame: boardGame})
    })
    .catch(next)
})

//UPDATE
router.patch('/:id', requireToken, (req, res, next) => {
  // TODO BUG something's happening here randomly where mongoose throws a validation error but the boardGame document still gets updated
  BoardGame.findById(req.params.id)
    .then(boardGame => {
      return boardGame.updateOne(req.body.boardGame)
      .then(() => boardGame.save())
    })
    .then((boardGame) => res.status(200).json({boardGame: boardGame}))
    .catch(next)
})

//DELETE
router.delete('/:id', requireToken, (req, res, next) => {
  BoardGame.findById(req.params.id)
    .then((boardGame) => boardGame.deleteOne())
    .then((boardGame) => res.status(200).json({boardGame: boardGame}))
    .catch(next)
})

module.exports = router