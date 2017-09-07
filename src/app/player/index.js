const Vue = require("vue/dist/vue.js");



Vue.component("player",{
    template: `
        <div class="player" 
            @mouseenter="flags.bold=true" 
            @mouseleave="flags.bold=false"
            >
            <timebar class="player__timeline" 
                    :class="{player__timeline_hovered:flags.bold}"
                    :loadprogress="toStrPercentage(progress.load)"
                    :playprogress="toStrPercentage(progress.play)"
                    :length="getlength(current)"
                    @timeclick="start"
                    ref="timebar"
                    >
            </timebar>
            <div class="player__controls player__controls_left">
                <prev event="prev" 
                      @prev="prev">
                      prev
                </prev>
                <pause event="pausetoggle" 
                       @pausetoggle="pausetoggle" >
                       {{flags.pause ? "play" : "pause"}}
                </pause>
                <next  event="next"
                       @next="next">
                       next
                </next>
            </div>
            <div class="player__track">
            {{current}}
            </div>
            <div class="player__controls player__controls_right">
                <mix event="mixtoggl">mix</mix>
                <repeat event="repeattoggl">repeat</repeat>
                <volume event="mute">mute</volume>
            </div>
            <core ref="aud" :url="getsrc(current)" @timeupdate.native="progressupdate" @audioupdated="coreupdate($event)"></core>
        </div>
    `
    ,components: {
        timebar:require("./timebar")

        ,prev:  require("./control")
        /* ,play:  require("./control") */
        ,pause: require("./control")
        ,next:  require("./control")
        ,mix:   require("./control")
        ,repeat:require("./control")
        ,volume:require("./control")

        ,core:  require("./core")
    }
/*     ,props: [
        ""
    ] */
    ,data: function(){
        return {
            list:{
                id:0
                ,length:0
                ,tracks:[
                    {
                        id:1000
                        ,name:"Aaaa"
                        ,performer:"Bbbb"
                        //just example url
                        ,url:"https://s06vla.storage.yandex.net/get-mp3/aad4575721b6f42940dcf36f00299f9a/0005589d4d8d1904/music/14/4/data-0.13:49136014019:2649443?track-id=36620136&play=false"
                        ,length:"5:26"
                    }
                    ,{
                        id:1001
                        ,name:"Cccc"
                        ,performer:"Dddd"
                        ,url:"https://s115h.storage.yandex.net/get-mp3/b67d1e1511b60285a057feb4979d7167/0005589d45f66654/music/6/9/data-0.7:41266293130:2732825?track-id=36805784&play=false"
                        ,length:"4:14"
                    }
                    ,{
                        id:1002
                        ,name:"Eeee"
                        ,performer:"Ffff"
                        ,url:"https://s61f.storage.yandex.net/get-mp3/4ea4408c9c3c022d7a9cff1399509101/0005589d36f19edf/music/28/7/data-0.19:19052974813:3952848?track-id=29566770&play=false"
                        ,length:"2:64"
                    }
                ]
            }
            ,flags:{
                bold:false
                ,pause:true
                ,volume:100
                ,mix: false
                ,repeat: false
            }
            ,progress:{
                load: 0.2
                ,play:0
            }
            ,current: -1
            ,element: null
        };
    }
    ,methods: {
        toStrPercentage: (num) => (num*100).toFixed(2) + "%"
        ,percentage: (val,base) => val/base
        ,getlength:function(c= this.current) {
            return c < 0 ?  "x:xx" : this.list.tracks[c].length ;
        }
        ,getsrc:function(c=this.current) {
            return c < 0 ? "" : this.list.tracks[c].url;
        }
        ,start:function(percent) {
            //async load
            this.flags.pause = false;
            if(!this.element){this.element = this.$refs.aud;};
            if(this.current < 0){ this.current = 0; };            
            this.load(this.list.tracks[this.current].url);
            this.element.$el.play();
          
            //async playupdate
            this.progress.play = percent;
            //
            console.log(`playing from ${percent} track ${this.current} ${this.list.tracks[this.current].id}`);
        }
        ,stop:function() {
            this.flags.pause = true;
            this.element.$el.pause();
            console.log(`track ${this.current} ${this.list.tracks[this.current].id} stopped`);
        }
        ,load:function(url) {
            console.log(`loading ${url}`);
        }
        ,next: function() {
            this.current = (this.current > this.list.tracks.length - 2 ? 
                                                          0 :
                                             this.current + 1 
                          );
            this.start(0);
        }
        ,prev: function() {
            this.current = ( this.current < 1 ? 
                this.list.tracks.length - 1 :
                           this.current - 1
                          );
            this.start(0);
        }
        ,pausetoggle: function() {
            if (this.flags.pause){ 
                this.start(this.progress.play);
            }else{
                this.stop();
            };
        }
        ,coreupdate:function(audioelement) {
            console.log(this.element = audioelement);
        }
        ,progressupdate:function(e) {

            console.log("progress");
            this.progress.load = this.$refs.aud.$el.buffered.end(this.$refs.aud.$el.buffered.length - 1)/this.$refs.aud.$el.duration;
            this.list.tracks[this.current].length = this.$refs.aud.$el.duration;
            this.progress.play = this.$refs.aud.$el.currentTime/this.$refs.aud.$el.duration;

            //this.progress.load = l;
            //this.progress.play = p;
        }
        ,log:(...arg) => console.log.call(null,["log:"].concat(arg).join())
    }
});
