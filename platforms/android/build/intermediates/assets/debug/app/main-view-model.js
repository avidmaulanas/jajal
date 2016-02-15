var observable = require("data/observable");
var http = require("http");
var frames = require("ui/frame");
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

    HelloWorldModel.prototype.tapProfile = function () {
        frames.topmost().navigate("profile-page");
    };

    HelloWorldModel.prototype.tapLogin = function () {
        frames.topmost().navigate("login/login");
    };

    HelloWorldModel.prototype.tapCancel = function () {
        frames.topmost().goBack();
    };


    buatLogin = function (data) {
        var result;
        http.request({
            url: "https://httpbin.org/post",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                subdomain: data.subdomain,
                email: data.email,
                password: data.password
            })

        }).then(function (response) {
            result = response.content.toJSON();
            console.log(result);
        }, function (e) {
            console.log("Error occurred " + e);
        });
    }

    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
