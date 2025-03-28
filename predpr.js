window.onload = () => {

    fetch('predpr-load.php')
    .then(responce => responce.json())
    .then(data => {
        let predpr = document.getElementById('predpr');
        data.forEach( row => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.id}</td>
                            <td>${row.name}</td>
                            <td>${row.address}</td>
                            <td>
                                <button name = 'edit'>Edit</button>
                                <button name = 'del'>Del</button>
                            </td>`;
            predpr.append(tr);
        })
    })
    .catch(ex => console.log("predpr fetch failed: ", ex.statusText));

    document.getElementById('predpr').addEventListener('click',(e) => {
        
        if(e.target.name == 'edit') {
            document.getElementById('pr_id').innerHTML = e.target.parentElement.parentElement.firstChild.innerHTML;
            document.getElementById('pr_name').value = e.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
            document.getElementById('pr_address').value = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.innerHTML;
        };
    
        if(e.target.name == 'del') {
            fetch('predpr-edit.php',{
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
        document.getElementById('pr_id').innerHTML = '###';
        document.getElementById('pr_name').value = '';
        document.getElementById('pr_address').value = '';
    })

    //Ok button
    document.getElementById('ok_but').addEventListener('click', () => {

        let predprNew = new Object();
        predprNew.id = Number(document.getElementById('pr_id').innerHTML);
        predprNew.name = document.getElementById('pr_name').value;
        predprNew.address = document.getElementById('pr_address').value;
        if(isNaN(predprNew.id)) predprNew.oper = 'add';
        else predprNew.oper = 'edit';

        if(predprNew.name == '') {
            alert("Должно быть заполнено Наименование категории!");
            return;
        }

        fetch('predpr-edit.php',{
            method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(predprNew).toString(),
            })
            .then(response => response.json())
            .then(data => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${data[0].id}</td>
                                <td>${predprNew.name}</td>
                                <td>${predprNew.address}</td>
                                <td>
                                    <button name = 'edit'>Edit</button>
                                    <button name = 'del'>Del</button>
                                </td>`;
                if(isNaN(predprNew.id)) {
                    document.getElementById('predpr').append(tr);
                } else {
                    for(tds of document.querySelectorAll('#predpr tr>td:first-child')){
                        if(Number(tds.innerHTML) == predprNew.id) {
                            // alert(`Found! id = ${predprNew.id}, tds.innerHTML = ${tds.innerHTML}`);
                            tds.parentElement.innerHTML=
                                `<td>${predprNew.id}</td>
                                <td>${predprNew.name}</td>
                                <td>${predprNew.address}</td>
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