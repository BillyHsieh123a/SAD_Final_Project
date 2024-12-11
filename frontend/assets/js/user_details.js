document.addEventListener("DOMContentLoaded", () => {
    // 1. 加載用戶資料
    fetch('/api/user-details', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching user details: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // 將資料填入表單欄位
        document.getElementById('first-name').value = data.first_name || '';
        document.getElementById('last-name').value = data.last_name || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('birthday').value = data.birthday || '';
        document.getElementById('gender').value = data.gender || 'other';
    })
    .catch(error => {
        console.error('Error loading user data:', error);
        alert('Failed to load user data. Please try again later.');
    });

    // 2. 提交修改的用戶資料
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault(); // 阻止表單的默認提交行為

        const updatedData = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            birthday: document.getElementById('birthday').value,
            gender: document.getElementById('gender').value,
        };

        fetch('/api/user-details', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating user details: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Your details have been updated successfully!');
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Failed to update user data. Please try again later.');
        });
    });
});