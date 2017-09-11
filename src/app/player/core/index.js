module.exports = {
    template: `
        <audio class="player__core" :src="url" preload="auto" autoplay controls
        ></audio>
    `
    ,props: [
        "url"
    ]
}