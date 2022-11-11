import { useState, useEffect } from "react";

function Calendar(props) {
  let [nowdate, setnowdate] = useState({});
  let [thismonth, setthismonth] = useState([]);
  let [changeby, setchangeby] = useState(0);
  // let [today, settoday] = useState({});
  let [totalnumdays, settotalnumdays] = useState(0);
  let [disabled, setdisabled] = useState(true);

  let sendcalendardata = (event) => {
    // props.callbck.getcalendardata({ status: true });
    let value = event.target.value;
    let date = new Date();
    let d = new Date(date.getFullYear(), date.getMonth() + changeby);
    if (Number(value) !== 0) {
      let output = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: Number(value),
        days: totalnumdays,
      };
      props.callback(output);
    }
  };

  let gettodaydate = (value) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let d = new Date(
      date.getFullYear(),
      date.getMonth() + value,
      date.getDate()
    );
    let now = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
    // settoday({ ...now });
    if (d.getFullYear() > now.year) {
      setdisabled(false);
    } else if (d.getMonth() > now.month) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }

    setnowdate({
      year: d.getFullYear(),
      month: months[d.getMonth()],
      date: d.getDate(),
      day: d.getDay(),
    });
  };

  let getdaysofmonth = (value) => {
    // const arr = Array.from(Array(31).keys());
    let date = new Date();
    let firstday = new Date(date.getFullYear(), date.getMonth() + value);
    let datearr = [];
    let startdate = 0;
    let totaldays = 0;
    for (let i = 0; i < 42; i++) {
      let d = new Date(
        date.getFullYear(),
        date.getMonth() + value,
        startdate + 1
      );
      if (i < firstday.getDay()) {
        datearr.push(" ");
      } else if (d.getMonth() !== firstday.getMonth()) {
        datearr.push(" ");
      } else {
        totaldays += 1;
        datearr.push((startdate += 1));
      }
    }
    settotalnumdays(totaldays);
    let montharr = [
      datearr.slice(0, 7),
      datearr.slice(7, 14),
      datearr.slice(14, 21),
      datearr.slice(21, 28),
      datearr.slice(28, 35),
      datearr.slice(35, 42),
    ];
    // console.log(datearr);
    setthismonth(montharr);
  };
  let changeMonth = (value) => {
    console.log(value);
    let newmonth = changeby + value;
    setchangeby(newmonth);
    gettodaydate(newmonth);
    getdaysofmonth(newmonth);
  };

  useEffect(() => {
    gettodaydate(0);
    getdaysofmonth(0);
  }, []);
  return (
    <>
      <section className=" shadow pt-3">
        <div className="w-100 d-flex justify-content-between p-2">
          <button
            disabled={disabled}
            onClick={() => {
              changeMonth(-1);
            }}
            className="fa fa-angle-left btn btn-light mx-2  px-2"
          ></button>
          <span className="d-flex">
            <p className="pe-2"> {nowdate.month}</p>
            <p>{nowdate.year}</p>
          </span>
          <button
            onClick={() => {
              changeMonth(1);
            }}
            className="fa fa-angle-right btn btn-light mx-1  px-2"
          ></button>
        </div>
        <div className="d-flex py-3">
          <p className="text-center calendar-head">sun</p>
          <p className="text-center calendar-head">mon</p>
          <p className="text-center calendar-head">tue</p>
          <p className="text-center calendar-head">wed</p>
          <p className="text-center calendar-head">thu</p>
          <p className="text-center calendar-head">fri</p>
          <p className="text-center calendar-head">sat</p>
        </div>
        <table className="w-100 ">
          <tbody>
            {thismonth.map((week, index) => {
              return (
                <tr key={index}>
                  <td className=" calendar-num ">
                    <button
                      value={week[0]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[0]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[1]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[1]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[2]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[2]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[3]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[3]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[4]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[4]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[5]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[5]}
                    </button>
                  </td>
                  <td className=" calendar-num ">
                    <button
                      value={week[6]}
                      onClick={(event) => {
                        sendcalendardata(event);
                      }}
                      className="rounded-circle  numbers-btn"
                    >
                      {week[6]}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Calendar;
