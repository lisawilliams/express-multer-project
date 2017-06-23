'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload

const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const upload = Object.assign(req.body.upload, {
    _owner: req.user._id
  })
  Upload.create(upload)
    .then(upload =>
      res.status(201)
        .json({
          upload: upload.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.upload.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  // { method: setUser, only: ['index', 'show'] },
  // { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show', 'destroy'] },
  // { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
