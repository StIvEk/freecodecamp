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
                    "border-color": "red"
                },
                "rest": {
                    "icon": "assets/images/rest.png",
                    "border-color": "green"
                }
            },
            pomodoroMode = "work",
            timerSecondsRemaining = workMinutes;

        function setMode(mode) {
            pomodoroMode = mode;
            $(".icon").prop("src", pomodoroConfig[mode]["icon"]);
            $(".pomodoro").css("border-color", pomodoroConfig[mode]["border-color"]);
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
                console.log("start() for " + workMinutes);
                var _this = this,
                    minutes,
                    seconds;

                timerSecondsRemaining = Math.round(workMinutes * 60);
                _this.state = "running";

                setInterval(function () {
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
            },

            stop: function () {
                console.log("stop()");
                this.state = "stopped";
            },

            resume: function () {
                console.log("resume()");
                this.state = "running";
            },

            reset: function (mode) {
                setMode(mode);
                if (mode === "work") {
                    this.showPomodoro(workMinutes, 0);
                } else {
                    this.showPomodoro(restMinutes, 0);
                }
                this.state = "reset";
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
