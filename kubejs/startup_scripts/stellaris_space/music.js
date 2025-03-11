StartupEvents.registry('sound_event', (event) => {
    event.create('stellaris_space:love_story');
    event.create('stellaris_space:never_gonna_give_you_up');
});
StartupEvents.registry('item', (event) => {
    event.create('stellaris_space:love_story')
         .jukeboxPlayable('stellaris_space:love_story', true)
         .maxStackSize(1);
    event.create('stellaris_space:never_gonna_give_you_up')
         .jukeboxPlayable('stellaris_space:never_gonna_give_you_up', true)
         .maxStackSize(1);
})