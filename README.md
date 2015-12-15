# hello-flask-ng

### Flask and AngularJS Starter App

With just a few steps you can get an app with a Flask server
and AngularJS frontend. There are also unit tests so you can get a
flavor of those as well.

#### Install (python)

This assumes you have Python 2.7.x installed and are working on Linux or
OS X.

```bash
pip install virtualenv
```

```bash
mkdir venv && virtualenv -p /usr/bin/python2.7 venv
```

```bash
virtualenv activate
```

```bash
pip install -r requirements.txt
```

You also need MongoDB installed. To do this you need to have
[homebrew installed](http://brew.sh) installed and

```bash
brew install mongodb
```


#### Install (javascript)

You need to have NodeJS installed, the server-side javascript. On OS X

```bash
brew install node
```

This will also install the Node Package Manager `npm`, which we'll use to
install some dependencies. First you need bower installed:

```bash
brew install
```

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