const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
const updateModal = document.getElementById('updateModal');
const deleteModal = document.getElementById('deleteModal');
const detailModal = document.getElementById('detailModal');

let currentProductId = null;

// Fetch all products
function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            productTable.innerHTML = '';
            products.forEach(product => {
                const row = productTable.insertRow();
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>
                        <button class="view-btn" data-id="${product._id}">View</button>
                        <button class="edit-btn" data-id="${product._id}">Edit</button>
                        <button class="delete-btn" data-id="${product._id}">Delete</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Create or update product
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const product = {
        name: document.getElementById('name').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };

    if (id) {
        // Update
        currentProductId = id;
        updateModal.style.display = 'block';
    } else {
        // Create
        createProduct(product);
    }
});

function createProduct(product) {
    fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts();
        productForm.reset();
    })
    .catch(error => console.error('Error:', error));
}

function updateProduct(id, product) {
    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts();
        productForm.reset();
        document.getElementById('productId').value = '';
        updateModal.style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            fetchProducts();
            deleteModal.style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
}

// View product details
function viewProductDetails(id) {
    fetch(`/api/products/${id}`)
        .then(response => response.json())
        .then(product => {
            const details = `
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
                <p><strong>Price:</strong> ${product.price}</p>
            `;
            document.getElementById('productDetails').innerHTML = details;
            detailModal.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

// Event listeners for table actions
productTable.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    if (e.target.classList.contains('edit-btn')) {
        fetch(`/api/products/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('productId').value = product._id;
                document.getElementById('name').value = product.name;
                document.getElementById('quantity').value = product.quantity;
                document.getElementById('price').value = product.price;
            })
            .catch(error => console.error('Error:', error));
    } else if (e.target.classList.contains('delete-btn')) {
        currentProductId = id;
        deleteModal.style.display = 'block';
    } else if (e.target.classList.contains('view-btn')) {
        viewProductDetails(id);
    }
});

// Confirm update
document.getElementById('confirmUpdate').addEventListener('click', () => {
    const product = {
        name: document.getElementById('name').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };
    updateProduct(currentProductId, product);
});

// Cancel update
document.getElementById('cancelUpdate').addEventListener('click', () => {
    updateModal.style.display = 'none';
});

// Confirm delete
document.getElementById('confirmDelete').addEventListener('click', () => {
    deleteProduct(currentProductId);
});

// Cancel delete
document.getElementById('cancelDelete').addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

// Close detail modal
document.getElementById('closeDetail').addEventListener('click', () => {
    detailModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target == updateModal) {
        updateModal.style.display = 'none';
    }
    if (e.target == deleteModal) {
        deleteModal.style.display = 'none';
    }
    if (e.target == detailModal) {
        detailModal.style.display = 'none';
    }
});

// Initial fetch
fetchProducts();