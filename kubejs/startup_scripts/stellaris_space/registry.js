global.packid = 'stellaris_space';

Platform.setModName(`${global.packid}`, 'Stellaris Space')

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

StartupEvents.registry("item", (event) => {
    const hammer = [
        ["wooden", "wood", "wood", "common"],
        ["cobblestone", "stone", "cobblestone", "common"],
        ["iron", "iron", "iron",  "uncommon"],
        ["diamond", "diamond", "diamond", "rare"],
        ["netherite", "netherite", "netherite",  "epic"]
    ];

    hammer.forEach(([
        name,
        tier,
        tag,
        rarity
    ]) => {
        event.create(`${global.packid}:${name}_hammer`, "pickaxe")
        .tier(tier)
        .tag("c:enchantables")
        .tag("c:tools")
        .tag("c:tools/hammer")
        .tag(`${global.packid}:hammer`)
        .tag(`${global.packid}:hammer/` + tag)
        .rarity(rarity)
        .unstackable()
    });

    event.create(`${global.packid}:infinity_upgrade_smithing_template`);
})