const express = require("express");
const app = express();
const router = express.Router();
const schedules = require("../Models/schedule");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

router.get("/", async (req, res) => {
    const day = weekday[req.query.class_day];
    const section = req.query.class_sec;
    const result = await schedules.find({class_sec : section , class_day : day}).sort({class_time : 1});
    res.send(result);
});

router.post("/addClass", async (req, res) => {
  const newClass = new schedules({
    class_day: req.body.class_day,
    class_sec: req.body.class_sec,
    class_name: req.body.class_name,
    class_teacher: req.body.class_teacher,
    class_time: req.body.class_time,
    class_link: req.body.class_link,
  });

  try {
    const savedClass = await newClass.save();
    res.send(savedClass);
  } catch (err) {
    res.status(200).send(err);
  }
});

module.exports = router;
