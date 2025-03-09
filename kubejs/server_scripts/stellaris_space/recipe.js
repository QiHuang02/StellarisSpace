ServerEvents.recipes((event) => {
    // Remove recipe
    const recipetype = [
        "minecraft:stonecutting",
        "minecraft:campfire_cooking",
        "minecraft:smoking",
        "occultism:crushing",
        "occultism:miner",
        "occultism:ritual",
        "occultism:spirit_fire",
        "occultism:spirir_trade"
    ]

    const removeRecipesById = [
        "ironfurnaces:furnaces/iron_furnace",
        "ironfurnaces:furnaces/silver_furnace2",
        "ironfurnaces:furnaces/gold_furnace",
        "ironfurnaces:upgrades/upgrade_iron",
        "ironfurnaces:upgrades/upgrade_silver",
        "ironfurnaces:upgrades/upgrade_gold",
    ]

    const aiotRecipe = [
        "wooden",
        "stone",
        "iron",
        "gold",
        "diamond",
        "netherite"
    ]

    recipetype.forEach(types => {
        event.remove({
            type: types
        })
    })

    removeRecipesById.forEach(id => {
        event.remove({
            id: id
        })
    })

    aiotRecipe.forEach(material => {
        event.remove({
            output: `actuallyadditions:${material}_aiot`
        })
    })

    event.remove({
        id: "pipez:ultimate_upgrade"
    })

    // Hammer recipe
    const hammer = [
        ["wooden", "#minecraft:planks", null, null],
        ["cobblestone", "#c:cobblestones", null, null],
        ["iron", "#c:ingots/iron", null, null],
        ["diamond", "#c:gems/diamond", null, null],
        ["netherite", "#c:ingots/netherite", "minecraft:netherite_upgrade_smithing_template", `#${global.packid}:hammer/diamond`]
    ]

    hammer.forEach(([
        name,
        material,
        template,
        base
    ]) => {
        if (template != null && base != null) {
            event.smithing(
                Item.of(`${global.packid}:${name}_hammer`, 1), // 输出物品
                template, // 锻造模板
                base, // 输入物品
                material // 升级材料
            )
        } else {
            event.recipes.kubejs.shaped(
                Item.of(`${global.packid}:${name}_hammer`, 1),
                [
                    " AB",
                    " BA",
                    "B  "
                ],
                {
                    A: material,
                    B: "#c:rods/wooden"
                }
            )
        }
    })

    event.smithing(
        'pipez:ultimate_upgrade',
        'minecraft:netherite_upgrade_smithing_template',
        'pipez:advanced_upgrade',
        'minecraft:netherite_ingot'
    );
    // event.smithing(
    //     'pipez:infinity_upgrade',
    //     `${global.packid}:infinity_upgrade_smithing_template`,
    //     'pipez:ultimate_upgrade',
    //     'minecraft:nether_star'
    // )
})