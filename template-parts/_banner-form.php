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
                <video muted playsinline loop preload poster="img/content/banner-img.webp" src="#"
                    data-src="video/video.mp4"></video>
            </div>
        </div>


        <div class="banner-align align-middle">
            <div class="banner-container size2">
                <div class="banner-form">
                    <h1 class="h6 title upper text-center">
                        зберегти прорахунок і отримати презентацію
                    </h1>
                    <!-- <form class="form-block"> -->
                        <div class="input-field">
                            <div class="input-placeholder">Ваше ім’я</div>
                            <input type="text" class="input" placeholder="Введіть ваше ім’я">
                        </div>
                        <div class="input-field">
                            <div class="input-placeholder">Номер телефону</div>
                            <input type="tel" class="input" placeholder="Введіть номер телефону">
                        </div>
                        <div class="input-field">
                            <div class="input-placeholder">Email</div>
                            <input type="email" class="input" placeholder="Введіть свій email">
                        </div>
                        <div class="ch-box-wrap">
                            <label class="ch-box">
                                <input type="checkbox">
                                <span>
                                    Так, я погоджуюсь на обробку моїх персональних данних
                                </span>
                            </label>
                        </div>
                        <div class="form-buttons">
                            <a href="#" class="btn-back js-back">
                                <svg width="9" height="16">
                                    <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                </svg>
                            </a>
                            <div class="submit-field">
                                <!-- change on program to button tag and add type="submit" -->
                                <a href="thank.php" class="btn btn-block">
                                    <b>надіслати заявку</b>
                                </a>
                            </div>
                        </div>
                    <!-- </form> -->
                </div>
            </div>
        </div>
    </div>
</div>