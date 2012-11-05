# -*- coding: utf-8 -*-
import os

ADMIN_USERNAME = 'zuzionly'
ADMIN_PASSWORD = 'sha1$hDpEMNaS$d2881d20c8c850c17e6d07664c30a5dcbc0398ba'
SQLALCHEMY_DATABASE_URI = "sqlite:///simple.db"
BLOG_URL = "/"
PATH = os.path.abspath(os.path.dirname(__file__))
#MAX_CONTENT_LENGTH = 4 * 1024 * 1024
# file upload
UPLOAD_FOLDER = 'file/save'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

