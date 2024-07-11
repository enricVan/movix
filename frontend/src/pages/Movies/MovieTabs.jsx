import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteCommentMutation,
  useDeleteUserReviewMutation,
  useUpdateCommentMutation
} from "../../redux/api/movies";

const MovieTabs = ({
  userInfo,
  submitHandler,
  comment,
  setComment,
  movie,
  refetchMovies
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateComment, { isLoading: loadingMovieReview }] =
    useUpdateCommentMutation();
  const [deleteReivew] = useDeleteUserReviewMutation();
  const hadleEditComment = async () => {
    const newComment = document.getElementById("edit-comment").value;
    try {
      await updateComment({
        id: movie._id,
        rating: 0,
        comment: newComment
      }).unwrap();

      refetchMovies();

      toast.success("Review updated successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };
  const hadleDeleteComment = async (reviewId) => {
    try {
      await deleteReivew({
        id: movie._id
      }).unwrap();
      setComment("");
      refetchMovies();

      toast.success("Delete review successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };
  return (
    <div>
      <section>
        {userInfo ? (
          !movie?.reviews.find((review) => review.user == userInfo._id) && (
            <form onSubmit={submitHandler}>
              <div className="my-2">
                <label htmlFor="comment" className="block text-xl mb-2">
                  Write Your Review
                </label>

                <textarea
                  id="comment"
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="p-2 border rounded-lg xl:w-[40rem] text-black"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          )
        ) : (
          <p>
            Please <Link to="/login">Sign In</Link> to write a review
          </p>
        )}
      </section>

      <section className="mt-[3rem]">
        <div>{movie?.reviews.length === 0 && <p>No Reviews</p>}</div>

        <div>
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              {!isEditing ? (
                <p className="my-4">{review.comment}</p>
              ) : (
                <textarea
                  id="edit-comment"
                  rows="3"
                  required
                  defaultValue={review.comment}
                  className="p-2 border rounded-lg xl:w-[40rem] text-black"
                ></textarea>
              )}
              {review.user === userInfo._id && (
                <>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-500"
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-10">
                        <span onClick={hadleEditComment}>Save</span>
                        <span className="text-red-600">Cancel</span>
                      </div>
                    ) : (
                      "Edit"
                    )}
                  </button>
                  {!isEditing && (
                    <button
                      onClick={() => hadleDeleteComment(review._id)}
                      className="text-red-600 float-right"
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
