module.exports = {
    template: `
        <audio class="player__core" :src="url" autoplay preload="meta" controls></audio>
    `
    ,props: [
        "url"
    ]
    ,updated:function() {
        this.element.$el.load();
        this.$emit("audioupdated",this.$refs.aud);
    }
}