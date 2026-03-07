# backend-1st-project
just a tutorial project for now i will just try to learn the most from it

here are some learning nd notes


## Encryption vs Hashing

### Encryption
Encryption converts **plaintext → ciphertext** using an algorithm and a **key**.  
The data can be **decrypted back to its original form**, so encryption is **reversible**.

**Example algorithm:** AES

**Uses**
- Secure data transmission
- Protecting sensitive data
- Communication security

---

### Hashing
Hashing converts data into a **fixed-length hash value** using a hashing algorithm.  
It is **one-way**, meaning the original data **cannot be recovered**.

**Example algorithm:** SHA-256

**Uses**
- Password storage
- Data integrity verification
- Digital signatures

---

### Quick Difference

| Feature | Encryption | Hashing |
|--------|------------|---------|
| Reversible | Yes | No |
| Purpose | Protect data | Store passwords / verify data |