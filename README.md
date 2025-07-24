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
##  Project Setup Guide
###  Firstly, replace all `process.env` with actual values.
### Secondly
#### frontend 
```bash
cd frontend
npm install
npm run dev
```
#### backend
```bash
cd backend
npm install
npm run start:dev
```
####  Make sure MongoDB is **running locally** (default port: `27017`), or change the URI if using a cloud MongoDB.

## 🎉 Enjoy !


