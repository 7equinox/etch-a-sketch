// Get the external css file (`style.css`)
const styleSheet = document.styleSheets[0];
let intCssRuleCount = styleSheet.cssRules.length;

const divCntnr = document.querySelector('.container');

// Function to create n^2 grid of square divs
function createGrid(intGridSize = 16)
{
    // Customize box size in the same total space (704px wide)
    const numBoxSize = 704 / intGridSize;
    styleSheet.insertRule(`
        .black-box
        {
            width: ${numBoxSize}px;
            height: ${numBoxSize}px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-sizing: border-box;
        }
    `, intCssRuleCount);

    const intTotalSquares = intGridSize ** 2;
    // Loop to create child divs
    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.add('black-box');
        divCntnr.appendChild(divChild);
    }

    const divListBlackBox = document.querySelectorAll('.black-box');
    // Set up a 'hover' effect for grid divs
    divListBlackBox.forEach((divBlackBox, intIdx) => {
        // Initialize create rule for each 'hover' effect
        styleSheet.insertRule(`
            .darken-bg-rand-rgb-${intIdx} {  }
        `, intCssRuleCount);

        intCssRuleCount++;
        
        let intOpacityPrcnt = 20;
        let boolHasBgBlack = false;

        divBlackBox.addEventListener('mouseover', () => {
            // Collect current classlist
            const arrCssRule = [...styleSheet.cssRules];
            // Get the customized bg rule
            const divBlckBxStyle = arrCssRule[intIdx + 2];

            // If the interactions is less than 10 (opacity % based, x10)
            if (intOpacityPrcnt <= 100)
            {
                // Randomize the squares' RGB values with each interaction
                const intRandRed = Math.ceil(Math.random() * 255);
                const intRandGreen = Math.ceil(Math.random() * 255);
                const intRandBlue = Math.ceil(Math.random() * 255);

                divBlckBxStyle.style.setProperty(
                    "background-color",
                    `rgb(
                        ${intRandRed},
                        ${intRandGreen},
                        ${intRandBlue}
                    )`
                );
                divBlckBxStyle.style.setProperty(
                    "opacity",
                    `${intOpacityPrcnt}%`
                );

                intOpacityPrcnt += 10;
            }

            // Achieve a fully black square in only ten interactions.
            else if (!boolHasBgBlack && intOpacityPrcnt > 100)
            {
                divBlckBxStyle.style.setProperty(
                    "background-color",
                    "black"
                );
                divBlckBxStyle.style.removeProperty(
                    "opacity"
                );

                boolHasBgBlack = true;
            }

            divBlackBox.classList.add(`darken-bg-rand-rgb-${intIdx}`);
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
        while (divCntnr.hasChildNodes())
        {
            divCntnr.removeChild(divCntnr.firstChild);
        }

        // Remove existing custom bg rule
        while(intCssRuleCount > 2)
        {
            styleSheet.deleteRule(2);
            intCssRuleCount = styleSheet.cssRules.length;
        }
        // Generate new grid given number of squares per side
        createGrid(intNewSquareCnt);
    }
});