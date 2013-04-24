""" utility for generating a configuration file for a simple blog """
from werkzeug.security import generate_password_hash

def input_with_default(prompt, default):
    """ Small wrapper around raw_input for prompting and defaulting """
    response = raw_input("%s (Default %s) "%(prompt, default))
    if not response:
        return default
    return response

print "Generating a core config file.These settings are not resetable by web. Please answer some questions:"
SETTINGS_CORE = (

    input_with_default("Admin username","admin"),
    generate_password_hash(input_with_default("Admin password","password")),
    input_with_default("Database URI","sqlite:///simple.db"),
    input_with_default("Blog URL (e.g. /blog)","/"),
    input_with_default("upload files max size","3"),
    input_with_default("upload folder","/static/file"),
    input_with_default("google mail/apps user account",""),
    input_with_default("google mail/apps password",""),
)

with open("settings_core.py", "w") as fd:
    fd.write("""# -*- coding: utf-8 -*-\n
import os
ADMIN_USERNAME =  '%s'
ADMIN_PASSWORD = '%s'
SQLALCHEMY_DATABASE_URI = "%s"
BLOG_URL = "%s"
# file upload
PATH = os.path.abspath(os.path.dirname(__file__))
MAX_CONTENT_LENGTH = %s * 1024 * 1024
UPLOAD_FOLDER = "%s"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
#EMAIL SETTINGS
MAIL_SERVER="smtp.gmail.com"
MAIL_PORT= 465
MAIL_USE_SSL= True
MAIL_USERNAME = "%s"
MAIL_PASSWORD = "%s" \n"""  % SETTINGS_CORE)
    fd.flush()
print "Core Settings Created!"

print "Generating a core config file.These settings are resetable by web. Please answer some questions:"
SETTINGS_CUSTOM = (
    input_with_default("Posts per page", 5),
    input_with_default("Show the post content on the homepage","y").lower()[0] == "y",
    input_with_default("Show post view count on the homepage?","n").lower()[0] == "y",
    input_with_default("Google analytics ID",""),
    input_with_default("Github Username", ""),
    input_with_default("Google+ ID",""),
    input_with_default("Twitter ID",""),
    input_with_default("Contact Email", ""),
    input_with_default("Blog title", ""),
    input_with_default("Blog tagline", ""),
    input_with_default("DISQUS_NAME", ""),
    input_with_default("Font Name (Selected from google font library): ","Source Sans Pro").replace(" ","+")
)


with open("settings_custom.py", "w") as fd:
    fd.write("""# -*- coding: utf-8 -*-\n
POSTS_PER_PAGE = "%s"
POST_CONTENT_ON_HOMEPAGE = "%s"
SHOW_VIEWS_ON_HOMEPAGE = "%s"
ANALYTICS_ID = "%s"
GITHUB_USERNAME = "%s"
GOOGLE_PLUS_PROFILE = "%s"
TWITTER_HANDLE = "%s"
CONTACT_EMAIL = "%s"
BLOG_TITLE = "%s"
BLOG_TAGLINE = "%s"
DISQUS_NAME = "%s"
#DOMAIN = ""
FONT_NAME = "%s"\n""" % SETTINGS_CUSTOM)
    fd.flush()

print "Custom Settings Created!"
