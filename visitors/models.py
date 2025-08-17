from django.db import models

class Visitor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    purpose = models.CharField(max_length=200)

    check_in_time = models.DateTimeField(auto_now_add=True)

    check_out_time = models.DateTimeField(null=True, blank=True)
    is_checked_out = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.purpose}"


