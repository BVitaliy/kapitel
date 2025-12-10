<div class="filters-wrap">
    <button class="filters-close active d-none d-lg-flex" data-toggle-more="Розгорнути" data-toggle-less="Згорнути">
        <i></i>
    </button>
    <div class="filters-bg _tabs active">
        <div class="filters-title-wrap">
            <div class="filters-title upper">Кухня</div>
            <div class="sub-links">
                <ul>
                    <li class="_tab-item is-active">1</li>
                    <li class="_tab-item">2</li>
                    <li class="_tab-item">3</li>
                    <li class="_tab-item">4</li>
                </ul>
            </div>
        </div>
        <div class="filters">
            <div class="_tab">
                <?php include 'template-parts/_options.php'; ?>
            </div>
            <div class="_tab">
                <?php include 'template-parts/_options.php'; ?>
            </div>
            <div class="_tab">
                <?php include 'template-parts/_options.php'; ?>
            </div>
            <div class="_tab">
                <?php include 'template-parts/_options.php'; ?>
            </div>            
        </div>
        <div class="filters-button">
            <a href="index.php" class="btn-back">
                <svg width="9" height="16">
                    <use xlink:href="img/icons/icons_global.svg#chevron-left" fill="none"></use>
                </svg>
            </a>
            <a href="rooms-number.php" class="btn">Далі</a>
        </div>
    </div>
</div>