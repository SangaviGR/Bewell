## Project Overview
The project is a web enrollment form designed to simplify the patient onboarding process for family practices. It features four sections, each with specific functionalities:

1. **Personal Details**: Users can fill in their personal information, including mailing and residence addresses. The residence address can be the same as the mailing address.
2. **Children or Dependent Adults**: Users can fill in details for children or dependent adults, with the option to keep the mailing and residence addresses the same as in Section 1.
3. **Signature**: This section includes a signature canvas for capturing the user's signature and additional details about the person filling the form.
4. **Doctor's Details**: Using Axios, the form fetches the doctor's details from the backend, including the doctor's name, address, date, and e-signature.
5. **Fillable Form**: Upon submission,a PDF containing the submitted details is generated and downloaded to the frontend.

## Technologies Used
- **Frontend**: React, Material-UI, React Hook Form
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **PDF Generation**: pdf-lib

## Installation Instructions
To set up and run the web form application:
1. Clone the repository.
2. Navigate to the client and server folders and run `npm install` to install dependencies.
3. In the server folder, create a `.env` file and set up your MongoDB connection string and other environment variables.
4. Start the server by running `npm start` in the server folder.
5. Start the client by running `npm start` in the client folder.

## Demo
You can access a live demo of the web form [here](https://www.loom.com/share/276528259f5f4750890c0027ff3f7221?sid=f20bff40-245b-4f6e-98eb-b73087891ccf).

## Form URL 
  http://localhost:3000/form
  
Ensure both the client and server are running for the form to function correctly.
