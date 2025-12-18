<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/global/_top.php';?>
    <title>Template :: 404</title>
</head>

<body>
    <div id="content-block">
        <?php include 'inc/global/_header.php';?>

        <main>
            <!-- 404 ( type 1 ) -->
            <div class="section page-404">
                <div class="container">
                    <div class="row gy-sm justify-content-center align-items-center">
                        <div class="page-404-img col-xl-4 col-md-5 col-10">
                            <img width="528" height="528" src="img/404.svg" alt="" loading="lazy">
                        </div>
                        <div class="page-404-inner col-xl-5 col-lg-6 offset-lg-1 col-md-7">
                            <h1 class="title h4">Сторінку не знайдено</h1>
                            <div class="text">
                                Сторінку, яку ви шукаєте, не знайдено. Будь ласка, поверніться на головну сторінку.
                            </div>
                            <a class="btn" href="index.php">На головну</a>
                        </div>
                    </div>
                </div>
            </div>
 
        </main>
 
    </div>

    <!-- Popups -->
    <div class="popup-wrapper" id="popups"></div>
    <?php include 'inc/global/_bottom.php';?>
    <?php include 'inc/global/_form.php';?>
</body>

</html>