const INT_SQUARE_COUNT = 16;

const divCntnr = document.querySelector('.container');

for (let i = 0; i < INT_SQUARE_COUNT; i++)
{
    const rowDivCntnr = document.createElement('div');
    divCntnr.appendChild(rowDivCntnr);

    for (let j = 0; j < INT_SQUARE_COUNT; j++)
    {
        const colDivCntnr = document.createElement('div');
        rowDivCntnr.appendChild(colDivCntnr);
    }
}