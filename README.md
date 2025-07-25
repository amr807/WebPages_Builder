# WEBPages Builder 

This project is a full-stack web app that uses Google Gemini AI to generate complete, styled web pages based on user prompts. It includes a NestJS backend for AI integration and storage, and a Next.js frontend for user interaction and previewing generated pages.
---

##  Features

| Feature                       | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
|  AI Page Generation         | Uses Google Gemini API to generate full web pages (HTML, CSS, JS)           |
|  Structured JSON Output     | Returns `html`, `css`, `js`, `title`, and `description`                     |
|  MongoDB Storage            | Saves all generated pages using Mongoose                                    |
|  Next.js Live Preview       | View and interact with the generated web page in real time                  |
| Strict Prompting           | Enforces structured and safe responses from the AI                          |
| Scalable Architecture      | Built with NestJS and Next.js for maintainability and scalability           |

---
##  Tech Stack
| Layer      | Technology           |
|------------|----------------------|
|  Frontend   | **Next.js**, TypeScript  |
|  Backend    | **NestJS**, TypeScript   |
|  AI Engine  | **Google Gemini API**    |
| Database   | **MongoDB**    |
---
## Demo



https://github.com/user-attachments/assets/b501d0b4-a12e-4bc2-a5c4-c905611a84ee



---
##  Project Setup Guide
### Step 1: Replace all `process.env` references with actual values or define them in `.env` files.

###  Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
###  Step 3: backend Setup

#### backend
```bash
cd backend
npm install
npm run start:dev
```
---
#### ⚠️⚠️ Make sure MongoDB is **running locally** (default port: `27017`), or change the URI if using a cloud MongoDB.

## 🎉 Enjoy !


