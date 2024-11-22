# VibeTube

VibeTube is a simple video streaming application built with **React.js**, designed to mimic the basic functionality of YouTube. Unlike traditional video streaming platforms, VibeTube does not require a backend or database. It fetches videos dynamically from the **YouTube Data API** and allows users to watch and filter content by categories such as **gaming**, **sports**, and **news**.

Check it out live: [VibeTube](https://vibe-tube-omega.vercel.app)

## Features

- **Video Streaming**: Watch videos from YouTube directly within the app.
- **Category Filter**: Browse and filter videos by categories like Gaming, Sports, News, and more.
- **Search Functionality**: Search for specific videos or channels using the YouTube Data API.
- **Responsive Design**: Mobile and desktop-friendly UI for seamless video viewing across all devices.
- **Sidebar Navigation**: Easily navigate between categories, trending videos, and subscriptions.

## Technologies Used

- **React.js**: Frontend library for building the user interface.
- **YouTube Data API**: Fetch videos, channels, and playlists from YouTube.
- **Axios**: Used for making HTTP requests to the YouTube API.
- **Vercel**: Hosting platform for deploying the app.

## Installation

To run VibeTube locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aditya1or0/VibeTube.git
   ```

2. **Install dependencies**:
   ```bash
   cd VibeTube
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add your YouTube Data API key:
     ```env
     REACT_APP_YOUTUBE_API_KEY=your_api_key_here
     ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to see the app in action.

## How It Works

- **API Integration**: The app makes API calls to the YouTube Data API to retrieve videos based on user input or selected categories.
- **Sidebar Navigation**: A dynamic sidebar allows users to select from predefined categories. Clicking on a category fetches the corresponding videos via API calls.
- **Responsive UI**: The app's layout adjusts based on screen size, ensuring a smooth experience on both desktop and mobile devices.

## Contributing

Feel free to fork the repository and contribute by opening a pull request. Whether it's bug fixes, new features, or enhancements, all contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Aditya1or0](https://github.com/Aditya1or0).
