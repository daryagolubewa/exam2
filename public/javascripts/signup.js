document.addEventListener('DOMContentLoaded', () => {
    const btnSbm = document.getElementById('btn-submit');
    const errorMessage = document.getElementsByClassName('user-sign-up-error')[0];

    btnSbm.addEventListener('click', async () => {
        const userName = document.getElementById('user-name').value;
        const userEmail = document.getElementById('user-email').value;
        const userPassword = document.getElementById('user-password').value;

        let response = await fetch('/users/add', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({username: userName, email: userEmail, password: userPassword})
        });

        if (response.status === 200) {
            window.location = 'http://localhost:3000'

        } else {
            response = await response.text();
            errorMessage.innerText = response;
            errorMessage.style.display = 'block';
        }
    });
});