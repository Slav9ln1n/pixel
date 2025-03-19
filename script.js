function createGrid(rows, cols, squareSize) {
    const gridContainer = document.getElementById('grid-container')
    const buttons = document.querySelectorAll('.color-square')
    const clearButton = document.getElementById('delete')
    const fillButton = document.getElementById('fill')
    const saveButton = document.getElementById('save')
    let color = ""
    let isMouseDown = false
    let isClearMode = false
    let isFillMode = false

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${squareSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button === clearButton) {
                isClearMode = true;
                color = null;
            } else if (button === fillButton) {
                if (color) {
                    isFillMode = true
                    fillAllSquares(color);
                    }
            } else if (button === saveButton) {
                saveGridAsImage();
            } else {
                color = window.getComputedStyle(button).backgroundColor;
                isClearMode = false;
            }
            })
        })

    function fillAllSquares(our_color) {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.style.backgroundColor = our_color;
            isFillMode = false
        });
        }

    function saveGridAsImage() { 
        domtoimage.toPng(gridContainer)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                // Создаем ссылку для скачивания
                const link = document.createElement('a');
                link.download = 'grid_image.png'; // Имя файла
                link.href = dataUrl;
                link.click();
            });
    }

    for (let i = 0; i < rows * cols; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
            if (isClearMode) {
                square.style.backgroundColor = '#ffffff';
            } else if (color) {
                square.style.backgroundColor = color;
            }
            }
        );

        square.addEventListener('mouseover', () => {
            if (isMouseDown) {
                if (isClearMode) {
                square.style.backgroundColor = '#ffffff';
            } else if (color) {
                square.style.backgroundColor = color;
            }
            }
        });

        square.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        gridContainer.appendChild(square);
    }
}

createGrid(24, 46, 50); 