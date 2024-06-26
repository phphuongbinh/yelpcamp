const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const { reviewSchema} = require('./schemas');
const { campgroundSchema} = require('./schemas');
const Review = require('./models/review');

module.exports.isLoggIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in');
    return res.redirect('/login');
  }
  next();
}

module.exports.validationCampground = (req, res, next) =>{
  const {error} = campgroundSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400)
  } else (
    next()
  )
}

module.exports.isAuthor = async (req, res, next)=>{
  const {id} = req.params;  
  const campground = await Campground.findById(id)
  if(!campground.author.equals(req.user._id)){
    req.flash('error', 'YOu do not have permission to do that!')
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}

module.exports.isReviewAuthor = async (req, res, next)=>{
  const {id, reviewId} = req.params;  
  const review = await Review.findById(reviewId)
  if(!review.author.equals(req.user._id)){
    req.flash('error', 'YOu do not have permission to do that!')
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}

module.exports.validationReview = (req, res, next)=>{
  const { error} = reviewSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el=>el.message).join(',');
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}
