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
            <form action="" id="main-form"> 
                <div class="js-step step-1 active">
                    <?php include 'template-parts/_banner-full.php'; ?>
                </div>
                <div class="js-step step-2">
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
                                                        <input type="number" value="" min="1" max="999" class="input">
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
                                                        <input type="number" value="" min="1" max="999" class="input">
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
                                                        <input type="number" value="" min="1" max="999" class="input">
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
                                                        <input type="number" value="" min="1" max="999" class="input">
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
                <div class="js-step step-3">
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
                 <input type="hidden" name="rooms_data" id="rooms_data">
           </form>        
        </main>
    </div>

    <!-- Popups -->
    <div class="popup-wrapper" id="popups"></div>

    <?php include 'inc/global/_bottom.php'; ?>
    <?php include 'inc/global/_form.php'; ?>
    <!-- Calculator -->
    <?php include 'inc/calculator/_calculator.php'; ?>
</body>

</html>