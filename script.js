const divCntnr = document.querySelector('.container');

// Function to create n^2 grid of square divs
function createGrid(intGridSize = 16)
{
    const intTotalSquares = intGridSize ** 2;

    // Loop to create child divs
    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.add('black-box');

        // Access the 3rd CSS rule in style.css (currently `.black-box`)
        const styleBlackBox = document.styleSheets[0].cssRules[2];

        const numBoxSize = 704 / intGridSize;
        styleBlackBox.style.width = `${numBoxSize}px`;
        styleBlackBox.style.height = `${numBoxSize}px`;

        divCntnr.appendChild(divChild);
    }

    const divListBlackBox = document.querySelectorAll('.black-box');

    // Initialize count for customized bg style rule
    let intDarkenRgbRule = 0;

    // Set up a 'hover' effect for grid divs
    divListBlackBox.forEach((divBlackBox) => {

        let intOpacityPrcnt = 20;

        divBlackBox.addEventListener('mouseover', () => {
            // Collect current classlist
            const arrStrClassList = [...divBlackBox.classList];

            // Check if customized bg rule exists
            const boolHasRandRgb = arrStrClassList.some(
                strClass => strClass.includes('darken-bg-rand-rgb')
            );

            // Remove customized bg rule if exists
            if (boolHasRandRgb)
            {
                // Customized darken-bg-rand-rgb always in the second pos of classlist
                const intLastClassIdx = divBlackBox.classList.length - 1;
                const strLastClassName = divBlackBox.classList[intLastClassIdx];
                divBlackBox.classList.remove(strLastClassName);
            }

            const styleSheet = document.styleSheets[0];
            const intCssRuleCount = styleSheet.cssRules.length;

            if (intOpacityPrcnt === 110)
            {
                const boolHasBgBlack = arrStrClassList.some(
                    strClass => strClass.includes('bg-black')
                );

                if(!boolHasBgBlack)
                {
                    console.log("WAW");
                    styleSheet.insertRule(`
                        .bg-black
                        {
                            background-color: black;
                        }
                    `, intCssRuleCount);
                }

                divBlackBox.classList.add('bg-black');
            }
            else
            {
                // Randomize the squares' RGB values with each interaction
                const intRandRed = Math.ceil(Math.random() * 255);
                const intRandGreen = Math.ceil(Math.random() * 255);
                const intRandBlue = Math.ceil(Math.random() * 255);
                styleSheet.insertRule(`
                    .darken-bg-rand-rgb-${intDarkenRgbRule}
                    {
                        background-color: rgb(
                            ${intRandRed},
                            ${intRandGreen},
                            ${intRandBlue}
                        );
                        opacity: ${intOpacityPrcnt}%;
                    }
                `, intCssRuleCount);

                divBlackBox.classList.add(`darken-bg-rand-rgb-${intDarkenRgbRule}`);

                intDarkenRgbRule++;
                intOpacityPrcnt += 10;
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

// TODO: Make .darken-bg-rand-rgb-### index-ordered base (left to right, up to down basis)
// TODO: Put .black-box css rule and its property in js
// TODO: Refactor the code