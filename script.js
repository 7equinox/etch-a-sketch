const INT_SQUARE_COUNT = 16 * 16;

const divCntnr = document.querySelector('.container');

for (let i = 0; i < INT_SQUARE_COUNT; i++)
{
    const divChild = document.createElement('div');
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

const btnEditGrid = document.querySelector('button');

btnEditGrid.addEventListener('click', () => {
    const strInput = prompt("[PROMPT] Enter the new number of squares per side (1-100)");
    const intNewSquareCnt = parseInt(strInput);
    
    if (!Number.isInteger(intNewSquareCnt))
    {
        alert("[ERROR] Please input a number!");
    }
    else if (intNewSquareCnt < 1 || intNewSquareCnt > 100)
    {
        alert("[ERROR] Please input an integer from 1 to 100!");
    }
    else
    {
        while (divCntnr.hasChildNodes()) {
            divCntnr.removeChild(divCntnr.firstChild);
        }

        for (let i = 0; i < Math.pow(intNewSquareCnt, 2); i++)
        {
            const divChild = document.createElement('div');
            divChild.classList.toggle('black-box');
            divChild.style.width = `${704 / intNewSquareCnt}px`;
            divChild.style.height = `${704 / intNewSquareCnt}px`;
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
    }
});