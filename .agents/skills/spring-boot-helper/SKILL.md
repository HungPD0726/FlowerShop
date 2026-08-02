---
name: spring-boot-helper
description: Guidelines and helper instructions to build, run, test and debug the Spring Boot backend application for Flower Shop.
---
# Spring Boot Developer Helper Skill

Use this skill when working on the Spring Boot backend (`backend`).

## Environment & Tech Stack
- **Language/Framework**: Java 21, Spring Boot 3.2.5, Maven.
- **Database**: Microsoft SQL Server (`flower_shop_db`, sa / 123456).
- **Migration**: Flyway DB Migrations (`db/migration/V1` to `V9`).
- **Security**: JWT Authentication & Refresh Token storage.

## Startup & Build Operations
Execute commands inside `backend` directory:

1. **Build and Run Backend**:
   ```powershell
   cd backend
   mvn spring-boot:run
   ```
2. **Server Endpoint**:
   - REST API Base URL: `http://localhost:8080/api/v1`
   - Swagger Documentation: `http://localhost:8080/swagger-ui.html`

## Database & Environment Configuration
Loaded via `backend/src/main/resources/application.yml` or environment variables:
- `DB_HOST` (default: `localhost`), `DB_PORT` (default: `1433`), `DB_NAME` (`flower_shop_db`)
- `DB_USERNAME` (`sa`), `DB_PASSWORD` (`123456`)

## Feature Scope
- **Active Scopes**:
  - Authentication (JWT + Refresh Token, Register, Login, Logout, Change Password).
  - Category & Product Management (Search Specification, Variant selector, Soft delete, Restore).
  - Cart Management & Sync on login.
  - Order Management (`@Transactional` stock deduction, 7 status transitions, Order code `FLW-YYYYMMDD-XXXX`, Inventory audit trail).
  - Admin Dashboard KPI Analytics.
  - Coupon management & Product reviews.
