import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { User } from "lucide-react";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed  left-[50%] transform translate-x-[-50%] z-50 bg-[#0f0f0f] border w-[20%] px-[4rem] py-[0.5rem] rounded">
      <section className="flex justify-center items-center gap-[1rem]">
        {/* Section 1 */}
        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
          >
            <MdOutlineLocalMovies className="mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>
        {/* Section 2 */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={toggleDropdown}
            className="text-gray-800 focus:outline-none flex items-center"
            style={{
              fontWeight: "bold",
              borderRadius: "5px",
              padding: "4px 15px"
            }}
          >
            {userInfo ? (
              <span className="text-white flex">
                <User />
                {userInfo.username}
              </span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                style={{ display: "flex" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute top-8 right-0 w-[10rem] space-y-2 bg-white text-gray-600 ${
                !userInfo.isAdmin ? "-top-20" : "-top-24"
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center transition-transform transform hover:translate-x-2"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
