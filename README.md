# Tech99 Code Challenges

A collection of TypeScript coding challenges and backend service implementations. Each problem is organized in its own folder with dedicated documentation and tests.

## Prerequisites
- Node.js (v20+ recommended)
- npm
- SQLite (for Problem 5)

## Install
From the repository root:
```sh
npm install
```

## Problems

### [Problem 4 — Three ways to sum to n](src/problem4/README.md)

**Algorithm Challenge**: Implementation for the "three ways to sum to n" challenge. Demonstrates algorithmic problem-solving with unit tests verifying correctness.

**Key files:**
- Solution: [src/problem4/index.ts](src/problem4/index.ts)
- Tests: [tests/problem4/problem4.test.ts](tests/problem4/problem4.test.ts)

**Run tests:**
```sh
npm run test
```

---

### [Problem 5 — Resources API](src/problem5/README.md)

**Backend Service**: Small Express + TypeORM service that manages "resources" with full CRUD operations. Demonstrates project organization, modular architecture, and separation of concerns.

**Key features:**
- RESTful API endpoints (Create, Read, Update, Delete)
- TypeORM database integration with SQLite
- Data validation using DTOs
- Error handling middleware
- Database migrations

**Run the server:**
```sh
npm run migration:run  # Run database migrations
npm run problem5      # Start the server
```

---

### [Problem 6 — RFC Scoreboard Module](src/problem6/README.md)

**System Design Document**: RFC-style specification for a real-time scoreboard system. Shows how to design a secure, scalable solution for managing user scores with real-time updates.

**Key concepts:**
- Secure score update API with anti-cheat measures
- Real-time scoreboard updates via WebSocket
- Redis integration for performance optimization
- JWT-based authentication
- Rate limiting and security considerations

**Architecture:**
- Client App → API Gateway → Scoreboard API
- Database for persistent storage
- Redis for caching and pub/sub messaging
- WebSocket (Socket.io) for real-time updates
- Security/Anti-Cheat Module for validation

**Key endpoints:**
- `POST /v1/score/incr/:action_id` - Update score securely
- `WebSocket /ws/scoreboard` - Real-time scoreboard stream

## Notes

- Run all commands from the repository root
- Each problem has its own detailed README with implementation details
- Problem 5 uses SQLite stored at `db.sqlite` in the repo root
- Problem 5 server runs on `http://localhost:PORT` where PORT defaults from env or 0
- See individual problem README files for detailed documentation

## Further Reading

- [Problem 4 Details](src/problem4/README.md)
- [Problem 5 Details](src/problem5/README.md)
- [Problem 6 Details](src/problem6/README.md)
