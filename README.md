# Author: TaiLHN
# Employee Polls Project

## Available Scripts

In the project directory, you can run:
- Run "npm install" to install all packages into node_modules
- Run "npm start" to run the app in development mode.
- Run "npm run test" to launch the test runner in interactive watch mode.

# Employee Polls Project

This is the starter code for the final assessment project for Udacity's React & Redux course.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the `_DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you need to add the path to each user's avatar.

Using the provided starter code, you'll build a React/Redux frontend for the application. We recommend using [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|--------------|------------------|-----------------------|
| id           | String           | The user's unique identifier |
| password     | String           | The user's password used to log in to the application |
| name         | String           | The user's full name |
| avatarURL    | String           | The path to the user's avatar image file |
| questions    | Array            | A list of IDs of the polling questions this user created |
| answers      | Object           | The object's keys are the IDs of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute    | Type   | Description                               |
|--------------|--------|-------------------------------------------|
| id           | String | The question's unique identifier           |
| author       | String | The author's unique identifier            |
| timestamp    | String | The time when the question was created    |
| optionOne    | Object | The first voting option                   |
| optionTwo    | Object | The second voting option                  |

### Voting Options

Voting options are attached to questions. They include:

| Attribute    | Type   | Description                               |
|--------------|--------|-------------------------------------------|
| votes        | Array  | A list that contains the IDs of each user who voted for that option |
| text         | String | The text of the option                    |

Your code will interact with the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

- **Description**: Get all existing users from the database.  
- **Return Value**: Object where the key is the user's ID and the value is the user object.

2) `_getQuestions()` Method

- **Description**: Get all existing questions from the database.  
- **Return Value**: Object where the key is the question's ID and the value is the question object.

3) `_saveQuestion(question)` Method

- **Description**: Save the polling question in the database. If one of the parameters is missing, an error is thrown.
- **Parameters**: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`.
- **Return Value**: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`.

4) `_saveQuestionAnswer(object)` Method

- **Description**: Save the answer to a particular polling question in the database. If one of the parameters is missing, an error is thrown.
- **Parameters**: Object that contains the following properties: `authedUser`, `qid`, and `answer`.