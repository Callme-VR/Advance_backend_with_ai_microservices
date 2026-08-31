# 🌐 Phase 3: System Design & Nginx Reverse Proxy (`phase-3-sysDesign`)

Welcome to **Phase 3**! This phase focuses on **System Design**, **Reverse Proxies**, and **Container Orchestration** using **Nginx** and **Docker Compose**.

---

## 🎯 What is a Reverse Proxy?

A **Reverse Proxy** acts as an intermediary server between clients (browsers) and backend services. It provides:
1. **Load Balancing**: Distributing incoming web traffic across multiple backend servers.
2. **Security**: Hiding internal backend IP addresses and server details.
3. **SSL Termination**: Handling HTTPS encryption in one centralized place.

---

## 💡 System Design Architecture

```
[ Client Request ] ---> ( Port 8080 )
                              |
                              v
                  [ Nginx Reverse Proxy Container ]
                              |
                              v
                  [ Internal Backend / Response ]
```

---

## 📂 File Overview

| File | Purpose |
| :--- | :--- |
| [`docker-compose.yml`](file:///d:/Backend_Advanced_Revision/phase-3-sysDesign/docker-compose.yml) | Docker Compose configuration file mapping port `8080` to Nginx container port `80`. |
| [`nginx/nginx.conf`](file:///d:/Backend_Advanced_Revision/phase-3-sysDesign/nginx/nginx.conf) | Nginx configuration file routing incoming HTTP requests. |

---

## ⚙️ How to Run

### Step 1: Start Container with Docker Compose
```bash
docker-compose up --build -d
```

### Step 2: Test Nginx Reverse Proxy
Open your browser or run:
```bash
curl http://localhost:8080
```

**Expected Output:**
```
hello from samsung
```

### Step 3: Stop Container
```bash
docker-compose down
```
