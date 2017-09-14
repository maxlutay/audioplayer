const Vue = require("vue/dist/vue.js");



Vue.component("player",{
    template: `
        <div class="player" 
         @mouseenter="status.bold=true" 
         @mouseleave="status.bold=false"
        >
            <timebar class="player__timeline" 
             :class="{player__timeline_hovered:status.bold}"
             :loaded="status.progress.load"
             :played="tplayed()"
             :length="core.duration"
             :current="core.currentTime"
             ref="tb"
            ></timebar>
            <div class="player__controls player__controls_left"
            >
                <ctrl @click.native="prev">prev</ctrl>
                <ctrl @click.native="toggle"
                > 
                    {{ !!core.paused ? "play" : "pause" }}
                </ctrl>
                <ctrl @click.native="next(true)">next</ctrl>
            </div>
            <div class="player__track"
            >
            {{status.current}}
            </div>
            <div class="player__controls player__controls_right"
            >
                <ctrl 
                @click.native="status.mix=!status.mix"
                :class="{player__control_active:status.mix}"
                >mix</ctrl>
                <ctrl 
                @click.native="status.repeat=status.repeat < 2 ? status.repeat + 1 : 0"
                :class="{player__control_active:status.repeat}"
                >repeat {{status.repeat}}</ctrl>
                <ctrl @click.native="mute">volume</ctrl>
            </div>
            <core 
             ref="audio"
             :url="url" 
             :autoplay="status.autoplay"
             @ended.native="next()"
             @timeupdate.native="ontimeupdate"
             @progress.native="status.progress.load=percentage(core.buffered.end(0),core.duration)"
            ></core>
            </div>
            `
            ,components: {
                timebar:require("./timebar")
                ,ctrl:  require("./control")
                ,core:  require("./core")
            }
     ,props:[
         "wind"
     ]
     ,data: function(){
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
                    }
                    ,{
                        id:1001
                        ,name:"Cccc"
                        ,performer:"Dddd"
                        ,url:"/data-0 (1).mp3"
                    }
                    ,{
                        id:1002
                        ,name:"Eeee"
                        ,performer:"Ffff"
                        ,url:"/data-0 (2).mp3" 
                    }
                    ,{
                        id:1003
                        ,name:"Ffff"
                        ,performer:"Gggg"
                        ,url:"/data-0 (3).mp3"
                    }
                    ,{
                        id:1004
                        ,name:"Eeee"
                        ,performer:"Ffff"
                        ,url:"/data-0 (4).mp3"
                    }
                ]
            }
            ,status:{
                bold:false
                ,volume:100
                ,mix: false
                ,repeat: 0
                ,deciding:false 
                ,autoplay:false

                ,current: 0                
                ,progress:{
                    load: 0
                    ,play:0
                }
            }
            ,core:{}
        };
    }
    
    ,mounted:  function() {
        this.$nextTick( () => {
            this.core = this.$refs.audio.$el;
        });
    }

    ,computed: {
        url() {
            return this.list.tracks[this.status.current].url || "";
        }
    }
    ,methods: {
        log:(...arg) => console.log.call(null,["log:"].concat(arg).join())
        ,next(force) {
            let c = this.status.current 
            ,   l = this.list.tracks.length;
            
            if(2 == this.status.repeat && !force){
                this.core.currentTime = 0;
                this.core.play();
                return;
            };

            if( c !== (l - 1) 
                || 1 == this.status.repeat 
                || !!force 
            ){
                this.status.current = (c>=0 && c < (l - 1)) ? c+1 : 0;
            };

        }

        ,toggle() {
            if(this.core.paused){
                this.core.play();
                this.status.autoplay = true;
            }else{
                this.core.pause();
                this.status.autoplay = false;
            };
        }
        ,prev() {
            let c = this.status.current 
            ,   l = this.list.tracks.length;
            this.status.current = (c > 0) ? c-1 : l-1;
            this.status.ready && this.core.play();            
        }

        ,mute:()=>undefined
        ,tset:function(perc) {
            //console.log("tset",perc);
            this.status.progress.play = perc;
        }
        ,tfix(perc) {
            this.status.progress.play = perc;
            this.core.currentTime = this.core.duration * perc;
        }
        ,trset() {
            this.status.progress.play = this.core.currentTime/this.core.duration;
        }
        ,percentage: (val,base) => !base ? 0 : val/base
        ,ontimeupdate(){
            if(!this.$props.wind.state){
                this.tset(this.percentage(this.core.currentTime,this.core.duration));
            };
        }
        ,tplayed(){
            let ret;
            if(this.$refs.tb){
                ret = this.percentage(this.$props.wind.x,this.$refs.tb.$el.getBoundingClientRect().width) ;
            };
            if(this.$props.wind.state){
                this.status.deciding = true;
                return ret;
            };

            if( this.status.deciding && !this.$props.wind.state){
                this.status.deciding = false;
                this.tfix(ret);
            };
            
            
            return this.status.progress.play;
        }

    }
});
