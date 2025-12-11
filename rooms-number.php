<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/global/_top.php'; ?>
    <title>Kapitel :: Кількість приміщень</title>
</head>

<body>
    <div id="content-block">
        <?php
        $item_class_1 = 'filled';
        $item_class_2 = 'current';
        include 'inc/global/_header.php'; ?>

        <main>
            <div class="section section-calculator">
                <form action="" id="main-form"> 
                    <?php include 'template-parts/_stepper.php'; ?>

                    <?php include 'template-parts/_rooms-map.php'; ?>

                    <?php include 'template-parts/_filters.php'; ?>
                    
                    <input type="hidden" name="rooms_data" id="rooms_data">
                </form>

            </div>
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