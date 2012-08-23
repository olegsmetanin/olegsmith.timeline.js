/*global olegsmith*/
if (typeof olegsmith !== 'undefined' && typeof olegsmith.Timeline.Math === 'undefined') {

    olegsmith.Timeline.Math = ({

        init:function () {

            for (var n = 0; n < 47; n++) {
                this.ZOOMPIX[n] = 256 * Math.pow(2, n);
            }

            return this;
        },

        /** Time bound constant
         * The JavaScript date is measured in milliseconds since midnight 01 January, 1970 UTC.
         * A day holds 86,400,000 milliseconds. The JavaScript Date object range is -100,000,000 days to 100,000,000 days
         * relative to 01 January, 1970 UTC.
         * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
         */
        TICKMAX:100000000 * 86400000,
        TICKMIN:-100000000 * 86400000,
        TICKLEN:2 * 100000000 * 86400000,

        /**
         * Timeline scale design
         *
         * level 0: 256px             = TICKLEN ticks
         * level 1: 512px             = TICKLEN ticks
         * level N: 256*Math.pow(2,N) = TICKLEN ticks
         *
         * TICKLEN ~= 256*Math.pow(2,46)
         *
         * on level 36: 1 pix= 0.982 second
         *
         * ZOOMPIX[N]=256*Math.pow(2,N)
         *
         * Fill array on init.
         */

        ZOOMPIX:[],

        /** Calculate pix length for each zoom level.
         * Fill array on init.
         */
        dticks2dpix:function (dticks, zoom) {
            return this.ZOOMPIX[zoom] * dticks / this.TICKLEN;
        },

        dpix2dticks:function (dpix, zoom) {
            return this.TICKLEN * dpix / this.ZOOMPIX[zoom];
        },

        /** Calculate left position (in px) of given tick
         *
         * Horizontal Control
         *
         * |<-- width -->|<-- width -->|<-- width -->|
         * |<---- 3/2 width --->|<---- 3/2 width --->|
         * |--------*-----------x--------------------|
         *        tick     center
         *
         * Vertical Control
         * ---------- ---------- ----------
         *      |         |          |
         *    height      |          |
         *      |     3/2 height     * tick
         * ----------     |          |
         *      |         |          |
         *    height  ----------     x center
         *      |         |          |
         * ----------     |          |
         *      |     3/2 height     |
         *    height      |          |
         *      |         |          |
         * ---------- ---------- ----------
         *
         */

        ticks2pix:function (tick, settings) {
            return ((settings.direction === 'h' ? settings.width : settings.height) * 3 / 2) -
                (settings.direction === 'h' ? 1 : -1) * (settings.center_tick - tick) * this.ZOOMPIX[settings.zoom] / this.TICKLEN;
        },

        pix2ticks:function (pix, settings) {
            return settings.center_tick - (settings.direction === 'h' ? 1 : -1) * (((settings.direction === 'h' ? settings.width : settings.height) * 3 / 2) - pix) * this.TICKLEN / this.ZOOMPIX[settings.zoom];
        },

        minmax:function (settings) {
            var half = (settings.direction === 'h' ? settings.width : settings.height) * (3 / 2) * this.TICKLEN / this.ZOOMPIX[settings.zoom];
            var min = settings.center_tick - half;
            var max = settings.center_tick + half;
            return {min:(min < this.TICKMIN ? this.TICKMIN : min), max:(max > this.TICKMAX ? this.TICKMAX : max)};
        },

        zoomto:function (click_pix, settings, newtimelevel) {
            var click_ticks = this.pix2ticks(click_pix, settings);
            return (click_ticks + (settings.direction === 'h' ? 1 : -1) * this.dpix2dticks((settings.direction === 'h' ? settings.width : settings.height) * (3 / 2) - click_pix, newtimelevel));
        },

        shift:function (dpix, settings) {
            return settings.center_tick - this.dpix2dticks(dpix, settings.zoom);
        },

        periodfn:function (periodtype) {
            var adddeltafn, periodstartfn, periodendfn;
            switch (periodtype) {
                case 'second':
                    periodstartfn = function (base, delta) {
                        var tempDate = (new Date(base));
                        tempDate.setSeconds(0, 0);
                        return tempDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        return (base + delta * 1000);
                    };
                    periodendfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setMinutes(tempDate.getMinutes() + 1);
                        return tempDate.getTime();
                    };
                    break;
                case 'minute':
                    periodstartfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setMinutes(0, 0, 0);
                        return tempDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        return (base + delta * 60 * 1000);
                    };
                    periodendfn = function (base) {
                        var tempDate = new Date(base);
                        tempDate.setHours(tempDate.getHours() + 1);
                        return tempDate.getTime();
                    };
                    break;
                case 'hour':
                    periodstartfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        return tempDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        return (base + delta * 60 * 60 * 1000);
                    };
                    periodendfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setDate(tempDate.getDate() + 1);
                        return tempDate.getTime();
                    };
                    break;
                case 'day':
                    periodstartfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        tempDate.setDate(1);
                        return tempDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        return (base + delta * 24 * 60 * 60 * 1000);
                    };
                    periodendfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        tempDate.setDate(1);
                        tempDate.setMonth(tempDate.getMonth() + 1);
                        return tempDate.getTime();
                    };
                    break;
                case 'month':
                    periodstartfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        tempDate.setDate(1);
                        tempDate.setMonth(0);
                        return tempDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setMonth(tempDate.getMonth() + delta);
                        return tempDate.getTime();
                    };
                    periodendfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        tempDate.setDate(1);
                        tempDate.setMonth(0);
                        tempDate.setFullYear(tempDate.getFullYear() + 1);
                        return tempDate.getTime();
                    };
                    break;
                case 'year':
                    periodstartfn = function (base, delta) {

                        function floorDate(baseDate) {
                            var intDate = new Date(baseDate);
                            var origDate= new Date(baseDate);
                            intDate.setHours(0, 0, 0, 0);
                            intDate.setDate(1);
                            intDate.setMonth(0);
                            intDate.setFullYear(origDate.getFullYear() - (origDate.getFullYear() % delta));
                            return intDate;
                        }

                        var resDate;
                        var tempDate = new Date(base);
                        while (isNaN(resDate = floorDate(tempDate))) {
                            tempDate.setFullYear(tempDate.getFullYear() + delta);
                        }
                        return resDate.getTime();
                    };
                    adddeltafn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setFullYear(tempDate.getFullYear() + delta);
                        return tempDate.getTime();
                    };
                    periodendfn = function (base, delta) {
                        var tempDate = new Date(base);
                        tempDate.setHours(0, 0, 0, 0);
                        tempDate.setDate(1);
                        tempDate.setMonth(0);
                        tempDate.setFullYear(tempDate.getFullYear() + delta);
                        return tempDate.getTime();
                    };
                    break;
            }
            return {adddeltafn:adddeltafn, periodstartfn:periodstartfn, periodendfn:periodendfn};
        },

        calcmarktic:function (min, max, periodtype, delta) {
            var tickarray = [];
            var periodfn = this.periodfn(periodtype);
            var currenttick = periodfn.periodstartfn(min, delta);

            while (currenttick < max) {

                var period_start = periodfn.periodstartfn(currenttick, delta);
                var period_end = periodfn.periodendfn(period_start, delta);

                while (currenttick < period_end) {
                    if ((currenttick >= min) && (currenttick <= max)) {
                        tickarray.push(currenttick);
                    }
                    currenttick = periodfn.adddeltafn(currenttick, delta);
                    // Dirty rule - do not render marks after 29 day of month
                    if ((periodtype === 'day') && (delta > 1)) {
                        if ((new Date(currenttick)).getDate() > 29) {
                            currenttick = period_end;
                        }
                    }
                }
                currenttick = period_end;

            }
            return tickarray;
        },

        /*
         diffarray=one-two

         */
        diffarray:function (one, two) {
            var newone = [];
            for (var i = one.length; i;) {
                var item = one[--i];
                var finded = false;
                for (var j = two.length; j;) {
                    if (item === two[--j]) {
                        finded = true;
                        break;
                    }
                }
                if (!finded) {
                    newone.push(item);
                }
            }
            return newone;
        }

    }).init();


}
