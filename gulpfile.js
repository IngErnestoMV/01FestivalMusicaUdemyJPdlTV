const { src } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
function css(done){
    src("src/scss/app.scss")    //Identificar el archivo de SASS
    .pipe(sass())    //Compilarlo
    .pipe(dest("buld/css"))    //Almacenarla en el disco duro


    done();//call back que avisa a gulp cuando llegamos al funal de la función.
}

exports.css = css;