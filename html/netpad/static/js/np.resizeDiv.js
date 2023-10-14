(function ($) {

    if (!window['np']) window['np'] = {};

    var SIZE = 20;//拖动的控制点的宽度和高度 用于接受事件
    var SIZE_2 = SIZE / 2;
    var SHOWSIZE = 8;//可见控制点的宽度PX
    var showMarginLeft = (SIZE - SHOWSIZE) / 2;//margin的值
    var POS = '-' + SIZE_2 + 'px';

    var defaultOpts = {//默认参数
        stage: document, //舞台
        item: '', //可缩放的元素实例
        onlyShowse: false,//是否只显示右下角的拖动控件 设置为true 时showCircle无效
        showCircle: false,//控制点显示的样式 true显示为圆 false显示为正方形
        canDrag: false,//是否使用内置的拖拽
        callback: function (obj) {
        }//拖动改变控件大小
    };



    var NPResize = function (options) {
        this.isActive = false;
        this.status = null;//记录事件的状态
        this.ox = 0; //原始x位置
        this.oy = 0; //原始y位置
        this.ow = 0; //原始宽度
        this.oh = 0; //原始高度
        this.oleft = 0; //原始元素位置
        this.otop = 0;
        this.lastWidth = 1;
        this.lastHeight = 1;
        this.originScale = 1;
        this.paperView = options.paperView;

        this.options = $.extend({}, defaultOpts, options);
        this.$item = (options.item instanceof jQuery) ? options.item : $(options.item);
        this.initialize();
    };
    NPResize.prototype = {
        /*初始化拖拽item*/
        initialize: function () {
            //创建面板
            var resizePanel = $('<div class="resize-panel" style="-ms-touch-action:none;touch-action:none"></div>');
            this.$el = resizePanel;
            this.el = this.$el[0];

            resizePanel.css({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                display: 'none'
            });

            if (this.options.canDrag) {
                resizePanel.css({
                    cursor: 'move'
                });
            }

            this.appendHandler(resizePanel, this.$item);

            //用于接受事件
            var n = $('<div class="point" name="nmove"></div>'),//北
                s = $('<div class="point" name="smove"></div>'),//南
                w = $('<div class="point" name="wmove"></div>'),//西
                e = $('<div class="point" name="emove"></div>'),//东
                ne = $('<div class="point" name="nemove"></div>'),//东北
                nw = $('<div class="point" name="nwmove"></div>'),//西北
                se = $('<div class="point" name="semove"></div>'),//东南
                sw = $('<div class="point" name="swmove"></div>');//西南

            /*创建控制点*/
            if (this.options.onlyShowse) {
                //添加公共样式
                this.addHandlerCss([se], true);
                //添加各自样式
                se.css({
                    'bottom': POS,
                    'right': POS,
                    'cursor': 'se-resize'
                });
                this.appendHandler([se], resizePanel);
            } else {
                //添加公共样式
                this.addHandlerCss([n, s, w, e, ne, nw, se, sw], false);
                //添加各自样式
                n.css({
                    'top': POS,
                    'margin-left': POS,
                    'left': '50%',
                    'cursor': 'n-resize'
                });
                s.css({
                    'bottom': POS,
                    'margin-left': POS,
                    'left': '50%',
                    'cursor': 's-resize'
                });
                e.css({
                    'top': '50%',
                    'margin-top': POS,
                    'right': POS,
                    'cursor': 'e-resize'
                });
                w.css({
                    'top': '50%',
                    'margin-top': POS,
                    'left': POS,
                    'cursor': 'w-resize'
                });
                ne.css({
                    'top': POS,
                    'right': POS,
                    'cursor': 'ne-resize'
                });
                nw.css({
                    top: POS,
                    'left': POS,
                    'cursor': 'nw-resize'
                });
                se.css({
                    'bottom': POS,
                    'right': POS,
                    'cursor': 'se-resize'
                });
                sw.css({
                    'bottom': POS,
                    'left': POS,
                    'cursor': 'sw-resize'
                });
                // 添加项目
                this.appendHandler([n, s, w, e, ne, nw, se, sw], resizePanel);
            }
            //绑定拖拽缩放事件
            this.bindResizeEvent(resizePanel, this.$item);

            //正式使用时 不需要此事件
            //this.bindTrigger(this.$item);//绑定触发事件

            //正式使用时 不需要此事件
            //this.bindHidePanel();
        },
        //控制点公共样式
        addHandlerCss: function (els, flag) {
            for (var i = 0; i < els.length; i++) {
                els[i].css({
                    position: 'absolute',
                    width: SIZE + 'px',
                    height: SIZE + 'px',
                    margin: '0',
                    '-ms-touch-action': 'none',
                    'touch-action': 'none'
                });

                var $dragEle = $('<div></div>');//添加控制点并设置样式
                els[i].append($dragEle);
                if (!flag) {
                    $dragEle.css({
                        width: SHOWSIZE + 'px',
                        height: SHOWSIZE + 'px',
                        margin: showMarginLeft + 'px auto',
                        border: '1px solid gray',
                        'background-color': 'white'
                    })
                } else {
                    $dragEle.css({
                        bottom: 0,
                        right: 0,
                        border: 0,
                        'border-bottom': SIZE_2 + 'px solid #77e680',
                        'border-left': SIZE_2 + 'px solid transparent',
                        cursor: 'se-resize',
                        'border-radius': 0,
                        width: 0,
                        height: 0
                    });
                }

                if (this.options.showCircle) {
                    els[i].css({
                        'border-radius': '50%'
                    });
                }
            }
        },
        /*插入容器*/
        appendHandler: function (handlers, target) {
            for (var i = 0; i < handlers.length; i++) {
                target.append(handlers[i]);
            }
        },
        /*拖拽事件控制 包含8个缩放点  和一个拖拽位置*/
        bindResizeEvent: function (el) {

            var self = this;
            this.org = el.parent('div');
            this.$stage = (this.options.stage instanceof jQuery) ? this.options.stage : $(this.options.stage);
            this.stage =  this.$stage[0];

            if (this.options.canDrag) {//启用内置的拖拽
                el.on('mousedown', function (e) {
                    if (self.status) return;
                    self.getDivInfo.call(self, el, e.originalEvent, "drag");
                    e.preventDefault();
                });
                el.on('touchstart', function (e) {
                    if (self.status) return;
                    self.getDivInfo.call(self, el, e.originalEvent, "drag");
                });
            }

            this.$el.on('mousedown', '.point', mousedown);
            this.$el.on('touchstart', '.point', mousedown);

            function mousedown(e){
                self.stage.addEventListener('mousemove',move,true);
                self.stage.addEventListener('mouseup',up,true);
                if (window.PointerEvent) { //IE 11 & Edge
                    self.stage.addEventListener('pointermove',move,true);
                    self.stage.addEventListener('pointerup',up,true);
                } else if (window.MSPointerEvent) { //IE10
                    self.stage.addEventListener('pointermove',move,true);
                    self.stage.addEventListener('pointerup',up,true);
                } else { //Chrome, Safari
                    self.stage.addEventListener('touchmove',move,true);
                    self.stage.addEventListener('touchend',up,true);
                }
                self.getDivInfo(self.$el, e.originalEvent, $(e.currentTarget).attr('name'));
                e.stopPropagation();
                e.preventDefault();

            }
            function move(e){ 
                if (!self.isActive) return;

                if (self.status && self[self.status]) {
                    e.stopPropagation();
                    var pos = self.getXYofEvt(e);
                    var obj = self[self.status](self.obj, pos.x, pos.y);
                    self.lastWidth = obj.width;
                    self.lastHeight = obj.height;
                    self.setOrg(obj, e);
                }
            }
            function up(e){
                if (!self.isActive) return;
                self.lastWidth = 1;
                self.lastHeight = 1;
                self.status = null;
                self.stage.removeEventListener('mousemove',move,true)
                self.stage.removeEventListener('mouseup',up,true);
                if (window.PointerEvent) { //IE 11 & Edge
                    self.stage.removeEventListener('pointermove',move,true);
                    self.stage.removeEventListener('pointerup',up,true);
                } else if (window.MSPointerEvent) { //IE10
                    self.stage.removeEventListener('pointermove',move,true);
                    self.stage.removeEventListener('pointerup',up,true);
                } else { //Chrome, Safari
                    self.stage.removeEventListener('touchmove',move,true);
                    self.stage.removeEventListener('touchend',up,true);
                }
                if (self.options.up instanceof Function) self.options.up();
            }

        },
        getDivInfo: function (el, e, statu) {//获取初始位置，并设置事件状态
            var pos = this.getXYofEvt(e);
            this.ox = pos.x;//原始x位置
            this.oy = pos.y;
            this.ow = el.width();
            this.oh = el.height();
            this.otop = parseInt(this.$item.css('top').replace('px', ''));
            this.oleft = parseInt(this.$item.css('left').replace('px', ''));
            this.status = statu;
            this.originScale = this.ow?(this.oh/this.ow):0;
            this.obj = {//记录按下时容器的信息
                width: this.$el.width(),
                height: this.$el.height(),
                left: this.oleft,
                top: this.otop,
                scaleX:true,
                scaleY:true
            };
        },
        emove: function (obj, pageX, pageY) {
            obj.width = this.ow + (pageX - this.ox);
            obj.scaleX = (obj.width * this.lastWidth > 0);
            obj.scaleY = true;

            if(obj.width < 0){
                obj.left = this.oleft + obj.width;
            }else{
                obj.left = this.oleft;
            }
            return obj;
        },
        smove: function (obj, pageX, pageY) {
            obj.height = this.oh + (pageY - this.oy);
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = true;

            if(obj.height < 0){
                obj.top = this.otop + obj.height;
            }else{
                obj.top = this.otop;
            }
            return obj;
        },
        wmove: function (obj, pageX, pageY) {
            obj.width = this.ow - (pageX - this.ox);
            obj.left = this.oleft + (pageX - this.ox);
            obj.scaleX = (obj.width * this.lastWidth > 0);
            obj.scaleY = true;

            if(obj.width<0){
                obj.left = obj.left + obj.width;
            }
            return obj;
        },
        nmove: function (obj, pageX, pageY) {
            obj.height = this.oh - (pageY - this.oy);
            obj.top = this.otop + (pageY - this.oy);
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = true;

            if(obj.height<0){
                obj.top = obj.top + obj.height;
            }
            return obj;
        },
        nemove: function (obj, pageX, pageY) {//右上
            //obj.width = this.ow + (pageX - this.ox);
            //obj.height = this.oh - (pageY - this.oy);
            //obj.top = this.otop + (pageY - this.oy);
            //var scale = obj.width?(obj.height/obj.width):0;
            var scale = this.originScale;
            obj.width = this.ow + (pageX - this.ox);
            if((this.oh - (pageY - this.oy)) * obj.width <0 )scale = -scale;
            obj.height = obj.width *scale;
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = (obj.width * this.lastWidth > 0);
            if(obj.width<0){
                obj.left = this.oleft + obj.width;
            }else{
                obj.left = this.oleft;
            }
            if(obj.height<0){
                obj.top = this.otop + this.oh;
            }else{
                obj.top = this.otop + (this.oh - obj.height);
            }
            return obj;
        },
        nwmove: function (obj, pageX, pageY) {//左上
            //obj.width = this.ow - (pageX - this.ox);
            //obj.height = this.oh - (pageY - this.oy);
            //obj.top = this.otop + (pageY - this.oy);
            //obj.left = this.oleft + (pageX - this.ox);
            //var scale = obj.width?(obj.height/obj.width):0;
            var scale = this.originScale;
            obj.width = this.ow - (pageX - this.ox);
            if((this.oh - (pageY - this.oy)) * obj.width <0 )scale = -scale;
            obj.height = obj.width *scale;
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = (obj.width * this.lastWidth > 0);
            if(obj.width<0){
                obj.left = this.oleft + this.ow;
            }else{
                obj.left = this.oleft + (this.ow - obj.width);
            }
            if(obj.height<0){
                obj.top = this.otop + this.oh;
            }else{
                obj.top = this.otop + (this.oh - obj.height);
            }

            return obj;
        },
        semove: function (obj, pageX, pageY) {//右下
           //obj.width = this.ow + (pageX - this.ox);
            //obj.height = (this.oh + (pageY - this.oy));
            //var scale = obj.width?(obj.height/obj.width):0;
            var scale = this.originScale;
            obj.width = this.ow + (pageX - this.ox);
            if(obj.width * (this.oh + (pageY - this.oy)) <0) scale = -scale;
            obj.height = obj.width *scale;
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = (obj.width * this.lastWidth > 0);

            if(obj.width<0){
                obj.left = this.oleft + obj.width;
            }else{
                obj.left = this.oleft;
            }
            if(obj.height<0){
                obj.top = this.otop + obj.height;
            }else{
                obj.top = this.otop;
            }
            return obj;
        },
        swmove: function (obj, pageX, pageY) {//左下
            //obj.width = this.ow - (pageX - this.ox);
            //obj.height = this.oh + (pageY - this.oy);
            //obj.left = this.oleft + (pageX - this.ox);
            //var scale = obj.width?(obj.height/obj.width):0;
            var scale = this.originScale;
            obj.width = this.ow - (pageX - this.ox);
            if(obj.width * (this.oh + (pageY - this.oy)) <0) scale = -scale;
            obj.height = obj.width *scale;
            obj.scaleY = (obj.height * this.lastHeight > 0);
            obj.scaleX = (obj.width * this.lastWidth > 0);
            if(obj.width<0){
                obj.left = this.oleft + this.ow;
            }else{
                obj.left = this.oleft + (pageX - this.ox);
            }
            if(obj.height<0){
                obj.top = this.otop + obj.height;
            }else{
                obj.top = this.otop;
            }
            return obj;
        },
        drag: function (obj, pageX, pageY) {
            obj.left = this.oleft + (pageX - this.ox);
            obj.top = this.otop + (pageY - this.oy);
            return obj;
        },
        setOrg: function (obj, e) {
            //this.$item.css(obj);
            //执行回调函数修改控件位置和大小
            if (this.options.callback instanceof Function) this.options.callback(obj);
            if (e && e.stopPropagation)
                e.stopPropagation();
            else
                window.event.cancelBubble = true;
        },
        getXYofEvt: function (evt) {
            if (evt.pageX != undefined) {
                return {
                    x: evt.pageX/this.paperView.scale,
                    y: evt.pageY/this.paperView.scale
                }
            } else {
                return {
                    x: evt.changedTouches[0].pageX/this.paperView.scale,
                    y: evt.changedTouches[0].pageY/this.paperView.scale
                }
            }
        },
        toActive: function (flag) {//是否激活控件
            this.$el.css({
                display: flag ? 'block' : 'none'
            });
            this.isActive = flag;
        },
        /*点击item显示拖拽面板*/
        bindTrigger: function (el) {
            var self = this;
            el.on('click', function (e) {
                e.stopPropagation();
                self.toActive(true);
                e.preventDefault();
            });
            el.on('touchstart', function (e) {
                e.stopPropagation();
                self.toActive(true);
            });
        },
        /**点击舞台空闲区域 隐藏缩放面板*/
        bindHidePanel: function (el) {
            var self = this;
            var stage = this.options.stage;
            $(stage).bind('click', function (e) {
                self.toActive(false);
                e.preventDefault();
            });
            $(stage).bind('touchstart', function (e) {
                self.toActive(false);
            })
        }
    };
    window['np']['NPResize'] = NPResize;
})(jQuery);