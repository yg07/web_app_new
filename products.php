<!DOCTYPE html>
<html lang="ru-ru">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="prod.js"></script>
        <title>Продукция</title>
    </head>
    <body>
    <?php
    $title = 'Продукция';
    require_once('header.php');
    ?>
        <main>
            <section class="infosite">
                    <div>
                        <table class="edit_fields">
                            <tr>
                                <td id = "p_id">###</td>
                                <td><input type="text" id="p_name" size = 45 placeholder="Наименование продукции"></td>
                                <td><input type="number" step=".01" id="p_price" placeholder="Цена"></td>
                                <td><select id="categ_sel"></select></td>
                                <td>
                                    <button id="ok_but">&#10003;</button>
                                    <button id="cancel_but">&#10007;</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br />
                    <div><table id="prod"></table></div>
            </section>
        </main>
    <?php require_once('footer.php');?>
    </body>
</html>

