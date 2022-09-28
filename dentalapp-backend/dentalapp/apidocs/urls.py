from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework.permissions import AllowAny
from rest_framework.schemas import get_schema_view
from rest_framework import renderers
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view
from rest_framework.documentation import include_docs_urls

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Evident API",
        default_version='v1',
        description="API documentation for Evident App",
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    # path('docs/', TemplateView.as_view(
    #     template_name='swagger-ui.html',
    #     extra_context={'schema_url':'openapi-schema-yaml'},
    # ), name='swagger-ui'),
    path('openapi.yaml', get_schema_view(
            title="Best API Service",
            renderer_classes=[renderers.OpenAPIRenderer],
            permission_classes=[AllowAny]
        ), name='openapi-schema-yaml'),
    path('openapi.json', get_schema_view(
            title="Best API Service",
            renderer_classes = [renderers.JSONOpenAPIRenderer], 
            permission_classes=[AllowAny]
        ), name='openapi-schema-json'),
    path('docs/', include_docs_urls(title='Todo Api')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]