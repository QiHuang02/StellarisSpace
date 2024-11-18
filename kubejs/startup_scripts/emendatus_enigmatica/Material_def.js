// priority: 197

let commonStratas = ['stone', 'andesite', 'diorite', 'granite', 'deepslate', 'netherrack', 'end_stone'];
let vanillaComplementStratas = ['netherrack', 'end_stone'];

/**
 * @type {EEConfig[]}
 */
let EE_MATERIALS = {
    // Vanilla
    // Coal
    coal: {
        name: 'coal',
        type: 'special',
        processedTypes: ['dust'],
        color: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e'],
        burnTime: 1600
    },
    // Iron
    iron: {
        name: 'iron',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#c9c9c9', '#828282', '#5e5e5e', '#353535'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:raw_iron',
            min: 1,
            max: 1
        },
        harvestLevel: 'stone'
    },
    // Copper
    copper: {
        name: 'copper',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#f7e6b7', '#f8b18d', '#cc6d51', '#a1383f', '#781c22'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:raw_copper',
            min: 2,
            max: 5
        },
        harvestLevel: 'stone'
    },
    // Gold
    gold: {
        name: 'gold',
        type: 'metal',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#fcf8a7', '#fad64a', '#dc9613', '#b26411'],
        strata: ['end_stone'],
        drop: {
            item: 'minecraft:raw_gold',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Netherite
    netherite: {
        name: 'netherite',
        type: 'metal',
        processedTypes: ['nugget', 'dust', 'gear', 'plate', 'rod'],
        color: ['#737173', '#4d494d', '#443d3f', '#31292a', '#271c1d']
    },
    // Diamond
    diamond: {
        name: 'diamond',
        type: 'gem',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#f2fffc', '#a1fbe8', '#20c5b5', '#1aaaa7', '#1c919a'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:diamond',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Emerald
    emerald: {
        name: 'emerald',
        type: 'gem',
        processedTypes: ['ore', 'dust', 'gear', 'plate', 'rod'],
        color: ['#e6fcee', '#41f384', '#00aa2c', '#009529', '#007b18'],
        strata: vanillaComplementStratas,
        drop: {
            item: 'minecraft:emerald',
            min: 1,
            max: 1
        },
        harvestLevel: 'iron'
    },
    // Amethyst
    amethyst: {
        name: 'amethyst',
        type: 'gem',
        processedTypes: ['dust', 'gear', 'plate', 'rod'],
        color: ['#fcfad2', '#fbc9e3', '#b18cf0', '#8b69ca', '#6e4ea9']
    },
    // Quartz
    quartz: {
        name: 'quartz',
        type: 'gem',
        processedTypes: ['dust', 'gear', 'plate', 'rod'],
        color: ['#ffffff', '#eae5de', '#d4caba', '#b6a48e', '#897b73']
    },
    // Lapis
    lapis: {
        name: 'lapis',
        type: 'gem',
        processedTypes: ['dust', 'gear'],
        color: ['#9db5ed', '#5981e1', '#1d54a9', '#1f4294', '#173782']
    },
    // Universal Modded Metals
    // Aluminum
    aluminum: {
        name: 'aluminum',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#f2fafc', '#dfedf2', '#c5dbed', '#9da8c9', '#7a80a8'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_aluminum',
            min: 1,
            max: 1
        }
    },
    // Osmium
    osmium: {
        name: 'osmium',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#e6ede9', '#abd1ca', '#83b0bd', '#3d5680', '#2c3766'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_osmium',
            min: 1,
            max: 1
        }
    },
    // Lead
    lead: {
        name: 'lead',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#aebcbf', '#707e8a', '#414a6a', '#28254d', '#1f1d47'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_lead',
            min: 1,
            max: 1
        }
    },
    // Nickel
    nickel: {
        name: 'nickel',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#f6f7f0', '#b0b59f', '#869071', '#5a5c57', '#40423f'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_nickel',
            min: 1,
            max: 1
        }
    },
    // Silver
    silver: {
        name: 'silver',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#ffffff', '#d8ecff', '#baccff', '#7b85d9', '#646db4'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_silver',
            min: 1,
            max: 1
        }
    },
    // Tin
    tin: {
        name: 'tin',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ebfaf9', '#bcd7e5', '#a1a6d3', '#74609e', '#473b61'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_tin',
            min: 1,
            max: 1
        }
    },
    // Uranium
    uranium: {
        name: 'uranium',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'bloodmagic'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ebe06a', '#98b350', '#43692f', '#113817', '#072411'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_uranium',
            min: 1,
            max: 1
        }
    },
    // Zinc
    zinc: {
        name: 'zinc',
        type: 'metal',
        processedTypes: ['ore', 'raw', 'ingot', 'nugget', 'dust', 'plate', 'gear', 'rod', 'storage_block', 'mekanism', 'bloodmagic'],
        harvestLevel: 'iron',
        strata: commonStratas,
        color: ['#efece6', '#d1d1a5', '#9ca67b', '#54714c', '#3c5a3b'],
        smallStorageBlock: false,
        drop: {
            item: 'emendatusenigmatica:raw_zinc',
            min: 1,
            max: 1
        }
    },
    // Universal Modded Gems
    // Sulfur
    sulfur: {
        name: 'sulfur',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#fff8e5', '#ffea47', '#ded531', '#bdc43b', '#a0ad3b'],
        drop: {
            item: 'emendatusenigmatica:sulfur_gem',
            min: 1,
            max: 1
        },
        gemTemplate: 8
    },
    // Niter
    niter: {
        name: 'niter',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        color: ['#ffffff', '#e0dde4', '#aea5b8', '#8b7f9a', '#716978'],
        drop: {
            item: 'emendatusenigmatica:niter_gem',
            min: 1,
            max: 1
        },
        gemTemplate: 8
    },
    // Fluorite
    fluorite: {
        name: 'fluorite',
        type: 'gem',
        processedTypes: ['ore', 'gem', 'dust', 'storage_block'],
        harvestLevel: 'stone',
        strata: commonStratas,
        texture: {
            item: {
                gem: 'item/fluorite_gem',
                dust: 'item/fluorite_dust'
            },
            block: {
                parent: 'minecraft:block/iron_block',
                storage_block: 'block/fluorite_block'
            }
        },
        drop: {
            item: 'emendatusenigmatica:fluorite_gem',
            min: 2,
            max: 4
        }
    },
    // Ruby
    ruby: {
        name: 'ruby',
        type: 'gem',
        baseItem: 'gem',
        processedTypes: ['gem', 'dust', 'gear', 'plate', 'rod', 'storage_block'],
        color: ['#fcd1cc', '#fb7b71', '#e93e43', '#c41735', '#780526'],
        gemTemplate: 1
    },
    // Sapphire
    sapphire: {
        name: 'sapphire',
        type: 'gem',
        baseItem: 'gem',
        processedTypes: ['gem', 'dust', 'gear', 'plate', 'rod', 'storage_block'],
        color: ['#fcfcfc', '#bde5fc', '#76c6fc', '#246be9', '#121d73'],
        gemTemplate: 3
    },
    // Misc
    // Wood
    wood: {
        name: 'wood',
        type: 'special',
        processedTypes: ['dust', 'storage_block'],
        color: ['#b8945f', '#987849', '#745a36', '#5f4a2b', '#4c3d26']
    },
    // Ender Pearl
    ender_pearl: {
        name: 'ender_pearl',
        type: 'special',
        processedTypes: ['dust', 'storage_block'],
        color: ['#8cf4e2', '#349988', '#0c3730', '#0b4d42', '#063931']
    },
    // Coal Coke
    coal_coke: {
        name: 'coal_coke',
        type: 'special',
        processedTypes: ['gem', 'dust', 'storage_block'],
        color: ['#819da6', '#2e4049', '#1c1c1e', '#252525', '#1a2a36'],
        texture: {
            item: {
                gem: 'item/coal_coke_gem',
            },
            block: {
                parent: 'minecraft:block/sand',
                storage_block: 'block/coal_coke_block'
            }
        },
        burnTime: 3200
    },
    // Silicon
    silicon: {
        name: 'silicon',
        type: 'special',
        processedTypes: ['gem'],
        texture: {
            item: {
                gem: 'item/silicon_gem'
            }
        }
    },
    // Alloys
    // Electrum
    electrum: {
        name: 'electrum',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#f4f7eb', '#eded91', '#e5b840', '#a85d1b', '#8c3a0e']
    },
    // Invar
    invar: {
        name: 'invar',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ffffff', '#b8c4bf', '#8d9f96', '#5b7669', '#495e57']
    },
    // Constantan
    constantan: {
        name: 'constantan',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#f0e8d8', '#e5c09e', '#d8876b', '#943a38', '#781e24']
    },
    // Bronze
    bronze: {
        name: 'bronze',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ebe9be', '#ebd288', '#d38c53', '#ba5b2f', '#9c3a27']
    },
    // Signalum
    signalum: {
        name: 'signalum',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#ffe4c9', '#fc8638', '#e55c17', '#993d0f', '#82260d']
    },
    // Lumium
    lumium: {
        name: 'lumium',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#fdfff7', '#e5f3b5', '#dcd56b', '#bf8c39', '#a87132']
    },
    // Enderium
    enderium: {
        name: 'enderium',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#5de8cc', '#289799', '#1c5961', '#0b2e47', '#0f1e36']
    },
    // Brass
    brass: {
        name: 'brass',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#dfedcc', '#c7d477', '#b5a642', '#8c6322', '#6b3c0d']
    },
    // Steel
    steel: {
        name: 'steel',
        type: 'alloy',
        processedTypes: ['dust', 'gear', 'ingot', 'nugget', 'plate', 'rod', 'storage_block'],
        color: ['#e4e6eb', '#9ea0a3', '#818185', '#454552', '#31313b']
    },
};

Object.entries(EE_MATERIALS).forEach(
    ([key, material]) => {
        new EmendatusEnigmaticaJS(material).registry();
    }
);