$("document").ready(function () {
    var FAVORITES = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger",
                "noobs2ninjas", "beohoff", "jcarverpoker", "medrybw"],
            activeFilter = "all",
            $inputSearch = $("input[name='search']");

    getChannelsFromAPI(FAVORITES);

    $(".button").click(function () {
        var $buttonFilter = $("#button-" + activeFilter);
        $buttonFilter.removeClass("button-active");
        $buttonFilter.addClass("button-inactive");

        activeFilter = $(this).html().toLowerCase();
        $buttonFilter = $("#button-" + activeFilter);
        $("." + activeFilter).show();
        $(".channel").not("." + activeFilter).hide();
        $buttonFilter.removeClass("button-inactive");
        $buttonFilter.addClass("button-active");
    });

    $inputSearch.focus(function () {
        $(this).val("");
    });

    $inputSearch.focusout(function () {
        if (!$(this).val()) {
            $(this).val("Filter...");
        }
    });

    $inputSearch.keyup(function () {
        var searchStr = $(this).val().toLocaleLowerCase();
        $(".channel").each(function () {
            if ($(this).attr('id').indexOf(searchStr) !== 0) $(this).hide();
            else $(this).show();
        });
    });
});


function getChannelsFromAPI(channelsArr) {
    var apiEndpointURL = "https://api.twitch.tv/kraken/",
            callbackParam = "?callback=?",
            channelEndpointURL = "",
            streamEndpointURL = "",
            channelObj;

    // Traverse channels, get API info and append to html
    channelsArr.forEach(function (channelName) {
        channelEndpointURL = apiEndpointURL + "channels/" + channelName + callbackParam;
        $.getJSON(channelEndpointURL).success(function (channelApiResponse) {
            streamEndpointURL = apiEndpointURL + "streams/" + channelName + callbackParam;
            $.getJSON(streamEndpointURL).success(function (streamApiResponse) {
                channelObj = {
                    "displayName": channelApiResponse["display_name"],
                    "logo": channelApiResponse["logo"] ? channelApiResponse["logo"]
                            : "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png",
                    "url": channelApiResponse["url"],
                    "theme": channelApiResponse["game"],
                    "description": channelApiResponse["status"],
                    "language": channelApiResponse["language"],
                    "isOnline": streamApiResponse["stream"] !== null
                };

                appendChannelHtml(channelObj);
            });
        });
    });
}

function appendChannelHtml(channelObj) {
    //console.log(JSON.stringify(channelObj)); // DEBUG
    $("#channels").append(
            "<a href='" + channelObj.url + "' target='blank'>" +
            "<li id='" + channelObj.displayName.toLocaleLowerCase() + "' class='channel " + (channelObj.isOnline ? "online" : "offline") + " all'>" +
            "<img class='channel-logo' src='" + channelObj.logo + "'>" +
            "<div class='channel-rows'>" +
            "<div class='channel-row1'>" +
            "<div class='channel-name'>" + channelObj.displayName + "</div>" +
            "<div class='channel-lang'>" + channelObj.language.toUpperCase() + "</div>" +
            "<img class='icon' src='" +
            (channelObj.isOnline ? "assets/icons/online-icon.png" : "assets/icons/offline-icon.png") +
            "'>" +
            "</div>" +
            "<div class='channel-row2'>" + (channelObj.theme ? channelObj.theme : "") + "</div>" +
            "</div>" +
            "</li></a>"
    );
}