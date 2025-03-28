<!DOCTYPE html>
<html lang="ru-ru">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="predpr.js"></script>
        <title>Контрагенты</title>
    </head>
    <body>
        <?php
        $title = 'Контрагенты';
        require_once('header.php');
        ?>
        <main>
            <section class="infosite">
            <div>
                    <table class="edit_fields">
                        <tr>
                            <td id = "pr_id">###</td>
                            <td><input type="text" id="pr_name" size = 45 placeholder="Наименование контрагента"></td>
                            <td><input type="text" id="pr_address" size = 45 placeholder="Адрес контрагента"></td>
                            <td>
                                <button id="ok_but">&#10003;</button>
                                <button id="cancel_but">&#10007;</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <br />
                <div><table id="predpr"></table></div>
            </section>
        </main>
        <?php require_once('footer.php');?>
    </body>
</html>

