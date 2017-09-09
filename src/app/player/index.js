const Vue = require("vue/dist/vue.js");



Vue.component("player",{
    template: `
        <div class="player" 
        @mouseenter="status.bold=true" 
        @mouseleave="status.bold=false"
        >
            <timebar class="player__timeline" 
            :class="{player__timeline_hovered:status.bold}"
            ></timebar>
            <div class="player__controls player__controls_left"
            >
                <ctrl @click="prev()">prev</ctrl>
                <ctrl @click="toggle"
                > 
                    {{ (!status.pause ? "play" : "pause") }}
                </ctrl>
                <ctrl @click.native="next">next</ctrl>
            </div>
            <div class="player__track"
            >
            {{status.current}}
            </div>
            <div class="player__controls player__controls_right"
            >
                <ctrl @click="mix">mix</ctrl>
                <ctrl @click="repeat">repeat</ctrl>
                <ctrl @click="mute">volume</ctrl>
            </div>
            <core 
            ref="audio"
            :url="gurl()" 
            @ended="next"
            ></core>
            </div>
            `
            ,components: {
                timebar:require("./timebar")
                ,ctrl:  require("./control")
                ,core:  require("./core")
            }
            
/*             @timeupdate=""
            @canplay=""  
 */    ,data: function(){
        return {
            list:{
                id:0
            //    ,length:0
                ,tracks:[
                    {
                        id:1000
                        ,name:"Aaaa"
                        ,performer:"Bbbb"
                        //just example url
                        ,url:"/data-0.mp3"
                        ,length:undefined
                    }
                    ,{
                        id:1001
                        ,name:"Cccc"
                        ,performer:"Dddd"
                        ,url:"/data-0 (1).mp3"
                        ,length:undefined
                    }
                    ,{
                        id:1002
                        ,name:"Eeee"
                        ,performer:"Ffff"
                        ,url:"/data-0 (2).mp3" 
                        ,length:6582
                    }
                ]
            }
            ,status:{
                bold:false
                ,pause:true
                ,volume:100
                ,mix: false
                ,repeat: false
                ,deciding:false 
                
                ,current: -1
                
                ,progress:{
                    load: 0
                    ,play:0
                }
            }
            ,element:null
        };
    }
    

    ,updated: function() {
        this.$nextTick( () => {
            this.element = this.$refs.audio.$el;
        });
    }
    ,methods: {
        log:(...arg) => console.log.call(null,["log:"].concat(arg).join())
        ,next: function() {
            let c = this.status.current //link
            ,   l = this.list.tracks.length;
            this.status.current = c>=0 && c < (l - 1) ? c+1 : 0;
//            this.start(0);
        }
        ,toggle: function() {
            let flag = status.pause;

        }
        ,prev: function() {
            let c = this.status.current 
            ,   l = this.list.tracks.length;
            this.status.current = c > 0 ? c-1 : l-1;
            //            this.start(0);
        }
        ,mix:()=>undefined
        ,repeat:()=>undefined
        ,mute:()=>undefined
        
        ,gurl: function () {
            let rs = this.list.tracks[this.status.current];
            console.log("gurl", rs);            
            return !!rs ? rs.url : "";
        }
 
        /* 
        toStrPercentage: (num) => (num*100).toFixed(2) + "%"
        ,percentage: (val,base) => val/base
        ,settime: function(percent) {
            console.log(this.list.tracks[this.current].length);
            this.element.$el.currentTime = percent*this.list.tracks[this.current].length;
        }
        ,getlength:function(c= this.current) {
            return c < 0 ?  "x:xx" : this.formatrange(this.list.tracks[c].length) ;
        }
        ,getsrc:function(c=this.current) {
            console.log("get src");
            return c < 0 ? "" : this.list.tracks[c].url;
        }
        ,formatrange:function(sec = 0) {
            return `${Math.floor(sec/60)|| "0"}:${Math.floor(sec%60)}`
        }
        ,unformatrange:function(str) {
            let arr = str.split(":");
            return arr.length == 1 ? arr[0] : (+arr[0]*60 + +arr[1]);
        }
        ,start:function(percent) {
                      
            this.load(this.list.tracks[this.current].url);
            if(!!percent){ 
                this.element.$el.pause();

                this.element.$el.currentTime = percent* this.list.tracks[this.current].length;
                console.log(this.element.$el.currentTime, this.element.$el.duration);
            };
            if(percent == 0){
                this.element.$el.currentTime = 0;
            };
            this.flags.pause = false;
            this.element.$el.play();
          
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
            this.current = (this.current > this.list.tracks.length - 2) ?                                                 0 :
                                             this.current + 1 
                          ;
            this.start(0);
        }
        ,prev: function() {
            this.current = ( this.current < 1) ? 
                this.list.tracks.length - 1 :
                           this.current - 1
                          ;
            this.start(0);
        }
        ,ptoggle: function() {
            if (this.flags.pause){ 
                this.start(this.progress.play);
            }else{
                this.stop();
            };
        }
        ,coreupdate:function(audioelement) {
            console.log(this.element = audioelement);
        }
        ,tracksetup:function() {
            this.list.tracks[this.current].length = this.$refs.audio.$el.duration;
        }
        ,playupdate:function(){
             if(!this.deciding){ 
    //no need for throttle
                this.progress.play = this.$refs.audio.$el.currentTime/this.$refs.audio.$el.duration;//ms -> %
             }; 
        }
        ,loadupdate:function() {
            this.progress.load = this.$refs.audio.$el.buffered.end(this.$refs.audio.$el.buffered.length - 1)/this.$refs.audio.$el.duration;//ms -> %
        } */

    }
});
