/**
 * Pomodoro object
 * (Singleton pattern based on Addy Osmani solution with public and private members)
 *
 * @type {Pomodoro}
 */
var Pomodoro = (function () {
    var instance;

    function init() {
        /*
         Private members
         */
        var pomodoroConfig = {
                "work": {
                    "icon": "assets/images/work.png",
                    "mode-color": "red"
                },
                "rest": {
                    "icon": "assets/images/rest.png",
                    "mode-color": "lawngreen"
                }
            },
            pomodoroMode = "work",
            timerSecondsRemaining = workMinutes;
            nextAction = "START";

        function setMode(mode) {
            pomodoroMode = mode;
            $(".icon").prop("src", pomodoroConfig[mode]["icon"]);
            $(".pomodoro").css("border-color", pomodoroConfig[mode]["mode-color"]);
            $(".timer").css("color", pomodoroConfig[mode]["mode-color"]);
        }

        setMode("work");

        /*
         Public members
         */
        return {
            state: "initial", // running, stopped, paused, reset

            showPomodoro: function (minutes, seconds) {
                $("#minutes").html(utils.formatDigit(minutes));
                $("#seconds").html(utils.formatDigit(seconds));
            },

            start: function () {
                var _this = this,
                    minutes,
                    seconds;

                timerSecondsRemaining = Math.round(workMinutes * 60);
                _this.state = "running";

                $(".timer-action").html("Click to PAUSE");

                setInterval(function () {
                    // Change mode when minutes expire
                    if (timerSecondsRemaining === 0) {
                        if (pomodoroMode === "work") {
                            setMode("rest");
                            timerSecondsRemaining = Math.round(restMinutes * 60);
                        }
                        else {
                            setMode("work");
                            timerSecondsRemaining = Math.round(workMinutes * 60);
                        }
                        _this.state = "running";
                    }

                    // Setup pomodoro after reset
                    if (_this.state === "reset") {
                        if (pomodoroMode === "work") {
                            timerSecondsRemaining = Math.round(workMinutes * 60);
                        }
                        else {
                            timerSecondsRemaining = Math.round(restMinutes * 60);
                        }
                        _this.state = "running";
                    }

                    if (_this.state === "paused") return;

                    timerSecondsRemaining--;
                    minutes = Math.floor(timerSecondsRemaining / 60);
                    seconds = Math.floor(timerSecondsRemaining % 60);
                    _this.showPomodoro(minutes, seconds);
                }, 1000);
            },

            pause: function () {
                console.log("pause()");
                this.state = "paused";
                $(".timer-action").html("Click to RESUME");
            },

            stop: function () {
                console.log("stop()");
                this.state = "stopped";
                $(".timer-action").html("Click to RESUME");
            },

            resume: function () {
                console.log("resume()");
                this.state = "running";
                $(".timer-action").html("Click to PAUSE");
            },

            reset: function (mode) {
                setMode(mode);
                if (mode === "work") {
                    this.showPomodoro(workMinutes, 0);
                } else {
                    this.showPomodoro(restMinutes, 0);
                }

                if (this.state !== 'initial') {
                    this.state = "reset";
                }
                $(".timer-action").html("Click to PAUSE");
            }
        }
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());
