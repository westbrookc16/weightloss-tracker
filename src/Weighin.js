import React, { useContext, useEffect } from "react";
import { LiveMessage } from "react-aria-live";

import useInitialFocus from "./hooks/useInitialFocus";

import { UserContext } from "./firebase/FirebaseUser";
import { Redirect } from "react-router-dom";
import moment from "moment";
import useForm from "./hooks/useForm";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "./firebase/firebase";
const Weighin = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    button: {
      margin: theme.spacing(1)
    }
  }));

  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  //ref for main element getting initial  focus
  const main = React.useRef(null);

  const initialValues = {
    bmi: "",
    heightFeet: "",
    heightIn: "",
    weight: "",
    day: moment().format("D"),
    year: moment().format("YYYY"),
    month: moment().format("M")
  };
  useInitialFocus(main, "Add Weigh In");

  const handleSubmitCallback = async form => {
    dispatch({
      type: "addWeighin",
      data: { ...form },
      firebase,
      user
    });
  };
  const generateBmiMessage = bmi => {
    if (parseFloat(bmi) > 0) {
      return `Your BMI is ${parseFloat(bmi).toFixed(2)}`;
    } else return "";
  };
  const validationCallback = form => {
    let errors = {};

    if (form.weight === "") {
      errors.weight = "You must enter a weight.";
    }
    if (parseInt(form.weight) < 0) {
      errors.weight = "Your weight must be positive";
    }
    return errors;
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    dispatch,
    form,
    errors,
    success,
    submitting,
    touched
  } = useForm(handleSubmitCallback, validationCallback, initialValues);
  //const [form, dispatch] = useReducer(weightReducer, initialValues);
  const errorMsgs = Object.keys(errors).map((field, i) => {
    if (touched[field]) return <li key={i}>{errors[field]}</li>;
    else return <div key={i} />;
  });

  useEffect(() => {
    if (!user.loading && user.uid) {
      dispatch({
        type: "changeField",
        name: "heightIn",
        value: user.heightIn
      });

      dispatch({
        type: "changeField",
        name: "heightFeet",
        value: user.heightFeet
      });
    }
  }, [user, dispatch]);

  const { heightFeet, heightIn, weight, day, month, year } = form;
  const generateErrorList = () => {
    return <ul>{errorMsgs}</ul>;
  };
  const classes = useStyles();
  return (
    <div>
      {success && <Redirect to="/" />}
      <div ref={main} tabIndex="-1">
        Please fill out the form below. All fields are required. If shis is your
        first time here, you will be asked for your height so your bmi can be
        calculated.
      </div>
      <form onSubmit={handleSubmit}>
        {!user.bmi && (
          <div>
            <TextField
              id="heightFeet"
              name="heightFeet"
              onChange={handleChange}
              onBlur={handleBlur}
              value={heightFeet}
              label="Height (Feet)"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="heightIn"
              name="heightIn"
              onChange={handleChange}
              onBlur={handleBlur}
              value={heightIn}
              label="Height (In)"
              className={classes.textField}
              margin="normal"
            />
          </div>
        )}
        <fieldset>
          <legend>Date</legend>
          <p>
            <label htmlFor="month">Month</label>
            <select
              id="month"
              value={month}
              onChange={handleChange}
              onBlur={handleBlur}
              name="month"
            >
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">July</option>
              <option value="8">Aug</option>
              <option value="9">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </p>
          <p>
            <label htmlFor="day">Day</label>
            <select
              id="day"
              name="day"
              value={day}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
            </select>
          </p>
          <p>
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={year}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select>
          </p>
        </fieldset>
        <TextField
          id="weight"
          name="weight"
          onChange={handleChange}
          onBlur={e => {
            handleBlur(e);
            dispatch({ type: "calcBmi", data: { ...form } });
          }}
          value={weight}
          label="Weights"
          className={classes.textField}
          margin="normal"
        />
        <Button
          variant="contained"
          className={classes.button}
          type="submit"
          disabled={submitting}
        >
          Submit
        </Button>
      </form>
      <LiveMessage message={generateBmiMessage(form.bmi)} aria-live="polite" />

      <br />
      {generateErrorList()}
    </div>
  );
};
export default Weighin;
