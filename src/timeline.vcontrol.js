/*global $, window, olegsmith, console*/
if (typeof olegsmith !== 'undefined' && typeof olegsmith.Timeline.VControl === 'undefined') {

    olegsmith.Timeline.VControl = function (element, settings, extsettings) {
        var $element = $(element),
            $container,
            $userlayer,
            $scalebar,
            $nowline,
            $this = this;
        var wheelTimeout;
//https://github.com/malihu/malihu-custom-scrollbar-plugin/blob/master/jquery.mCustomScrollbar.js

        var scrollTop, original_center_tick;

        this.init = function () {

            $element
                .mousewheel(function (event, delta) {

                    var _top = $container.position().top + (delta > 0 ? 1 : -1) * 40;

                    if (_top > 0 || _top < -2 * settings.height) {
                        console.log('bound');
                        settings.center_tick = olegsmith.Timeline.Math.shift(-(settings.height + _top), settings);
                        $this.render();
                    } else {
                        $container.css({ top:_top });
                    }

                    if (wheelTimeout) {
                        window.clearTimeout(wheelTimeout);
                    }

                    wheelTimeout = window.setTimeout(function () {
                        settings.center_tick = olegsmith.Timeline.Math.shift(-(settings.height + _top), settings);
                        $this.render();
                    }, 100);

                    return false;

                })
                .drag('start', function (event) {
                    scrollTop = event.clientY;
                    original_center_tick = settings.center_tick;
                })
                .drag(function (event, dd) {

                    var _top = -settings.height + event.clientY - scrollTop;

                    if (_top > 0 || _top < -2 * settings.height) {

                        settings.center_tick = olegsmith.Timeline.Math.shift(-(event.clientY - scrollTop), settings);
                        $this.render();

                        scrollTop = event.clientY;
                        original_center_tick = settings.center_tick;

                    } else {
                        $container.css({ top:_top});
                    }
                })
                .drag('end', function (event, dd) {
                    settings.center_tick = original_center_tick;
                    settings.center_tick = olegsmith.Timeline.Math.shift(-(event.clientY - scrollTop), settings);
                    $this.render();
                })
                .dblclick(function (event) {
                    if (settings.zoom < 42) {

                        settings.center_tick = olegsmith.Timeline.Math.zoomto(
                            event.pageY - $element.position().top - $container.position().top,
                            settings,
                            settings.zoom + 1
                        );

                        settings.zoom = settings.zoom + 1;
                        $this.render();

                    }
                });

            this.render();

        };

        this.resize = function () {
            settings.width = $element.width();
            this.render();
        };

        this.update = function () {
            $userlayer.html(settings.updatefn());
        };

        this.zoomin = function () {
            if (settings.zoom < 42) {
                settings.zoom++;
                this.render();
            }
        };

        this.zoomout = function () {
            if (settings.zoom > 0) {
                settings.zoom--;
                this.render();
            }
        };

        this.now = function () {
            settings.center_tick = (new Date()).getTime();
            this.render();
        };

        this.render = function () {
            //console.log('render');

            var $background = $(olegsmith.div({
                    cssclass:[
                        settings.background_class
                    ],
                    style:[
                        'position:absolute',
                        'width:100%',
                        'height:100%',
                        'left:0px',
                        'top:0px'
                    ]
                }
            ));

            $container = $(olegsmith.div({
                    cssclass:[
                        settings.container_class
                    ],
                    style:[
                        'display:block',
                        'position:absolute',
                        //'overflow:hidden',
                        'width:' + $element.width() + 'px',
                        'height:' + $element.height() * 3 + 'px',
                        'top:-' + $element.height() + 'px'
                    ],
                    innerfn:function () {
                        return olegsmith.Timeline.VControl.Grid.render($element, settings);
                    }
                }
            ));

            $userlayer = $(olegsmith.div({
                    cssclass:[
                        settings.userlayer_class
                    ],
                    innerfn:function () {
                        return settings.updatefn(settings);
                    }
                }
            ));

            $nowline = $(olegsmith.div({
                    cssclass:[
                        settings.nowline_class
                    ]
                }
            ));

            $scalebar = $(olegsmith.div({
                    cssclass:[
                        settings.scale_class
                    ],
                    style:[
                        'position:absolute',
                        'top:0px',
                        'left:0px'
                    ],
                    inner:"Timescale"
                }
            ));

            $container.append($userlayer);
            $container.append($nowline);

            $element.html('');
            $element.append($background);
            $element.append($container);
            $element.append($scalebar);

            $scalebar.mousedown(function (event) {
                $container.trigger(event);
            });

            (function nowfn() {
                var onepixtics=olegsmith.Timeline.Math.dpix2dticks(1,settings.zoom);
                var tics15dim=onepixtics*(settings.direction === 'h' ? settings.width : settings.height )*1.5;
                var now=(new Date()).getTime();

                if (now<settings.center_tick-tics15dim) {
                    $nowline.html('');
                    window.setTimeout(nowfn, settings.center_tick-tics15dim-now);
                } else
                if (now>(settings.center_tick-tics15dim) && now<(settings.center_tick+tics15dim)) {
                    $nowline.html(
                        olegsmith.Timeline.Util.rendernow(settings)
                    );
                    window.setTimeout(nowfn,onepixtics*5);
                } else {
                    $nowline.html('');
                }
            })();



        };

    };

}
