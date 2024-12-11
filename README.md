# How to run a project


1. Add .env file with `VITE_API_URL='http://localhost:3001'` in client application (port is hardcoded in express server)
2. Start express server with `cd server && yarn install && node index.js`
3. Start client application with `cd client && yarn install && yarn run dev`
4. Open `http://localhost:5173/` in your browser

# Test task requirements

1. Enable the user to see a list of all employees
2. Enable the user to filter the list based on status
3. Enable the user to search the list of employees
4. Changing the status and applying should update the user status
5. Enable status filter reset
6. Enable add user functionality
    - There is no accurate design or description of this requirement, so I assumed functionality on my own. 
    To create a user you need to type something in search input and click "Create" button.
