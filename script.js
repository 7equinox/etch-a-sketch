const INT_SQUARE_COUNT = 16 * 16;

const divCntnr = document.querySelector('.container');

for (let i = 0; i < INT_SQUARE_COUNT; i++)
{
    const divChild = document.createElement('div');
    // divChild.setAttribute('class', `child-${i}`);
    divChild.classList.toggle('black-box');
    divCntnr.appendChild(divChild);
}

const divBlckBoxes = document.querySelectorAll('.black-box');

divBlckBoxes.forEach((divBlckBox) => {
    divBlckBox.addEventListener('mouseover', () => {
        if (!(divBlckBox.classList.contains('bg-blue')))
        {
            divBlckBox.classList.toggle('bg-blue');
        }
    });
});