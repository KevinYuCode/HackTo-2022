export const signup = (userName, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Disallow", "/not-for-robots.html");
  myHeaders.append("User-Agent", "*");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", userName);
  urlencoded.append("password", password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:5000/signup", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};

export const signin = (userName, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", userName);
  urlencoded.append("password", password);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch("localhost:5000/signin", requestOptions)
    .then(response => response.json())
    .then((result) => {
      return result.status
    } )
    .catch((error) => {
      return error;
    });
};



