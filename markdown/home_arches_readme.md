
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




