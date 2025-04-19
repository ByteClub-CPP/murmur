# 🫧 Murmur

**Murmur** is a real-time support tool for caregivers of neurodivergent children. It guides users through emotionally intense moments by helping them identify situational context and receive trauma-informed, empathetic responses generated via AI.

---

## 🧠 Purpose

Murmur aims to improve caregiver-child communication by:
- Guiding caregivers through structured prompts
- Generating helpful, real-time language and behavioral insights using LLMs
- Supporting co-regulation and empathy during difficult moments

---

## 🧱 Tech Stack

### 🖥️ Frontend (`console/`)
- **React** with **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (for API requests)

### 🔧 Backend (`server/`)
- **Python** + **FastAPI**
- **OpenAI API** for LLM prompts and responses

### 📦 Database & Realtime Features
- **Firebase** for authentication (if implemented)
- **Firestore** for storing:
  - Onboarding context (`BaseContext`)
  - Situational session data (`SituationalContextTree`)
  - Optional saved responses (“Toolkit”)
- **Realtime updates** via Firestore for chat-style loop (if used)

---
