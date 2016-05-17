import {App, IonicApp, Platform} from 'ionic-angular';
import {HTTP_PROVIDERS} from 'angular2/http';
import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    providers: [HTTP_PROVIDERS, PropertyService, BrokerService]
})
class MyApp {

    static get parameters() {
        return [[IonicApp], [Platform]];
    }

    constructor(app, platform) {

        this.app = app;
        this.platform = platform;

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
        
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

}
