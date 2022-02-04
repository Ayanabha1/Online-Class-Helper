import React, { useEffect, useState } from "react";
import "./nextclass.css";
import right from "./Assets/right-arrow.png";
import left from "./Assets/left-arrow.png";
import axios from "axios";

export default function NextClass() {

  // Variables
  const [curHour, setCurHour] = useState();
  const [curMinute, setCurMinute] = useState();
  const [curMeridiem, setCurMeridiem] = useState();
  const [curDay, setCurDay] = useState();
  const [nextClass, setNextClass] = useState({
    class_name: "No Class",
    class_link: "#",
    class_time: "NA"
  });
  const [classList, setClassList] = useState([]);
  
  const BaseURL = "http://localhost:8000";
  
  // Function to get the current time
  function setTime() {
    const today = new Date();
    const weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );

    setCurDay(weekday[today.getDay()]);
    setCurHour(
      today.getHours() > 12
        ? today.getHours() - 12
        : today.getHours() < 10
        ? "0" + today.getHours()
        : today.getHours()
    );
    setCurMinute(
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
    );
    setCurMeridiem(today.getHours() > 12 ? "PM" : "AM");
  }

  
  // Function to change time format
  
  function changeTimeFormat(timeInp)
  {
    var timeOp = `${timeInp[0]}${timeInp[1]}`;
    var Meridiem = "AM";
    // console.log(timeOp);
    if (timeOp>=13) {
      timeOp -= 12;
      Meridiem = "PM";
    }
    var hr = timeOp.toString();
  
    var min = `${timeInp[3]}${timeInp[4]}`
    var out = `${hr}:${min} ${Meridiem}`;
    // console.log(out);
    return out;
  }
  
  // Function to get the next class
  function findNextClass(list) {
    const today = new Date();
    var curTimeHr = today.getHours().toString();
    var curTimeMin = today.getMinutes().toString();
    var curTime = `${curTimeHr}:${curTimeMin}`;
    var tempList = [];
    list.forEach((cl) => {
      if (cl.class_time >= curTime) {
        console.log(cl);
        tempList.push(cl);
      }
    });
    const nextClassObj = {
      class_name: tempList[0].class_name,
      class_link: tempList[0].class_link,
      class_time: changeTimeFormat(tempList[0].class_time)
    };
    // console.log(nextClassObj);
    setNextClass(nextClassObj);
  }

  // Function to retrieve all the classes of a specific day

  async function getList() {
    const today = new Date();
    await axios
      .get(BaseURL+'/showSchedule', {
        params: {
          class_sec: "IT-6",
          class_day: today.getDay(),
        },
      })
      .then((data) => {
        setClassList(data.data);
        findNextClass(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getList();

    setInterval(() => {
      setTime();
    }, 1000);

    // Check for next class in every 10 minutes
    setInterval(() => {
      findNextClass(classList)
    }, 60000);

  }, []);

  return (
    <div className="nextclass">
      <div className="nextclass-left">
        <p className="heading">Find all the links for your classes here</p>
        <p>We've got you covered</p>
        <div className="day-and-time">
          <div className="pre-p-line"></div>
          <p>
            {curDay} | {curHour}:{curMinute} {curMeridiem}
          </p>
        </div>
        <div className="nextclass-alert">
          <div className="pre-p-line"></div>
          <p> Next Class : {nextClass.class_name} {nextClass.class_time === "NA" ? "" : `(${nextClass.class_time})`}</p>
        </div>
      </div>

      <div className="nextclass-right-container">
        <div className="nextclass-right">
          <div className="class-tiles-row">
            {classList?.map((cl) => (
              <div className="class-tile">
                <div className="class-tile-wrap">
                  <div className="class-tile-top">
                    <div className="class-tile-details">
                      <h3 className="class-name class-detail-info">
                        {cl?.class_name}
                      </h3>
                      <h5 className="class-teacher class-detail-info">
                        {cl?.class_teacher}
                      </h5>
                      <h5 className="class-sec class-detail-info">
                        {cl?.class_sec}
                      </h5>
                    </div>
                    <div className="class-day-and-time">
                      <div className="class-day class-day-and-time-elem">
                        {cl?.class_day}
                      </div>
                      <div className="class-time class-day-and-time-elem">
                        {cl?.class_time}
                      </div>
                    </div>
                  </div>

                  <div className="class-tile-bottom">
                    <div className="class-tile-btn-section">
                      <button className="class-tile-btns class-join">
                        Join Class
                      </button>
                      <button className="class-tile-btns classroom">
                        Classroom
                      </button>
                      <button className="class-tile-btns class-resources">
                        Resources
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nextclass-slider-navigation-btns">
          <img src={left} alt="" className="slider-nav-ico" />
          <img src={right} alt="" className="slider-nav-ico" />
        </div>
      </div>
    </div>
  );
}
