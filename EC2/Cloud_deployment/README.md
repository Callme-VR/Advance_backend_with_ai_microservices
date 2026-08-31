# ☁️ AWS EC2 Cloud Deployment (`EC2/Cloud_deployment`)

Welcome to the **AWS EC2 Cloud Deployment** module! This guide explains how to package a Node.js/Bun Express backend into a Docker container and deploy it onto an **AWS EC2 (Elastic Compute Cloud)** virtual machine instance.

---

## 🎯 What is AWS EC2?

**Amazon EC2** provides scalable virtual servers in the cloud. Containerizing your app with Docker ensures that it runs identically on your local machine and on AWS EC2 instances.

---

## 📂 File Overview

| File | Description |
| :--- | :--- |
| [`index.ts`](file:///d:/Backend_Advanced_Revision/EC2/Cloud_deployment/index.ts) | Express app with `/` and `/deploy` health check routes. |
| [`Dockerfile`](file:///d:/Backend_Advanced_Revision/EC2/Cloud_deployment/Dockerfile) | Docker image creation instructions using Bun base image. |
| [`package.json`](file:///d:/Backend_Advanced_Revision/EC2/Cloud_deployment/package.json) | Package dependencies and runtime scripts. |

---

## ⚙️ Local Setup & Docker Testing

### 1. Install Dependencies
```bash
bun install
```

### 2. Run Local Development Server
```bash
bun start index.ts
```
> Server runs on port `4500` (or `PORT` defined in environment).

### 3. Build & Test Docker Image Locally
```bash
# Build Docker Image
docker build -t ec2-backend .

# Run Docker Container
docker run -p 4500:4500 ec2-backend
```

---

## 📡 Endpoints

- `GET /` -> Returns `"All good from Ec2 server"`
- `GET /deploy` -> Returns `"Hello Vishal From EC2 server!"`

---

## 🚀 AWS EC2 Deployment Guide

1. **Launch EC2 Instance**: Start an AWS EC2 instance (e.g. Ubuntu 22.04 LTS).
2. **Configure Security Group**: Inbound Rules -> Allow custom TCP Port `4500` (or Port `80`/`443`) and SSH Port `22`.
3. **SSH into EC2 Instance**:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```
4. **Install Docker on EC2**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   sudo systemctl start docker
   ```
5. **Clone & Run App on EC2**:
   ```bash
   git clone <your-repo-url>
   cd EC2/Cloud_deployment
   sudo docker build -t ec2-backend .
   sudo docker run -d -p 4500:4500 ec2-backend
   ```
6. **Access App via EC2 Public IP**:
   ```bash
   curl http://<your-ec2-public-ip>:4500/deploy
   ```
