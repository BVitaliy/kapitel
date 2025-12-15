<!-- Banner Full -->
<div class="section banner-section">
    <div class="banner full">

        <div class="banner-media">
            <picture>
                <!-- desktop -->
                <source srcset="img/content/banner-img.webp" type="image/webp" media="(min-width:768px)">
                <source srcset="img/content/banner-img.jpg" type="image/jpg" media="(min-width:768px)">
                <!-- mobile -->
                <source srcset="img/content/banner-img.webp" type="image/webp" media="(max-width:767px)">
                <source srcset="img/content/banner-img.jpg" type="image/jpg" media="(max-width:767px)">
                <img fetchpriority="high" width="380" height="240" src="#" alt="Banner Image" loading="eager">
            </picture>

            <!-- to display the video, add a class 'video-present' to the video -->
            <div class="video">
                <video muted playsinline loop preload poster="img/banner-img.webp" src="#"
                    data-src="video/video.mp4"></video>
            </div>
        </div>


        <div class="banner-align align-middle">
            <div class="banner-container">
                <div class="banner-row">
                    <div class="banner-col banner-left">
                        <div class="banner-info">
                            <h1 class="h4 title upper text-center text-xl-left">
                                Прорахуйте вартість лише за <span>3 простих кроки</span>
                            </h1>
                            <div class="banner-steps">
                                <div class="banner-step">
                                    <div class="banner-step__title">Вкажіть параметри вашого об’єкту</div>
                                    <img src="img/step-icon1.svg" alt="" width="70" height="70">
                                </div>
                                <div class="banner-step">
                                    <div class="banner-step__title">Задизайніть вашу нерухомість</div>
                                    <img src="img/step-icon2.svg" alt="" width="70" height="70">
                                </div>
                                <div class="banner-step">
                                    <div class="banner-step__title">Отримайте безкоштовну пдф презентацію вашого проєкту</div>
                                    <img src="img/step-icon3.svg" alt="" width="70" height="70">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="banner-col banner-right">
                        <div class="banner-form">
                            <div class="banner-form__title h5 title upper text-center">калькулятор вартості проєкту</div>
                            <div class="form-block">
                                <!--  <div class="input-field">
                                    <div class="input-placeholder">Область</div>
                                    <select class="SelectBox">
                                        <option value="placeholder" selected disabled>Введіть назву</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                        <option>Option 4</option>
                                        <option>Option 5</option>
                                        <option>Option 6</option>
                                        <option>Option 7</option>
                                        <option>Option 8</option>
                                    </select> 
                                </div>
                                -->
                                <div class="input-field">
                                    <div class="input-placeholder">Область</div>
                                    <input type="text" class="input" required name=region placeholder="Введіть назву">
                                </div>
                                <div class="input-field">
                                    <div class="input-placeholder">Місто</div>
                                    <input type="text" class="input" required name=city placeholder="Введіть назву">
                                </div>                                
                                <!-- <div class="input-field">
                                    <div class="input-placeholder">Місто</div>
                                    <select class="SelectBox">
                                        <option value="placeholder" selected disabled>Введіть назву</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                        <option>Option 4</option>
                                        <option>Option 5</option>
                                        <option>Option 6</option>
                                        <option>Option 7</option>
                                        <option>Option 8</option>
                                    </select>
                                </div> -->
                                <div class="input-field">
                                    <div class="input-placeholder">Тип нерухомості</div>
                                    <div class="ch-box-wrap">
                                        <label class="ch-box">
                                            <input type="radio" name="property_type" value=0 checked>
                                            <span>
                                                Новобудова
                                            </span>
                                        </label>
                                        <label class="ch-box">
                                            <input type="radio" name="property_type" value=1>
                                            <span>
                                                Вторинний ринок
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="error-text invalid"></div>
                                <div class="submit-field">
                                    <!-- change on program to button tag and add type="submit" -->
                                    <a href="#" class="btn btn-block js-next">
                                        <b>Почати</b>
                                    </a>
                                </div>
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>