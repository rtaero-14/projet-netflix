import mongoose from 'mongoose';
import Movie from './Movie.js';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'utilisateur est requis"],
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Le film est requis'],
    },
    rating: {
      type: Number,
      required: [true, 'La note est requise'],
      min: [1, 'La note minimale est de 1 étoile'],
      max: [5, 'La note maximale est de 5 étoiles'],
    },
    comment: {
      type: String,
      required: [true, 'Le commentaire est requis'],
      trim: true,
      maxlength: [1000, 'Le commentaire ne peut pas dépasser 1000 caractères'],
    },
  },
  {
    timestamps: true,
  }
);

// Un seul review par utilisateur et par film
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });
reviewSchema.index({ movie: 1, createdAt: -1 });

reviewSchema.statics.calculateAverageRating = async function (movieId) {
  const result = await this.aggregate([
    {
      $match: { movie: new mongoose.Types.ObjectId(movieId) },
    },
    {
      $group: {
        _id: '$movie',
        averageRating: { $avg: '$rating' },
        reviewsCount: { $sum: 1 },
      },
    },
  ]);

  const averageRating = result.length > 0 ? result[0].averageRating : 0;

  await Movie.findByIdAndUpdate(movieId, { rating: averageRating });
  return averageRating;
};

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.movie);
});

reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.movie);
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
