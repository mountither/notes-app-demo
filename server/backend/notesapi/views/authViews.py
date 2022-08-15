from django.contrib.auth import get_user_model
from notesapi.serializers import RegisterUserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterUserAPIView(CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)

        # this token will be used throughout users session on app
        token = Token.objects.create(user=serializer.instance)

        token_data = {"token": token.key}

        # "**" returns the data without the field names (key)
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class SignOutAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # delete current token from auth state.
        request.user.auth_token.delete()

        return Response(status=status.HTTP_200_OK)
