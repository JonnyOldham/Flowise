const councils = [
    'Aberdeen City Council',
    'Adur District Council',
    'Allerdale Borough Council',
    'Alnwick District Council',
    'Amber Valley Borough Council',
    'Aylesbury Vale District Council',
    'Barking and Dagenham Borough Council',
    'Barnet Borough Council',
    'Barnsley Metropolitan Borough Council',
    'Birmingham City Council',
    'Blackburn with Darwen Borough Council',
    'Blackpool Council',
    'Bournemouth, Christchurch and Poole Council',
    'Brent Council',
    'Brentwood Borough Council',
    'Bromley Borough Council',
    'Bromsgrove District Council',
    'Broxtowe Borough Council',
    'Buckinghamshire Council',
    'Burnley Borough Council',
    'Bury Metropolitan Borough Council',
    'Cambridge City Council',
    'Canterbury City Council',
    'Cardiff Council',
    'Carlisle City Council',
    'Cheshire East Council',
    'Cheshire West and Chester Council',
    'Chichester District Council',
    'City of London Corporation',
    'Cornwall Council',
    'Coventry City Council',
    'Croydon Borough Council',
    'Dartford Borough Council',
    'Dover District Council',
    'Dudley Metropolitan Borough Council',
    'Durham County Council',
    'Ealing Borough Council',
    'East Cambridgeshire District Council',
    'East Devon District Council',
    'East Hampshire District Council',
    'East Hertfordshire District Council',
    'East Riding of Yorkshire Council',
    'Eastleigh Borough Council',
    'Edinburgh City Council',
    'Eden District Council',
    'Enfield Borough Council',
    'Essex County Council',
    'Gateshead Council',
    'Gloucester City Council',
    'Gloucestershire County Council',
    'Greenwich Borough Council',
    'Hackney Borough Council',
    'Hammersmith and Fulham Borough Council',
    'Harrow Borough Council',
    'Hart District Council',
    'Hastings Borough Council',
    'Havering Borough Council',
    'Herefordshire Council',
    'Hertsmere Borough Council',
    'Hillingdon Borough Council',
    'Hounslow Borough Council',
    'Islington Borough Council',
    'Kensington and Chelsea Borough Council',
    'Kent County Council',
    'Kingston upon Hull City Council',
    'Kingston upon Thames Borough Council',
    'Kirklees Council',
    'Lambeth Borough Council',
    'Lancashire County Council',
    'Leeds City Council',
    'Leicester City Council',
    'Lewisham Borough Council',
    'Lincoln City Council',
    'Liverpool City Council',
    'Luton Borough Council',
    'Maidstone Borough Council',
    'Manchester City Council',
    'Medway Council',
    'Middlesbrough Council',
    'Milton Keynes Council',
    'Newcastle upon Tyne City Council',
    'Newham Borough Council',
    'North East Lincolnshire Council',
    'North Lincolnshire Council',
    'North Somerset Council',
    'North Tyneside Council',
    'Northampton Borough Council',
    'Northumberland County Council',
    'Norwich City Council',
    'Nottingham City Council',
    'Oxford City Council',
    'Portsmouth City Council',
    'Preston City Council',
    'Reading Borough Council',
    'Redbridge Borough Council',
    'Richmond upon Thames Borough Council',
    'Rochdale Borough Council',
    'Rotherham Metropolitan Borough Council',
    'Royal Borough of Kensington and Chelsea',
    'Royal Borough of Windsor and Maidenhead',
    'Royal Borough of Greenwich',
    'Rugby Borough Council',
    'Salford City Council',
    'Sandwell Metropolitan Borough Council',
    'Sheffield City Council',
    'Shropshire Council',
    'Slough Borough Council',
    'Solihull Metropolitan Borough Council',
    'Somerset West and Taunton District Council',
    'South Bucks District Council',
    'South Cambridgeshire District Council',
    'South Gloucestershire Council',
    'South Holland District Council',
    'South Kesteven District Council',
    'South Lanarkshire Council',
    'South Norfolk District Council',
    'South Ribble Borough Council',
    'Southampton City Council',
    'Southend-on-Sea Borough Council',
    'Sutton Borough Council',
    'Swale Borough Council',
    'Swansea Council',
    'Swindon Borough Council',
    'Tameside Metropolitan Borough Council',
    'Tamworth Borough Council',
    'Telford and Wrekin Council',
    'Thanet District Council',
    'Tower Hamlets Borough Council',
    'Trafford Borough Council',
    'Wakefield District Council',
    'Walsall Borough Council',
    'Waltham Forest Borough Council',
    'Wandsworth Borough Council',
    'Warwick District Council',
    'Watford Borough Council',
    'Waverley Borough Council',
    'Wellingborough Borough Council',
    'Windsor and Maidenhead Borough Council',
    'Wirral Council',
    'Woking Borough Council',
    'Wolverhampton City Council',
    'Worcester City Council',
    'York City Council'
]

const searchBox = document.getElementById('searchBox')
const councilList = document.getElementById('councilList')
const councilTitle = document.getElementById('council-title')

// Function to filter and display council names
searchBox.addEventListener('focus', () => {
    searchBox.placeholder = 'Start typing...'
})

searchBox.addEventListener('input', () => {
    const query = searchBox.value.trim()
    councilList.innerHTML = ''

    if (query.length > 0) {
        councils.forEach((council) => {
            if (council.toLowerCase().includes(query.toLowerCase())) {
                const listItem = document.createElement('li')
                listItem.textContent = council

                listItem.addEventListener('click', () => {
                    searchBox.value = council
                    councilList.innerHTML = ''
                    councilList.style.display = 'none'
                    councilTitle.textContent = council
                })

                councilList.appendChild(listItem)
            }
        })

        councilList.style.display = 'block'
    } else {
        councilList.style.display = 'none'
    }
})

// Filter council names as user types
searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase()
    const filteredCouncils = councils.filter((council) => council.toLowerCase().startsWith(query))

    councilList.innerHTML = ''

    filteredCouncils.forEach((council) => {
        const listItem = document.createElement('li')
        listItem.textContent = council
        listItem.addEventListener('click', () => {
            searchBox.value = council
            councilList.innerHTML = ''
            councilList.style.display = 'none'
            councilTitle.textContent = council
        })
        councilList.appendChild(listItem)
    })

    councilList.style.display = filteredCouncils.length > 0 ? 'block' : 'none'
})

// Hide the list when clicking outside
document.addEventListener('click', (event) => {
    if (!searchBox.contains(event.target) && !councilList.contains(event.target)) {
        councilList.style.display = 'none'
        searchBox.placeholder = 'Select Council'
    }
})

// Remove current council on Search Box click
searchBox.addEventListener('click', () => {
    searchBox.value = ''
})
