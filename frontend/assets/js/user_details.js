async function UserDetails() {
    try {
        const response = await fetch(`${serverURL}/user_details_load_user_data?user_id=${get_user_id()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is successful
        if (response.ok) {
            const result = await response.json();
            products = result; // Set the result from the API into the products object
            console.log(products); // Log the response from Flask
            // Initialize product display
            displayProducts(products);
        }
        // } else {
        //     console.error("Failed to fetch data:", response.status, response.statusText);
        // }
    } 
    catch (error) {
        // console.error('Error:', error);
    }
};

async function UserDetails(fname, lname, phone, email, bdate, gender) {
    const data = {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        bdate: bdate,
        gender: gender
    };
  
    try {
        const response = await fetch(`${serverURL}/user_details_change_user_data`, {
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