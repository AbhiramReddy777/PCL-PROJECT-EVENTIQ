# PCL-PROJECT-EVENTIQ
**AI-based event planning system that generates personalized event plans based on user preferences such as budget, location, and event type.**
# EventIQ — AI-Powered Event Planner 🎉

> Plan any event, beautifully. An AI-powered event planning assistant tailored for India, with cost breakdowns, vendor tips, and saved plans.

![EventIQ Banner](https://img.shields.io/badge/EventIQ-AI%20Event%20Planner-0071e3?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

- 🤖 **AI Chat Assistant** — Conversational event planning powered by Claude (Anthropic)
- 💰 **Cost Breakdowns** — Detailed, city-specific budget estimates for any event type
- 🏙️ **City-Aware** — Supports 10+ major Indian cities with localised pricing
- 💾 **Save Plans** — Authenticated users can save, view, and manage plans
- 📄 **PDF Export** — Export event plans as downloadable PDFs
- 🔐 **Auth System** — JWT-based login & signup
- 📱 **Responsive UI** — Clean Apple-inspired design that works on all screen sizes

---

## 🗂️ Project Structure

```
eventiq/
├── frontend/
│   └── index.html          # Single-page frontend (vanilla HTML/CSS/JS)
├── backend/
│   ├── server.js           # Express app entry point
│   ├── routes/
│   │   ├── auth.js         # POST /api/auth/login, /api/auth/signup
│   │   ├── chat.js         # POST /api/chat
│   │   ├── plans.js        # GET/POST/DELETE /api/plans
│   │   └── export.js       # GET /api/plans/:id/export
│   ├── models/
│   │   ├── User.js         # Mongoose User schema
│   │   └── Plan.js         # Mongoose Plan schema
│   └── middleware/
│       └── auth.js         # JWT verification middleware
├── .env                    # Environment variables (see below)
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- [Anthropic API key](https://console.anthropic.com/) for Claude

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/eventiq.git
cd eventiq
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the **root** of the project:

```env
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventiq?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### 4. Run the App

```bash
node backend/server.js
```

The app will be available at **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/signup` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Log in and receive JWT |
| `POST` | `/api/chat` | Optional | Send a message to the AI assistant |
| `GET` | `/api/plans` | ✅ | Fetch all saved plans for the user |
| `POST` | `/api/plans` | ✅ | Save a new plan |
| `DELETE` | `/api/plans/:id` | ✅ | Delete a saved plan |
| `GET` | `/api/plans/:id/export` | ✅ | Export a plan as PDF |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| AI | Anthropic Claude API |
| Auth | JSON Web Tokens (JWT) + bcrypt |
| PDF Export | (your PDF library, e.g. `pdfkit`) |
| Fonts | Google Fonts — DM Sans, DM Serif Display |

---

## 🌆 Supported Cities

Mumbai · Delhi · Bangalore · Hyderabad · Chennai · Kolkata · Pune · Ahmedabad · Jaipur · Lucknow

---

## 💡 Example Prompts

- *"Plan a birthday party for 50 guests with a budget of ₹80,000 in Mumbai."*
- *"Plan a wedding for 200 guests in Delhi with a budget of ₹15 lakhs."*
- *"Plan a corporate team outing for 30 employees with a budget of ₹1.5 lakhs."*
- *"Plan a house party for 25 friends on a budget of ₹15,000 in Bangalore."*

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** before storage
- All protected routes require a valid **JWT Bearer token**
- Helmet.js is used for HTTP security headers
- `.env` secrets are never exposed to the frontend

---

## 🧩 Extending EventIQ

**Add a new city:** Update the `<select>` in `frontend/index.html` and adjust your Claude system prompt to handle city-specific pricing.

**Add event types:** Add new `.chip` buttons in the hero section or `.info-card` elements in the info grid.

**Customise the AI:** Modify the system prompt in `backend/routes/chat.js` to change the AI's personality, output format, or cost categories.

---

## 📦 Deployment

### Deploy to Render / Railway / Fly.io

1. Push your code to GitHub
2. Connect your repo to [Render](https://render.com) or [Railway](https://railway.app)
3. Set all environment variables from your `.env` in the platform's dashboard
4. Set the start command to: `node backend/server.js`

### Deploy Frontend Separately (Optional)

The `frontend/` folder is plain HTML — you can host it on **Vercel**, **Netlify**, or **GitHub Pages**, pointing `API_BASE` in `index.html` to your deployed backend URL.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Anthropic](https://www.anthropic.com/) for the Claude API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the free database tier
- [Google Fonts](https://fonts.google.com/) for DM Sans & DM Serif Display

---

<p align="center">Made with ❤️ for event planners across India</p>
