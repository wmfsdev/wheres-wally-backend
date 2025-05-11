# WHERE'S WALLY

LIVE: [https://wheres-wally-frontend-xi.vercel.app](https://wheres-wally-frontend-xi.vercel.app/ "https://wheres-wally-frontend-xi.vercel.app")<br>
BACKEND REPO: [https://github.com/wmfsdev/wheres-wally-backend](https://github.com/wmfsdev/wheres-wally-backend "https://github.com/wmfsdev/wheres-wally-backend")<br>
FRONTEND REPO: [https://github.com/wmfsdev/wheres-wally-frontend](https://github.com/wmfsdev/wheres-wally-frontend "https://github.com/wmfsdev/wheres-wally-frontend")

## OUTLINE

The purpose of this project is to create a full-stack application, following the Model View Controller (MVC) pattern, emulating the well known "find-and-seek" book based game "Where's Wally" (Waldo for US players). The user can interact with this web-app via a browser based client with the goal of finding characters "hidden" in a complex image as fast as possible. Interaction takes place via a choice of images, in each one multiple characters must be found, with the user able to click on a suspected location and selecting (from a dropdown) the name of the found character. Upon successfully locating all characters the user is able to submit their time with a username of their choice to a leader board.
<br><br>
## IMPLEMENTATION

[![JS](https://img.shields.io/badge/-JAVASCRIPT-000?style=for-the-badge&logo=javascript&logoColor=F0DB4F)](#) [![EXPRESS](https://img.shields.io/badge/-express-000?style=for-the-badge&logo=express)](#) [![REACT](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&)](#) [![VITE](https://img.shields.io/badge/vite-black?style=for-the-badge&logo=vite&)](#) [![PRISMA](https://img.shields.io/badge/postgres-black?style=for-the-badge&logo=postgresql&)](#) [![PRISMA](https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma&)](#) [![VITEST](https://img.shields.io/badge/vitest-black?style=for-the-badge&logo=vitest&)](#) [![SUPERTEST](https://img.shields.io/badge/supertest-black?style=for-the-badge&logo=supertest&)](#)

To achieve the above functionality this application uses an Express framework for the backend to serve up a REST API to a React frontend with relevant game and user data stored server side in a PostreSQL database using Prisma ORM.

My primary focus was on the backend, exploring ways in which I could solve two key problems: 1) how to identify if the user has correctly identified the character location and 2) how to accurately track the time taken for a user to locate all characters. The majority of the logic to solve these problems would need to exist server side so as to avoid any potential client side manipulation by the user.

The solution I arrived at involved using the _express-session_ middleware for generating client side cookies along with _prisma-session-store_ to handle session management via the Prisma database client. The decision to use Prisma was largely motivated by the desire to gain exposure to ORMs.

The client side cookie would simply act as a reference to the session data stored server side via a session ID. Timestamps generated upon cookie creation and the concurrent session stored in the database serves as an accurate, reliable and secure record of when the user first starts playing the game. If the user successfully locates all characters the same session is referenced (via the client cookie) and based on this session data a total game length can be calculated server side and stored in the database. Every new visit or page refresh resets the cookie making every attempt to play the game a unique instance. Successfully locating each character also requires a server side check by comparing coordinates sent from the client with those stored in the database.

This project also utilises unit and integration testing in a bid to further my understanding of this crucial aspect of web development. For this I have used _vitest_ along with _vitest-mock-extended_ and _supertest_ for extra functionality. This includes testing API routes, database, mocking functions and the Prisma client where necessary, as well as the setup and teardown of a dedicated test database.

## PRISMA SCHEMA

![image](https://github.com/user-attachments/assets/a95de339-fc21-4564-a1b6-378a166a9673)

## ADDITIONAL NOTES

The frontend and backend are deployed using different PaaS providers and the origin sites for each are not the same. To handle the same origin policy the server uses CORS middleware to allow for cross-origin resource sharing. There are still limitations, such as if the user decides to block third-party cookies via their browser, but a potential solution (a singular, dedicated hosting provider for the entire stack) is excessive given the scope of this project.
