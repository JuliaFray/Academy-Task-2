//оформление кнопки загрузки. отображение количества загруженных файлов
let inputs = document.querySelectorAll('.input-file');
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
        labelVal = document.querySelector('.input-file-button-text').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.files.length;

        if (countFiles) {
            label.querySelector('.input-file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
        } else {
            label.querySelector('.input-file-button-text').innerText = labelVal
        }

    })
})

//функция создания input
function createInput(form, tempFields) {
    
    var input = [];
    var label = [];
    
    for (var k of tempFields) {
        var div = document.createElement('div');
        div.className = 'formBlock';
        if (k.input.type == 'technology') {
            input = document.createElement('select');
            if (k.input.required) {
                input.required = k.input.required;
            }
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
            input = document.createElement('select');
            if (k.input.required) {
                input.required = k.input.required;
            }
            for (var i of k.input.colors) {
                let option = document.createElement('option')
                option.text = i;
                option.value = i;
                input.appendChild(option)
            }
            if (k.input.multiple) {
                input.setAttribute('multiple', input)
            }
            div.appendChild(input)
        } else {
            input = document.createElement('input');
            input.type = k.input.type;
            if (k.input.required) {
                input.required = k.input.required;
            }
            if (k.input.checked == 'true') {
                input.setAttribute('checked', input)
            }
            k.input.placeholder ? input.placeholder = k.input.placeholder : '';
            if (k.input.ref) {
                input.ref = k.input.ref;
            }
            
            div.appendChild(input)
        }
        
        if (k.label) {
            label = document.createElement('label');
            label.setAttribute('for', input);
            label.innerHTML = k.label;
            div.appendChild(label);
        }
        

        if(k.input.mask) {
            input.pattern = k.input.mask;
        }
        form.appendChild(div);
    }
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
    div.className = 'formBlockWithCheck';

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
            var text = document.createElement('p');
            text.ref = k.ref;
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
};

//загрузка всех файлов, чтение данных как текст и вызов функции формирования формы
function readFile(input) {
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
    readFile(input)
}

//удаление всех форм
function resetForm() {
    var form = document.querySelectorAll('form');
    for (var f of form) {
        f.remove()
    }
}