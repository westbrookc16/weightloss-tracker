import { calcBmi } from "./utils";
export const weightReducer = (state, action) => {
  switch (action.type) {
    case "changeField": {
      return { ...state, [action.name]: action.value };
    }
    case "calcBmi": {
      const { weight, heightFeet, heightIn } = action.data;
      let bmi = calcBmi(weight, heightFeet, heightIn);

      return { ...state, bmi };
    }
    case "addWeighin": {
      const { year, month, day } = action.data;
      const { user, firebase } = action;
      //turn variables into numbers for firebase
      action.heightFeet = parseInt(action.data.heightFeet);
      action.data.heightIn = parseInt(action.data.heightIn);
      action.data.weight = parseInt(action.data.weight);
      action.data.date = new Date(year, parseInt(month) - 1, day, 0, 0, 0, 0);
      if (user.weight) {
        action.data.difference = user.weight - action.weight;
      }
      //set initial values if it is first submission
      if (!user.bmi) {
        action.data.startWeight = action.weight;
        action.data.startDate = new Date();
      }

      try {
        firebase.db
          .collection("users")
          .doc(user.uid)
          .set({ ...action.data });

        user.setProfileData(action.data);
        action.data.uid = user.uid;
        firebase.db.collection("weighins").add(action.data);
        return { ...state, ...action.data };
      } catch (e) {
        console.log(`error=${e}`);
        return false;
      }
    }
    default: {
      return state;
    }
  }
};
