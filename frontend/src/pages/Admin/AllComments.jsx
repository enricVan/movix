import { CircleUserRound } from "lucide-react";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { useEffect } from "react";
const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  useEffect(() => {
    refetch();
  }, [movies, refetch]);

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  let noCommentsCount = 0;

  return (
    <div>
      {movies?.map((movie) => {
        if (movie?.reviews.length === 0) {
          noCommentsCount++;
        }

        return (
          <section
            key={movie._id}
            className="flex flex-col justify-center items-center"
          >
            {movie?.reviews.length > 0
              ? movie?.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
                  >
                    <h3 className="text-[#B0B0B0] mb-4">{movie.name}</h3>
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">
                        <CircleUserRound />
                        {review.name}
                      </strong>
                      <p className="text-[#B0B0B0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <p className="my-4">{review.comment}</p>

                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteComment(movie._id, review._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              : null}
            {noCommentsCount === movies?.length && (
              <div className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]">
                <p className="text-[#B0B0B0]">
                  No comments were found for any movies.
                </p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
export default AllComments;
