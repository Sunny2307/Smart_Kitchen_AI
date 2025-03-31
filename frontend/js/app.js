document.addEventListener('DOMContentLoaded', () => {
    // Function to load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Function to load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Role toggle functionality (for signup page)
    const roleButtons = document.querySelectorAll('.role-btn');
    if (roleButtons.length > 0) {
        roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                roleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Password visibility toggle (for signup page)
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    if (togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', () => {
                const input = button.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    button.textContent = '👁️‍🗨️';
                } else {
                    input.type = 'password';
                    button.textContent = '👁️';
                }
            });
        });
    }
});