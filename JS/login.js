const input = document.querySelector('.login_input');
const login_button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        login_button.removeAttribute('disabled');
        return;
    }

    login_button.setAttribute('disabled', '');
};

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location.href = 'pages/game.html';
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);