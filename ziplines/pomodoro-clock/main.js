var workMinutes = 25,
    restMinutes = 5;

$(document).ready(function () {
    var pomodoro = Pomodoro.getInstance();

    pomodoro.showPomodoro(workMinutes, 0);

    $(".work-minutes").val(utils.formatDigit(workMinutes));
    $(".rest-minutes").val(utils.formatDigit(restMinutes));

    $(".minutes-setup").change(function () {
        if (!/^[0-5]?[0-9]$/.test($(this).val())) {
            $(this).prop("title", "Invalid time format");
            return;
        }

        $(this).val(utils.formatDigit($(this).val()));

        if ($(this).hasClass("work-minutes")) {
            workMinutes = $(this).val();

            if (pomodoro.state !== "running") {
                pomodoro.showPomodoro(workMinutes, 0);
            }
        } else {
            restMinutes = $(this).val();
        }
    });

    $(".timer").click(function () {
        switch (pomodoro.state) {
            case "running" :
                pomodoro.pause();
                break;
            case "initial":
                pomodoro.start();
                break;
            default:
                pomodoro.resume();
        }
    });

    $(".setup-button").click(function () {
        setTimer($(this).parent().children("input"), $(this));
    });

    $(".icon-tmb").click(function () {
        workMinutes = $("#work-minutes").val();
        restMinutes = $("#rest-minutes").val();
        if (pomodoro.state !== "initial") {
            pomodoro.stop();
        } else {
            pomodoro.start();
        }

        if ($(this).parent().hasClass("work-setup")) {
            pomodoro.reset("work");
        } else {
            pomodoro.reset("rest");
        }
    });

    /**
     * Sets pomodoro timer when changed through setup buttons
     *
     * @param minutesTextField {html} timer text element
     * @param setupButton {html} button element
     */
    function setTimer(minutesTextField, setupButton) {
        if (minutesTextField.hasClass("work-minutes")) {
            var newValue;

            if (setupButton.hasClass("setup-button-up")) {
                if (workMinutes + 1 > 59) return;
                else workMinutes++;
            }
            else {
                if ((workMinutes - 1) < 0) return;
                else workMinutes--;
            }
            newValue = workMinutes;

            if (pomodoro.state !== "running" && pomodoro.state !== "paused") {
                pomodoro.showPomodoro(workMinutes, 0);
            }
        }
        else {
            if (setupButton.hasClass("setup-button-up")) {
                if (restMinutes + 1 > 59) return;
                else restMinutes++;
            }
            else {
                if (restMinutes - 1 < 0) return;
                else restMinutes--;
            }
            newValue = restMinutes;
        }
        minutesTextField.val(utils.formatDigit(newValue));
    }
});

