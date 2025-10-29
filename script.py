#we are creating a script to generate a random password
import random
import string
# Function to generate a random password using letters, digits, and punctuation
def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password
print("Generated Password:", generate_password(16))