module.exports = {
    template: `
        <audio class="player__core" :src="url" autoplay preload="auto" controls
        ></audio>
    `
    ,props: [
        "url"
    ]

}