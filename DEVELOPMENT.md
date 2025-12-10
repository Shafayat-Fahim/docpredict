# DocPredict Development Guide

## 📋 Table of Contents
1. [Project Setup](#project-setup)
2. [Architecture Overview](#architecture-overview)
3. [Component Descriptions](#component-descriptions)
4. [How to Extend Features](#how-to-extend-features)
5. [Backend Integration](#backend-integration)
6. [Testing & Deployment](#testing--deployment)

## Project Setup

### Development Environment

1. **Clone and Install**
```bash
git clone https://github.com/Shafayat-Fahim/docpredict.git
cd docpredict
npm install
```

2. **Run Development Server**
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
npm run start
```

## Architecture Overview

### Frontend Stack
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useContext)
- **Routing**: Next.js App Router

### Project Structure
```
src/app/
├── page.tsx                           # Landing page
├── layout.tsx                         # Root layout wrapper
├── globals.css                        # Global Tailwind styles
├── disease-prediction/
│   └── page.tsx                      # Disease prediction feature
├── doctor-recommendation/
│   └── page.tsx                      # Doctor matching feature
└── medical-imaging/
    └── page.tsx                      # Medical imaging analysis
```

## Component Descriptions

### 1. Landing Page (`src/app/page.tsx`)
**Purpose**: Main entry point showcasing all three features

**Key Components**:
- Navigation bar with links
- Hero section with value proposition
- Feature cards with links to each module
- About section explaining the project
- Footer with repository link

**Technologies Used**:
- Next.js Link for client-side navigation
- Tailwind CSS for responsive grid layout
- Gradient backgrounds

### 2. Disease Prediction (`src/app/disease-prediction/page.tsx`)
**Purpose**: Demonstrate ML disease prediction models

**Key Features**:
- Disease selection buttons (Cancer, Heart, Alzheimer's, Chronic)
- Dynamic input fields based on disease type
- Real-time form validation
- Risk score visualization with progress bars
- Model confidence display
- Clinical recommendations

**Data Flow**:
```
User Input → Form Validation → Mock API Call (1.5s delay)
   ↓
Risk Calculation → Results Display
```

**To Add a New Disease**:
1. Edit the `diseases` object in the component
2. Add a new key with disease details
3. Form fields will auto-generate from the `inputFields` array

Example:
```typescript
diabetes: {
  name: 'Diabetes Prediction',
  algorithm: 'Random Forest',
  inputFields: ['Age', 'BMI', 'Blood Sugar', 'Family History'],
  description: 'Predicts diabetes risk...'
}
```

### 3. Doctor Recommendation (`src/app/doctor-recommendation/page.tsx`)
**Purpose**: Showcase recommendation system using filtering algorithms

**Key Features**:
- Multi-select symptom picker
- Dynamic doctor filtering based on symptoms
- Match score calculation
- Doctor rating and review integration
- Appointment availability display

**Filtering Algorithms Demonstrated**:
1. **Collaborative Filtering**: "Patients with similar symptoms saw these doctors"
2. **Content-Based Filtering**: "Your symptoms match this specialty"
3. **Hybrid Approach**: Combines both with ratings

**To Add a New Symptom**:
1. Edit the `availableSymptoms` array
2. It will automatically appear in the UI

**To Add a New Doctor**:
1. Add to the `mockDoctors` array
2. Include: name, specialty, rating, reviews, experience, availableSlots

### 4. Medical Imaging (`src/app/medical-imaging/page.tsx`)
**Purpose**: Demonstrate image analysis using deep learning concepts

**Key Features**:
- Imaging type selection (MRI, CT, X-Ray, PET)
- Image upload with drag-and-drop preview
- AI-powered analysis simulation
- Key findings display
- Model confidence scoring
- Integration pipeline diagram

**Image Analysis Pipeline**:
```
Image Upload → Preprocessing → Feature Extraction
   ↓
Segmentation & Classification → Results Display
```

**To Add a New Imaging Type**:
1. Edit the `imagingTypes` object
2. Add imaging properties and applications

Example:
```typescript
ultrasound: {
  name: 'Ultrasound',
  fullName: 'Ultrasonography',
  description: 'Real-time imaging...',
  applications: ['Fetal imaging', 'Abdominal scanning', ...]
}
```

## How to Extend Features

### Adding API Integration

1. **Create an API route** (in Next.js):
```bash
mkdir -p src/app/api/predict
cat > src/app/api/predict/route.ts << 'EOFAPI'
export async function POST(request: Request) {
  const data = await request.json();
  // Call your ML backend here
  return Response.json({ result: prediction });
}
EOFAPI
```

2. **Update component to use API**:
```typescript
const handlePrediction = async (formData) => {
  const response = await fetch('/api/predict', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  const result = await response.json();
  setResult(result);
};
```

### Integrating Real ML Models

**Option 1: Python Backend (Recommended)**
```
Frontend (Next.js) → Flask/FastAPI Backend → ML Models
```

1. Create Python backend:
```bash
mkdir backend
cd backend
python -m venv venv
pip install flask scikit-learn tensorflow
```

2. Create Flask app:
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

@app.route('/predict/disease', methods=['POST'])
def predict_disease():
    data = request.json
    # Your ML prediction logic
    prediction = model.predict([data['features']])
    return jsonify({'risk': float(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000)
```

3. Update environment variables:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Option 2: TensorFlow.js (In-browser)**
- Install: `npm install @tensorflow/tfjs`
- Load pre-trained models
- Predictions run in the browser

### Adding Database Integration

1. Install ORM (e.g., Prisma):
```bash
npm install @prisma/client
npx prisma init
```

2. Configure `.env` with database URL

3. Create schema in `prisma/schema.prisma`:
```prisma
model Patient {
  id    Int     @id @default(autoincrement())
  name  String
  age   Int
  symptoms String[]
}
```

## Backend Integration

### Recommended Stack for Production

```
Frontend (Next.js)
    ↓ API Calls (fetch/axios)
Backend API (Flask/FastAPI)
    ↓ Model calls
ML Models (scikit-learn, TensorFlow, PyTorch)
    ↓
Database (PostgreSQL)
```

### Python Backend Example Structure

```
backend/
├── app.py
├── models/
│   ├── disease_prediction.py
│   ├── doctor_recommendation.py
│   └── image_analysis.py
├── ml_models/
│   ├── cancer_model.pkl
│   ├── heart_model.pkl
│   └── cnn_imaging_model.h5
└── requirements.txt
```

### API Endpoints to Implement

```
POST /api/predict/disease
  Input: { disease: string, parameters: {} }
  Output: { risk: number, confidence: number, recommendation: string }

POST /api/recommend/doctors
  Input: { symptoms: string[] }
  Output: { doctors: [{ id, name, specialty, matchScore }] }

POST /api/analyze/image
  Input: { imageData: base64, imagingType: string }
  Output: { findings: string[], confidence: number, recommendation: string }
```

## Testing & Deployment

### Local Testing

1. **Visual Testing**:
   - Test all three pages
   - Check form submissions
   - Verify responsive design on mobile

2. **Build Testing**:
```bash
npm run build
npm run start
```

3. **Linting**:
```bash
npm run lint
```

### Deployment Options

**Option 1: Vercel (Recommended - Free for Next.js)**
```bash
npm i -g vercel
vercel login
vercel
```

**Option 2: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Option 3: GitHub Pages / Self-hosted**
- Export static site
- Use Node.js server

### Environment Variables

Create `.env.local` for development:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
DATABASE_URL=postgres://user:password@localhost:5432/docpredict
```

## 📚 Key Concepts to Understand

### Machine Learning Models in Healthcare

1. **Supervised Learning**: Training on labeled medical data
2. **Classification**: Predicting disease presence (yes/no, risk level)
3. **Regression**: Predicting continuous values (risk score 0-100)
4. **Feature Engineering**: Extracting meaningful patterns from patient data

### Recommendation Systems

1. **Collaborative Filtering**: Based on similar users
2. **Content-Based**: Based on feature similarity
3. **Hybrid**: Combination of both
4. **Cold Start Problem**: Handling new users/doctors

### Medical Image Analysis

1. **Preprocessing**: Normalization, noise reduction
2. **Segmentation**: Identifying regions of interest
3. **Classification**: Categorizing findings
4. **Radiomics**: Extracting quantitative features

## 🔧 Troubleshooting

**Port 3000 already in use**:
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Dependencies issues**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**:
```bash
npm run lint
# Fix issues or add // @ts-ignore comments
```

## 📖 Resources for Faculty

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Guide](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ML in Healthcare Papers](https://scholar.google.com)
- [Medical Imaging AI Review](https://arxiv.org)

---

For questions or improvements, please refer to the main README.md and GitHub repository.
