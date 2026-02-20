let mouseX = null;
let mouseY = null;

const repelRadius = 150;   // شعاع اثر (بزرگ‌تر = نرم‌تر)
const repelForce = 0.02;   // شدت اثر (کم = سافت)






const placeholders = document.querySelectorAll('.styled-input__placeholder-text'),
      inputs = document.querySelectorAll('.styled-input__input');

placeholders.forEach(function (el) {
  let value = el.innerText,
      html = '';
  for (let w of value) {
    if (!value) value = '&nbsp;';
    html += `<span class="letter">${w}</span>`;
  }
  el.innerHTML = html;

  // همیشه گلیچ فعال
  el.classList.add("glitch");
});

// اضافه کردن data-text برای گلیچ واقعی
placeholders.forEach(function (el) {
  el.setAttribute("data-text", el.innerText);
});

inputs.forEach(function (el) {
  let parent = el.parentNode;

  el.addEventListener('focus', function () {
    parent.classList.add('filled');
    placeholderAnimationIn(parent, true);
  });

  el.addEventListener('blur', function () {
    if (el.value.length) return;
    parent.classList.remove('filled');
    placeholderAnimationIn(parent, false);
  });

  el.addEventListener('input', function () {
    checkInputs();
    el.parentNode.classList.add('hacker');
  });
});

function placeholderAnimationIn(parent, action) {
  let act = action ? 'add' : 'remove';
  let letters = parent.querySelectorAll('.letter');
  letters = [].slice.call(letters, 0);
  if (!action) letters = letters.reverse();

  letters.forEach(function (el, i) {
    setTimeout(function () {
      let contains = parent.classList.contains('filled');
      if (action && !contains || !action && contains) return;
      el.classList[act]('active');
    }, 50 * i);
  });
}

setTimeout(function () {
  document.body.classList.add('on-start');
}, 100);

setTimeout(function () {
  document.body.classList.add('document-loaded');
}, 1800);

// password toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.classList.toggle('active');
});

// enable button
const submitBtn = document.getElementById('submitBtn');

function checkInputs() {
  const username = document.querySelector('input[name="nickname"]').value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', 'true');
  }
}

// validation + shake
submitBtn.addEventListener('click', function () {
  const usernameInput = document.querySelector('input[name="nickname"]');
  document.querySelectorAll('.styled-input').forEach(el => el.classList.remove('error'));

  if (!usernameInput.value.trim()) {
    usernameInput.parentNode.classList.add('error');
    return;
  }

  if (!passwordInput.value.trim()) {
    passwordInput.parentNode.classList.add('error');
    return;
  }

  alert("Login success!");
});

// ===== Matrix rain background (بدون وابستگی به بیرون) =====
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let hue = 160;
let targetHue = hue;
const fontSize = 16;
const letters = "abcdefghijklmnopqrstuvwxyz0123456789";

let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


function cycleColor() {
  targetHue = (hue + 30 + Math.random() * 40) % 360;
  setTimeout(cycleColor, 8000);
}
cycleColor();

function drawWaveOverlay() {
  const time = performance.now() / 1000;
  const amplitude = document.body.classList.contains("dark") ? 18 : 10;
  const wavelength = 220;

  ctx.save();
  ctx.globalAlpha = document.body.classList.contains("dark") ? 15 : 15;
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.7)`;
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let x = 0; x < canvas.width; x += 2) {
    const y =
      canvas.height / 2 +
      Math.sin((x / wavelength) + time) * amplitude +
      Math.sin((x / (wavelength / 2)) + time * 0.5) * (amplitude / 2);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const px = (mouse.x / canvas.width - 0.5) * 2;
  const py = (mouse.y / canvas.height - 0.5) * 2;

  hue += (targetHue - hue) * 0.1;

  ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));

    let x = i * fontSize;
let y = drops[i] * fontSize;

if (mouseX !== null && mouseY !== null) {
  const dx = x - mouseX;
  const dy = y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 250) {
    const force = (1 - distance / 250) * 0.7;
    x += dx * force;
    y += dy * force;
  }
}

ctx.fillText(text, x, y);


    if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
      drops[i] = 0;
    }
    drops[i]+=0.8;
  }

  drawWaveOverlay();
  requestAnimationFrame(drawMatrix);
}
drawMatrix();



const hackTitle = document.getElementById("hackTitle");
const hackLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const originalText = hackTitle.innerText;

// متن رو تبدیل به span می‌کنیم
hackTitle.innerHTML = originalText
  .split("")
  .map(char => `<span class="hack-letter">${char}</span>`)
  .join("");




  function runHackText() {
    const letters = document.querySelectorAll(".hack-letter");
    const total = letters.length;
    let progress = 0;
  
    const interval = setInterval(() => {
      for (let i = 0; i < total; i++) {
        // فاصله از مرکز
        const distFromCenter = Math.abs(i - total / 2);
  
        // احتمال اینکه حرف عوض بشه بر اساس فاصله از مرکز
        const chance = Math.max(0.2, 1 - distFromCenter / (total / 2));
  
        if (Math.random() < chance) {
          letters[i].innerText = hackLetters[Math.floor(Math.random() * hackLetters.length)];
        }
      }
  
      // کم کم حرف‌ها ثابت میشن از مرکز به سمت لبه‌ها
      progress += 0.18;
      const fixedCount = Math.floor(progress);
  
      for (let i = 0; i < fixedCount; i++) {
        const leftIndex = Math.floor(total / 2) - i;
        const rightIndex = Math.ceil(total / 2) + i;
  
        if (letters[leftIndex]) letters[leftIndex].innerText = originalText[leftIndex];
        if (letters[rightIndex]) letters[rightIndex].innerText = originalText[rightIndex];
      }
  
      if (fixedCount >= total / 2) {
        clearInterval(interval);
      }
    }, 80);
  }

setTimeout(() => {
  runHackText();
}, 2600);

setTimeout(() => {
  const title = document.getElementById("hackTitle");

  const rect = title.getBoundingClientRect();
  title.style.width = rect.width + "px";
  title.style.display = "inline-block";
  title.style.whiteSpace = "nowrap";
});






const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  document.body.classList.remove("dark", "light");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
});

themeBtn.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});


setTimeout(function () {
  document.body.classList.add('document-loaded');
}, 3500);












window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouseX = null;
  mouseY = null;
});
















const forgotLink      = document.getElementById('forgotPasswordLink');
const forgotSection   = document.getElementById('forgotSection');
const backToLogin     = document.getElementById('backToLogin');
const resetBtn        = document.getElementById('resetBtn');
const resetInput      = document.getElementById('resetEmail');

forgotLink.addEventListener('click', (e) => {
  e.preventDefault();

  document.getElementById('loginContent').classList.add('hidden');
  forgotSection.classList.remove('hidden');
});

backToLogin.addEventListener('click', (e) => {
  e.preventDefault();

  forgotSection.classList.add('hidden');
  document.getElementById('loginContent').classList.remove('hidden');
});



resetBtn.addEventListener('click', () => {
  const value = resetInput.value.trim();
  const captchaResponse = hcaptcha.getResponse();

  if (!value) {
      resetInput.parentNode.classList.add('error');
      return;
  }

  // اگر کپچا حل نشده
  if (!captchaResponse) {
      alert("Please complete the captcha");
      return;
  }

  // چک ساده ایمیل
  if (value.includes('@') && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email format");
      return;
  }

  alert(`Reset link would be sent to: ${value}`);

  // ریست کپچا بعد از استفاده
  hcaptcha.reset();
});