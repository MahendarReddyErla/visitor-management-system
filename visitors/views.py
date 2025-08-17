from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Visitor
from .serializers import VisitorSerializer
from rest_framework import generics
from .models import Visitor
from .serializers import VisitorSerializer

class CurrentVisitorsView(generics.ListAPIView):
    queryset = Visitor.objects.filter(is_checked_out=False).order_by("-check_in_time")
    serializer_class = VisitorSerializer

class VisitorHistoryView(generics.ListAPIView):
    queryset = Visitor.objects.filter(is_checked_out=True).order_by("-check_out_time")
    serializer_class = VisitorSerializer

def ping(request):
    from django.http import JsonResponse
    return JsonResponse({"status": "ok"})

class VisitorListCreateView(generics.ListCreateAPIView):
    queryset = Visitor.objects.all().order_by("-check_in_time")
    serializer_class = VisitorSerializer

class VisitorCheckoutView(APIView):
    def post(self, request, pk):
        visitor = get_object_or_404(Visitor, pk=pk)
        if visitor.is_checked_out:
            return Response({"detail": "Already checked out."}, status=status.HTTP_400_BAD_REQUEST)
        visitor.is_checked_out = True
        visitor.check_out_time = timezone.now()
        visitor.save()
        return Response(VisitorSerializer(visitor).data, status=status.HTTP_200_OK)
