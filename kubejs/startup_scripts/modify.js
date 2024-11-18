ItemEvents.modification((event) => {
    const throwables = [
        'minecraft:ender_pearl',
        'minecraft:egg',
        'minecraft:snowball',
    ]

    throwables.forEach(throwables => {
        event.modify(throwables, item => {
            item.maxStackSize = 64
        })
    })
})