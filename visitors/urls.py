from django.urls import path
from . import views

urlpatterns = [
    path("ping/", views.ping, name="ping"),
    path("visitors/", views.VisitorListCreateView.as_view(), name="visitors"),
    path("visitors/<int:pk>/checkout/", views.VisitorCheckoutView.as_view(), name="visitor-checkout"),
    path("visitors/current/", views.CurrentVisitorsView.as_view(), name="visitors-current"),
    path("visitors/history/", views.VisitorHistoryView.as_view(), name="visitors-history"),
]
