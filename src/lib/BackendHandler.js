const axios = require("axios");

export function getMakePersonString(name, role, team, project) {
  return `mutation{makePerson(name:"${name}", role:"${role}", team:"${team}", project:"${project}"){id}}`;
}

export function getMakeActivityString(name, start, duration) {
  return `mutation{makeActivity(name:"${name}", start:${start}, duration:${duration}){id}}`;
}

export function getMakeSpaceString(
  name,
  project,
  daylight,
  nature,
  sound,
  like,
  points
) {
  return `mutation{makeSpace(name:"${name}", project:"${project}", daylight:${daylight}, nature:${nature}, sound:${sound}, like:${like}, points:[${points}]){id}}`;
}

export function getSpacesString(project) {
  return `query{getSpaces(project:"${project}"){name points{x, y}}}`;
}

export function callAPI(queryString) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://rhythm-day-backend.herokuapp.com/",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        query: queryString
      }
    })
      .then(result => {
        const { data } = result;
        // console.log("API DATA", result);
        resolve(data.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

// export default { callAPI };
