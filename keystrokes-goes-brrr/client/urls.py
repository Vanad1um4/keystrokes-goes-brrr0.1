from django.views.generic import RedirectView
from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('home/', views.home, name='home'),

    path('main_library', views.main_library, name='main_library'),
    path('my_books/', views.my_books, name='my_books'),
    path('add/<int:book_id>/', views.add_book_to_lib, name='add_book_to_lib'),
    path('remove/<int:book_id>/', views.remove_book_from_lib, name='remove_book_from_lib'),

    path('my_library/', views.my_library, name='my_library'),
    path('get_texts/<int:book_id>/', views.get_texts, name='get_texts'),

    path('type/', views.type_no_txt, name='type_no_txt'),
    path('type/<int:text_id>/', views.type, name='type'),
    path('type/<int:text_id>/return_stats/', views.return_stats, name='return_stats'),

    path('add_book/', views.add_book, name='add_book'),

    path('test/<int:text_id>/', views.test),

    path('', RedirectView.as_view(url='home/')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
