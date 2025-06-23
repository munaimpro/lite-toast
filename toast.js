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
        width: 320px;
        min-height: 64px;
        max-height: 800px;
        margin: 10px;
        padding: 14px;
        border-radius: 6px;
        font-weight: 400;
        font-size: 16px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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

      `;
    document.head.appendChild(style);
  })();

  // Icons configuration
  const toastIcons = {
    success: `
        <div class="icon-wrapper icon-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#07bc0c" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#3498bc" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
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
      // setTimeout(() => toast.remove(), stay);
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
