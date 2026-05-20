# Android Development Portal

A comprehensive web portal for Android development resources, tools, and device drivers.

## Project Structure

```
android/
├── index.html                 # Home page
├── pages/
│   ├── about.html            # About page
│   ├── tools.html            # Tools page
│   ├── drivers.html          # Drivers page
│   ├── contact.html          # Contact page
│   └── admin.html            # Admin panel
├── styles/
│   ├── style.css             # Main stylesheet
│   └── admin.css             # Admin-specific styles
├── js/
│   ├── navbar.js             # Navigation functionality
│   ├── footer.js             # Footer functionality
│   └── admin.js              # Admin panel functionality
└── README.md                 # This file
```

## Features

### Pages
- **Home**: Main landing page with overview and quick access links
- **About**: Information about the portal and team
- **Tools**: Browse and download Android development tools
- **Drivers**: Find and download device drivers
- **Contact**: Contact form and support information
- **Admin**: Upload and manage tools and drivers

### Admin Panel Features
- Upload tools and drivers from local storage
- Manage uploaded items (view, edit, delete)
- Download uploaded files
- LocalStorage-based data persistence
- File size tracking
- Upload timestamps

## Technologies Used

- **HTML5**: Markup and structure
- **CSS3**: Styling with gradients and responsive design
- **JavaScript**: Interactivity and form handling
- **LocalStorage**: Client-side data storage

## Navigation

The portal includes a persistent navigation bar with links to all sections:
- Home
- About
- Tools
- Drivers
- Contact
- Admin

## Admin Panel Usage

### Uploading Tools:
1. Navigate to the Admin page
2. Fill in the Tool Upload form with:
   - Tool Name
   - Description
   - Version
   - Select local file
3. Click "Upload Tool"
4. Tool will be saved to localStorage

### Uploading Drivers:
1. Fill in the Driver Upload form with:
   - Driver Name
   - Description
   - Compatible Device
   - Version
   - Select local file
2. Click "Upload Driver"
3. Driver will be saved to localStorage

### Managing Uploads:
- View all uploaded tools and drivers
- Delete items
- Download items (simulated)
- All data persists using localStorage

## Supported File Formats

### Tools
- ZIP, EXE, APK, JAR, RAR

### Drivers
- ZIP, EXE, BIN, IMG

## Responsive Design

The portal is fully responsive and works on:
- Desktop (1200px and above)
- Tablet (768px - 1199px)
- Mobile (below 768px)

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Navigate through the portal using the navigation bar
4. Use the Admin panel to manage resources

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Backend server integration
- Database for persistent storage
- User authentication
- File upload to cloud storage
- Search functionality
- Advanced filtering
- Comment/review system
- User dashboard

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Contact

For questions or support, reach out to: yohanafashion53@gmail.com

## License

This project is open source and available under the MIT License.

---

**Happy Coding! 🚀**
