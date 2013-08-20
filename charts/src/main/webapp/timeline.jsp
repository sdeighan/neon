<!DOCTYPE html>
<html>
<head>
    <%
        String neonServerUrl = getServletContext().getInitParameter("neon.url");
        String owfServerUrl = getServletContext().getInitParameter("owf.url");
    %>

    <title>Timeline widget</title>

    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/timelinewidget.css">
    <link rel="stylesheet" type="text/css" href="css/barchart.css">
    <link rel="stylesheet" type="text/css" href="css/timeline.css">
    <link rel="stylesheet" type="text/css" href="css/jqueryui/smoothness/jquery-ui-1.10.3.custom.min.css">
    <link rel="stylesheet" type="text/css" href="<%=neonServerUrl%>/css/neon.css">
    <script src="<%=owfServerUrl%>/js/owf-widget.js"></script>
    <script src="<%=neonServerUrl%>/js/neon.js"></script>

    <!-- build:js js/charts.js -->
    <script src="d3/d3.v3.min.js"></script>
    <script src="jquery/jquery-1.10.1.min.js"></script>
    <script src="jqueryui/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="lodash/1.3.1/lodash.min.js"></script>
    <script src="namespaces.js"></script>
    <script src="barchart.js"></script>
    <script src="timeline.js"></script>
    <!-- endbuild -->

    <script src="js/chartwidget.js"></script>
    <script src="js/timelinewidget.js"></script>

    <script>
        OWF.relayFile = 'js/eventing/rpc_relay.uncompressed.html';
        neon.query.SERVER_URL = '<%=neonServerUrl%>';
        neon.util.AjaxUtils.useDefaultStartStopCallbacks();
    </script>

</head>
<body>

<div class="container chart-container">


    <div class="controls-row">
        <div class="control-group">
            <label class="control-label" for="x">x-axis (Date)</label>

            <div class="controls">
                <select id="x" class="dropdown"></select>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="y">y-axis</label>

            <div class="controls">
                <select id="y" class="dropdown"></select>
            </div>
        </div>
    </div>

    <div class="controls-row">
        <div class="control-group">
            <label class="control-label" for="time-granularity">Time Granularity</label>

            <div class="controls">
                <select id="time-granularity" class="dropdown">
                </select>
            </div>
        </div>
    </div>

    <div id="timeline" class="timeline-div">
        <div id="chart" class="chart-div"></div>
    </div>

    <div class="controls-row">
        <div id="button-row" class="control-group">
            <div class="controls">
                <button type="button" id="redraw-bounds" class="btn">Redraw Bounds</button>

                <button type="button" id="reset-filter" class="btn">Reset Time Period</button>
            </div>
        </div>
    </div>


</div>

</body>
</html>
