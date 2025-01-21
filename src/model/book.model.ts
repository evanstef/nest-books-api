import { IsNumberString, IsOptional } from "class-validator"

export class BookResponse {
    id? : number
    title : string
    slug : string
    author? : string
    cover_path? : string
    summary? : string
    rating? : number
    score : number
    type? : string
    first_release_date : string
    genres : Array<string>
}

export class BookDetailResponse extends BookResponse {
    publisher : string
    year : number
    total_pages : number
    from_country : string
}

export class AddNewBookRequest {
    title : string
    slug : string
    author : string
    author_image : string
    publisher : string
    cover_path : string
    year : number
    total_pages : number
    rating? : number
    score : number
    from_country : string
    type : string
    summary : string
    first_release_date : string
    genres : Array<string>
}

export class GetPopularBooks {
    @IsOptional()
    @IsNumberString()
    limit? : string;
}