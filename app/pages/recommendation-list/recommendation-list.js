import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {PropertyDetailsPage} from '../property-details/property-details';
import {PropertyService} from '../../services/property-service';

@Page({
    templateUrl: 'build/pages/recommendation-list/recommendation-list.html'
})
export class RecommendationListPage {

    static get parameters() {
        return [[NavController], [PropertyService]];
    }

    constructor(nav, propertyService) {
        this.nav = nav;
        this.propertyService = propertyService;
    }

    ngOnInit() {
        this.loadRecommendations();
    }

    loadRecommendations() {
        this.propertyService.getRecommendations().subscribe(recommendations => this.recommendations = recommendations);
    }

    itemTapped(event, recommendation) {
        this.nav.push(PropertyDetailsPage, {
            property: recommendation
        });
    }

}
