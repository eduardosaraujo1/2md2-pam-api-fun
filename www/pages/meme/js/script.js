function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function buildCard(memeName, textData) {
    const url = new URL('https://apimeme.com/meme');
    url.searchParams.append('meme', memeName);
    url.searchParams.append('top', textData?.top ?? '');
    url.searchParams.append('bottom', textData?.bottom ?? '');
    const endpoint = url.toString();
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
          <img src="${endpoint}" alt="meme" class="meme-image" />
                    <span class="meme-label">${memeName}</span>
    `;
    const memeContainer = document.querySelector('.memes');
    memeContainer.appendChild(card);
}

function generate(textData, limit, offset) {
    if (!limit) limit = 15;
    if (!offset) offset = 0;

    let newMemes = memes.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    clearCards();
    newMemes.forEach((m) => buildCard(m, textData));
}

function clearCards() {
    document.querySelector('.memes').innerHTML = '';
}

function memeGenerate() {
    const textData = {
        top: document.querySelector('#top').value,

        bottom: document.querySelector('#bottom').value,
    };
    const limit = document.querySelector('#limit').value;
    const offset = document.querySelector('#offset').value;
    generate(textData, limit, offset);
}

let mgd = debounce(memeGenerate, 300);
document.querySelectorAll('input').forEach((i) => {
    i.addEventListener('input', mgd);
});

mgd();