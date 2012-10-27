About
================
A copy of [Simple](http://github.com/orf/simple).
plan to add some features based on it...

Installation
============

###Prerequisite
>pip install -r requirements.txt.

###Customize the Configuration
>python create_config.py

###Run
>python simple.py

Deployment
============
Deploying Simple is easy. Simply clone this repo (or your own) and install [Gunicorn](http://gunicorn.org/).
Then cd to the directory containing simple.py and run the following command:
``gunicorn -w 4 simple:app``
This will start 4 gunicorn workers serving Simple. You can then use nginx or apache to forward requests to Gunicorn.

Example
============
You can see my blog running this software [here](http://chuan7i.com).

TODO
============
>1. upload file
>2. online configuration
>3. comments

