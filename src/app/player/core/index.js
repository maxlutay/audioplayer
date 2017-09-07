module.exports = {
    template: `
        <audio class="player__core" :src="url"  preload="auto" controls></audio>
    `
    ,props: [
        "url"
    ]
    ,updated:function() {
        this.$emit("audioupdated",this.$refs.aud);
    }
}