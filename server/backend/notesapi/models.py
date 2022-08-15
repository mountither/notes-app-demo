from django.db import models
from django.conf import settings


# Instead of referring to User directly, you should reference the user model using django.contrib.auth.get_user_model()

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    date_published = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
