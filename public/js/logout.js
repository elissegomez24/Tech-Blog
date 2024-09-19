const logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const errorData = await response.json();
                console.error('Logout error:', errorData);
                alert('Failed to log out. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
}

