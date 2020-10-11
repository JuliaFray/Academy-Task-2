var textForm = document.querySelector('.text');


//оформление кнопки загрузки
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


//очистить поле вывода выходных данных
function resetForm() {
    document.getElementById('textarea').innerHTML = '';
    document.querySelector('.input-file-button-text').innerHTML = 'Выберите файл'
    document.querySelector('.copy-file').innerHTML = 'Копировать форму'
}
