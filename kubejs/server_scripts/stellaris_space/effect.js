const $MobEffectInstance_ = Java.loadClass('net.minecraft.world.effect.MobEffectInstance');

ItemEvents.rightClicked('stellaris_space:zhonya_hourglass', (event) => {
    let { player } = event;

    if (player && !player.isFakePlayer()) {
        player.invulnerableTime = 20 * 5.5;
        player.addEffect(new $MobEffectInstance_('stellaris_space:stasis', 20 * 5));
        player.addItemCooldown('stellaris_space:zhonya_hourglass', 20 * 5);
        player.addItemCooldown('minecraft:milk_bucket', 20 * 5);
        player.abilities.setFlyingSpeed(0);
        player.onUpdateAbilities();

        event.server.scheduleInTicks(20 * 5.5, () => {
            player.abilities.setFlyingSpeed(0.05);
            player.onUpdateAbilities();
        })
    }
});

// ItemEvents.canPickUp((event) => {
//     let { player, item } = event;

//     if (player.hasEffect('stellaris_space:stasis')) {
//         event.cancel;
//     };
// });

EntityEvents.afterHurt((event) => {
    let { entity, source } = event;

    if (source.player && source.player.hasEffect('stellaris_space:stasis')) {
        event.cancel();
    }
    if (entity.hasEffect('stellaris_space:stasis')) {
        event.cancel();
    }
});

// PlayerEvents.tick((event) => {
//     let { player } = event;

//     if (!player.hasEffect('stellaris_space:stasis')) {
        
//     }
// })