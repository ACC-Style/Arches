/*jslint node: true */
"use strict";
var gulp = require("gulp");
var sass = require("gulp-dart-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var pixrem = require("pixrem");
var cssnano = require("cssnano");
var mergeRules = require("postcss-merge-rules");
var postcssNormalize = require("postcss-normalize");
var sourcemaps = require("gulp-sourcemaps");
var clean = require("gulp-clean");
var packageJSON = require("./package.json");
var concat = require("gulp-concat");
var cssDeclarationSorter = require("css-declaration-sorter");
var gzip = require("gulp-gzip");
var clone = require("gulp-clone");
var rename = require("gulp-rename");
var merge = require("merge-stream");
var header = require("gulp-header");
var fs = require("fs");
var pkg = require("./package.json");
var run = require("gulp-run");

var banner = [
	"/**",
	" * <%= pkg.name %> - <%= pkg.description %>",
	" * @version v<%= pkg.version %>",
	" * @link <%= pkg.homepage %>",
	" */",
	""
].join("\n");

var SOURCE = {
	SRC: "./src",
	DIST: "./dist",
	DOCS: "./docs",
	CSS: "/css",
	SCSS: "/scss",
	JS: "/js",
	FONTS: "/fonts",
	IMG: "/img/Exports",
	ICONS: "/icons",
	MD: "./markdown"
};
var PATHS = {
	CSS: SOURCE.SRC + SOURCE.CSS,
	ALLCSS: SOURCE.SRC + SOURCE.CSS + "/**/*.css",
	SCSS: SOURCE.SRC + SOURCE.SCSS,
	ALLSCSS: SOURCE.SRC + SOURCE.SCSS + "/**/*.scss",
	FONTS: SOURCE.SRC + SOURCE.FONTS,
	ALLFONTS: SOURCE.SRC + SOURCE.FONTS + "/**/*",
	JS: SOURCE.SRC + SOURCE.JS,
	ALLJS: SOURCE.SRC + SOURCE.JS + "/**/*.js",
	ICONS: SOURCE.SRC + SOURCE.ICONS,
	ALLICONS: SOURCE.SRC + SOURCE.ICONS + "/**/*.scss",
	IMAGES: SOURCE.SRC + SOURCE.IMAGES,
	ALLIMAGES: SOURCE.SRC + SOURCE.IMAGES + "*",
	MARKDOWN: SOURCE.MD + "/partials/"
};

// Style Tasks
gulp.task("style", function() {
	console.log("Gulp Style Tasks");
	console.log("Gulp: I am making this pretty.");
	var plugins = [
		//postcssNormalize( /* pluginOptions */ ),
		pixrem(),
		cssDeclarationSorter({
			order: "smacss"
		}),
		autoprefixer({
			grid: "autoplace"
		}),
		mergeRules({})
	];
	var css = gulp
		.src(PATHS.ALLSCSS)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss(plugins));
	var min = css
		.pipe(clone())
		.pipe(
			rename(function(path) {
				path.extname = ".min.css";
			})
		)
		.pipe(postcss([cssnano()]));

	var gz = min.pipe(clone()).pipe(gzip());

	return merge(css, min, gz)
		.pipe(sourcemaps.write("/maps"))
		.pipe(gulp.dest(SOURCE.DIST + SOURCE.CSS));
});

gulp.task("fontawesome", function() {
	console.log("Gulp Font Awesome Tasks");
	console.log("Gulp: Going to the store node_modules to pick up some fonts.");
	return gulp
		.src(["css/*", "webfonts/*"], {
			cwd: "./node_modules/@fortawesome/fontawesome-pro/",
			cwdbase: true
		})
		.pipe(gulp.dest(SOURCE.DIST + "/icons"));
});

gulp.task("dist", function() {
	console.log("Gulp Dist Package");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the styleguide"
	);
	return gulp
		.src([PATHS.ALLFONTS, PATHS.ALLICONS, PATHS.ALLJS, PATHS.ALLIMAGES], {
			base: ""
		})
		.pipe(gulp.dest(SOURCE.DIST));
});
gulp.task("copy", function() {
	console.log("Gulp Copy Dist Package to Docs");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the styleguide"
	);
	return gulp.src("./dist/**/*").pipe(gulp.dest(SOURCE.DOCS));
});
var markdownbuild = function(base, label) {
	var construct = base
		.pipe(clone())
		.pipe(rename(label + "_readme.md"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.MARKDOWN + "partial_" + label + ".md",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(PATHS.MARKDOWN + "markdown_header.md", "utf8"),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header("<div class='" + label + "_nav'>", {
				pkg: pkg
			})
		);
	return construct;
};
gulp.task("markdown", function() {
	var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
	//markdownbuild(base,name,content,tag)
	var home = markdownbuild(base, "home");
	var cvqualtiy = markdownbuild(base, "cvqualityboot");
	var accfoundation = markdownbuild(base, "accfoundation");
	var cardiosmartfoundation = markdownbuild(base, "cardiosmartfoundation");
	var cardiosmartboot = markdownbuild(base, "cardiosmartboot");
	var noframework = markdownbuild(base, "noframework");
	var accboot = markdownbuild(base, "accboot");
	var jaccboot = markdownbuild(base, "jaccboot");
	var layoutdemo = markdownbuild(base, "layoutdemo");
	var colorcodes = markdownbuild(base, "colorcodes");
	return merge(
		home,
		cvqualtiy,
		accboot,
		jaccboot,
		accfoundation,
		noframework,
		layoutdemo,
		colorcodes,
		cardiosmartfoundation,
		cardiosmartboot
	)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.MARKDOWN + "markdown_preheader.md",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(gulp.dest(SOURCE.MD));
});
var buildbrand = function(base, brand, framework) {
	var construct = base.pipe(clone());
	var i = 0;
	switch (framework) {
		case "zurb":
			construct.pipe(
				header(
					fs.readFileSync(
						PATHS.SCSS + "/gulp_header/__setup.zurb.scss",
						"utf8"
					),
					{
						pkg: pkg
					}
				)
			);
			break;
		case "bootstrap":
			construct
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__setup.boot.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/config/__config.boot.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		case "noframe":
			construct
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__setup.noframe.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/config/__config.base.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		default:
			construct
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__setup.none.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/config/__config.base.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
	}
	construct.pipe(
		header(
			fs.readFileSync(
				PATHS.SCSS + "/gulp_header/__brand.base.scss",
				"utf8"
			),
			{
				pkg: pkg
			}
		)
	);
	switch (brand) {
		case "cvquality":
			construct
				.pipe(
					header("/** Built With CVQuality Branding **/", {
						pkg: pkg
					})
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__brand.cvquality.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		case "acc":
			construct
				.pipe(
					header("/** Built With ACC Branding **/", {
						pkg: pkg
					})
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__brand.acc.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		case "jacc":
			construct
				.pipe(
					header("/** Built With JACC Branding **/", {
						pkg: pkg
					})
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__brand.jacc.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		case "cardiosmart":
			construct
				.pipe(
					header("/** Built With CardioSmart Branding **/", {
						pkg: pkg
					})
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS +
								"/gulp_header/__brand.cardiosmart.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
		default:
			construct
				.pipe(
					header("/** Built With Base Branding **/", {
						pkg: pkg
					})
				)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.SCSS + "/gulp_header/__brand.none.scss",
							"utf8"
						),
						{
							pkg: pkg
						}
					)
				);
			break;
	}

	switch (framework) {
		case "bootstrap":
			construct
				.pipe(
					header(
						" \n/**Set Active Class for Bootstrap **/ \n $active-class-name: 'active';\n",
						{
							pkg: pkg
						}
					)
				)
				.pipe(
					header(
						" \n/** Utility Class Built on top of Bootstrap 4.3 **/ \n",
						{
							pkg: pkg
						}
					)
				);
			break;
		case "zurb":
			construct.pipe(
				header(
					" \n/** Utility Class Built on top of Zurb Foundation 6.5.3 **/ \n",
					{
						pkg: pkg
					}
				)
			);
			break;
		case "noframe":
			construct.pipe(
				header(" \n/** No Framework **/ \n", {
					pkg: pkg
				})
			);
			break;
		default:
			break;
	}
	construct.pipe(
		header("/** Start of BRANDINGBUILD " + i + " **/", {
			pkg: pkg
		})
	);
	++i;
	return construct;
};
gulp.task("construct", function() {
	var base = gulp.src(PATHS.SCSS + "/gulp_header/__globalshame.scss");
	var baseUC = base
		.pipe(clone())
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/gulp_header/__utilityclasses.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.noframe.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.noframe.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.base.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header("/** Base UC File **/", {
				pkg: pkg
			})
		);

	var uc_acc = buildbrand(baseUC, "acc", "").pipe(rename("uc_acc.scss"));
	var uc_jacc = buildbrand(baseUC, "jacc", "").pipe(rename("uc_jacc.scss"));
	var uc_cardiosmart = buildbrand(baseUC, "cardiosmart", "").pipe(
		rename("uc_cardiosmart.scss")
	);
	var uc_cvquality = buildbrand(baseUC, "cvquality", "").pipe(
		rename("uc_cvquality.scss")
	);
	var colors = base.pipe(clone()).pipe(
		header(
			fs.readFileSync(
				PATHS.SCSS + "/styleguide/_color-codes.scss",
				"utf8"
			),
			{
				pkg: pkg
			}
		)
	);
	colors = buildbrand(colors, "", "").pipe(rename("color_codes.scss"));
	var zurb_acc = base
		.pipe(clone())
		.pipe(rename("zurb_acc.scss"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.zurb.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.zurb.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		);
	zurb_acc = buildbrand(zurb_acc, "acc", "zurb");
	var zurb_cardiosmart = base
		.pipe(clone())
		.pipe(rename("zurb_cardiosmart.scss"))
		.pipe(
			header(
				fs.readFileSync(PATHS.SCSS + "/components/_logo.scss", "utf8"),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.zurb.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.cardiosmart.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)

		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.zurb.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		);
	zurb_cardiosmart = buildbrand(zurb_cardiosmart, "cardiosmart", "zurb");
	var boot_acc = base
		.pipe(clone())
		.pipe(rename("boot_acc.scss"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.acc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.acc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		);
	boot_acc = buildbrand(boot_acc, "acc", "bootstrap");
	var boot_cardiosmart = base
		.pipe(clone())
		.pipe(rename("boot_cardiosmart.scss"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.acc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.acc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		);
	boot_cardiosmart = buildbrand(boot_cardiosmart, "cardiosmart", "bootstrap");
	var boot_cvquality = base
		.pipe(clone())
		.pipe(rename("boot_cvquality.scss"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.cvquality.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.cvquality.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/base/__cvquality.base.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		);
	boot_cvquality = buildbrand(boot_cvquality, "cvquality", "bootstrap");
	//jacc bootstrap
	boot_cardiosmart = buildbrand(boot_cardiosmart, "cardiosmart", "bootstrap");
	var boot_jacc = base
		.pipe(clone())
		.pipe(rename("boot_jacc.scss"))
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.jacc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/recipes/__recipes.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.jacc.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/components/__components.boot.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(
				fs.readFileSync(PATHS.SCSS + "/base/__jacc.base.scss", "utf8"),
				{
					pkg: pkg
				}
			)
		);
	boot_jacc = buildbrand(boot_jacc, "jacc", "bootstrap");
	return merge(
		zurb_acc,
		boot_acc,
		uc_acc,
		boot_jacc,
		uc_jacc,
		zurb_cardiosmart,
		boot_cardiosmart,
		uc_cardiosmart,
		uc_cvquality,
		boot_cvquality,
		colors
	)
		.pipe(
			header(
				fs.readFileSync(
					PATHS.SCSS + "/gulp_header/__preheader.scss",
					"utf8"
				),
				{
					pkg: pkg
				}
			)
		)
		.pipe(
			header(banner, {
				pkg: pkg
			})
		)
		.pipe(gulp.dest(PATHS.SCSS));
});
gulp.task("concat", function() {
	var uc = gulp.src(PATHS.SCSS + "/uc_jacc.scss");
	var boot = gulp.src(PATHS.SCSS + "/boot_jacc.scss");
	return merge(uc, boot)
		.pipe(concat("combo_jacc.scss"))
		.pipe(gulp.dest(PATHS.SCSS));
});
gulp.task("watch", function() {
	console.log("Gulp Watch Tasks");
	console.log(
		"Gulp: I will be watching you.... even when you sleep..... creapy"
	);
	return gulp.watch(
		[PATHS.ALLSCSS, "!" + PATHS.SCSS + "*.scss"],
		gulp.series("build")
	);
});

gulp.task("styleguide", function() {
	return run(
		"npm run index && npm run uc && npm run zurb_acc && npm run boot_acc && npm run boot_jacc && npm run boot_cvquality &&  npm run layout_demo &&  npm run color_codes && npm run uc_cardiosmart"
	).exec();
});

gulp.task(
	"build",
	gulp.series(
		"construct",
		"concat",
		"style",
		"copy",
		"markdown",
		"styleguide"
	)
);
gulp.task("md", gulp.series("markdown", "styleguide"));
gulp.task("default", gulp.series("build", "watch"));
