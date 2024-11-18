StartupEvents.registry('mob_effect', (event) => {
    event.create(`${global.packid}:stasis`)
         .beneficial()
         .color('gold')
         .modifyAttribute('generic.movement_speed', 'generic.movement_speed', -50, 'add_value')
         .modifyAttribute('generic.jump_strength', 'generic.jump_strength', -50,  'add_value')
         .modifyAttribute('enchantment.efficiency/mainhand', 'enchantment.efficiency/mainhand', -50, 'add_value')
    event.create(`${global.packid}:dark_veil`)
         .beneficial()
         .color('aqua')
});