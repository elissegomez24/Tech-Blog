const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                const errorData = await response.json();
                alert(errorData.message || response.statusText);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    } else {
        alert('Please fill out all fields.');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
