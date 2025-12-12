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
                    <div class="filters-num-row" data-room-type="kitсhen" data-filled-image="img/rooms-map-1.png">
                        <div class="filter-num-cell">1. Кухня</div>
                        <div class="filter-num-cell">
                            <div class="stepper stepper-number">
                                <button class="decr" type="button">-</button>
                                <input value="1" min="1" max="2" readonly="" tabindex="-1">
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
                                <input value="1"  min="1" max="6" readonly="" tabindex="-1">
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
                                <input value="1"  min="1" max="2" readonly="" tabindex="-1">
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
                                <input value="1"  min="1" max="4" readonly="" tabindex="-1">
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
            <a href="index.php" class="btn-back">
                <svg width="9" height="16">
                    <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                </svg>
            </a>
            <a href="kitchen.php" class="btn">Далі</a>
        </div>
    </div>
</div>


 
<!-- {
    kithen:[
        {
            square:"10",
            floor_type:"Паркет",
            ...
        },
        {
            square:"20",
            floor_type:"Вініл",
            ...
        }    
    ],
    room: [
        {
            square:"10",
            ...
        },
        {
            square:"20" ,
            floor_type:"Вініл",
            ...
        } 
    ],
    corridor:[...],
    bathroom:[...],
} -->