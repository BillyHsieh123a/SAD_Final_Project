document.getElementById("login-button").addEventListener("click", submitLogin);


function submitLogin() {
    const emailOrPhone = document.getElementById('login-email-or-phone').value.trim();
    const userPassword = document.getElementById('login-password').value.trim();

    if (!emailOrPhone || !userPassword) {
        document.getElementById('login-result').innerText = "Please fill in all fields.";
        return;
    }

    fetch('/submit_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_or_phone: emailOrPhone,
            user_password: userPassword
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success === 1) {
            document.getElementById('login-result').innerText = "Login Successful!";
            window.location.href = "/";
        } else {
            document.getElementById('login-result').innerText = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-result').innerText = "An unexpected error occurred.";
    });
}