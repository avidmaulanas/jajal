var observable = require("data/observable");
var http = require("http");
var frames = require("ui/frame");
var dialogs = require("ui/dialogs");
var domain = "http://192.168.0.23:3001";

var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
    }

    LoginViewModel.prototype.tapLogin = function () {
        buatLogin(this.subdomain, this.email, this.password);
    };

    LoginViewModel.prototype.tapCancel = function () {
        frames.topmost().goBack();
    };


    buatLogin = function (subdomain, email, password) {
        var result;
        http.request({
            url: domain + "/api/v1/employees/login_account",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                subdomain: subdomain,
                email: email,
                password: password
            })

        }).then(function (response) {
            result = JSON.parse(response.content);
            console.log(JSON.stringify(result));
            localStorage.setItem("isLogin", true);
            localStorage.setItem("subdomain", result.subdomain);
            localStorage.setItem("userToken", result.token);
            dialogs.alert({
              title: "Success Login",
              message: "Subdomain: " + result.subdomain + "\n" +
                "Token: " + result.token + "\n",
              okButtonText: "OK"
            }).then(function () {
              console.log("Dialog closed!");
            });
        }, function (e) {
            console.log("Error occurred " + e);
        });
    }

    return LoginViewModel;
})(observable.Observable);
exports.LoginViewModel = LoginViewModel;
exports.mainViewModel = new LoginViewModel();
