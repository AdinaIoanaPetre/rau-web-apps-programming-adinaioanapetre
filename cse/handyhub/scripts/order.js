
  function signinCompleted() {
    if (request.status === 200 || request.status === 201) {
        console.log("Am finalizat cu succes update");
      
 //       localStorage.setItem("user_id", 0);
 //       window.location.href = "home.html";
    }
}

function requestError() {
    console.log("Request failed");
    }   

function logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    
    localStorage.removeItem("product_id");

    window.location.replace("signin.html");
    }

