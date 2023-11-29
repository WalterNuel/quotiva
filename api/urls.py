# urls.py

from django.urls import path
from .views import ExternalDataView

urlpatterns = [
    path('external_data/', ExternalDataView.as_view(), name='external-data'),
]
