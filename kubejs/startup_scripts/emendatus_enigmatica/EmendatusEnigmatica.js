// priority: 198

/**
 * 
 * @param {EEConfig} config
 * @returns
 */
function EmendatusEnigmaticaJS(config) {
    this.name = config.name;
    this.type = config.type;
    this.harvestLevel = config.harvestLevel;
    this.processedTypes = config.processedTypes;
    this.strata = config.strata;
    this.color = config.color;
    this.burnTime = config.burnTime || undefined;
    this.gemTemplate = config.gemTemplate || -1;
    this.drop = config.drop;
};

EmendatusEnigmaticaJS.prototype = {
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
            drop
        } = this;

        // 定义一个映射对象，将每个 processedType 与相应的函数映射起来
        let typeRegistryMap = {
            ore: () => registryOre(name, strata, harvestLevel, color, type, drop),
            raw: () => registryRaw(name, color),
            storage_block: () => registrySBlock(name, type, burnTime, color),
            mekanism: () => registryMek(name, color),
            bloodmagic: () => registryBloodMagic(name, color),
            crush: () => registryCrush(name, color)
        };

        // 处理默认类型
        let defaultTypes = [
            'ingot',
            'dust',
            'gear',
            'nugget',
            'plate',
            'rod',
            'gem'
        ];

        processedTypes.forEach((ptypes) => {
            if (typeRegistryMap[ptypes]) {
                // 如果映射对象中存在对应的处理方法，则直接调用
                typeRegistryMap[ptypes]();
            } else if (defaultTypes.includes(ptypes)) {
                // 否则检查是否为默认类型，如果是则调用默认注册方法
                registryItem(ptypes, name, color, burnTime, gemTemplate);
            }
        });
    }
};

/**
 * Description placeholder
 *
 * @param {String} name
 * @param {String} strata
 * @param {String} harvestLevel
 * @param {String[]} color
 * @param {String} type
 * @param {String} drop
 */
function registryOre(name, strata, harvestLevel, color, type, drop) {
    let layerNames = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4'];
    let texturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/ore/${type}/0${index}`);

    strata.forEach((s) => {
        StartupEvents.registry('block', (event) => {
            let builder = event.create(`${global.modid}:${name}_ore_${s}`);

            builder.modelGenerator((model) => {
                model.parent(`${global.EE_STRATAS[s].texture}`);

                model.texture(s, `${global.EE_STRATAS[s].texture}`);

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

            if (color) {
                color.forEach((colorValue, index) => {
                    builder.color(index, colorValue);
                    builder.item((item) => {
                        item.color(index, colorValue);
                    });
                });
            };

            builder.renderType('cutout')
            .hardness(global.EE_STRATAS[s].resistance)
            .soundType(SoundType.STONE)
            .requiresTool(true)
            .tagBoth('c:ores')
            .tagBoth(`c:ores/${name}`)
            .tagBoth(`c:ore_rates/singular`)
            .tagBlock(`minecraft:mineable/${global.EE_STRATAS[s].tool}`)
            .tagBlock(`c:mineable/paxel`)
            .tagBlock(`minecraft:needs_${harvestLevel}_tool`)
        });

        createLootOre(name, s, drop);
    });
};

/**
 * 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 */
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


/**
 * Description placeholder
 *
 * @param {*} name
 * @param {*} type
 * @param {*} ptypes
 * @param {*} burnTime
 * @param {*} color
 */
function registrySBlock(name, type, burnTime, color) {
    let layerNames = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4'];
    let metalTexturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/block/metal/0${index}`);
    let gemTexturePaths = layerNames.map((layer, index) => `${global.modid}:block/templates/block/gem/0${index}`);

    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:${name}_block`);

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

        builder.renderType('cutout')
            .tagBoth('c:storage_blocks')
            .tagBoth(`c:storage_blocks/${name}`)
            .tagBlock('minecraft:mineable/pickaxe')
            .soundType(SoundType.METAL)
            .requiresTool(true)
            .hardness(3)
            .resistance(3)

        if (color) {
            color.forEach((colorValue, index) => {
                builder.color(index, colorValue);
                builder.item((item) => {
                    item.color(index, colorValue);
                });
            });
        }

        if (burnTime) {
            builder.item(i => {
                i.burnTime(burnTime * 10)
            })
            builder.tagBoth('fuelgoeshere:forced_fuels')
        }
    });
}

/**
 * 
 * @param {String} ptypes 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 * @param {Number} burnTime The combustion value of the material.
 * @param {gemTemplate} gemTemplate 
 */
function registryItem(ptypes, name, color, burnTime, gemTemplate) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_${ptypes}`)
            .tag(`c:${ptypes}s`)
            .tag(`c:${ptypes}s/${name}`);

        if (burnTime) {
            builder.burnTime(burnTime)
            builder.tag('fuelgoeshere:forced_fuels')
        };
        if (color) {
            for (let i = 0; i < color.length; i++) {
                if (ptypes === 'gem') {
                    if (name === 'coal_coke') {
                        builder.texture(`${global.modid}:item/coal_coke_gem`)
                    } else {
                        builder.texture(`layer${i}`, `${global.modid}:item/templates/gem/template_${gemTemplate}/0${i}`)
                            .color(i, color[i])
                    }
                } else {
                    builder.texture(`layer${i}`, `${global.modid}:item/templates/${ptypes}/0${i}`)
                        .color(i, color[i]);
                }
            }
        }
    });
};


/**
 * Description placeholder
 *
 * @param {*} name
 * @param {*} color
 */
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


/**
 * Description placeholder
 *
 * @param {*} name
 * @param {*} color
 */
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


/**
 * Description placeholder
 *
 * @param {*} name
 * @param {*} color
 */
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