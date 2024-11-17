# 🌍 EcoScan - Clothing Carbon Footprint Scanner

## 💜 Overview
EcoScan is a mobile application designed to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. This project demonstrates a full-stack solution for a green initiative product.

---

## 🔧 Tech Stack
- **Frontend**: React Native (Expo or CLI)
- **Backend**: Node.js with Express (or your preferred backend framework)
- **Image Recognition**: GPT-4 Vision API (or mock function for development)
- **Database**: [Optional, MongoDB/MySQL/PostgreSQL]
- **Deployment**: [Insert details, e.g., Vercel, AWS, Heroku]

---

## 🚀 Setup Instructions

### Clone the Repository
First, clone the repository and navigate into the project directory:
```bash
git clone https://github.com/your-username/eco-scan-challenge.git
cd eco-scan-challenge
```

---

### ⚙️ Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder:
   ```bash
   touch .env
   ```
   Add the following variables to your `.env` file:
   ```
   PORT=8000
   GPT4_API_KEY=your_openai_api_key
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

5. **API Endpoints**:
   - `/api/images/analyze` - Accepts an image and returns carbon footprint analysis.
   - `/api/eco-score/calculate` - Calculates eco-score based on total carbon footprint.
   - `/api/offers/top` - Retrieves top offers based on reward points.

---

### 📱 Mobile App Setup

1. Navigate to the `ecoscanapk` folder:
   ```bash
   cd ecoscanapk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add a `src/config/index.js` file:
   ```javascript
   const BACKEND_URL = 'http://<your-local-ip>:8000';
   export default BACKEND_URL;
   ```

4. Start the React Native development server:
   - For CLI:
     ```bash
     npx react-native run-android   # Android
     npx react-native run-ios       # iOS
     ```

5. Connect a physical device or simulator to test the app.

---

## 🌱 Carbon Score Assumptions

To calculate the environmental impact of each clothing item, we have assigned approximate carbon scores based on item type. These scores are stored in an in-memory dictionary for quick access.

| 👕 Item       | 🌍 Estimated Carbon Score (kg CO₂) |
|--------------|------------------------------------|
| T-shirt      | 7                                  |
| Jeans        | 12                                 |
| Jacket       | 15                                 |
| Shoes        | 8                                  |

---

## 🌟 Product & Technical Enhancements

In this section, suggest possible improvements that could make **EcoScan** a more effective and scalable solution.

1. **Scaling**: 🌐 The backend can be optimized for a large user base by implementing techniques like caching frequently accessed data, using a content delivery network (CDN) for static assets, and horizontally scaling the backend using load balancers. Database indexing and optimizing queries will also be crucial for efficient data retrieval.

2. **Enhanced Eco-Score Model**: 📊 The carbon scoring model could be made more accurate by incorporating detailed data such as the type of fabric (e.g., cotton, polyester), brand-specific information about production practices, and garment condition (e.g., new vs. second-hand). External data from suppliers or sustainability indexes could also enhance the scoring.

3. **User Experience Improvements**: ✨ Additional features like sustainability comparisons between clothing items, suggestions for eco-friendly alternatives, or a visual representation of users' cumulative environmental savings could be added to enhance user engagement. Interactive infographics or educational content about sustainable practices could also enrich the user experience.

4. **API Integrations**: 🔌 Integration with external APIs, such as sustainability data providers or fashion databases, could provide real-time information and make the carbon scoring model more robust. APIs that offer insights into production processes or certifications could add credibility and depth to the eco-score calculations.

---

### Thank you for building a greener future with EcoScan! 🌍💚

