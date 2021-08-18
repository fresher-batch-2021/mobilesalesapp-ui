const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []
getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('products.json')

    const { results } = await res.json()

    // Clear result
    result.innerHTML = ''
    //show results
    results.forEach(user => {
        const li = document.createElement('li')

        listItems.push(li)

        li.innerHTML = `
            <img src="${user.brand.details.imageUrl}" alt="${user.brand}">
            <div class="user-info">
                <h4>${user.brand}</h4>
                <h5>${user.brand.details.modelName}</h5>
                <p>${user.brand.details.ram}, ${user.brand.details.modelPrice}</p>
                <h5>${user.brand.details.modelConfiguration}</a></h5>
            </div>
        `

        result.appendChild(li)
    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
