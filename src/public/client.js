

let checkHttpOnlyCookie = () => {
  if(Cookies.get('httponly_cookie') === undefined){
    console.info('SUCCESS! httponly_cookie either not set or not readable by browser')
  } else {
    throw('ERROR! httponly_cookie should NOT be readable by browser!!')
  }
}

checkHttpOnlyCookie()

let doIt = () => {
  axios.post('/try-cookie-set')
    .then(function (response) {
      console.log(response);
      checkHttpOnlyCookie()
    })
    .catch(function (response) {
      console.error(response);
    })
}

document.getElementById('do-it').addEventListener('click', doIt)