import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "../Calendar";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Details() {
  let [hoteldetail, sethoteldetail] = useState({});
  let [imageset, setimageset] = useState([]);
  let [indate, setindate] = useState({});
  let [outdate, setoutdate] = useState({});
  let [numofclick, setnumofclick] = useState(0);
  let [today, settoday] = useState({});
  let [totalnights, settotalnights] = useState([0, 0, 0]);
  let [disabled, setdisabled] = useState(true);
  let [bgindate, setbgindate] = useState(" bg-date");
  let [bgoutdate, setbgoutdate] = useState("");
  const { state } = useLocation();

  let gethoteldetail = async () => {
    let URI =
      "https://airbnb-clone-api-pradeep.herokuapp.com/gethoteldetail/" +
      state.output;
    let { data } = await axios.get(URI);
    let output = data.result;
    setimageset([...data.result.hotelimg]);
    sethoteldetail({ ...output });
  };

  let getdaysinbetween = (startdate, enddate) => {
    let numofdays = 0;
    let equality = true;
    while (equality) {
      numofdays += 1;
      let d = new Date(
        startdate.year,
        startdate.month - 1,
        startdate.day + numofdays
      );
      if (
        d.getFullYear() === enddate.year &&
        d.getMonth() === enddate.month - 1 &&
        d.getDate() === enddate.day
      ) {
        equality = false;
        let total = numofdays * hoteldetail.rent;
        let output = [numofdays, total, total + 50];
        settotalnights([...output]);
        setdisabled(false);
      }
      // failsafe
      // else if (numofdays > 50) {
      //   equality = false;
      //   console.log("bad end");
      // }
    }
  };

  let getcalendardata = (calendardata) => {
    let clicknum = numofclick;
    clicknum += 1;

    if (clicknum % 2 === 0) {
      setbgoutdate("");
      setbgindate(" bg-date ");
      if (calendardata.year > indate.year) {
        setoutdate({ ...calendardata });
        setnumofclick(clicknum);
        getdaysinbetween(indate, calendardata);
      } else if (
        calendardata.year === indate.year &&
        calendardata.month > indate.month
      ) {
        setoutdate({ ...calendardata });
        setnumofclick(clicknum);
        getdaysinbetween(indate, calendardata);
      } else if (
        calendardata.year === indate.year &&
        calendardata.month === indate.month &&
        calendardata.day > indate.day
      ) {
        setoutdate({ ...calendardata });
        setnumofclick(clicknum);
        getdaysinbetween(indate, calendardata);
      } else {
        setoutdate({});
        settotalnights([0, 0, 0]);
        setdisabled(true);
        setbgoutdate(" bg-date");
        setbgindate(" ");
      }
    } else {
      setbgoutdate(" bg-date");
      setbgindate(" ");
      if (clicknum === 1) {
        if (calendardata.year > today.year) {
          setnumofclick(clicknum);
          setindate({ ...calendardata });
        } else if (
          calendardata.year === today.year &&
          calendardata.month > today.month
        ) {
          setnumofclick(clicknum);
          setindate({ ...calendardata });
        } else if (
          calendardata.year === today.year &&
          calendardata.month === today.month &&
          calendardata.day > today.day
        ) {
          setnumofclick(clicknum);
          setindate({ ...calendardata });
        } else {
          setindate({});
          setdisabled(true);
          settotalnights([0, 0, 0]);
          setbgoutdate("");
          setbgindate(" bg-date ");
        }
      } else {
        if (calendardata.year < outdate.year) {
          setnumofclick(clicknum);
          setindate({ ...calendardata });
          getdaysinbetween(calendardata, outdate);
        } else if (
          calendardata.year === outdate.year &&
          calendardata.month < outdate.month
        ) {
          setnumofclick(clicknum);
          setindate({ ...calendardata });
          getdaysinbetween(calendardata, outdate);
        } else if (
          calendardata.year === outdate.year &&
          calendardata.month === outdate.month &&
          calendardata.day < outdate.day
        ) {
          if (
            calendardata.year === today.year &&
            calendardata.month === today.month &&
            calendardata.day <= today.day
          ) {
            setindate({});
            setdisabled(true);
            settotalnights([0, 0, 0]);
            setbgoutdate("");
            setbgindate(" bg-date ");
          } else {
            setnumofclick(clicknum);
            setindate({ ...calendardata });
            getdaysinbetween(calendardata, outdate);
          }
        } else {
          setindate({});
          setdisabled(true);
          settotalnights([0, 0, 0]);
          setbgoutdate("");
          setbgindate(" bg-date ");
        }
      }
    }
  };
  let loadScript = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      return true;
    };
    script.onerror = () => {
      return false;
    };
    window.document.body.appendChild(script);
  };
  let makePayment = async () => {
    let isLoaded = await loadScript();
    if (isLoaded === true) {
      alert("sdk is not loaded");
      return false;
    }
    var orderData = { total: totalnights[2] };
    var { data } = await axios.post(
      "https://airbnb-clone-api-pradeep.herokuapp.com/getpaymentid",
      orderData
    );
    var { order } = data;
    var options = {
      key: "rzp_test_nUftjVlE01TOBR", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Airbnb_clone",
      description: "Airbnb Test Transaction",
      image:
        "data:image/png;base64,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",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        var sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };
        var { data } = await axios.post(
          "https://airbnb-clone-api-pradeep.herokuapp.com/verifypayment",
          sendData
        );
        if (data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Payment Successfull",
            text: "",
          }).then(() => {
            window.location.replace("/");
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Payment Failed,try again",
            text: "",
          });
        }
      },
      prefill: {
        name: "name",
        email: "pradeepsosp@gmail.com",
        contact: "9999999999",
      },
    };
    var razorpayObject = window.Razorpay(options);

    razorpayObject.open();
  };

  useEffect(() => {
    let date = new Date();

    let d = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    settoday({ ...d });
    gethoteldetail();
  }, []);
  return (
    <>
      <div className=" py-5 px-lg-5 mx-lg-5 my-5 px-4">
        <section className="pb-4">
          <div className="pb-3">
            <h3>
              {hoteldetail.type} in {hoteldetail.name}
            </h3>
            <p>
              <i className="fa pe-1 fa-star"></i>
              {hoteldetail.rating} . {hoteldetail.name},{hoteldetail.city},
              {hoteldetail.Country}
            </p>
          </div>
          <div className="row image-set">
            <img
              className="col-6 big-img  me-2 pb-2"
              src={"../Images/assets/" + hoteldetail.coverimg}
              alt=""
            />
            <div className="col-6 h-100 p-0 row">
              {imageset.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="w-50 small-img pe-2 pb-2 p-0 "
                    src={"../Images/assets/" + image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section className="row m-0 w-100 justify-content-between pb-5">
          <div className="col-7 p-0">
            <div className="pb-3">
              <div className="h5">Details</div>
              <hr />
              <div>{hoteldetail.synposis}</div>
            </div>
            <div className="pb-3">
              <div className="h5">Synopsis</div>
              <hr />
              <div>{hoteldetail.synposis}</div>
            </div>
            {/* calendar */}
            <h5>Book your Days</h5>
            <hr />

            <Calendar callback={getcalendardata} />
          </div>
          {/* payment card */}
          <div className="col-4   detail-pay border shadow rounded-4">
            <div className="d-flex w-100 p-3 flex-column ">
              <div className="pb-4 d-flex justify-content-between align-items-center">
                <div className="fs-3">
                  ₹{hoteldetail.rent}
                  <span className="fs-6">/night</span>
                </div>
                <div>
                  <i className="fa fa-star"></i>
                  {hoteldetail.rating}
                </div>
              </div>
              <div className="border-dark border rounded-3">
                <div className=" d-flex">
                  <div
                    className={"border-end border-dark w-50 p-3 " + bgindate}
                  >
                    <div>CHECK-IN</div>
                    <p className="inout-date">
                      {indate.day}-{indate.month}-{indate.year}
                    </p>
                  </div>

                  <div className={"shadow-2 w-50 p-3" + bgoutdate}>
                    <div>CHECK-OUT</div>
                    <p className="inout-date">
                      {outdate.day}-{outdate.month}-{outdate.year}
                    </p>
                  </div>
                </div>
                <div className="border-top border-dark d-flex justify-content-between align-items-center p-3">
                  <div className="">GUESTS</div>
                  <i className="fa fa-caret-down px-3"></i>
                </div>
              </div>
              <div className="w-100 py-3">
                <button
                  disabled={disabled}
                  onClick={makePayment}
                  className="w-100 btn btn-danger p-2"
                >
                  Reserve
                </button>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  ₹{hoteldetail.rent} * {totalnights[0]} nights
                </div>
                <div>₹{totalnights[1]} </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Service-fee</div>
                <div>₹50</div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>Total</div>
                <div>₹{totalnights[2]}</div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-100">
          <div
            id="map-container-google-2"
            className="z-depth-1-half map-container"
          >
            <iframe
              title="map"
              src={
                "https://maps.google.com/maps?q=" +
                hoteldetail.name +
                "&t=&z=10&ie=UTF8&iwloc=&output=embed"
              }
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}

export default Details;
