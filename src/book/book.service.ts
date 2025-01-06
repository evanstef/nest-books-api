import { HttpException, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { add, Logger } from "winston";
import { AddNewBookRequest, BookDetailResponse, BookResponse } from "src/model/book.model";
import { BookValidation } from "./book.validation";


@Injectable()
export class BookService { 
    constructor(private prismaService : PrismaService, private validationService : ValidationService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    // mendaftarkan buku baru ke database
    async addNewBook(request : AddNewBookRequest) : Promise<BookResponse> {
        this.logger.info(`Add new book with title ${request.title} ${request.year} ${request.total_pages}`);

        // validation dulu menggunakkan zod
        const addBookRequest : AddNewBookRequest = await this.validationService.validate(BookValidation.CREATE, request)

        // ubah title menjadi slug
        addBookRequest.slug = addBookRequest.title.toLowerCase().replace(/ /g, '-');


        // cek apakah buku sudah ada
        const bookExists = await this.prismaService.books.findFirst({
          where: {
            slug: addBookRequest.slug
          }
        })

        // pengecekan bila buku memiliki judul yang sama dengan yang sudah ada di database
        if (bookExists) {
            throw new HttpException('Book already exists', 400);
        }

        // ubah string release_date menjadi date
        const releaseDate = new Date(addBookRequest.release_date);

        // Simpan buku ke database
        const newBook = await this.prismaService.books.create({
                  data: {
                    title: addBookRequest.title,
                    slug: addBookRequest.slug,
                    publisher: addBookRequest.publisher,
                    cover_path: addBookRequest.cover_path,
                    year: addBookRequest.year,
                    total_pages: addBookRequest.total_pages,
                    score : addBookRequest.score,
                    from_country: addBookRequest.from_country,
                    summary: addBookRequest.summary,
                    release_date: releaseDate,
                }
        
              });
        
        let author : any;
        // pengecekan terlebih dahulu bila request.author memang ada value nya di front end karena ini sifatnya tidak wajib
        if (addBookRequest?.author !== '') {
           // Cek apakah author sudah ada
          author = await this.prismaService.author.findFirst({
              where: {
                 OR : [
                     { name: addBookRequest.author },
                     { slug: addBookRequest.author.toLowerCase().replace(/ /g, '-') }
                 ]
              }
          });


          // Jika author belum ada, buat author baru
          if (!author) {
              author = await this.prismaService.author.create({
              data: { 
                name : addBookRequest.author,
                slug : addBookRequest.author.toLowerCase().replace(/ /g, '-'),
                avatar : addBookRequest.author_image === '' || !addBookRequest.author_image ? null : addBookRequest.author_image
               },
              });
          }

          // hubungkan author dengan book dengan tabel pivot AuthorOnBooks
          await this.prismaService.authorsOnBooks.create({
              data: {
                  bookId: newBook.id,
                  authorId: author.id,
              }
          })
        }
        
        
        let type : any;
        // pengecekan bila field type memang ada value nya di front end karena ini sifatnya tidak wajib
        if (addBookRequest?.type !== '') {
            // cek apakah type buku sudah ada
            type = await this.prismaService.type.findFirst({
                where: { 
                  name: addBookRequest.type
                },
            });

            // Jika type belum ada, buat type baru
            if (!type) {
                type = await this.prismaService.type.create({
                data: { 
                  name: addBookRequest.type,
                  slug: addBookRequest.type.toLowerCase().replace(/ /g, '-')
                },
                });
            }

            
            // Hubungkan buku dengan type di tabel pivot TypeOnBooks
            await this.prismaService.typeOnBooks.create({
                data: {
                    bookId: newBook.id,
                    typeId: type.id,
                },
            });
        }
       
         // Tangani genres (array of strings)
        const genreNames = addBookRequest.genres;

        for (const genreName of genreNames) {
            // ubah genre menjadi slug untuk mengisi tabel slug di database
            const slugGenre = genreName.toLowerCase().replace(/ /g, '-');

            // Cek apakah genre sudah ada
            let genre = await this.prismaService.genre.findFirst({
                where : {
                  slug : slugGenre
                }
            });

            // Jika genre tidak ada, buat baru
            if (!genre) {
            genre = await this.prismaService.genre.create({
                data: { 
                  name: genreName,
                  slug: slugGenre
                 },
            });
            }

            // Hubungkan buku dengan genre di tabel relasi
            await this.prismaService.genresOnBooks.create({
            data: {
                bookId: newBook.id,
                genreId: genre.id,
            },
            });
        }

        // ubah release_date dalam database menjadi string
        const formattedReleaseDate = newBook.release_date.toISOString().substring(0, 10);

        return {
            id : newBook.id,
            title : newBook.title,
            slug : newBook.slug,
            author :  addBookRequest.author === '' ? 'Unknown' : author.name,
            cover_path : newBook.cover_path,
            summary : newBook.summary,
            score : newBook.score,
            type : addBookRequest.type === '' ? 'Unknown' : type.name,
            release_date : formattedReleaseDate,
            genres : genreNames,
        }
    }

    // mendapatkan semua buku
    async getAllBooks() : Promise<BookResponse[]> { 
        // mengambil semua buku yang di data base namun diurutkan dari tanggal release terbaru
        const books = await this.prismaService.books.findMany({
            orderBy : {
                release_date : 'desc'
            },
            take : 20,
            include: {
                author: {
                  include: {
                    author: true, // Menyertakan nama author
                  },
                },
                genre: {
                  include: {
                    genre: true, // Menyertakan nama genres
                  },
                },
                type: {
                  include: {
                    type: true, // Menyertakan nama type
                  },
                },
              },
        });

       

        return books.map((book) => {
            return {
                id : book.id,
                title : book.title,
                slug : book.slug,
                author : book.author[0]?.author.name || 'Unknown',
                cover_path : book.cover_path,
                summary : book.summary,
                score : book.score,
                type : book.type[0]?.type.name || 'Unknown',
                release_date : book.release_date.toISOString().substring(0, 10), // ubah release_date dalam database menjadi string
                genres : book.genre.map((item) => item.genre.name),
            }
        })
    }

    // mendapatkan detail dari buku sesuai dengan id
    async getBookById(id : number) : Promise<BookDetailResponse> {
        const book = await this.prismaService.books.findUnique({
            where : { id : id },
            include: {
                author: {
                  include: {
                    author: true, // Menyertakan nama author
                  },
                },
                genre: {
                  include: {
                    genre: true, // Menyertakan nama genres
                  },
                },
                type: {
                  include: {
                    type: true, // Menyertakan nama type
                  },
                },
              },
        });

        if (!book) {
            throw new HttpException('Book not found', 404);
        }

        // ubah release_date dalam database menjadi string
        const formattedReleaseDate = book.release_date.toISOString().substring(0, 10);

        return {
            title : book.title,
            slug : book.slug,
            author : book.author[0]?.author.name || 'Unknown',
            publisher : book.publisher || 'Unknown',
            cover_path : book.cover_path,
            year : book.year,
            summary : book.summary,
            score : book.score,
            total_pages : book.total_pages,
            from_country : book.from_country,
            type : book.type[0]?.type.name || 'Unknown',
            release_date : formattedReleaseDate,
            genres : book.genre.map((item) => item.genre.name),
        }
    }

    // mendapatkan mendapatkan buku by genre
    async getBookByGenre(genre: string): Promise<BookResponse[]> {
      // Cek apakah genre ada di database
      const genreExists = await this.prismaService.genre.findFirst({
        where: {
          OR: [{ slug: genre }, { name: genre }],
        },
      });
  
      if (!genreExists) {
        throw new HttpException('Genre not found', 404);
      }
  
      // Cari buku berdasarkan genre
      const books = await this.prismaService.genresOnBooks.findMany({
        where: { genreId: genreExists.id },
        take: 20,
        include: {
          book: {
            include: {
              author : {
                include: {
                  author: true, // Menyertakan nama author
                },
              },
              genre: {
                include: {
                  genre: true, // Menyertakan nama genre
                },
              },
              type: {
                include: {
                  type: true, // Menyertakan nama type
                },
              },
            },
          },
        },
      });
  
      // Map hasil pencarian buku
      return books.map((item) => {
        const { book } = item;
        return {
          id: book.id,
          title: book.title,
          slug: book.slug,
          author:
            book.author[0]?.author?.name || 'Unknown', // Mengambil nama author
          cover_path: book.cover_path,
          summary: book.summary,
          score: book.score,
          type: book.type[0]?.type.name || 'Unknown',
          release_date: book.release_date.toISOString().substring(0, 10), // Mengubah release_date menjadi string
          genres: book.genre.map((g) => g.genre.name), // Mengambil nama genre
        };
      });
    }

    // mendapatkan data buku by type 
    async getBookByType(type: string): Promise<BookResponse[]> { 
        // Cek apakah type ada di database
        const typeExists = await this.prismaService.type.findFirst({
          where : {
            OR : [
              {
                slug : type
              },
              {
                name : type
              }
            ]
          }
        })

        // pengecekan bila type memang tidak ada di database
        if (!typeExists) {
            throw new HttpException('Type not found', 404);
        }

        // Cari buku berdasarkan type 
        const books = await this.prismaService.typeOnBooks.findMany({
            where : {
                typeId : typeExists.id
            },
            take : 20,
            include : {
                book : {
                    include : {
                        author : {
                            include : {
                                author : true, // Menyertakan nama author
                            }
                        },
                        genre : {
                            include : {
                                genre : true, // Menyertakan nama genre
                            }
                        },
                        type : {
                            include : {
                                type : true, // Menyertakan nama type
                            }
                        }
                    }
                }
            }
        })

        // Map hasil pencarian buku
        return books.map((item) => {
            const { book } = item;
            return {
                id : book.id,
                title : book.title,
                slug : book.slug,
                author : book.author[0]?.author.name || 'Unknown', // Mengambil nama author
                cover_path : book.cover_path,
                summary : book.summary,
                score : book.score,
                type : book.type[0]?.type.name || 'Unknown',
                release_date : book.release_date.toISOString().substring(0, 10), // Mengubah release_date menjadi string
                genres : book.genre.map((g) => g.genre.name), // Mengambil nama genre
            }
        })
    }

    // mendapatkan data buku berdasarkan total sales yang tertinggi popular 
    async getPopularBooks() : Promise<BookResponse[]> { 
        
        // mengambil semua buku yang di data base namun diurutkan dari score tertinggi
        const books = await this.prismaService.books.findMany({
            orderBy : {
              score : 'desc'
            },
            take : 20,
            include: {
                author: {
                  include: {
                    author: true, // Menyertakan nama author
                  },
                },
                genre: {
                  include: {
                    genre: true, // Menyertakan nama genres
                  },
                },
                type: {
                  include: {
                    type: true, // Menyertakan nama type
                  },
                },

              },
        });



        // Map hasil pencarian buku
        return books.map((item) => {
            return {
                id : item.id,
                title : item.title,
                slug : item.slug,
                author : item.author[0]?.author.name || 'Unknown', // Mengambil nama author
                cover_path : item.cover_path,
                summary : item.summary,
                score : item.score,
                type : item.type[0]?.type.name || 'Unknown',
                release_date : item.release_date.toISOString().substring(0, 10), // Mengubah release_date menjadi string
                genres : item.genre.map((g) => g.genre.name), // Mengambil nama genre
            }
        })
    }
}