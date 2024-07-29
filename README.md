# Patient Data Management

React + Typescript + Vite frontend application that enables users to add, edit and view patient data.

![App Screenshot](https://github.com/user-attachments/assets/c1cd347b-6d55-44f8-9d9d-1f4138afbdbb)

## Features:

- **View Patients**: Users can view a list of all patients.
- **View Patient Details**: Users can view the details of a specific patient.
- **Add/Edit Patient**: Users can add a new patient or edit an existing one trough a modal.
- **Form Validation**: Users will be prompted with validation errors if they try to submit an invalid form.
- **Patients Search and Sort**: Users can search for patients by name and sort them by ID, name, or date of creation.
- **User-Friendly Notifications**: Users will be notified of their successful or failed data modifications.
- **Smooth Animations**: Users will experience smooth animations when navigating through the application.

## Libraries/Tools

- **React**: For building the UI.
- **Vite**: For building and serving the application.
- **Typescript**: For static typing.
- **TailwindCSS**: For styling.
- **Zod**: For form validation.
- **Zustand**: For state management.
- **React Spring**: For animations.
- **Tabler Icons**: For icons.
- **uuid**: For generating unique IDs.
- **clsx**: For conditional classnames.

## Design Decisions & Comments

1. **Ground Up Components**: As the challenge description mentioned that you want to know how good I am at making components from scratch, I decided to build all the components from the ground up. For example, notifications, modals, and inputs are all custom components.
2. **Zustand for State Management**: I decided to use Zustand for global state management. This approach allows me to manage notifications, modals, and patient data from any part of the code without the need for confusing prop-drilling. Zustand enables me to define the store and update the state with minimal code, making it an ideal choice for this small application.
3. **Zod for Form Validation**: I chose Zod for form validation because it is a powerful and user-friendly library. It enables me to define the form schema and validate it with minimal code.
4. **Debounced Search**: To enhance performance, I implemented debounced search input. This ensures that the search function is called only after the user has stopped typing for a certain amount of time.
5. **Controlled Forms**: I opted for controlled forms to have better control over the form state, in exchange for a slight performance trade-off. This approach allows me to easily access the patient's data in editing mode and reset the form after submission.
6. **No Code Comments**: I believe that high-quality code should be self-explanatory and easy to read. I have written the code in a way that is straightforward to understand without the need for comments. However, if you have any questions about the code, please feel free to ask.
7. **No Testing**: I did not write any tests for this application due to time constraints. I preferred to focus my available time on developing a better, feature-rich project and writing high-quality, clean code. However, I am familiar with writing tests using Jest and React Testing Library, and I would be happy to write tests if required.

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
