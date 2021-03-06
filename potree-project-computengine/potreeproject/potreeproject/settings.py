"""
Django settings for potreeproject project.

Generated by 'django-admin startproject' using Django 2.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "&%vuq3b+(p!f)h62k00v#+&ia=^^aw2=q+_kf0l24s=)%y1d^)"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [".potree-project.appspot.com", "0.0.0.0", "localhost"]
ADMIN_ENABLED = True

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "files",
    "rest_framework",
    "frontend",
    "knox",
    "accounts",
    "converted",
]
# REST_FRAMEWORK = {["DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",),]}
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",),
    # "DATE_INPUT_FORMATS": ["%Y-%m-%dT%H:%M:%S"],
}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "potreeproject.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "potreeproject.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

""" DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
} """
# [START db_setup]
if os.getenv("GAE_APPLICATION", None):
    # Running on production App Engine, so connect to Google Cloud SQL using
    # the unix socket at /cloudsql/<your-cloudsql-connection string>
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "HOST": "/cloudsql/potree-project:europe-west1:potree-project-database",
            "USER": "potreeProject",
            "PASSWORD": "ADMINISTRATOR345",
            "NAME": "potreeDatabase",
        }
    }
else:
    # Running locally so connect to either a local MySQL instance or connect
    # to Cloud SQL via the proxy.  To start the proxy via command line:
    #    $ cloud_sql_proxy -instances=[INSTANCE_CONNECTION_NAME]=tcp:3306
    # See https://cloud.google.com/sql/docs/mysql-connect-proxy
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "HOST": "0.0.0.0",
            "PORT": "3306",
            "USER": "potreeProject",
            "PASSWORD": "ADMINISTRATOR345",
            "NAME": "potreeDatabase",
        }
    }
# [END db_setup]


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = "static"

MEDIA_URL = "/media/"  # add this
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


TIME_ZONE = "Europe/Warsaw"

# DATETIME_INPUT_FORMATS = ["%Y-%m-%d %H:%M:%S"]
