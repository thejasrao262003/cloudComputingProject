# 🌩️ Cloud Computing Project

This repository demonstrates a complete cloud-native web application setup using containerization, orchestration, and CI/CD principles. The project includes a frontend client, a backend server, and NGINX as a reverse proxy—all containerized using Docker and orchestrated using Kubernetes with Jenkins integration for automated deployment.

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (assumed from structure)
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **CI/CD:** Jenkins
- **Reverse Proxy:** NGINX

---

## 📁 Project Structure

```
cloudComputingProject/
├── client/                     # Frontend source code
├── server/                     # Backend source code
├── nginx/                      # NGINX configurations
├── Dockerfile                  # Dockerfile for backend
├── Dockerfile.client           # Dockerfile for frontend
├── docker-compose.yml          # Docker Compose file
├── Jenkinsfile                 # Jenkins pipeline configuration
├── ingress.yml                 # Kubernetes ingress definitions
├── kubernetes_deployment.yaml # Kubernetes deployment resources
├── kubernetes_services.yaml   # Kubernetes service resources
├── nginx.conf                  # NGINX main configuration
└── .DS_Store                   # (Can be ignored)
```

---

## 🚀 Getting Started

### 📦 Prerequisites

- Docker installed
- Kubernetes cluster (e.g., Minikube, Docker Desktop)
- Jenkins for CI/CD

---

### 🛠️ Setup Using Docker Compose

```bash
git clone https://github.com/thejasrao262003/cloudComputingProject.git
cd cloudComputingProject
docker-compose up --build
```

This will build and run both frontend and backend containers locally.

---

### ☸️ Deploy to Kubernetes

```bash
kubectl apply -f kubernetes_services.yaml
kubectl apply -f kubernetes_deployment.yaml
kubectl apply -f ingress.yml
```

Verify everything is running:

```bash
kubectl get all
```

---

### 🔁 CI/CD with Jenkins

1. Create a pipeline job in Jenkins.
2. Connect it to this GitHub repository.
3. Use the provided `Jenkinsfile` for automated build, test, and deployment.

---

## 🌐 NGINX Setup

NGINX serves as a reverse proxy with the following functions:

- Serves the static frontend.
- Routes backend API requests.
- Handles load balancing.

All settings are configured in `nginx.conf`.

---

## 📌 Notes

- Remove `.DS_Store` files if unnecessary.
- Make sure secrets and environment variables are handled securely.
- In production, consider using HTTPS and secret managers.

---

## 📬 Contact

For questions or collaboration, reach out via [GitHub Profile](https://github.com/thejasrao262003).
