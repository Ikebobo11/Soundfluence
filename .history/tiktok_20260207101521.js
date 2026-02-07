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
// function sendToWhatsApp() {
//   const phoneNumber = "2348052894765"; 

//   // Use getElementById carefully - ensure these IDs exist on your page!
//   const quantityElement = document.getElementById('Quantity');
//   const linkElement = document.getElementById('Link');

//   // We check if the elements exist first so the code doesn't crash
//   const quantity = quantityElement ? quantityElement.innerText.trim() : "Not found";
//   const productLink = linkElement ? linkElement.innerText.trim() : "No Link";

//   // IMPORTANT: Use backticks (`) and hit ENTER on your keyboard 
//   // to create the lines. This is better than using \n with +.
//   const message = `Order Request:
// Quantity: ${quantity}
// Link: ${productLink}`;

//   // encodeURIComponent translates those 'Enters' into %0A for the URL
//   const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

//   window.open(whatsappUrl, '_blank').focus();
// }


const paymentOptions = {
  e: "customer@email.com",
  amount: 5000 * 100, // This is 5000 Naira
  // --- THIS IS THE NEW PART ---
  metadata: {
    cart_items: "2 Blue Shirts, 1 Red Hat",
    order_id: "Order_#12345"
  }
}