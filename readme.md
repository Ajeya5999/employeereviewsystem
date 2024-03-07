# Employee Review System

Welcome to the Employee Review System! This web application built using Node.js allows users to sign up, sign in, and manage employee reviews efficiently. With three main pages tailored for different user roles, this system ensures a smooth experience for both administrators and regular users.

## Features

- **User Authentication**: Users can sign up and sign in securely to access the system.
- **Role-based Access Control**: Administrators have access to additional pages for managing employees and reviews, while regular users can access the home page to write reviews.
- **Home Page**: All users can access this page to write reviews for employees.
- **Employees Page**: Only administrators can view and manage employee information.
- **Reviews Page**: Only administrators can view and manage employee reviews.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/employee-review-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd employee-review-system
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Define the following environment variables:

        ```plaintext
        PORT=3000
        MONGODB_LINK=your_database_connection_string
        CONNECTMONGO_SESSION_LINK=your_database_connection_string
        ```

5. Run the application:

    ```bash
    npm start
    ```

6. Access the application in your browser at `http://localhost:3000`.

## Usage

1. **Sign Up / Sign In**: Start by signing up for a new account or sign in with existing credentials.

2. **Home Page**:
   - Write reviews for employees.

3. **Employees Page** (Admins Only):
   - View and manage employee information.

4. **Reviews Page** (Admins Only):
   - View and manage employee reviews.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **HTML/CSS**: Frontend markup and styling.
- **Bootstrap**: Frontend framework for responsive design.

## Acknowledgements

- Special thanks to [Node.js](https://nodejs.org/) for providing an excellent runtime environment for building web applications.
- Thanks to [Express](https://expressjs.com/) for simplifying the development of web applications with Node.js.
- Thanks to the open-source community for their valuable contributions and support.
  
---
  
Feel free to reach out to [ajeyasengar@gmail.com](mailto:ajeyasengar@gmail.com) for any questions or feedback. Happy reviewing! 🚀