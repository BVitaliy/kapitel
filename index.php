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
            <?php include 'template-parts/_banner-full.php'; ?>
        </main>
    </div>

    <!-- Popups -->
    <div class="popup-wrapper" id="popups"></div>

    <?php include 'inc/global/_bottom.php'; ?>
    <?php include 'inc/global/_form.php'; ?>

</body>

</html>