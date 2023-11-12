
let userId = localStorage.getItem("user_id");

if (!userId) {
    window.location.href = "../signin.html";
}

if (userId) {
    const URL = `http://localhost:5000/api/user/${userId}`;
    const request = new XMLHttpRequest();
    request.open('GET', URL);

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = uploadProfile; // we can call uploadProfile if we eant to upload from data file or,
                                    // we can call uploadProfileFromLocalStorage if we wantr to upload from local storage
    request.onerror = requestError;
    request.send();
    
    function uploadProfileFromLocalStorage() {

        console.log("Am intrat in upload din local storage");

        let userId = localStorage.getItem("user_id");
        let firstName = localStorage.getItem("first_name");
        let lastName = localStorage.getItem("last_name");
        let userPhone = localStorage.getItem("phone");
        let userEmail = localStorage.getItem("email");

                const fName = document.getElementById("fname");
                    if (!fName) {
                    addErrorMessage("First Name missing.");
                    return;
                }
                fName.value = firstName;

                const lName = document.getElementById("lname");
                if (!fName) {
                addErrorMessage("Last Name missing.");
                return;
                }
                lName.value = lastName;
    
                const uPhone = document.getElementById("uphone");
                if (!uPhone) {
                addErrorMessage("Phone missing.");
                return;
                }
                uPhone.value = userPhone;
    
                const uEmail = document.getElementById("uemail");
                if (!uEmail) {
                addErrorMessage("Email missing.");
                return;
                }
                uEmail.value = userEmail;
    
            }
        
    

function uploadProfile() {

    console.log("Am intrat in functia upload");

        if (request.status === 200) {
            const response = JSON.parse(request.response);

            console.log(request.response);

            firstName = response.data.first_name;
            const fName = document.getElementById("fname");
                if (!fName) {
                addErrorMessage("First Name missing.");
                return;
            }
            fName.value = firstName;
            
            lastName = response.data.last_name;
            const lName = document.getElementById("lname");
            if (!fName) {
            addErrorMessage("Last Name missing.");
            return;
            }
            lName.value = lastName;

            vPhone = response.data.phone;
            const userPhone = document.getElementById("uphone");
            if (!userPhone) {
            addErrorMessage("Phone missing.");
            return;
            }
            userPhone.value = vPhone;

            vEmail = response.data.email;
            const userEmail = document.getElementById("uemail");
            if (!userEmail) {
            addErrorMessage("Email missing.");
            return;
            }
            userEmail.value = vEmail;

        }
    }

function updateProfile() {

    console.log("Am intrat in functia update");

    const inputs = document.getElementsByTagName("input");

    const firstName = inputs[0].value;
    const lastName = inputs[1].value;
    const userPhone = inputs[2].value;
    const userEmail = inputs[3].value;
    
    const URL = `http://localhost:5000/api/user/${userId}`;
    const data = {
        "first_name": firstName,
        "last_name": lastName,
        "phone": userPhone,
        "email": userEmail,
        "type": 1
    }
    console.log(data);

    const request = new XMLHttpRequest();
    request.open("PUT", URL);

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = signinCompleted;
    request.send(JSON.stringify(data));

    localStorage.setItem("first_name", firstName);
    localStorage.setItem("last_name", lastName);
    localStorage.setItem("phone", userPhone);
    localStorage.setItem("email", userEmail);

}

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

}