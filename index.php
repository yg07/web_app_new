<!DOCTYPE html>
<html lang="ru-ru">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="spec.js"></script>
        <title>Спецификация</title>
    </head>
    <body>
    <?php 
    $title = 'Спецификация';
    require_once('header.php');
    ?>
        <main>
            <section class="infosite">
                <div>
                    <table class="edit_fields">
                        <tr>
                            <td><select id="predpr_sel" style="width:500px"></select></td>
                            <td><select id="order_sel" style="width:500px"></select></td>
                            <td><input id="new_order" type="text" size = 45 placeholder="Наименование нового счета"></td>
                            <td>
                                <button id="ok_new_order_but">&#10003;</button>
                                <button id="cancel_new_order_but">&#10007;</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table class="edit_fields">
                        <tr>
                            <th></th>
                            <th>Категория товара</th>
                            <th>Наименование товара</th>
                            <th>Цена</th>
                            <th>Количество</th>
                        </tr>
                        <tr>
                            <td id = "spec_id">###</td>
                            <td><select id="categ_sel" style="width:500px"></select></td>
                            <td><select id="prod_sel" style="width:500px"></select></td>
                            <td><span id="prod_price" style="width:100px"></span></td>
                            <td><input id="prod_kol" type="number" min=1 ></td>
                            <td>
                                <button id="ok_but">&#10003;</button>
                                <button id="cancel_but">&#10007;</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div><table id="spec"></table></div>
                <table><tr><td>Сумма:</td><td id="itog"></td></tr></table>
            </section>
        </main>
        <?php require_once('footer.php');?>
    </body>
</html>

