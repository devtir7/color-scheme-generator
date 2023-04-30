const colorFormEl = document.getElementById('color-scheme-form')

colorFormEl.addEventListener("submit", function(e) {
    e.preventDefault()

    const seedColor = document.getElementById('seed-color').value.replace('#', '')
    const colorScheme = document.getElementById('color-scheme-selector').value

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorScheme}`)
    .then (res => res.json())
    .then(data => displayColors(data))
    // .then(data => console.log(data))
})

function displayColors(receivedColors) {
    const colorContainerEl = document.getElementById('color-container')

    colorContainerEl.innerHTML = ''
    
    for (let i=0; i<receivedColors.colors.length; i++) {
        
        colorContainerEl.innerHTML += `
                        <div class="color-scheme-column" id='col-${i}'">
                            <p class="hex-values-display">${receivedColors.colors[i].hex.value}</p>
                        </div>
                        `

        document.getElementById(`col-${i}`).style.background = receivedColors.colors[i].hex.value
    }
}

document.getElementById('color-container').addEventListener('click', function(e) { 
    if (e.target) {
        if (e.target.tagName == "P") {
            copyToClipboard(e.target.innerHTML)
        }
    }
})

function copyToClipboard(value) {
    navigator.clipboard.writeText(value)
    alert(value + ' copied to clipboard!')
}