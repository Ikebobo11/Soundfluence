// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

function toggleForm(button) {
    const form = button.nextElementSibling;
    if (form) {
        if (form.style.display === 'block') {
            form.style.display = 'none';
            button.textContent = button.textContent === 'Cancel' ? 'Order Now' : 'Select Influencer';
            // Revert logic if it was "Select Influencer"
            if(button.getAttribute('onclick').includes('Order Now') === false) {
                 // rough check, but UI text update handles most
                 if (button.parentElement.querySelector('h4')) button.textContent = "Select Influencer"; 
                 else button.textContent = "Order Now";
            }
        } else {
            // Close others
            document.querySelectorAll('.order-form').forEach(f => f.style.display = 'none');
            document.querySelectorAll('.btn-order').forEach(b => {
                if (b.parentElement.querySelector('h4')) b.textContent = "Select Influencer";
                else b.textContent = "Order Now";
            });

            form.style.display = 'block';
            button.textContent = 'Cancel';
        }
    }
}

function handleOrder(event, pkgName, amount) {
    event.preventDefault();
    const btn = event.target.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
        alert(`INSTAGRAM PROMOTION ORDER:\n\nPackage: ${pkgName}\nAmount: ₦${parseInt(amount).toLocaleString()}\n\nRedirecting to secure payment gateway...`);
        event.target.reset();
        event.target.style.display = 'none';
        btn.textContent = originalText;
        btn.disabled = false;
        const toggleBtn = event.target.previousElementSibling;
        if(toggleBtn) {
             if (event.target.parentElement.querySelector('h4')) toggleBtn.textContent = "Select Influencer";
             else toggleBtn.textContent = 'Order Now';
        }
    }, 1500);
}


paystack paymen