interface Ability {
    name: string;
    url: string;
}

interface Version {
    name: string;
    url: string;
}

interface VersionDetails {
    rarity: number;
    version: Version;
}

interface Item {
    name: string;
    url: string;
}

interface HeldItem {
    item: Item;
    version_details: VersionDetails[];
}

interface Move {
    name: string;
    url: string;
}

interface MoveLearnMethod {
    name: string;
    url: string;
}

interface VersionGroup {
    name: string;
    url: string;
}

interface MoveVersionGroupDetail {
    level_learned_at: number;
    version_group: VersionGroup;
    move_learn_method: MoveLearnMethod;
}

interface GameIndex {
    game_index: number;
    version: Version;
}

interface Species {
    name: string;
    url: string;
}

interface Type {
    name: string;
    url: string;
}

interface Stat {
    name: string;
    url: string;
}

interface StatDetails {
    base_stat: number;
    effort: number;
    stat: Stat;
}

interface Generation {
    name: string;
    url: string;
}

interface PastType {
    generation: Generation;
    types: Type[];
}

interface Sprite {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string;
            front_female: string | null;
        };
        home: {
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
        };
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        };
        showdown: {
            back_default: string;
            back_female: string | null;
            back_shiny: string;
            back_shiny_female: string | null;
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
        };
    };
    versions: {
        "generation-i": {
            "red-blue": {
                back_default: string;
                back_gray: string;
                front_default: string;
                front_gray: string;
            };
            yellow: {
                back_default: string;
                back_gray: string;
                front_default: string;
                front_gray: string;
            };
        };
        "generation-ii": {
            crystal: {
                back_default: string;
                back_shiny: string;
                front_default: string;
                front_shiny: string;
            };
            gold: {
                back_default: string;
                back_shiny: string;
                front_default: string;
                front_shiny: string;
            };
            silver: {
                back_default: string;
                back_shiny: string;
                front_default: string;
                front_shiny: string;
            };
        };
        "generation-iii": {
            emerald: {
                front_default: string;
                front_shiny: string;
            };
            "firered-leafgreen": {
                back_default: string;
                back_shiny: string;
                front_default: string;
                front_shiny: string;
            };
            "ruby-sapphire": {
                back_default: string;
                back_shiny: string;
                front_default: string;
                front_shiny: string;
            };
        };
        "generation-iv": {
            "diamond-pearl": {
                back_default: string;
                back_female: string | null;
                back_shiny: string;
                back_shiny_female: string | null;
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
            "heartgold-soulsilver": {
                back_default: string;
                back_female: string | null;
                back_shiny: string;
                back_shiny_female: string | null;
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
            platinum: {
                back_default: string;
                back_female: string | null;
                back_shiny: string;
                back_shiny_female: string | null;
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
        };
        "generation-v": {
            "black-white": {
                animated: {
                    back_default: string;
                    back_female: string | null;
                    back_shiny: string;
                    back_shiny_female: string | null;
                    front_default: string;
                    front_female: string | null;
                    front_shiny: string;
                    front_shiny_female: string | null;
                };
                back_default: string;
                back_female: string | null;
                back_shiny: string;
                back_shiny_female: string | null;
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
        };
        "generation-vi": {
            "omegaruby-alphasapphire": {
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
            "x-y": {
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
        };
        "generation-vii": {
            icons: {
                front_default: string;
                front_female: string | null;
            };
            "ultra-sun-ultra-moon": {
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
        };
        "generation-viii": {
            icons: {
                front_default: string;
                front_female: string | null;
            };
        };
    };
}

interface Cries {
    latest: string;
    legacy: string;
}

export interface PokemonData {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: Ability;
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: {
        move: Move;
        version_group_details: MoveVersionGroupDetail[];
    }[];
    species: Species;
    sprites: Sprite;
    cries: Cries;
    stats: StatDetails[];
    types: {
        slot: number;
        type: Type;
    }[];
    past_types: PastType[];
}
