from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from users.models import *
from .models import *
from .forms import *
import json
import re


def home(request):
    return render(request, 'client/index.html')


# === BOOKS SHOWCASE / MAIN LIBRARY ===========================================


def main_library(request):
    books = Book.objects.all()
    return render(request, 'client/main_library.html', {'books': books})


def my_books(request):
    book_ids = []
    try:
        books = Book.objects.filter(profile=request.user.profile)
        for book in books:
            book_ids.append(book.id)
    except Exception as e:
        print(e)
        # books = []

    return HttpResponse(json.dumps({'book_ids': book_ids}), content_type='application/json; charset=utf-8')


def add_book_to_lib(request, book_id):
    if request.user.is_authenticated:
        try:
            profile = request.user.profile
            book = Book.objects.get(id=book_id)
            profile.books.add(book)
            return HttpResponse(json.dumps({'result': 'success'}), content_type='application/json; charset=utf-8')
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({'result': 'failure'}), content_type='application/json; charset=utf-8')
    else:
        return HttpResponse(json.dumps({'result': 'failure', 'url': 'login/'}), content_type='application/json; charset=utf-8')


def remove_book_from_lib(request, book_id):
    try:
        profile = request.user.profile
        book = Book.objects.get(id=book_id)
        profile.books.remove(book)
        return HttpResponse(json.dumps({'result': 'success'}), content_type='application/json; charset=utf-8')
    except Exception as e:
        print(e)
        return HttpResponse(json.dumps({'result': 'failure'}), content_type='application/json; charset=utf-8')


# === BOOKS SHOWCASE / MY LIBRARY =============================================


def my_library(request):
    books = Book.objects.filter(profile=request.user.profile)
    return render(request, 'client/my_library.html', {'books': books})


def get_texts(request, book_id):
    texts = Text.objects.filter(book__pk=book_id)
    stats = TextStats.objects.filter(user=request.user.profile, text__book_id=book_id)
    result = {}
    for text in texts:
        result[text.id] = {}
        result[text.id]['text'] = text.text[:30] + '... ' + f'[{len(text.text)}]'
        result[text.id]['chapter'] = text.chapter
    for stat in stats:
        result[stat.text.id]['complete'] = stat.complete
        result[stat.text.id]['cpm'] = stat.cpm
        result[stat.text.id]['wpm'] = stat.wpm
        result[stat.text.id]['acc'] = float(stat.acc)
        result[stat.text.id]['chars'] = stat.chars
        result[stat.text.id]['words'] = stat.words
        result[stat.text.id]['errors'] = stat.errors
        result[stat.text.id]['time'] = stat.time
    # print(result)
    return HttpResponse(json.dumps({'texts': result}), content_type='application/json; charset=utf-8')


# === TYPE ====================================================================


def type_no_txt(request):
    return render(request, 'client/type_no_txt.html')


def type(request, text_id):
    profile = request.user.profile
    text = Text.objects.get(id=text_id)
    try:
        stats = TextStats.objects.get(text__id=text_id, user__id=profile.id)
        complete = stats.complete
        cpm = stats.cpm
        wpm = stats.wpm
        acc = stats.acc
        chars = stats.chars
        words = stats.words
        errors = stats.errors
        time = stats.time
    except Exception as e:
        print(e)
        complete = False
        cpm = 0
        wpm = 0
        acc = 0.00
        chars = 0
        words = 0
        errors = 0
        time = 0
    # print(text.id, text.text)
    # print(stats.complete, stats.cpm, stats.wpm, stats.acc)
    return render(request, 'client/type.html', {'data': {
        'complete': complete,
        'cpm': cpm,
        'wpm': wpm,
        'acc': acc,
        'chars': chars,
        'words': words,
        'errors': errors,
        'time': time,
        'text': text.text,
        'id': text_id
    }})


def return_stats(request, text_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        profile = request.user.profile
        text = Text.objects.get(id=text_id)
        try:
            stats = TextStats.objects.get(text__id=text.id, user__id=profile.id)
        except Exception as e:
            print(e)
            stats = TextStats(text=text, user=profile)
        stats.complete = data['complete']
        stats.stats_string = data['stats']
        stats.cpm = data['cpm']
        stats.wpm = data['wpm']
        stats.acc = data['acc']
        stats.chars = data['chars']
        stats.words = data['words']
        stats.errors = data['errors']
        stats.time = data['time']

        stats.save()
        return HttpResponse(json.dumps({'result': 'success'}), content_type='application/json; charset=utf-8')
    else:
        return HttpResponse(json.dumps({'result': 'failure'}), content_type='application/json; charset=utf-8')


# === ADD BOOK ================================================================


def add_book(request):
    if request.method == 'POST':
        # print(dir(request))
        form = NewBookForm(request.POST)
        # print(vars(form['json_string']))
        # print(len(form.data['json_string']))

        # print(len(form['json_string'].value()))
        # print(form['book_title'].value())
        # print(form['book_author'].value())

        textDict = json.loads(form['json_string'].value())
        author = form['book_author'].value()
        title = form['book_title'].value()

        books = Book.objects.filter(title=title)
        # print(books[0])

        if not books.count():
            book = Book(title=title, author=author, creator=request.user)
            book.save()

        book = Book.objects.get(title=title)
        # print(book)
        # print(textDict)

        for i in textDict:
            chast = streplace(textDict[i]['0chast'])
            kniga = streplace(textDict[i]['1kniga'])
            glava = streplace(textDict[i]['2glava'])
            chapter = chast + '. ' + kniga + '. ' + glava
            # print(i)
            print(chapter)

            # if i == '3':
            # print('lol')
            text_list = []
            text = textDict[i]['3text']
            print(text)
            text_chapt = ''
            for j in text:
                text_chapt += j
                if (len(text_chapt) > 2000) and (j == ' '):
                    text_list.append(text_chapt)
                    text_chapt = ''
            text_list.append(text_chapt)
            print(text_list)

            for txt in text_list:
                text_instance = Text(book=book, chapter=chapter, text=txt)
                text_instance.save()
            print('DONE')

    else:
        form = NewBookForm()

    return render(request, 'client/add_book.html', {'form': form})


# === TEST ====================================================================


def streplace(text):
    text = text.replace('первая', 'I')
    text = text.replace('вторая', 'II')
    text = text.replace('третья', 'III')
    text = text.replace('четвертая', 'IV')
    text = text.replace('пятая', 'V')
    text = text.replace('шестая', 'VI')
    text = text.replace('седьмая', 'VII')
    text = text.replace('восьмая', 'VIII')
    text = text.replace('девятая', 'IX')
    text = text.replace('десятая', 'X')
    text = text.replace('одиннадцатая', 'XI')
    text = text.replace('двенадцатая', 'XII')
    text = re.sub(r'\[\d+\]', '', text)
    return text


def test(request, text_id):
    text = Text.objects.get(id=text_id)
    txt_dict = {}
    for i, letter in enumerate(text.text):
        txt_dict[i] = letter
    return JsonResponse({'return': txt_dict}, content_type='application/json; charset=utf-8')
