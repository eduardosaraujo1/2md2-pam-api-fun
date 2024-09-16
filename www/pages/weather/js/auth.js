function toggleKeyInput(action) {
    const keycontainer = document.getElementById('keyContainer');
    if (action === 'enable') {
        keycontainer.classList.remove('key-container--hide');
    } else if (action === 'disable') {
        keycontainer.classList.add('key-container--hide');
    } else {
        keycontainer.classList.toggle('key-container--hide');
    }
}
window.addEventListener('keydown', (event) => {
    if (['x', 'k'].includes(event.key.toLowerCase()) && event.shiftKey) {
        toggleKeyInput();
    }
});
