// Handle comment submission
document.addEventListener('DOMContentLoaded', () => {
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const commentText = form.querySelector('textarea').value;
            const postId = form.dataset.postId;

            try {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comment_text: commentText,
                        post_id: postId,
                    }),
                });

                if (response.ok) {
                    const comment = await response.json();
                    const commentSection = form.parentElement;
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.innerHTML = `
              <p>${comment.comment_text}</p>
              <p>— ${comment.user.username} on ${new Date(comment.created_at).toLocaleDateString()}</p>
            `;
                    commentSection.appendChild(newComment);
                    form.querySelector('textarea').value = '';
                } else {
                    alert('Failed to submit comment. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});
