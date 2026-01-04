# 🚀 ContactHub - Smart Contact Manager

A modern, feature-rich web application for managing your contacts with a sleek and intuitive user interface. ContactHub helps you organize, search, and quickly access your personal and professional connections with ease.

## ✨ Features

- 🎯 **Complete CRUD Operations** - Add, edit, delete, and view contacts with a user-friendly interface
- 🎯 **Smart Search** - Real-time search functionality across names, phone numbers, and email addresses
- 🎯 **Contact Categorization** - Organize contacts with favorites, emergency contacts, and custom groups (Family, Friends, Work, School, Other)
- 🎯 **Data Validation** - Robust form validation for names, phone numbers (Egyptian format), and email addresses with duplicate prevention
- 🎯 **LocalStorage Persistence** - All your contacts are automatically saved in your browser's local storage
- 🎯 **Quick Actions** - One-click calling, emailing, and toggling favorite/emergency status
- 🎯 **Statistics Dashboard** - Real-time statistics showing total contacts, favorites, and emergency contacts
- 🎯 **Responsive Design** - Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Avatar Support** - Upload and display contact photos with fallback to initials
- 🎯 **Modern UI/UX** - Beautiful, modern interface built with Bootstrap 5 and custom CSS

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS variables and custom properties
- **JavaScript (Vanilla)** - Pure JavaScript for all functionality without frameworks
- **Bootstrap 5.3.2** - Responsive CSS framework for layout and components
- **Font Awesome 6.4.0** - Comprehensive icon library
- **SweetAlert2** - Beautiful, customizable alert and confirmation dialogs
- **Google Fonts (Inter)** - Modern, clean typography
- **LocalStorage API** - Client-side data persistence

## 📁 Project Structure

```
ContactHub/
│
├── index.html          # Main HTML file with application structure
├── css/
│   ├── style.css       # Main stylesheet with custom styling
│   └── responsive.css  # Responsive design breakpoints and mobile styles
├── js/
│   └── app.js          # Core JavaScript functionality (all features)
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

No special prerequisites required! Just a modern web browser:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript enabled

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
```

2. **Navigate to the project directory:**
```bash
cd ContactHub-main
```

3. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

4. **Access the application:**
   - Open your browser and navigate to `http://localhost:8000` (or the port you specified)

**Note:** No build process or package installation required - it's a pure vanilla JavaScript application!

## 📋 Usage

### Basic Usage

#### Adding a New Contact

1. Click the **"Add Contact"** button in the header
2. Fill in the required fields:
   - **Full Name** (required) - 2-50 characters, letters and spaces only
   - **Phone Number** (required) - Valid Egyptian phone number (e.g., 01012345678)
3. Optionally fill in:
   - Email address
   - Address
   - Group (Family, Friends, Work, School, Other)
   - Notes
   - Upload a profile photo
   - Mark as Favorite or Emergency
4. Click **"Save Contact"**

#### Searching Contacts

- Type in the search bar at the top
- Search works across:
  - Contact names (case-insensitive)
  - Phone numbers
  - Email addresses
- Results update in real-time as you type

#### Editing a Contact

1. Click the **edit icon** (✏️) on any contact card
2. Modify the information as needed
3. Click **"Update Contact"**

#### Deleting a Contact

1. Click the **delete icon** (🗑️) on any contact card
2. Confirm the deletion in the popup dialog

#### Managing Favorites and Emergency Contacts

- Click the **star icon** (⭐) to add/remove from favorites
- Click the **heart icon** (❤️) to add/remove from emergency contacts
- Favorites and emergency contacts appear in the sidebar (desktop) or dedicated sections (mobile)

### Configuration

The application uses **LocalStorage** for data persistence. All contacts are automatically saved in your browser's local storage under the key `"contactContainer"`.

**Important Notes:**
- Data is stored locally in your browser
- Clearing browser data will delete all contacts
- Data is specific to each browser and device
- No server or database required

## 🎨 Screenshots

### Main Interface
- Modern card-based layout with contact information
- Quick stats dashboard showing total, favorites, and emergency contacts
- Search bar for instant filtering

### Contact Management
- Modal dialog for adding/editing contacts
- Form validation with real-time feedback
- Avatar upload with preview

### Responsive Design
- Desktop: Full layout with sidebar for favorites and emergency contacts
- Mobile: Optimized vertical layout with collapsible sections

## 🔧 Configuration

### Phone Number Validation

The application validates Egyptian phone numbers with the following formats:
- `01012345678` (standard format)
- `01112345678`
- `01212345678`
- `01512345678`
- With country code: `+201012345678`, `00201012345678`, `201012345678`

### Name Validation

- Must contain only letters (English or Arabic) and spaces
- Length: 2-50 characters
- Supports both English and Arabic characters

### Email Validation

- Standard email format validation
- Optional field (can be left empty)

## 📚 API Documentation

This is a client-side application using browser APIs:

### LocalStorage API

```javascript
// Save contacts
localStorage.setItem("contactContainer", JSON.stringify(contactList));

// Load contacts
contactList = JSON.parse(localStorage.getItem("contactContainer"));
```

### Contact Object Structure

```javascript
{
  name: string,           // Required: 2-50 characters
  phone: string,          // Required: Valid Egyptian phone number
  email: string,          // Optional: Valid email format
  address: string,        // Optional: Free text
  notes: string,          // Optional: Free text
  group: string,          // Optional: "family", "friends", "work", "school", "other"
  avatar: string,         // Optional: Image path or base64
  isFavorite: boolean,    // Default: false
  isEmergency: boolean    // Default: false
}
```

## 🧪 Testing

Since this is a client-side application, testing can be done directly in the browser:

1. **Manual Testing:**
   - Add contacts with various data
   - Test form validation
   - Test search functionality
   - Test edit and delete operations
   - Test responsive design on different screen sizes

2. **Browser Console:**
   - Open browser DevTools (F12)
   - Check for JavaScript errors
   - Inspect LocalStorage data

3. **Validation Testing:**
   - Try invalid phone numbers
   - Try duplicate phone numbers
   - Try invalid email formats
   - Try names with invalid characters

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

1. **GitHub Pages:**
   - Push code to GitHub repository
   - Enable GitHub Pages in repository settings
   - Select main branch and root directory

2. **Netlify:**
   - Drag and drop the project folder
   - Or connect your GitHub repository
   - Automatic deployment on push

3. **Vercel:**
   - Import your repository
   - Configure as static site
   - Deploy

4. **Other Options:**
   - AWS S3 + CloudFront
   - Firebase Hosting
   - Any web server (Apache, Nginx)

### Option 2: Local Server

For local development or intranet use:
- Use any local web server (see Installation section)
- Access via local network IP address

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Avatar images are stored as file paths but not actually uploaded to a server (local preview only)
- Data is browser-specific and doesn't sync across devices
- No backup/export functionality (planned for future release)

## 🔮 Future Enhancements

- 📤 **Export/Import** - Export contacts to JSON, CSV, or vCard format
- ☁️ **Cloud Sync** - Synchronize contacts across devices using cloud storage
- 🌐 **Multi-language Support** - Add support for multiple languages
- 🔔 **Notifications** - Reminder notifications for important contacts
- 📱 **QR Code** - Generate QR codes for easy contact sharing
- 🔍 **Advanced Search** - Filter by group, date added, and more
- 📊 **Analytics** - Contact interaction statistics
- 🎨 **Themes** - Dark mode and custom color themes
- 📅 **Events** - Add birthdays and important dates
- 🔐 **Privacy** - Optional password protection for sensitive contacts

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer via email: [yasienahmed607@gmail.com](mailto:yasienahmed607@gmail.com)

## 👨‍💻 Author

<div align="center">

### **Eng. Yasien Ahmed Elkelany**

💼 **Backend .NET Developer** | **Angular Frontend Developer**  
🏢 **General Authority for Investment**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yasien-ahmed-b8ab41325)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yasienahmed607@gmail.com)

[🔗 LinkedIn Profile](https://www.linkedin.com/in/yasien-ahmed-b8ab41325) | [📧 Email](mailto:yasienahmed607@gmail.com)

</div>

---

<div align="center">

**Made with ❤️ by Eng. Yasien Ahmed Elkelany**

⭐ Star this repo if you find it helpful!

</div>
