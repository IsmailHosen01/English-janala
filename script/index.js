const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn bg-[#EDF7FF] mr-3">${el}</span>`);
    return (htmlElements.join(" "));
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)    // promise of response
        .then(res => res.json())    // promise of json data
        .then(data => displayLessons(data.data));
};

const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const lessonBtns = document.getElementsByClassName('lesson-btns');
            for (const btn of lessonBtns) {
                btn.classList.remove('text-white', 'bg-[#422AD5]');
            }
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('text-white', 'bg-[#422AD5]')
            displayLevelWords(data.data);
        });
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const detail = await res.json();
    displayWordDetails(detail.data);
}


const displayWordDetails = (wordDetails) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div>
            <h3 class=" text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetails.pronunciation})</h3>
        </div>
        <div>
            <h3 class="font-bold mb-3">Meaning</h3>
            <p class="font-bangla">${wordDetails.meaning}</p>
        </div>
        <div>
            <h3 class="font-bold mb-3">Example</h3>
            <p>${wordDetails.sentence}</p>
        </div>
        <div>
            <h3 class="font-bold mb-3">Synonyms</h3>
            <div>${createElement(wordDetails.synonyms)}</div>
        </div>
    
    `

    document.getElementById('word_modal').showModal();


}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = ``;

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-10 space-y-4">
            <img class=" mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-[#79716B] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-medium">পরের Lesson এ যান</h2>
        </div>
        `
        manageSpinner(false);
        return;
    }

    for (const word of words) {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
        <div class=" bg-white p-10 text-center shadow-sm rounded-lg h-full">
            <h3 class=" text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
            <p class=" font-medium my-5">Meaning /Pronounciation</p>
            <h3 class="text-2xl font-semibold font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</h3>

            <div class=" flex justify-between items-center mt-8">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordDiv);
        manageSpinner(false);
    }
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btns"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);

    }
}

loadLessons()


document.getElementById('btn-search').addEventListener('click', () => {
    const lessonBtns = document.getElementsByClassName('lesson-btns');
    for (const btn of lessonBtns) {
        btn.classList.remove('text-white', 'bg-[#422AD5]');
    }
    
    const searchValue = document.getElementById('input-search').value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            displayLevelWords(filterWords);
        })
})