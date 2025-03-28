<!DOCTYPE html>
<html lang="ru-ru">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="categ.js"></script>
        <title>Категории</title>
    </head>
    <body>
    <?php
    $title = 'Категории продукции';
    require_once('header.php');
    ?>
        <main>
            <section class="infosite">
                <div>
                    <table class="edit_fields">
                        <tr>
                            <td id = "c_id">###</td>
                            <td><input type="text" id="c_name" size = 45 placeholder="Наименование категории"></td>
                            <td>
                                <button id="ok_but">&#10003;</button>
                                <button id="cancel_but">&#10007;</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <br />
                <div><table id="categ"></table></div>
            </section>
        </main>
    <?php require_once('footer.php');?>
    </body>
</html>

