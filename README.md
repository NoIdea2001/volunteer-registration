# Volunteer Registration Platform

A basic web application built using **Spring Boot**, **Maven**, and **MySQL** that allows users to register, update, and view volunteer data. Includes a simple frontend interface for interacting with the backend API.

---

## 🧾 Features

- Register new volunteers  
- View all volunteers  
- View a specific volunteer by ID  
- View only available volunteers  
- Update volunteer details  
- Delete a volunteer  

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot (Java), Spring MVC, Spring Data JPA  
- **Frontend**: HTML/CSS/JS (e.g., Thymeleaf or static files)  
- **Database**: MySQL  
- **Build Tool**: Maven  

---

## 📦 API Endpoints

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| GET    | `/volunteers`            | Get a list of all volunteers        |
| GET    | `/volunteer/{id}`        | Get a single volunteer by ID        |
| GET    | `/volunteers/available`  | Get all available volunteers        |
| POST   | `/volunteer`             | Add a new volunteer                 |
| PUT    | `/volunteer/{id}`        | Update volunteer details by ID      |
| DELETE | `/volunteer/{id}`        | Delete a volunteer by ID            |

---

## 🧮 Volunteer Data Model

```java
@Entity
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Boolean availability;
}
```

---

## 🖥️ Frontend

The frontend interface allows users to:

- Fill a form to register a volunteer  
- See a list of all volunteers and their availability  
- Update or delete volunteers through buttons or links  

The frontend connects to the backend using REST APIs.

---

## ⚙️ Setup Instructions

### Prerequisites

- Java 17+
- Maven
- MySQL Server

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/volunteer-registration-platform.git
cd volunteer-registration-platform
```

2. **Configure MySQL**

Create a database:

```sql
CREATE DATABASE volunteer_db;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/volunteer_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

3. **Run the application**

```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`.

4. **Access the frontend**

- If you're using static HTML or Thymeleaf, open the homepage at:  
  `http://localhost:8080/`

---

## 📄 License

This project is open-source and available under the MIT License.
