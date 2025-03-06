# TechNICKal Industries Dashboard

## Summary: 
Welcome to the TechNICKal Industries Dashboard! This application is a central hub for a variety of company information including products, components, employees, and more.
The site provides an efficient user-friendly way for all company members to view, change, and delete company data while providing security through encrypted user logins and permission levels for each user.
This program is a secure and streamlined platform that will enhance both productivity and data management across TechNICKal industries incorporated.

## App Functions:
//These are the functions included within the TechNICKal Industries Dashboard//

### User Profile:
- View information about the currently logged in user, such as their permissions and their role.

### Viewing Data:
- Data is sorted into aesthetically clean tables that display all the information about a given subject (ex. Micro-Components). Selecting tables is intuitive, using a drop-down menu for simple navigation.
- If a user has the proper permissions, they also have access to forms for editing or deleting data within paticular tables. This is dependent on their permission level.

### User Permissions:
- To ensure site security, different users have different levels of permissions within the application. These permission levels are saved on the server and cannot be manipulated by the user. They affect not only the actions a user can perform, but the information they are allowed to view.

## Local Build Intructions:
//These instructions describe how to build and run the TechNICKal Industries Dashboard on your local device//

### Prerequisites:
- An IDE that can be used with Node.js and Angular, with a terminal to enter commands
- Git ( https://git-scm.com/downloads )
- Node.js v22.xx.xx LTS installed on your system ( https://nodejs.org/en )
- GitHub Desktop (Optional) [ https://github.com/apps/desktop ]

### Downloading the Project:
- Navigate to the main GitHub page for the project
- Select the "Code" option and download it as a ZIP into your preferred location
- Un-Zip the folder, you now have the project files!

### Viewing the Project Source in Your IDE
- This application has two components, the client, and the server. Both components must be running in order to launch the project. The client displays the web page, while the server fetches information to display.
- Both the client-side and the server-side are configured to start together in one command!
- To start the project, first locate the extracted project files in your file explorer. Once you've found the project, right click on it and find the option to open the project in your preferred IDE.
- You have no opened the project in your IDE, all that is left is running it!

### Running the Project Locally
- To run this project locally, we will first need to download the proper dependencies for both the Client and Server projects. To do this, firt navigate to the terminal in your IDE.
- We will first download the needed dependencies for the server. Type "cd server" in the terminal and hit enter. Ensure the end of the directory your terminal is located in is "\server". If so, use the command "npm install". This may take a minute.
- Now we will repeat this with the client. Type "cd .." to return to the root of the project in the terminal, then type "cd Client" to enter the client directory. Run the same "npm install" command here and wait for it to complete.
- Becasue the Client project automatically runs both the client and the server, all we need to do is type "npm start" in the terminal to start the project.
- Wait for the project to build, you should see a link like this once it completes. Click on the link and you're in the app!\
[0]   ➜  Local:   https://localhost:4909\
- On the login screen, use the following credentials for testing purposes:\
Username: admin\
Password: password
- Or if you want less permissions for examples of how the application works, use the following credentials:\
Username: noperm\
Password: password
- If you're able to login, you're all good for using and testing the project on your local machine.


### Running the Project Remotely
URL CLIENT: [http://technickalindustriesclient-hdgkf6g7h4hbdabt.canadacentral-01.azurewebsites.net](http://technickalindustriesclient-hdgkf6g7h4hbdabt.canadacentral-01.azurewebsites.net/)\
URL SERVER: [http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net](http://technickalindustries2-ece8cjfmbth5fpfj.canadacentral-01.azurewebsites.net/)
  
