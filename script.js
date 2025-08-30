const divCntnr = document.querySelector('.container');

function createGrid(intGridSize = 16)
{
    const intTotalSquares = intGridSize ** 2;

    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.toggle('white-box');

        const styleWhiteBox = document.styleSheets[0].cssRules[3];
        const numBoxSize = 704 / intGridSize;
        styleWhiteBox.style.width = `${numBoxSize}px`;
        styleWhiteBox.style.height = `${numBoxSize}px`;

        divCntnr.appendChild(divChild);
    }

    const divWhiteBoxes = document.querySelectorAll('.white-box');

    divWhiteBoxes.forEach((divWhiteBox) => {
        divWhiteBox.addEventListener('mouseover', () => {
            if (!(divWhiteBox.classList.contains('bg-blue')))
            {
                divWhiteBox.classList.toggle('bg-blue');
            }
        });
    });
}

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

        createGrid(intNewSquareCnt);
    }
});

createGrid();