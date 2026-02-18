function initContactForm() {
    console.log('Contact Form Initialized (v2.1 - Centered Layout & Fixes)');
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const submitText = document.getElementById('submit-text');

    if (!form || !submitBtn || !submitText) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if access key is set in config.js
        const accessKey = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.WEB3FORMS_ACCESS_KEY : '';

        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
            showToast('Please set your Web3Forms access key in js/core/config.js!', 'error');
            return;
        }

        // UI Feedback: Loading state
        const originalText = submitText.innerText;
        submitText.innerText = 'SOWING...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Create a more structured, premium-looking message for the email body
        // Uses Unicode characters to create a balanced, professional report layout
        // Create the message using an array to COMPLETELY avoid any indentation issues
        // Use standard characters and a small margin to ensure centering/balance
        const margin = "  "; // 2 spaces for a clean left margin
        const messageLines = [

            margin + "🌱 NEW MESSAGE: GREEN PORTFOLIO",
            margin + "_______________________________________",
            "",
            margin + "👤 SENDER DETAILS",
            margin + "_______________________________________",
            margin + `Name:  ${name}`,
            margin + `Email: ${email}`,
            margin + `Date:  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
            "",
            margin + "💬 MESSAGE CONTENT",
            margin + "_______________________________________",
            margin + (message.length > 500 ? message.substring(0, 500) + "..." : message),
            margin + "_______________________________________",
            margin + "",
            margin + "✨ Sent via Green Portfolio Website",
            margin + "",
            margin + `📩 REPLY TO: ${email}`
        ];

        const structuredMessage = messageLines.join('\n');

        const object = {
            access_key: accessKey,
            subject: `🌱 New Seed Sown by ${name}`,
            from_name: `${name} | Green Portfolio`,
            message: structuredMessage,
        };

        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200) {
                showToast('Seed sown successfully! I will sprout in your inbox soon.', 'success');
                form.reset();
            } else {
                console.error('Error:', result);
                showToast(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showToast('Network error. Please check your connection.', 'error');
        } finally {
            // Restore UI state
            submitText.innerText = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    });
}

function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icon based on type
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Initialize icons for the new toast
    if (window.lucide) {
        window.lucide.createIcons({
            attrs: {
                class: 'lucide-icon'
            }
        });
    }

    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 5000);
}
