const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //corrige el soporte css de otros navegadores
const cssnano = require('cssnano'); //Comprime nuestro css
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//JavaScript
const terser = require('terser')

function css(done){
    src("src/scss/**/*.scss")    //Identificar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())    //Compilarlo
        .pipe(postcss([autoprefixer, cssnano])) // Se agrega al final del proyecto
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));    //Almacenarla en el disco duro

    done();//call back que avisa a gulp cuando llegamos al funal de la función.
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
    
    done();
}

function versionWebp(done){
    const opciones ={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}
function versionAvif(done){
    const opciones ={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript);
    done();
}

exports.css = css;
exports.javaScript = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javaScript, dev);
