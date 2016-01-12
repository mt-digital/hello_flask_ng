# hello-flask-ng

### Flask and AngularJS Starter App

With just a few steps you can get an app with a Flask server
and AngularJS frontend. There are also unit tests so you can get a
flavor of those as well.

#### Install (python)

This assumes you have Python 2.7.x installed and are working on Linux or
OS X.

Install the virtualenv script 
```bash
pip install virtualenv
```

so you can create a new Python virtual environment using the `venv/` directory to store all the environment's packages, executables, and metadata
```bash
virtualenv -p /usr/bin/python2.7 venv
```

Once we've instantiated our virtualenv in the directory `venv/`, we can activate the still-unactivated virtual environment.
```bash
. venv/bin/activate
```

Now when we install new modules with the virtualenv activated, the will be installed under `venv/`. virtualenv has done the hard work
of setting up system PATHS for you so when you run ipython, for example, it will be actually running `venv/bin/ipython`. We can install all the requirements using the following command. As you might guess, the Python requirements are stored in `requirements.txt`.
```bash
pip install -r requirements.txt
```

You also need MongoDB installed. To do this you need to have
[homebrew installed](http://brew.sh) installed. Run

```bash
brew install mongodb
```
then follow the instructions `brew` gives you to finish the installation and start your MongoDB server.


#### Install (javascript)

You need to have NodeJS installed, the server-side javascript. On OS X

```bash
brew install node
```

This will also install the Node Package Manager `npm`, which we'll use to
install some dependencies. First you need to install bower:

```bash
npm install -g bower
```

Then install nodejs dependencies, used for testing on user's machine.

```bash
npm install
```

Now use bower to install the client-side dependencies.

```bash
bower install
```

### Run development servers and/or tests

The `startup.py` script takes one argument, one of the following:

* **pyTest:** run python unit tests using the command `nosetests -v`
* **e2e:** run end-to-end tests by starting a front and backend server and
    running Protractor tests that automate in-browser testing
* **ngSpec:** Run controller, service, and other Angular component specifications
* **testAll:** Run all tests described above
* **run:** Run the front and backend servers for demoing using a persistent database

for example

```bash
./startup.py pyTest
```
