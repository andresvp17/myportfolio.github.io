const flagsElement = document.getElementById('flags')
const colorElements = document.querySelectorAll('[data-color]')
const colorsContainer = document.getElementById('colors-container')
const themeIcon = document.getElementById('theme-icon')
const themeText = document.getElementById('theme-text')
const theme = document.getElementById('theme')
const rootSheet = document.documentElement.style

const chnageLanguage = async language => {
    const requestJSON = await fetch(`./languages/${language}.json`)
    const response = await requestJSON.json()
    const textsToChange = document.querySelectorAll('[data-section]')

    for(let textToChange of textsToChange){
        const section = textToChange.dataset.section
        const value = textToChange.dataset.value

        textToChange.innerHTML = response[section][value]
    }
}

const putColors = () => {
    colorElements.forEach(element => {
        element.style.backgroundColor = element.dataset.color
    })
}

putColors()

flagsElement.addEventListener('click', e => {
    if(e.target.classList.contains('flags')) return
    chnageLanguage(e.target.parentElement.dataset.language)
})

colorsContainer.addEventListener('click', e => {
    if(!e.target.classList.contains('color-item')) return
    rootSheet.setProperty('--primary-color', e.target.dataset.color) 
})

theme.addEventListener('click', e => {
    if(document.body.classList.contains('light')){
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        themeIcon.src = '/assets/moon-solid.svg'
        themeText.textContent = 'Dark Mode'
        rootSheet.setProperty('--header-bg', '#2c2c2c')
        rootSheet.setProperty('--light-theme-bs-one', '#00000081')
        rootSheet.setProperty('--light-theme-bs-two', '#52525280')
        rootSheet.setProperty('--inset-bs', '#02020280')
        rootSheet.setProperty('--icon-bow', 'invert(.8)')
    } else {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        themeIcon.src = '/assets/sun-solid.svg'
        themeText.textContent = 'Light Mode'
        rootSheet.setProperty('--header-bg', '#f0eeef')
        rootSheet.setProperty('--light-theme-bs-one', '#f1f1f181')
        rootSheet.setProperty('--light-theme-bs-two', '#79797980')
        rootSheet.setProperty('--inset-bs', '#79797980')
        rootSheet.setProperty('--icon-bow', 'invert(0)')
    }
}) 