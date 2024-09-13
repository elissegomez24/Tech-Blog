// Handle sign-up form 
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    try {
        const response = await fetch('/api/users/signup', { // Ensure this matches your route
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to another page on success
        } else {
            errorMessageDiv.textContent = result.message;
            errorMessageDiv.style.display = 'block'; // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessageDiv.textContent = 'An unexpected error occurred. Please try again.';
        errorMessageDiv.style.display = 'block'; // Show unexpected error message
    }
});

// Handle comment submission
document.addEventListener('DOMContentLoaded', () => {
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const commentText = form.querySelector('textarea').value;
            const postId = form.dataset.postId;

            try {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ comment_text: commentText, post_id: postId }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert('Failed to add comment');
                }
            } catch (err) {
                console.error(err);
            }
        });
    });
});

