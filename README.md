## Hello friends, this is an API that provides data on books such as novels, comics, etc it's like API in website goodreads.com but you don't need authorize or log in first to Get API key so just hit endpoint and you will get a list of books. With over 500+ book titles available i took the data from the website it's called goodreads.com, this is a brief documentation on how to use it. Happy coding, self-taught enthusiasts!

## All Endpoint
1. GET https://books-goodreads-api.vercel.app/api/book
2. GET https://books-goodreads-api.vercel.app/api/book/popular
3. GET https://books-goodreads-api.vercel.app/api/book?genres={slug:genre}
4. GET https://books-goodreads-api.vercel.app/api/book/:id
5. GET https://books-goodreads-api.vercel.app/api/book/type/:type
6. GET https://books-goodreads-api.vercel.app/api/authors
7. GET https://books-goodreads-api.vercel.app/api/authors/:slug

## API Documentation

### 1. GET https://books-goodreads-api.vercel.app/api/book

Endpoint : https://books-goodreads-api.vercel.app/api/book \
Method : GET \
Size : 20 Books \
Note : The data will be sorted by latest release date.

### Response 
Status : 200 OK
```json
{
  "size": 20,
  "data": [
      {
          "id": 84604,
          "title": "title example",
          "slug": "slug-example",
          "author": "authors example",
          "cover_path": "https://images.gr-assets.com/books/1455000000m/84604.jpg",
          "summary": "Summary example",
          "score": 189,
          "rating": 4.5,
          "type": "Novel",
          "release_date": "2021-04-20",
          "genres": [
              "Fiction",
              "Adventure",
              "Drama",
          ]
      },
          ]
}
```

## Response if error
Status : 500

```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```


## 2. GET https://books-goodreads-api.vercel.app/api/book/popular

Endpoint : https://books-goodreads-api.vercel.app/api/book/popular \
Method : GET \
Size : 20 Books \
Note : The data will be sorted by the highest score.

### Response If Success
Status : 200 OK
```json
{
  "size": 20,
  "data": [
      {
          "id": 84604,
          "title": "title example",
          "slug": "slug-example",
          "author": "authors example",
          "cover_path": "https://images.gr-assets.com/books/1455000000m/84604.jpg",
          "summary": "Summary example",
          "score": 111111,
          "rating": 4.5,
          "type": "Novel",
          "release_date": "2021-04-20",
          "genres": [
              "Fiction",
              "Adventure",
              "Drama",
          ]
      },
          ]
}
```

### Response if error
Status : 500
```json 
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 3. GET https://books-goodreads-api.vercel.app/api/book?genres={slug:genre}

Endpoint : https://books-goodreads-api.vercel.app/api/book?genres={slug:genre} \
Method : GET \
Size : 20 Books 

List Of Genres : 
- fiction
- historical-fiction
- novels
- indonesian-literature
- classics
- literature
- asia
- childrens
- education
- young-adult
- romance
- historical
- islam
- religion
- inspirational
- love
- family
- magical-realism
- drama
- adventure
- action
- thriller
- crime
- contemporary
- fantasy
- science-fiction
- slice-of-life
- philosophy
- parenting
- humor
- travel
- mystery
- literary-fiction
- politics
- adult
- unfinished
- roman
- comedy
- chick-lit
- feminism
- queer
- psychology
- poetry
- cultural
- spirituality
- banned-books
- contemporary-romance
- film
- high-school
- asian-literature
- true-story
- classic-literature
- conspiracy-theories
- detective
- horror
- mystery-thriller
- short-stories
- epic
- teen
- anthologies
- collections
- audiobook
- science-fiction-fantasy
- music
- womens
- japanese-literature
- dark-fantasy
- history
- mira
- novella
- japan
- christian
- middle-grade
- dark
- speculative-fiction
- sports
- time-travel
- angels


### Response if success
Endpoint Example = https://books-goodreads-api.vercel.app/api/book/?genres=drama \
Status : 200 OK
```json
{
  "size": 20,
  "data": [
      {
          "id": 84604,
          "title": "title example",
          "slug": "slug-example",
          "author": "authors example",
          "cover_path": "https://images.gr-assets.com/books/1455000000m/84604.jpg",
          "summary": "Summary example",
          "score": 189,
          "rating": 4.5,
          "type": "Novel",
          "release_date": "2021-04-20",
          "genres": [
              "Fiction",
              "Adventure",
              "Drama",
          ]
      },
          ]
}
```
### Response if genre not found
Status : 404
```json
{
  "data" : {
    "status": 404,
    "message": "Genre not found"
  }
}
```
### Response if error
Status : 500
```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 4. GET https://books-goodreads-api.vercel.app/api/book/:id

Endpoint : https://books-goodreads-api.vercel.app/api/book/:id \
Method : GET \
Note : Get a detail book by id.

### Response if success
Status : 200 OK
```json
{
    "data": {
        "title": "title example",
        "slug": "slug-example",
        "author": "authors example",
        "publisher": "publisher example",
        "cover_path": "https://images-na.ssl-images-amazon.com/images/123123.jpg",
        "year": 2010,
        "summary": "Summary example",
        "score": 189,
        "rating": 4.5,
        "total_pages": 312,
        "from_country": "Indonesia",
        "type": "Novel",
        "release_date": "2010-02-01",
        "genres": [
            "Fiction",
            "Romance",
            "Family",
            "Contemporary"
        ]
    }
}
```

### Response if book not found
Status : 404
```json
{
  "data" : {
    "status": 404,
    "message": "Book not found"
  }
}
```

### Response if error 
Status : 500
```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 5. GET https://books-goodreads-api.vercel.app/api/book/type/:type

Endpoint : https://books-goodreads-api.vercel.app/api/book/type/:type \
Method : GET \
Size : 20 Books \ 
Note : The book will be sorted by latest release date. \
List Of Types :
- novel

### Response if success
Status : 200 OK
```json
{
  "size": 20,
  "data": [
      {
          "id": 84604,
          "title": "title example",
          "slug": "slug-example",
          "author": "authors example",
          "cover_path": "https://images.gr-assets.com/books/1455000000m/84604.jpg",
          "summary": "Summary example",
          "score": 189,
          "rating": 4.5,
          "type": "Novel",
          "release_date": "2021-04-20",
          "genres": [
              "Fiction",
              "Adventure",
              "Drama",
          ]
      },
          ]
}
```

### Response if type not found
Status : 404
```json
{
  "data" : {
    "status": 404,
    "message": "Type not found"
  }
}
```
### Response if error
Status : 500
```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 6. GET https://books-goodreads-api.vercel.app/api/authors

Endpoint : https://books-goodreads-api.vercel.app/api/authors \
Method : GET \
Size : 20 Authors \
Note : The data will be sorted by the most book of each author.

### Response if success
Status : 200 OK
```json
{
  "size": 20,
  "data": [
        {
            "id": 5,
            "name": "author example",
            "slug": "author-example",
            "avatar": "https://avatar example",
            "total_books": 34
        },
        {
            "id": 1,
            "name": "author example",
            "slug": "author example",
            "avatar": "https://avatar example",
            "total_books": 14
        },
        {
            "id": 2,
            "name": "author example",
            "slug": "author example",
            "avatar": "https://avatar example",
            "total_books": 10
        },
  ]
}
```

### Response if error
Status : 500
```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 7. GET https://books-goodreads-api.vercel.app/api/authors/:slug

Endpoint : https://books-goodreads-api.vercel.app/api/authors/:slug \
Method : GET \
Note : Get a list of books by author and the books will be sorted by the highest score.

### Response if success
Status : 200 OK
```json
{
  "data": {
        "id": 40,
        "name": "auhtor example",
        "slug": "author-example",
        "avatar": "https://avatar example",
        "total_books": 5,
        "books": [
            {
                "id": 48411,
                "title": "title example",
                "slug": "slug-example",
                "cover_path": "https://images-example.com/123123.jpg",
                "summary": "Summary example",
                "score": 645,
                "rating": 4.5,
                "type": "Novel",
                "release_date": "2012-02-02",
                "genres": [
                    "Fiction",
                    "Romance",
                    "Drama",
                    "Contemporary"
                ]
            },
            {
                "id": 62060,
                "title": "title example",
                "slug": "slug-example",
                "cover_path": "https://images-example.com/123123.jpg",
                "summary": "Summary example",
                "score": 377,
                "rating": 4.5,
                "type": "Novel",
                "release_date": "2007-07-01",
                "genres": [
                    "Fiction",
                    "Romance",
                    "Drama",
                    "Contemporary"
                ]
            }
        ]
    }
}
```

### Response if author not found
Status : 404
```json
{
  "data" : {
    "status": 404,
    "message": "Author not found"
  }
}
```

### Response if error
Status : 500
```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## This is the complete API documentation for all available endpoints at the moment. It might be updated further in the future. Don't forget to give a star, friends! Thank you to everyone who has used this API. Keep up the spirit and keep learning coding!



