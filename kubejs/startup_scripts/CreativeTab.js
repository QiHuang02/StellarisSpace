StartupEvents.registry('creative_mode_tab', (event) => {
    let tab = event.create(`${global.modid}:${global.modid}`);

    tab.icon(() => Item.of('emendatusenigmatica:netherite_gear'));
    tab.content(() => [
        '@emendatusenigmatica'
    ])
})

StartupEvents.registry('creative_mode_tab', (event) => {
    let tab = event.create(`${global.packid}:${global.packid}`);

    tab.icon(() => Item.of('emendatusenigmatica:netherite_gear'));
    tab.content(() => [
        '@stellaris_space'
    ])
})

StartupEvents.modifyCreativeTab('kubejs:tab', (event) => {
    event.remove('@emendatusenigmatica');
    event.remove('@stellaris_space')
})