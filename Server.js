const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Server-side validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!checkPasswordStrength(password)) {
    return res.status(400).json({ error: 'Weak password.' });
  }

  // Log data to the terminal
  console.log(`Email: ${email}, Password: ${password}`);

  // Return success response
  res.json({ message: 'Form submitted successfully.', email });
});

// Email validation function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Password strength validation function
function checkPasswordStrength(password) {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return strongPassword.test(password);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
