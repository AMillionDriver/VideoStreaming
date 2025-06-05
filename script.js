// --- SIDEBAR DYNAMIC EXPAND/COLLAPSE ---
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
  });
}

// --- ADVANCED DARK/LIGHT MODE TOGGLER ---
function setTheme(theme, animate=true) {
  const body = document.body;
  const btn = document.querySelector('.theme-toggle-btn');
  const icon = btn && btn.querySelector('.theme-toggle-icon');
  if (theme === 'light') {
    body.classList.add('theme-light');
    localStorage.setItem('axomovie-theme', 'light');
    if (icon) {
      icon.classList.remove('moon');
      icon.classList.add('sun');
      icon.innerText = 'wb_sunny';
      if(animate) btn.classList.add('animated');
    }
  } else {
    body.classList.remove('theme-light');
    localStorage.setItem('axomovie-theme', 'dark');
    if (icon) {
      icon.classList.remove('sun');
      icon.classList.add('moon');
      icon.innerText = 'dark_mode';
      if(animate) btn.classList.add('animated');
    }
  }
  if (btn && animate) setTimeout(()=>btn.classList.remove('animated'), 600);
}
document.addEventListener('DOMContentLoaded', () => {
  // Insert theme toggle if not present
  if (!document.querySelector('.theme-toggle-btn')) {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.innerHTML = `<span class="material-icons theme-toggle-icon moon">dark_mode</span>`;
    document.querySelector('.header-right').appendChild(btn);
  }
  const themeBtn = document.querySelector('.theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('theme-light');
    setTheme(isLight ? 'dark' : 'light');
  });
  // Initial theme
  const storedTheme = localStorage.getItem('axomovie-theme');
  if (storedTheme) setTheme(storedTheme, false);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light', false);
  else setTheme('dark', false);
});

// --- FLOATING ACTION BUTTON EASTER EGG ---
const floatingAxo = document.getElementById('floatingAxo');
if (floatingAxo) {
  floatingAxo.addEventListener('click', () => {
    showAxoModal();
  });
}
function showAxoModal() {
  let modal = document.createElement('div');
  modal.id = 'axomovie-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0'; modal.style.left = '0';
  modal.style.width = '100vw'; modal.style.height = '100vh';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '3000';

  let box = document.createElement('div');
  box.innerHTML = `
    <span class="material-icons" style="font-size:3em;color:var(--highlight);margin-bottom:0.3em;">smart_toy</span>
    <h2 style="margin-bottom:0.5em;">Hi from AxoBot!</h2>
    <p>You're awesome for exploring AxoMovie! 🍿<br>Stay tuned for more features and surprises.<br><br><em>#AxoMovie #Streaming</em></p>
    <button id="closeAxoModal" style="margin-top:1.5em;padding:0.7em 1.7em;background:var(--accent);color:var(--surface-bg);border:none;border-radius:1em;font-size:1.1em;font-weight:700;cursor:pointer;">Close</button>
  `;
  modal.appendChild(box);
  document.body.appendChild(modal);

  document.getElementById('closeAxoModal').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// --- SMOOTH SCROLL FOR ANCHORS ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: "smooth"});
    }
  });
});

// --- NOTIFICATION DROPDOWN (BONUS) ---
const notificationIcon = document.querySelector('.header-right .material-icons[title="Notifications"]');
if (notificationIcon) {
  notificationIcon.style.position = "relative";
  notificationIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    let dropdown = document.getElementById('notiDropdown');
    if (dropdown) {
      dropdown.remove();
      return;
    }
    dropdown = document.createElement('div');
    dropdown.id = 'notiDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '2.5em';
    dropdown.style.right = '0';
    dropdown.style.background = 'var(--surface-bg)';
    dropdown.style.color = 'var(--text-main)';
    dropdown.style.borderRadius = '1em';
    dropdown.style.boxShadow = '0 2px 16px #0009';
    dropdown.style.padding = '1em 1.5em';
    dropdown.style.minWidth = '220px';
    dropdown.style.zIndex = '2001';
    dropdown.innerHTML = `
      <b style="color:var(--accent)">Notifications</b>
      <ul style="list-style:none;padding:0;margin:0.8em 0 0 0;">
        <li style="margin-bottom:0.6em;">
          <span class="material-icons" style="vertical-align:middle;color:var(--highlight);">movie</span>
          New episode of <b>Code Warriors</b> released!
        </li>
        <li>
          <span class="material-icons" style="vertical-align:middle;color:#ff5252;">chat</span>
          3 new replies to your comment.
        </li>
      </ul>
    `;
    notificationIcon.parentElement.appendChild(dropdown);

    document.addEventListener('click', function hideDropdown() {
      dropdown.remove();
      document.removeEventListener('click', hideDropdown);
    }, {once:true});
  });
}

// --- LIVE CHAT & COMMENT FORMS (Fake Submission) ---
function fakeFormHandler(form, inputSelector) {
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const input = form.querySelector(inputSelector);
    if (input && input.value.trim()) {
      const val = input.value;
      input.value = '';
      if(form.closest('.live-chat-section')) {
        // Add to chat window
        const chatWindow = form.closest('.live-chat-section').querySelector('.live-chat-window');
        if(chatWindow) {
          const msg = document.createElement('div');
          msg.innerHTML = `<b style="color:var(--accent);">You:</b> ${val}`;
          chatWindow.appendChild(msg);
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }
      if(form.closest('.comments-section')) {
        // Add comment to top
        const comments = form.closest('.comments-section').querySelector('div');
        if(comments) {
          const block = document.createElement('div');
          block.style.display = "flex";
          block.style.alignItems = "flex-start";
          block.style.gap = "0.7em";
          block.style.marginBottom = "1.1em";
          block.innerHTML = `
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" class="user-avatar" style="width:32px;height:32px;">
            <div>
              <b style="color:var(--accent);">You</b>
              <span style="color:var(--text-subtle); font-size:0.9em;"> • just now</span>
              <p style="margin:0.3em 0 0.6em 0;">${val}</p>
            </div>
          `;
          comments.prepend(block);
        }
      }
    }
  });
}
document.querySelectorAll('.live-chat-section form').forEach(form => fakeFormHandler(form, 'input[type="text"]'));
document.querySelectorAll('.comments-section form').forEach(form => fakeFormHandler(form, 'input[type="text"]'));

// --- ENSURE NO OVERFLOW (Resize observer for main) ---
if (window.ResizeObserver) {
  const main = document.querySelector('main');
  if (main) {
    const observer = new ResizeObserver(() => {
      main.style.maxWidth = window.innerWidth + 'px';
    });
    observer.observe(main);
  }
}