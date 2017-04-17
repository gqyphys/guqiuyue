#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os, time, json

from flask import Flask, render_template

# -- create app --
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recorder/')
def recorder():
    return render_template('recorder.html')


if __name__ == '__main__':
    app.run(debug=True)
