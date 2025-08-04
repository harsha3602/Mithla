// // let errormsg = document.getElementById("errorMsg");

// // const checkPassword = () => {
// //     let password = document.getElementById("password").value; // Get the value here
// //     let length = password.length;
// //     console.log(length);
// //     return (length >= 8);
// // }

// // const passwordValidate = () => {
// //     let form = document.getElementById("Form");
// //     form.addEventListener("submit", (e) => {
// //         if (!checkPassword()) {
// //             e.preventDefault();
// //             errormsg.innerText = "Password is too short, must have 8 characters";
// //             errormsg.style.color = "red";
// //             // password.style.border = "1px solid red"; // Uncomment if you want to style the input
// //         } else {
// //             errormsg.innerText = "";
// //             // password.style.border = "1px solid green"; // Uncomment if you want to style the input when valid
// //         }
// //     });
// // }

// // // Call the passwordValidate function to set up the event listener
// // passwordValidate();

// //  document.addEventListener("DOMContentLoaded", passwordValidate);

// //    document.addEventListener('DOMContentLoaded', function() {
// //             const passwordInput = document.getElementById('password');
// //             const errorMsg = document.getElementById('errorMsg');
            
// //             document.getElementById('Form').addEventListener('submit', function(e) {
// //                 if (passwordInput.value.length < 8)
// //                      {
// //                     console.log(passwordInput.length);
// //                         e.preventDefault();
// //                     errorMsg.textContent = 'Password must be at least 8 characters';
// //                     passwordInput.style.borderColor = '#e74c3c';
// //                 } else {
// //                     errorMsg.textContent = '';
// //                     passwordInput.style.borderColor = '#4CAF50';
// //                 }
// //             });
            
// //             // Real-time validation feedback
// //             const kalu=()=>{


// //             passwordInput.addEventListener('input', function() {
// //                 if (passwordInput.value.length < 8) {
// //                     errorMsg.textContent = 'At least 8 characters required';
// //                     passwordInput.style.borderColor = '#e74c3c';
// //                 } else {
// //                     errorMsg.textContent = '';
// //                     passwordInput.style.borderColor = '#4CAF50';
// //                 }
// //             });
// //         }
// //         });


//         const passwordInput = document.getElementById('password');
//         const errorMsg = document.getElementById('errorMsg');
//         const form = document.getElementById('Form');
        

//         // Validate on form submission
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const password = passwordInput.value;
//             const isValid = password.length >= 8;
//             console.log(password.length);
            
            
//             if (!isValid) {
//                 errorMsg.textContent = 'Password must be at least 8 characters long';
//                 passwordInput.style.border = 'red';
//             } else {
//                 errorMsg.textContent = '';
//                 passwordInput.style.border = 'green';
               
//                 // In a real application, you would submit the form here
//                 form.submit();
//             }
//         });

//         // Reset validation when user starts typing
//         passwordInput.addEventListener('focus', function() {
//             errorMsg.textContent = '';
//             passwordInput.style.borderColor = '#ddd';
//         });
  