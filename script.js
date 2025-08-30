const divCntnr = document.querySelector('.container');

// Function to create n^2 grid of square divs
function createGrid(intGridSize = 16)
{
    const intTotalSquares = intGridSize ** 2;

    // Loop to create child divs
    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.toggle('white-box');

        // Access the 4th CSS rule in style.css (currently `.white-box`)
        const styleWhiteBox = document.styleSheets[0].cssRules[3];

        const numBoxSize = 704 / intGridSize;
        styleWhiteBox.style.width = `${numBoxSize}px`;
        styleWhiteBox.style.height = `${numBoxSize}px`;

        divCntnr.appendChild(divChild);
    }

    const divWhiteBoxes = document.querySelectorAll('.white-box');

    // Set up a 'hover' effect for grid divs
    divWhiteBoxes.forEach((divWhiteBox) => {
        divWhiteBox.addEventListener('mouseover', () => {
            if (!(divWhiteBox.classList.contains('bg-blue')))
            {
                divWhiteBox.classList.toggle('bg-blue');
            }
        });
    });
}

// Initially call createGrid() with a default grid of square divs
createGrid();

const btnEditGrid = document.querySelector('button');

// Button to send a popup to customize grid
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
        // Remove existing grid
        while (divCntnr.hasChildNodes()) {
            divCntnr.removeChild(divCntnr.firstChild);
        }

        // Generate new grid given number of squares per side
        createGrid(intNewSquareCnt);
    }
});