import { platforms, genres, sorts, pageSizes } from "./constants";

export interface IGame {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
}

type screenshot = {
    id: number;
    image: string;
}

export interface IGameDetails extends IGame {
    status: string;
    description: string;
    minimum_system_requirements: object;
    screenshots: screenshot[];
}
  
export interface IFormattedSearchParams {
    value: Platform | Genre | Sort;
    label: string;
}
  
export type Platform = typeof platforms[number];
export type Genre = typeof genres[number];
export type Sort = typeof sorts[number];
export type PageSize = typeof pageSizes[number];

export function isPlatform(item: any): item is Platform {
    return platforms.includes(item);
}

export function isGenre(item: any): item is Genre {
    return genres.includes(item);
}

export function isSort(item: any): item is Sort {
    return sorts.includes(item);
}

export function isPageSize(item: any): item is PageSize {
    return pageSizes.includes(item);
}

