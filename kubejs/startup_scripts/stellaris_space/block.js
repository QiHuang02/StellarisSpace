StartupEvents.registry('block', (event) => {
    event.create(`${global.packid}:solar_panel`, 'cardinal')
        .parentModel(`${global.packid}:block/solar_panel`)
        .hardness(2)
        .resistance(100)
        .fullBlock(false)
        .requiresTool(false)
        .renderType('cutout')
        .box(0.1, 0, 0.1, 0.9, 0.5, 0.9, false)
        .suffocating(false)
        .viewBlocking(true)
        .blockEntity((entityInfo) => {
            entityInfo.energyStorage('energy', [], 2147483647, 0, 10000, 0)
            entityInfo.serverTicking()
            entityInfo.tickFrequency(20)
        });

    event.create(`${global.packid}:dust`)
        .sandSoundType()
        .hardness(0.5)
        .resistance(0.5)
        .tagBoth(`${global.packid}:dust`)
        .tagBoth("c:dust")
        .requiresTool(true)
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:mineable/shovel")
});