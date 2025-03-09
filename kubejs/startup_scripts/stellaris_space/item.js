StartupEvents.registry("item", (event) => {
    const hammer = [
        ["wooden", "wood", "wood", "common"],
        ["cobblestone", "stone", "cobblestone", "common"],
        ["iron", "iron", "iron", "uncommon"],
        ["diamond", "diamond", "diamond", "rare"],
        ["netherite", "netherite", "netherite", "epic"]
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
})