import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Homebody() {
  const navigate = useNavigate();
  const [hotels, sethotels] = useState([]);

  let getallhotels = async () => {
    let URI = "https://airbnbapp.up.railway.app/getallhotels";
    let { data } = await axios.get(URI);
    // console.log(data);
    sethotels([...data.result]);
  };
  let gotodetails = (hoteldata) => {
    navigate("/Details", { state: { output: hoteldata._id } });
  };

  useEffect(() => {
    getallhotels();
  }, []);
  return (
    <>
      <section className="px-5">
        <div className="hotel-types text-secondary pb-2 align-items-center d-flex ">
          <div className="hotel-type d-flex flex-column align-items-center pe-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
          <div className="hotel-type d-flex flex-column align-items-center px-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
          <div className="hotel-type d-flex flex-column align-items-center px-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
          <div className="hotel-type d-flex flex-column align-items-center px-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
          <div className="hotel-type d-flex flex-column align-items-center px-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
          <div className="hotel-type d-flex flex-column align-items-center px-2 me-4">
            <div className="fa fa-home fs-2"></div>
            <div className="fs-6">Homes</div>
          </div>
        </div>
        <div className="d-flex row ">
          {hotels.map((hotel, index) => {
            return (
              <article
                key={index}
                onClick={() => {
                  gotodetails(hotel);
                }}
                className="col-3 hand my-2"
              >
                <img
                  className="w-100 rounded-3 hotel-img"
                  src={"../Images/assets/" + hotel.coverimg}
                  alt="hotel"
                />
                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      {hotel.name},{hotel.city}{" "}
                    </p>
                    <p>Distance</p>
                    <p>₹{hotel.rent}</p>
                  </div>
                  <div>
                    <i className="fa pe-2 fa-star"></i>
                    {hotel.rating}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Homebody;
