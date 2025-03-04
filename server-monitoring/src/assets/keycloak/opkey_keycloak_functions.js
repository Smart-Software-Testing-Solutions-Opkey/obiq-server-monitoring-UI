

// var Keycloak_Auth_Url = 'https://sstsauth.stg.opkeyone.com/auth/';
// var Keycloak_Realm = 'KC_SSTS_Auth';
// var Keycloak_Web_ClientId = 'SSTS';

var Keycloak_Auth_Url = '';
var Keycloak_Realm = '';
var Keycloak_Web_ClientId = '';
var Keycloak_Teams_ClientId = '';
var Sso_enabled = '';
var Sso_idphint = '';
var KeycloakClientName = '';

//var pre_url= window.location.href.indexOf("localhost")>-1? window.base_url:"";

var pre_url = window.base_url;

//This method must now be deprecated as its name is mis-leading
function get_keycloak_attribute(keycloakClientName) {
    keycloak_init_with_force_login(keycloakClientName, null);
}

function keycloak_init_with_force_login(keycloakClientName, initedCallback) {
    //debugger;
    // similar function has been created to init the keycloak object without forcing to login named 'keycloak_init_without_force_login'

    if (window.keycloak) return;

    let xhr = new XMLHttpRequest();
    KeycloakClientName = keycloakClientName;
    xhr.open('GET', pre_url + 'login/get_keycloak_settings?opkeyone_callsource=' + keycloakClientName);

    xhr.onload = function () {

        if (xhr.status == 200) {


            var stringfy_settings = xhr.responseText;
            var parse_settings = JSON.parse(stringfy_settings);

            Keycloak_Auth_Url = parse_settings.Keycloak_Auth_Url;
            Keycloak_Realm = parse_settings.Keycloak_Realm;
            Keycloak_Web_ClientId = parse_settings.Keycloak_Web_ClientId;
            Keycloak_Teams_ClientId = parse_settings.Keycloak_Teams_ClientId; 
            Keycloak_sso_settings = parse_settings.SSO_Settings
            Sso_enabled = Keycloak_sso_settings.isEnabled
            Sso_idphint = Keycloak_sso_settings.IDP_Hint
            _inner_keycloak_init(true, initedCallback);

        } else {


            console.log("xhr", xhr)
            document.getElementById("div_main_page_loader").style.display = 'none';
            document.getElementById("div_app_error_message").style.display = '';
            document.getElementById("div_app_error_message").innerHTML = xhr.responseText;

        }


    };

    xhr.onerror = function (error) {

        console.log("xhr", xhr);

        var error_message = "";
        if (error.hasOwnProperty("message")) {
            error_message = error.message;
        } else {
            error_message = xhr.responseText;
        }

        document.getElementById("div_main_page_loader").style.display = 'none';
        document.getElementById("div_app_error_message").style.display = '';
        document.getElementById("div_app_error_message").innerHTML = error.message;
    };


    xhr.send();
}



function _inner_keycloak_init(shouldForceLogin, initedCallback) {
    //debugger;

    if (window.keycloak) return;

    window.keycloak = new Keycloak({
        url: Keycloak_Auth_Url,
        realm: Keycloak_Realm,
        clientId: KeycloakClientName!="MsTeams"? Keycloak_Web_ClientId:Keycloak_Teams_ClientId,
    });

    var onLoadOption = 'check-sso';
    var checkLoginIframe = false;

    if(Sso_enabled ==false && shouldForceLogin){
        onLoadOption = 'login-required';
    }

    if(shouldForceLogin == false){
        checkLoginIframe = false;
    }    

    keycloak.init({
        onLoad: onLoadOption,
        checkLoginIframe: checkLoginIframe

    }).then(function (authenticated) {

        if (authenticated) {
            set_keycloak_token(keycloak.token);

            keycloak.loadUserProfile().then(function (profile) {
                console.log(profile);
                //window.location.href = "/";
            });


            window.postMessage("keycloak settings loaded.","*")

        }
        else {
            if (Sso_enabled) {
                keycloak.login({ idpHint: Sso_idphint });
            }
        }

        if(initedCallback){
            initedCallback();
        }

    }).catch(function (e) {
        alert('failed to initialize ' + e);

    });

    keycloak.onTokenExpired = () => {
        console.log('token expired', keycloak.token);
        keycloak.updateToken(60).success(() => {

            console.log(" new keycloak token ", keycloak.token);
            set_keycloak_token(keycloak.token);


        }).error(() => {
            console.error("Unable to refresh keycloak token");
        });
    }
}

function keycloak_init_without_force_login(keycloakClientName, initedCallback) {
    if (window.keycloak) return;


    let xhr = new XMLHttpRequest();
    KeycloakClientName = keycloakClientName;
    xhr.open('GET', pre_url + 'login/get_keycloak_settings?opkeyone_callsource=' + keycloakClientName);

    xhr.onload = function () {

        if (xhr.status == 200) {

            var stringfy_settings = xhr.responseText;
            var parse_settings = JSON.parse(stringfy_settings);

            Keycloak_Auth_Url = parse_settings.Keycloak_Auth_Url;
            Keycloak_Realm = parse_settings.Keycloak_Realm;
            Keycloak_Web_ClientId = parse_settings.Keycloak_Web_ClientId;
            Keycloak_Teams_ClientId = parse_settings.Keycloak_Teams_ClientId; 
            Keycloak_sso_settings = parse_settings.SSO_Settings
            Sso_enabled = Keycloak_sso_settings.isEnabled
            Sso_idphint = Keycloak_sso_settings.IDP_Hint
            
            _inner_keycloak_init(false, initedCallback);

        }
    }

    xhr.send(); 

   
}

function keycloak_logout() {

    var logout_redirect_uri = window.location.origin + "/opkeyone/";
    if (Sso_enabled) {
        // Please Donot change url.
        logout_redirect_uri = window.location.origin + "/login/LoggedoutofOpkey";
    }
    var logoutOptions = { redirectUri: logout_redirect_uri };
    window.keycloak.logout(logoutOptions);

}

function keycloak_logout_with_redirect_url() {

    if (!window.keycloak) {
        window.keycloak = new Keycloak({
            url: Keycloak_Auth_Url,
            realm: Keycloak_Realm,
            clientId: Keycloak_Web_ClientId
        });
    }

    window.keycloak.init({ checkLoginIframe: false }).then(function () {
        var logoutOptions = { redirectUri: window.location.origin + "/profile/index" };
        window.keycloak.logout(logoutOptions);
    });


}


function keycloak_loaduserprofile() {

    window.keycloak.loadUserInfo().success(function (data) {
        console.log("keycloak-data", data);
    }).error(function (data) {
        console.log("error", data);
        window.location.href = "/";
    })

}


function set_keycloak_token(token) {


    let xhr = new XMLHttpRequest();
    xhr.open('POST', pre_url + 'login/create_keycloak_token_cookie?token=' + token);
    xhr.send();

    xhr.onload = function () {

        if (xhr.status == 200) { }
    };


}



function validate_updatetoken() {

    window.keycloak.updateToken(60).then((updated) => {
        console.log('Token Updated?:', updated);
        if (updated) {
            window.set_keycloak_token(window.keycloak.token);
        }
    }).catch(err => {
        console.error("Unable to refresh keycloak token", err);
    });

}
