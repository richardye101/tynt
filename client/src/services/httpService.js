import axios from "axios";
import { toast } from "react-toastify";
// the main purpose of this file is to abtract away which package we use to perform http operations,
// so if we decide to use something else later on, we only need to change this file

// get URL for backend from an env variable
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// the null is passed in lieu of a success fnc, as this stage we only care about failures
axios.interceptors.response.use(null, (error) => {
  console.log(error.response.status);

  // checking if there is an error and it's 400+ but not 500, which means we know/can expect what it is
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // unexpectedError so we will log it and let the user know
  if (!expectedError) {
    console.log(error);
    toast("Something failed!");
  }

  return Promise.reject(error); // passing control to the catch block
});

// function to set the jwt, used to auth users
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
