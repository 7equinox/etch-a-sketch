const divCntnr = document.querySelector('.container');

// Function to create n^2 grid of square divs
function createGrid(intGridSize = 16)
{
    const intTotalSquares = intGridSize ** 2;

    // Loop to create child divs
    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.add('white-box');

        // Access the 4th CSS rule in style.css (currently `.white-box`)
        const styleWhiteBox = document.styleSheets[0].cssRules[3];

        const numBoxSize = 704 / intGridSize;
        styleWhiteBox.style.width = `${numBoxSize}px`;
        styleWhiteBox.style.height = `${numBoxSize}px`;

        divCntnr.appendChild(divChild);
    }

    const divListWhiteBox = document.querySelectorAll('.white-box');

    let intStyleRule = 0;

    // Set up a 'hover' effect for grid divs
    divListWhiteBox.forEach((divWhiteBox) => {
        divWhiteBox.addEventListener('mouseover', () => {

            const arrStrClassList = [...divWhiteBox.classList];
            const boolHasRandRgb = arrStrClassList.some(
                strClass => strClass.includes('bg-rand-rgb')
            );

            if (boolHasRandRgb)
            {
                const intLastClassIdx = divWhiteBox.classList.length - 1;
                const strLastClassName = divWhiteBox.classList[intLastClassIdx];
                divWhiteBox.classList.remove(strLastClassName);
            }

            const intRandRed = Math.ceil(Math.random() * 255);
            const intRandGreen = Math.ceil(Math.random() * 255);
            const intRandBlue = Math.ceil(Math.random() * 255);

            const styleSheet = document.styleSheets[0];
            const intCssRuleCount = styleSheet.cssRules.length;

            styleSheet.insertRule(`
                .bg-rand-rgb-${intStyleRule}
                {
                    background-color: rgb(
                        ${intRandRed},
                        ${intRandGreen},
                        ${intRandBlue}
                    );
                }
            `, intCssRuleCount);

            divWhiteBox.classList.add(`bg-rand-rgb-${intStyleRule}`);

            intStyleRule++;
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
    
    if (strInput === null)
    {
        return;
    }
    else if (!Number.isInteger(intNewSquareCnt))
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