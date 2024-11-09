// const $EnergyStorageAttachment$Factory = Java.loadClass(`dev.latvian.mods.kubejs.block.entity.EnergyStorageAttachment$Factory`)

BlockEvents.blockEntityTick('stellaris_space:solar_panel', (event) => {
    let isDay = event.level.day;
    let isNight = event.level.night;
    let canSeeSky = event.block.canSeeSky;
    let entity = event.block.entity;

    if(canSeeSky) {
        if(isDay) entity.attachments.energy.addEnergy(500 * 20, false)
        else if(isNight) event.block.entity.attachments.energy.addEnergy(5 * 20, false)
    }
})

BlockEvents.rightClicked('stellaris_space:solar_panel', (event) => {
    let name = event.player.getName();
    let handItem = event.player.mainHandItem;
    let cap = event.block.entity.attachments.energy.energyStored;
    
    if(event.hand != "MAIN_HAND") return;
    if(handItem == 'mekanism:configurator') {
        // event.player.tell(`Player Name: ${name[2]}`);
        event.player.runCommandSilent(`title @s actionbar [{"text":"MaxEnergy: ","color":"#55FF55"},{"text":" ${cap}","color":"#FFAA00"}]`)
    };
})