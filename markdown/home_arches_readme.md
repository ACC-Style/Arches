
# Welcome to Arches 

Arches is a central design system for the American College of Cardiology. This system, through some compiler wizardry, builds out to variations using frameworks and product brands to be used across many products built by the ACC.  Arches vanilla is just a Utility Classes and when added to a project with an already established style sheet is made to add new styling features non-destructively. There are also variations of Arches that build on top of the two popular frameworks that currently in use at the College, Twitter Bootstrap, and Zurb Foundation.

## Utility Classes

Utility classes are a distinct departure from many previous learned CSS theories, but what utility classes allow for is an excellent separation of concerns between the HTML and CSS. The singular focus for utility classes is a single class controls a single style in CSS. Utility Class has significant benefits of reducing scope expansion in the CSS and also gives greater flexibility of crafting user interface components that are currently undefined. Html should continually be written using the best standards for semantics, but it is no longer a concern to follow a components design pattern because it is applicable at the HTML level.

#### Naming Convention

Arches does have a learning curve, but to reduce the curve the names follow a strict pattern. <a class="link" href="./section-uc.html"> learn more</a>

### Brand Documentation

In each brand documentation area you will see direct representations of the styles in actions and predefined patterns used in those properties.


| Brand                            | Current Use Status   | Notes                                                                                                                              |
| -------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [ACC Main Site](boot_acc/)       | In Conversion        | Some pages are fully using Arches other are using the Utility Class Override                                                       |
| [CardioSmart](boot_cardiosmart/) | Fully                | Built on Pure Arches Style Sheets                                                                                                  |
| [CVQuality](boot_cvquality/)     | Documented           | Designs have been documented and branch project started not using Arches now.                                                      |
| [Mobile](zurb_acc/)              | Documented           | Mobile utilize zurb instead of bootstrap because of better mobile support.                                                         |
| [JACC](boot_journal/)            | Partially Documented | JACC is vendor based and will most likely never be converted.                                                                      |
| [Virtual](boot_virtual/)         | Partially Documented | The virtual platform for events has been restarted to build with vendor                                                            |
| [Library](boot_library/)         | Partially Documented | the library is a spin off of the data from events. to make the styling more interesting it is utilizing a different look and feel. |
| [Coveo](coveo/)         	   | Partially Documented | An augmenting style sheet that renders results and search ui when using Coveo. |
| [Covid](boot_covid/)         	   | Depreciated! | An augmenting style sheet that renders results and search ui when using Coveo. |

### Playgrounds Documentation

There are some playgrounds setup for exploitative design work that are either off shoots of the major brands or are used in some of our third party products. Most of these are pattern only work or extra stylesheets that are product specific. 

| Playground                          | Notes                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Layouts](layout_demo/)             | Educations Systems, Ebiz, and Landing Page                                                                      |
| [Search W/in Guidelines](glsearch/) | Search within Guidelines content styling and test systems for a seperate add on style sheet for content returns |

### [Color Codes](color_codes/)

The College has used colors to denote many objects across its product lines. Here is the official colors and definitions. 

| Style                                                                                       | Notes                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [Credits](color_codes/section-credit-colors.html)                                           | As an accredited body the college can grant credits to many different types of certifications and professional boards. |
| [Learning Pathways](color_codes/section-pathway-colors.html)                                | Color coding the pathway for professional development                                                                  |
| [NCDR Registries](color_codes/section-registrycolors.html)                                  | Product colors for the Data Registries                                                                                 |
| [LOE](color_codes/section-loe-colors.html) &amp; [COR](color_codes/section-cor-colors.html) | Guidelines use coloring to help professionals quickly understand the  level of evidence and class of recommendation    |

___
## Adding a New Brand
Arches is a complex front end solution so adding a new brand has a decent amount of files that need to be added. Currently all brands are built on the bootstrap framework.

### Files need to be added to the codebase to support a new brand.

All the files except the Setup Brand File can be left blank. The `base`,`components`,`recipes` all use a centralized root file that points to a folder to keep the system clean and organized. 
~~~
.
└── Src/
    └── scss/
        ├── base/
        │   └── __base.brandName.scss
        ├── components/
        │   ├── brandName/
        │   └── __base.brandName.scss
        ├── recipes/
        │   ├── brandName/
        │   │   └── _brandName.recipe-name.scss
        │   └── __recipes.brandName.scss
        └── setup/
            └── __brand.brandName.scss (Copy the __brand.temp.scss to pull in proper variables and modify from there. )

~~~

### When should I use `setup`,`base`,`components`, or `recipes`

__`Setup`__ this is where you establish the design rules that arches will follow, Color Pallet, Font Families, and some sizing rules for the typography. 

__`Base`__ this is the most specialized section of brand structure. This is where depending on the style of the brand you can add flourishes and stylized global elements. `CardioSmart` for example has some typography rules that deviate from the base primary color for headers and uses the accent color for h1 - h3; and it also applies a colored gradient background to the wash over areas behind the page in desktop browsers. This is the area to make those types of changes.

__`Components`__ is the area where the building of the UI elements requires some additional CSS.  A good example of is when your are doing a bootstrap component override where Arches classes don't have the appropriate specificity to correct the stylings.  A common component is the `_acc.boot._navbar.override` the subtle interactions of hovers make it mostly impossible for arches to alter the styles established by bootstrap so an override was needed to make this component work. 

__`Recipes`__ are used when you are just build DOM patterns that don't include any CSS.  Most *new* documentation patterns will be created here. 

### Adding a new Gulp Task

In the gulpfile.js you must duplicate the appropriate task and alter is brand to match the needs.

~~~javascript
gulp.task( "build-brandName",
	gulp.series(
		function SCSS() {
			return constructFrameworkAndUtilityStyleSheet("brandName", "boot");
		},
		function CSS() {
			return runSass("brandName");
		},
		function CONCAT() {
			return concatCSS("brandName", "boot");
		},
		function Markdown() {
			return constructMarkdown("brandName", "boot");
		},
		"copy-to-dist",
		"copy-to-styleguide",
		function () {
			return run("npm run boot_brandName").exec();
		}
	)
);
~~~

### Update the Default Gulp Task

Depending on the need you should add the new `build-brandName` task to the group building tasks `default` or `default-depreciated`. Use default depreciated for any brand that isn't 100% official or going to be used in production straight away. a

### Create a StyleGuide Config file

Duplicate an existing kss-config file and set it up. It is recommended you copy the `kss-config_boot_acc.json`

* the direct it to the new css document you are making
* alter the appropriate stylesheets for stylings
* adding in dependency javascript
* add an new entry into the `site_nav` and set its active to true.

### Create a new script entry in the `package.json`

create a new entry in the script area of the package json for gulp to be able to call the styleguide build command. a

~~~json
"scripts":{
	"boot_brandName": "kss --config kss-config_boot_brandName.json",	
	}

~~~

### Add Navigation to the new brand 

This can be accomplished by either adding a new table row to `\markdown\partials\partial_home_arches.md` which outlines the style areas. *If and only If* you are making a new flagship brand should you add a new entry to all kss_config files so the nav item is available to all pages within the ARCHES documentation. 

