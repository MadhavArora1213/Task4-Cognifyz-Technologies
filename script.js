// Select DOM elements
const formSection = document.getElementById('form-section');
const summarySection = document.getElementById('summary-section');
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const emailError = document.getElementById('email-error');
const passwordStrength = document.getElementById('password-strength');
const confirmPasswordError = document.getElementById('confirm-password-error');
const summaryContent = document.getElementById('summary-content');

// Validate email format
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate password strength
function checkPasswordStrength(password) {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return strongPassword.test(password);
}

// Client-side form validation
form.addEventListener('input', () => {
  // Email validation
  if (!validateEmail(emailInput.value)) {
    emailError.classList.remove('hidden');
  } else {
    emailError.classList.add('hidden');
  }

  // Password strength check
  if (passwordInput.value.length > 0) {
    passwordStrength.classList.remove('hidden');
    if (checkPasswordStrength(passwordInput.value)) {
      passwordStrength.textContent = 'Strong password';
      passwordStrength.classList.replace('text-gray-500', 'text-green-500');
    } else {
      passwordStrength.textContent = 'Weak password';
      passwordStrength.classList.replace('text-green-500', 'text-gray-500');
    }
  } else {
    passwordStrength.classList.add('hidden');
  }

  // Confirm password match
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.classList.remove('hidden');
  } else {
    confirmPasswordError.classList.add('hidden');
  }
});

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Ensure client-side validation before sending to server
  if (!validateEmail(email)) {
    alert('Invalid email format.');
    return;
  }
  
  if (!checkPasswordStrength(password)) {
    alert('Weak password.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Send data to the server using fetch
  fetch('http://localhost:3000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert(data.error);
    } else {
      // Show summary on successful submission
      summaryContent.textContent = `Registration successful! Email: ${data.email}`;
      navigate('summary');  // Navigate to the summary section
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// Client-side routing logic
const routes = {
  form: formSection,
  summary: summarySection,
};

function navigate(route) {
  Object.keys(routes).forEach((key) => {
    routes[key].classList.add('hidden');
  });
  routes[route].classList.remove('hidden');
}
