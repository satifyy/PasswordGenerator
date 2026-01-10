# Password Generator

A simple and efficient Python script to generate secure random passwords.

## Description

This Password Generator creates cryptographically secure random passwords using a combination of uppercase letters, lowercase letters, digits, and special characters. The script is designed to be lightweight and easy to use, making it perfect for quickly generating strong passwords for various applications.

## Features

- Generates random passwords with customizable length
- Includes a mix of:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&*(), etc.)
- Simple and easy to use
- No external dependencies required

## Requirements

- Python 3.x

## Installation

1. Clone the repository:
```bash
git clone https://github.com/satifyy/PasswordGenerator.git
```

2. Navigate to the project directory:
```bash
cd PasswordGenerator
```

## Usage

Run the script directly from the command line:

```bash
python3 script.py
```

By default, the script generates a 16-character password. Example output:
```
Generated Password: T0zM:?WT(c)kv*6`
```

### Customizing Password Length

You can modify the password length by editing the `script.py` file and changing the parameter in the function call:

```python
print("Generated Password:", generate_password(16))  # Change 16 to your desired length
```

Or use the function in your own Python scripts:

```python
from script import generate_password

# Generate a 12-character password (default)
password = generate_password()
print(password)

# Generate a 20-character password
password = generate_password(20)
print(password)
```

## How It Works

The script uses Python's built-in `random` and `string` modules to:
1. Create a character pool from all ASCII letters, digits, and punctuation
2. Randomly select characters from this pool
3. Combine them to form a secure password of the specified length

## Security Note

This generator uses Python's `random` module, which is suitable for most password generation needs. For cryptographically sensitive applications, consider using `secrets` module instead of `random`.

## License

This project is open source and available for anyone to use and modify.

## Contributing

Feel free to fork this repository and submit pull requests with improvements or additional features.
