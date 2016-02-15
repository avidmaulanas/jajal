var observable = require("data/observable");
var dialogs = require("ui/dialogs");

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.counter = 42;
        this.set("message", this.counter + " taps left");
    }
    HelloWorldModel.prototype.tapAction = function () {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    };

    HelloWorldModel.prototype.tapReset = function () {
        this.counter = 100;
        this.set("message", this.counter + " taps left");
    };

    HelloWorldModel.prototype.tapAbout = function () {
        dialogs.alert({
          title: "About",
          message: "Ini mah jajal Native Script :D",
          okButtonText: "OK"
        }).then(function () {
          console.log("Dialog closed!");
        });
    };


    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
