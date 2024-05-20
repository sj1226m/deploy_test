import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTNGS_MODULE", "webProject.settings.debug")
application = get_wsgi_application()
