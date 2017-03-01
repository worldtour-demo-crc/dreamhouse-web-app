import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {SearchService} from '../../services/search-service';

@Page({
    templateUrl: 'build/pages/photo-search/photo-search.html'
})
export class PhotoSearchPage {

    static get parameters() {
        return [[NavController], [SearchService]];
    }

    constructor(nav, searchService) {
        this.nav = nav;
        this.searchService = searchService;
        this.searching = false;
        this.probabilities = [];
    }

    ngOnInit() {

    }

    photoSelected(event) {
        var that = this;
        var file = event.target.files[0];

        this.searching = true;
        this.probabilities = [];

        this.searchService.findByImage(file, function(json) {
            that.searching = false;
            that.probabilities = json.probabilities.map(function(probability) {
                return {
                    label: probability.label,
                    probability: Math.round(probability.probability * 100)
                }
            });
        });
    }

}
