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
    strata.forEach((s) => {
        StartupEvents.registry('block', (event) => {
            let builder = event.create(`${global.modid}:${name}_ore_${s}`);

            builder.modelGenerator((model) => {
                model.parent(`${global.EE_STRATAS[s].texture}`)
                model.texture(`layer0`, `${global.modid}:block/templates/ore/${type}/00`)
                model.texture(`layer1`, `${global.modid}:block/templates/ore/${type}/01`)
                model.texture(`layer2`, `${global.modid}:block/templates/ore/${type}/02`)
                model.texture(`layer3`, `${global.modid}:block/templates/ore/${type}/03`)
                model.texture(`layer4`, `${global.modid}:block/templates/ore/${type}/04`)
                model.texture(`${s}`, `${global.EE_STRATAS[s].texture}`)
                model.element((element) => {
                    element.allFaces((base) => {
                        base.uv(0, 0, 16, 16).tex(`${s}`)
                    })
                })
                model.element((element) => {
                    element.allFaces((face_layer0) => {
                        face_layer0.uv(0, 0, 16, 16).tex('layer0').tintindex(0)
                    })
                })
                model.element((element) => {
                    element.allFaces((face_layer1) => {
                        face_layer1.uv(0, 0, 16, 16).tex('layer1').tintindex(1)
                    })
                })
                model.element((element) => {
                    element.allFaces((face_layer2) => {
                        face_layer2.uv(0, 0, 16, 16).tex('layer2').tintindex(2)
                    })
                })
                model.element((element) => {
                    element.allFaces((face_layer3) => {
                        face_layer3.uv(0, 0, 16, 16).tex('layer3').tintindex(3)
                    })
                })
                model.element((element) => {
                    element.allFaces((face_layer4) => {
                        face_layer4.uv(0, 0, 16, 16).tex('layer4').tintindex(4)
                    })
                })
            })

            if (color) {
                for (let i = 0; i < color.length; i++) {
                    builder.color(i, color[i]);
                    builder.item(item => {
                        item.color(i, color[i])
                    })
                };
            }

            builder.renderType("cutout")
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
}

/**
 * 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 */
function registryRaw(name, color) {
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
            model.texture(`layer0`, `${global.modid}:block/templates/raw_block/00`)
            model.texture(`layer1`, `${global.modid}:block/templates/raw_block/01`)
            model.texture(`layer2`, `${global.modid}:block/templates/raw_block/02`)
            model.texture(`layer3`, `${global.modid}:block/templates/raw_block/03`)
            model.texture(`layer4`, `${global.modid}:block/templates/raw_block/04`)
            model.element((element) => {
                element.allFaces((face_layer0) => {
                    face_layer0.uv(0, 0, 16, 16).tex('layer0').tintindex(0)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer1) => {
                    face_layer1.uv(0, 0, 16, 16).tex('layer1').tintindex(1)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer2) => {
                    face_layer2.uv(0, 0, 16, 16).tex('layer2').tintindex(2)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer3) => {
                    face_layer3.uv(0, 0, 16, 16).tex('layer3').tintindex(3)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer4) => {
                    face_layer4.uv(0, 0, 16, 16).tex('layer4').tintindex(4)
                })
            })
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
            for (let i = 0; i < color.length; i++) {
                builder.color(i, color[i])
                builder.item(item => {
                    item.color(i, color[i])
                })
            }
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
    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:${name}_block`);

        builder.modelGenerator((model) => {
            model.parent('minecraft:block/iron_block')
            if (type === 'metal' | type === 'alloy' | type === 'special') {
                model.texture(`layer0`, `${global.modid}:block/templates/block/metal/00`)
                model.texture(`layer1`, `${global.modid}:block/templates/block/metal/01`)
                model.texture(`layer2`, `${global.modid}:block/templates/block/metal/02`)
                model.texture(`layer3`, `${global.modid}:block/templates/block/metal/03`)
                model.texture(`layer4`, `${global.modid}:block/templates/block/metal/04`)
            } else if (type === 'gem') {
                model.texture(`layer0`, `${global.modid}:block/templates/block/gem/00`)
                model.texture(`layer1`, `${global.modid}:block/templates/block/gem/01`)
                model.texture(`layer2`, `${global.modid}:block/templates/block/gem/02`)
                model.texture(`layer3`, `${global.modid}:block/templates/block/gem/03`)
                model.texture(`layer4`, `${global.modid}:block/templates/block/gem/04`)
            }

            model.element((element) => {
                element.allFaces((face_layer0) => {
                    face_layer0.uv(0, 0, 16, 16).tex('layer0').tintindex(0)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer1) => {
                    face_layer1.uv(0, 0, 16, 16).tex('layer1').tintindex(1)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer2) => {
                    face_layer2.uv(0, 0, 16, 16).tex('layer2').tintindex(2)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer3) => {
                    face_layer3.uv(0, 0, 16, 16).tex('layer3').tintindex(3)
                })
            })
            model.element((element) => {
                element.allFaces((face_layer4) => {
                    face_layer4.uv(0, 0, 16, 16).tex('layer4').tintindex(4)
                })
            })
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
            for (let i = 0; i < color.length; i++) {
                builder.color(i, color[i])
                builder.item(item => {
                    item.color(i, color[i])
                })
            }
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