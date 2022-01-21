# My submission for the Reaktor 2022 developer, summer assigment

## Getting Started

Install dependencies for both the backend and frontend with:

### `npm install`

Add a .env file to the backend directory that contains two environment variables
1. MONGODB_URI
2. PORT

*the frontend expects the backend to be running on port 3003*

Run the backend in development mode with
### `npm run dev`

Start the frontend in development mode with
### `npm start`

Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser. 

Both the frontend and backend will reload when you make changes in development mode.

## Screenshots
Front page on desktop
![Frontpage](/assets/images/frontpage.png)
User page on desktop
![Userpage](/assets/images/userpage.png)
User page and user list on mobile

![Userpage on mobile](/assets/images/userpagemobile.png)
![Userlist on mobile](/assets/images/userlistmobile.png)

## Technologies
#### frontend:
React, React-Router, Redux, Thunk, Bootstrap
#### backend:
Node, Express, MongoDB

## Shortcomings, improvements and thoughts on the project

* Using MongoDB for the custom backend solution ended up being a bad idea since it slows down fetching entries from the external API by a lot. Could've probably done the project just with a local cache for performance, but I had little experience with data structures with such a large data sample.
*(Luckily this doesn't really have an impact on the end-user since the data is already pre-fetched.)*


* Separating backend and frontend logic into their own directories made deployment way too difficult and would make implementing a CI/CD solution to the project tedious. If I remade this app I would use Nextjs or a similar framework for building a fullstack application.

* Unit and E2E testing is completely missing. I rushed to get something working out and had little time to add tests. If I continued working on this project I would add integration tests with Cypress and unit tests with Jest.

* Overall I'm happy with what I've managed to do with the little experience I have. 
  * I learned how to use Websockets and API traversal with cursors (even utilized it in my custom REST API for speed). 
  * I got more familiarity with CSS and CSS Frameworks trying to make the app look desirable and work OK on mobile.
  * I built my first fullstack application from scratch and I met the minimum goals set for it.

