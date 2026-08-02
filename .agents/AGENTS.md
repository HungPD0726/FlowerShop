# PetShop Workspace Rules

These guidelines define standard practices, coding styles, and workflow restrictions for the PetShop workspace.

## Coding Style & Standards

### Spring Boot Backend
- Use standard Java 17 syntax and Spring Boot 3 best practices.
- Ensure JPA Entity changes align perfectly with the SQL schemas in [database/](file:///d:/hungProject/Petshop/database/).
- Validate requests at the Controller level using Jakarta Validation annotations (e.g., `@NotNull`, `@Min`).
- All endpoints must support the React client proxy (running on port `8080`).

### React Frontend
- Write functional components with React Hooks (e.g., `useState`, `useEffect`, custom hooks).
- Manage global states (Auth, Cart) using the Context API rather than introducing heavy external state managers.
- Use Tailwind CSS for utility-first styling. Prefer clean, responsive designs.
- Catch API failures in components and display user-friendly error/retry states.

## Database & Environment Management
- The source of truth for the local database lives in the [database/](file:///d:/hungProject/Petshop/database/) directory.
- Always run `powershell -File .\scripts\reset-local-db.ps1` to re-synchronize the database if changes are made to SQL init files.
