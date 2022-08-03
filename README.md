# URL shortener chrome extension

# Description, installation and usage

## Installation

### Server

1. CD into server/ directory and run `pipenv install`
2. run `pipenv shell`
3. if there is a .sqlite file in the root directory, delete it
4. run `python` to open the python shell
5. run `from app import db` and then `db.create_all()` to create the database
6. run `exit()` to exit the python shell and return to the terminal
3. run `pipenv run dev` to start the server in development mode

### Client

1. Right click index.html and open in live server

### Usage

1. Does not function as chrome extension **yet**, as still need to deploy app to Heroku
2. You can however, view the app as a chrome extension by going to chrome://extensions/ and enabling **developer mode** in the top right corner. Then, select **load unpacked** and select the **server** folder in this repo. This should add the app to your chrome extensions and you can see it and interact with it.
