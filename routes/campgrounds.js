const express = require('express');
const router = express.Router();
const { campgroundSchema} = require('../schemas')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const { isLoggIn, isAuthor, validationCampground } = require('../middleware');
const multer = require('multer');
const {storage}= require('../cloudinary')
const upload = multer({storage});

router.route('/')
  .get(campgrounds.index)
  .post(upload.array('image'), validationCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggIn, campgrounds.renderNewForm);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggIn, isAuthor, upload.array('image'), validationCampground,catchAsync(campgrounds.updateCampground))

router.get('/:id/edit', isLoggIn, isAuthor,  catchAsync(campgrounds.renderEditForm));

router.delete('/:id', isLoggIn, isAuthor, campgrounds.deleteCampground)

module.exports = router;