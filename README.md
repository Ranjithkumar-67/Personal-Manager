# 📱 Personal Manager - Indian Edition

A comprehensive Progressive Web App (PWA) for managing finances, tasks, notes, goals, and habits. Built specifically for Indian users with ₹ (Rupee) currency support, modern glassmorphism design, and 3D interactive elements.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.2-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

### 💰 Finance Management
- Track income and expenses with Indian Rupee (₹) formatting
- Monthly budget tracking with circular progress indicator
- Categorized expenses (Food, Transport, Utilities, Investment, etc.)
- Real-time balance calculations
- Export data to CSV/TXT formats

### 📝 Notes
- Notion-style note-taking interface
- Emoji icons for visual organization
- Personal and Official categorization
- Rich text content support
- Export functionality

### ✅ Tasks
- Task management with due dates and times
- Browser notification reminders (5 minutes before due)
- Category-based organization
- Completion tracking
- Separate views for pending and completed tasks

### 🎯 Goals
- Visual progress tracking with percentage bars
- Easy progress updates (+10% / -10% buttons)
- Achievement celebrations at 100%
- Export goal data

### 🔥 Habits
- Daily habit tracking
- Streak counting with fire emoji
- Milestone celebrations (7-day, 30-day streaks)
- Simple toggle interface

### 🎨 Design Features
- **Glassmorphism UI**: Frosted glass navigation with backdrop blur
- **3D Interactive Cards**: Mouse-tracking tilt effects on all cards
- **Dark/Light Theme**: Beautiful themes with smooth transitions
- **Mobile-First**: Optimized for mobile devices (max-width: 448px)
- **Smooth Animations**: Page transitions and hover effects
- **Color-Coded Navigation**: Each section has its own color scheme

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (for version control)

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/personal-manager-app.git
   cd personal-manager-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)
   - If it doesn't open automatically, navigate to the URL manually

---

## 📦 Building for Production

### Build the App
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Test Production Build Locally
```bash
# Install serve globally (one time only)
npm install -g serve

# Serve the build folder
serve -s build
```

---

## 🌐 Deploying to GitHub Pages

### Step 1: Update package.json
Open `package.json` and update the `homepage` field:
```json
"homepage": "https://yourusername.github.io/personal-manager-app"
```
Replace `yourusername` with your GitHub username.

### Step 2: Deploy
```bash
npm run deploy
```

This will:
1. Build your app
2. Create/update the `gh-pages` branch
3. Push the build to GitHub Pages

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select `gh-pages` branch
5. Click **Save**

Your app will be live at: `https://yourusername.github.io/personal-manager-app`

---

## 📂 Project Structure

```
personal-manager-app/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/
│   │   ├── Icons.js        # All SVG icon components
│   │   ├── LoginScreen.js  # Login page
│   │   ├── Navigation.js   # Top & bottom navigation
│   │   ├── HomePage.js     # Dashboard/home page
│   │   ├── NotesPage.js    # Notes management
│   │   ├── TasksPage.js    # Tasks management
│   │   ├── GoalsPage.js    # Goals tracking
│   │   ├── HabitsPage.js   # Habits tracking
│   │   ├── SettingsPage.js # Settings & account
│   │   └── Modals/
│   │       ├── AddExpenseModal.js
│   │       ├── AddNoteModal.js
│   │       ├── AddTaskModal.js
│   │       ├── AddGoalModal.js
│   │       ├── AddHabitModal.js
│   │       └── ResetDialog.js
│   ├── utils/
│   │   ├── constants.js    # App constants (quotes, categories)
│   │   ├── exportUtils.js  # CSV/TXT export functions
│   │   └── helpers.js      # Helper functions
│   ├── App.js              # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.js            # App entry point
│   └── index.css           # Global styles + Tailwind
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # This file
```

---

## 🎯 Usage Guide

### Login
- **User ID**: Enter any ID with 2+ characters
- **PIN**: Enter any PIN with 4+ digits
- No backend authentication - all data stored locally

### Adding Data
- Use the **+Add** buttons on each page
- All forms have validation
- Data saves automatically to localStorage

### Expense Categories
The app includes Indian-specific categories:
- **Food**: Morning, Afternoon, Night
- **Transport**: Train, Bus, Bike, Auto, Cab
- **Utilities**: Electricity, Water, Gas, Internet
- **Mobile**: Recharge, Bill, DTH/Cable
- **Groceries**: Monthly, Vegetables, Dairy, Fruits
- **Investment**: SIP, Gold, Chit Fund, Stocks, Mutual Funds
- **Health**: Insurance, Medicine, Checkup, Doctor
- **Others**: Shopping, Entertainment, Education, Rent, Custom

### Exporting Data
- Click the **Download** or **File** icons on any page
- Choose between CSV (for spreadsheets) or TXT (human-readable)
- Files download with timestamp

### Resetting Dashboard
- Click **Reset** button on home page
- Choose to keep current salary limit or set new one
- **Warning**: This permanently deletes all data

### 3D Effects
- Hover over any card to see 3D tilt effect
- Effect responds to mouse movement
- Works best on desktop/laptop

---

## 🔒 Privacy & Data

- **100% Local Storage**: All data stored in your browser
- **No Backend**: No servers, no databases, no tracking
- **No Data Collection**: Zero data leaves your device
- **No Account Required**: Simple ID/PIN for access
- **Export Anytime**: Full data export capability

---

## 🛠️ Technologies Used

- **React 18.2.0** - UI library
- **Tailwind CSS 3.3.2** - Utility-first CSS framework
- **Local Storage API** - Browser data persistence
- **Notification API** - Task reminders
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS3 Animations** - Smooth transitions and effects

---

## 📱 PWA Features

- **Installable**: Add to home screen on mobile
- **Offline Ready**: Works without internet (after first load)
- **Fast Loading**: Optimized performance
- **Responsive**: Works on all screen sizes
- **App-like Feel**: Fullscreen, no browser chrome

---

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Changing Default Salary
Edit `src/utils/constants.js`:
```javascript
export const defaultSettings = {
  monthlySalary: 50000, // Change this value
  monthlyLimit: 50000,
  income: 50000
};
```

### Adding More Quotes
Edit the `quotes` array in `src/utils/constants.js`

---

## 🐛 Troubleshooting

### npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### App doesn't start
- Check if port 3000 is already in use
- Try: `PORT=3001 npm start`

### Build fails
- Ensure all dependencies are installed
- Check for JavaScript errors in console
- Try: `npm run build --verbose`

### Deployment issues
- Verify `homepage` in package.json is correct
- Check GitHub Pages settings in repository
- Wait 2-3 minutes after deploy for changes to appear

### 3D effects not working
- Enable hardware acceleration in browser
- Update browser to latest version
- Check if CSS transforms are supported

---

## 📈 Future Enhancements

- [ ] Cloud sync option
- [ ] Multi-user support
- [ ] Advanced analytics dashboard
- [ ] Recurring expenses
- [ ] Bill payment reminders
- [ ] Data backup to Google Drive
- [ ] Multi-language support
- [ ] Voice input for expenses
- [ ] OCR receipt scanning
- [ ] Cryptocurrency tracking

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Personal Manager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Icons: Custom SVG implementations
- Fonts: Google Fonts (Inter)
- Design inspiration: Modern glassmorphism and Notion UI
- Indian users: For inspiring this localized version

---

## 📞 Support

Having issues? Here's how to get help:

1. **Check Documentation**: Read this README thoroughly
2. **Search Issues**: Check if someone else had the same problem
3. **Create Issue**: Open a new issue on GitHub with details
4. **Email Support**: Contact via email (if provided)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ in India 🇮🇳**

[Report Bug](https://github.com/yourusername/personal-manager-app/issues) · 
[Request Feature](https://github.com/yourusername/personal-manager-app/issues) · 
[Documentation](https://github.com/yourusername/personal-manager-app/wiki)

</div>
