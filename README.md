# Kanban Board

A Kanban board is a visual tool for project management, offering an immediate and comprehensive overview of a project's, process's, or task's workflow in real-time. Sign up and commence documenting the lifecycle of your projects.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **MongoDB**: NoSQL database for storing user data, boards, columns, and tasks.
- **Prisma**: ORM for working with MongoDB.
- **NextAuth.js**: Authentication for Next.js applications.
- **Axios**: Promise-based HTTP client for making requests to the backend.
- **Bcrypt**: Library for hashing and comparing passwords securely.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **ShadCN**: Component library for building modern UI interfaces.

## Features

- **User Authentication**:
  - Create an account using an email and password.
  
- **Boards**:
  - Clicking different boards in the sidebar will switch to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal, where board details can be updated.
  - Columns can be added and removed within the Add/Edit Board modals.
  - Deleting a board removes all associated columns and tasks, with a confirmation prompt.

- **Columns**:
  - A board must have at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header will be disabled.
  - Clicking "Add New Column" opens the "Edit Board" modal, allowing the addition of columns.

- **Tasks**:
  - Adding a new task will place it at the bottom of the relevant column.
  - Updating a task's status will automatically move it to the appropriate column. If you're working on the drag-and-drop bonus, dragging a task to another column will also update its status.

## Demo

You can try out the live demo of the Kanban Board here:

[Kanban Board Demo](https://kanban-ecdozt5kp-glowupmatt.vercel.app/)

## Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- MongoDB (either locally or a cloud provider like MongoDB Atlas)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/kanban-board.git
    cd kanban-board
    ```

2. **Install dependencies**:

    If you're using Yarn:

    ```bash
    yarn install
    ```

    Or with npm:

    ```bash
    npm install
    ```

3. **Set up the environment variables**:

    Create a `.env` file in the root of the project and add the required environment variables for MongoDB and NextAuth.js.

    Example `.env` file:

    ```bash
    NEXTAUTH_URL=http://localhost:3000
    MONGODB_URI=mongodb://your-mongo-db-uri
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

4. **Start the development server**:

    ```bash
    yarn dev
    ```

    Or with npm:

    ```bash
    npm run dev
    ```

    The app will be running at `http://localhost:3000`.

## Deployment

You can deploy this app to platforms like Vercel. Follow the platform's documentation for setting up deployment.

- [Vercel Deployment](https://vercel.com/docs)

## Contributing

We welcome contributions to improve the app! To get started:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

Please ensure your code follows the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
