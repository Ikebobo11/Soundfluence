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


// function payWithPaystack(packageName, price) {
//     // 1. Get the values from your input boxes
//     // Make sure these IDs match the ones in your HTML!
//     const customerEmail = document.querySelector('.email-input').value;
//     const tiktokLink = document.querySelector('.link-input').value;
//     // const microQuantity = document.getElementById('micro-quantity').value;

//     if (!customerEmail || !tiktokLink) {
//         alert("Please enter your email and TikTok link!");
//         return;
//     }

//     // 2. This is the Paystack Magic
//     const handler = PaystackPop.setup({
//         key: 'pk_test_69f3fbc0be1d066414308d2862003c626c96c983', // <--- PUT YOUR KEY HERE
//         email: customerEmail,
//         amount: price * 100, // Converts Naira to Kobo
//         currency: 'NGN',
//         metadata: {
//             custom_fields: [
//                 {
//                     display_name: "Package",
//                     variable_name: "package",
//                     value: packageName
//                 },
//                 {
//                     display_name: "TikTok Link",
//                     variable_name: "tiktok_link",
//                     value: tiktokLink
//                 },
//             ]
//         },
//         callback: function(response) {
//             // This runs after they pay!
//             alert('Your order has been submitted and will be completed within 24-48 hours. Reference:  + response.reference');
//             window.location.href = "index.html"; // Send them to a success page
//         },
//         onClose: function() {
//             alert('You closed the window before finishing payment.');
//         }
//     });

//     // 3. THIS IS THE LINE THAT WAS MISSING OR FAILING
//     handler.openIframe(); 
// }

function payWithPaystack(btn, packageName, price) {
    // 1. Find the specific form this button belongs to
    const parentForm = btn.closest('.order-form');
    
    // 2. Grab values ONLY from this specific card
    const customerEmail = parentForm.querySelector('.email-input').value;
    const tiktokLink = parentForm.querySelector('.link-input').value;
    const hashtags = parentForm.querySelector('.hashtags-input') ? parentForm.querySelector('.hashtags-input').value : "N/A";
    const caption = parentForm.querySelector('.caption-input') ? parentForm.querySelector('.caption-input').value : "N/A";

    if (!customerEmail || !tiktokLink) {
        alert("Please enter your email and TikTok link!");
        return;
    }

    // 3. Setup Paystack
    const handler = PaystackPop.setup({
        key: 'pk_test_69f3fbc0be1d066414308d2862003c626c96c983', 
        email: customerEmail,
        amount: price * 100, 
        currency: 'NGN',
        metadata: {
            custom_fields: [
                {
                    display_name: "Package",
                    variable_name: "package",
                    value: packageName
                },
                {
                    display_name: "TikTok Link",
                    variable_name: "tiktok_link",
                    value: tiktokLink
                },
                {
                     display_name: "Hashtags",
                     variable_name: "hashtags",
                     value: hashtags
                 },
                 { display_name: "Caption", variable_name: "caption", value: caption }
            ]
            ]
        },
        callback: function(response) {
            // Success Message
            alert('Your order has been submitted and will be completed within 24-48 hours. Reference: ' + response.reference);
            window.location.href = "index.html"; 
        },
        onClose: function() {
            alert('You closed the window before finishing payment.');
        }
    });

    handler.openIframe(); 
}