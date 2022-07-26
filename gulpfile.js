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
var watch = require("gulp-watch");

var banner = [
	"/**",
	" * <%= pkg.name %> - <%= pkg.description %>",
	" * @version v<%= pkg.version %>",
	" * @link <%= pkg.homepage %>",
	" */",
	"",
	"",
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
	MD: "./markdown",
};
var PATHS = {
	CSS: SOURCE.SRC + SOURCE.CSS,
	ALLCSS: SOURCE.SRC + SOURCE.CSS + "/**/*.css",
	SCSS: SOURCE.SRC + SOURCE.SCSS,
	ALLSCSS: SOURCE.SRC + SOURCE.SCSS + "/*.scss",
	FONTS: SOURCE.SRC + SOURCE.FONTS,
	ALLFONTS: SOURCE.SRC + SOURCE.FONTS + "/**/*",
	JS: SOURCE.SRC + SOURCE.JS,
	ALLJS: SOURCE.SRC + SOURCE.JS + "/*",
	ICONS: SOURCE.SRC + SOURCE.ICONS,
	ALLICONS: SOURCE.SRC + SOURCE.ICONS + "/**/*.scss",
	IMAGES: SOURCE.SRC + SOURCE.IMAGES,
	ALLIMAGES: SOURCE.SRC + SOURCE.IMAGES + "/**/*",
	MARKDOWN: SOURCE.MD + "/partials/",
};

// Style Tasks
var runSass = function (brand) {
	var plugins = [
		// postcssNormalize( pluginOptions),
		pixrem(),
		cssDeclarationSorter({
			order: "smacss",
		}),
		autoprefixer({
			grid: "autoplace",
		}),
		mergeRules({}),
	];
	var css = gulp
		.src(PATHS.SCSS + "/**/*" + brand + "*")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss(plugins));
	var min = css
		.pipe(clone())
		.pipe(
			rename(function (path) {
				path.extname = ".min.css";
			})
		)
		.pipe(postcss([cssnano()]));
	var gz = min.pipe(clone()).pipe(gzip());
	return merge(css, min, gz)
		.pipe(sourcemaps.write("/maps"))
		.pipe(gulp.dest(SOURCE.SRC + SOURCE.CSS));
};
var markdownbuild = function (base, label) {
	var construct = base
		.pipe(clone())
		.pipe(rename(label + "_readme.md"))
		.pipe(
			header(fs.readFileSync(PATHS.MARKDOWN + "partial_" + label + ".md"))
		)
		.pipe(header(fs.readFileSync(PATHS.MARKDOWN + "markdown_header.md")));
	return construct;
};
var buildbrand = function (base, brand, framework) {
	var construct = base;

	switch (framework) {
		case "zurb":
			construct.pipe(headerFromFile("/setup/__setup.zurb.scss"));
			break;
		case "boot":
			construct.pipe(headerFromFile("/setup/__setup.boot.scss"));
			break;
		case "coveo":
			construct.pipe(headerFromFile("/setup/__setup.coveo.scss"));
			break;
		default:
			construct.pipe(headerFromFile("/setup/__setup.none.scss"));
			break;
	}
	construct.pipe(headerFromFile("/setup/config/_var.output.scss"));
	construct.pipe(
		header(
			fs.readFileSync(PATHS.SCSS + "/setup/__brand.base.scss", "utf8"),
			{
				pkg: pkg,
			}
		)
	);

	if (brand == "color") {
		construct
			.pipe(
				header("", {
					pkg: pkg,
				})
			)
			.pipe(
				header("/** Built With Base Branding <%= pkg.version %> **/", {
					pkg: pkg,
				})
			)
			.pipe(
				header("", {
					pkg: pkg,
				})
			)
			.pipe(headerFromFile("/setup/__brand.none.scss"));
	} else {
		construct
			.pipe(
				header("")
			)
			.pipe(header("/** Built With " + brand + " Branding **/"))
			.pipe(
				header("", {
					pkg: pkg,
				})
			)
			.pipe(headerFromFile("/setup/__brand." + brand + ".scss"))
			.pipe(
				header("\n /** Built With Base Branding <%= pkg.version %> **/\n ", {
					pkg: pkg,
				})
			);
	}
	switch (framework) {
		case "boot":
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'active';\n\n/** Utility Class Built on top of Bootstrap <%= pkg.bootstrapVersion %> **/ \n",
					{
						pkg: pkg,
					}
				)
			);
			break;
		case "zurb":
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'is-active';\n\n/** Utility Class Built on top of Zurb Foundation <%= pkg.foundationVersion %>  **/ \n",
					{
						pkg: pkg,
					}
				)
			);
			break;
		default:
			construct.pipe(
				header(
					"\n/**Set Active Class**/ \n $active-class-name: 'active';\n\n/** No Framework or is a Style Sheet that Should be used as an augmenting stylesheet **/ \n"
				)
			);
			break;
	}
	construct
		.pipe(headerFromFile("/setup/__preheader.scss"))
		.pipe(header("\n/** /setup/__preheader.scss **/ \n"))
		.pipe(header(banner, { pkg: pkg }));
	return construct;
};
var headerFromFile = function (stringPath) {
	return header(fs.readFileSync(PATHS.SCSS + stringPath, "utf8"), {
		pkg: pkg,
	});
};
var constructFrameworkStyleSheet = function (brand, framework) {
	var base = gulp
		.src(PATHS.SCSS + "/setup/__globalshame_framework.scss")
		.pipe(clone())
		.pipe(rename(brand + "_" + framework + ".scss"))
		.pipe(headerFromFile("/components/__components." + brand + ".scss"))
		.pipe(headerFromFile("/components/__components." + framework + ".scss"))
		.pipe(headerFromFile("/components/__components.base.scss"))
		.pipe(headerFromFile("/recipes/__recipes." + brand + ".scss"))
		.pipe(headerFromFile("/recipes/__recipes." + framework + ".scss"))
		.pipe(headerFromFile("/recipes/__recipes.base.scss"))
		.pipe(headerFromFile("/base/__base." + brand + ".scss"));
	return base;
};
var constructUCStyleSheet = function (brand) {
	return gulp
		.src(PATHS.SCSS + "/setup/__globalshame_uc.scss")
		.pipe(clone())
		.pipe(rename(brand + "_uc.scss"))
		.pipe(headerFromFile("/setup/__utilityclasses.scss"))
		.pipe(header("\n/** Base UC File **/\n"));
};
var constructStandaloneStyleSheet = function (name, brand = "acc") {
	return gulp
		.src(PATHS.SCSS + "/setup/__globalshame_uc.scss")
		.pipe(clone())
		.pipe(rename("standalone_"+name + ".scss"))
		.pipe(headerFromFile("/recipes/__recipes." + name + ".scss"))
		.pipe(header("\n/** Standalone CSS FILE **/\n"))
		.pipe(headerFromFile("/styleguide/_" + name + ".scss"))
		.pipe(headerFromFile("/setup/config/_var.output.scss"))
		.pipe(headerFromFile("/setup/__setup.none.scss"))
		.pipe(headerFromFile("/setup/__brand.base.scss"))
		.pipe(headerFromFile("/setup/__brand." + brand + ".scss"))
		.pipe(headerFromFile("/setup/__preheader.scss"))
        .pipe(
			header("\n/** Built With Base Branding <%= pkg.version %> **/\n", {
				pkg: pkg,
			})
		)
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest(PATHS.SCSS));
};
var constructColorStyleSheet = function (brand) {
	return gulp
		.src(PATHS.SCSS + "/setup/__globalshame_uc.scss")
		.pipe(clone())
		.pipe(rename("color-code_" + brand + ".scss"))
		.pipe(headerFromFile("/setup/config/_colors." + brand + ".scss"))
		.pipe(header("\n/** Base UC File **/\n"));
};
var concatCSS = function (brand, framework) {
	var uc = gulp.src(PATHS.CSS + "/" + brand + "_uc.css");
	var boot = gulp.src(PATHS.CSS + "/" + brand + "_" + framework + ".css");
	return merge(uc, boot)
		.pipe(concat("" + brand + "_" + framework + "_combo.css"))
		.pipe(gulp.dest(PATHS.CSS));
};
var constructSassFiles = function (brand, framework) {
	var uc = constructUCStyleSheet(brand);
	uc = buildbrand(uc, brand, "");
	if (framework == "") {
		return uc.pipe(header("")).pipe(gulp.dest(PATHS.SCSS));
	}
	var base = constructFrameworkStyleSheet(brand, framework);
	base = buildbrand(base, brand, framework);
	return merge(base, uc).pipe(header("\n")).pipe(gulp.dest(PATHS.SCSS));
};
var constructMarkdown = function (brand, framework) {
	var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
	base =
		framework != ""
			? markdownbuild(base, brand + "_" + framework)
			: markdownbuild(base, brand);

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
};

gulp.task("fontawesome", function () {
	console.log("Gulp Font Awesome Tasks");
	console.log("Gulp: Going to the store node_modules to pick up some fonts.");
	return gulp
		.src(["css/**/*", "webfonts/**/*"], {
			cwd: "./node_modules/@fortawesome/fontawesome-pro/",
			cwdbase: true,
		})
		.pipe(gulp.dest(SOURCE.SRC + "/icons"));
});
gulp.task("clean-dist", function () {
	return gulp.src(SOURCE.DIST, { read: false }).pipe(clean());
});
gulp.task("clean-docs", function () {
	return gulp.src(SOURCE.DOCS, { read: false }).pipe(clean());
});
gulp.task("copy-to-dist", function () {
	console.log("Gulp Dist Package");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the dist"
	);
	return gulp
		.src(
			[
				"css/**/*",
				"fonts/**/*",
				"js/**/*",
				"img/**/*",
				"icons/**/*",
				"!**/*.psd",
				"!**/*.ai",
				"!**/*.eps",
				"!**/*.zip",
				"!img/**/SourceFiles/*",
				"!img/**/Exports/*",
				"!img/**/Raw/*",
				"!img/**/temp/*",
			],
			{
				cwd: "./src",
				cwdbase: true,
			}
		)
		.pipe(gulp.dest(SOURCE.DIST + "/"));
});
gulp.task("copy-to-styleguide", function () {
	console.log("Gulp Copy Dist Package to Docs");
	console.log(
		"Gulp: Gosh my back is tired. Moving boxes from Assets to the styleguide"
	);
	return gulp.src("./dist/**/*").pipe(gulp.dest(SOURCE.DOCS));
});


// Base Documentation 
gulp.task( "build-home",
	gulp.series(
		function () {
			return gulp
				.src(PATHS.SCSS + "/styleguide/_arches.scss")
				.pipe(rename("arches_home.scss"))
				.pipe(header("/** Layouts Demo Test 1 **/\n"))
				.pipe(sass().on("error", sass.logError))
				.pipe(gulp.dest(PATHS.CSS));
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			var brand = "home";
			var framework = "arches";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_blank.md");
			base = markdownbuild(base, brand + "_" + framework);
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
		function STYLEGUIDE() {
			return run("npm run home").exec();
		}
	)
);
gulp.task( "build-uc",
	gulp.series(
		function SCSS() {
			return constructSassFiles("acc", "boot");
		},
		function CSS() {
			return runSass("acc");
		},
		function CONCAT() {
			return concatCSS("acc", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function Markdown() {
			return constructMarkdown("acc", "uc");
		},
		function STYLEGUIDE() {
			return run("npm run uc").exec();
		}
	)
);
// Major Brands/Flagship websites.
gulp.task( "build-acc",
	gulp.series(
		function SCSS() {
			return constructSassFiles("acc", "boot");
		},
		function CSS() {
			return runSass("acc");
		},
		function CONCAT() {
			return concatCSS("acc", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function Markdown() {
			return constructMarkdown("acc", "boot");
		},
		function STYLEGUIDE() {
			return run("npm run boot_acc").exec();
		}
	)
);
gulp.task( "build-cardiosmart",
	gulp.series(
		function SCSS() {
			return constructSassFiles("cardiosmart", "boot");
		},
		function CSS() {
			return runSass("cardiosmart");
		},
		function CONCAT() {
			return concatCSS("cardiosmart", "boot");
		},
		function Markdown() {
			return constructMarkdown("cardiosmart", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_cardiosmart").exec();
		}
	)
);
gulp.task( "build-cvquality",
	gulp.series(
		function SCSS() {
			return constructSassFiles("cvquality", "boot");
		},
		function CSS() {
			return runSass("cvquality");
		},
		function CONCAT() {
			return concatCSS("cvquality", "boot");
		},
		function Markdown() {
			return constructMarkdown("cvquality", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_cvquality").exec();
		}
	)
);
// Minor Brands
gulp.task( "build-library",
	gulp.series(
		function SCSS() {
			return constructSassFiles("library", "boot");
		},
		function CSS() {
			return runSass("library");
		},
		function CONCAT() {
			return concatCSS("library", "boot");
		},
		function Markdown() {
			return constructMarkdown("library", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_library").exec();
		}
	)
);
gulp.task( "build-virtual",
	gulp.series(
		function SCSS() {
			return constructSassFiles("virtual", "boot");
		},
		function CSS() {
			return runSass("virtual");
		},
		function CONCAT() {
			return concatCSS("virtual", "boot");
		},
		function Markdown() {
			return constructMarkdown("virtual", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_virtual").exec();
		}
	)
);
// Expansion/Standalone Stylesheets
gulp.task( "build-colors",
	gulp.series(
		function BuildSCSS() {
			var brand = "color";
			var framework = "codes";
			var base = constructColorStyleSheet("bases");
			base.pipe(headerFromFile("/styleguide/_color-codes.scss"));
			base = buildbrand(base, brand, framework);
			var credits = constructColorStyleSheet("credits");
			credits = buildbrand(credits, brand, framework);
			var LOE_COR = constructColorStyleSheet("LOE_COR");
			LOE_COR = buildbrand(LOE_COR, brand, framework);
			var pathway = constructColorStyleSheet("pathway");
			pathway = buildbrand(pathway, brand, framework);
			var pathwayV2 = constructColorStyleSheet("pathwayV2");
			pathwayV2 = buildbrand(pathwayV2, brand, framework);
			var social = constructColorStyleSheet("social");
			social = buildbrand(social, brand, framework);
			var registry = constructColorStyleSheet("registry");
			registry = buildbrand(registry, brand, framework);
			return merge(
				base,
				credits,
				social,
				pathway,
				pathwayV2,
				LOE_COR,
				registry
			)
				.pipe(header("/*** COLOR CODES 3 **/\n"))
				.pipe(gulp.dest(PATHS.SCSS));
		},
		function CSS() {
			return runSass("color-code");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function Markdown() {
			return constructMarkdown("color", "codes");
		},
		function STYLEGUIDE() {
			return run("npm run color_codes").exec();
		}
	)
);
gulp.task( "build-glsearch",
	gulp.series(
		function SCSS() {
			return constructStandaloneStyleSheet("glsearch");
		},
		function CSS() {
			return runSass("glsearch");
		},
		function Markdown() {
			return constructMarkdown("glsearch", "");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run glsearch").exec();
		}
	)
);
gulp.task( "build-coveo",
	gulp.series(
		function SCSS() {
			return constructStandaloneStyleSheet("coveo");
		},
		function CSS() {
			return runSass("coveo");
		},
		function Markdown() {
			return constructMarkdown("acc", "coveo");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run coveo").exec();
		}
	)
);






gulp.task(
	"default",
	gulp.series(
		"build-home",
		"build-acc",
		"build-coveo",
		"build-glsearch",
		"build-cvquality",
		"build-cardiosmart",
		"build-virtual",
		"build-library",
		"build-colors"
	)
);


//  ------------------- 	 Retired Builds that Are not in use or in a phase of depreciated.    -------------------  ///
gulp.task(
	"build-mobile",
	gulp.series(
		function SCSS() {
			return constructSassFiles("mobile", "zurb");
		},
		function CSS() {
			return runSass("mobile");
		},
		function CONCAT() {
			return concatCSS("mobile", "zurb");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function Markdown() {
			return constructMarkdown("mobile", "zurb");
		},
		function STYLEGUIDE() {
			return run("npm run zurb_mobile").exec();
		}
	)
);

gulp.task(
	"build-covid",
	gulp.series(
		function SCSS() {
			return constructSassFiles("covid", "boot");
		},
		function CSS() {
			return runSass("covid");
		},
		function CONCAT() {
			return concatCSS("covid", "boot");
		},
		function Markdown() {
			return constructMarkdown("covid", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function STYLEGUIDE() {
			return run("npm run boot_covid").exec();
		}
	)
);

gulp.task(
	"build-layout_demo",
	gulp.series(
		function () {
			return gulp
				.src(PATHS.SCSS + "/layouts/_layouts_demo.scss")
				.pipe(rename("layout_demo.scss"))
				.pipe(header("/** Layouts Demo Test 1 **/\n"))
				.pipe(sass().on("error", sass.logError))
				.pipe(gulp.dest(PATHS.CSS));
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			var brand = "layout";
			var framework = "demos";
			var base = gulp.src(PATHS.MARKDOWN + "markdown_footer.md");
			base = markdownbuild(base, brand + "_" + framework);
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
		function STYLEGUIDE() {
			return run("npm run layout_demo").exec();
		}
	)
);
gulp.task( "build-journal",
	gulp.series(
		function SCSS() {
			return constructSassFiles("journal", "boot");
		},
		function CSS() {
			return runSass("journal");
		},
		function CONCAT() {
			return concatCSS("journal", "boot");
		},
		function Markdown() {
			return constructMarkdown("journal", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_journal").exec();
		}
	)
);


gulp.task(
	"default-depreciated",
	gulp.series(
		"build-layout_demo",
		"build-mobile",
		"build-journal",
		"build-virtual",
		"build-library"
	)
);
