from django.shortcuts import render
import pyrebase


# config={
#   "apiKey": "AIzaSyBS8iE7b2xub46xmcahqM-v6dCX9ksU4UU",
#   "authDomain": "test-84dc0.firebaseapp.com",
#   "databaseURL": "https://test-84dc0-default-rtdb.firebaseio.com/",
#   "projectId": "test-84dc0",
#   "storageBucket": "test-84dc0.appspot.com",
#   "messagingSenderId": "961280524207",
#   "appId": "1:961280524207:web:aacc7391f2892e013eb95a",
#   "measurementId": "G-YDJQC9B4PN"
# }

# firebase = pyrebase.initialize_app(config)
# authe = firebase.auth()
# database = firebase.database()

def index(request):
  # username = database.child('Data').child('Name').get().val()
  # age = database.child('Data').child('Age').get().val()
  # position = database.child('Data').child('Position').get().val()

  # if request.method == 'POST':
  #   username = request.POST['Name']
  #   position = request.POST['Position']
  #   age = request.POST['Age']

  #   database.child('Data').update({'Name':username})
  #   database.child('Data').update({'Position':position})
  #   database.child('Data').update({'Age':age})


  # context = {
  #   'Name': username,
  #   'Age': age,
  #   'Position':position
  # }

  return render(request, 'index.html')