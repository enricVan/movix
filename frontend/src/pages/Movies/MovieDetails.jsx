import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { ArrowBigLeft } from "lucide-react";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <ArrowBigLeft
          className="ml-5"
          onClick={() => {
            window.history.back();
          }}
        />
        <Link to="/" className="text-white font-semibold hover:underline">
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[70%] rounded"
          />
        </div>

        {/* Movie player */}
        <hr />

        <section className="flex justify-center">
          <iframe
            width="90%"
            height="600px"
            src={movie?.api}
            allowFullScreen
          ></iframe>
        </section>

        {/* Container One */}
        <div className="container  flex justify-between px-[4rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>

            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className="mt-[1rem]">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container px-[4rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
            refetchMovies={refetch}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
