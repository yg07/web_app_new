window.onload = () => {

    //Заполнение city select
    fetch('categ-load.php')
    .then(responce => responce.json())
    .then(data => {
        let categSel = document.getElementById('categ_sel');
        data.forEach( row => {
            categSel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
        })
    })
    .catch(ex => console.log("category fetch failed: ", ex.statusText));

    //products get
    fetch('prod-load.php')
    .then(responce => responce.json())
    .then(data => {
        let tbl = document.getElementById('prod');
        data.forEach( row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.id}</td>
                            <td>${row.name}</td>
                            <td>${row.price}</td>
                            <td>${row.categ}</td>
                            <td>
                                <button name = 'edit'>Edit</button>
                                <button name = 'del'>Del</button>
                            </td>`;
            tbl.append(tr);
        });
    })
    .catch(ex => console.log("products fetch failed: ", ex.statusText));

    document.getElementById('prod').addEventListener('click',(e) => {
        // console.log(e.target);
        
        //edit products button
        if(e.target.name == 'edit') {
            document.getElementById('p_id').innerHTML = e.target.parentElement.parentElement.firstChild.innerHTML;
            document.getElementById('p_name').value = e.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
            document.getElementById('p_price').value = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.innerHTML;
            let sel = document.getElementById('categ_sel');
            let searchValue = e.target.parentElement.previousElementSibling.innerHTML
            sel.selectedIndex = Array.from(sel.options).reduce((f_index,e,index) => {
                if(e.text == searchValue) return index; 
                else return f_index;
            },0);
        };
    
        //delete products button
        if(e.target.name == 'del') {
            fetch('prod-edit.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'oper=del&id=' + e.target.parentElement.parentElement.firstChild.innerHTML,
            })
            .then(response => {
                if(response.status != 500 ) response.json();
                else {
                    console.log("Rejected!!!");
                    return Promise.reject(response);
                }
            })
            .then(result => {
                console.log(result);
                e.target.parentElement.parentElement.remove();
            })
            .catch( (ex) => {
                alert("Failed!!! " + ex.statusText);
            });
        }
    })

    //Cancel button
    document.getElementById('cancel_but').addEventListener('click', () => {
        document.getElementById('p_id').innerHTML = '###';
        document.getElementById('p_name').value = '';
        document.getElementById('p_price').value = '';
        document.getElementById('categ_sel').selectedIndex = 0;
    })

    //Ok button
    document.getElementById('ok_but').addEventListener('click', () => {

        let prodNew = new Object();
        prodNew.id = Number(document.getElementById('p_id').innerHTML);
        prodNew.name = document.getElementById('p_name').value;
        prodNew.price = document.getElementById('p_price').value;
        prodNew.categ_id = document.getElementById('categ_sel').value;
        if(isNaN(prodNew.id)) prodNew.oper = 'add';
        else prodNew.oper = 'edit';

        if(prodNew.name == '') {
            alert("Должно быть заполнено Наименование продукции!");
            return;
        }

        fetch('prod-edit.php',{
            method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(prodNew).toString(),
            })
            .then(response => response.json())
            .then(data => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${data[0].id}</td>
                                <td>${prodNew.name}</td>
                                <td>${prodNew.price}</td>
                                <td>${document.getElementById('categ_sel').options[document.getElementById('categ_sel').selectedIndex].innerHTML}</td>
                                <td>
                                    <button name = 'edit'>Edit</button>
                                    <button name = 'del'>Del</button>
                                </td>`;
                if(isNaN(prodNew.id)) {
                    document.getElementById('prod').append(tr);
                } else {
                    for(tds of document.querySelectorAll('#prod tr>td:first-child')){
                        if(Number(tds.innerHTML) == prodNew.id) {
                            // alert(`Found! id = ${prodNew.id}, tds.innerHTML = ${tds.innerHTML}`);
                            tds.parentElement.innerHTML=
                                `<td>${prodNew.id}</td>
                                <td>${prodNew.name}</td>
                                <td>${prodNew.price}</td>
                                <td>${document.getElementById('categ_sel').options[document.getElementById('categ_sel').selectedIndex].innerHTML}</td>
                                <td>
                                    <button name = 'edit'>Edit</button>
                                    <button name = 'del'>Del</button>
                                </td>`;
                            break;
                        }
                    }

                }
            })
            .catch( (ex) => {
                alert("Failed!!! " + ex.statusText);
            });
    })
}