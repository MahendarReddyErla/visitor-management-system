from django.http import HttpResponse

def home(request):
    return HttpResponse("Visitor Management System API is running. Try /api/ping/")
