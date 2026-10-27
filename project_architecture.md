# AgriTech - Empowering farmers through digital technology

This Agri-Tech web application is a smart and scalable solution aimed at empowering farmers with technology. It integrates modern tools like weather forecasting, soil analysis, and pest alerts to streamline farm management. Designed with user-friendliness and data-driven decisions in mind, it bridges the gap between traditional farming and modern technology.

The platform is tailored to address real-world agricultural challenges using accessible and intuitive digital tools. It helps farmers increase crop yield, reduce loss, and adapt to changing environmental conditions. The app is responsive and multilingual, ensuring accessibility across different regions and literacy levels. By combining technology and farming expertise, this solution paves the way for a digitally connected agricultural ecosystem.

## Skills Required

- Node.js (Javascript Library)
- Express.js (Javascript Library)
- MongoDB
- HyperText Markup Language (HTML)
- Cascading Style Sheets (CSS)
- JavaScript (Programming Language)
- React.js (Javascript Library)
- Asynchronous Javascript
- Bootstrap (Front-End Framework)
- JSON Web Token (JWT)

## Epics and Stories

- **Total Epics:** 6
- **Stories & Subtasks**
- **Total Tasks:** 19
- **Total Subtasks:** 0

## Instructions

Agri -Tech is a full-stack smart farming management system designed to empower farmers with digital tools that enhance agricultural productivity and sustainability. Built using the MERN stack (MongoDB, Express.js, React, Node.js), the project integrates real-time weather forecasting, soil analysis, pest alerts, and expert consultation to help farmers make informed and data-driven decisions. The application bridges the gap between traditional farming practices and modern technology, creating a connected agricultural ecosystem accessible to users across various regions.

### 1. Environment Setup

- Install Node.js (v16+), npm, and MongoDB.
- Set up the Express.js backend with dependencies for API routing, data handling, authentication, and validation.
- Create the React.js frontend using Create React App and integrate libraries such as Axios, React Router, and Bootstrap or Material UI for building an interactive and multilingual user interface.
- Configure MongoDB Atlas or local MongoDB for data storage and manage version control through Git and GitHub for collaborative development.

### 2. Database Design

- Use MongoDB to store user, farm, crop, and resource-related data.
- Collections: Users, Farms, Crops, Orders, and Weather Data.
- Each collection is linked through unique identifiers to maintain relational integrity.
- Farmers’ data connects with their farm profiles, crop details, and activity logs, while admins manage content, resources, and user activities through the database.

### 3. Application Development

Develop modules for:

- User Registration and Login
- Farm Profile Setup and Management
- Crop Monitoring and Soil Health Analysis
- Weather Forecasting and Pest Alert Notifications
- Resource Purchase and Order Tracking
- Expert Consultation and Community Forums
- Admin Dashboard for System and Content Management

Implement full CRUD operations, routing, and form validation across modules to ensure smooth user interactions and consistent data management throughout the application.

### 4. Role-Based Security

- Use JWT (JSON Web Tokens) for secure authentication and authorization.
- Define roles for farmers and admins to control access to specific routes and functionalities.
- Encrypt passwords using bcrypt and maintain secure session handling on both frontend and backend.
- Restrict sensitive operations such as database management, resource approval, and content moderation to admin users only.

### 5. Frontend Integration

- Design a responsive, multilingual, and user-friendly interface using React.js and Bootstrap.
- Include navigation menus, farm dashboards, crop tracking interfaces, resource management sections, and expert consultation pages.
- Integrate Axios for API communication and dynamic rendering of real-time weather data, crop analytics, and soil reports.
- Provide interactive charts, alerts, and graphical reports for better data visualization and decision-making by farmers.

### 6. Testing & Validation

- Test all CRUD functionalities, authentication modules, and data-driven workflows.
- Validate weather forecast accuracy, soil data inputs, and crop record updates.
- Use Postman to test RESTful APIs for proper request-response handling.
- Ensure UI responsiveness, accessibility, and cross-browser compatibility across devices to support rural and multilingual users.

### 7. Monitoring & Optimization

- Optimize MongoDB queries for efficient data retrieval and scalability.
- Implement logging and error-handling mechanisms in Express.js middleware.
- Refactor controllers and backend services for modularity and easier maintenance.
- Enhance React performance using lazy loading, code splitting, and caching strategies for real-time updates and faster rendering.

## Outcome

By completing this project, you will:

- Build a real-world full-stack agricultural management platform using the MERN stack.
- Implement role-based authentication and data analytics for smart farming solutions.
- Develop a responsive, data-driven user interface tailored to farmers’ needs.
- Gain hands-on experience in backend architecture, API integration, and secure web development.
- Understand scalable system design for managing large datasets and real-time agricultural insights.

# 1. PROJECT ARCHITECTURE

## 1.1 Technical Architecture

### Description

In this technical architecture, the Agri-Tech consists of several components:

> The source PDF introduces the technical-architecture components here, but no separate architecture diagram is visible in the supplied PDF. The component descriptions below preserve the available content.

- **User Interface:** The web interface provides an intuitive platform for farmers to access and interact with the agri-tech system. Here, farmers can explore crop information, manage farm activities, and make purchases for agricultural resources, ensuring a seamless user experience.
- **Web Server:** Hosts the user interface and serves the web pages to the users.
- **API Gateway:** Acts as a single entry point for client requests and routes them to the respective services.
- **Authentication Service:** Handles user authentication and authorization for secure access to the system.
- **Database:** Stores persistent data related to Crop Management, Farm Management and other entities crucial to the Agri-tech Web App.
- **Weather Forecasting:** Receive real-time weather updates and forecasts tailored to your farm's location, helping you plan your activities and protect your crops from adverse weather conditions.
- **Farm Management:** Easily manage your farm activities, track crop growth stages, and view historical data from a centralized dashboard, ensuring efficient farm operation.
- **Buy Resources:** Purchase agricultural resources such as seeds, fertilizers, and pesticides directly through the app, saving you time and effort.
- **Crop Management:** Keep track of your crops' progress, monitor soil health, and receive recommendations for optimal care, maximizing your yield potential.
- **Crop Info:** Access detailed information about different crops, including planting guides, care instructions, and pest management tips, helping you make informed decisions about your crops.
- **My Orders:** View and manage your bookings for farm-related services, such as equipment rentals or expert consultations, ensuring timely and efficient service delivery.

## 1.2 ER Diagram

### Description

> The source PDF contains the ER Diagram heading and the entity fields below, but no separate ER diagram graphic is visible in the supplied PDF.

### User

- `UserID` (PK)
- `Name`
- `Email`
- `Phone`
- `Address`

### Farm

- `FarmID` (PK)
- `FarmName`
- `FarmSize`

### Crop

- `CropID` (PK)
- `CropName` (FK)
- `CropType`
- `SowingTime`
- `HarvestingTime`

### Booking

- `BookingID` (PK)
- `UserID` (FK)
- `ProductID` (FK)
- `BookingDate`
- `TotalAmount`

## 1.3 Features

### Description

- **Farm Management Dashboard:** A centralized dashboard to monitor and manage farm activities, track crop growth stages, and view historical data.
- **Weather Forecasting:** Real-time weather updates and forecasts tailored to the farm’s location, helping farmers plan their activities accordingly.
- **Soil Health Monitoring:** Tools to analyze soil moisture and nutrient levels, providing recommendations for optimal crop growth.
- **Pest and Disease Alerts:** Alerts and notifications about potential pest infestations and disease outbreaks with suggested treatments.
- **Resource Management:** Features to track and manage the use of water, fertilizers, and other resources, ensuring efficient utilization.
- **Expert Consultation:** Access to agricultural experts for personalized advice and solutions to farming challenges.
- **Community Forum:** A platform for farmers to share experiences, ask questions, and learn from each other.
- **Crop and Field Tracking:** Detailed tracking of crop growth stages, field conditions, and yield predictions.
- **Data Analytics and Reports:** Analytical tools to generate reports on farm performance, resource usage, and crop yields, helping farmers make data-driven decisions.

## 1.4 Roles and responsibilities

### Description

### Farmer

#### Crop Management

- Monitor and manage crop growth stages.
- Record and analyze soil health data.
- Receive and implement recommendations for optimal crop care.

#### Farm Management

- Set up and maintain farm profiles.
- Track farm activities such as planting, fertilizing, and harvesting.
- Optimize resource usage, including water, fertilizers, and pesticides.

#### Weather Monitoring

- Access real-time weather updates and forecasts.
- Plan farming activities based on weather conditions.

#### Pest and Disease Management

- Receive alerts about potential pest infestations and disease outbreaks.
- Implement preventive measures and treatments.

#### Purchasing Resources

- Buy agricultural products such as seeds, fertilizers, and pesticides.

#### Booking Services

- Schedule and manage bookings for services like equipment rentals and expert consultations.

#### Community Engagement

- Participate in community forums to share experiences and learn from other farmers.

### Admin

#### User Management

- Manage user registrations and profiles.
- Verify and approve new user accounts.
- Handle user queries and support requests.

#### Content Management

- Update and manage information related to crops, products, and services.
- Ensure the accuracy and relevance of content available to users.

#### Resource Management

- Monitor and update the inventory of agricultural products.
- Coordinate with suppliers to ensure the availability of resources.

#### Service Management

- Oversee the scheduling and management of services offered through the application.
- Ensure timely and efficient delivery of booked services.

#### System Maintenance

- Perform regular system checks and maintenance.
- Ensure the smooth functioning of the application.
- Troubleshoot and resolve technical issues.

#### Security Management

- Implement security measures to protect user data.
- Monitor and address any security threats or breaches.

#### Data Analytics

- Analyze user data to gain insights into user behavior and needs.
- Generate reports to assist in strategic planning and decision-making.

#### Policy Enforcement

- Ensure compliance with application policies and terms of use.
- Handle violations and take appropriate actions.

## User Flow

### Description

> The source PDF provides the user-flow description below; no separate flowchart graphic is visible in the supplied PDF.

- **Start:** This is the entry point of the user flow.
- **Home Page:** Users arrive at the home page of the agri-tech web application. This page likely includes navigation options to various sections such as farm management, crop management, weather forecasting, and resources.
- **Farm Management:** Users navigate to the farm management section where they can add, view, edit, or delete information about their farms. This includes details like farm location, size, and other relevant data.
- **Crop Management:** After managing farms, users move to crop management. Here, they can add, view, edit, or delete information about the crops grown on their farms. This section includes details like crop type, planting dates, and expected harvest dates.
- **Crop Info:** Users access detailed information about their crops. This might include growth stages, health status, pest control measures, and more. It provides a comprehensive view of each crop's status.
- **Weather Forecasting:** Users navigate to the weather forecasting section to get current weather updates and forecasts for their farm locations. This helps them make informed decisions about farming activities based on weather conditions.
- **Buy Resources:** Users proceed to buy resources needed for farming, such as seeds, fertilizers, pesticides, and equipment. This section likely includes a marketplace where users can browse and purchase these resources.
- **End:** This is the end point of the user flow, signifying the completion of the main tasks a user needs to perform within the agri-tech application.

## MVC Pattern

### Description

The Agri-Tech backend application follows the Model-View-Controller (MVC) architectural pattern, a software design approach that separates an application into three interconnected layers. This separation allows for modularity, easier maintenance, and scalability.

### Model Layer (Data Layer)

The Model layer is responsible for handling all data-related logic. This includes the definition of data schemas and the operations performed on the database using those schemas. The models are implemented using Mongoose, which provides a schema-based solution to model application data for MongoDB.

### Controller Layer

The Controller layer acts as an intermediary between the view (routes) and the model. It receives incoming requests, processes the input (which may include validation or transformation), calls the appropriate methods from the model, and then returns a response to the client.

### View Layer (Routing Layer)

In the context of a backend REST API, the View is implemented as the routing layer, where various endpoints are defined. These endpoints determine how the backend responds to different HTTP requests (GET, POST, PUT, DELETE) and are responsible for invoking the appropriate controller functions.

### Advantages of Using MVC in This Project

- **Separation of Concerns:** Each layer has a clearly defined responsibility, improving readability and maintainability.
- **Scalability:** New features can be added easily by creating new routes, controllers, and models.
- **Reusability:** Logic in controllers and models can be reused across multiple parts of the application.
- **Testing:** Each layer can be tested independently, especially the controllers and models.
- **Collaboration-Friendly:** Multiple developers can work simultaneously on different layers without conflict.

# 2. PROJECT SETUP AND CONFIGURATION

## 2.1 Creating Project Folder

### Description

1. Create a new folder with your `<project name>`.
2. Inside that folder create two new folders.
3. Name one as `Client`.
4. Name another one as `Server`.
5. Now open that folder in VS Code.

## 2.2 Setting up Client folder for frontend

### Description

1. Open Client folder in terminal of VScode.
2. Run:

   ```bash
   npm create vite@latest . -- --template react
   ```

3. Select React framework from the given options.

   ```text
   Select a framework:
   │   React
   ```

4. Select JavaScript variant from the given options.

   ```text
   Select a variant:
   │   JavaScript
   ```

5. Now lets navigate to the client folder by giving the following command:

   ```bash
   cd client
   ```

6. To install all the packages run the following command:

   ```bash
   npm install
   ```

7. To start the React server type the following command:

   ```bash
   npm run dev
   ```

## 2.3 Setting up Server folder for backend

### Description

1. Open Server folder in terminal of VScode.
2. Run:

   ```bash
   npm init -y
   ```

3. Create files:
   - `server.js`

4. Create folders:
   - `models`
   - `controllers`
   - `Routers`

## Backend Structure

### Development and Explanation

### Description

#### Backend npm Packages

Install in the `/server` directory:

```bash
npm install express mongoose cors dotenv
```

- **Express** – Minimal web framework for creating the API server.
- **Mongoose** – ODM (Object Data Modeling) tool for MongoDB.
- **CORS** – Middleware to enable cross-origin requests between frontend and backend.
- **Dotenv** – Loads environment variables from a `.env` file for secure key management.
- **Nodemon**

#### `index.js` (Root file)

Entry point of the backend (Express server setup).

Configures:

- `cors` for cross-origin requests.
- `body-parser`/`express.json()` for parsing JSON payloads.
- Routes imported from `routes/`.

Loads environment variables from `.env` and starts the server.

#### `controllers/`

Each file in this folder handles business logic and interacts with Mongoose models.

- **`adminController.js`:** Manages admin-specific actions like verifying users, viewing reports, system analytics, etc.
- **`bookingController.js`:** Handles service or equipment booking-related logic — creating, updating, and viewing bookings.
- **`cropController.js`:** Logic for managing crops: adding crop details, monitoring stages, applying treatments, etc.
- **`farmController.js`:** Handles operations related to farm details like size, location, crop assignments, etc.
- **`productController.js`:** Manages inventory-like products such as seeds, fertilizers, pesticides — create, list, update.
- **`userController.js`:** Includes user registration, login, profile update, and user-specific actions.

**Role:** Keeps route handlers clean by offloading logic.

#### `db/`

Stores database connection, schema models, and static JSON data.

- **`config.js`:** Establishes MongoDB connection using Mongoose with credentials from `.env`.
- **`Admin/`, `User/`:** These may contain Mongoose model files defining schema for admin and user collections.
- **`crops.json`:** Static JSON containing crop data such as crop types, durations, pests, etc., for preloading or reference.

#### `routes/`

Handles HTTP routes for different parts of the app.

- **`user.js`:** Contains routes for user registration, login, logout, and user-specific endpoints.
- **`index.js`:** Main router file that aggregates and mounts all sub-routes under appropriate API paths (e.g., `/api/users`, `/api/farms`).

**Role:** Separates API endpoints from business logic and keeps route handling modular.

#### Authentication

Middleware protects private routes (e.g., dashboard, crop updates).

Authentication flow:

1. User registers or logs in.
2. Receives a token.
3. Token is sent in headers on protected requests.
4. Middleware verifies and authorizes user access.

## Configure MongoDB

### Description

### Install Mongoose

In your Node.js project directory, run:

```bash
npm install mongoose
```

### Create Database Connection

Now, make sure the database is connected before performing any of the actions through the backend. The connection code looks similar to the one provided below.

> **Source note:** The PDF refers to database-connection code “provided below,” but no code is visible in that space in the supplied PDF.

### Create Schemas and Models

Firstly, configure the Schemas for MongoDB database, to store the data in such a pattern. Use the data from the ER diagrams to create the schemas. The schemas are looks like for the Application.

#### UserSchema: Schema for regular users

The following code has been transcribed from the code image in the PDF:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

module.exports = mongoose.model('users', UserSchema)
```

#### AdminSchema: Schema for admin users

The following code has been transcribed from the code image in the PDF:

```javascript
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

module.exports = mongoose.model('Admin', AdminSchema)
```

#### ProductSchema: Schema for the Products

The following code has been transcribed from the code image in the PDF:

```javascript
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    imgUrl: String,

});

module.exports = mongoose.model('Product', productSchema);
```

# FRONT-END DEVELOPMENT

## Development and Explanation

### Description

## 1. Setup React Application

This step involves initializing and preparing the base environment for frontend development:

### Create a React Application

The project begins with creating a new React application using tools like create-react-app or Vite to scaffold the frontend structure. This generates essential configuration files and boilerplate code to kickstart development.

### Configure Routing

React Router (commonly used) is configured to manage client-side routing. It helps navigate between different views and screens (such as login, signup, dashboard) without reloading the page, thus creating a seamless Single Page Application (SPA) experience.

### Install Required Libraries

Additional libraries are installed to enhance development and user experience. This includes UI component libraries (like Material-UI or React Bootstrap), HTTP clients (like Axios or Fetch), form handling libraries, state management tools, and more.

### Frontend npm Packages

Install in the `/frontend` directory:

```bash
npm install axios react-router-dom bootstrap react-bootstrap react-icons
```

- **Axios** – For making HTTP requests from React to the backend.
- **React-Router-Dom** – Enables navigation between components (pages) in a SPA.
- **Bootstrap** – CSS framework for responsive design.
- **React-Bootstrap** – Bootstrap components built specifically for React.
- **React-Icons** – Collection of popular icon packs for UI design.
- **moment** – used for handling time & date formatting
- **recharts** – for data visualization
- **tailwindcss, vite, eslint** – if you are showcasing the frontend stack fully

## 2. Design UI Components

In this phase, visual elements of the application are planned and implemented to ensure usability and consistency:

### Create Components

The interface is modularized by dividing it into reusable components such as buttons, forms, headers, and cards. This promotes reusability and maintainability across the application.

### Implement Layout and Styling

A responsive and visually appealing layout is created using CSS, CSS-in-JS libraries, or utility frameworks like Tailwind CSS. The design ensures compatibility across screen sizes and devices.

### Add Navigation

Logical and intuitive navigation is implemented using navbar, sidebar, or drawer components. Routing logic ensures users can move between different sections easily, maintaining context and session state as needed.

## 3. Implement Frontend Logic

This step focuses on making the frontend dynamic by connecting it to the backend and managing real-time user interactions:

### Integration with API Endpoints

The frontend interacts with backend services via HTTP requests. APIs handle operations such as user registration, login, data retrieval, and updates. Proper handling of responses and errors ensures data integrity and user feedback.

### Implement Data Binding

User inputs and application state are managed using React’s state management system. This enables real-time updates to the UI as the user interacts with the app. Two-way binding ensures form values reflect state and vice versa, enhancing interactivity.

## 4. API integration

The Weather Forecast component integrates real-time weather data into the application by consuming the OpenWeatherMap API. This public RESTful API provides detailed meteorological data based on geographic coordinates or city names. It enables the frontend to display temperature, humidity, wind speed, and other weather metrics for the user’s current or searched location.

### Getting the OpenWeatherMap API Key

To use the OpenWeatherMap API, follow these steps to obtain an API key:

1. Visit <https://home.openweathermap.org/users/sign_up>
2. Create a free account or log in.
3. Navigate to the API Keys section of your profile.
4. Generate a new API key (or use the default one provided).
5. Copy this API key — it will be used in the API endpoints mentioned below.

### Key API Endpoints Used

#### 1. Get Weather by Coordinates (Auto-Detection)

```text
https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric
```

- Called immediately upon component mount.
- Uses the browser’s Geolocation API to retrieve the user’s current latitude and longitude.
- These coordinates are passed to the endpoint to fetch weather data for the current physical location.

#### 2. Get Weather by City Name (Manual Search)

```text
https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric
```

- Used when a user manually types a city name and presses the Search button or hits Enter.
- Fetches and displays weather data for the searched city.

### Frontend Integration Flow

#### Automatic Location Detection

1. Use `navigator.geolocation.getCurrentPosition()` to get the user's coordinates.
2. Pass these coordinates to the OpenWeatherMap API endpoint.
3. Parse and display the response:
   - Temperature
   - Humidity
   - Wind Speed
   - Atmospheric Pressure
   - Weather Description
   - Weather Icon (based on condition)

#### Manual Location Search

1. The user enters a city name in the search input field.
2. On clicking the "Search" button:
   - Make an API call using the entered city name.
3. Retrieve and display the respective weather information on the UI.

# Steps for Execution

### Description

## Step 1: Set Up the Frontend (React App)

**a)** Open a terminal and navigate into the client folder:

```bash
cd client
```

**b)** Once installation is done, start the React development server:

```bash
npm run dev
```

**c)** The app should now be running on:

<http://localhost:5173>

## Step 2: Set Up the Backend (Express Server)

**a)** Open a new terminal tab/window or split the terminal.

**b)** Navigate into the server folder:

```bash
cd ../server
```

## Step 3: Configure Environment Variables

Inside the server folder, create a new file named `.env` (no file extension).

In that `.env` file, add your MongoDB connection string:

```dotenv
MONGO_URI=mongodb://localhost:27017/AgriTech
```

## Step 4: Start the Backend Server

Inside the same server folder, run the backend server using:

```bash
nodemon index.js
```

The server should start on:

<http://localhost:8000>
