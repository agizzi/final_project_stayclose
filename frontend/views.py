from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request, 'frontend/index.html')
  

def circleIndex(request, pk, circleName, id):
  return render(request, 'frontend/index.html')