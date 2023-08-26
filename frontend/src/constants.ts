import {Platform, Genre, Sort} from './types';

export const platforms: Platform[] = ['any platform', 'pc', 'browser']; // list of all platforms

export const genres: Genre[] = ["any genre", "mmorpg", "shooter", "strategy",
    "moba", "racing", "sports", "social", "sandbox",
    "open-world", "survival", "pvp", "pve", "pixel",
    "voxel", "zombie", "turn-based", "first-person",
    "third-Person", "top-down", "tank", "space",
    "sailing", "side-scroller", "superhero",
    "permadeath", "card", "battle-royale", "mmo",
    "mmofps", "mmotps", "3d", "2d", "anime", "fantasy",
    "sci-fi", "fighting", "action-rpg", "action",
    "military", "martial-arts", "flight", "low-spec",
    "tower-defense", "horror", "mmorts"]; // list of all genres

export const sorts: Sort[] = ['relevance', 'alphabetical', 'popularity', 'release-date']; // list of all sorts