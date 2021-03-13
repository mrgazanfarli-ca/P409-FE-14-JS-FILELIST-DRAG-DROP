// const draggableListItems = document.querySelectorAll('.to-drag-from li');
// const listToDrop = document.querySelector('.to-drop-in');

// draggableListItems.forEach(i => {
//     i.addEventListener('dragstart', (e) => {
//         e.dataTransfer.setData('text', e.target.id);
//     });
// });

// listToDrop.addEventListener('dragover', (e) => {
//     e.preventDefault();
// });

// listToDrop.addEventListener('drop', (e) => {
//     // e.stopPropagation();
//     const draggedItemId = e.dataTransfer.getData('text');

//     e.target.append(document.getElementById(draggedItemId));
// });

const whereToPut = document.querySelector('.color-drop');
const draggableColors = document.querySelectorAll('.color-circle');

if (whereToPut) {
    whereToPut.addEventListener('dragover', e => {
        e.preventDefault();
    });
}

if (draggableColors.length) {
    draggableColors.forEach(d => {
        d.addEventListener('dragstart', e => {
            const { target } = e;
            const red = target.getAttribute('data-red');
            const green = target.getAttribute('data-green');
            const blue = target.getAttribute('data-blue');
    
            const colorObj = {
                red,
                green,
                blue,
            }
    
            // const colorString = `${red},${green},${blue}`;
    
            // e.dataTransfer.setData('text', colorString);
    
            const stringifiedColorObj = JSON.stringify(colorObj);
            e.dataTransfer.setData('text', stringifiedColorObj);
        });
    });
}

if (whereToPut) {
    whereToPut.addEventListener('drop', e => {
        const { target, dataTransfer } = e;
        const currentRed = +target.getAttribute('data-red');
        const currentGreen = +target.getAttribute('data-green');
        const currentBlue = +target.getAttribute('data-blue');
    
        // const [givenRed, givenGreen, givenBlue] = dataTransfer.getData('text').split(',');
    
        const { red: givenRed, green: givenGreen, blue: givenBlue } = JSON.parse(dataTransfer.getData('text'));
    
        const resultRed = Math.floor((+givenRed + currentRed) / 2);
        const resultGreen = Math.floor((+givenGreen + currentGreen) / 2);
        const resultBlue = Math.floor((+givenBlue + currentBlue) / 2);
        // const resultRed = Math.min(+givenRed + currentRed, 255);
        // const resultGreen = Math.min(+givenGreen + currentGreen, 255);
        // const resultBlue = Math.min(+givenBlue + currentBlue, 255);
    
        target.setAttribute('data-red', resultRed);
        target.setAttribute('data-green', resultGreen);
        target.setAttribute('data-blue', resultBlue);
    
        target.style.backgroundColor = `rgb(${resultRed}, ${resultGreen}, ${resultBlue})`;
    });
}

const fileInput = document.querySelector('.file-input');

if (fileInput) {
    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
    
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(file);
    
        fileReader.onloadend = function () {
            console.log(fileReader.result);
        };
    });
}

const dropArea = document.querySelector('.image-drop-area');
const imageList = document.querySelector('#image-list');

const preventDefaultAndPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

['dragenter', 'dragleave', 'drop', 'dragover'].forEach(e => {
    dropArea.addEventListener(e, preventDefaultAndPropagation);
});

['dragenter', 'dragover'].forEach(e => {
    dropArea.addEventListener(e, () => {
        dropArea.classList.add('active');
    });
});

['dragleave', 'drop'].forEach(e => {
    dropArea.addEventListener(e, () => {
        dropArea.classList.remove('active');
    });
});

dropArea.addEventListener('drop', event => {
    const dataTransfer = event.dataTransfer;

    const files = dataTransfer.files

    const filesAsArray = [...files];
    filesAsArray.forEach(previewFile);
    filesAsArray.forEach(uploadFile);
});

const previewFile = (file) => {
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(file);

    fileReader.onloadend = function () {
        // create parent div
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-div');

        // add image
        const img = document.createElement('img');
        img.src = fileReader.result;
        imgDiv.append(img);

        // create icon div
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-div');

        // create icon
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash');
        
        iconDiv.append(icon);
        imgDiv.append(iconDiv);
        
        imageList.append(imgDiv);

        icon.addEventListener('click', (e) => {
            imageList.removeChild(e.target.parentNode.parentNode);
        });
    }
};

const uploadFile = (file) => {
    const formData = new FormData();

    formData.append('file', file);
    console.log(formData);
};

const deleteFileBE = () => {

};

// const obj = {
//     name: 'Gazanfar',
//     age: 73,
// }

// const gazanfarsAge = obj.age;

// const { age: gazanfarsAge } = obj;
