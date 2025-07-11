# 🧠 Developer Forum – Devorum

A full-stack **developer forum system** built as a university project, following **microservices architecture**. It enables developers to create communities, share knowledge through posts, collaborate in real-time using **live coding with chat & voice call**, and interact via a modern, user-friendly web interface.

## 🚀 Features

- 📝 **Post Management**: Create, edit, and view community posts.
- 👥 **Community Interaction**: Create and join developer communities.
- 💬 **Live Chat & Voice Call**: Real-time communication for live coding sessions.
- 💻 **Online Code Compilation**: Code, compile, and share directly in the browser.
- 🔒 **User Moderation**: Flagging, reporting, and managing user violations.
- 🛠 **Admin Controls**: Administrative tools for managing users and communities.
- 📊 **Analytics & Recommendation**: Content personalization using Recombee.

---

## 🧩 Architecture

The system is built using **microservices**, orchestrated with **Docker Compose**, and communicates asynchronously through **RabbitMQ**. Each service handles a dedicated responsibility (e.g., post service, auth service, moderation, etc.), enabling scalability and independent deployment.

```plaintext
Frontend (Next.js)
    ↓ API Calls
Backend Gateway (Node.js)
    → Auth Service
    → Post Service
    → Community Service
    → Chat/Live Session Service
          ↔ RabbitMQ ↔ Other services
Database: MongoDB (via Mongoose)
Recommendation: Recombee
Media/Storage: AWS
