# UNIVERSITY TIMETABLE 

A full-stack web application dedicated to viewing university timetables, built with **Spring Boot** on the backend and **React (TypeScript)** on the frontend.

The project puts a strong emphasis on **security**, utilizing an authentication mechanism based on **JWT stored in `HttpOnly` Cookies** and a strict Role-Based Access Control system.

---

## Tech Stack 

- **Core Framework:** Java 17 / Spring Boot 3.x
- **Security:** Spring Security, JWT (JSON Web Tokens - `jjwt`), BCrypt Password Hashing
- **Persistence & Database:** Spring Data JPA, Hibernate, MariaDB
- **Architecture:** Layered Architecture (Controller -> Service -> Repository -> Entity)
- **API Communication:** RESTful API, DTOs (Data Transfer Objects), CORS Configuration
- **Frontend:** React, TypeScript, Chakra UI
---

## Security & Authentication

1. **JWT via HttpOnly Cookies:**
   * Upon successful authentication (`POST /api/auth/login`), the server generates a JWT token containing the user's `username` and `role`.
   * The token is securely transmitted to the client via an **HttpOnly Cookie** (`jwt`)

2. **Custom Authentication Filter (`JwtFilter`):**
   * Extends `OncePerRequestFilter` to intercept every HTTP request.
   * Extracts the token directly from request cookies and validates it via `JwtService` 
   * Ensures compatibility with Spring Security rules by dynamically applying the `ROLE_` prefix to token roles.

3. **Role-Based Access Control:**
   * **`STUDENT` / `PROFESSOR` / `MANAGER`**: Currently, all authenticated users have read-only access (`GET`) to view timetable and user data.
   * **Planned Features (`MANAGER`)**: Write and update permissions (`POST`, `PUT`, `DELETE`) are planned for future releases, allowing managers to add and manage students, professors, and schedule entries.
   * **Public Routes**: Exclusively authentication endpoints (`/api/auth/**`).

---

## Main RESTful Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticates user and sets the `jwt` cookie | Public |
| `POST` | `/api/auth/logout` | Invalidates the `jwt` cookie | Public |

### Timetable Activity Management (`/activity`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/activity/group/{groupId}` | Fetches activities for a specific group | Authenticated |

### Student Management (`/student`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/student/all` | List of all students | Authenticated |
| `GET` | `/student/{id}/courses/{day}` | Fetches a student's activities for a specific day | Authenticated |
| `POST` | `/student/add` | Adds a new student | `MANAGER` |

### Professor Management (`/professor`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/professor/all` | List of all professors | Authenticated |
| `POST` | `/professor/add` | Adds a new professor | `MANAGER` |

---

## Backend Configuration & Setup

### Prerequisites
* Java 17+ Installed
* Maven 3.8+
* MariaDB Server (managed via HeidiSQL or standard service)

### Step 1: Database & `application.properties` Setup
1. Open **HeidiSQL**, create the database, and import the initial demo data:
   ```sql
   CREATE DATABASE adservio;
Configure your database connection in src/main/resources/application.properties:

**Properties**
 * spring.datasource.url=jdbc:mysql://localhost:3306/adservio?useSSL=false&serverTimezone=UTC
 * spring.datasource.username=root
 * spring.datasource.password=your_db_password

 * spring.jpa.hibernate.ddl-auto=update
 * spring.jpa.show-sql=true

### Step 2: Build & Run the Backend (Spring Boot)
Open a terminal in the root directory of the project and run:

Windows (CMD / PowerShell):
.\mvnw.cmd spring-boot:run

Linux / macOS (Bash): 
./mvnw spring-boot:run

The backend API will start on http://localhost:8080.

### Step 3: Frontend Setup & Execution (React)
Open a separate terminal window, navigate to the frontend directory, install dependencies, and start the development server:

* npm install
* npm run dev

The application UI will be available at http://localhost:5173.
