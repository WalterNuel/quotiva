from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

from .serializers import *
# Create your views here.
# api/views.py

import requests

class ExternalDataView(APIView):
    def get(self, request):
        # Fetch data from the external API
        api_url = "https://api.quotable.io/quotes/random?limit=1000"
        response = requests.get(api_url)
        data = response.json()  # Assuming the API returns data in JSON format

        # You can process the data further if needed
        # ...
        return Response(data)
