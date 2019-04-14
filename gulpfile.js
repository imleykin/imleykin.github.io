var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

var paths = {
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: ["src/sass/**/*.sass", "src/sass/**/*.scss"],
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "src/css"
  }

  // Easily add additional paths
  // ,html: {
  //  src: '...',
  //  dest: '...'
  // }
};

function style() {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      //.pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}

// Create sprites
gulp.task("svg", function() {
  return (
    gulp
      .src("src/svg/*.svg")

      // minify svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )

      .pipe(
        svgSprite({
          selector: "i-%f",

          svg: {
            sprite: "icons-sprite.svg"
          },

          svgPath: "%f",

          cssFile: "svg-sprite.css",

          common: "icon"
        })
      )

      .pipe(gulp.dest("src/icons"))
  );
});

// --------------------------------------------If you need svg sprite
var assetsDir = "src/";

var svgSprite = require("gulp-svg-sprite"),
  svgmin = require("gulp-svgmin"),
  cheerio = require("gulp-cheerio"),
  replace = require("gulp-replace");

gulp.task("svgSpriteBuild", function() {
  return (
    gulp
      .src(assetsDir + "svg/icons/*.svg")
      // minify svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      // // remove all fill and style declarations in out shapes
      // .pipe(
      //   cheerio({
      //     run: function($) {
      //       $("[fill]").removeAttr("fill");
      //       $("[stroke]").removeAttr("stroke");
      //       $("[style]").removeAttr("style");
      //     },
      //     parserOptions: { xmlMode: true }
      //   })
      // )
      // // cheerio plugin create unnecessary string '&gt;', so replace it.
      // .pipe(replace("&gt;", ">"))
      // // build svg sprite
      .pipe(
        svgSprite({
          selector: "i-%f",
          mode: {
            symbol: {
              sprite: "../sprite.svg",
              render: {
                scss: {
                  dest: "../../../sass/_sprite.scss",
                  template: assetsDir + "sass/templates/_sprite_template.scss"
                }
              },
              example: true
            }
          }
        })
      )
      .pipe(gulp.dest(assetsDir + "svg/sprite/"))
  );
});

// A simple task to reload the page
function reload(done) {
  browserSync.reload();
  done();
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: "./src"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });
  gulp.watch(paths.styles.src, style);
  // We should tell gulp which files to watch to trigger the reload
  // This can be html or whatever you're using to develop your website
  // Note -- you can obviously add the path to the Paths object
  gulp.watch(["src/*.html", "src/js/*.js"], reload);
}

// We don't have to expose the reload function
// It's currently only useful in other functions

// Don't forget to expose the task!
exports.watch = watch;

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(style, watch);

/*
 * You can still use `gulp.task` to expose tasks
 */
//gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task("default", build);
