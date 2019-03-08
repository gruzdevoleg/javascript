import { News } from '../services/news.service';

export class NewsComponent {
    constructor() {
        this._news = new News();
        this._newsCollection;
    }

    async beforeRender() {
  /**
   * перед рендерингом на страницу сохраняем то, с чем зарезолвился промис в свойство _news
 */    this._newsCollection = await this._news.news();
    }

    render() {
        return `
        <!-- Component styles -->
        <style>
            ${this._style()}
        </style>
        <!-- Component html -->
        <div class="news">
            <div class="author">
                <img src="${this._newsCollection.news[0].owner.avatar}"/>
                <p class="author__name">${this._newsCollection.news[0].owner.full_name}</p>
                <p class="author__country">${this._newsCollection.news[0].owner.country}</p>
            </div>
            <div class="content">
                <img src="${this._newsCollection.news[0].pictures[0].url}"/>
            </div>
        </div>
    `;
    }

    _style() {
        return `
            .news {
                display: flex;
                justify-content: space-between;
                font-family: 'Montserrat', sans-serif    
            }

            .author {
                width: 25%;
                text-align: center;

            }

            .author__name {
                font-size: 20px;
            }

            .author__country {
                font-size: 16px;
            }

            .content img {
                width: 100%;
            }
        `;
    }

    afterRender() {

    }
}