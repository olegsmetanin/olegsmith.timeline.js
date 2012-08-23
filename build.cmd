md build
type src\timeline.license > build\jquery.olegsmith.timeline.min.js
echo // Build: %DATE% %TIME% >> build\jquery.olegsmith.timeline.min.js
type src\olegsmith.namespace.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.math.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.util.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.vcontrol.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.vcontrol.grid.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.hcontrol.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.hcontrol.grid.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\timeline.hconst.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\jquery.olegsmith.timeline.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
type src\olegsmith.dateutils.js | uglifyjs.cmd -nc >> build\jquery.olegsmith.timeline.min.js
echo. >> build\jquery.olegsmith.timeline.min.js
type libs\jquery.event.drag-2.2.js | uglifyjs.cmd >> build\jquery.olegsmith.timeline.min.js
echo. >> build\jquery.olegsmith.timeline.min.js
type libs\jquery.debouncedresize.js | uglifyjs.cmd >> build\jquery.olegsmith.timeline.min.js
echo. >> build\jquery.olegsmith.timeline.min.js
type libs\jquery.mousewheel.js | uglifyjs.cmd >> build\jquery.olegsmith.timeline.min.js
