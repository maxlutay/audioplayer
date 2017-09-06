module.exports = {
    template: `
    <div class="player__control" @click="pass(event)" >
        <img src="iconpath">
    </div>
    `
    ,props:[
        "event"
        ,"iconpath"
    ]
    ,methods:{
        pass:function(...params) {
            console.log("ctrl clicked",params);
            this.$emit.apply(this,params);
        }
    }

}