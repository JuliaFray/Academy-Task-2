//функция создания input
function createInput(form, tempFields) {
    var input = [];
    var label = [];

    for (var k of tempFields) {
        var div = document.createElement('div');
        div.className = 'formBlock';
        if (k.input.type == 'technology') {
            input = document.createElement('select');
            input.required = k.input.required;
            for (var i of k.input.technologies) {
                let option = document.createElement('option')
                option.text = i;
                option.value = i;
                input.appendChild(option)
            }
            if (k.input.multiple) {
                input.setAttribute('multiple', input)
            }
            div.appendChild(input)
        } else if (k.input.type == 'color') {
            input = document.createElement('input');
            input.type = k.input.type;
            input.id = 'colorInput'
            input.required = k.input.required;
            input.setAttribute('list', 'colorsList');
            let datalist = document.createElement('datalist');
            datalist.id = 'colorsList';
            input.appendChild(datalist)

            for (var i = 0; i <= k.input.colors.length; i++) {
                if (k.input.colors[i]) {
                    let option = document.createElement('option');
                    option.text = k.input.colors[i];
                    option.value = k.input.colors[i];
                    datalist.appendChild(option);
                }
            }

            if (k.input.multiple) {
                input.setAttribute('multiple', input)
            }
            div.appendChild(input)

        } else {
            input = document.createElement('input');
            input.type = k.input.type;
            input.required = k.input.required;
            if (k.input.checked == 'true') {
                input.setAttribute('checked', input)
            }
            k.input.placeholder ? input.placeholder = k.input.placeholder : '';
            input.ref = k.input.ref;
            div.appendChild(input)
            if (k.input.filetype) {
                var filetype = []
                for (var ft of k.input.filetype) {
                    filetype.push('.' + ft);
                    input.accept = filetype
                }

            } else {
                input.accept = 'image/*'
            }
        }

        if (k.label) {
            label = document.createElement('label');
            label.setAttribute('for', input);
            label.innerHTML = k.label;
            div.appendChild(label);
        }

        if (k.input.mask) {
            createMask(k, input)
        }
        form.appendChild(div);
    }
}

const createMask = (k, input) => {
    var pattern = k.input.mask;
    input.addEventListener('focus', function (e) {
        input.placeholder = pattern;
        console.log(pattern);
        console.log(input.value)
        //        if (input.value !== pattern) {
        //            console.log(pattern)
        //            input.style.borderColor = 'red'
        //        }
    })
}




//функция создания кнопок
function createButton(form, tempButtons) {
    var button = [];

    for (var k of tempButtons) {
        button = document.createElement('button');
        button.innerText = k.text;
        if (k.text == 'Cancel') {
            button.type = 'reset'
        } else {
            button.type = 'submit'
        }
        form.appendChild(button)
    }
}

//функция создания ref
function createReferences(form, tempRef) {
    var div = document.createElement('div');
    div.className = 'formBlockWithoutInput';

    for (var k of tempRef) {
        if (k.input) {
            input = document.createElement('input');
            input.type = k.input.type;
            input.required = k.input.required;
            input.placeholder = k.input.placeholder;
            input.ref = k.input.ref;
            if (k.input.checked == 'true') {
                input.setAttribute('checked', input)
            }
            div.appendChild(input)
        } else {

            if (k.ref) {
                var text = document.createElement('a');
                text.href = k.ref;
            }

            var textWithoutRef = document.createElement('p');
            text.innerText = k.text;
            var twr = 'text without ref'
            k[twr] ? textWithoutRef.innerText = k[twr] : '';
            div.appendChild(textWithoutRef)
            div.appendChild(text);
        }
    }
    form.appendChild(div)
}


//функция формирования форм
function createForm(data) {
    for (var key in data) {
        if (key == 'name') {
            var form = document.createElement('form');
            form.name = data[key];
            document.body.appendChild(form);
        }

        if (key == 'buttons') {
            var tempButtons = data[key];
            createButton(form, tempButtons)
        }

        if (key == 'fields') {
            var tempFields = data[key];
            createInput(form, tempFields);
        }

        if (key == 'references') {
            var tempRef = data[key];
            createReferences(form, tempRef)
        }
    }
    // change bg color
    var select = document.getElementById('colorInput');
    if (select) {
        select.addEventListener('change', function (e) {
            form.style.backgroundColor = select.value;
        });
    }
};

//оформление кнопки загрузки. отображение количества загруженных файлов
//let inputs = document.querySelectorAll('.input-file');
//Array.prototype.forEach.call(inputs, function (input) {
//    let label = input.nextElementSibling,
//        labelVal = document.querySelector('.input-file-button-text').innerText;
//    let countFiles = '';
//
//    input.addEventListener('change', function (e) {
//        if (!countFiles) {
//            if (this.files && this.files.length >= 1)
//                countFiles = this.files.length;
//        } else {
//            if (this.files && this.files.length >= 1)
//                countFiles = countFiles + this.files.leng
//        }
//        if (countFiles) {
//            label.querySelector('.input-file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
//        } else {
//            label.querySelector('.input-file-button-text').innerText = labelVal
//        }
//        //        
//
//
//    })
//})

let counter = 0;
//подсчет загруженных файлов
function filesCounter(input) {

    if (input) {
        counter = counter + input.files.length
    }

    if (counter) {
        document.querySelector('.input-file-button-text').innerText = 'Выбрано файлов: ' + counter;
    } else {
        document.querySelector('.input-file-button-text').innerText = 'Выбрать файлы'
    }

    console.log(counter);
}

//загрузка всех файлов, чтение данных как текст и вызов функции формирования формы
function readFile(input) {

    filesCounter(input);

    for (var i = 0; i < input.files.length; i++) {

        var file = input.files[i];
        //для каждого файла создается свой filereader
        let reader = new FileReader();

        //преобразует каждый JSON файл в объект в конце успешной загрузки файла
        reader.onload = function () {
            var json = JSON.parse(reader.result);
            //вызов функции формирования формы
            createForm(json);
        };
        reader.readAsText(file);
    };


};

//повторное генерирование форм из файлов
function regenFile() {

    var input = document.querySelector('.input-file');
    readFile(input);
    var countFiles = input.files.length;
    document.querySelector('.input-file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
}

//удаление всех форм
function resetForm() {
    var input = document.querySelector('.input-file');
    counter = 0;


    var form = document.querySelectorAll('form');
    for (var f of form) {
        f.remove()
    };
    document.querySelector('.input-file-button-text').innerText = 'Выбрать файл';

}
