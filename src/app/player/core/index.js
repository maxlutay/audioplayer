module.exports = {
    template: `
        <audio class="player__core" :src="url" preload="auto"  
        :autoplay="!!(autoplay)"  
        ></audio>
    `//add controls props to force display
    ,props: [
        "url"
        ,"autoplay"
    ]
}