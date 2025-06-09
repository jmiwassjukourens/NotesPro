# Notes Web Application

This is a full stack web application that allows users to create, archive, and filter notes using tags. It is built as a Single Page Application (SPA) with a Spring Boot (Java) backend and an Angular frontend.

---

## Technologies Used

- **Backend**: Java 21, Spring Boot, Spring Data JPA, Spring Security, MySQL
- **Frontend**: Angular 19, TypeScript
- **Database**: MySQL 8+
- **ORM**: Hibernate
- **Build Tools**: Maven
- **Package Manager**: npm 10.9.2
- **Angular CLI**: 19.2.8
- **Node.js**: 22.14.0

---

## 🛠️ How to Run the Application

To run the entire application (backend, frontend, and database setup) with a single command, use the provided script:

```bash
./run.sh

Before running the script, make sure to configure the environment variables at the top of the run.sh (or start.sh) file:

# Database configuration
DB_NAME="notesdb"
DB_USER="root"
DB_PASS="123456"
DB_HOST="localhost"
DB_PORT="3306"

BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

# Path to MySQL executable (adjust this to your OS and MySQL installation)
MYSQL_CMD="/c/Program Files/MySQL/MySQL Server 8.0/bin/mysql.exe"

Make sure the MYSQL_CMD path matches your system's MySQL installation.
On macOS/Linux it might look like /usr/bin/mysql.
The script will:

    Verify or create the database

    Export environment variables used by the backend

    Start the Spring Boot backend

    Install frontend dependencies and serve the Angular app

To stop the app, press CTRL+C.

Default Login Credentials
    If you want to test the login functionality, use the following default user:
        Username: testuser
        Password: test123

Requirements
Before running the app, ensure you have installed the following versions or compatible ones:
    Node.js: 22.14.0
    npm: 10.9.2
    Java: 21
    MySQL: 8+
    Angular CLI: 19.2.8
You can verify your versions by running:
    node -v
    npm -v
    java -version
    mysql --version
    ng version
