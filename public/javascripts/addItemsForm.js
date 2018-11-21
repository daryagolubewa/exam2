document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.querySelector('.button-add-item');
    const errorMessage = document.getElementsByClassName('item-add-error')[0];

    btnAdd.addEventListener('click', async () => {
        const itemName = document.getElementById('item-name').value;
        const itemCondition = document.getElementById('item-condition').value;
        const auctionStart = document.getElementById('item-date-start').value;
        const auctionEnd = document.getElementById('item-date-end').value;
        const itemDesc = document.getElementById('item-description').value;

        let response = await fetch('/users/list', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({name: itemName, condition: itemCondition, starts_at: auctionStart, ends_at: auctionEnd, description: itemDesc})
        });

        if (response.status === 200) {
            window.location = 'http://localhost:3000/users/profile'
        }
    });
});