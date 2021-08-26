class HcodeFileReader {

    constructor(inputEl, imgEl) {
        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputevent();
    }

    initInputevent() {
        document.querySelector(this.inputEl).addEventListener('change', e => {
            this.reader(e.target.files[0]).then(result => {
                document.querySelector(this.imgEl).src = result;
            }).catch(err => {
                console.error(err);
            });
        });
    }

    reader(file) {

        return new Promise((resolve, reject) => {
            

            let reader = new FileReader();

            reader.onload = function () {
                resolve(reader.result);
            }

            reader.onerror = function () {
                reject("Não foi possível ler a imagem!");
            }

            reader.readAsDataURL(file);

        });

    }
}