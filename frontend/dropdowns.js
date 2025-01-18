document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
    const dropdownOptions = dropdown.querySelectorAll('.dropdown-option')
    const hiddenInput = dropdown.querySelector('input[type="hidden"]')

    dropdown.addEventListener('click', (event) => {
        document.querySelectorAll('.custom-dropdown').forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('open')
            }
        })
        dropdown.classList.toggle('open')
    })

    dropdownOptions.forEach((option) => {
        option.addEventListener('click', (event) => {
            const value = option.getAttribute('data-value')
            hiddenInput.value = value
            dropdown.classList.remove('open')
        })
    })
})

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
    document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('open')
        }
    })
})
