// priority: 198

/**
 * @typedef {Object} EEConfig
 * @property {string} name - The name of the material.
 * @property {string} type - The type of the material (e.g., 'metal', 'special').
 * @property {string[]} [processedTypes] - A list of processed types for the material.
 * @property {string[]} [color] - A list of color codes.
 * @property {number} [burnTime] - Burn time in ticks, if applicable.
 * @property {Object} [drop] - Information about drops (optional).
 * @property {string} [drop.item] - The item dropped by this material.
 * @property {number} [drop.min] - Minimum amount of items dropped.
 * @property {number} [drop.max] - Maximum amount of items dropped.
 * @property {string[]} [strata] - Strata levels applicable to this material.
 * @property {string} [harvestLevel] - Required harvest tool level.
 * @property {number} [gemTemplate] - Gem template index (optional).
 * @property {Object} [texture] - Custom textures (optional).
 * @property {Object} [texture.item]
 * @property {string} [texture.item.ingot]
 * @property {string} [texture.item.nugget]
 * @property {string} [texture.item.gem]
 * @property {string} [texture.item.dust]
 * @property {string} [texture.item.plate]
 * @property {string} [texture.item.rod]
 * @property {string} [texture.item.gear]
 * @property {string} [texture.item.raw]
 * @property {Object} [texture.block]
 * @property {string} [texture.block.parent]
 * @property {string} [texture.block.ore]
 * @property {string} [texture.block.storage_block]
 */

/**
 * Class to handle Emendatus Enigmatica materials.
 * 
 * @param {EEConfig} config - Configuration object for the material.
 */
function EmendatusEnigmaticaJS(config) {
    this.name = config.name;
    this.type = config.type;
    this.harvestLevel = config.harvestLevel || null;
    this.processedTypes = config.processedTypes || [];
    this.strata = config.strata || [];
    this.color = config.color || [];
    this.burnTime = config.burnTime || 0;
    this.gemTemplate = config.gemTemplate || -1;
    this.drop = config.drop || null;
    this.texture = config.texture || {};
};

EmendatusEnigmaticaJS.prototype = {
    /**
     * Registers all processed types for the material.
     */
    registry() {
        let {
            name,
            type,
            harvestLevel,
            processedTypes,
            strata,
            color,
            burnTime,
            gemTemplate,
            drop,
            texture
        } = this;

        // 定义一个映射对象，将每个 processedType 与相应的函数映射起来
        let typeRegistryMap = {
            ore: () => registryOre(name, strata, harvestLevel, color, type, drop),
            raw: () => registryRaw(name, color),
            storage_block: () => registrySBlock(name, type, burnTime, color, texture),
            mekanism: () => registryMek(name, color),
            bloodmagic: () => registryBloodMagic(name, color),
            crush: () => registryCrush(name, color),
            ingot: () => registryIngot(name, burnTime, color, texture),
            nugget: () => registryNugget(name, burnTime, color),
            gem: () => registryGem(name, burnTime, color, gemTemplate),
            dust: () => registryDust(name, burnTime, color, texture),
            gear: () => registryGear(name, burnTime, color, texture),
            plate: () => registryPlate(name, burnTime, color, texture),
            rod: () => registryRod(name, burnTime, color, texture)
        };

        processedTypes.forEach((ptypes) => {
            typeRegistryMap[ptypes]();
        });
    }
};

function registryOre(name, strata, harvestLevel, color, type, drop) {
    let layerNames = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4'];
    let texturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/ore/${type}/0${index}`);

    strata.forEach((s) => {
        StartupEvents.registry('block', (event) => {
            let builder = event.create(`${global.modid}:${name}_ore_${s}`);

            builder.renderType('cutout')
                .hardness(EE_STRATAS[s].resistance)
                .soundType(SoundType.STONE)
                .requiresTool(true)
                .tagBoth('c:ores')
                .tagBoth(`c:ores/${name}`)
                .tagBoth(`c:ore_rates/singular`)
                .tagBlock(`minecraft:mineable/${EE_STRATAS[s].tool}`)
                .tagBlock(`c:mineable/paxel`)
                .tagBlock(`minecraft:needs_${harvestLevel}_tool`)

            if (color) {
                builder.modelGenerator((model) => {
                    model.parent(`${EE_STRATAS[s].texture}`);
                    model.texture(s, `${EE_STRATAS[s].texture}`);
                    layerNames.forEach((layer, index) => {
                        model.texture(layer, texturePaths[index]);
                    });
                    model.element((element) => {
                        element.allFaces((face) => {
                            face.uv(0, 0, 16, 16).tex(s);
                        });
                    });
                    layerNames.forEach((layer, index) => {
                        model.element((element) => {
                            element.allFaces((face) => {
                                face.uv(0, 0, 16, 16).tex(layer).tintindex(index);
                            });
                        });
                    })
                });

                color.forEach((colorValue, index) => {
                    builder.color(index, colorValue);
                    builder.item((item) => {
                        item.color(index, colorValue);
                    });
                });
            };
        });
        createLootOreJson(name, s, drop);
    });
};

function registryRaw(name, color) {
    let layerNames = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4'];
    let texturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/raw_block/0${index}`);

    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:raw_${name}`)
            .tag('c:raw_materials')
            .tag(`c:raw_materials/${name}`)

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/raw/0${i}`)
                    .color(i, color[i]);
            }
        }
    });
    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:raw_${name}_block`)

        builder.modelGenerator((model) => {
            model.parent('minecraft:block/raw_iron_block')

            layerNames.forEach((layer, index) => {
                model.texture(layer, texturePaths[index]);
                model.element((element) => {
                    element.allFaces((face) => {
                        face.uv(0, 0, 16, 16).tex(layer).tintindex(index);
                    })
                })
            });
        })

        builder.renderType('cutout')
            .tagBoth('c:storage_blocks')
            .tagBoth(`c:storage_blocks/raw_${name}`)
            .tagBlock('minecraft:mineable/pickaxe')
            .soundType(SoundType.METAL)
            .requiresTool(true)
            .hardness(3)
            .resistance(3);

        if (color) {
            color.forEach((colorValue, index) => {
                builder.color(index, colorValue);
                builder.item((item) => {
                    item.color(index, colorValue);
                });
            });
        }
    });
};

function registrySBlock(name, type, burnTime, color) {
    let layerNames = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4'];
    let metalTexturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/block/metal/0${index}`);
    let gemTexturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/block/gem/0${index}`);

    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:${name}_block`);

        builder.renderType('cutout')
            .tagBoth('c:storage_blocks')
            .tagBoth(`c:storage_blocks/${name}`)
            .tagBlock('minecraft:mineable/pickaxe')
            .requiresTool(true)
            .hardness(3)
            .resistance(3)

        if (burnTime) {
            builder.item(i => {
                i.burnTime(burnTime * 10)
            })
            builder.tagBoth('fuelgoeshere:forced_fuels')
        }

        if (EE_MATERIALS[name].texture?.block?.parent && EE_MATERIALS[name].texture?.block?.storage_block) {
            builder.modelGenerator((model) => {
                model.parent(`${EE_MATERIALS[name].texture?.block?.parent}`)
                model.texture('layer0', `${global.modid}:${EE_MATERIALS[name].texture?.block?.storage_block}`)
                model.element((element) => {
                    element.allFaces((face) => {
                        face.uv(0, 0, 16, 16).tex('layer0')
                    })
                })
            })
            return
        }

        if (color) {
            builder.modelGenerator((model) => {
                model.parent('minecraft:block/iron_block')
                if (type === 'metal' | type === 'alloy' | type === 'special') {
                    layerNames.forEach((layer, index) => {
                        model.texture(layer, metalTexturePaths[index]);
                    });
                } else if (type === 'gem') {
                    layerNames.forEach((layer, index) => {
                        model.texture(layer, gemTexturePaths[index]);
                    })
                }

                layerNames.forEach((layer, index) => {
                    model.element((element) => {
                        element.allFaces((face) => {
                            face.uv(0, 0, 16, 16).tex(layer).tintindex(index);
                        })
                    })
                });
            })

            color.forEach((colorValue, index) => {
                builder.color(index, colorValue);
                builder.item((item) => {
                    item.color(index, colorValue);
                });
            });
        }
    });
}

function registryIngot(name, burnTime, color, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_ingot`)
            .tag('c:ingots')
            .tag(`c:ingots/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.ingot) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.ingot}`)
            return
        }

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/ingot/0${i}`)
                    .color(i, color[i]);
            }
        }
    })
};

function registryNugget(name, burnTime, color, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_nugget`)
            .tag('c:nuggets')
            .tag(`c:nuggets/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.nugget) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.nugget}`)
            return
        }

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/nugget/0${i}`)
                    .color(i, color[i]);
            }
        }
    })
};

function registryGem(name, burnTime, color, gemTemplate, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_gem`)
            .tag('c:gems')
            .tag(`c:gems/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.gem) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.gem}`)
            return
        };

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/gem/template_${gemTemplate}/0${i}`)
                    .color(i, color[i])
            }
        }
    })
}

function registryDust(name, burnTime, color, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_dust`)
            .tag('c:dusts')
            .tag(`c:dusts/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.dust) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.dust}`)
            return
        };

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/dust/0${i}`)
                    .color(i, color[i])
            }
        }
    })
}

function registryGear(name, burnTime, color, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_gear`)
            .tag('c:gears')
            .tag(`c:gears/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.gear) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.gear}`)
            return
        };

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/gear/0${i}`)
                    .color(i, color[i])
            }
        }
    })
}

function registryPlate(name, burnTime, color, texture) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_plate`)
            .tag('c:plates')
            .tag(`c:plates/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.plate) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.plate}`)
            return
        };

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/plate/0${i}`)
                    .color(i, color[i])
            }
        }
    })
}

function registryRod(name, burnTime, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_rod`)
            .tag('c:rods')
            .tag(`c:rods/${name}`);

        if (builder) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };

        if (EE_MATERIALS[name].texture?.item?.rod) {
            builder.texture(`${global.modid}:${EE_MATERIALS[name].texture?.item?.rod}`)
            return
        };

        if (color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/rod/0${i}`)
                    .color(i, color[i])
            }
        }
    })
}

function registryMek(name, color) {
    StartupEvents.registry('item', (event) => {
        let crystal = event.create(`${global.modid}:${name}_crystal`).tag('mekanism:crystals').tag(`mekanism:crystals/${name}`)
        let shard = event.create(`${global.modid}:${name}_shard`).tag('mekanism:shards').tag(`mekanism:shards/${name}`)
        let clump = event.create(`${global.modid}:${name}_clump`).tag('mekanism:clumps').tag(`mekanism:clumps/${name}`)
        let dirtyDust = event.create(`${global.modid}:${name}_dirty_dust`).tag('mekanism:dirty_dusts').tag(`mekanism:dirty_dusts/${name}`)

        if (color) {
            for (let i = 0; i < color.length; i++) {
                crystal.texture(`layer${i}`, `${global.modid}:item/templates/crystal/0${i}`)
                    .color(i, color[i]);
                shard.texture(`layer${i}`, `${global.modid}:item/templates/shard/0${i}`)
                    .color(i, color[i]);
                clump.texture(`layer${i}`, `${global.modid}:item/templates/clump/0${i}`)
                    .color(i, color[i]);
                dirtyDust.texture(`layer${i}`, `${global.modid}:item/templates/dirty_dust/0${i}`)
                    .color(i, color[i]);
            }
        }
    });
};

function registryBloodMagic(name, color) {
    StartupEvents.registry('item', (event) => {
        let fragment = event.create(`${global.modid}:${name}_fragment`).tag('bloodmagic:fragments').tag(`bloodmagic:fragments/${name}`);
        let gravel = event.create(`${global.modid}:${name}_gravel`).tag('bloodmagic:gravels').tag(`bloodmagic:gravels/${name}`);

        if (color) {
            for (let i = 0; i < color.length; i++) {
                fragment.texture(`layer${i}`, `${global.modid}:item/templates/fragment/0${i}`)
                    .color(i, color[i]);
                gravel.texture(`layer${i}`, `${global.modid}:item/templates/gravel/0${i}`)
                    .color(i, color[i]);
            }
        }
    });
};

function registryCrush(name, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_crushed_ore`)
            .tag('create:crushed_raw_materials')
            .tag(`create:crushed_raw_materials/${name}`)

        if (this.color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/crushed_ore/0${i}`)
                    .color(i, color[i]);
            };
        }
    });
};