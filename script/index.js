const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)    // promise of response
        .then(res => res.json())    // promise of json data
        .then(data => displayLessons(data.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayLevelWords(data.data));
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
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordDiv)
    }
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (const lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);

    }
}

loadLessons()