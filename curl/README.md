## Description
This is a `Post Quantum Cryptography` tool,
using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Pre-requisite
[Node.js](#https://nodejs.org/en/download) (includes npm) have to be installed on your system in order to run this project.

## Installation
1. To start, clone the qujata repository:
```bash
git clone https://github.com/atisorg/qujata.git
cd qujata/curl
```
2. Install dependencies:
```bash
npm install
```
3. Run the application:
```bash
npm run start
```

4. Application is available now in: `http://localhost:3010`, curl example:
```bash
curl --location 'http://localhost:3010/curl' \
--header 'Content-Type: application/json' \
--data '{
    "algorithm": "kyber512",
    "iterationsCount": 5
}'
```

5. Running unit test:
```bash
npm run test -- --coverage
```
