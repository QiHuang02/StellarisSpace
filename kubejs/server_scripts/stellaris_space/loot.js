LootJS.lootTables((event) => {
    /**
     *
     * @param {Special.Block} block 被粉碎的方块
     * @param {Special.Item} item 掉落物
     */
    function shattered(block, item) {
        event.getBlockTable(block).firstPool().addEntry(
            LootEntry.of(item).matchTool(
                ItemFilter.tag('#c:tools/hammer')
            )
        )
    }

    shattered('minecraft:stone', 'minecraft:gravel');
    shattered('minecraft:cobblestone', 'minecraft:gravel');
    shattered('minecraft:gravel', 'minecraft:sand');
    shattered('minecraft:sand', 'stellaris_space:dust');
})