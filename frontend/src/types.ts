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
  
export interface IFormattedSearchParams {
    value: Platform | Genre | Sort;
    label: string;
}
  
export type Platform = 'any platform' | 'pc' | 'browser';
  
export type Genre = "any genre" | "mmorpg" | "shooter" | "strategy" |
    "moba" | "racing" | "sports" | "social" | "sandbox" |
    "open-world" | "survival" | "pvp" | "pve" | "pixel" |
    "voxel" | "zombie" | "turn-based" | "first-person" |
    "third-Person" | "top-down" | "tank" | "space" |
    "sailing" | "side-scroller" | "superhero" |
    "permadeath" | "card" | "battle-royale" | "mmo" |
    "mmofps" | "mmotps" | "3d" | "2d" | "anime" | "fantasy" |
    "sci-fi" | "fighting" | "action-rpg" | "action" |
    "military" | "martial-arts" | "flight" | "low-spec" |
    "tower-defense" | "horror" | "mmorts";

export type Sort = 'relevance' | 'alphabetical' | 'popularity' | 'release-date';
