import { AuthService } from './../services/auth.service';

export class SignupComponent {
    constructor() {}

    async beforeRender() {}

    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Sign Up to Social.</h3>
                <p class="text-secondary">Enter your data to create your account.</p>
                <form name="signupForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="(?=.*\d)(?=.*[a-z]).{8,}">
                        <input type="text" class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname" required data-pattern="[a-zA-Z0-9]+">
                        <input type="text" class="form-control form-control-sm mt-3" id="first_name" placeholder="first name" data-pattern="\S+">
                        <input type="text" class="form-control form-control-sm mt-3" id="last_name" placeholder="last name" data-pattern="[a-zA-Z]+">
                        <input type="tel" class="form-control form-control-sm mt-3" id="phone" placeholder="phone" data-pattern="[0-9]">
                        <div class="form-control form-control-sm mt-3">
                            <label class="radio">               
                                <input type="radio" value="male" name="gender">
                                <span>Male</span>
                            </label>
                            <label class="radio">
                                <input type="radio" value="female" name="gender">
                                <span>Female</span>
                            </label>
                        </div>  
                        <input type="text" class="form-control form-control-sm mt-3" id="city" placeholder="city" data-pattern="\S+">
                        <input type="text" class="form-control form-control-sm mt-3" id="country" placeholder="country" data-pattern="\S+">
                        <input type="number" class="form-control form-control-sm mt-3" id="date_of_birth_day" placeholder="day of birth" max="31">
                        <input type="number" class="form-control form-control-sm mt-3" id="date_of_birth_month" placeholder="month of birth" max="12">
                        <input type="number" class="form-control form-control-sm mt-3" id="date_of_birth_year" placeholder="year of birth">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
    }

    afterRender() {
        document.forms['signupForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            const userData = {
                email: e.target.elements['email'].value,
                password: e.target.elements['password'].value,
                nickname: e.target.elements['nickname'].value,
                first_name: e.target.elements['first_name'].value,
                last_name: e.target.elements['last_name'].value,
                phone: e.target.elements['phone'].value,
                gender_orientation: e.target.elements['gender'].value,
                city: e.target.elements['city'].value,
                country: e.target.elements['country'].value,
                date_of_birth_day: e.target.elements['date_of_birth_day'].value,
                date_of_birth_month: e.target.elements['date_of_birth_month'].value,
                date_of_birth_year: e.target.elements['date_of_birth_year'].value
            };

            if (!userData.email || !userData.password || !userData.nickname) return;
            
            this._authService.signup(userData)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });                
        });
    }
}