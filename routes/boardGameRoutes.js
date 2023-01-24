const express = require('express')
const User = require('../models/user')
const { requireToken } = require('../config/auth')

const router = express.Router()

//INDEX
router.get('/', requireToken, (req, res, next) => {
  try {
    res.status(200).json({ boardGames: req.user.boardGames })
  } catch {
    next()
  }
})

//CREATE
router.post('/', requireToken, (req, res, next) => {
  req.user.boardGames.push(req.body.boardGame)
  req.user
    .save()
    .then((user) => {
      const boardGame = user.boardGames[user.boardGames.length - 1]
      res.status(201).json({ boardGame: boardGame })
    })
    .catch(next)
})

//SHOW
router.get('/:id', requireToken, (req, res, next) => {
  try {
    const boardGame = req.user.boardGames.id(req.params.id)
    res.status(200).json({ boardGame: boardGame })
  } catch {
    next
  }
})

//UPDATE
router.patch('/:id', requireToken, (req, res, next) => {
  new Promise((resolve, reject) => {
    resolve(req.user.boardGames.id(req.params.id))
  })
    .then((boardGame) => {
      boardGame.set(req.body.boardGame)
      return boardGame.parent().save()
    })
    .then((boardGame) => res.status(200).json({ boardGame: boardGame }))
    .catch(next)
})

//DELETE
router.delete('/:id', requireToken, (req, res, next) => {
  new Promise((resolve, reject) => resolve(req.user))
    .then((user) => user.boardGames.id(req.params.id))
    .then((boardGame) => {
      boardGame.remove()
      boardGame.parent().save()
      return boardGame
    })
    .then((boardGame) => res.status(200).json({ boardGame: boardGame }))
    .catch(next)
})

module.exports = router
