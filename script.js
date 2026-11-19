/**
 * NAVEED AI VIDEO AUTOMATION
 * Owner: Hafiz Naveed Aziz
 * WhatsApp Number: 03013986828 (wa.me/923013986828)
 * Description: Interactive logic, WhatsApp-style bottom navigation & order integration.
 */

// Global Config
const OWNER_CONFIG = {
  name: "Hafiz Naveed Aziz",
  phone: "03013986828",
  intlPhone: "923013986828",
  whatsappBase: "https://wa.me/923013986828",
  businessName: "Naveed AI Video Automation"
};

/**
 * Handle Profile Photo Fallback
 * Automatically displays a high-tech SVG avatar if naveed.jpg is not yet uploaded
 */
function handleImageFallback(img) {
  if (img) {
    img.onerror = null; // Prevent loop
    img.src = 'assets/avatar-placeholder.svg';
  }
}

/**
 * Switch Active Tab in WhatsApp-Style Navigation
 * @param {string} tabId - e.g. 'tab-home', 'tab-projects', 'tab-order', 'tab-contact'
 */
function switchTab(tabId) {
  const targetPane = document.getElementById(tabId);
  if (!targetPane) return;

  // 1. Remove active state from all tab panes
  const allPanes = document.querySelectorAll('.tab-pane');
  allPanes.forEach(pane => {
    pane.classList.remove('active');
  });

  // 2. Activate target pane
  targetPane.classList.add('active');

  // 3. Update bottom navigation button indicators
  const navTabs = document.querySelectorAll('.whatsapp-bottom-nav .nav-tab');
  navTabs.forEach(tab => {
    if (tab.getAttribute('data-tab') === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // 4. Scroll smoothly to top of content
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // 5. Update browser URL hash without jump
  const simpleName = tabId.replace('tab-', '');
  if (history.pushState) {
    history.pushState(null, null, `#${simpleName}`);
  } else {
    location.hash = `#${simpleName}`;
  }
}

/**
 * Handle Order Form Submit
 * Packages all form entries and immediately opens WhatsApp with pre-filled message
 */
function handleOrderSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('order-name');
  const phoneInput = document.getElementById('order-whatsapp');
  const serviceInput = document.getElementById('order-service');
  const detailsInput = document.getElementById('order-details');
  const timelineInput = document.getElementById('order-timeline');

  const customerName = nameInput ? nameInput.value.trim() : "";
  const customerPhone = phoneInput ? phoneInput.value.trim() : "";
  const selectedService = serviceInput ? serviceInput.value : "";
  const projectDetails = detailsInput ? detailsInput.value.trim() : "";
  const timeline = timelineInput ? timelineInput.value : "Flexible";

  if (!customerName || !customerPhone || !selectedService || !projectDetails) {
    alert("Please fill in all required fields marked with * before submitting.");
    return;
  }

  // Format professional WhatsApp message
  const message = 
`🚀 *NEW ORDER INQUIRY - AI VIDEO AUTOMATION*
--------------------------------------------------
👤 *Client Name:* ${customerName}
📱 *WhatsApp:* ${customerPhone}
🎬 *Requested Service:* ${selectedService}
⏱️ *Preferred Timeline:* ${timeline}

📝 *Project Requirements & Details:*
${projectDetails}
--------------------------------------------------
_Inquiry sent via Naveed AI Video Automation Website_`;

  // Encode message for WhatsApp URL
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `${OWNER_CONFIG.whatsappBase}?text=${encodedText}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
}

/**
 * Initialize on DOM Load
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check URL hash for initial tab deep-link
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['home', 'projects', 'order', 'contact'];
  
  if (hash && validTabs.includes(hash)) {
    switchTab(`tab-${hash}`);
  } else {
    switchTab('tab-home');
  }

  // Listen for browser forward/back buttons
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && validTabs.includes(currentHash)) {
      switchTab(`tab-${currentHash}`);
    } else {
      switchTab('tab-home');
    }
  });

  // Verify profile image load; if missing, trigger graceful fallback
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    if (!profileImg.complete || profileImg.naturalWidth === 0) {
      // Test if image can load
      const testImg = new Image();
      testImg.onload = () => {};
      testImg.onerror = () => handleImageFallback(profileImg);
      testImg.src = profileImg.src;
    }
  }

  console.log(`%c Naveed AI Video Automation `, 'background: #8b5cf6; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log(`Owner: ${OWNER_CONFIG.name} | WhatsApp: ${OWNER_CONFIG.phone}`);
});
