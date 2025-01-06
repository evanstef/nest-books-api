## GET Buku API 

Endpoint : http://localhost:3000/api/book \
Method : GET \
Size : 20 Books \
Note : The response will be sorted by latest release date.

### Response

```json
{
    "size" : 20,
    "data" : [
        {
            "id" : 1,
            "title" : "Book 1",
            "slug" : "book-1",
            "author" : "Author 1",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 1",
            "total_sales" : 100,
            "type" : "Comic",
            "release-date" : "2020-01-01",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        },
        {
            "id" : 2,
            "title" : "Book 2",
            "slug" : "book-2",
            "author" : "Author 2",
            "cover_path" : "https://via.placeholder.com/150",
            "sumarry" : "Sinopsis Book 2",
            "total_sales" : 100,
            "type" : "Novel",
            "release-date" : "2020-01-02",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        }
    ]
}

```


## GET BUKU DETAILS BY ID

Endpoint : http://localhost:3000/api/book/{:id} \
Method : GET 

### Response

```json
{
    "data" : {
        "title" : "Book 1",
        "slug" : "book-1",
        "author" : "Author 1",
        "publisher" : "Publisher 1",
        "cover_path" : "https://via.placeholder.com/150",
        "background_path" : "https://via.placeholder.com/150",
        "year" : 2020,
        "total_pages" : 100,
        "total_sales" : 100,
        "from_country" : "Indonesia",
        "type" : "Novel",
        "summary" : "Sinopsis Book 1",
        "release_date" : "2020-01-01",
        "genres" : [
            "Comedy", 
            "Horror", 
            "Action"
        ]
    }
}

```

### Response if book not found

```json
{
    "data" : [
        "status" : 404,
        "message" : "Book not found" 
    ] 
}
```


## GET BUKU BY GENRE

Endpoint : http://localhost:3000/api/book?genres={:genre} \
Method : GET \
Size : 20 Books \
Note : The response will be sorted by latest release date.

### Response

```json
{
    "size" : 20,
    "data" : [
        {
            "id" : 1,
            "title" : "Book 1",
            "slug" : "book-1",
            "author" : "Author 1",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 1",
            "total_sales" : 100,
            "type" : "Comic",
            "release-date" : "2020-01-01",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        },
        {
            "id" : 2,
            "title" : "Book 2",
            "slug" : "book-2",
            "author" : "Author 2",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 2",
            "total_sales" : 100,
            "type" : "Novel",
            "release-date" : "2020-01-02",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        }
    ]
}

```

### Response if genre not found

```json
{
    "data" : [
        "status" : 404,
        "message" : "Genre not found" 
    ] 
}
```




## GET BUKU BY POPULARITY OF TOTAL SALES

Endpoint : http://localhost:3000/api/book/popular \
Method : GET \
Size : 20 Books \
Note : The response will be sorted by total sales.

### Response

```json
{
    "size" : 20,
    "data" : [
        {
            "id" : 1,
            "title" : "Book 1",
            "slug" : "book-1",
            "author" : "Author 1",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 1",
            "total_sales" : 100,
            "type" : "Comic",
            "release-date" : "2020-01-01",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        },
        {
            "id" : 2,
            "title" : "Book 2",
            "slug" : "book-2",
            "author" : "Author 2",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 2",
            "total_sales" : 100,
            "type" : "Novel",
            "release-date" : "2020-01-02",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        }
    ]
}

```



## GET BUKU BY TYPE OF BOOK

Endpoint : http://localhost:3000/api/book/type/{:type} \
Method : GET \
Size : 20 Books \
Note : The response will be sorted by latest release date.

### Response

```json
{
    "size" : 20,
    "data" : [
        {
            "id" : 1,
            "title" : "Book 1",
            "slug" : "book-1",
            "author" : "Author 1",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 1",
            "total_sales" : 100,
            "type" : "Comic",
            "release-date" : "2020-01-01",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        },
        {
            "id" : 2,
            "title" : "Book 2",
            "slug" : "book-2",
            "author" : "Author 2",
            "cover_path" : "https://via.placeholder.com/150",
            "sinopsis" : "Sinopsis Book 2",
            "total_sales" : 100,
            "type" : "Novel",
            "release-date" : "2020-01-02",
            "genres" : [
                "Comedy", 
                "Horror", 
                "Action"
            ]
        }
    ]
}

```

### Response if type not found

```json
{
    "data" : [
        "status" : 404,
        "message" : "Type not found" 
    ] 
}   
```
