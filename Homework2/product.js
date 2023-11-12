function editProduct() {

    const pName = document.getElementById("pname");
    if (!pName) {
    addErrorMessage("Product Name missing.");
    return;
    }
    pName.readOnly = false;

    const pDescription = document.getElementById("pdescription");
    if (!pDescription) {
    addErrorMessage("Last Name missing.");
    return;
    }
    pDescription.readOnly = false;

    const pPrice = document.getElementById("price");
    if (!pPrice) {
    addErrorMessage("Last Name missing.");
    return;
    }
    pPrice.readOnly = false;

}

// Add event listener to the button element

function uploadFiles(event) {
    console.log("Eventul este " +event);
    event.preventDefault();
   // const uploadButton = document.getElementById("uploadButton");
   // uploadButton.addEventListener("click", uploadFiles);
    const fileInput = document.getElementById("fileInput");
    const selectedFiles = fileInput.files;
    // Check if any files are selected
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    console.log("Ma pregatesc sa culeg numele fisierelor");
    console.log("Numarul de fisiere este "+selectedFiles.length);
    console.log("Numele fisierelor "+selectedFiles.files);

    const img1 = document.getElementById("imagineUnu");
    console.log("img1 este "+img1);
    if (!img1) {
    addErrorMessage("Imagine 1 lipseste.");
    return;
    }
    img1.src = selectedFiles.fName[0];

    const img2 = document.getElementById("imagineDoi");
    if (!img2) {
    addErrorMessage("Imagine 2 lipseste.");
    return;
    }
    img2.src = selectedFiles.fName[1];

    const img3 = document.getElementById("imagineTrei");
    if (!img3) {
    addErrorMessage("Imagine 3 lipseste.");
    return;
    }
    img3.src = selectedFiles.fName[2];

  }

let productId = localStorage.getItem("product_id");

// if (!productId) {
//     window.location.href = "../signin.html";
// }

if (productId) {
    const URL = `http://localhost:5000/api/products/${productId}`;
    const request = new XMLHttpRequest();
    request.open('GET', URL);

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = uploadProduct; // we can call uploadProfile if we eant to upload from data file or,
                                    // we can call uploadProfileFromLocalStorage if we wantr to upload from local storage
    request.onerror = requestError;
    request.send();
 
function uploadProduct() {

    console.log("Am intrat in functia upload");

        if (request.status === 200) {
            const response = JSON.parse(request.response);

            console.log(request.response);

            productName = response.data.product_name;
            const pName = document.getElementById("pname");
                if (!pName) {
                addErrorMessage("Product Name missing.");
                return;
            }
            pName.value = productName;
            
            productDescription = response.data.product_description;
            const pDescription = document.getElementById("pdescription");
            if (!pDescription) {
            addErrorMessage("Last Name missing.");
            return;
            }
            pDescription.value = productDescription;

            productPrice = response.data.price;
            const pPrice = document.getElementById("price");
            if (!pPrice) {
            addErrorMessage("Phone missing.");
            return;
            }
            pPrice.value = productPrice;

        }
    }

function updateProduct() {

    console.log("Am intrat in functia update");

    const inputs = document.getElementsByTagName("input");

    const pName = inputs[1].value;
    const pDescription = inputs[2].value;
    const pPrice = inputs[3].value;
    
    console.log(pName);
    console.log(pDescription);
    console.log(pPrice);

    const URL = `http://localhost:5000/api/products/${productId}`;
    const data = {
        "product_name": pName,
        "product_description": pDescription,
        "price": pPrice
    }
    console.log(data);

    const request = new XMLHttpRequest();
    request.open("PUT", URL);

    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = signinCompleted;
    request.send(JSON.stringify(data));

}

function editProduct() {

    const pName = document.getElementById("pname");
    if (!pName) {
    addErrorMessage("Product Name missing.");
    return;
    }
    pName.readOnly = false;

    const pDescription = document.getElementById("pdescription");
    if (!pDescription) {
    addErrorMessage("Last Name missing.");
    return;
    }
    pDescription.readOnly = false;

    const Price = document.getElementById("price");
    if (!Price) {
    addErrorMessage("Last Name missing.");
    return;
    }
    Price.readOnly = false;

}

// Add event listener to the button element

function uploadFiles() {
    console.log("Eventul este " +event);
    event.preventDefault();
   // const uploadButton = document.getElementById("uploadButton");
   // uploadButton.addEventListener("click", uploadFiles);
    const fileInput = document.getElementById("fileInput");
    const selectedFiles = fileInput.files;
    // Check if any files are selected
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    console.log("Ma pregatesc sa culeg numele fisierelor");
    console.log("Numarul de fisiere este "+selectedFiles.length);
    console.log("Numele fisierelor "+selectedFiles.files);

    const img1 = document.getElementById("imagineUnu");
    console.log("img1 este "+img1);
    if (!img1) {
    addErrorMessage("Imagine 1 lipseste.");
    return;
    }
    img1.src = selectedFiles.fName[0];

    const img2 = document.getElementById("imagineDoi");
    if (!img2) {
    addErrorMessage("Imagine 2 lipseste.");
    return;
    }
    img2.src = selectedFiles.fName[1];

    const img3 = document.getElementById("imagineTrei");
    if (!img3) {
    addErrorMessage("Imagine 3 lipseste.");
    return;
    }
    img3.src = selectedFiles.fName[2];

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