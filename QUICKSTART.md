# DocPredict - Quick Start Guide

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Go to [http://localhost:3000](http://localhost:3000)

---

## 📱 Three Main Features

| Feature | Route | Description |
|---------|-------|-------------|
| 🔬 Disease Prediction | `/disease-prediction` | ML models for predicting disease risk |
| 👨‍⚕️ Doctor Recommendation | `/doctor-recommendation` | AI-powered doctor matching system |
| 🖼️ Medical Imaging | `/medical-imaging` | Image analysis with deep learning concepts |

---

## 💡 Demo Features

### Disease Prediction
- Select a disease type (Cancer, Heart, Alzheimer's, Chronic)
- Enter patient parameters
- Get AI-powered risk predictions with confidence scores

### Doctor Recommendation
- Select your symptoms
- Get ranked list of doctors based on:
  - Specialty matching
  - User ratings
  - Experience level
  - Available appointments

### Medical Imaging Analysis
- Upload medical images (supports all formats)
- Select imaging type (MRI, CT, X-Ray, PET)
- Get AI analysis results with findings and recommendations

---

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm start            # Run production build

# Linting
npm run lint         # Check code quality

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push origin main # Push to GitHub
```

---

## 📁 Key Files to Edit

- **Add Disease**: Edit `src/app/disease-prediction/page.tsx` → `diseases` object
- **Add Symptom**: Edit `src/app/doctor-recommendation/page.tsx` → `availableSymptoms` array
- **Add Imaging Type**: Edit `src/app/medical-imaging/page.tsx` → `imagingTypes` object
- **Styling**: Edit `src/app/globals.css` or Tailwind classes in components

---

## 🔗 Links

- **Repository**: https://github.com/Shafayat-Fahim/docpredict
- **Documentation**: See README.md
- **Development Guide**: See DEVELOPMENT.md

---

## ⚡ Quick Tips

1. **Hot Reload**: Changes auto-refresh in browser (except layout.tsx)
2. **Console Errors**: Check browser console (F12) and terminal
3. **TypeScript**: Get IDE autocomplete for better development
4. **Tailwind**: Use utility classes for styling (no need for CSS files)
5. **Components**: All pages are "use client" - client-side rendered

---

## 🎯 Next Steps

1. Run the app locally
2. Explore all three features
3. Read DEVELOPMENT.md for integration with real ML models
4. Customize with your own data and models
5. Deploy to Vercel or your hosting provider

---

Happy coding! 🎉
