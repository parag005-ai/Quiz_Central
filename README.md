# 🎓 Quiz Central

> An AI-powered secure online quiz platform for teachers and students

## 📖 Overview

Quiz Central is a full-stack web application that enables teachers to create, manage, and analyze quizzes with AI-powered question generation. Students can take quizzes, view results, and track their progress — all within a secure, modern interface.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Quiz Generation** | Generate quiz questions automatically from study materials using Google Gemini / Groq |
| 📝 **Quiz Management** | Create, edit, and organize quizzes with multiple question types |
| 📊 **Analytics Dashboard** | View detailed performance analytics and quiz statistics |
| 🔐 **Secure Authentication** | JWT-based auth with Google OAuth, OTP verification, and role-based access |
| 📄 **Study Material Upload** | Upload PDFs and documents (via AWS S3) to generate questions from |
| 📧 **Email Notifications** | Automated email via Resend/Nodemailer for OTP and notifications |
| 👩‍🏫 **Teacher & Student Roles** | Separate dashboards and permissions for teachers and students |
| 🚀 **Production Ready** | Deployed on Render with MongoDB Atlas |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | CSS (globals.css) |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT (jose), bcrypt, Google OAuth |
| **AI/ML** | Google Gemini (`@google/genai`), Groq SDK |
| **File Storage** | AWS S3 |
| **Email** | Resend, Nodemailer |
| **Document Parsing** | pdf-parse, Mammoth (DOCX) |
| **Validation** | Zod |
| **Deployment** | Render |

## 📁 Project Structure

```
quiz_app/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   │   ├── attempts/       # Quiz attempt endpoints
│   │   ├── auth/           # Authentication endpoints
│   │   ├── quizzes/        # Quiz CRUD endpoints
│   │   ├── study-material/ # Study material upload/processing
│   │   └── users/          # User management endpoints
│   ├── account/            # Account settings page
│   ├── analytics/          # Analytics dashboard
│   ├── auth/               # Login / signup pages
│   ├── create/             # Quiz creation page
│   ├── dashboard/          # Main dashboard
│   ├── edit/               # Quiz editing page
│   ├── quiz/               # Quiz taking page
│   ├── results/            # Results viewing page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── auth/               # Auth-related components
│   ├── dashboard/          # Dashboard components
│   ├── filters/            # Filter components
│   ├── layout/             # Layout components
│   ├── navigation/         # Navigation components
│   ├── quiz/               # Quiz components
│   ├── results/            # Results components
│   └── teacher/            # Teacher-specific components
├── lib/                    # Utility libraries
│   ├── auth.ts             # Auth helpers (server)
│   ├── auth-client.ts      # Auth helpers (client)
│   ├── dbConnect.ts        # MongoDB connection
│   ├── mailer.ts           # Email utilities
│   ├── quiz-utils.ts       # Quiz helper functions
│   ├── s3.ts               # AWS S3 utilities
│   └── validators.ts       # Input validation
├── models/                 # Mongoose schemas
│   ├── Attempt.ts          # Quiz attempt model
│   ├── Otp.ts              # OTP verification model
│   ├── Quiz.ts             # Quiz model
│   ├── StudyMaterial.ts    # Study material model
│   └── User.ts             # User model
├── middleware.ts            # Next.js middleware (auth guards)
├── render.yaml              # Render deployment config
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **MongoDB** (local or Atlas)
- API keys for: Google Gemini, AWS S3, Resend (or SMTP credentials)

### Installation

```bash
# Clone the repository
git clone https://github.com/parag005-ai/Quiz_Central.git
cd quiz_app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# AI Services
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key       # optional

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket
AWS_REGION=your_aws_region

# Email
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Teacher Access
TEACHER_INVITE_CODE=your_invite_code
```

### Run Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```
Contributers=>
Parag Patil(https://github.com/parag005-ai) , 
Ayush Nirmal(https://github.com/ayushnirmal13)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---


Built with ❤️ using Next.js, MongoDB, and AI
