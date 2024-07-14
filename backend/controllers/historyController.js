import History from "../models/History.js";

export const writeHistory = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const currentTime = new Date().toISOString();

    const historyExist = await History.findOne({ user: userId });
    if (historyExist) {
      const isMovieExist = historyExist.movies.find(
        (item) => item.movie.toString() === movieId
      );

      if (isMovieExist) {
        isMovieExist.lastWatched = currentTime;
      } else {
        historyExist.movies.push({ movie: movieId, lastWatched: currentTime });
      }

      await historyExist.save();
    }
    res
      .status(200)
      .json({ message: "Lịch sử xem phim đã được cập nhật", historyExist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await History.findOne({ user: userId }).populate(
      "movies.movie"
    );
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovieFromHistory = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const history = await History.findOne({ user: userId });

    if (!history) {
      return res
        .status(404)
        .json({ message: "Lịch sử xem phim không tồn tại" });
    }

    history.movies = history.movies.filter(
      (item) => item.movie.toString() !== movieId
    );
    await history.save();

    res
      .status(200)
      .json({ message: "Lịch sử xem phim đã được cập nhật", history });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    await History.findOneAndUpdate({ user: userId }, { movies: [] });
    res.status(200).json({ message: "Lịch sử xem phim đã được xóa hêt" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
