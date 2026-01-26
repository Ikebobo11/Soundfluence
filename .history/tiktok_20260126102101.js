// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});

// Scroll to section function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        // This checks if the clicked button triggered the function
        event.target.classList.add('active');
    }
}

// Toggle Form Visibility inside Cards
function toggleForm(button) {
    // Find the form sibling
    const form = button.nextElementSibling;
    if (form) {
        if (form.style.display === 'block') {
            form.style.display = 'none';
            button.textContent = 'Order Now';
            if(button.textContent === 'Select Influencer') button.textContent = 'Select Influencer'; // logic fix
        } else {
            // Close other open forms to keep UI clean (Optional, but good UX)
            document.querySelectorAll('.order-form').forEach(f => f.style.display = 'none');
            document.querySelectorAll('.btn-order').forEach(b => {
                 if(b.textContent === 'Cancel') b.textContent = 'Order Now'; 
            });

            form.style.display = 'block';
            button.textContent = 'Cancel';
        }
    }
}

// Mock Payment Processing
function handleOrder(event, pkgName, amount) {
    event.preventDefault();
    
    // Simulate processing
    const btn = event.target.querySelector('.btn-submit');
    const originalText = btn.textContent;
    
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
        alert(`ORDER SUMMARY:\n\nPackage: ${pkgName}\nAmount: ₦${parseInt(amount).toLocaleString()}\n\nRedirecting to secure payment gateway...`);
        // Reset form
        event.target.reset();
        event.target.style.display = 'none';
        
        // Reset button
        btn.textContent = originalText;
        btn.disabled = false;
        
        // Reset toggle button
        const toggleBtn = event.target.previousElementSibling;
        if(toggleBtn) toggleBtn.textContent = 'Order Now';
        
    }, 1500);
}
function sendToWhatsApp() {
  // Your specific WhatsApp Number
  const phoneNumber = "2348052894765"; 

  // Pulling text from your H1 IDs
  const quantity = document.getElementById('Quantity').innerText;
  const productLink = document.getElementById('Link').innerText;

  // Formatting the message
  // *Text* = Bold in WhatsApp | %0A = New Line
  const message = `Order Request:` +
                  `*Quantity:* ${quantity}%0` +
                  `*Link:* ${productLink}`;

  // Constructing the final URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Opening WhatsApp
  window.open(whatsappUrl, '_blank').focus();
}