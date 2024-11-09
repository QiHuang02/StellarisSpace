// priority: 199

global.modid = 'emendatusenigmatica';

const assetspath = `./kubejs/assets/${global.modid}`;
const datapath = `./kubejs/data/${global.modid}`;

const paths = {
    models: {
        block: `${assetspath}/models/block/`,
    },
    textures: {
        block: `${assetspath}/textures/blocks/templates`,
        item: `${assetspath}/textures/items/templates`
    },
    loots: {
        block: `${datapath}/loot_table/blocks/`,
    },
    recipes: {
        recipe: `${datapath}/recipe/`
    }
};

const OreModelJson = (base, overlay) => ({
    loader: 'neoforge:composite',
    parent: 'block/block',
    ambientocclusion: false,
    textures: {
        particle: base
    },
    children: {
        solid: {
            parent: 'block/cube_all',
            render_type: 'minecraft:solid',
            textures: {
                all: base,
            },
        },
        translucent: {
            parent: 'block/cube_all',
            render_type: 'minecraft:translucent',
            textures: {
                all: overlay,
            },
        },
    },
});

const OreLootJson = (block, item, sequence, min, max) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "bonus_rolls": 0.0,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "predicates": {
                                            "minecraft:enchantments": [
                                                {
                                                    "enchantments": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ],
                            "name": block
                        },
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "add": false,
                                    "count": {
                                        "type": "minecraft:uniform",
                                        "max": max,
                                        "min": min
                                    },
                                    "function": "minecraft:set_count"
                                },
                                {
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:ore_drops",
                                    "function": "minecraft:apply_bonus"
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ],
                            "name": item
                        }
                    ]
                }
            ],
            "rolls": 1.0
        }
    ],
    "random_sequence": sequence
});

function createModelOre(name, strata) {
    let model = JsonIO.read(`${paths.models.block}${name}_ore_${strata}.json`) || {};
    if (model.parent === undefined) {
        console.log(`No block model found, creating new: ${name}_ore_${strata}.json`);
        JsonIO.write(
            `${paths.models.block}${name}_ore_${strata}.json`,
            OreModelJson(
                global.EE_STRATAS[strata].texture,
                `emendatusenigmatica:block/overlays/ore/${name}`
            )
        )
    }
};

function createLootOre(name, strata, drop) {
    let loot = JsonIO.read(`${paths.loots.block}${name}_ore_${strata}.json`) || {};
    if (loot.type === undefined) {
        console.log(`No block loot table found, creating new: ${name}_ore_${strata}.json`);
        let min = parseInt(drop.min);
        let max = parseInt(drop.max);
        JsonIO.write(
            `${paths.loots.block}${name}_ore_${strata}.json`,
            OreLootJson(
                `emendatusenigmatica:${name}_ore_${strata}`,
                `${drop.item}`,
                `emendatusenigmatica:blocks/${name}_ore_${strata}`,
                min,
                max
            )
        )
    }
};

Platform.setModName(`${global.modid}`, 'Emendatus Enigmatica');