StartupEvents.registry('block', (event) => {
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