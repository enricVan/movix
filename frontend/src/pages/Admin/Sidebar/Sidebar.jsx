import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  let { pathname } = useLocation();
  const getLinkClass = (path) => {
    return pathname === path
      ? "text-lg -translate-x-6 bg-gradient-to-b from-green-500 to-lime-400 rounded-full"
      : "text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full";
  };
  return (
    <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]">
      <aside className="text-white w-64 flex-shrink-0">
        <ul className="py-4">
          <li className={getLinkClass("/admin/movies/dashboard")}>
            <Link
              to="/admin/movies/dashboard"
              className="block p-2 ml-20 mb-10"
            >
              Dashboard
            </Link>
          </li>
          <li className={getLinkClass("/admin/movies/create")}>
            <Link to="/admin/movies/create" className="block p-2 ml-20 mb-10">
              Create Movie
            </Link>
          </li>
          <li className={getLinkClass("/admin/movies/genre")}>
            <Link to="/admin/movies/genre" className="block p-2 ml-20 mb-10">
              Genre List
            </Link>
          </li>
          <li className={getLinkClass("/admin/movies-list")}>
            <Link to="/admin/movies-list" className="block p-2 ml-20 mb-10">
              Update Movie
            </Link>
          </li>
          <li className={getLinkClass("/admin/movies/comments")}>
            <Link to="/admin/movies/comments" className="block p-2 ml-20 mb-10">
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
