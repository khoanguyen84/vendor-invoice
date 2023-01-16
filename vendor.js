class Vendor {
    constructor(id, item, quantity, price) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.amount = this.price * this.quantity;
    }
}

var invoices = [];

const key = "invoice_data";

function initData() {
    if (localStorage.getItem(key) == null) {
        invoices = [
            new Vendor(1, "iPhone 14 Pro Max", 1, 30000000),
            new Vendor(2, "iPhone 13", 3, 15000000),
            new Vendor(3, "Latop Dell", 2, 18000000),
            new Vendor(4, "Apple Watch", 4, 7500000),
            new Vendor(5, "Mac Book", 2, 33000000),
        ]
        localStorage.setItem(key, JSON.stringify(invoices));
    }
    else{
        invoices = JSON.parse(localStorage.getItem(key));
    }
}

function renderVendorInvoice() {
    let tbVendor = document.getElementById('tbVendor');
    let totalAmount = 0;
    tbVendor.innerHTML = "";
    for (let i = 0; i < invoices.length; i++) {
        tbVendor.innerHTML += `
            <tr>
                <td>${invoices[i].id}</td>
                <td>${invoices[i].item}</td>
                <td class="text-right">${invoices[i].quantity}</td>
                <td class="text-right">${formatCurrency(invoices[i].price)}</td>
                <td class="text-right">${formatCurrency(invoices[i].amount)}</td>
                <td class="text-center">
                    <button class="btn btn-danger" onclick="removeVendor(${invoices[i].id})">Delete</button>
                    <button class="btn btn-dark" onclick="editVendor(${invoices[i].id})" >Edit</button>
                </td>
            </tr>
        `;
        totalAmount += invoices[i].amount;
    }
    document.getElementById('subtotal').innerText = formatCurrency(totalAmount);
    document.getElementById('total').innerText = formatCurrency(totalAmount);
}

function formatCurrency(number) {
    return number.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' });
}

function createVendor() {
    let item = document.getElementById("item").value;
    let quantity = Number(document.getElementById("quantity").value);
    let price = Number(document.getElementById("price").value);
    if (item == "" || quantity == "" || price == "") {
        alert('You need provide full data!');
    }
    else {
        let id = findMaxId() + 1;
        let vendor = new Vendor(id, item, quantity, price);

        invoices.push(vendor);

        localStorage.setItem(key, JSON.stringify(invoices));

        renderVendorInvoice();

        clearForm();
    }
}

function clearForm() {
    document.getElementById("item").value = null;
    document.getElementById("quantity").value = null;
    document.getElementById("price").value = null;

    document.getElementById('btnCreate').classList.remove("d-none");
    document.getElementById('btnSave').classList.add("d-none");
    document.getElementById('btnCancel').classList.add("d-none");
}

function findMaxId() {
    let max = 0;
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].id > max) {
            max = invoices[i].id
        }
    }
    return max;
}

function removeVendor(id) {
    let confirm = window.confirm('Are you sure to remove this vendor?');
    if (confirm == true) {
        invoices = invoices.filter(function (vendor) {
            return vendor.id != id;
        })
        localStorage.setItem(key, JSON.stringify(invoices));
        renderVendorInvoice();
    }
}

function editVendor(id) {
    let vendor = findVendorById(id);

    document.getElementById("item").value = vendor.item;
    document.getElementById("quantity").value = vendor.quantity;
    document.getElementById("price").value = vendor.price;
    document.getElementById("vendorId").value = vendor.id;

    document.getElementById('btnCreate').classList.add("d-none");
    document.getElementById('btnSave').classList.remove("d-none");
    document.getElementById('btnCancel').classList.remove("d-none");
}

function findVendorById(id) {
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].id == id) {
            return invoices[i];
        }
    }
    return null;
}

function cancel() {
    clearForm();
}

function save() {
    let item = document.getElementById("item").value;
    let quantity = Number(document.getElementById("quantity").value);
    let price = Number(document.getElementById("price").value);
    let id = Number(document.getElementById("vendorId").value);
    if (item == "" || quantity == "" || price == "") {
        alert('You need provide full data!');
    }
    else {
        let vendor = findVendorById(id);
        vendor.item = item;
        vendor.price = price;
        vendor.quantity = quantity;
        vendor.amount = price * quantity;

        localStorage.setItem(key, JSON.stringify(invoices));
        renderVendorInvoice();
        clearForm();
    }
}

function ready() {
    initData();
    renderVendorInvoice();
}

ready();