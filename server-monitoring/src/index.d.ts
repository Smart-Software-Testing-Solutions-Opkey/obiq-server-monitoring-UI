export { };

declare global {
    interface Window {

        base_url: any
        opkeyone_callsource: any
        keycloak_logout: any; // 👈️ turn off type checking
        keycloak_logout_with_redirect_url: any;
        keycloak: any
        keycloak_init_sso: any;
        keycloak_loaduserprofile: any;
        validate_updatetoken: any
        opkey_project_key: any
    }
}