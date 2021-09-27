let db;

// Create new database request
const request = indexedDB.open('budgetDB', 1);

// On upgrade needed
request.onupgradeneeded = function(event) {

    db = event.target.result;

    let objectStore = db.createObjectStore('pending', { 
        keyPath: 'id', 
        autoIncrement: true 
    });
};

// On success
request.onsuccess = function(event) {

    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

// On error
request.onerror = function(event) {

    console.log(`Error: ${event.target.errorCode}`);
};

// Called when connection detected
function checkDatabase() {

    // Access pending transactions
    const transaction = db.transaction(['pending'], 'readwrite');
    const pending = transaction.objectStore('pending');
    const getPending = pending.getAll();

    // If pending transactions exist, post to DB
    getPending.onsuccess = function() {

        if (getPending.result.length > 0) {

            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getPending.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })

            .then(response => response.json())
            
            .then(() => {

                // Clear pending transactions
                const transaction = db.transaction(['pending'], 'readwrite');
                const pending = transaction.objectStore('pending');
                pending.clear();
            })
        }
    }

};

// Store transaction if no connection is detected
function saveRecord(record) {

    // Access pending transactions
    const transaction = db.transaction(['pending'], 'readwrite');
    const pending = transaction.objectStore('pending');

    // Add a record
    pending.add(record);
};
