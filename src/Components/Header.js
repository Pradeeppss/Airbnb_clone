import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="d-flex justify-content-between bg-white p-3 header px-5 align-items-center border">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="head-logo hand "
          src="../Images/Airbnb-Logo.png"
          alt="logo"
        />
        <div className="d-flex align-items-center shadow rounded-pill p-2">
          <div className="px-2 py-1">Anywhere</div>
          <div className="week px-2">Any Week</div>
          <input
            className="border-0 px-2 head-input"
            placeholder="Add Guests"
            type="text"
          />
          <i className="fa fa-search bg-danger p-2 rounded-circle text-white"></i>
        </div>
        <div className="d-flex align-items-center">
          <div className="">Become a host</div>
          <div className="fa px-4 fs-5 fa-globe"></div>
          <button className="rounded-pill text-secondary  p-1 btn btn-light border">
            <i className="fa fa-bars px-2"></i>
            <img className="user-logo" src="../Images/User.png" alt="" />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
