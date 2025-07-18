# OpenMeter Web Interface

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



## Getting Started docker启动

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/openmeter-GUI.git
  docker compose up -d --build

