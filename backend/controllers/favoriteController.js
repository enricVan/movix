import Favorite from '../models/Favorite.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const showFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const favorite = await Favorite.findOne({ user: userId }).populate('movies');

  if (favorite) {
    res.json(favorite);
  } else {
    res.status(404);
    throw new Error('Favorite not found');
  }
});

const addMovieToFavorites = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const favorite = await Favorite.findOne({ user: userId });

  if (favorite.movies.includes(movieId)) {
    res.status(400);
    throw new Error('Movie already in favorites');
  }

  if (favorite) {
    favorite.movies.push(movieId);
    await favorite.save();
    res.json({ message: 'Add Movies to Favorites List successful', favorite });
  } else {
    res.status(404);
    throw new Error('Favorite not found');
  }
});

const removeMovieFromFavorites = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  const favorite = await Favorite.findOne({ user: userId });

  if (favorite) {
    favorite.movies.pull(movieId);
    await favorite.save();
    res.json({
      message: 'Remove Movies from Favorites List successful',
      favorite,
    });
  } else {
    res.status(404);
    throw new Error('Favorite not found');
  }
});

const removeAllMoviesFromFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const favorite = await Favorite.findOne({ user: userId });

  if (favorite) {
    favorite.movies = [];
    await favorite.save();
    res.json({ message: 'Remove all movies from favorite', favorite });
  } else {
    res.status(404);
    throw new Error('Favorite not found');
  }
});

export {
  addMovieToFavorites,
  removeMovieFromFavorites,
  showFavorites,
  removeAllMoviesFromFavorites,
};
