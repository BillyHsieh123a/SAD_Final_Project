document.getElementById('sign-up-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表單默認提交

    let formData = new FormData(this);

    fetch('your-action-url', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert('Registration successful!');
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
});
