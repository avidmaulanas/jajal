var observable = require("data/observable");
var http = require("http");
var frames = require("ui/frame");
var dialogs = require("ui/dialogs");

var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
    }

    LoginViewModel.prototype.tapLogin = function () {
        dialogs.alert({
          title: "About",
          message: this.email,
          okButtonText: "OK"
        }).then(function () {
          console.log("Dialog closed!");
        });
    };

    LoginViewModel.prototype.tapCancel = function () {
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

    return LoginViewModel;
})(observable.Observable);
exports.LoginViewModel = LoginViewModel;
exports.mainViewModel = new LoginViewModel();
