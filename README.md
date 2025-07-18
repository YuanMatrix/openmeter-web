# OpenMeter Web Interface GUI 

This is a lightweight frontend visualization tool for monitoring token usage sent to [OpenMeter](https://github.com/openmeterio/openmeter).  
It supports token tracking across text, images, and audio models.



##  Features

- **Real-time token usage monitoring**  
  Monitor incoming token usage events from n8n in real time from OpenMeter.

- **Filter by model type, task, or event**  
  Easily slice data by model (`gpt-4`, `gpt-3`, etc.), event type (`prompt`, `completion`, etc.), or task category.

- **Time window selection**  
  Toggle between hourly, daily, or weekly views for flexible analysis.

-  **Simple and lightweight tech stack**  
  Built with Node.js (backend) and React + Ant Design (frontend) for easy customization and fast iteration.



## 🚀 Getting Started (with Docker)

### 1. Clone this repository

```bash
docker compose up -d --build

2.openmeter 启动的话用 https://github.com/openmeterio/openmeter 可参考官网
git clone git@github.com:openmeterio/openmeter.git
cd openmeter/quickstart
docker compose up -d

