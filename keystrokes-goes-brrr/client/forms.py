from django import forms


class NewBookForm(forms.Form):
    book_title = forms.CharField(label="Books's title", max_length=255, initial='Братья Карамазовы')
    book_author = forms.CharField(label="Books's author", max_length=255, initial='Достоевский Ф.М.')
    json_string = forms.CharField(widget=forms.HiddenInput(), required=False)
