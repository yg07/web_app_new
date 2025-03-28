window.onload = () => {

    let predprSel = document.getElementById('predpr_sel');
    let orderSel = document.getElementById('order_sel');
    let specTbl = document.getElementById('spec');
    let specId = document.getElementById('spec_id');
    let categSel = document.getElementById('categ_sel');
    let prodSel = document.getElementById('prod_sel');
    let prodPrice = document.getElementById('prod_price');
    let prodKol = document.getElementById('prod_kol');
    let newOrder = document.getElementById('new_order');
    prodKol.value=0;

    predprSel.addEventListener('change', loadOrdersByPredpr );
    document.getElementById('cancel_new_order_but').addEventListener('click', () => {
        newOrder.value = '';
    });
    document.getElementById('ok_new_order_but').addEventListener('click', () => {
        if(newOrder.value != ''){
            fetch('order-edit.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'oper=add&name=' + newOrder.value +
                       '&predpr_id=' + Number(predprSel.options[predprSel.options.selectedIndex].value),
            })
            .then(responce => responce.json())
            .then( data => { 
                newOrder.value = ''
                loadOrdersByPredpr(data[0].id);
            })
            .catch( (ex) => {
                console.log("Failed!!! " + ex.statusText);
            });
        }
    });


    document.getElementById('cancel_but').addEventListener('click',()  => {
        specId.innerHTML = '###';
        prodKol.value = 0;
    })



    //Ok button
    document.getElementById('ok_but').addEventListener('click', () => {

        let specNew = new Object();
        specNew.id = specId.innerHTML;
        specNew.order_id = orderSel.value;
        specNew.prod_id = prodSel.value;
        specNew.prod_kol = prodKol.value;
        if(isNaN(specNew.id)) specNew.oper = 'add';
        else specNew.oper = 'edit';

        fetch('spec-edit.php',{
            method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(specNew).toString(),
            })
            .then(response => response.json())
            .then( res => {
                        if(orderSel.options.selectedIndex != -1){
                            fetch('spec-load-by-order.php',{
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: 'order_id=' + Number(orderSel.options[orderSel.options.selectedIndex].value),
                            })
                            .then(responce => responce.json())
                            .then(data => {
                                specTbl.innerHTML = '';
                                data.forEach( row => {
                                    let tr = document.createElement('tr');
                                    tr.innerHTML = `<td>${row.id}</td>
                                                    <td>${row.prod}</td>
                                                    <td>${row.categ}</td>
                                                    <td>${row.price}</td>
                                                    <td>${row.kol}</td>
                                                    <td>
                                                        <button name = 'edit'>Edit</button>
                                                        <button name = 'del'>Del</button>
                                                    </td>`;
                                    specTbl.append(tr);
                                });
                            });
                        } else {
                            specTbl.innerHTML = '';
                        }
            })
            .catch( (ex) => {
                alert("Failed!!! " + ex.statusText);
            });
    })


    orderSel.addEventListener('change', loadSpecByOrder);
    categSel.addEventListener('change', () => {
        let categ = new Object();
        categ.categ_id = categSel.options[categSel.selectedIndex].value;
        fetch('prod-load-by-categ.php',{
            method: 'POST',
            headers: 
            {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(categ).toString(),
        })
        .then(responce => responce.json())
        .then( data => {
                prodSel.innerHTML= '';
                data.forEach( row => {
                    prodSel.innerHTML += `<option value=${row.id} data-price=${row.price}>${row.name}</options>`;
                });
                prodPrice.innerHTML = prodSel.options[prodSel.selectedIndex].dataset.price;
            }
        )
        .catch(ex => console.log(`Error: ${ex.statusText}`));
    })


    prodSel.addEventListener('change',()=> {
        prodPrice.innerHTML = prodSel.options[prodSel.selectedIndex].dataset.price;
    })





    specTbl.addEventListener('click',(e) => {
        //edit products button
        if(e.target.name == 'edit') {
            specId.innerHTML = e.target.parentElement.parentElement.firstChild.innerHTML;
            let searchValue = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.innerHTML;
            categSel.selectedIndex = Array.from(categSel.options).reduce((notFound,e,index) => {
                                                if(e.text == searchValue) return index; 
                                                else return notFound;
                                                },0);
            let categ = new Object();
            categ.categ_id = categSel.options[categSel.selectedIndex].value;

            fetch('prod-load-by-categ.php',{
                method: 'POST',
                headers: 
                {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(categ).toString(),
            })
            .then(responce => responce.json())
            .then( data => {
                    prodSel.innerHTML= '';
                    data.forEach( row => {
                        prodSel.innerHTML += `<option value=${row.id}>${row.name}</options>`;
                    })
                    searchValue = e.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
                    prodSel.selectedIndex = Array.from(prodSel.options).reduce((notFound,e,index) => {
                                                        if(e.text == searchValue) return index; 
                                                        else return notFound;
                                                        },0);
                }
            )
            .catch(ex => console.log(`Error: ${ex.statusText}`));
            prodPrice.innerHTML = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
            prodKol.value = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
        };
    
        //delete products button
        if(e.target.name == 'del') {
            fetch('spec-edit.php',{
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




    //Заполнение названий счетов
    function loadOrdersByPredpr(selectedOrder) {
        fetch('order-load-by-predpr.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'predpr_id=' + Number(predprSel.options[predprSel.options.selectedIndex].value),
        })
        .then(responce => responce.json())
        .then(data => {
            orderSel.innerHTML='';
            data.forEach( row => {
                orderSel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
            });
            if (typeof selectedOrder !== 'undefined') {
                orderSel.selectedIndex = Array.from(orderSel.options).reduce((f_index,e,index) => {
                    if(e.value == selectedOrder) return index; 
                    else return f_index;
                },0);
            }
            loadSpecByOrder();
        });
    }


    //Заполнение спецификации счета
    function loadSpecByOrder() {
        if(orderSel.options.selectedIndex != -1){
            fetch('spec-load-by-order.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'order_id=' + Number(orderSel.options[orderSel.options.selectedIndex].value),
            })
            .then(responce => responce.json())
            .then(data => {
                specTbl.innerHTML = '';
                data.forEach( row => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = `<td>${row.id}</td>
                                    <td>${row.prod}</td>
                                    <td>${row.categ}</td>
                                    <td>${row.price}</td>
                                    <td>${row.kol}</td>
                                    <td>
                                        <button name = 'edit'>Edit</button>
                                        <button name = 'del'>Del</button>
                                    </td>`;
                    specTbl.append(tr);
                });
            });
        } else {
            specTbl.innerHTML = '';
        }
    }






    //Заполнение predpr select
    fetch('predpr-load.php')
    .then(responce => responce.json())
    .then(data => {
        data.forEach( row => {
            predprSel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
        })
        loadOrdersByPredpr();
    })
    .catch(ex => console.log("fetch failed: ", ex.statusText));



    //Заполнение селектора категорий товаров
    fetch('categ-load.php')
    .then(responce => responce.json())
    .then(data => {
        data.forEach( row => {
            categSel.innerHTML += `<option value=${row.id}>${row.name}</option>`;
        })
        // заполнение наименований товаров
        let categ = new Object();
        categ.categ_id = categSel.options[categSel.selectedIndex].value;
        fetch('prod-load-by-categ.php',{
            method: 'POST',
            headers: 
            {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(categ).toString(),
        })
        .then(responce => responce.json())
        .then( data => {
                prodSel.innerHTML= '';
                data.forEach( row => {
                    prodSel.innerHTML += `<option value=${row.id} data-price=${row.price}>${row.name}</options>`;
                });
                prodPrice.innerHTML = prodSel.options[prodSel.selectedIndex].dataset.price;
            }
        )
    })
    .catch(ex => console.log("fetch failed: ", ex.statusText));
}
