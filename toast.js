const Toast = (function () {
  let defaultType = "info";
  let defaultPosition = "bottom-right";
  let defaultDuration = 3000;

  // Inject styles once
  (function injectToastStyles() {
    if (document.getElementById("my-toast-style")) return;

    const style = document.createElement("style");
    style.id = "my-toast-style";
    style.innerHTML = `
      .mytoast {
        --toast-fade-delay: 3s;   /* how long it stays visible  */
        --toast-fade-time : .4s;  /* length of the fade itself  */
        background: #ffffff;
        min-width: 250px;
        margin: 10px;
        padding: 12px 18px;
        border-radius: 6px;
        font-weight: 400;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        opacity: 0;
        font-family: "Nunito", "Segoe UI", sans-serif;
        z-index: 1055;
        display: flex;
        align-items: center;
        gap: 10px;
        position: fixed;
      }

      .mytoast svg {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }

      .top-right    { top: 20px; right: 20px; transform: translateX(20px); }
      .top-left     { top: 20px; left: 20px; transform: translateX(-20px); }
      .bottom-right { bottom: 20px; right: 20px; }
      .bottom-left  { bottom: 20px; left: 20px; transform: translateX(-20px); }
      .top-center   { top: 20px; left: 50%; transform: translate(-50%, -20px); }
      .bottom-center{ bottom: 20px; left: 50%; transform: translate(-50%, 20px); }

      @keyframes slideInRight { to { opacity: 1; transform: translateX(-20px); } }
      @keyframes slideInLeft  { to { opacity: 1; transform: translateX(20px); } }
      @keyframes slideInDown  { to { opacity: 1; transform: translate(-50%, 0); } }
      @keyframes slideInUp    { to { opacity: 1; transform: translate(-50%, 0); } }

      @keyframes fadeOut { to { opacity: 0; } }`;
    document.head.appendChild(style);
  })();

  // Icons configuration
  const toastIcons = {
    success: `
        <div class="icon-wrapper icon-success">
            <svg id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">.st0{fill:#2BB673;}.st1{fill:none;stroke:#FFFFFF;stroke-width:30;stroke-miterlimit:10;}</style><path class="st0" d="M489,255.9c0-0.2,0-0.5,0-0.7c0-1.6,0-3.2-0.1-4.7c0-0.9-0.1-1.8-0.1-2.8c0-0.9-0.1-1.8-0.1-2.7  c-0.1-1.1-0.1-2.2-0.2-3.3c0-0.7-0.1-1.4-0.1-2.1c-0.1-1.2-0.2-2.4-0.3-3.6c0-0.5-0.1-1.1-0.1-1.6c-0.1-1.3-0.3-2.6-0.4-4  c0-0.3-0.1-0.7-0.1-1C474.3,113.2,375.7,22.9,256,22.9S37.7,113.2,24.5,229.5c0,0.3-0.1,0.7-0.1,1c-0.1,1.3-0.3,2.6-0.4,4  c-0.1,0.5-0.1,1.1-0.1,1.6c-0.1,1.2-0.2,2.4-0.3,3.6c0,0.7-0.1,1.4-0.1,2.1c-0.1,1.1-0.1,2.2-0.2,3.3c0,0.9-0.1,1.8-0.1,2.7  c0,0.9-0.1,1.8-0.1,2.8c0,1.6-0.1,3.2-0.1,4.7c0,0.2,0,0.5,0,0.7c0,0,0,0,0,0.1s0,0,0,0.1c0,0.2,0,0.5,0,0.7c0,1.6,0,3.2,0.1,4.7  c0,0.9,0.1,1.8,0.1,2.8c0,0.9,0.1,1.8,0.1,2.7c0.1,1.1,0.1,2.2,0.2,3.3c0,0.7,0.1,1.4,0.1,2.1c0.1,1.2,0.2,2.4,0.3,3.6  c0,0.5,0.1,1.1,0.1,1.6c0.1,1.3,0.3,2.6,0.4,4c0,0.3,0.1,0.7,0.1,1C37.7,398.8,136.3,489.1,256,489.1s218.3-90.3,231.5-206.5  c0-0.3,0.1-0.7,0.1-1c0.1-1.3,0.3-2.6,0.4-4c0.1-0.5,0.1-1.1,0.1-1.6c0.1-1.2,0.2-2.4,0.3-3.6c0-0.7,0.1-1.4,0.1-2.1  c0.1-1.1,0.1-2.2,0.2-3.3c0-0.9,0.1-1.8,0.1-2.7c0-0.9,0.1-1.8,0.1-2.8c0-1.6,0.1-3.2,0.1-4.7c0-0.2,0-0.5,0-0.7  C489,256,489,256,489,255.9C489,256,489,256,489,255.9z" id="XMLID_3_"></path><g id="XMLID_1_"><line class="st1" id="XMLID_2_" x1="213.6" x2="369.7" y1="344.2" y2="188.2"></line><line class="st1" id="XMLID_4_" x1="233.8" x2="154.7" y1="345.2" y2="266.1"></line></g></svg>
        </div>`,
    error: `
        <div class="icon-wrapper icon-error">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#D72828"/>
                <path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" fill="#E6E6E6"/>
            </svg>
        </div>`,
    info: `
        <div class="icon-wrapper icon-info">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#0d6efd"/>
                <rect x="22" y="14" width="4" height="4" fill="#fff"/>
                <rect x="22" y="20" width="4" height="14" fill="#fff"/>
            </svg>
        </div>`,
    warning: `
        <div class="icon-wrapper icon-warning">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#ffc107"/>
                <rect x="22" y="12" width="4" height="16" fill="#000"/>
                <rect x="22" y="32" width="4" height="4" fill="#000"/>
            </svg>
        </div>`
  };

  // Public API
  return {
    // Toast configuration (Default or User defined)
    // config: function ({ type = "info", position = "bottom-right", duration = 3000 } = {}) {
    //   defaultType = type;
    //   defaultPosition = position;
    //   defaultDuration = duration;
    // },

    // Property for showing message
    show: function (type, message, duration, position) {
      // defaultType = messageType;
      defaultPosition = position;
      defaultDuration = duration;

      const stay   = Math.max(duration, 0);      // ms toast should stay
      const slide  = 400;                        // ms slideIn/fadeOut takes
      const fadeAt = Math.max(stay - slide, 0);  // start fade before removal

      // Remove any existing toast
      const existingToast = document.querySelector(".mytoast");
      if (existingToast) {
        existingToast.style.animation = 'none';
        existingToast.remove();
      }

      // Create new toast element and append to html body
      const toast = document.createElement("div");
      toast.className = `mytoast ${defaultPosition}`;
      toast.innerHTML = `${toastIcons[type] || toastIcons.info}<span>${message}</span>`;
      document.body.appendChild(toast);

      // Dynamic toast duration setup
      toast.style.setProperty('--toast-fade-delay', `${fadeAt / 1000}s`);
      toast.style.setProperty('--toast-fade-time',  `${slide / 1000}s`);

      // Set animation based on position
      let animationIn = 'slideInRight';

      if (position === 'top-left' || position === 'bottom-left') animationIn = 'slideInLeft';
      if (position === 'top-center') animationIn = 'slideInDown';
      if (position === 'bottom-center') animationIn = 'slideInUp';

      toast.style.animation = `${animationIn} ${slide / 1000}s forwards, fadeOut ${slide / 1000}s forwards ${fadeAt / 1000}s`;

      // remove after the fade completes
      setTimeout(() => toast.remove(), stay);
    }
  };
})();

// Global function for show toast message
function showToastMessage(userDefinedType, userDefinedMessage, userDefinedDuration, userDefinedPosition) {
  const validTypes = ["success", "error", "info", "warning"];

  let type = "info";
  let message = "";
  let duration = 3000;
  let position = "bottom-right";

  // Case 1: showToastMessage("Only Message")
  if (typeof userDefinedType === "string" && userDefinedMessage === undefined) {
    message = userDefinedType;
  }

  // Case 2: showToastMessage("type", "message")
  else if (validTypes.includes(userDefinedType) && typeof userDefinedMessage === "string" && userDefinedDuration === undefined) {
    type = userDefinedType;
    message = userDefinedMessage;
  }

  // Case 3: showToastMessage("Message", duration)
  else if (typeof userDefinedType === "string" && typeof userDefinedMessage === "number" && userDefinedDuration === undefined) {
    message = userDefinedType;
    duration = userDefinedMessage;
  }

  // Case 4: showToastMessage("Message", "position")
  else if (typeof userDefinedType === "string" && typeof userDefinedMessage === "string" && !validTypes.includes(userDefinedType) && userDefinedDuration === undefined) {
    message = userDefinedType;
    position = userDefinedMessage;
  }

  // Case 5: showToastMessage("type", "message", duration)
  else if (validTypes.includes(userDefinedType) && typeof userDefinedMessage === "string" && typeof userDefinedDuration === "number" && userDefinedPosition === undefined) {
    type = userDefinedType;
    message = userDefinedMessage;
    duration = userDefinedDuration;
  }

  // Case 6: showToastMessage("type", "message", "position")
  else if (validTypes.includes(userDefinedType) && typeof userDefinedMessage === "string" && typeof userDefinedDuration === "string" && userDefinedPosition === undefined) {
    type = userDefinedType;
    message = userDefinedMessage;
    position = userDefinedDuration;
  }

  // Case 7: showToastMessage("Message", duration, position)
  else if (typeof userDefinedType === "string" && typeof userDefinedMessage === "number" && typeof userDefinedDuration === "string") {
    message = userDefinedType;
    duration = userDefinedMessage;
    position = userDefinedDuration;
  }

  Toast.show(type, message, duration, position);
}
