window.onload = () => {

    fetch('categ-load.php')
    .then(responce => responce.json())
    .then(data => {
        let categ = document.getElementById('categ');
        data.forEach( row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.id}</td>
                            <td>${row.name}</td>
                            <td>
                                <button name = 'edit'>Edit</button>
                                <button name = 'del'>Del</button>
                            </td>`;
            categ.append(tr);
        })
    })
    .catch(ex => console.log("category fetch failed: ", ex));

    document.getElementById('categ').addEventListener('click',(e) => {
        
        if(e.target.name == 'edit') {
            document.getElementById('c_id').innerHTML = e.target.parentElement.parentElement.firstChild.innerHTML;
            document.getElementById('c_name').value = e.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
        };
    
        if(e.target.name == 'del') {
            fetch('categ-edit.php',{
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
                // console.log(result);
                e.target.parentElement.parentElement.remove();
            })
            .catch( (ex) => {
                alert("Failed!!! " + ex.statusText);
            });
        }
    })

    //Cancel button
    document.getElementById('cancel_but').addEventListener('click', () => {
        document.getElementById('c_id').innerHTML = '###';
        document.getElementById('c_name').value = '';
    })

    //Ok button
    document.getElementById('ok_but').addEventListener('click', () => {

        let categNew = new Object();
        categNew.id = Number(document.getElementById('c_id').innerHTML);
        categNew.name = document.getElementById('c_name').value;
        if(isNaN(categNew.id)) categNew.oper = 'add';
        else categNew.oper = 'edit';

        if(categNew.name == '') {
            alert("Должно быть заполнено Наименование категории!");
            return;
        }

        fetch('categ-edit.php',{
            method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(categNew).toString(),
            })
            .then(response => response.json())
            .then(data => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${data[0].id}</td>
                                <td>${categNew.name}</td>
                                <td>
                                    <button name = 'edit'>Edit</button>
                                    <button name = 'del'>Del</button>
                                </td>`;
                if(isNaN(categNew.id)) {
                    document.getElementById('categ').append(tr);
                } else {
                    for(tds of document.querySelectorAll('#categ tr>td:first-child')){
                        if(Number(tds.innerHTML) == categNew.id) {
                            // alert(`Found! id = ${categNew.id}, tds.innerHTML = ${tds.innerHTML}`);
                            tds.parentElement.innerHTML=
                                `<td>${categNew.id}</td>
                                <td>${categNew.name}</td>
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