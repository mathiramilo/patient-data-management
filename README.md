# Patient Data Management

React + Typescript + Vite frontend application that enables users to add, edit and view patient data.

![Screenshot 2024-07-29 052819](https://github.com/user-attachments/assets/c1cd347b-6d55-44f8-9d9d-1f4138afbdbb)

## Features:

- **View Patients**: Users can view a list of all patients.
- **View Patient Details**: Users can view the details of a specific patient.
- **Add/Edit Patient**: Users can add a new patient or edit an existing one trough a modal.
- **Form Validation**: Users will be prompted with validation errors if they try to submit an invalid form.
- **Patients Search and Sort**: Users can search for patients by name and sort them by id, name or date of creation.
- **User-Friendly Notifications**: Users will be notified of their successful or failed data modifications.
- **Smooth Animations**: Users will be presented with smooth animations when navigating through the application.

## Libraries

- **Zod**: Used for form validation.
- **Zustand**: Used for state management.
- **uuid**: Used for generating unique ids.
- **clsx**: Used for conditional classnames.
- **React Spring**: Used for animations.
- **Typescript**: Used for static typing.
- **TailwindCSS**: Used for styling.
- **Tabler Icons**: Used for icons.

## Design Decisions

1. **State Management with Zustand**: Simple and lightweight library that provides a global state without the need for a lot of boilerplate code.
2. **Form Validation with Zod**: Simple and lightweight library that provides a declarative way to validate data.
3. **Typescript**: Provides a way to catch errors at compile time and improve the overall code quality.
4. **Styling with TailwindCSS**: Utility-first CSS framework that allows for rapid styling without the need for writing custom CSS.
5. **Animations with React Spring**: Simple and lightweight library that provides a declarative way to animate components.
6. **Ground Up Components**: Full control over the design and functionality of the application.

## Setup Local Development Environment

### Installation

1. Clone the repository

```bash
git clone https://github.com/mathiramilo/patient-data-management.git
```

2. Install the dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```bash
VITE_API_URL="API URL without the final /"
```

4. Run the application

```bash
npm run dev
```

### Usage

The application will be running on `http://localhost:5173/`. You can access it through your browser.
