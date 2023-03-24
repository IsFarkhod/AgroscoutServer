
function updateDrone() {
    fetch('../server/index.js').then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                products = json
                initialize()
            });
        } else {
            console.log('error')
        }
    })
}