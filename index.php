<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/global/_top.php'; ?>
    <title>Kapitel :: Головна</title>
</head>

<body>
    <div id="content-block">
        <?php 
            $item_class_1 = 'current';
            include 'inc/global/_header.php'; 
        ?>

        <main>
            <form action="" id="main-form" class="main-form"> 
                <div class="js-step step-1 js-step-form active">
                    <?php include 'template-parts/_banner-full.php'; ?>
                </div>
                <div class="js-step step-2 js-step-form">
                    <div class="section section-calculator">
                       
                            <?php include 'template-parts/_stepper.php'; ?>

                            <?php include 'template-parts/_rooms-map.php'; ?>

                            <div class="filters-wrap">
                                <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                    <i></i>
                                </button>
                                <div class="filters-bg active">
                                    <div class="filters-title-wrap">
                                        <div class="filters-title upper">Кількість приміщень</div>
                                    </div>
                                    <div class="filters">
                                        <div class="filters-num">
                                            <div class="filters-num-top">
                                                <div class="filters-num-row">
                                                    <div class="filter-num-cell"></div>
                                                    <div class="filter-num-cell">Кількість кімнат</div>
                                                    <div class="filter-num-cell">Площа</div>
                                                </div>
                                            </div>
                                            <div class="filters-num-body">
                                                <div class="filters-num-row" data-room-type="kitchen" data-filled-image="img/rooms-map-1.png">
                                                    <div class="filter-num-cell">1. Кухня</div>
                                                    <div class="filter-num-cell">
                                                        <div class="stepper stepper-number">
                                                            <button class="decr" type="button">-</button>
                                                            <input value="1" min="1" max="5" readonly="" tabindex="-1">
                                                            <button class="incr" type="button">+</button>
                                                        </div>
                                                    </div>
                                                    <div class="filter-num-cell">
                                                        <input type="number" value="" min="1" max="999" class="input" required>
                                                        <span>м²</span>
                                                    </div>
                                                </div>
                                                <div class="filters-num-row" data-room-type="room" data-filled-image="#">
                                                    <div class="filter-num-cell">2. Кімната</div>
                                                    <div class="filter-num-cell">
                                                        <div class="stepper stepper-number">
                                                            <button class="decr" type="button">-</button>
                                                            <input value="1"  min="1" max="5" readonly="" tabindex="-1">
                                                            <button class="incr" type="button">+</button>
                                                        </div>
                                                    </div>
                                                    <div class="filter-num-cell">
                                                        <input type="number" value="" min="1" max="999" class="input" required>
                                                        <span>м²</span>
                                                    </div>
                                                </div>
                                                <div class="filters-num-row" data-room-type="corridor" data-filled-image="#">
                                                    <div class="filter-num-cell">3. Коридор</div>
                                                    <div class="filter-num-cell">
                                                        <div class="stepper stepper-number">
                                                            <button class="decr" type="button">-</button>
                                                            <input value="1"  min="1" max="5" readonly="" tabindex="-1">
                                                            <button class="incr" type="button">+</button>
                                                        </div>
                                                    </div>
                                                    <div class="filter-num-cell">
                                                        <input type="number" value="" min="1" max="999" class="input" required>
                                                        <span>м²</span>
                                                    </div>
                                                </div>
                                                <div class="filters-num-row" data-room-type="bathroom" data-filled-image="#">
                                                    <div class="filter-num-cell">4. Санвузол</div>
                                                    <div class="filter-num-cell">
                                                        <div class="stepper stepper-number">
                                                            <button class="decr" type="button">-</button>
                                                            <input value="1"  min="1" max="5" readonly="" tabindex="-1">
                                                            <button class="incr" type="button">+</button>
                                                        </div>
                                                    </div>
                                                    <div class="filter-num-cell">
                                                        <input type="number" value="" min="1" max="999" class="input" required>
                                                        <span>м²</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="filters-total-square">
                                                Загальна площа:
                                                <b class="total-square">0</b>
                                                <span>м²</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="error-text invalid"></div>
                                    <div class="filters-button">
                                        <a href="#" class="btn-back js-back">
                                            <svg width="9" height="16">
                                                <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                            </svg>
                                        </a>
                                        <a href="" class="btn js-next js-step-validation">Далі</a>
                                    </div>
                                </div>
                            </div>
 
                    </div>

                </div>
                <div class="js-step step-3 js-step-rooms">
                    <div class="section section-calculator">
                    
                        <?php include 'template-parts/_stepper.php'; ?>

                        <?php include 'template-parts/_style-map.php'; ?>

                        <?php include 'template-parts/_styles.php'; ?>

                        <div class="filters-wrap" data-options-type="kitchen">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg _tabs active">
                                <div class="filters-title-wrap">
                                    <div class="filters-title upper" data-room-type="kitchen">Кухня</div>
                                    <div class="sub-links">
                                        <ul>
                                            <!-- <li class="_tab-item is-active">1</li> -->
                                            <!-- <li class="_tab-item">2</li>
                                            <li class="_tab-item">3</li>
                                            <li class="_tab-item">4</li> -->
                                        </ul>
                                    </div>
                                </div>
                                <div class="filters">
                            
                                </div>

                                <div class="error-text invalid"></div>
                                <div class="filters-button">
                                    <a href="#" class="btn-back js-back">
                                        <svg width="9" height="16">
                                            <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                        </svg>
                                    </a>
                                     <a href="#" class="btn js-next js-step-validation">Далі</a>
                                </div>
                            </div>
                        </div>

                    
                    </div>

                </div>   

                <div class="js-step step-4 js-step-rooms">
                    <div class="section section-calculator">
                    
                        <?php include 'template-parts/_stepper.php'; ?>

                        <div class="styles-wrap">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg active">
                                <div class="filters-subtitle">
                                    Вибір готового стилю:
                                </div>
                                <div class="filters">
                                    <div class="filters-img active" data-style-id="1" data-image-target="room-main-1" data-image="img/_temp/d1bf963668cb7f144a92c0c94ebf729b493b4247.jpg">
                                        <picture> 
                                            <source srcset="img/_temp/d1bf963668cb7f144a92c0c94ebf729b493b4247.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>            
                                    <div class="filters-img " data-style-id="2" data-image-target="room-main-1" data-image="img/_temp/9c80fe03bdea090524088ba01e4f17af6825c81f.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image1.webp" type="image/webp">
                                            <source srcset="img/content/style-image1.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="3" data-image-target="room-main-1" data-image="img/_temp/e68b594257513113dc15edbee347dfb38764fa02.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image2.webp" type="image/webp">
                                            <source srcset="img/content/style-image2.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="4" data-image-target="room-main-1" data-image="img/_temp/1121fa47ad5267d4f4c8546d82ce588b8f21e756.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image3.webp" type="image/webp">
                                            <source srcset="img/content/style-image3.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                        
                                    <div class="filters-img" data-style-id="5" data-image-target="room-main-1" data-image="img/_temp/4.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image5.webp" type="image/webp">
                                            <source srcset="img/content/style-image5.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="room-main-1" data-image="img/_temp/5.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image6.webp" type="image/webp">
                                            <source srcset="img/content/style-image6.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="room-main-1" data-image="img/_temp/2b00df7fec491c113ed4072ebadb9542d4067016.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image7.webp" type="image/webp">
                                            <source srcset="img/content/style-image7.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="style-map">
                            <div class="style-map__image" data-draggable>
                                <div class="main-image">

                                    <img src="img/_temp/d1bf963668cb7f144a92c0c94ebf729b493b4247.jpg"  class="main" data-default-src="img/_temp/d1bf963668cb7f144a92c0c94ebf729b493b4247.jpg" data-image-id="room-main-1" alt="">
                                    <img src="#" data-default-src="#" data-image-id="floor" alt="Підлога">
                                    <img src="#" data-default-src="#" data-image-id="ceiling" alt="Стеля">
                                    <img src="#" data-default-src="#" data-image-id="walls_color" alt="Стіни">
                                    <img src="#" data-default-src="#" data-image-id="plinth" alt="Плінтус">
                                    <img src="#" data-default-src="#" data-image-id="lighting" alt="Освітлення">
                                    <img src="#" data-default-src="#" data-image-id="door" alt="Двері">
                                </div>
                                

                                <div class="markers" data-markers>
                                    <div class="list active" data-markers-id="1">
                                        <div class="marker" style="left: 30%; top: 90%;" data-marker="room-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 22%; top: 30%;" data-marker="room-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 28%; top: 7%;" data-marker="room-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="room-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 45%;" data-marker="room-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="room-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list" data-markers-id="2">
                                        <div class="marker" style="left: 33%; top: 80%;" data-marker="room-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 25%; top: 34%;" data-marker="room-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 30%; top: 11%;" data-marker="room-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="room-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 35%;" data-marker="room-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="room-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>            
                                </div>
                        
                            </div>
                        </div>

                        <div class="filters-wrap" data-options-type="room">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg _tabs active">
                                <div class="filters-title-wrap">
                                    <div class="filters-title upper" data-room-type="room">Кімната</div>
                                    <div class="sub-links">
                                        <ul>
                                            <!-- <li class="_tab-item is-active">1</li> -->
                                            <!-- <li class="_tab-item">2</li>
                                            <li class="_tab-item">3</li>
                                            <li class="_tab-item">4</li> -->
                                        </ul>
                                    </div>
                                </div>
                                <div class="filters">
                            
                                </div>

                                <div class="error-text invalid"></div>
                                <div class="filters-button">
                                    <a href="#" class="btn-back js-back">
                                        <svg width="9" height="16">
                                            <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                        </svg>
                                    </a>
                                     <a href="#" class="btn js-next js-step-validation">Далі</a>
                                </div>
                            </div>
                        </div>

                    
                    </div>
                </div> 
                
                <div class="js-step step-5 js-step-rooms">
                    <div class="section section-calculator">
                    
                        <?php include 'template-parts/_stepper.php'; ?>

                        <div class="styles-wrap">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg active">
                                <div class="filters-subtitle">
                                    Вибір готового стилю:
                                </div>
                                <div class="filters">
                                    <div class="filters-img active" data-style-id="1" data-image-target="corridor-main-1" data-image="img/_temp/0023f8cf1f4d76ec70dce8cf6d41e916b3f57a7c.jpg">
                                        <picture> 
                                            <source srcset="img/_temp/0023f8cf1f4d76ec70dce8cf6d41e916b3f57a7c.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>            
                                    <div class="filters-img " data-style-id="2" data-image-target="corridor-main-1" data-image="img/_temp/9c80fe03bdea090524088ba01e4f17af6825c81f.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image1.webp" type="image/webp">
                                            <source srcset="img/content/style-image1.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="3" data-image-target="corridor-main-1" data-image="img/_temp/e68b594257513113dc15edbee347dfb38764fa02.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image2.webp" type="image/webp">
                                            <source srcset="img/content/style-image2.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="4" data-image-target="corridor-main-1" data-image="img/_temp/1121fa47ad5267d4f4c8546d82ce588b8f21e756.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image3.webp" type="image/webp">
                                            <source srcset="img/content/style-image3.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                        
                                    <div class="filters-img" data-style-id="5" data-image-target="corridor-main-1" data-image="img/_temp/4.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image5.webp" type="image/webp">
                                            <source srcset="img/content/style-image5.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="corridor-main-1" data-image="img/_temp/5.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image6.webp" type="image/webp">
                                            <source srcset="img/content/style-image6.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="corridor-main-1" data-image="img/_temp/2b00df7fec491c113ed4072ebadb9542d4067016.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image7.webp" type="image/webp">
                                            <source srcset="img/content/style-image7.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="style-map">
                            <div class="style-map__image" data-draggable>
                                <div class="main-image">

                                    <img src="img/_temp/0023f8cf1f4d76ec70dce8cf6d41e916b3f57a7c.jpg"  class="main" 
                                    data-default-src="img/_temp/0023f8cf1f4d76ec70dce8cf6d41e916b3f57a7c.jpg" data-image-id="corridor-main-1" alt="">
                                    <img src="#" data-default-src="#" data-image-id="floor" alt="Підлога">
                                    <img src="#" data-default-src="#" data-image-id="ceiling" alt="Стеля">
                                    <img src="#" data-default-src="#" data-image-id="walls_color" alt="Стіни">
                                    <img src="#" data-default-src="#" data-image-id="plinth" alt="Плінтус">
                                    <img src="#" data-default-src="#" data-image-id="lighting" alt="Освітлення">
                                    <img src="#" data-default-src="#" data-image-id="door" alt="Двері">
                                </div>
                                

                                <div class="markers" data-markers>
                                    <div class="list active" data-markers-id="1">
                                        <div class="marker" style="left: 30%; top: 90%;" data-marker="corridor-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 22%; top: 30%;" data-marker="corridor-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 28%; top: 7%;" data-marker="corridor-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="corridor-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 45%;" data-marker="corridor-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="corridor-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list" data-markers-id="2">
                                        <div class="marker" style="left: 33%; top: 80%;" data-marker="corridor-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 25%; top: 34%;" data-marker="corridor-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 30%; top: 11%;" data-marker="corridor-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="corridor-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 35%;" data-marker="corridor-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="corridor-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>            
                                </div>
                        
                            </div>
                        </div>

                        <div class="filters-wrap" data-options-type="corridor">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg _tabs active">
                                <div class="filters-title-wrap">
                                    <div class="filters-title upper" data-room-type="corridor">Коридор</div>
                                    <div class="sub-links">
                                        <ul> 
                                        </ul>
                                    </div>
                                </div>
                                <div class="filters">
                            
                                </div>

                                <div class="error-text invalid"></div>
                                <div class="filters-button">
                                    <a href="#" class="btn-back js-back">
                                        <svg width="9" height="16">
                                            <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                        </svg>
                                    </a>
                                     <a href="#" class="btn js-next js-step-validation">Далі</a>
                                </div>
                            </div>
                        </div>

                    
                    </div>
                </div>  
                
                <div class="js-step step-6 js-step-rooms">
                    <div class="section section-calculator">
                    
                        <?php include 'template-parts/_stepper.php'; ?>

                        <div class="styles-wrap">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg active">
                                <div class="filters-subtitle">
                                    Вибір готового стилю:
                                </div>
                                <div class="filters">
                                    <div class="filters-img active" data-style-id="1" data-image-target="bathroom-main-1" data-image="img/_temp/16d0e8db4a52e18af95783c9847d7546a0338065.jpg">
                                        <picture> 
                                            <source srcset="img/_temp/16d0e8db4a52e18af95783c9847d7546a0338065.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>            
                                    <div class="filters-img " data-style-id="2" data-image-target="bathroom-main-1" data-image="img/_temp/9c80fe03bdea090524088ba01e4f17af6825c81f.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image1.webp" type="image/webp">
                                            <source srcset="img/content/style-image1.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="3" data-image-target="bathroom-main-1" data-image="img/_temp/e68b594257513113dc15edbee347dfb38764fa02.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image2.webp" type="image/webp">
                                            <source srcset="img/content/style-image2.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="4" data-image-target="bathroom-main-1" data-image="img/_temp/1121fa47ad5267d4f4c8546d82ce588b8f21e756.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image3.webp" type="image/webp">
                                            <source srcset="img/content/style-image3.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                        
                                    <div class="filters-img" data-style-id="5" data-image-target="bathroom-main-1" data-image="img/_temp/4.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image5.webp" type="image/webp">
                                            <source srcset="img/content/style-image5.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="bathroom-main-1" data-image="img/_temp/5.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image6.webp" type="image/webp">
                                            <source srcset="img/content/style-image6.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                    <div class="filters-img" data-style-id="6" data-image-target="bathroom-main-1" data-image="img/_temp/2b00df7fec491c113ed4072ebadb9542d4067016.jpg">
                                        <picture>
                                            <source srcset="img/content/style-image7.webp" type="image/webp">
                                            <source srcset="img/content/style-image7.jpg" type="image/jpg">
                                            <img width="380" height="240" src="#" alt="" loading="lazy">
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="style-map">
                            <div class="style-map__image" data-draggable>
                                <div class="main-image">

                                    <img src="img/_temp/16d0e8db4a52e18af95783c9847d7546a0338065.jpg"  class="main" 
                                    data-default-src="img/_temp/16d0e8db4a52e18af95783c9847d7546a0338065.jpg" data-image-id="bathroom-main-1" alt="">
                                    <img src="#" data-default-src="#" data-image-id="floor" alt="Підлога">
                                    <img src="#" data-default-src="#" data-image-id="ceiling" alt="Стеля">
                                    <img src="#" data-default-src="#" data-image-id="walls_color" alt="Стіни">
                                    <img src="#" data-default-src="#" data-image-id="plinth" alt="Плінтус">
                                    <img src="#" data-default-src="#" data-image-id="lighting" alt="Освітлення">
                                    <img src="#" data-default-src="#" data-image-id="door" alt="Двері">
                                </div>
                                

                                <div class="markers" data-markers>
                                    <div class="list active" data-markers-id="1">
                                        <div class="marker" style="left: 30%; top: 90%;" data-marker="bathroom-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 22%; top: 30%;" data-marker="bathroom-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 28%; top: 7%;" data-marker="bathroom-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="bathroom-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 45%;" data-marker="bathroom-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="bathroom-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="list" data-markers-id="2">
                                        <div class="marker" style="left: 33%; top: 80%;" data-marker="bathroom-floor">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#floor" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 25%; top: 34%;" data-marker="bathroom-walls">
                                            <svg width="18" height="18">
                                                <use xlink:href="img/icons/icons_global.svg#walls" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 30%; top: 11%;" data-marker="bathroom-ceiling">
                                            <svg width="19" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#ceiling" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 35%; top: 11%;" data-marker="bathroom-lighting">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#lighting" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 68%; top: 35%;" data-marker="bathroom-doors">
                                            <svg width="16" height="19">
                                                <use xlink:href="img/icons/icons_global.svg#doors" fill="none"></use>
                                            </svg>
                                        </div>

                                        <div class="marker" style="left: 67%; top: 83%;" data-marker="bathroom-baseboard">
                                            <svg width="17" height="17">
                                                <use xlink:href="img/icons/icons_global.svg#baseboard" fill="none"></use>
                                            </svg>
                                        </div>
                                    </div>            
                                </div>
                        
                            </div>
                        </div>

                        <div class="filters-wrap" data-options-type="bathroom">
                            <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
                                <i></i>
                            </button>
                            <div class="filters-bg _tabs active">
                                <div class="filters-title-wrap">
                                    <div class="filters-title upper" data-room-type="bathroom">Санвузол</div>
                                    <div class="sub-links">
                                        <ul> 
                                        </ul>
                                    </div>
                                </div>
                                <div class="filters">
                            
                                </div>

                                <div class="error-text invalid"></div>
                                <div class="filters-button">
                                    <a href="#" class="btn-back js-back">
                                        <svg width="9" height="16">
                                            <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                                        </svg>
                                    </a>
                                     <a href="#" class="btn js-next js-step-validation">Далі</a>
                                </div>
                            </div>
                        </div>

                    
                    </div>
                </div>      

                <div class="js-step step-7 js-step-rooms">
                    <?php include 'template-parts/_banner-form.php'; ?>
                </div>   

                 <input type="hidden" name="rooms_data" id="rooms_data">
                 <input type="hidden" name="total_price">
           </form>        
        </main>
    </div>

    <script type="text/template"  data-template="kitchen" style="display:none">
        <?php include 'template-parts/_options.php'; ?>
    </script>

    <script type="text/template"  data-template="room" style="display:none">
        <?php include 'template-parts/_options-2.php'; ?>
    </script>   
    
        <script type="text/template"  data-template="corridor" style="display:none">
        <?php include 'template-parts/_options-3.php'; ?>
    </script>   

        <script type="text/template"  data-template="bathroom" style="display:none">
        <?php include 'template-parts/_options-4.php'; ?>
    </script>   

    <!-- Popups -->
    <div class="popup-wrapper" id="popups"></div>

    <?php include 'inc/global/_bottom.php'; ?>
    <?php include 'inc/global/_form.php'; ?>
    <!-- Calculator -->
    <?php include 'inc/calculator/_calculator.php'; ?>
</body>

</html>