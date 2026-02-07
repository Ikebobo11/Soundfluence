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


function payWithPaystack(packageName, packagePrice) {
  // 1. Grab user inputs
  const customerEmail = document.getElementById('email-field').value;
  const packageLink = document.getElementById('tiktok-field').value;

  // 2. Validation
  if (!customerEmail || !packageLink) {
    alert("Please enter your email and the TikTok link first!");
    return;
  }

  // 3. Open Paystack
  let handler = PaystackPop.setup({
    key: 'pk_test_xxxxxxxxxx', // YOUR PUBLIC KEY
    email: customerEmail,
    amount: packagePrice * 100, // Multiplies the price you passed (e.g. 8000 * 100)
    currency: 'NGN',
    
    metadata: {
      custom_fields: [
        {
          display_name: "Bought Package",
          variable_name: "package_type",
          value: packageName // This will say "25 Sound Uses" or whatever was clicked
        },
        {
          display_name: "TikTok Link",
          variable_name: "tiktok_link",
          value: packageLink
        }
      ]
    },

    callback: function(response) {
      // CONFIRMATION FOR THE USER
      alert('Success! You bought the ' + packageName + '. Reference: ' + response.reference);
      window.location.href = "success.html"; 
    }
  });

  handler.openIframe();
}