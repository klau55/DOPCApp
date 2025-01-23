A simple DOPC frontend written on React (created with Vite). Styling done with plain css and flexbox. Testing performed with cypress.

** Instructions to run client **
in main folder via terminal:
npm install
npm run dev (vite runs on http://localhost:5173/ by default)

To run cypress tester:
launch client as described above (check that it runs on http://localhost:5173/, otherwise update baseUrl in cypress.config.js)
npm run cypress:run