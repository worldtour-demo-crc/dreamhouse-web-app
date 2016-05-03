import {App, IonicApp, Platform} from 'ionic-angular';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';
import {PushService} from './services/push-service';
import * as force from './force';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    providers: [PropertyService, BrokerService, PushService]
})
class MyApp {

    static get parameters() {
        return [[IonicApp], [Platform], [PushService]];
    }

    constructor(app, platform, pushService) {

        this.app = app;
        this.platform = platform;
        this.pushService = pushService;

        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            {title: 'Properties', component: PropertyListPage, icon: "home"},
            {title: 'Brokers', component: BrokerListPage, icon: "people"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"}
        ];

        this.rootPage = WelcomePage;
        this.initializeApp();
    }

    initializeApp() {

        this.platform.ready().then(() => {
            force.init({
                appId: "3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZYblYiG9oMxlbHO3gixLK8CcH.342BxX6L7NT8W4iND3lT9h52sAq1KtTIiz",
                proxyURL: "https://dev-cors-proxy.herokuapp.com/"
            });
            force.login().then(() => {
                console.log("logged in");
            });

            if (window.PushNotification) {
                let push = window.PushNotification.init({
                    "ios": {
                        "sound": true,
                        "vibration": true,
                        "badge": true
                    }
                });

                push.on('registration', data => {
                    this.pushService.register(force.getUserId(), data.registrationId).subscribe();
                    console.log("registration event: " + data.registrationId);
                });

                push.on('error', e => {
                    console.log("push error = " + e.message);
                });
            }

        });
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

    logoutUser() {
        force.logout();
    }

}
