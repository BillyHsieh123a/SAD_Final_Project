document.getElementById("submit-button").addEventListener("click", SignIn);


async function SignIn(fname, lname, phone, email, bdate, gender, password) {
    const data = {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        bdate: bdate,
        gender: gender,
        password: password
    };
  
    try {
        const response = await fetch(`${serverURL}/signin_`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Send the data in the request body as JSON
        });
  
        // Check if the response is successful
        if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Output: "successfully deleted!"
        } 
    //     else {
    //         console.error('Failed to sign up:', response.status, response.statusText);
    //     }
    } catch (error) {
        // console.error('Error:', error);
    }
  }