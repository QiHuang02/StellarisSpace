# 如何使用KubeJS注册音乐和唱片(1.21.1+)

## 一、关于音频文件

1、首先我们得知道原版 Minecraft 只识别OGG格式的音频，所以第一步是先找一个OGG格式的音频。
例如我将某易云的歌下载下来并转换为OGG格式。
2、我们将OGG格式的音频文件放于 `./kubejs/assets/<namespace>/sounds/` 文件夹下。

## 二、注册音频

1.StartupEvents事件

```js
StartupEvents.registry('sound_event', (event) => {
    event.create('<namespace>:music_id')
})
```

2.ServerEvents事件

```js
ServerEvents.registry('jukebox_song', (event) => {
    event.create('<namespace>:music_id')
         .song('<namespace>:music_id', time)
})
```

## 三、注册物品

1.StartupEvents事件

```js
StartupEvents.registry('item', (event) => {
    event.create('<namespace>:music_id')
         .jukeboxPlayable('<namespace>:music_id', true)
})
```
