document.addEventListener('DOMContentLoaded', () => {
    const btnSbm1 = document.getElementById('btn-submit-1');
    const errorMessage = document.getElementsByClassName('user-sign-up-error')[0];

    btnSbm1.addEventListener('click', async () => {
        const userEmail = document.getElementById('user-email').value;
        const userPassword = document.getElementById('user-password').value;

        let response = await fetch('/users/enter', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({email: userEmail, password: userPassword})
        });
        console.log(await response.json());
        if (response.status === 200) {
            window.location = 'http://localhost:3000/users/profile'
        } else {
            response = await response.text();
            errorMessage.innerText = response;
            errorMessage.style.display = 'block';
        }
    });
});