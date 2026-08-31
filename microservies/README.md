# 🏗️ Microservices Architecture (`microservies`)

Welcome to the **Microservices Architecture Module**! This directory outlines the design pattern for decomposing a monolithic application into decoupled, independently deployable microservices.

---

## 🎯 Monolith vs Microservices

| Feature | Monolithic Architecture | Microservices Architecture |
| :--- | :--- | :--- |
| **Codebase** | Single large codebase | Multiple small, focused codebases |
| **Scaling** | Scale the whole application | Scale only services with high traffic |
| **Fault Tolerance**| One bug can crash the entire system | Failure in one service does not crash others |
| **API Entry Point**| Direct route calls | Centralized **API Gateway** |

---

## 💡 Microservices Architecture Diagram

```
                              +---> [ Service A (Auth Service) ]
                              |
[ Client ] ---> [ API Gateway ] ---> [ Service B (User Service) ]
                              |
                              +---> [ Service C (Notification Service) ]
```

---

## 📂 Folder Structure

```
microservies/
├── backend/
│   ├── gateway/        # API Gateway (Handles routing, auth, rate limiting)
│   └── services/       # Independent, decoupled business microservices
├── frentend/           # Client application (React / Vite / Next.js)
└── docker-compose.yml  # Docker Compose file to orchestrate all microservices
```

---

## 🔑 Key Microservices Principles

1. **Decoupled Data**: Each service manages its own database domain.
2. **API Gateway Pattern**: A single entry point routes external client requests to internal services.
3. **Containerized Orchestration**: Docker Compose or Kubernetes coordinates service networking and scaling.
