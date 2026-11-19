/**
 * NAVEED AI VIDEO AUTOMATION
 * Owner: Hafiz Naveed Aziz
 * WhatsApp Number: 03013986828 (wa.me/923013986828)
 * Description: Interactive logic, WhatsApp-style bottom navigation, dynamic AI research feed & order integration.
 */

// Global Config
const OWNER_CONFIG = {
  name: "Hafiz Naveed Aziz",
  phone: "03013986828",
  intlPhone: "923013986828",
  whatsappBase: "https://wa.me/923013986828",
  businessName: "Naveed AI Video Automation"
};

let allResearchData = [];

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
 * Load Live AI Video Research Feed from data/research.json
 */
async function loadLiveResearch() {
  const container = document.getElementById('research-feed-container');
  if (!container) return;

  try {
    const response = await fetch('data/research.json?t=' + Date.now());
    if (!response.ok) throw new Error('Data file not reachable');
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      allResearchData = data;
      renderResearchCards(data);
      const counterEl = document.getElementById('live-count-badge');
      if (counterEl) {
        counterEl.textContent = `${data.length} Verified Pipelines`;
      }
    } else {
      renderEmptyState();
    }
  } catch (error) {
    console.log('Using initial state or local demo:', error);
    // Render graceful empty state or keep initial helper
  }
}

/**
 * Render Research Cards
 */
function renderResearchCards(items) {
  const container = document.getElementById('research-feed-container');
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="empty-filter-state">
        <i class="fa-solid fa-filter-circle-xmark"></i>
        <p>No research entries found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((item, idx) => {
    const toolsHtml = (item.recommended_tools || []).map(tool => 
      `<span class="tool-pill"><i class="fa-solid fa-microchip"></i> ${tool}</span>`
    ).join('');

    const stepsHtml = (item.workflow_steps || []).map((step, sIdx) => 
      `<li class="workflow-step-item">
         <span class="step-num">0${sIdx + 1}</span>
         <span class="step-text">${step}</span>
       </li>`
    ).join('');

    const waInquiryUrl = `${OWNER_CONFIG.whatsappBase}?text=${encodeURIComponent(
      `Hello Hafiz Naveed Aziz, I want to discuss and order the following AI Video Automation pipeline: "${item.title}".`
    )}`;

    return `
      <article class="research-card">
        <div class="card-top-bar">
          <span class="category-badge"><i class="fa-solid fa-atom"></i> ${item.category || 'AI Automation'}</span>
          <span class="timestamp-tag"><i class="fa-regular fa-clock"></i> ${item.published_at || 'Recently Verified'}</span>
        </div>

        <h3 class="research-card-title">${item.title}</h3>
        <p class="research-card-summary">${item.summary}</p>

        <div class="research-details-box">
          <h4 class="details-heading"><i class="fa-solid fa-diagram-project"></i> Verified Production Pipeline:</h4>
          <ul class="workflow-steps-list">
            ${stepsHtml}
          </ul>
        </div>

        ${item.retention_impact ? `
          <div class="impact-metric-box">
            <i class="fa-solid fa-chart-line"></i>
            <div>
              <strong>Impact Metric:</strong> ${item.retention_impact}
            </div>
          </div>
        ` : ''}

        <div class="tools-container">
          <span class="tools-label">AI Toolstack:</span>
          <div class="tools-pills-wrap">
            ${toolsHtml}
          </div>
        </div>

        <div class="card-footer-actions">
          <div class="verification-pill">
            <i class="fa-solid fa-circle-check"></i>
            <span>${item.verification_status || 'Verified by Gemini AI'}</span>
          </div>
          <a href="${waInquiryUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> Inquire Pipeline
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Filter Research Feed by Category
 */
function filterResearch(category, btnElement) {
  // Update active pill button
  const filterBtns = document.querySelectorAll('.filter-chip');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  if (category === 'all') {
    renderResearchCards(allResearchData);
  } else {
    const filtered = allResearchData.filter(item => 
      (item.category && item.category.toLowerCase().includes(category.toLowerCase())) ||
      (item.topic && item.topic.toLowerCase().includes(category.toLowerCase()))
    );
    renderResearchCards(filtered);
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
      const testImg = new Image();
      testImg.onload = () => {};
      testImg.onerror = () => handleImageFallback(profileImg);
      testImg.src = profileImg.src;
    }
  }

  // Load Live Research Feed
  loadLiveResearch();

  console.log(`%c Naveed AI Video Automation `, 'background: #8b5cf6; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log(`Owner: ${OWNER_CONFIG.name} | WhatsApp: ${OWNER_CONFIG.phone}`);
});
