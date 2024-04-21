# Task-Management-System

- Concept: A web application where users can create tasks, assign them to team members, and track progress. Tasks can be updated in real-time by any team member
- Technologies: Node.js with Express for the backend, REACT Front-end, REST API for communication, and MongoDB (MERN-stack).
- Distributed Features: Implementation of a RESTful service that supports concurrent access and updates to task data from multiple users, illustrating basic concepts of a distributed system with state management

## Installation Guidelines

### Prerequisites

- Node.js (v18.0.0)
- npm
- MongoDB

### Setup

1. **Clone the repository**:
   ```
   git clone [URL]
   cd task-management-system
   ```
2. **Install dependencies**:
   Automated scripts (2):
   ```
   npm run client-install
   npm run server-install
   ```
   **OR** manually from the root folder (3):
   ```
   npm install
   cd client && npm install
   cd server && npm install
   ```
3. **One command dev-start**:
   ```
   npm run dev
   ```
4. **Start the backend server (Alternative)**:
   ```
   cd server
   npm start
   ```
5. **Start the frontend application (Alternative)**:
   ```
   cd client
   npm start
   ```

The application should now be running on `http://localhost:3001`, with a default mongodb instance at `mongodb://localhost:27017`.
