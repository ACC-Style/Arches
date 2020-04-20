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
var pkg = require("./package.json");

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
	ALLJS: SOURCE.SRC + SOURCE.JS + "/*",
	ICONS: SOURCE.SRC + SOURCE.ICONS,
	ALLICONS: SOURCE.SRC + SOURCE.ICONS + "/**/*.scss",
	IMAGES: SOURCE.SRC + SOURCE.IMAGES,
	ALLIMAGES: SOURCE.SRC + SOURCE.IMAGES + "/**/*",
	MARKDOWN: SOURCE.MD + "/partials/"
};
var BUILDOPTIONS = ["none", "uc", "zurb", "boot"];
var BRANDVARIATIONS = ["acc", "jacc", "cardiosmart", "cvquality"];

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
		.pipe(gulp.dest(SOURCE.SRC + SOURCE.CSS));
});

var runSass = function(brand) {
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
		.src(PATHS.SCSS + "/**/*" + brand + "*")
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
		.pipe(gulp.dest(SOURCE.SRC + SOURCE.CSS));
};
var markdownbuild = function(base, label) {
	var construct = base
		.pipe(clone())
		.pipe(rename(label + "_readme.md"))
		.pipe(
			header(fs.readFileSync(PATHS.MARKDOWN + "partial_" + label + ".md"))
		)
		.pipe(header(fs.readFileSync(PATHS.MARKDOWN + "markdown_header.md")))
		.pipe(header("<div class='" + label + "_nav'>"));
	return construct;
};
var buildbrand = function(base, brand, framework) {
	var construct = base;
	switch (framework) {
		case "zurb":
			construct.pipe(headerFromFile("/setup/__setup.zurb.scss"));
			break;
		case "boot":
			construct.pipe(headerFromFile("/setup/__setup.boot.scss"));
			break;
		default:
			construct.pipe(headerFromFile("/setup/__setup.none.scss"));
			break;
	}
	construct.pipe(
		header(
			fs.readFileSync(PATHS.SCSS + "/setup/__brand.base.scss", "utf8"),
			{
				pkg: pkg
			}
		)
	);

	if (brand == "color") {
		construct
			.pipe(
				header("/** Built With Base Branding <%= pkg.version %> **/", {
					pkg: pkg
				})
			)
			.pipe(headerFromFile("/setup/__brand.none.scss"));
	} else {
		construct
			.pipe(header("/** Built With " + brand + " Branding **/"))
			.pipe(headerFromFile("/setup/__brand." + brand + ".scss"))
			.pipe(
				header("/** Built With Base Branding <%= pkg.version %> **/", {
					pkg: pkg
				})
			);
	}
	switch (framework) {
		case "boot":
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'active';\n\n/** Utility Class Built on top of Bootstrap <%= pkg.bootstrapVersion %> **/ \n",
					{
						pkg: pkg
					}
				)
			);
			break;
		case "zurb":
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'is-active';\n\n/** Utility Class Built on top of Zurb Foundation <%= pkg.foundationVersion %>  **/ \n",
					{
						pkg: pkg
					}
				)
			);
			break;
		default:
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'active';\n\n/** No Framework **/ \n"
				)
			);
			break;
	}
	construct
		.pipe(headerFromFile("/setup/__preheader.scss"))
		.pipe(header(banner, { pkg: pkg }));
	return construct;
};
var headerFromFile = function(stringPath) {
	return header(fs.readFileSync(PATHS.SCSS + stringPath, "utf8"), {
		pkg: pkg
	});
};
var constructFrameworkStyleSheet = function(brand, framework) {
	var base = gulp
		.src(PATHS.SCSS + "/setup/__globalshame_framework.scss")
		.pipe(clone())
		.pipe(rename(brand + "_" + framework + ".scss"))
		.pipe(headerFromFile("/recipes/__recipes." + framework + ".scss"))
		.pipe(headerFromFile("/recipes/__recipes." + brand + ".scss"))
		.pipe(headerFromFile("/components/__components." + brand + ".scss"))
		.pipe(headerFromFile("/components/__components." + framework + ".scss"))
		.pipe(headerFromFile("/base/__base." + brand + ".scss"));
	return base;
};
var constructUCStyleSheet = function(brand) {
	return gulp
		.src(PATHS.SCSS + "/setup/__globalshame_uc.scss")
		.pipe(clone())
		.pipe(rename(brand + "_uc.scss"))
		.pipe(headerFromFile("/setup/__utilityclasses.scss"))
		.pipe(headerFromFile("/components/__components.base.scss"))
		.pipe(headerFromFile("/recipes/__recipes.base.scss"))
		.pipe(header("/** Base UC File **/"));
};
var constructColorStyleSheet = function(brand) {
	return gulp
		.src(PATHS.SCSS + "/setup/__globalshame_uc.scss")
		.pipe(clone())
		.pipe(rename("color-code_" + brand + ".scss"))
		.pipe(headerFromFile("/setup/config/_colors." + brand + ".scss"))
		.pipe(header("/** Base UC File **/"));
};
gulp.task("fontawesome", function() {
	console.log("Gulp Font Awesome Tasks");
	console.log("Gulp: Going to the store node_modules to pick up some fonts.");
	return gulp
		.src(["css/**/*", "webfonts/**/*"], {
			cwd: "./node_modules/@fortawesome/fontawesome-pro/",
			cwdbase: true
		})
		.pipe(gulp.dest(SOURCE.DIST + "/icons"));
});
gulp.task("clean-dist", function() {
	return gulp.src(SOURCE.DIST, { read: false }).pipe(clean());
});
gulp.task("clean-docs", function() {
	return gulp.src(SOURCE.DOCS, { read: false }).pipe(clean());
});
gulp.task("dist", function() {
	console.log("Gulp Dist Package");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the dist"
	);
	return gulp
		.src(["css/*", "fonts/*", "js/**/*", "img/**/*", "icons/**/*"], {
			cwd: "./src",
			cwdbase: true
		})
		.pipe(gulp.dest(SOURCE.DIST + "/"));
});
gulp.task("copy-to-styleguide", function() {
	console.log("Gulp Copy Dist Package to Docs");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the styleguide"
	);
	return gulp.src("./dist/**/*").pipe(gulp.dest(SOURCE.DOCS));
});

gulp.task("markdown", function() {
	var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
	//markdownbuild(base,name,content,tag)
	var home = markdownbuild(base, "home");
	var cvqualtiy_boot = markdownbuild(base, "cvquality_boot");
	var acc_zurb = markdownbuild(base, "acc_zurb");
	var cardiosmart_zurb = markdownbuild(base, "cardiosmart_zurb");
	var cardiosmart_boot = markdownbuild(base, "cardiosmart_boot");
	var acc_boot = markdownbuild(base, "acc_boot");
	var temp_boot = markdownbuild(base, "temp_boot");
	var jacc_boot = markdownbuild(base, "jacc_boot");
	var layoutdemo = markdownbuild(base, "layoutdemo");
	var colorcodes = markdownbuild(base, "colorcodes");
	return merge(
		home,
		cvqualtiy_boot,
		acc_boot,
		jacc_boot,
		temp_boot,
		acc_zurb,
		cardiosmart_zurb,
		cardiosmart_boot,
		layoutdemo,
		colorcodes
	)
		.pipe(header(fs.readFileSync(PATHS.MARKDOWN + "markdown_preheader.md")))
		.pipe(gulp.dest(SOURCE.MD));
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
		"npm run index && npm run zurb_acc && npm run boot_acc && npm run boot_jacc && npm run boot_cvquality &&  npm run layout_demo &&  npm run color_codes && npm run boot_cardiosmart"
	).exec();
});
var concatCSS = function(brand,framework) {
	var uc = gulp.src(PATHS.CSS + "/"+brand+"_uc.css");
	var boot = gulp.src(PATHS.CSS + "/"+brand+"_"+framework+".css");
	return merge(uc, boot)
		.pipe(concat(""+brand+"_"+framework+"_combo.css"))
		.pipe(gulp.dest(PATHS.CSS));
};
gulp.task(
	"build-cvquality",
	gulp.series(
		function() {
			var brand = "cvquality";
			var framework = "boot";
			var uc = constructUCStyleSheet(brand);
			uc = buildbrand(uc, brand, "");
			var base = constructFrameworkStyleSheet(brand, framework);
			base = buildbrand(base, brand, framework);
			merge(base, uc)
				.pipe(header("/** Test 7 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		function() {
			return concatCSS("cvquality", "boot");
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "cvquality";
			var framework = "boot";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run boot_cvquality").exec();
		}
	)
);

gulp.task(
	"build-cardiosmart",
	gulp.series(
		function() {
			var brand = "cardiosmart";
			var framework = "boot";
			var uc = constructUCStyleSheet(brand);
			uc = buildbrand(uc, brand, "");
			var base = constructFrameworkStyleSheet(brand, framework);
			base = buildbrand(base, brand, framework);
			merge(base, uc)
				.pipe(header("/** Test 7 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		function() {
			return concatCSS("cardiosmart", "boot");
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "cardiosmart";
			var framework = "boot";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run boot_cardiosmart").exec();
		}
	)
);

gulp.task(
	"build-jacc",
	gulp.series(
		function() {
			var brand = "jacc";
			var framework = "boot";
			var uc = constructUCStyleSheet(brand);
			uc = buildbrand(uc, brand, "");
			var base = constructFrameworkStyleSheet(brand, framework);
			base = buildbrand(base, brand, framework);
			merge(base, uc)
				.pipe(header("/** Test 7 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		function() {
			return concatCSS("jacc", "boot");
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "jacc";
			var framework = "boot";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run boot_jacc").exec();
		}
	)
);

gulp.task(
	"build-virtual",
	gulp.series(
		function() {
			var brand = "virtual";
			var framework = "boot";
			var base = constructFrameworkStyleSheet(brand, framework);
			base = buildbrand(base, brand, framework);
			merge(base)
				.pipe(header("/** Test 7 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		function() {
			var brand = "virtual";
			var uc = constructUCStyleSheet(brand);
			uc = buildbrand(uc, brand, "");
			merge(uc)
				.pipe(header("/** Test 7 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		function() {
			var brand = "virtual";
			var framework = "boot";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},function() {
			return concatCSS("virtual", "boot");
		},
		"dist",
		"copy-to-styleguide",
		function() {
			return run("npm run boot_virtual").exec();
		}
	)
);

gulp.task(
	"build-acc",
	gulp.series(
		function() {
			var brand = "acc";
			var framework_boot = "boot";
			var framework_zurb = "zurb";
			var uc = constructUCStyleSheet(brand);
			uc = buildbrand(uc, brand, "");
			var base_boot = constructFrameworkStyleSheet(brand, framework_boot);
			base_boot = buildbrand(base_boot, brand, framework_boot);
			var base_zurb = constructFrameworkStyleSheet(brand, framework_zurb);
			base_zurb = buildbrand(base_zurb, brand, framework_zurb);
			merge(base_boot, base_zurb, uc)
				.pipe(header("\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},function() {
			return concatCSS("acc", "boot");
		},function() {
			return concatCSS("acc", "zurb");
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "acc";
			var framework_boot = "boot";
			var base_boot = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base_boot = markdownbuild(
				base_boot,
				brand + "_" + framework_boot
			);
			var base_zurb = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base_zurb = markdownbuild(
				base_zurb,
				brand + "_" + framework_boot
			);
			return merge(base_boot, base_zurb)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run boot_acc").exec();
		},
		function () {
			return run("npm run zurb_acc").exec();
		}
	)
);

gulp.task(
	"build-colors",
	gulp.series(
		function() {
			var brand = "color";
			var framework = "codes";
			var base = constructColorStyleSheet("bases");
			base.pipe(headerFromFile("/styleguide/_color_codes.scss"));
			base = buildbrand(base, brand, framework);
			var credits = constructColorStyleSheet("credits");
			credits = buildbrand(credits, brand, framework);
			var LOE_COR = constructColorStyleSheet("LOE_COR");
			LOE_COR = buildbrand(LOE_COR, brand, framework);
			var pathway = constructColorStyleSheet("pathway");
			pathway = buildbrand(pathway, brand, framework);
			var social = constructColorStyleSheet("social");
			social = buildbrand(social, brand, framework);
			merge(base, credits, social, pathway, LOE_COR)
				.pipe(header("/*** COLOR CODES 2 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
			return runSass(brand);
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "color";
			var framework = "codes";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run color_codes").exec();
		}
	)
);

gulp.task(
	"build-layout_demo",
	gulp.series(
		function() {
			return gulp
				.src(PATHS.SCSS + "/layouts/_layouts_demo.scss")
				.pipe(rename("layout_demo.scss"))
				.pipe(header("/** Layouts Demo Test 1 **/\n"))
				.pipe(sass().on("error", sass.logError))
				.pipe(gulp.dest(PATHS.CSS));
		},
		"dist",
		"copy-to-styleguide",
		function() {
			var brand = "layout";
			var framework = "demos";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			var base = markdownbuild(base, brand + "_" + framework);
			return merge(base)
				.pipe(
					header(
						fs.readFileSync(
							PATHS.MARKDOWN + "markdown_preheader.md",
							"utf8"
						)
					)
				)
				.pipe(gulp.dest(SOURCE.MD));
		},
		function() {
			return run("npm run layout_demo").exec();
		}
	)
);

gulp.task("md", gulp.series("markdown", "styleguide"));
gulp.task(
	"default",
	gulp.series(
		"build-acc",
		"build-cvquality",
		"build-cardiosmart",
		"build-jacc",
		"build-virtual",
		"build-colors",
		"build-layout_demo"
	)
);
