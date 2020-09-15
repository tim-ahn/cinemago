# cinemago
A dynamic mobile-first social networking web application for movie enthusiasts who want to journal, share and categorize their movie interests. 


## Live Site



## Technologies Used
<li>React.js</li>
<li>Node.js</li>
<li>Express.js</li>
<li>PostgresQL</li>
<li>Bootstrap</li>
<li>reactstrap</li>
<li>Webpack</li>
<li>Babel</li>
<li>HTML</li>
<li>CSS</li>
<li>multer</li>
<li>AWS EC2</li>


## Main Features
1. User can search for movies or users of the app. <br/>
2. User can view the details of a movie (incuding synopsis, reviews, similar movies) <br/>
3. User can view, create or delete a custom list. <br/>
4. User can add or delete movie from a custom list. <br/>
5. User can view, add or delete movies from their favorites or watch list. <br/>
6. User can view, create, delete, or update their reviews of a movie. <br/>
7. User can view, send, and delete messages from other users. <br/>
8. User can edit and view their own and other users' profiles. <br/>
9. User can sign in, create an account, and log out. <br/>
10. User can sort and filter movies by different genres & categories <br/>


<br/>
Front-end functionality and interface built with React.js & back-end API built using Express.js, Node.js, and PostgresQL to handle client requests and data. 


## Development
### System Requirements
Node.js 10 or higher <br>
NPM 6 or higher <br>
PostgreSQL 10 or higher <br>
Express.js 4 or higher

### Getting Started
Clone the repository.
```console
git clone https://github.com/brandonktran/cinemago.git
cd cinemago
```

Install all dependencies with NPM.
```console
npm install
```

Start PostgreSQL server
```console
sudo service postgresql start
```

Create the database
```console
createdb cinemago
```

Copy of .env.example and update with your PostgreSQL credentials
```console
cp .env.example .env
```

Import the schema
```console
npm run db:import
```

Start the project.
```console
npm run dev
```
Then view the application by going to http://localhost:3000 in your browser.
