const endpoint = `http://localhost:3000/api/v1`;

const usersURL = `${endpoint}/users`;
const signinURL = `${endpoint}/signin`;

const validateURL = `${endpoint}/validate`;
const updateUserURL = `${endpoint}/users/`;

const papersURL = `${endpoint}/papers`;
const updatePaperURL = `${endpoint}/papers/`;

const reviewsURL = `${endpoint}/reviews`;

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
  return fetch(usersURL, configObj)
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

  return fetch(updateUserURL + id, configObj)
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

const fetchUser = id => {
  return fetch(usersURL + "/" + id);
  // .then(jsonify) // this has been moved to the component
  // .catch(handleServerError);
};

const fetchAllUsers = () => {
  return fetch(usersURL)
    .then(jsonify)
    .catch(handleServerError);
};

const fetchAllPapers = () => {
  return fetch(papersURL)
    .then(jsonify)
    .catch(handleServerError);
};

const fetchPaper = id => {
  return fetch(papersURL + "/" + id);
};

const postPaper = paper => {
  console.log("paper object in API method ... 🧻", paper);

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ paper })
  };
  return fetch(papersURL, configObj)
    .then(jsonify)
    .catch(handleServerError);
};

const postReview = review => {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ review })
  };
  return fetch(reviewsURL, configObj).then(jsonify);
};

const updatePaperRating = (value, id) => {
  const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rating: parseInt(value) })
    };
    console.log("config object => 📨", configObj);
  
    return fetch(updatePaperURL + id, configObj)
      .then(jsonify)
      .catch(handleServerError);
  };

const nodeSignUp = user => {
  const API_URL = "http://localhost:5000/auth/signup";
  console.log("user object => during in sign up method 🤓", user);
  const body = {
    username: user.username,
    userType: user.usertype,
    password: user.password
  };
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};

export default {
  validateUser,
  signUpUser,
  signInUser,
  clearToken,
  updateUser,
  fetchUser,
  fetchAllPapers,
  fetchPaper,
  postPaper,
  fetchAllUsers,
  postReview,
  nodeSignUp,
  updatePaperRating
};
