<!DOCTYPE html>
<html>

<head>
    <?php include 'inc/global/_top.php';?>
    <link href="css/vendors/bootstrap-grid.css" rel="stylesheet" type="text/css">
    <title>All Links</title>
</head>

<body>
    <div id="content-block">
        <div class="container" style="margin-block: var(--sp-sm)">
            <div class="row" style="--bs-gutter-y: 2rem;">

                <?php
                    $text = "$_SERVER[SCRIPT_FILENAME]";
                    $serverName = $_SERVER['SERVER_NAME'];
                    $parts = explode("/", $text);
                    $name = $parts[count($parts) - 2];
                    $dirName = $parts[count($parts) - 3];

                    echo '<div class="col-md-3 col-sm-6"><a href="http://'.$serverName.'/'.$dirName.'/'.$name.'/'.$name.'.zip" download="'.$name.'.zip"><strong>'.$name.'.zip</strong></a></div>';
                ?>

                <?php
                function firstFilter($file){
                  return (preg_match_all('/(.*?)\.php/',$file,$q))&&(strpos($file, '_') != 1) && (strpos($file, 'links.php') === false);
                }
                function withHeader($file){
                  return strpos($file, '__') != false;
                }
                function withoutHeader($file){
                  return strpos($file, '__') == false;
                }
                
                $files = scandir('.');
                $currentServer = "http://$_SERVER[SERVER_NAME]";
                $currentDir = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
                $currentLink = $currentServer . $currentDir;

                $files = array_filter($files, "firstFilter");
                $filesWithHeader = array_filter($files, "withHeader");
                $filesWithoutHeader = array_filter($files, "withoutHeader");
                $prevHeader ="";

                foreach($filesWithHeader as $file){
                    $header = substr($file, 0, strpos($file, '__'));
                  
                    if($prevHeader!=$header){
                    echo '<div class="col-md-3 col-sm-6 text" style="--text-space: .25rem;">';
                    echo '  <h4 class="title">'.$header.'</h4>';

                    echo "  <ol>";
                    foreach($filesWithHeader as $file){
                        $fileName = substr($file, 0, strpos($file, '__'));

                        if ($header == $fileName) {
                            echo '<li><a href="'.$currentDir.'/'.$file.'" target="_blank">'.$file.'</a></li>';
                        }
                    }
                    echo "  </ol>";
                    echo "</div>";
                    
                    $prevHeader=$header;
                    }
                }
                

                echo '<div class="col-md-3 col-sm-6 text" style="--text-space: .25rem;">';
                echo '  <h4 class="title">other</h4>';
                echo '   <ol>';
                foreach($filesWithoutHeader as $file){
                    echo '  <li><a href="'.$currentDir.'/'.$file.'" target="_blank">'.$file.'</a></li>';
                }
                echo '  </ol>';
                echo '</div>';
                ?>

            </div>
        </div>
    </div>
</body>

</html>