'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload
const awsUpload = require('lib/aws-upload')
const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/'})

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
  const upload = {
    path: req.file.path,
    title: req.body.image.title
  }
  awsUpload(file)
  .then((s3Response) => {
    return Upload.create({
      url: s3Response.location,
      title: s3Response.Key

    })
  })
  .then(() => res.sendStatus(201).json({upload}))
  .catch(next)
}

const update = (req, res, next) => {
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
  { method: multerUpload.single('image[file]'), only: ['create'] },
  { method: setModel(Upload), only: ['show', 'destroy', 'update'] }
  // { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
