MoreJS.registerPotionBrewing(event => {
    const potion = [
        "minecraft:water", "minecraft:awkward", "minecraft:thick", "minecraft:mundane",
        "minecraft:healing", "minecraft:harming", "minecraft:regeneration", "minecraft:swiftness",
        "minecraft:fire_resistance", "minecraft:poison", "minecraft:weakness", "minecraft:strength",
        "minecraft:slowness", "minecraft:night_vision", "minecraft:invisibility", "minecraft:water_breathing",
        "minecraft:leaping", "minecraft:luck", "minecraft:empty", "minecraft:turtle_master",
        "minecraft:slow_falling", "minecraft:wind_charged", "minecraft:weaving", "minecraft:oozing",
        "minecraft:infested", "minecraft:long_night_vision", "minecraft:long_leaping", "minecraft:strong_leaping",
        "minecraft:long_swiftness", "minecraft:strong_swiftness", "minecraft:strong_healing", "minecraft:long_poison",
        "minecraft:strong_poison", 
    ]

    potion.forEach((potion) => {
        event.removePotionBrewing({
            input: potion,
            ingredient: Ingredient.all
        })
        event.removePotionBrewing({
            output: potion,
            ingredient: Ingredient.all
        })
    })
})