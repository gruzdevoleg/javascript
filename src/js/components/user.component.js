import { AuthService } from './../services/auth.service';
import { ActiveRoute } from './../core/active.route.service';
import { UserService } from './../services/user.service';

export class UserComponent {
    constructor() {
        this._activeRoute = new ActiveRoute();
        this._authService = new AuthService();
        this._userService = new UserService();

        //this._authUserId;
        this._activeUserId;
        this._user;
        this._userImages;
        this._imageTemplate;
    }
    async beforeRender() {
        //this._authUserId = this._authService.userId;
        this._activeUserId = this._activeRoute.parseRequestURL().id;
        this._user = await this._userService.getUser(this._authService.userId);
        this._userImages = await this._userService.getUserImages(this._authService.userId);
        this._imageTemplate = this._userImages.images.map((image) => this._singleImageTemplate(image));
        console.log(this._imageTemplate);
    }
    render() {
        return `
            <!-- Component styles -->
            <style>
                ${this.style()}
            </style>
            <!-- Component html -->
            <div class="user-cover-container"
                style="background: url(${this._user.cover}) no-repeat center / cover;"
            >
            </div>
            <div class="user-avatar-container d-flex justify-content-center">
                <div class="user-avatar">
                    <img src="${this._user.avatar}">
                </div>
            </div>
            <div class="images-container container">
                <div class="row">
                ${this._imageTemplate.join('')}
                </div>
            </div>
        `;
    }

    _singleImageTemplate(image) {
        return `
          <div class="col col-4">
            <div class="img-item" data-imageId="${image._id}">
              <img src="${image.url}">
              <div class="img-item-hover">
                <span>
                   <i class="fas fa-eye"></i>
                  ${image.views.length}
                </span>
                <span>
                  <i class="fas fa-thumbs-up"></i>
                  ${image.likes.length}
                </span>
                <span>
                    <i class="fas fa-trash-alt delete-image" data-toggle="modal" data-target="#deleteImageModal"></i>
                </span>
              </div>
            </div>
          </div>
        `;
      }

    style() {
        return `
            img {
                max-width: 100%;
            }
            .user-cover-container {
                height: 400px;
                width: 100%;
            }
            .user-avatar-container {
                transform: translateY(-50%);
            }
            .user-avatar {
                width: 138px;
                height: 138px;
                border-radius: 50%;
                overflow: hidden;
            }
            .img-item {
                height: 200px;
                text-align: center;
                overflow: hidden;
                background-color: #000;
                margin-bottom: 30px;
                position: relative
              }
              .img-item img {
                height: 100%;
                max-width: none;
              }
              .img-item-hover {
                opacity: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                color: white;
                background: rgba(0, 0, 0, .5);
                transition: all .2s ease-in;
              }
  
              .img-item:hover .img-item-hover {
                opacity: 1;
              } 
        `;
    }
    afterRender() {

    }
}