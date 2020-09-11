import React from "react";

import "./CourseCalendarForm.scss";

const CourseCalendarForm = ({ intakeName, cityName, startDate, endDate }) => {
  const history = useHistory();
  const [allCities, setAllCities] = useState(null);
  const [cityNameVisible, setCityNameVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [values, setValues] = useState({
    intakeName: "",
    cityName: "",
    startDate: "",
    endDate: "",
  });
  const showCities = useCallback(() => {
    if (courses) {
      let citiesName = courses.map((course) => course.cityName);
      citiesName = citiesName.filter((a, b) => citiesName.indexOf(a) === b);
      setValues({
        intakeName: "",
        cityName: citiesName[0],
        startDate: "",
        endDate: "",
      });
      setAllCities(citiesName);
    }
  }, [courses]);
  const newCourseCalendar = async () => {
    const newCourse = await axios.post(`/api/v1/courses`, {
      ...values,
    });
    if (newCourse.data.success) {
      setAlertMessage("New Course Calendar added successfully !");
      setTimeout(() => {
        Send_PageData(pageData.user, "Cities", "None");
        history.push("/Cities/");
      }, 2000);
    } else {
      console.log(newCourse);
    }
  };
  useEffect(() => {
    Get_Courses();
  }, []);
  useEffect(() => {
    showCities();
  }, [showCities]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    newCourseCalendar();
  };
  return (
    <div className="new-course-calendar-container">
      <p className="upcoming-class-title">{pageData.title}</p>
      <form className="new-course-calendar-form" onSubmit={handleSubmit}>
        {alertMessage !== "" ? (
          <Alert type={"success"} children={alertMessage} />
        ) : null}
        <div className="form-group font-size">
          <label>Intake: </label>
          <input
            name="intakeName"
            value={values.date}
            onChange={handleChange}
            type="text"
            placeholder="Intake Name . . ."
          ></input>
        </div>
        {!cityNameVisible && (
          <div className="form-group font-size test">
            <label>City Name:</label>
            <select
              className="form-control"
              name="cityName"
              value={values.date}
              onChange={handleChange}
            >
              {allCities &&
                allCities.map((city, index) => {
                  return (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  );
                })}
            </select>
            <i
              className="fas fa-plus plus-style"
              onClick={() => setCityNameVisible(!cityNameVisible)}
            ></i>
          </div>
        )}

        {cityNameVisible && (
          <div className="form-group font-size test">
            <label>New City Name: </label>
            <input
              type="text"
              name="cityName"
              value={values.date}
              onChange={handleChange}
              className="form-control"
              placeholder="New City Name . . ."
            ></input>
            <i
              className="fas fa-minus minus-style"
              onClick={() => setCityNameVisible(!cityNameVisible)}
            ></i>
          </div>
        )}
        <div className="form-group font-size">
          <label>Start Date: </label>
          <input
            type="date"
            name="startDate"
            value={values.date}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
        <div className="form-group font-size">
          <label>End Date: </label>
          <input
            type="date"
            name="endDate"
            value={values.date}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
        <div className="form-group font-size">
          <input
            type="submit"
            disabled={
              !values.intakeName ||
              !values.cityName ||
              !values.startDate ||
              !values.endDate
            }
            className="form-control"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default NewCourseCalendarForm;
