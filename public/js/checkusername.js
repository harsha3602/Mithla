let username = document.getElementById("username");
let msg = document.getElementById("message");

const checkusername = () => {
    const value = username.value;
   
    return /\d/.test(value);
}

const checkInputs = () => {
    let name = document.getElementById("name").value;
    return name !== ""; 
}

const checkvalidate = () => {
    let form = document.getElementById("passwordForm");
    form.addEventListener("submit", (e) => {
        if (!checkusername()) {
            e.preventDefault();
            msg.innerText = "Username must contain letters and numbers (e.g., name72833)";
            msg.style.color = "red";
            username.style.border = "1px solid red";

            if (checkInputs()) {
                let name = document.getElementById("name").value;
                let numstring=""
                for(let i=0;i<6;i++){
                    numstring+=Math.floor(Math.random()*10);
                    
                }
                username.value = name + numstring; 
                  msg.innerText ="Your existing username";
                  msg.style.color="red"
            }
        } else {
            msg.innerText = "";
            username.style.border = "1px solid green";
        }
    });
}

document.getElementById("name").addEventListener("input", checkInputs);

document.addEventListener("DOMContentLoaded", checkvalidate);
