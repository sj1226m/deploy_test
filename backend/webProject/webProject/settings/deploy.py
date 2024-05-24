from .base import *

config_secret_deploy = json.loads(open(CONFIG_SECRET_DEPLOY_FILE).read())

DEBUG = False
ALLOWED_HOSTS = config_secret_deploy['django']['allowed_hosts']

WSGI_APPLICATION = 'webProject.wsgi.deploy.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'whattoeat_db',
        'USER': config_secret_deploy['django']['databases']['user'],
        'PASSWORD': config_secret_deploy['django']['databases']['password'],
        'HOST': config_secret_deploy['django']['databases']['host'],
        'PORT': '5432',
    }
}