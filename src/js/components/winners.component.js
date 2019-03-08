import { Winners } from '../services/winners.service';

export class WinnersComponent {
    constructor() {
        this._winners = new Winners();
        this._winnersCollection;
        this._winnerImages = '';
    }

    async beforeRender() {
       this._winnersCollection = await this._winners.winners();
       this._winnersCollection.winners.forEach((item) => {
            this._winnerImages = this._winnerImages + `
                <div class="h300"><img src="${item.member_id.images[0].image_basic.url}"></div>
                `
        });
    }

    render() {
        return `
        <!-- Component styles -->
        <style>
            ${this._style()}
        </style>
        <!-- Component html -->
        <div class="container">
            <div class="winners">
               ${this._winnerImages}
            </div>
        </div>
     `;
    }

    _style() {
        return `
            .container {
                max-width: 1200px;
                padding-left: 15px;
                padding-right: 15px;
                margin: 0 auto;
            }
            .winners {
                display: flex;
                flex-wrap: wrap
            }
            .h300 {
               height: 300px;
               padding: 1px;
               width: 20%
            }
            .h300 img {
               height: auto;
               width: 100%
            }
        `;
    }

    afterRender() {

    }
}