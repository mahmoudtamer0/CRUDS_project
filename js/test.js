let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let tax = document.getElementById('tax');
let disc = document.getElementById('disc');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categ = document.getElementById('categ');
let creat = document.getElementById('creat');
let mood = 'creat';
let tmp;
let search = document.getElementById('search')
let bytitle = document.getElementById('bytitle')
let bycateg = document.getElementById('bycateg')

function getTotal() {
    if (price.value != "") {
        let resulte = (+price.value + +ads.value + +tax.value) - +disc.value
        total.innerHTML = resulte
        total.style.backgroundColor = '#1dbb09'
    } else {
        total.innerHTML = ""
        total.style.backgroundColor = '#c52222'
    }
}
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

function creatproduct() {
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        tax: tax.value,
        disc: disc.value,
        total: total.innerHTML,
        count: count.value,
        categ: categ.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && categ.value != '') {
        if (mood === 'creat') {
            if (newProd.count > 1) {
                for (let i = 0; i < newProd.count; i++) {
                    datapro.push(newProd)
                }
            } else {
                datapro.push(newProd)
            }
        } else {
            datapro[tmp] = newProd;
            mood = 'creat';
            creat.innerHTML = 'Creat';
            count.style.display = 'block';
        }
        deletInputs()
    }
    localStorage.setItem('product', JSON.stringify(datapro))
    readData()
}

function deletInputs() {
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    disc.value = '';
    total.innerHTML = '';
    count.value = '';
    categ.value = '';
};

function readData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td class="td-del">${datapro[i].price}</td>
            <td class="td-del">${datapro[i].ads}</td>
            <td class="td-del">${datapro[i].tax}</td>
            <td class="td-del">${datapro[i].disc}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].categ}</td>
            <td><button id="update" onclick="updatData(${i})">Update</button></td>
            <td><button id="delete" onclick="deletData(${i})">Delete</button></td>
        <tr>
        `
    };

    document.getElementById('tbody').innerHTML = table;
    let btndelet = document.getElementById('delet');
    if (datapro.length > 0) {
        btndelet.innerHTML = `
        <button onclick="deletAll()">Delete all (${datapro.length})</button>
        `
    } else {
        btndelet.innerHTML = ''
    }
    getTotal()
};
readData()

function deletData(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    readData()
}
function deletAll() {
    datapro.splice(0)
    localStorage.clear()
    readData()
}

function updatData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    tax.value = datapro[i].tax;
    disc.value = datapro[i].disc;
    categ.value = datapro[i].categ;
    count.style.display = 'none';
    creat.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
    })
    getTotal()
}
let searchmode = 'title'
function searchMode(id) {
    let search = document.getElementById('search')
    if (id == 'bytitle') {
        searchmode = 'title';
        search.placeholder = 'Search by Title';
    } else {
        searchmode = 'categ';
        search.placeholder = 'Search by Category';
    }
    search.focus();
    search.value = "";
    readData()
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmode == 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {

                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td class="td-del">${datapro[i].price}</td>
            <td class="td-del">${datapro[i].ads}</td>
            <td class="td-del">${datapro[i].tax}</td>
            <td class="td-del">${datapro[i].disc}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].categ}</td>
            <td><button id="update" onclick="updatData(${i})">Update</button></td>
            <td><button id="delete" onclick="deletData(${i})">Delete</button></td>
        <tr>
        `
            }
        } else {
            for (let i = 0; i < datapro.length; i++) {
                if (datapro[i].categ.includes(value)) {

                    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td class="td-del">${datapro[i].price}</td>
            <td class="td-del">${datapro[i].ads}</td>
            <td class="td-del">${datapro[i].tax}</td>
            <td class="td-del">${datapro[i].disc}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].categ}</td>
            <td><button id="update" onclick="updatData(${i})">Update</button></td>
            <td><button id="delete" onclick="deletData(${i})">Delete</button></td>
        <tr>
        `
                }
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}