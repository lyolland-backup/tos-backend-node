const endpoint = `http://localhost:3000/api/v1`;

const signupURL = `${endpoint}/users`;
const signinURL = `${endpoint}/signin`;

const validateURL = `${endpoint}/validate`;
const updateURL = `${endpoint}/users/`;

const papersURL = `${endpoint}/papers`;

const jsonify = resp => {
  if (resp.ok) return resp.json();
  else throw resp.json();
};

const constructHeaders = (moreHeaders = {}) => ({
  Authorization: localStorage.getItem("token"),
  ...moreHeaders
});

const saveToken = data => {
  localStorage.setItem("token", data.jwt);
  return data.user;
};

const handleServerError = response => {
  throw response;
};

// Associate this with log out button
const clearToken = () => localStorage.removeItem("token");

const validateUser = () => {
  // check if jwt is stored in local storage
  if (!localStorage.getItem("token"))
    return Promise.resolve({
      user: null
    });

  return fetch(validateURL, { headers: constructHeaders() })
    .then(jsonify)
    .catch(handleServerError);
};

const signUpUser = user => {
  if (user.researcherToggle) console.log("researcher sign in ACTIVATE 👩‍🔬🔬");

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  };
  return fetch(signupURL, configObj)
    .then(jsonify)
    .then(saveToken)
    .catch(handleServerError);
};

const updateUser = (data, id) => {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user: data })
  };
  console.log("config object => 📨", configObj);

  return fetch(updateURL + id, configObj)
    .then(jsonify)
    .catch(handleServerError);
};

const signInUser = user => {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  };
  return fetch(signinURL, configObj)
    .then(jsonify)
    .then(saveToken)
    .catch(handleServerError);
};

const fetchAllPapers = () => {
  return fetch(papersURL)
    .then(jsonify)
    .catch(handleServerError);
};

export default {
  validateUser,
  signUpUser,
  signInUser,
  clearToken,
  updateUser,
  fetchAllPapers
};
